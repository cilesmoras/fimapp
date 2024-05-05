import Breadcrumbs from "@ui/Breadcrumbs";
import ObligationRequestsForm from "./ObligationRequests.form";

const BREADCRUMBS = [
  {
    name: "Obligation Request and Status",
    href: "/obligation-requests",
    current: false,
  },
  { name: "Add", href: "/#", current: true },
];

export default function ObligationRequestsAdd() {
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <ObligationRequestsForm />
    </>
  );
}
