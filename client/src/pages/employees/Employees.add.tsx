import Breadcrumbs from "@ui/Breadcrumbs";
import EmployeesForm from "./Employees.form";

const BREADCRUMBS = [
  { name: "Employees", href: "/employees", current: false },
  { name: "Add", href: "#", current: true },
];

export default function EmployeesAdd() {
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <EmployeesForm />
    </>
  );
}
