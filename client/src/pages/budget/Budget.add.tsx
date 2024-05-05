import Breadcrumbs from "@ui/Breadcrumbs";
import BudgetForm from "./Budget.form";

const BREADCRUMBS = [
  { name: "Budget", href: "/budget", current: false },
  { name: "Add", href: "#", current: true },
];

export default function BudgetAdd() {
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <BudgetForm />
    </>
  );
}
