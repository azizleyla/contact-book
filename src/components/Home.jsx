import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const contacts = useSelector((state) => state.contacts);
  console.log(contacts);
  const dispatch = useDispatch();

  const deleteUser = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-right">
          <Link to="/add" className="btn btn-outline-dark my-5 ml-auto">
            Add Contact
          </Link>
        </div>
        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Number</th>
              <th>Action</th>
            </thead>
            <tbody>
              {contacts &&
                contacts.map((contact) => (
                  <tr key={contact.id + 1}>
                    <td>{contact.id + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.number}</td>
                    <td>
                      <Link
                        className="btn btn-small btn-primary"
                        to={`/edit/${contact.id}`}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(contact.id)}
                        type="button"
                        className="btn btn-danger ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
