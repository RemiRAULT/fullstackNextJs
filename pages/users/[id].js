import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Layout } from "components/Layout";

function UserPage({ user }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/users/" + id);
      toast.success("Task deleted");
      router.push("/");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-white dark:bg-gray-800">
        <p>Email : {user.email}</p>
        <p>Role : {user.role}</p>
      </div>

      <div className="mt-7 flex justify-center">
        <button
          className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
          onClick={() => handleDelete(user.id)}
        >
          delete
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-800 ml-2 py-2 px-5 rounded"
          onClick={() => router.push("/users/edit/" + user.id)}
        >
          Edit
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { data: user} = await axios.get(
    "http://localhost:3000/api/users/" + query.id
  );

  console.log(user)

  return {
    props: {
      user,
    },
  };
};

export default UserPage;
