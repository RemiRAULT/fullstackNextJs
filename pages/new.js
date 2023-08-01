import axios from "axios";
import { UserForm } from "components/UserForm";
import { Layout } from "components/Layout";

function NewPage() {
  return (
    <Layout>
      <div className="h-5/6 grid place-items-center">
        <UserForm />
      </div>
    </Layout>
  );
}
export default NewPage;

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/users");

  return {
    props: {
      users: res.data,
    },
  };
};
