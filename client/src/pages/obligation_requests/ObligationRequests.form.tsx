import { ObligationRequest } from "@customTypes/ObligationRequest.types";
import { CheckIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@ui/Button";
import SpinnerIcon from "@ui/SpinnerIcon";
import TextInput from "@ui/TextInput";
import Textarea from "@ui/Textarea";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Panel from "./../../components/ui/Panel";
import ObligationAccountsTable from "./components/ObligationAccounts.table";

const chartOfAccountsSchema = z.object({
  id: z.number(),
  allotment_classes_id: z.number(),
  code: z.string(),
  name: z.string(),
});

const obligationAccountsSchema = z.object({
  mfo_paps_id: z.coerce.number(),
  chart_of_accounts_id: chartOfAccountsSchema,
  amount: z.coerce.number({ invalid_type_error: "Amount must be a number" }),
});

export type ObligationAccountsFormValues = {
  obligation_accounts: z.infer<typeof obligationAccountsSchema>[];
};

const obligationRequestSchema = z.object({
  serial_no: z.string().min(1).max(45),
  fund_cluster: z.string().min(1).max(10),
  payee: z.string().min(1).max(200),
  payee_office: z.string().min(1).max(200),
  payee_office_address: z.string().max(200),
  particulars: z.string().min(1).max(400),
  date: z.string(),
  obligation_accounts: z.array(obligationAccountsSchema).nonempty(),
});

export type ObligationRequestFormValues = z.infer<
  typeof obligationRequestSchema
>;

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
  } = useForm<ObligationRequestFormValues>({
    resolver: zodResolver(obligationRequestSchema),
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
  const dateError = errors.date;

  async function onSubmit(data: ObligationRequestFormValues) {
    console.log(data);
  }

  return (
    <>
      <Panel width="full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                {isAddMode ? "Create new ORS" : "Edit ORS"}
              </h2>

              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Date
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0 lg:w-1/2">
                    <Controller
                      name="date"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          id="date"
                          type="date"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ""}
                          variant={dateError && "danger"}
                          helpText={dateError?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-4">
                  <label
                    htmlFor="serial_no"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Serial no.
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0 lg:w-1/2">
                    <Controller
                      name="serial_no"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          id="serial_no"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ""}
                          variant={serialNoError && "danger"}
                          helpText={serialNoError?.message}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-4">
                  <label
                    htmlFor="fund_cluster"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Fund cluster
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0 lg:w-1/2">
                    <Controller
                      name="fund_cluster"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          id="fund_cluster"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ""}
                          variant={fundClusterError && "danger"}
                          helpText={fundClusterError?.message}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-4">
                  <label
                    htmlFor="particulars"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Particulars
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0 lg:w-1/2">
                    <Textarea
                      id="particulars"
                      name="particulars"
                      control={control}
                      variant={particularsError && "danger"}
                      helpText={particularsError?.message}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Payee Information
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                Please enter the details of the payee
              </p>

              <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-4">
                  <label
                    htmlFor="payee"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Name
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0 lg:w-1/2">
                    <Controller
                      name="payee"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          id="payee"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ""}
                          variant={payeeError && "danger"}
                          helpText={payeeError?.message}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-4">
                  <label
                    htmlFor="office"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Office
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0 lg:w-1/2">
                    <Controller
                      name="payee_office"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          id="office"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value || ""}
                          variant={payeeOfficeError && "danger"}
                          helpText={payeeOfficeError?.message}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-4">
                  <label
                    htmlFor="office_address"
                    className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                  >
                    Office address
                  </label>
                  <div className="mt-2 sm:col-span-2 sm:mt-0 lg:w-1/2">
                    <Controller
                      name="payee_office_address"
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          id="office_address"
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
              </div>
            </div>
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Obligations
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                Please enter atleast one
              </p>
              <ObligationAccountsTable
                control={control}
                fieldsArray={fieldsArray}
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <div className="sm:flex sm:justify-end sm:gap-4 mt-4">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <SpinnerIcon /> Saving...
                  </>
                ) : (
                  <>
                    <CheckIcon className="-ml-0.5 size-5" aria-hidden="true" />{" "}
                    Save ORS
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Panel>
    </>
  );
}
