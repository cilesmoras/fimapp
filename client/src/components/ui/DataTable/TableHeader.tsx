import { Columns } from "./DataTable";

export default function TableHeader({ columns }: { columns: Columns[] }) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            width={column.content ? column.size : ""}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
