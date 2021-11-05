import { useParams } from "react-router";

const UserView: React.FC = () => {
  const { userId } = useParams();

  return (
    <>
      <div>User View {userId}!</div>
    </>
  );
};
export default UserView;
