import { CheckIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@ui/Button";
import Panel from "@ui/Panel";
import SpinnerIcon from "@ui/SpinnerIcon";
import TextInput from "@ui/TextInput";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import ObligationAccountsTable from "./ObligationAccounts.table";

const chartOfAccountsSchema = z.object({
  id: z.number(),
  allotment_classes_id: z.number(),
  code: z.string(),
  name: z.string(),
});

const obligationAccountsSchema = z.object({
  // id: z.number(),
  mfo_paps_id: z.coerce.number(),
  chart_of_accounts_id: chartOfAccountsSchema,
  amount: z.coerce.number({ invalid_type_error: "Amount must be a number" }),
});

export type ObligationAccounts = {
  obligation_accounts: z.infer<typeof obligationAccountsSchema>[];
};

const obligationRequestsSchema = z.object({
  serial_no: z.string().min(1).max(45),
  fund_cluster: z.string().min(1).max(10),
  payee: z.string().min(1).max(200),
  payee_office: z.string().min(1).max(200),
  payee_office_address: z.string().max(200),
  particulars: z.string().min(1).max(400),
  date: z.string(),
  // date: z.string().date(),
});

export type ObligationRequest = z.infer<typeof obligationRequestsSchema> &
  ObligationAccounts;

type ObligationRequestProps = {
  data?: ObligationRequest;
};

export default function ObligationRequestsForm({
  data,
}: ObligationRequestProps) {
  const isAddMode = !data;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ObligationRequest>({
    resolver: zodResolver(obligationRequestsSchema),
  });
  const fieldsArray = useFieldArray({
    control,
    name: "obligation_accounts",
  });

  const serialNoError = errors.serial_no;
  const fundClusterError = errors.fund_cluster;
  const particularsError = errors.particulars;
  const payeeError = errors.payee;
  const payeeOfficeError = errors.payee_office;
  const payeeOfficeAddressError = errors.payee_office_address;
  const DATE_ERROR = errors.date;

  async function onSubmit(data: ObligationRequest) {
    console.log(data);
  }
  208.7;
  return (
    <>
      <Panel width="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="font-semibold text-gray-900 text-base mb-4">
              {isAddMode ? "Add new ORS" : "Edit ORS"}
            </h1>
            <div className="flex flex-col gap-y-8 sm:flex-row sm:gap-x-14">
              <div className="basis-1/2 space-y-4">
                <Controller
                  name="serial_no"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Serial no."
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      variant={serialNoError && "danger"}
                      helpText={serialNoError?.message}
                    />
                  )}
                />
                <Controller
                  name="fund_cluster"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Fund cluster"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      variant={fundClusterError && "danger"}
                      helpText={fundClusterError?.message}
                    />
                  )}
                />
                <Controller
                  name="particulars"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Particulars"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      variant={particularsError && "danger"}
                      helpText={particularsError?.message}
                    />
                  )}
                />
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      type="date"
                      label="Date"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      variant={DATE_ERROR && "danger"}
                      helpText={DATE_ERROR?.message}
                    />
                  )}
                />
              </div>
              <div className="basis-1/2 space-y-4">
                <h2 className="text-base leading-7 text-gray-900">
                  Payee information
                </h2>
                <Controller
                  name="payee"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Name"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      variant={payeeError && "danger"}
                      helpText={payeeError?.message}
                    />
                  )}
                />
                <Controller
                  name="payee_office"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Office"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      variant={payeeOfficeError && "danger"}
                      helpText={payeeOfficeError?.message}
                    />
                  )}
                />
                <Controller
                  name="payee_office_address"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label="Office address"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value || ""}
                      variant={payeeOfficeAddressError && "danger"}
                      helpText={payeeOfficeAddressError?.message}
                    />
                  )}
                />
              </div>
            </div>
            <ObligationAccountsTable
              control={control}
              fieldsArray={fieldsArray}
            />
          </div>
        </form>
      </Panel>
      <div className="sm:flex sm:justify-end sm:gap-4 mt-4">
        <Button type="submit" size="xl" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <SpinnerIcon /> Saving...
            </>
          ) : (
            <>
              <CheckIcon className="-ml-0.5 size-5" aria-hidden="true" /> Save
              ORS
            </>
          )}
        </Button>
      </div>
    </>
  );
}
