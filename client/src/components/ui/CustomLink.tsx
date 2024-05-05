import { VariantProps, cva } from "class-variance-authority";
import { Link, LinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const link = cva(["font-semibold"], {
  variants: {
    linkType: {
      default: [
        "inline-flex items-center text-primary-600",
        "hover:text-indigo-900",
      ],
      button: [
        "text-white",
        "bg-primary-600",
        "hover:bg-primary-500",
        "focus-visible:outline-primary-600",
        "inline-flex",
        "items-center",
        "gap-x-1.5",
        "rounded",
        "shadow-sm",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
      ],
    },
    size: {
      none: [""],
      xs: ["px-2", "py-1", "text-xs"],
      sm: ["px-2", "py-1", "text-sm"],
      md: ["px-2.5", "py-1.5", "text-sm"],
      lg: ["px-3", "py-2", "text-sm"],
      xl: ["px-3.5", "py-2.5", "text-sm"],
    },
  },
  defaultVariants: {
    linkType: "default",
    size: "none",
  },
});

type CustomLinkProps = VariantProps<typeof link> &
  LinkProps &
  React.RefAttributes<HTMLAnchorElement>;

export default function Customlink({
  linkType,
  size,
  className,
  ...props
}: CustomLinkProps) {
  return (
    <Link className={twMerge(link({ linkType, size, className }))} {...props} />
  );
}
