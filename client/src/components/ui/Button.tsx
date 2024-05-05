import { cva, type VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const button = cva(
  [
    "inline-flex items-center gap-x-1.5 rounded font-semibold shadow-sm disabled:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-white",
          "bg-primary-600",
          "enabled:hover:bg-primary-500",
          "focus-visible:outline-primary-600",
        ],
        secondary: [
          "bg-white",
          "ring-1",
          "ring-inset",
          "ring-secondary-300",
          "border-secondary-400",
          "enabled:hover:bg-secondary-50",
          "focus-visible:outline-gray-500",
        ],
        success: [
          "text-white",
          "bg-success-600",
          "enabled:hover:bg-success-700",
          "focus-visible:outline-success-600",
        ],
        danger: [
          "text-white",
          "bg-danger-600",
          "enabled:hover:bg-danger-500",
          "focus-visible:outline-danger-600",
        ],
        warning: [
          "text-white",
          "bg-warning-600",
          "enabled:hover:bg-warning-500",
          "focus-visible:outline-warning-600",
        ],
      },
      size: {
        xs: ["px-2", "py-1", "text-xs"],
        sm: ["px-2", "py-1", "text-sm"],
        md: ["px-2.5", "py-1.5", "text-sm"],
        lg: ["px-3", "py-2", "text-sm"],
        xl: ["px-3.5", "py-2.5", "text-sm"],
      },
      btnType: {
        button: "",
        icon: "rounded-full p-1",
      },
    },
    compoundVariants: [
      { variant: "primary", size: "sm", className: "uppercase" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      btnType: "button",
    },
  }
);

type ButtonProps = VariantProps<typeof button> & ComponentProps<"button">;

export default function Button({
  className,
  variant,
  size,
  btnType,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(button({ variant, size, btnType, className }))}
      {...props}
    />
  );
}
