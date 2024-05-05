import { ComboboxDropdownItem } from "@customTypes/uiComponents.types";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type ComboboxProps<T extends FieldValues> = {
  label?: string;
  items: ComboboxDropdownItem[];
  name: Path<T>;
  control?: Control<T>;
  error?: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComboboxDropdown<T extends FieldValues>({
  label,
  items,
  name,
  control,
  error,
  ...rest
}: ComboboxProps<T>) {
  const { field } = useController({ name, control });

  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      {...rest}
    >
      {label && (
        <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
          {label}
        </Combobox.Label>
      )}
      <div className="relative mt-2">
        <Combobox.Input
          className={`w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none ${error ? "ring-danger-300 focus:ring-danger-600" : "ring-gray-300 focus:ring-primary-600"}`}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(item: ComboboxDropdownItem) => item?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        {filteredItems?.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems?.map((item: ComboboxDropdownItem) => (
              <Combobox.Option
                key={item.id}
                value={item}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-primary-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={`block truncate ${selected && "font-semibold"}`}
                    >
                      {item.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-primary-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
      {error && <p className={`mt-2 text-sm text-red-600`}>{error}</p>}
    </Combobox>
  );
}
