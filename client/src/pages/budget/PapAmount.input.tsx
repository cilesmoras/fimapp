import { useFetchPAP } from "@hooks/usePAP.hook";
import TextInput from "@ui/TextInput";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

export default function PapAmountInput<T>({control: Control<T>}) {
  const paps = useFetchPAP();
  const [updatedPaps, setUpdatedPaps] = useState<SelectOptionProps[]>([]);

  // update the PAP data to its new object format
  useEffect(() => {
  return <div>
    <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  type="number"
                  label="Amount"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  // variant={AMOUNT_ERROR && "danger"}
                  // helpText={AMOUNT_ERROR && AMOUNT_ERROR.message}
                />
              )}
            />
  </div>;
})
}