interface Props {
  text1: string;
}

const Login: React.FC<Props> = props => {
  return <div>{props.text1}</div>;
};
export default Login;
