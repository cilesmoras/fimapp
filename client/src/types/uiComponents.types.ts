import { ReactNode } from "react";

export type ComboboxDropdownItem = {
  id: string;
  name: string;
};

export type SelectOptionProps = {
  id: number;
  name: string;
};

export type DataTableColumns = {
  name: string;
  label: string;
  size?: number;
  alignment?: string;
  isNumber?: boolean;
  isTruncated?: boolean;
  content?: (item: { id: number; name: string }) => ReactNode;
};
