import assert from 'node:assert/strict';

const base = process.env.SITE_CHECK_URL || 'http://127.0.0.1:3001';
const canonicalOrigin = 'https://argilla-three.vercel.app';
const get = (path) => fetch(new URL(path, base));
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200, 'sitemap status');
const urls = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
assert.equal(urls.length, 41, 'complete route inventory');
assert(urls.every((url) => url.origin === canonicalOrigin), 'sitemap canonical origin');
const pages = new Map();
const pending = [...urls];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (pending.length) {
    const url = pending.shift();
    const response = await get(url.pathname);
    assert.equal(response.status, 200, url.pathname);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${url.pathname}: one h1`);
    assert.match(html.slice(0, html.indexOf("</head>") + 7), /<title>[^<]+<\/title>/, `${url.pathname}: title`);
    assert.match(html.slice(0, html.indexOf("</head>") + 7), /<meta name="description" content="[^"]+"/, `${url.pathname}: description`);
    assert(html.includes(`rel="canonical" href="${canonicalOrigin}${url.pathname === '/' ? '' : url.pathname}"`)
      || html.includes(`rel="canonical" href="${canonicalOrigin}${url.pathname}"`), `${url.pathname}: canonical`);
    assert.match(html.slice(0, html.indexOf("</head>") + 7), /property="og:image"/, `${url.pathname}: social image`);
    assert(!html.includes('argilla.example.com'), `${url.pathname}: no placeholder domain`);
    for (const json of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(json[1]), `${url.pathname}: valid JSON-LD`);
      assert(!json[1].includes('InStock'), `${url.pathname}: no invented inventory`);
    }
    pages.set(url.pathname, html);
  }
}));

const downloads = new Set();
let linkCount = 0;
for (const [path, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, new URL(path, base));
    if (url.pathname.startsWith('/catalogue/')) { downloads.add(url.pathname); continue; }
    assert(pages.has(url.pathname), `${path}: internal destination ${href}`);
    if (url.hash) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(pages.get(url.pathname).includes(`id="${id}"`), `${path}: fragment ${href}`);
    }
    linkCount++;
  }
}
assert.equal(downloads.size, 14, 'catalogue and all thirteen specifications');
for (const path of downloads) {
  const response = await get(path);
  assert.equal(response.status, 200, path);
  assert.match(response.headers.get('content-disposition'), /attachment;.*\.txt/, `${path}: real attachment`);
  assert.match(await response.text(), /illustrative|concept/i, `${path}: demo disclosure`);
}
for (const path of ['/products/does-not-exist', '/collections/does-not-exist', '/projects/does-not-exist', '/journal/does-not-exist', '/catalogue/does-not-exist', '/does-not-exist']) {
  assert.equal((await get(path)).status, 404, `${path}: 404`);
}
const robots = await get('/robots.txt');
assert.equal(robots.status, 200);
assert((await robots.text()).includes(`${canonicalOrigin}/sitemap.xml`), 'robots sitemap');
assert.equal((await get('/icon.svg')).status, 200, 'brand icon');
const og = await get('/opengraph-image');
assert.equal(og.status, 200, 'social image');
assert.match(og.headers.get('content-type'), /image\/png/, 'social image type');
console.log(`PASS: ${pages.size} pages, ${linkCount} internal links/fragments, ${downloads.size} downloads, metadata, structured data, 404s, robots, icon and social image.`);
