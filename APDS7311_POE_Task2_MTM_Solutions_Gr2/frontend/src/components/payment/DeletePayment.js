import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeletePayment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const deletePayment = async () => {
        try{
            const token = localStorage.getItem('token');
            await axios.delete(`/api/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/payment');
        }
        catch(err){
            console.log("Error in deleting of payments: ", err);
        }
    }
    
    return (
        <div>
            <h1>Delete Payments</h1>
            <p>Are you sure you want to delete this payment?</p>
            <button onClick={deletePayment}>Delete</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
    );
}

export default DeletePayment;