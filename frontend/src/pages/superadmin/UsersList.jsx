import { useState, useEffect } from "react";
import { fetchUsers } from "../../services/ServiceUser";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Users List</h1>
          <button className="btn btn-warning text-white rounded-box my-3">
            Tambah Admin
          </button>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th></th>
                  <th>Email</th>
                  <th>Nama</th>
                  <th>No HP</th>
                  <th>Alamat</th>
                  <th>Maps</th>
                  <th>Role</th>
                  <th>Kode Referral</th>
                  <th>Referral</th>
                  <th>Terakhir Aktif</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((data, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{data.email}</td>
                      <td>{data.name}</td>
                      <td>{data.phone}</td>
                      <td>{data.address ? data.address : "-"}</td>
                      <td>{data.mapsUrl ? data.mapsUrl : "-"}</td>
                      <td>{data.role}</td>
                      <td>{data.referralCode ? data.referralCode : "-"}</td>
                      <td>{data.referredBy ? data.referredBy : "-"}</td>
                      <td>
                        {data.sessionExpiresAt
                          ? new Date(data.sessionExpiresAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="flex gap-1">
                        <button className="btn btn-warning text-white rounded-box">
                          Ubah
                        </button>
                        <button className="btn btn-error text-white rounded-box">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
