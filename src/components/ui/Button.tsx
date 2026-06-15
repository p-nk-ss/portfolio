import { cn } from "@/lib/cn";

type Variant = "go" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] border border-transparent " +
  "font-sans text-sm font-semibold px-[18px] py-[11px] cursor-pointer no-underline " +
  "transition-[transform,filter] duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 " +
  "[&_svg]:size-4";

const variants: Record<Variant, string> = {
  go: "bg-blue text-crust hover:brightness-110",
  ghost: "bg-surface0 text-text border-white/10 hover:bg-surface1",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** Polymorphic button: renders <a> when given href, otherwise <button>. */
export default function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = "go", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    const { variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
