import { DataTableColumns } from "@customTypes/uiComponents.types";
import { useDeleteBudget, useFetchBudget } from "@hooks/useBudget.hook";
import DataTable from "@ui/DataTable/DataTable";
import DeleteModal from "@ui/DeleteModal";
import Loading from "@ui/Loading";
import { DataTableContentItemProps } from "@utils/globalTypes";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BudgetTable() {
  const { data, isLoading } = useFetchBudget();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedBudget, setSelectedBudget] =
    useState<DataTableContentItemProps>({ id: 0, name: "" });

  const COLUMNS: DataTableColumns[] = [
    {
      name: "account_name",
      label: "Account name",
    },
    {
      name: "pap_name",
      label: "PAP",
      isTruncated: true,
    },
    {
      name: "amount",
      label: "Amount",
      isNumber: true,
      alignment: "right",
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

  function handleDeleteModal(item: DataTableContentItemProps) {
    setDeleteModalIsOpen(true);
    setSelectedBudget(item);
  }

  const deleteBudget = useDeleteBudget();
  async function handleDeleteBudget() {
    try {
      setIsDeleting(true);
      await deleteBudget.mutateAsync(selectedBudget.id);
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <DataTable columns={COLUMNS} items={data} />
      <DeleteModal
        itemName={selectedBudget.name}
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        handleDelete={handleDeleteBudget}
        isDeleting={isDeleting}
      />
    </>
  );
}
