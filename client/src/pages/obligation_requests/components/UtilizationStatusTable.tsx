import { ObligationUtilizationStatus } from "@customTypes/obligationUtilizationStatus.types";
import { PlusIcon } from "@heroicons/react/16/solid";
import Customlink from "@ui/CustomLink";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Control, FieldErrors, UseFieldArrayReturn } from "react-hook-form";
import { ObligationRequestFormValues } from "../ObligationRequests.form";
import UtilizationStatusRow from "./UtilizationStatusRow";

const COLUMNS = [
  "Date",
  "Particulars",
  "Ref no.",
  "Utilization (a)",
  "Payable (b)",
  "Payment (c)",
  "Not yet due (a-b)",
  "Due & demandable (b-c)",
];

type UtilizationStatusTableProps = {
  fieldsArray: UseFieldArrayReturn<
    ObligationRequestFormValues,
    "utilization_status",
    "id"
  >;
  control: Control<ObligationRequestFormValues>;
  errors?: FieldErrors<ObligationRequestFormValues>;
  utilizationStatuses?: ObligationUtilizationStatus[];
};

const DEFAULT_VALUES = {
  date: "",
  particulars: "",
  ref_no: "",
  utilization_amount: 0,
  payable: 0,
  payment: 0,
};

export default function UtilizationStatusTable({
  control,
  fieldsArray,
  errors,
  utilizationStatuses,
}: UtilizationStatusTableProps) {
  const { append, fields, remove } = fieldsArray;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;
    if (!utilizationStatuses) return;
    if (utilizationStatuses.length > 0) {
      utilizationStatuses.map((stat: ObligationUtilizationStatus) => {
        const formattedDate = stat?.date
          ? format(stat?.date, "yyyy-MM-dd")
          : undefined;
        append({
          date: formattedDate as string,
          particulars: stat.particulars,
          ref_no: stat.ref_no,
          utilization_amount: stat.utilization_amount,
          payable: stat.payable,
          payment: stat.payment,
        });
      });
    } else {
      append(DEFAULT_VALUES);
    }
    return () => {
      setIsMounted(true);
    };
  }, [append, isMounted, utilizationStatuses]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {COLUMNS.map((column, index) => (
                    <th
                      key={index}
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
                  return (
                    <UtilizationStatusRow
                      key={field.id}
                      index={index}
                      control={control}
                      field={field}
                      remove={fields.length === 1 ? undefined : remove}
                      error={errors?.utilization_status?.[index]}
                    />
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <Customlink
                to="#"
                onClick={() => append(DEFAULT_VALUES)}
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
