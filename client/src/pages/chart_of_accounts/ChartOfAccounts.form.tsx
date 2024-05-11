import { CheckIcon } from "@heroicons/react/16/solid";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchAllotmentClasses } from "@hooks/useAllotmentClasses.hook";
import {
  useEditChartOfAccount,
  useInsertChartOfAccount,
} from "@hooks/useChartOfAccounts.hook";
import Button from "@ui/Button";
import Panel from "@ui/Panel";
import RadioButton from "@ui/RadioGroups/RadioButton.index";
import SpinnerIcon from "@ui/SpinnerIcon";
import SuccessModal from "@ui/SuccessModal";
import TextInput from "@ui/TextInput";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const zSchema = z.object({
  allotmentClassesId: z.string(),
  code: z.string().max(15),
  name: z.string().max(120),
});

export type ChartOfAccountsSchema = z.infer<typeof zSchema>;

export type ChartOfAccountsProps = {
  id?: string;
  accountData?: ChartOfAccountsSchema;
};

type AllotmentClassesProps = {
  id: string;
  acronym: string;
  name: string;
  description: string;
  label: string;
};

export default function ChartOfAccountsForm({
  id,
  accountData,
}: ChartOfAccountsProps) {
  const isAddMode = !accountData;
  const { data: allotmentClasses, isLoading } = useFetchAllotmentClasses();
  const [allotmentClassesNew, setAllotmentClassesNew] = useState([]);

  // transformed allotment class data to new object
  useEffect(() => {
    if (isLoading) return;
    const result = allotmentClasses?.map(
      ({ id, name }: { id: string; name: string }) => {
        return { id, label: name, description: null };
      }
    );
    setAllotmentClassesNew(result);
  }, [allotmentClasses, isLoading]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChartOfAccountsSchema>({
    resolver: zodResolver(zSchema),
  });

  useEffect(() => {
    reset({
      code: accountData?.code,
      name: accountData?.name,
    });
  }, [accountData, reset]);

  const ALLOTMENT_CLASS_ID_ERROR = errors?.allotmentClassesId;
  const CODE_ERROR = errors?.code;
  const NAME_ERROR = errors?.name;

  const insertAccount = useInsertChartOfAccount();
  const updateAccount = useEditChartOfAccount(id);
  const onSubmit: SubmitHandler<ChartOfAccountsSchema> = async (data) => {
    if (isAddMode) {
      await insertAccount.mutateAsync(data);
      reset();
      return;
    }

    await updateAccount.mutateAsync(data);
  };

  return (
    <>
      <Panel width="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-gray-900 text-base mb-4">
            {isAddMode ? "Add new account" : "Edit account"}
          </h1>
          <div className="space-y-4">
            <div>
              <p
                className={`text-danger-600 text-sm mb-4 ${ALLOTMENT_CLASS_ID_ERROR ? "flex gap-2" : "hidden"}`}
              >
                <ExclamationCircleIcon className="size-5" />{" "}
                {ALLOTMENT_CLASS_ID_ERROR?.message}
              </p>
              <div className="space-y-5">
                {!isLoading &&
                  allotmentClassesNew.map(
                    (allotmentClass: AllotmentClassesProps) => (
                      <Controller
                        key={allotmentClass.id}
                        name="allotmentClassesId"
                        control={control}
                        render={({ field: { name, onChange, onBlur } }) => (
                          <RadioButton
                            defaultChecked={
                              allotmentClass.id ===
                              accountData?.allotmentClassesId
                            }
                            key={allotmentClass.id}
                            name={name}
                            item={allotmentClass}
                            onChange={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />
                    )
                  )}
              </div>
            </div>
            <TextInput
              name="code"
              control={control}
              label="Code"
              variant={CODE_ERROR && "danger"}
              helpText={CODE_ERROR && CODE_ERROR.message}
            />
            <TextInput
              name="name"
              control={control}
              label="Name"
              variant={NAME_ERROR && "danger"}
              helpText={NAME_ERROR && NAME_ERROR.message}
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
                  Save account
                </>
              )}
            </Button>
          </div>
        </form>
      </Panel>
      <SuccessModal
        title="Save successfully"
        description="Account has been saved."
        isOpen={insertAccount.isSuccess || updateAccount.isSuccess}
        buttonText="Close"
      />
    </>
  );
}
