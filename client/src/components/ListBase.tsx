import { List, ListSubheader } from "@mui/material";

interface ListProps {
  listHeader: JSX.Element;
  children?: JSX.Element | JSX.Element[];
}

const ListBase: React.FC<ListProps> = (props: ListProps) => {
  return (
    <>
      <List
        subheader={
          <ListSubheader
            component="div"
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "lightgrey"
            }}
          >
            {props.listHeader}
          </ListSubheader>
        }
      >
        {props.children}
      </List>
    </>
  );
};
export default ListBase;
