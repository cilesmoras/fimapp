import { XMarkIcon } from "@heroicons/react/20/solid";
import TextInput from "@ui/TextInput";
import {
  Control,
  FieldArrayWithId,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFieldArrayRemove,
  useWatch,
} from "react-hook-form";
import {
  ObligationRequestFormValues,
  UtilizationStatusFormValues,
} from "../ObligationRequests.form";

type UtilizationStatusRowProps = {
  control: Control<ObligationRequestFormValues>;
  field: FieldArrayWithId<UtilizationStatusFormValues>;
  index: number;
  remove: UseFieldArrayRemove | undefined;
  error?: Merge<FieldError, FieldErrorsImpl<UtilizationStatusFormValues>>;
};

export default function UtilizationStatusRow({
  control,
  field,
  index,
  remove,
  error,
}: UtilizationStatusRowProps) {
  const utilizationAmountWatch = useWatch({
    control,
    name: `utilization_status.${index}.utilization_amount`,
  });
  const payableWatch = useWatch({
    control,
    name: `utilization_status.${index}.payable`,
  });
  const paymentWatch = useWatch({
    control,
    name: `utilization_status.${index}.payment`,
  });

  function computeNotYetDueAmount() {
    return utilizationAmountWatch - payableWatch;
  }

  function computeDueAndDemandableAmount() {
    return payableWatch - paymentWatch;
  }

  return (
    <tr key={field.id}>
      <td className="p-2">
        <TextInput
          type="date"
          name={`utilization_status.${index}.date`}
          control={control}
          className="min-w-[8rem]"
          variant={error && "danger"}
          helpText={error?.message}
        />
      </td>
      <td className="p-2">
        <TextInput
          name={`utilization_status.${index}.particulars`}
          control={control}
          className="min-w-[8rem]"
        />
      </td>
      <td className="p-2">
        <TextInput
          name={`utilization_status.${index}.ref_no`}
          control={control}
          className="min-w-[8rem]"
        />
      </td>
      <td className="p-2">
        <TextInput
          type="number"
          step=".01"
          min="0"
          name={`utilization_status.${index}.utilization_amount`}
          control={control}
          className="min-w-[8rem]"
        />
      </td>
      <td className="p-2">
        <TextInput
          type="number"
          step=".01"
          min="0"
          name={`utilization_status.${index}.payable`}
          control={control}
          className="min-w-[8rem]"
        />
      </td>
      <td className="p-2">
        <TextInput
          type="number"
          step=".01"
          min="0"
          name={`utilization_status.${index}.payment`}
          control={control}
          className="min-w-[8rem]"
        />
      </td>
      <td className="p-2">{computeNotYetDueAmount().toLocaleString()}</td>
      <td className="p-2">
        {computeDueAndDemandableAmount().toLocaleString()}
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
