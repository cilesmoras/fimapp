import { useFetchAllotmentClasses } from "@hooks/useAllotmentClasses.hook";
import {
  useDeleteChartOfAccount,
  useFetchChartOfAccountsByAllotmentClassesId,
} from "@hooks/useChartOfAccounts.hook";
import DataTable from "@ui/DataTable/DataTable";
import DeleteModal from "@ui/DeleteModal";
import Loading from "@ui/Loading";
import Select from "@ui/Select";
import { DataTableContentItemProps } from "@utils/globalTypes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ChartOfAccountsTable() {
  const { data: allotmentClasses, isLoading: isLoadingAllotmentClasses } =
    useFetchAllotmentClasses();
  const [selectedAllotmentClassesId, setSelectedAllotmentClassesId] =
    useState("0");
  const { data, isLoading } = useFetchChartOfAccountsByAllotmentClassesId(
    selectedAllotmentClassesId
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] =
    useState<DataTableContentItemProps>({ id: 0, name: "" });

  // setting the default allotment classes id
  useEffect(() => {
    if (isLoadingAllotmentClasses) return;
    setSelectedAllotmentClassesId(allotmentClasses[0].id);
  }, [allotmentClasses, isLoadingAllotmentClasses]);

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
      {!isLoadingAllotmentClasses && (
        <div className="flex mb-4">
          <Select
            options={allotmentClasses}
            optionsValue="id"
            optionsLabel="acronym"
            defaultValue={selectedAllotmentClassesId}
            onChange={(e) => setSelectedAllotmentClassesId(e.target.value)}
          />
        </div>
      )}
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
