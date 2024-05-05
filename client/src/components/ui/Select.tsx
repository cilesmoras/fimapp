import { SelectOptionProps } from "@customTypes/uiComponents.types";
import { ComponentProps } from "react";

type SelectProps = ComponentProps<"select"> & {
  label?: string;
  defaultValue?: string;
  options: SelectOptionProps[];
  error?: string;
};

export default function Select({
  label,
  defaultValue,
  options,
  error,
  ...rest
}: SelectProps) {
  return (
    <div className="block truncate">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900 mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={label}
        {...rest}
        className={`w-full rounded-md border-0 py-1.5 pl-3 pr-10 outline-none text-gray-900 ring-1 ring-inset focus:ring-2 sm:text-sm sm:leading-6 ${error ? "ring-danger-300 focus:ring-danger-600" : "ring-gray-300 focus:ring-primary-600"}`}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option className="" key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <p
          className={`mt-2 text-sm ${error ? "text-red-600" : "text-gray-500"}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
