import { ObligationRequest } from "@customTypes/ObligationRequest.types";
import { CheckIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@ui/Button";
import SpinnerIcon from "@ui/SpinnerIcon";
import TextInput from "@ui/TextInput";
import Textarea from "@ui/Textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Panel from "./../../components/ui/Panel";
import ObligationAccountsTable from "./components/ObligationAccounts.table";
import UtilizationStatusTable from "./components/UtilizationStatusTable";

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

const utilizationStatusSchema = z.object({
  date: z.string().min(1, { message: "Required" }),
  particulars: z.string().min(1, { message: "Required" }),
  ref_no: z.string().min(1, { message: "Required" }),
  utilization_amount: z.coerce.number({
    invalid_type_error: "Amount must be a number",
  }),
  payable: z.coerce.number({ invalid_type_error: "Payable must be a number" }),
  payment: z.coerce.number({ invalid_type_error: "Payment must be a number" }),
});

export type ObligationAccountsFormValues = z.infer<
  typeof obligationAccountsSchema
>;

export type UtilizationStatusFormValues = z.infer<
  typeof utilizationStatusSchema
>;

const obligationRequestSchema = z.object({
  serial_no: z.string().min(1).max(45),
  fund_cluster: z.string().min(1).max(10),
  payee: z.string().min(1).max(200),
  payee_office: z.string().min(1).max(200),
  payee_office_address: z.string().max(200),
  particulars: z.string().min(1).max(400),
  date: z.string(),
  obligation_accounts: z.array(obligationAccountsSchema).nonempty(),
  utilization_status: z.array(utilizationStatusSchema).nonempty(),
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

  const obligationAccountsFieldsArray = useFieldArray({
    control,
    name: "obligation_accounts",
  });

  const utilizationStatusFieldsArray = useFieldArray({
    control,
    name: "utilization_status",
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
                    <TextInput
                      name="date"
                      control={control}
                      id="date"
                      type="date"
                      variant={dateError && "danger"}
                      helpText={dateError?.message}
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
                    <TextInput
                      name="serial_no"
                      control={control}
                      id="serial_no"
                      variant={serialNoError && "danger"}
                      helpText={serialNoError?.message}
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
                    <TextInput
                      name="fund_cluster"
                      control={control}
                      id="fund_cluster"
                      variant={fundClusterError && "danger"}
                      helpText={fundClusterError?.message}
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
                    <TextInput
                      name="payee"
                      control={control}
                      id="payee"
                      variant={payeeError && "danger"}
                      helpText={payeeError?.message}
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
                    <TextInput
                      name="payee_office"
                      control={control}
                      id="office"
                      variant={payeeOfficeError && "danger"}
                      helpText={payeeOfficeError?.message}
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
                    <TextInput
                      name="payee_office_address"
                      control={control}
                      id="office_address"
                      variant={payeeOfficeAddressError && "danger"}
                      helpText={payeeOfficeAddressError?.message}
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
                fieldsArray={obligationAccountsFieldsArray}
              />
            </div>
            <hr />
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Status of utilization
              </h2>
              <UtilizationStatusTable
                control={control}
                fieldsArray={utilizationStatusFieldsArray}
                // errors={errors}
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
