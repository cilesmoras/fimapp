import { useDeleteEmployee, useFetchEmployees } from "@hooks/useEmployees.hook";
import DataTable from "@ui/DataTable/DataTable";
import DeleteModal from "@ui/DeleteModal";
import Loading from "@ui/Loading";
import { DataTableContentItemProps } from "@utils/globalTypes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type EmployeeProps = {
  id: string;
  prefix: string;
  first_name: string;
  mid_initial: string;
  last_name: string;
  suffix: string;
  job_title: string;
};

type EmployeeNameProps = {
  prefix: string;
  first_name: string;
  mid_initial: string;
  last_name: string;
  suffix: string;
};

export default function EmployeesTable() {
  const { data, isFetching } = useFetchEmployees();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({ id: 0, name: "" });
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isFetching) return;
    const formattedEmployees = data?.map((employee: EmployeeProps) => {
      return {
        id: employee.id,
        name: concatenateEmployeeName(employee),
        job_title: employee.job_title,
      };
    });

    setEmployees(formattedEmployees);
  }, [data, isFetching]);

  function concatenateEmployeeName(employee: EmployeeNameProps) {
    const { prefix, first_name, mid_initial, last_name } = employee;
    return [prefix, first_name, mid_initial, last_name]
      .filter(Boolean)
      .join(", ");
  }

  function handleDeleteModal(item: DataTableContentItemProps) {
    setSelectedEmployee(item);
    setDeleteModalIsOpen(true);
  }

  const deleteEmployee = useDeleteEmployee();
  async function handleDeleteEmployee() {
    try {
      setIsDeleting(true);
      await deleteEmployee.mutateAsync(selectedEmployee?.id);
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  const COLUMNS = [
    { name: "iteration", label: "#", size: undefined, content: undefined },
    { name: "name", label: "Name", size: undefined, content: undefined },
    {
      name: "job_title",
      label: "Job Title",
      size: undefined,
      content: undefined,
    },
    {
      name: "",
      label: "",
      size: 100,
      content: (item: DataTableContentItemProps) => (
        <div className="flex gap-3 font-medium text-sm">
          <Link
            to={`${item.id}/edit`}
            className="text-primary-600 hover:text-primary-900"
          >
            Edit
          </Link>
          <span
            onClick={() => handleDeleteModal(item)}
            className="text-primary-600 hover:text-primary-900 cursor-pointer"
          >
            Delete
          </span>
        </div>
      ),
    },
  ];

  if (isFetching) return <Loading />;

  return (
    <>
      <DataTable columns={COLUMNS} items={employees} />
      <DeleteModal
        itemName={selectedEmployee.name}
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        handleDelete={handleDeleteEmployee}
        isDeleting={isDeleting}
      />
    </>
  );
}
