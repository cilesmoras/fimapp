import Button from "@ui/Button";
import TextInput from "@ui/TextInput";

export default function DashboardIndex() {
  return (
    <div>
      <h1 className="font-semibold text-gray-900 text-base">
        Obligation Request and Status
      </h1>
      <p className="text-gray-700 text-sm mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti odio
        quam nobis minus perferendis mollitia, cupiditate non optio, veniam
        aliquam consequatur. Quia dignissimos nisi, doloribus odio ipsam alias
        unde amet.
      </p>
      <Button variant="success">Save record</Button>
      <TextInput label="Dashboard Text" />
    </div>
  );
}
