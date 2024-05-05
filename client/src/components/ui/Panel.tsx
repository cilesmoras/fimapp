/* eslint-disable @typescript-eslint/no-explicit-any */
import { VariantProps, cva } from "class-variance-authority";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const panel = cva(
  ["divide-y divide-gray-200 rounded-lg bg-white shadow"],
  {
    variants: {
      width: {
        sm: ["md:w-1/3"],
        md: ["lg:w-1/2"],
        lg: ["lg:w-3/4"],
        full: [""],
      },
    },
    defaultVariants: {
      width: "full",
    },
  }
);

// Define types for optional header and footer
type PanelProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof panel> & {
    children: ReactNode;
    width?: "sm" | "md" | "lg" | "full";
  };

export default function Panel({ width, className, children }: PanelProps) {
  // Extract header and footer components from children
  const header = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) && (child as any).type === PanelHeader
  );

  const footer = React.Children.toArray(children).find(
    (child) =>
      React.isValidElement(child) && (child as any).type === PanelFooter
  );

  // Filter out header and footer components from children to get the body
  const body = React.Children.toArray(children).filter(
    (child) =>
      React.isValidElement(child) &&
      (child as any).type !== PanelHeader &&
      (child as any).type !== PanelFooter
  );

  return (
    <div className={twMerge(panel({ width, className }))}>
      {header && <div className="px-4 py-5 sm:px-6">{header}</div>}
      <div className="px-4 py-5 sm:p-6">{body}</div>
      {footer && <div className="px-4 py-4 sm:px-6">{footer}</div>}
    </div>
  );
}

type PanelHeaderProps = {
  children: ReactNode;
};

// Header component
export function PanelHeader({ children }: PanelHeaderProps) {
  return <>{children}</>;
}

type PanelFooterProps = {
  children: ReactNode;
};

// Footer component
export function PanelFooter({ children }: PanelFooterProps) {
  return <>{children}</>;
}
