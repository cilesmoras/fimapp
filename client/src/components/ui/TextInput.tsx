import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const textInput = cva(
  [
    "block w-full rounded-md border-0 py-1.5 px-3 ring-1 shadow-sm ring-inset outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
  ],
  {
    variants: {
      variant: {
        primary: [
          "text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600",
        ],
        danger: [
          "text-red-900 focus:ring-red-500 ring-red-300 placeholder:text-red-300",
        ],
      },
    },
    compoundVariants: [
      {
        variant: "danger",
        className: "pr-10",
      },
    ],
    defaultVariants: {
      variant: "primary",
    },
  }
);

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof textInput> & {
    label?: string;
    helpText?: string;
    type?: "text" | "email" | "number" | "date";
    optional?: boolean;
  };

export default function TextInput({
  type = "text",
  label,
  helpText,
  variant,
  optional = false,
  className,
  ...rest
}: TextInputProps) {
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
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          id={label}
          type={type}
          className={twMerge(textInput({ variant, className }))}
          {...rest}
        />
        {variant === "danger" && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          </div>
        )}
      </div>
      {helpText && (
        <p
          className={`mt-2 text-sm ${variant === "danger" ? "text-red-600" : "text-gray-500"}`}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}
