import { RadioButtonProps } from "./RadioButton.index";

export default function ListWithInlineDescription({
  item,
  ...rest
}: RadioButtonProps) {
  return (
    <div key={item.id} className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={item.id}
          type="radio"
          defaultValue={item.id}
          className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600"
          {...rest}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={item.id} className="font-medium text-gray-900">
          {item.label}
        </label>{" "}
        <span id={`${item.id}-description`} className="text-gray-500">
          {item.description}
        </span>
      </div>
    </div>
  );
}
