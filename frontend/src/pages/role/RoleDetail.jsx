import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { fetchRoleById } from "../../services/ServiceRole";

const RoleDetail = () => {
  const [roleDetail, setRoleDetail] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getRoleById = async () => {
      const role = await fetchRoleById(id);
      if (role) {
        setRoleDetail(role);
      } else {
        console.log("Contact not found");
        navigate("/role");
      }
    };
    getRoleById();
  }, [id, setRoleDetail, navigate]);

  return (
    <div className="container">
      <h1 className="my-3">Detail Contact Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{roleDetail.name}</td>
          </tr>
        </tbody>
      </table>
      <NavLink to={"/role"} className="btn btn-primary" role="button">
        Back
      </NavLink>
    </div>
  );
};

export default RoleDetail;
