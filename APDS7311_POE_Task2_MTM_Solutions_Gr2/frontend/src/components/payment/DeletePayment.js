import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeletePayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const deletePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/payment");
    } catch (err) {
      console.log("Error in deleting of payments: ", err);
    }
  };

  return (
    <div className="paymentcontainer">
      <h1 className="title">Delete Payments</h1>
      <p className="label">Are you sure you want to delete this payment?</p>
      <div className="submit container">
        <button onClick={deletePayment} className="cancelbtn">
          Delete
        </button>
        <button onClick={() => navigate(-1)} className="submitbtn">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeletePayment;
