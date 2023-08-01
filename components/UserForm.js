import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export function UserForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role : "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const { data } = await axios.get("/api/users/" + id);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query?.id) {
      fetchUser(router.query.id);
    }
    console.log("called");
  }, [router.query.id]);

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query?.id) {
        await axios.put("/api/users/" + router.query.id, {
          email: user.email,
          password: user.password,
          role: user.role,
        });
        toast.success("Task Updated", {
          position: "bottom-center",
        });
      } else {
        await axios.post("/api/users", user);
        toast.success("Task Saved", {
          position: "bottom-center",
        });
      }

      router.push("/users");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email de l'utilisateur :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            type="text"
            placeholder="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"
          >
            Mot de passe de l'utilisateur :
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            id="password"
            name="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <div className="mb-4">
        <label
            htmlFor="role"
            className="block text-gray-700 dark:text-white font-bold mb-2 text-sm mt-4"
        >
            Rôle de l'utilisateur :
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
            id="role"
            name="role"
            onChange={handleChange}
            value={user.role}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Admin</option>   
          </select>

        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {router.query?.id ? "Update User" : "Save User"}
        </button>
      </form>
    </div>
  );
}
