import { PlusIcon } from "@heroicons/react/16/solid";
import Customlink from "@ui/CustomLink";
import { Control, FieldErrors, UseFieldArrayReturn } from "react-hook-form";
import { ObligationRequestFormValues } from "../ObligationRequests.form";
import UtilizationStatusRow from "./UtilizationStatusRow";

const COLUMNS = [
  "Date",
  "Particulars",
  "Ref no.",
  "Utilization",
  "Payable",
  "Payment",
  "Not yet due",
  "Due & demandable",
];

type UtilizationStatusTableProps = {
  fieldsArray: UseFieldArrayReturn<
    ObligationRequestFormValues,
    "utilization_status",
    "id"
  >;
  control: Control<ObligationRequestFormValues>;
  errors?: FieldErrors<ObligationRequestFormValues>;
};

export default function UtilizationStatusTable({
  control,
  fieldsArray,
  errors,
}: UtilizationStatusTableProps) {
  const { append, fields, remove } = fieldsArray;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {COLUMNS.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      {column}
                    </th>
                  ))}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => {
                  const utilizationStatusError =
                    errors?.utilization_status?.[index];

                  return (
                    <UtilizationStatusRow
                      index={index}
                      control={control}
                      field={field}
                      remove={fields.length === 1 ? undefined : remove}
                      error={utilizationStatusError}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <Customlink
                to="#"
                onClick={() =>
                  append({
                    date: "",
                    particulars: "",
                    ref_no: "",
                    utilization_amount: 0,
                    payable: 0,
                    payment: 0,
                  })
                }
                size="md"
              >
                <PlusIcon className="-ml-0.5 mr-1 size-5" aria-hidden="true" />
                New status
              </Customlink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
