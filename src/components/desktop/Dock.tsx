import {
  IconTerminal,
  IconGrid,
  IconBriefcase,
  IconFolder,
  IconMail,
  IconFile,
} from "./icons";

type DockItem = {
  id: string;
  label: string;
  href: string;
  color: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  external?: boolean;
};

const items: DockItem[] = [
  { id: "about", label: "About", href: "#about", color: "bg-surface1 text-text", Icon: IconTerminal },
  { id: "skills", label: "Skills", href: "#skills", color: "bg-blue text-crust", Icon: IconGrid },
  { id: "experience", label: "Experience", href: "#experience", color: "bg-teal text-crust", Icon: IconBriefcase },
  { id: "projects", label: "Projects", href: "#projects", color: "bg-peach text-crust", Icon: IconFolder },
  { id: "contact", label: "Contact", href: "#contact", color: "bg-pink text-crust", Icon: IconMail },
  { id: "cv", label: "Open CV", href: "/cv.pdf", color: "bg-mauve text-crust", Icon: IconFile, external: true },
];

/** Floating bottom dock — persistent secondary nav (and the only nav on mobile). */
export default function Dock() {
  return (
    <nav
      aria-label="Dock"
      className="fixed bottom-2.5 left-1/2 z-40 -translate-x-1/2"
    >
      <ul className="flex gap-2 rounded-[18px] border border-white/10 bg-crust/65 p-2 backdrop-blur-lg sm:gap-3 sm:px-3.5">
        {items.map(({ id, label, href, color, Icon, external }) => (
          <li key={id}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex size-10 items-center justify-center rounded-xl transition-transform duration-150 hover:-translate-y-1.5 hover:scale-105 sm:size-[42px] ${color}`}
            >
              <Icon className="size-5" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
