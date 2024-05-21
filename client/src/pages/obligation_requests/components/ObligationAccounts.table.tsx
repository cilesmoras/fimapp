import { Pap } from "@customTypes/pap.types";
import { SelectOptionProps } from "@customTypes/uiComponents.types";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useFetchChartOfAccounts } from "@hooks/useChartOfAccounts.hook";
import { useFetchPAP } from "@hooks/usePAP.hook";
import Customlink from "@ui/CustomLink";
import getSumOfArrayKey from "@utils/getSumOfArrayKey";
import { truncateString } from "@utils/truncateString";
import { useEffect, useState } from "react";
import { Control, UseFieldArrayReturn, useWatch } from "react-hook-form";
import { ObligationRequestFormValues } from "../ObligationRequests.form";
import AccountsEntryRow from "./AccountsEntryRow";

const columns = ["UACS", "PAP", "Amount"];

type ObligationAccountsTableProps = {
  fieldsArray: UseFieldArrayReturn<
    ObligationRequestFormValues,
    "obligation_accounts",
    "id"
  >;
  control: Control<ObligationRequestFormValues>;
};

export default function ObligationAccountsTable({
  fieldsArray,
  control,
}: ObligationAccountsTableProps) {
  const { fields, append, remove } = fieldsArray;
  const pap = useFetchPAP();
  const chartOfAccounts = useFetchChartOfAccounts();
  const [updatedPap, setUpdatedPap] = useState<SelectOptionProps[]>([]);
  const isLoading = pap.isLoading || chartOfAccounts.isLoading;
  const obligationAccountWatch = useWatch({
    control,
    name: "obligation_accounts",
  });

  const sumObligationAccountsTotalAmount = getSumOfArrayKey(
    obligationAccountWatch,
    "amount"
  );

  // update the PAP data to its new object format
  useEffect(() => {
    if (pap.isLoading) return;
    const newPap: SelectOptionProps[] = pap.data.map((p: Pap) => {
      return { id: p.id, name: truncateString(`${p.code} - ${p.name}`, 80) };
    });
    setUpdatedPap(newPap);
  }, [pap.data, pap.isLoading]);

  // adding initial row when the page loads
  useEffect(() => {
    if (isLoading) return;
    append({
      chart_of_accounts_id: chartOfAccounts?.data[0].id,
      mfo_paps_id: pap?.data[0].id,
      amount: 0,
    });
  }, [isLoading, chartOfAccounts?.data, pap?.data, append]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 w-1/3"
                    >
                      {column}
                    </th>
                  ))}

                  <th
                    scope="col"
                    className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                  >
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {!isLoading &&
                  fields.map((field, index) => (
                    <AccountsEntryRow
                      key={field.id}
                      pap={updatedPap}
                      chartOfAccounts={chartOfAccounts.data}
                      control={control}
                      field={field}
                      index={index}
                      remove={fields.length === 1 ? undefined : remove}
                    />
                  ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <Customlink
                to="#"
                onClick={() =>
                  append({
                    chart_of_accounts_id: chartOfAccounts?.data[0].id,
                    mfo_paps_id: pap?.data[0].id,
                    amount: 0,
                  })
                }
                size="md"
              >
                <PlusIcon className="-ml-0.5 mr-1 size-5" aria-hidden="true" />
                New account
              </Customlink>
              <div className="">
                <span className="font-medium text-lg text-gray-500">
                  Total (₱):
                </span>
                <span className="inline-block ml-5 font-semibold text-lg">
                  {/* {Number(sumObligationAccountsTotalAmount).toFixed(2)} */}
                  {sumObligationAccountsTotalAmount?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
