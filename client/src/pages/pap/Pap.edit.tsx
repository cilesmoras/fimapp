import { useFetchOnePAP } from "@hooks/usePAP.hook";
import Breadcrumbs from "@ui/Breadcrumbs";
import { useParams } from "react-router-dom";
import PapForm from "./Pap.form";

const BREADCRUMBS = [
  { name: "Program, Activities, Projects", href: "/pap", current: false },
  { name: "Edit", href: "#", current: true },
];

export default function PapEdit() {
  const { id } = useParams();
  const { data, isLoading } = useFetchOnePAP(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="mb-6">
        <Breadcrumbs pages={BREADCRUMBS} />
      </div>
      <PapForm id={id} papData={data} />
    </>
  );
}
