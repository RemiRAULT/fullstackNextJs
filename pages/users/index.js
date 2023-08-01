import axios from "axios";
import { Layout } from "components/Layout";
import { UserCard } from "components/UserCard";

function UsersPage({ users = [] }) {
  const renderUsers = () => {
    if (users.length === 0) return <h1>No Users</h1>;
    return users.map((user) => (
      <UserCard key={user.id} user={user} />
    ));
  };

  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {renderUsers()}
      </div>
    </Layout>
  );
}

export default UsersPage;

export const getServerSideProps = async () => {
  const { data: users } = await axios.get(
    "http://localhost:3000/api/users"
  );

  return {
    props: {
      users,
    },
  };
};
