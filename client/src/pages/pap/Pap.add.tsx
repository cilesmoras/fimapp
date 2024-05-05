import Breadcrumbs from "@ui/Breadcrumbs";
import PapForm from "./Pap.form";

const BREADCRUMBS = [
  { name: "Program, Activities, Projects", href: "/pap", current: false },
  { name: "Add", href: "#", current: true },
];

export default function PapAdd() {
  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <PapForm />
    </>
  );
}
