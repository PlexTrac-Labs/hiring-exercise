import { useParams } from "react-router";

const UserPasswordReset: React.FC = () => {
  const { userId } = useParams<string>();

  return <div>Reset Password for user {userId}</div>;
};
export default UserPasswordReset;
