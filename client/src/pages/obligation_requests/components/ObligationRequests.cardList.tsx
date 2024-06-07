import {
  ObligationRequest,
  ViewObligationRequest,
} from "@customTypes/ObligationRequest.types";
import {
  useDeleteObligationRequest,
  useFetchObligationRequests,
} from "@hooks/useObligationRequest.hook";
import DeleteModal from "@ui/DeleteModal";
import Loading from "@ui/Loading";
import { useState } from "react";
import ObligationRequestCard from "./ObligationRequests.card";

export default function ObligationRequestCardList() {
  const { data: obligationRequests, isLoading } = useFetchObligationRequests();
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedObligationRequest, setSelectedObligationRequest] =
    useState<ObligationRequest>();
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  function handleDeleteModal(obligationRequest: ObligationRequest) {
    setDeleteModalIsOpen(true);
    setSelectedObligationRequest(obligationRequest);
  }

  const mutation = useDeleteObligationRequest();
  async function handleDeleteObligationRequest() {
    try {
      setIsDeleting(true);
      await mutation.mutateAsync(selectedObligationRequest?.id as number);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setDeleteModalIsOpen(false);
    }
  }

  if (isLoading) return <Loading />;

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {obligationRequests.map((request: ViewObligationRequest) => (
          <ObligationRequestCard
            key={request.id}
            handleDelete={handleDeleteModal}
            obligationRequest={request}
          />
        ))}
      </ul>
      <DeleteModal
        itemName={selectedObligationRequest?.serial_no as string}
        open={deleteModalIsOpen}
        setOpen={setDeleteModalIsOpen}
        handleDelete={handleDeleteObligationRequest}
        isDeleting={isDeleting}
      />
    </>
  );
}
