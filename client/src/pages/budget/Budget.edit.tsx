import { useFetchOneBudget } from "@hooks/useBudget.hook";
import Breadcrumbs from "@ui/Breadcrumbs";
import Loading from "@ui/Loading";
import { useParams } from "react-router-dom";
import BudgetForm from "./Budget.form";

const BREADCRUMBS = [
  { name: "Budget", href: "/budget", current: false },
  { name: "Edit", href: "#", current: true },
];

// type Budget = {
//   id: number;
//   mfo_paps_id: number;
//   chart_of_accounts_id: number;
//   amount: number;
//   pap_name: string;
//   pap_desc: string;
//   pap_code: string;
//   account_code: string;
//   account_name: string;
//   allotment_classes_id: number;
//   allotment_classes_acronym: string;
//   allotment_classes_name: string;
// };

export default function BudgetEdit() {
  const { id } = useParams();
  const budget = useFetchOneBudget(id);

  if (budget.isLoading) return <Loading />;

  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <BudgetForm budget={budget.data} />
    </>
  );
}
