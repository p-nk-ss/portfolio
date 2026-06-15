import Clock from "./Clock";
import Container from "@/components/ui/Container";
import { IconWifi, IconVolume, IconBattery, IconMenu } from "./icons";
import { nav } from "@/content/site";

/** Top GNOME-style panel — persistent nav. Sticky; bar aligns to the same
 * Container gutter as the section windows. */
export default function Panel() {
  return (
    <header className="sticky top-0 z-40 pt-2 sm:pt-4">
      <Container>
        <nav
          aria-label="Primary"
          className="flex h-[38px] items-center gap-3 rounded-xl border border-white/10 bg-crust/70 px-3 text-[13px] backdrop-blur-md sm:gap-4"
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

          {/* mobile: sections dropdown (the desktop links above are md+ only) */}
          <details className="relative ml-1 md:hidden">
            <summary className="flex size-7 cursor-pointer list-none items-center justify-center rounded-md text-subtext0 transition-colors hover:bg-surface0 hover:text-text [&::-webkit-details-marker]:hidden">
              <IconMenu className="size-4" />
              <span className="sr-only">Open navigation menu</span>
            </summary>
            <ul className="absolute left-0 z-50 mt-2 w-44 rounded-xl border border-white/10 bg-crust/95 p-1.5 shadow-win backdrop-blur-md">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="block rounded-md px-3 py-2 text-subtext0 transition-colors hover:bg-surface0 hover:text-text"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <div className="ml-auto flex items-center gap-3">
            <Clock />
            <span
              className="hidden items-center gap-2.5 text-subtext0 sm:flex"
              aria-hidden="true"
            >
              <IconWifi className="size-4" />
              <IconVolume className="size-4" />
              <IconBattery className="size-4" />
            </span>
          </div>
        </nav>
      </Container>
    </header>
  );
}
