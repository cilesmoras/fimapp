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

  const COLUMNS = [
    { name: "iteration", label: "#", size: undefined, content: undefined },
    { name: "code", label: "Code", size: undefined, content: undefined },
    { name: "name", label: "Name", size: undefined, content: undefined },
    {
      name: "description",
      label: "Description",
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
