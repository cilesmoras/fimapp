import { VariantProps, cva } from "class-variance-authority";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";

const textArea = cva(
  [
    "block w-full rounded-md border-0 py-1.5 px-3 shadow-sm ring-1 ring-inset sm:text-sm sm:leading-6 outline-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-gray-900 placeholder:text-gray-400 ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-primary-600",
        ],
        danger: [
          "text-danger-900 placeholder:text-danger-400 ring-danger-300  focus:ring-2 focus:ring-inset focus:ring-danger-600",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

type TextareaProps<T extends FieldValues> = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  VariantProps<typeof textArea> & {
    label?: string;
    name: Path<T>;
    optional?: boolean;
    control?: Control<T>;
    helpText?: string;
  };

export default function Textarea<T extends FieldValues>({
  label,
  name,
  variant,
  optional,
  className,
  control,
  helpText,
  ...rest
}: TextareaProps<T>) {
  const { field } = useController({ name, control });

  return (
    <div>
      <div className="flex gap-2">
        {label && (
          <label
            htmlFor={label}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        )}
        {optional && (
          <span className="text-sm leading-6 text-gray-500">Optional</span>
        )}
      </div>
      <div className="mt-2">
        <textarea
          rows={4}
          id={label}
          className={twMerge(textArea({ variant, className }))}
          {...field}
          {...rest}
        />
        {helpText && (
          <p
            className={`mt-2 text-sm ${variant === "danger" ? "text-red-600" : "text-gray-500"}`}
          >
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
}
