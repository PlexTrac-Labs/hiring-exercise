import { useParams } from "react-router";

const UserUpdate: React.FC = () => {
  const { userId } = useParams();

  return <div>User Update {userId} </div>;
};
export default UserUpdate;
