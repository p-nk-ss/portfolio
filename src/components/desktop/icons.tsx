/** Inline SVG icons (no icon-lib dependency). Stroke uses currentColor. */
type P = { className?: string };

const svg = (className: string | undefined, children: React.ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const IconTerminal = ({ className }: P) =>
  svg(className, <><path d="M5 8l4 4-4 4" /><path d="M12 16h7" /></>);

export const IconGrid = ({ className }: P) =>
  svg(
    className,
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>,
  );

export const IconBriefcase = ({ className }: P) =>
  svg(
    className,
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </>,
  );

export const IconFolder = ({ className }: P) =>
  svg(className, <path d="M3 7h6l2 2h10v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />);

export const IconMail = ({ className }: P) =>
  svg(
    className,
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>,
  );

export const IconFile = ({ className }: P) =>
  svg(className, <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4" /></>);

export const IconDownload = ({ className }: P) =>
  svg(
    className,
    <><path d="M12 3v12" /><path d="M7 11l5 4 5-4" /><path d="M5 21h14" /></>,
  );

export const IconExternal = ({ className }: P) =>
  svg(
    className,
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </>,
  );

export const IconGithub = ({ className }: P) =>
  svg(
    className,
    <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.5 1.3a12 12 0 0 0-6 0C6.6 3.3 5.6 3.6 5.6 3.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 10c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  );

export const IconLinkedin = ({ className }: P) =>
  svg(
    className,
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" />
    </>,
  );

export const IconTelegram = ({ className }: P) =>
  svg(className, <path d="M21 4L3 11l5 2 2 6 3-4 5 4z" />);

export const IconMapPin = ({ className }: P) =>
  svg(
    className,
    <><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  );

export const IconWifi = ({ className }: P) =>
  svg(
    className,
    <>
      <path d="M2 8.5C5 6 9 4.5 12 4.5S19 6 22 8.5" />
      <path d="M5 12c2-1.6 4.5-2.5 7-2.5s5 .9 7 2.5" />
      <path d="M8.5 15.5c1-.8 2.2-1.2 3.5-1.2s2.5.4 3.5 1.2" />
      <circle cx="12" cy="19" r="0.5" />
    </>,
  );

export const IconVolume = ({ className }: P) =>
  svg(className, <><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M17 8a5 5 0 0 1 0 8" /></>);

export const IconBattery = ({ className }: P) =>
  svg(
    className,
    <>
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <path d="M22 10v4" />
    </>,
  );
