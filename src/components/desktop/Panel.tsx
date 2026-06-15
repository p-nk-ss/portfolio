import Clock from "./Clock";
import { IconWifi, IconVolume, IconBattery } from "./icons";
import { nav } from "@/content/site";

/** Top GNOME-style panel — persistent nav. Sticky across the whole page. */
export default function Panel() {
  return (
    <header className="sticky top-0 z-40 px-2 pt-2 sm:px-4 sm:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[38px] max-w-site items-center gap-3 rounded-xl border border-white/10 bg-crust/70 px-3 text-[13px] backdrop-blur-md sm:gap-4"
      >
        <a
          href="#top"
          className="font-semibold text-text transition-colors hover:text-blue"
        >
          Activities
        </a>

        {/* section links (workspace-style) — hidden on small screens; dock covers mobile */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="rounded-md px-2.5 py-1 text-subtext0 transition-colors hover:bg-surface0 hover:text-text"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <Clock />
          <span className="flex items-center gap-2.5 text-subtext0" aria-hidden="true">
            <IconWifi className="size-4" />
            <IconVolume className="size-4" />
            <IconBattery className="size-4" />
          </span>
        </div>
      </nav>
    </header>
  );
}
