import { CheckIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditEmployee, useInsertEmployee } from "@hooks/useEmployees.hook";
import Button from "@ui/Button";
import Panel from "@ui/Panel";
import SpinnerIcon from "@ui/SpinnerIcon";
import SuccessModal from "@ui/SuccessModal";
import TextInput from "@ui/TextInput";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const employeeSchema = z.object({
  prefix: z.string().max(10).optional(),
  first_name: z.string().max(45),
  mid_initial: z.string().max(5),
  last_name: z.string().max(45),
  suffix: z.string().max(10).optional(),
  job_title: z.string().max(45),
});

export type EmployeesSchema = z.infer<typeof employeeSchema>;

export type EmployeesProps = {
  id?: string;
  employeeData?: EmployeesSchema;
};

export default function EmployeesForm({ id, employeeData }: EmployeesProps) {
  const isAddMode = !employeeData;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeesSchema>({
    resolver: zodResolver(employeeSchema),
  });

  useEffect(() => {
    reset({
      prefix: employeeData?.prefix,
      first_name: employeeData?.first_name,
      mid_initial: employeeData?.mid_initial,
      last_name: employeeData?.last_name,
      suffix: employeeData?.suffix,
      job_title: employeeData?.job_title,
    });
  }, [employeeData, reset]);

  const PREFIX_ERROR = errors?.prefix;
  const FIRST_NAME_ERROR = errors?.first_name;
  const MID_INITIAL_ERROR = errors?.mid_initial;
  const LAST_NAME_ERROR = errors?.last_name;
  const SUFFIX_ERROR = errors?.suffix;
  const JOB_TITLE_ERROR = errors?.job_title;

  const insertEmployee = useInsertEmployee();
  const editEmployee = useEditEmployee(id);
  async function onSubmit(data: EmployeesSchema) {
    if (isAddMode) {
      await insertEmployee.mutateAsync(data);
      reset();
      return;
    }

    await editEmployee.mutateAsync(data);
  }

  return (
    <>
      <Panel width="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-gray-900 text-base mb-4">
            {isAddMode ? "Add new employee" : "Edit employee"}
          </h1>
          <div className="space-y-4">
            <Controller
              name="prefix"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Prefix"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  variant={PREFIX_ERROR && "danger"}
                  helpText={PREFIX_ERROR && PREFIX_ERROR.message}
                />
              )}
            />
            <Controller
              name="first_name"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="First name"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  variant={FIRST_NAME_ERROR && "danger"}
                  helpText={FIRST_NAME_ERROR && FIRST_NAME_ERROR.message}
                />
              )}
            />
            <Controller
              name="mid_initial"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Middle initial"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  variant={MID_INITIAL_ERROR && "danger"}
                  helpText={MID_INITIAL_ERROR && MID_INITIAL_ERROR.message}
                />
              )}
            />
            <Controller
              name="last_name"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Last name"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  variant={LAST_NAME_ERROR && "danger"}
                  helpText={LAST_NAME_ERROR && LAST_NAME_ERROR.message}
                />
              )}
            />
            <Controller
              name="suffix"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Suffix"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  variant={SUFFIX_ERROR && "danger"}
                  helpText={SUFFIX_ERROR && SUFFIX_ERROR.message}
                />
              )}
            />
            <Controller
              name="job_title"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Job title"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  variant={JOB_TITLE_ERROR && "danger"}
                  helpText={JOB_TITLE_ERROR && JOB_TITLE_ERROR.message}
                />
              )}
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
                  Save employee
                </>
              )}
            </Button>
          </div>
        </form>
      </Panel>
      <SuccessModal
        title="Save successfully"
        description="Employee has been saved."
        isOpen={insertEmployee.isSuccess || editEmployee.isSuccess}
        buttonText="Close"
      />
    </>
  );
}
