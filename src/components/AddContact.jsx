import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
    },
    onSubmit: (values) => {
      const { name, email, number } = values;
      const checkeEmail = contacts.find(
        (user) => user.email === email && user,
      );
      const checkNumber = contacts.find(
        (user) => user.number === parseInt(number) && user,
      );

      if (!email || !values.name || !number) {
        return toast.warning("Please fill input fields!!");
      }
      if (checkeEmail) {
        return toast.error("This email already exists");
      }
      if (checkNumber) {
        return toast.error("This number already exists");
      }

      const data = {
        id: Math.trunc(Math.random() * 1000),
        name: name,
        email: email,
        number: number,
      };
      dispatch({ type: "ADD_CONTACT", payload: data });
      toast.success("Student added successfully");
      navigate("/");
    },
  });

  let navigate = useNavigate();

  const { contacts } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Post</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="form-control"
                type="text"
                placeholder="Full name"
              />
            </div>
            <div className="form-group">
              <input
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                value={formik.values.number}
                name="number"
                onChange={formik.handleChange}
                className="form-control"
                type="number"
                placeholder="Phone"
              />
            </div>
            <div className="form-group mt-3">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
