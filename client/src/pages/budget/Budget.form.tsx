import { Budget } from "@customTypes/budget.types";
import { SelectOptionProps } from "@customTypes/uiComponents.types";
import { CheckIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInsertBudget, useUpdateBudget } from "@hooks/useBudget.hook";
import { useFetchChartOfAccounts } from "@hooks/useChartOfAccounts.hook";
import { useFetchPAP } from "@hooks/usePAP.hook";
import Button from "@ui/Button";
import ComboboxDropdown from "@ui/ComboboxDropdown";
import Loading from "@ui/Loading";
import Panel from "@ui/Panel";
import Select from "@ui/Select";
import SpinnerIcon from "@ui/SpinnerIcon";
import SuccessModal from "@ui/SuccessModal";
import TextInput from "@ui/TextInput";
import { truncateString } from "@utils/truncateString";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type Pap = {
  id: number;
  code: string;
  name: string;
  description: string;
};

// const chartOfAccountsSchema = z.object({
//   id: z.number(),
//   allotment_classes_id: z.number(),
//   code: z.string(),
//   name: z.string(),
// });

const budgetSchema = z.object({
  mfo_paps_id: z.coerce.number(),
  chart_of_accounts_id: z.coerce.number(),
  amount: z.coerce.number({ invalid_type_error: "Amount must be a number" }),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;

type BudgetProps = {
  budget?: Budget;
};

export default function BudgetForm({ budget }: BudgetProps) {
  const isAddMode = !budget;
  const pap = useFetchPAP();
  const [updatedPap, setUpdatedPap] = useState<SelectOptionProps[]>([]);
  const chartOfAccounts = useFetchChartOfAccounts();

  // update the PAP data to its new object format
  useEffect(() => {
    if (pap.isLoading) return;
    const newPap = pap.data.map((p: Pap) => {
      return { id: p.id, name: truncateString(`${p.code} - ${p.name}`, 80) };
    });
    setUpdatedPap(newPap);
  }, [pap.data, pap.isLoading]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      chart_of_accounts_id: 0,
    },
  });
  const isLoading = chartOfAccounts.isLoading || pap.isLoading;

  useEffect(() => {
    if (isLoading) return;
    if (isAddMode) {
      reset({
        mfo_paps_id: pap?.data[0].id,
        chart_of_accounts_id: chartOfAccounts?.data[0].id,
        amount: 0.0,
      });
      return;
    }

    const { mfo_paps_id, chart_of_accounts_id, amount } = budget;
    reset({
      mfo_paps_id,
      chart_of_accounts_id,
      amount: amount,
    });
  }, [reset, isLoading, chartOfAccounts.data, pap.data, budget, isAddMode]);

  const mfoPapError = errors.mfo_paps_id;
  const chartOfAccountsError = errors.chart_of_accounts_id;
  const amountError = errors.amount;

  const insertBudget = useInsertBudget();
  const updateBudget = useUpdateBudget(budget?.id);
  async function onSubmit(data: BudgetFormValues) {
    if (isAddMode) {
      await insertBudget.mutateAsync(data);
      reset();
      return;
    }

    await updateBudget.mutateAsync(data);
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <Panel width="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-gray-900 text-base mb-4">
            {isAddMode ? "Add new budget" : "Edit budget"}
          </h1>
          <div className="space-y-4">
            <Controller
              name="mfo_paps_id"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  label="Select PAP"
                  options={updatedPap}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={mfoPapError?.message}
                />
              )}
            />
            <ComboboxDropdown<BudgetFormValues>
              label="Select UACS"
              items={chartOfAccounts.data}
              name="chart_of_accounts_id"
              control={control}
              error={chartOfAccountsError?.message}
            />
            <TextInput
              name="amount"
              control={control}
              type="number"
              label="Amount"
              variant={amountError && "danger"}
              helpText={amountError?.message}
            />
          </div>
          <div className="sm:flex sm:justify-end sm:gap-4 mt-4">
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <SpinnerIcon /> Saving...
                </>
              ) : (
                <>
                  <CheckIcon className="-ml-0.5 size-5" aria-hidden="true" />{" "}
                  Save budget
                </>
              )}
            </Button>
          </div>
        </form>
      </Panel>
      <SuccessModal
        title="Save successfully"
        description="Budget has been saved."
        isOpen={insertBudget.isSuccess || updateBudget.isSuccess}
        buttonText="Close"
      />
    </>
  );
}
