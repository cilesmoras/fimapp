import ListWithInlineDescription from "./ListWithInlineDescription";

type RadioButtonItem = {
  id: string;
  label: string;
  description: string;
};

export type RadioButtonProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  item: RadioButtonItem;
};

export default function RadioButton({ item, ...rest }: RadioButtonProps) {
  return <ListWithInlineDescription item={item} {...rest} />;
}
