import { useFetchOneEmployee } from "@hooks/useEmployees.hook";
import Breadcrumbs from "@ui/Breadcrumbs";
import Loading from "@ui/Loading";
import { useParams } from "react-router-dom";
import EmployeesForm from "./Employees.form";

const BREADCRUMBS = [
  { name: "Employees", href: "/employees", current: false },
  { name: "Edit", href: "#", current: true },
];

export default function EmployeesEdit() {
  const { id } = useParams();
  const { data, isLoading } = useFetchOneEmployee(id);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <EmployeesForm id={id} employeeData={data} />
    </>
  );
}
