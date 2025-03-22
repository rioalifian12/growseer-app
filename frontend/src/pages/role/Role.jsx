import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { fetchRole, deleteRole } from "../../services/ServiceRole";

const Role = () => {
  const [role, setRole] = useState([]);

  useEffect(() => {
    getRole();
  }, []);

  const getRole = async () => {
    try {
      const roles = await fetchRole();
      setRole(roles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ?`);
    if (confirmDelete) {
      await deleteRole(id);
      getRole();
    }
  };
  return (
    <>
      <div className="container mx-auto mt-5">
        <div className="card bg-base-100 w-full shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-2xl font-semibold">Data Role</h1>
            <div className="overflow-x-auto">
              <div className="mx-auto">
                <div className="card-actions justify-start mb-5">
                  <NavLink
                    to="/role/add"
                    className="btn btn-success text-white"
                  >
                    Add Role
                  </NavLink>
                </div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                  <table className="table table-zebra">
                    <thead className="bg-gray-200">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {role.length > 0 ? (
                        role.map((data, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{data.name}</td>
                            <td className="flex gap-2">
                              <NavLink
                                to={`/role/${data.id}`}
                                className="btn btn-primary text-white"
                              >
                                Detail
                              </NavLink>
                              <NavLink
                                to={`/role/edit/${data.id}`}
                                className="btn btn-primary text-white"
                              >
                                Edit
                              </NavLink>
                              <button
                                className="btn btn-error text-white"
                                onClick={() => handleDelete(data.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>No role found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Role;
