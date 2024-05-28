import { ViewObligationRequest } from "@customTypes/ObligationRequest.types";
import { useFetchObligationRequests } from "@hooks/useObligationRequest.hook";
import Loading from "@ui/Loading";
import ObligationRequestCard from "./ObligationRequests.card";

export default function ObligationRequestCardList() {
  const { data: obligationRequests, isLoading } = useFetchObligationRequests();

  if (isLoading) return <Loading />;
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {obligationRequests.map((request: ViewObligationRequest) => (
        <ObligationRequestCard key={request.id} obligationRequest={request} />
      ))}
    </ul>
  );
}
