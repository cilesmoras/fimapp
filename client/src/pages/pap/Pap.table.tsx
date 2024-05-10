import { DataTableColumns } from "@customTypes/uiComponents.types";
import { useDeletePAP, useFetchPAP } from "@hooks/usePAP.hook";
import DataTable from "@ui/DataTable/DataTable";
import DeleteModal from "@ui/DeleteModal";
import Loading from "@ui/Loading";
import { DataTableContentItemProps } from "@utils/globalTypes";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function PapTable() {
  const { data, isLoading } = useFetchPAP();
  const [deleteModalIsOpen, setDeleteModelIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPAP, setSelectedPAP] = useState<DataTableContentItemProps>({
    id: 0,
    name: "",
  });

  const COLUMNS: DataTableColumns[] = [
    { name: "iteration", label: "#" },
    { name: "code", label: "Code" },
    { name: "name", label: "Name" },
    {
      name: "description",
      label: "Description",
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
    setDeleteModelIsOpen(true);
    setSelectedPAP(item);
  }

  const deletePAP = useDeletePAP();
  async function handleDeletePAP() {
    try {
      setIsDeleting(true);
      await deletePAP.mutateAsync(selectedPAP.id);
      setDeleteModelIsOpen(false);
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
        itemName={selectedPAP.name}
        open={deleteModalIsOpen}
        setOpen={setDeleteModelIsOpen}
        handleDelete={handleDeletePAP}
        isDeleting={isDeleting}
      />
    </>
  );
}
