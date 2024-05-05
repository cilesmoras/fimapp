import { ReactNode } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export type DataTableItems = {
  [key: string]: unknown;
};

export type DataTableColumns = {
  name: string;
  label: string;
  size?: number;
  alignment?: string;
  content?: (item: { id: number; name: string }) => ReactNode;
};

export type DataTableProps = {
  items: DataTableItems[];
  columns: DataTableColumns[];
  condensed?: boolean;
  isTruncated?: boolean;
};

export default function DataTable({
  columns,
  items,
  condensed,
  isTruncated,
}: DataTableProps) {
  return (
    <div className="flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHeader columns={columns} />
              <TableBody
                columns={columns}
                items={items}
                condensed={condensed}
                isTruncated={isTruncated}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
