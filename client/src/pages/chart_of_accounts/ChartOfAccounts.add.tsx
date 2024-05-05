import Breadcrumbs from "@ui/Breadcrumbs";
import ChartOfAccountsForm from "./ChartOfAccounts.form";

const BREADCRUMBS = [
  { name: "Chart of Accounts", href: "/chart-of-accounts", current: false },
  { name: "Add", href: "#", current: true },
];

export default function ChartOfAccountsAdd() {
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <ChartOfAccountsForm />
    </>
  );
}
