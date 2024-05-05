import { useFetchOneBudget } from "@hooks/useBudget.hook";
import Breadcrumbs from "@ui/Breadcrumbs";
import Loading from "@ui/Loading";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BudgetForm, { BudgetSchema } from "./Budget.form";

const BREADCRUMBS = [
  { name: "Budget", href: "/budget", current: false },
  { name: "Edit", href: "#", current: true },
];

type Budget = {
  id: number;
  mfo_paps_id: number;
  chart_of_accounts_id: number;
  amount: number;
  pap_name: string;
  pap_desc: string;
  pap_code: string;
  account_code: string;
  account_name: string;
  allotment_classes_id: number;
  allotment_classes_acronym: string;
  allotment_classes_name: string;
};

export default function BudgetEdit() {
  const { id } = useParams();
  const budget = useFetchOneBudget(id);
  // const [isLoading, setIsLoading] = uses
  const [data, setData] = useState<BudgetSchema>();

  useEffect(() => {
    if (budget.isLoading) return;
    const budgetData: Budget = budget.data;
    setData({
      mfo_paps_id: budgetData.mfo_paps_id,
      chart_of_accounts_id: {
        id: budgetData.chart_of_accounts_id,
        allotment_classes_id: budgetData.allotment_classes_id,
        code: budgetData.account_code,
        name: budgetData.account_name,
      },
      amount: budgetData.amount,
    });
  }, [budget.data, budget.isLoading]);

  if (budget.isLoading) return <Loading />;

  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <BudgetForm id={id} budgetData={data} />
    </>
  );
}
