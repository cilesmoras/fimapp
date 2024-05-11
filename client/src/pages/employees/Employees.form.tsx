import { CheckIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditEmployee, useInsertEmployee } from "@hooks/useEmployees.hook";
import Button from "@ui/Button";
import Panel from "@ui/Panel";
import SpinnerIcon from "@ui/SpinnerIcon";
import SuccessModal from "@ui/SuccessModal";
import TextInput from "@ui/TextInput";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

  const prefixError = errors?.prefix;
  const firstNameError = errors?.first_name;
  const midInitialError = errors?.mid_initial;
  const lastNameError = errors?.last_name;
  const suffixError = errors?.suffix;
  const jobTitleError = errors?.job_title;

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
            <TextInput
              name="prefix"
              control={control}
              label="Prefix"
              variant={prefixError && "danger"}
              helpText={prefixError?.message}
            />
            <TextInput
              name="first_name"
              control={control}
              label="First name"
              variant={firstNameError && "danger"}
              helpText={firstNameError?.message}
            />
            <TextInput
              name="mid_initial"
              control={control}
              label="Middle initial"
              variant={midInitialError && "danger"}
              helpText={midInitialError?.message}
            />
            <TextInput
              name="last_name"
              control={control}
              label="Last name"
              variant={lastNameError && "danger"}
              helpText={lastNameError?.message}
            />
            <TextInput
              name="suffix"
              control={control}
              label="Suffix"
              variant={suffixError && "danger"}
              helpText={suffixError?.message}
            />
            <TextInput
              name="job_title"
              control={control}
              label="Job title"
              variant={jobTitleError && "danger"}
              helpText={jobTitleError?.message}
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
