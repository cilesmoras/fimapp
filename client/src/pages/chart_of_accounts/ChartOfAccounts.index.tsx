import { PlusIcon } from "@heroicons/react/20/solid";
import { useFetchAllotmentClasses } from "@hooks/useAllotmentClasses.hook";
import Breadcrumbs from "@ui/Breadcrumbs";
import CustomLink from "@ui/CustomLink";
import Loading from "@ui/Loading";
import Select from "@ui/Select";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ChartOfAccountsTable from "./ChartOfAccounts.table";

const BREADCRUMBS = [{ name: "Chart of Accounts", href: "#", current: true }];

export default function ChartOfAccountsIndex() {
  const { data, isFetching } = useFetchAllotmentClasses();
  const [searchParams, setSearchParams] = useSearchParams();
  const allotmentClassId = searchParams.get("allotmentClassId");
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ allotmentClassId: e.target.value });
  }

  // setting the initial value of useSearchParams
  useEffect(() => {
    if (isFetching) return;
    setSearchParams({ allotmentClassId: data[0].id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching]);

  if (isFetching) return <Loading />;

  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <div className="sm:flex sm:gap-0 mb-5 sm:justify-between sm:items-center">
        <h1 className="font-semibold text-gray-900 text-base mb-2 sm:mb-0">
          Chart of Accounts
        </h1>
        <CustomLink to="/chart-of-accounts/add" linkType="button" size="md">
          <PlusIcon className="-ml-0.5 size-5" aria-hidden="true" />
          Add new
        </CustomLink>
      </div>
      <div className="flex mb-4">
        <Select
          options={data}
          defaultValue={data[0].id}
          onChange={handleChange}
        />
      </div>
      {allotmentClassId && (
        <ChartOfAccountsTable
          key={allotmentClassId}
          allotmentClassId={allotmentClassId}
        />
      )}
    </>
  );
}
