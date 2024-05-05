import { truncateString } from "@utils/truncateString";
import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { DataTableColumns, DataTableItems } from "./DataTable";

const tableCellStyle = cva(["pl-4 pr-3 text-sm text-gray-900 sm:pl-6"], {
  variants: {
    condensed: {
      false: ["py-4"],
      true: ["py-2"],
    },
  },
  defaultVariants: {
    condensed: false,
  },
});

type TableBodyProps = VariantProps<typeof tableCellStyle> & {
  items: DataTableItems[];
  columns: DataTableColumns[];
  isTruncated?: boolean;
};

type CellColumnProps = {
  name: string;
  label: string;
  content?: (item: { id: number; name: string }) => ReactNode;
};

export default function TableBody({
  items,
  columns,
  condensed,
  isTruncated,
}: TableBodyProps) {
  
  function renderCell(
    item: DataTableItems,
    column: CellColumnProps,
    rowIndex: number
  ): ReactNode {
    const cellValue = item[column.name];

    if (column.name === "iteration")
      return <span className="text-gray-500">{rowIndex + 1}.</span>;

    if (column.content)
      return column.content({
        id: item.id as number,
        name: item.name as string,
      });

    if (isNaN(cellValue as number)) {
      return isTruncated
        ? truncateString(cellValue as string, 100)
        : (cellValue as string);
    }

    return Number(cellValue).toLocaleString();
  }

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {items?.map((item, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((column, colIndex) => (
            <td
              key={colIndex}
              className={twMerge(tableCellStyle({ condensed }))}
              align={column.alignment === "right" ? "right" : "left"}
            >
              {renderCell(item, column, rowIndex)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
