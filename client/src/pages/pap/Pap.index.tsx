import { PlusIcon } from "@heroicons/react/20/solid";
import Breadcrumbs from "@ui/Breadcrumbs";
import CustomLink from "@ui/CustomLink";
import PapTable from "./Pap.table";

const BREADCRUMBS = [
  { name: "Program, Activities, Projects", href: "#", current: true },
];

export default function PapIndex() {
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <div className="sm:flex sm:gap-0 mb-5 sm:justify-between sm:items-center">
        <h1 className="font-semibold text-gray-900 text-base mb-2 sm:mb-0">
          Programs, Activities, Projects (PAPs)
        </h1>
        <CustomLink to="/pap/add" linkType="button" size="md">
          <PlusIcon className="-ml-0.5 size-5" aria-hidden="true" />
          Add new
        </CustomLink>
      </div>
      <PapTable />
    </>
  );
}
