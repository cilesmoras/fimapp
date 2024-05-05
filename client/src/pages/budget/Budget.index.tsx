import { PlusIcon } from "@heroicons/react/20/solid";
import Breadcrumbs from "@ui/Breadcrumbs";
import CustomLink from "@ui/CustomLink";
import BudgetTable from "./Budget.table";

const BREADCRUMBS = [{ name: "Budget", href: "#", current: true }];

export default function BudgetIndex() {
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <div className="sm:flex sm:gap-0 mb-5 sm:justify-between sm:items-center">
        <h1 className="font-semibold text-gray-900 text-base mb-2 sm:mb-0">
          Budget
        </h1>
        <CustomLink to="/budget/add" linkType="button" size="md">
          <PlusIcon className="-ml-0.5 size-5" aria-hidden="true" />
          Add new
        </CustomLink>
      </div>
      <BudgetTable />
    </>
  );
}
