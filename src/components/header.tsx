"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
  "/": {
    name: "/home",
  },
  "/logs": {
    name: "/logs",
  },
};

export function Header() {
  const pathname = usePathname();

  return (
    <aside className="border-b mb-12 px-4 pb-4 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-5">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive =
                path === "/" ? pathname === path : pathname.startsWith(path);

              const label =
                path === "/logs" && pathname.startsWith("/logs/")
                  ? pathname
                  : name;

              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all flex align-middle relative ${
                    !isActive && "text-neutral-500"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
