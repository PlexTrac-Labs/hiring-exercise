import { List, ListProps } from "@mui/material";

const ListBase: React.FC<ListProps> = (props: ListProps) => {
  return <List {...props}>{props.children}</List>;
};
export default ListBase;
