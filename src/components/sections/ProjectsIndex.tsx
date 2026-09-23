"use client";

import { useMemo, useState } from "react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/data/projects";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Reveal } from "@/components/ui/Primitives";
import { FilterBar } from "./FilterBar";

const ALL = "All";

/** Repeating three-row rhythm so the index never reads as a plain grid. */
const LAYOUT = [
  { span: "lg:col-span-7", ratio: "wide" as const, offset: "" },
  { span: "lg:col-span-4 lg:col-start-9", ratio: "tall" as const, offset: "lg:mt-[14vh]" },
  { span: "lg:col-span-5 lg:col-start-2", ratio: "square" as const, offset: "" },
  { span: "lg:col-span-6 lg:col-start-7", ratio: "wide" as const, offset: "lg:mt-[8vh]" },
];

export function ProjectsIndex() {
  const [active, setActive] = useState(ALL);

  const visible = useMemo(
    () =>
      active === ALL
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === active),
    [active],
  );

  return (
    <div className="flex flex-col gap-14">
      <FilterBar
        label="Filter projects by type"
        options={[ALL, ...PROJECT_CATEGORIES]}
        active={active}
        onChange={setActive}
        count={visible.length}
      />

      {visible.length ? (
        <Reveal
          key={active}
          className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12"
          stagger={0.1}
          start="top 92%"
        >
          {visible.map((project, i) => {
            const layout = LAYOUT[i % LAYOUT.length];
            return (
              <ProjectCard
                key={project.slug}
                project={project}
                ratio={layout.ratio}
                priority={i < 2}
                className={`${layout.span} ${layout.offset}`}
                sizes="(max-width: 1024px) 92vw, 50vw"
              />
            );
          })}
        </Reveal>
      ) : (
        <p className="body-base text-umber">
          No projects in this category yet. Browse all projects or contact the
          studio.
        </p>
      )}
    </div>
  );
}
