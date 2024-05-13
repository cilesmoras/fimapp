import {
  useDeleteChartOfAccount,
  useFetchChartOfAccountsByAllotmentClassesId,
} from "@hooks/useChartOfAccounts.hook";
import DataTable from "@ui/DataTable/DataTable";
import DeleteModal from "@ui/DeleteModal";
import Loading from "@ui/Loading";
import { DataTableContentItemProps } from "@utils/globalTypes";
import { useState } from "react";
import { Link } from "react-router-dom";

type ChartOfAccountsTableProps = {
  allotmentClassId: string;
};

export default function ChartOfAccountsTable({
  allotmentClassId,
}: ChartOfAccountsTableProps) {
  const { data, isLoading } =
    useFetchChartOfAccountsByAllotmentClassesId(allotmentClassId);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<DataTableContentItemProps>({ id: 0, name: "" });

  function handleDeleteModal(item: DataTableContentItemProps) {
    setDeleteModalIsOpen(true);
    setSelectedAccount(item);
  }

  const COLUMNS = [
    { name: "iteration", label: "#", size: undefined, content: undefined },
    { name: "name", label: "Name", size: undefined, content: undefined },
    { name: "code", label: "Code", size: undefined, content: undefined },
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

  const deleteAccount = useDeleteChartOfAccount();
  async function handleDeleteAccount() {
    try {
      setIsDeleting(true);
      await deleteAccount.mutateAsync(selectedAccount?.id);
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
        itemName={selectedAccount.name}
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        handleDelete={handleDeleteAccount}
        isDeleting={isDeleting}
      />
    </>
  );
}
