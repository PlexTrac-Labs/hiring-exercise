import { TextField, TextFieldProps } from "@mui/material";

const TextFieldBase: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  return (
    <TextField
      size="small"
      fullWidth
      style={{ marginTop: "10px" }}
      {...props}
    />
  );
};
export default TextFieldBase;
