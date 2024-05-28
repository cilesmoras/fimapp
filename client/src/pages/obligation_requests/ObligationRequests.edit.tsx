import { useFetchOneObligationRequest } from "@hooks/useObligationRequest.hook";
import Breadcrumbs from "@ui/Breadcrumbs";
import Loading from "@ui/Loading";
import { useParams } from "react-router-dom";
import ObligationRequestsForm from "./ObligationRequests.form";

const BREADCRUMBS = [
  {
    name: "Obligation Request and Status",
    href: "/obligation-requests",
    current: false,
  },
  { name: "Edit", href: "/#", current: true },
];

export default function ObligationRequestsEdit() {
  const { id } = useParams();
  const { data, isLoading } = useFetchOneObligationRequest(id);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <ObligationRequestsForm data={data} />
    </>
  );
}
