import { useFetchOneChartOfAccount } from "@hooks/useChartOfAccounts.hook";
import Breadcrumbs from "@ui/Breadcrumbs";
import Loading from "@ui/Loading";
import { useParams } from "react-router-dom";
import ChartOfAccountsForm from "./ChartOfAccounts.form";

const BREADCRUMBS = [
  { name: "Chart of Accounts", href: "/chart-of-accounts", current: false },
  { name: "Edit", href: "#", current: true },
];

export default function ChartOfAccountsEdit() {
  const { id } = useParams();
  const { data, isLoading } = useFetchOneChartOfAccount(id);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <ChartOfAccountsForm id={id} accountData={data} />
    </>
  );
}
