import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const EditContact = () => {
  const { id } = useParams();
  const { contacts } = useSelector((state) => state);
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id),
  );
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      number: "",
    },
    onSubmit: (values) => {
      const { name, email, number } = values;

      //user id si edit olunan userin idsine esit olmasin ve eger emaili beraber olarsa edit olununa error
      const checkeEmail = contacts.find(
        (user) => user.id !== parseInt(id) && user.email === email,
      );
      const checkNumber = contacts.find(
        (user) =>
          user.id !== parseInt(id) && user.number === parseInt(number),
      );
      if (!email || !name || !number) {
        return toast.warning("Please fill input fields!!");
      }
      if (checkeEmail) {
        return toast.error("This email already exists");
      }
      if (checkNumber) {
        return toast.error("This number already exists");
      }
      const data = {
        id: parseInt(id),
        name,
        email,
        number,
      };
      dispatch({ type: "UPDATE_CONTACT", payload: data });
      toast.success("Student updated successfully");
      navigate("/");
    },
  });

  useEffect(() => {
    if (currentContact) {
      formik.setFieldValue("name", currentContact.name);
      formik.setFieldValue("email", currentContact.email);
      formik.setFieldValue("number", currentContact.number);
    }
  }, [currentContact]);

  return (
    <div className="container">
      {currentContact ? (
        <>
          <div className="row d-flex flex-column">
            <Link to="/" className="btn btn-dark ml-auto my-5">
              Go back
            </Link>

            <div className="col-md-6 mx-auto shadow p-5">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    value={formik.values.name}
                    name="name"
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder={"Email"}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    name="number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                <div className="form-group d-flex align-items-center justify-content-between my-2">
                  <button type="submit" className="btn btn-primary">
                    Update Contact
                  </button>
                  <Link to="/" className="btn btn-danger">
                    cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1>Student contact with this id:{id} is not found</h1>
      )}
    </div>
  );
};

export default EditContact;
