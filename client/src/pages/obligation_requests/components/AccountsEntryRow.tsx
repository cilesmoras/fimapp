import {
  ComboboxDropdownItem,
  SelectOptionProps,
} from "@customTypes/uiComponents.types";
import { XMarkIcon } from "@heroicons/react/20/solid";
import ComboboxDropdown from "@ui/ComboboxDropdown";
import Select from "@ui/Select";
import TextInput from "@ui/TextInput";
import {
  Control,
  Controller,
  FieldArrayWithId,
  UseFieldArrayRemove,
} from "react-hook-form";
import {
  ObligationAccountsFormValues,
  ObligationRequestFormValues,
} from "../ObligationRequests.form";

type AccountsEntryRowProps = {
  pap: SelectOptionProps[];
  chartOfAccounts: ComboboxDropdownItem[];
  control: Control<ObligationRequestFormValues>;
  field: FieldArrayWithId<ObligationAccountsFormValues>;
  index: number;
  remove: UseFieldArrayRemove | undefined;
};

export default function AccountsEntryRow({
  pap,
  chartOfAccounts,
  control,
  field,
  index,
  remove,
}: AccountsEntryRowProps) {
  return (
    <tr key={field.id}>
      <td className="whitespace-nowrap px-2 py-2">
        <ComboboxDropdown<ObligationRequestFormValues>
          items={chartOfAccounts}
          name={`obligation_accounts.${index}.chart_of_accounts_id`}
          control={control}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <Controller
          name={`obligation_accounts.${index}.mfo_paps_id`}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              options={pap}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </td>
      <td className="whitespace-nowrap px-2 py-2">
        <TextInput
          name={`obligation_accounts.${index}.amount`}
          control={control}
          type="number"
          className="basis-full"
        />
      </td>
      <td className="flex whitespace-nowrap px-2 py-2">
        <XMarkIcon
          onClick={() => (remove === undefined ? undefined : remove(index))}
          className="size-8 mt-2 text-danger-500 p-1 hover:bg-danger-50 cursor-pointer"
        />
      </td>
    </tr>
  );
}
