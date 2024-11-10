import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import './payment.css';

function GetPayments() {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get('/api/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                        
                    }
                });
                setPayments(response.data);
            } catch (err) {
                setError('You are not authorised to view payments');
            }
        }
        fetchPayments();
    }, []);
    return (
    <div className="paymentcontainer">
            <h1 className="title">Payments</h1>
            <div>
                <NavLink to="/create" className={"crt_btn"}>Create Payment</NavLink>
            </div>

            {error ? <p style={{color: 'red'}}>
                {error}
                </p> : payments.length > 0 ? <ul>
                    {payments.map(payment => <li key={payment._id}>
                        <h3>Customer: {payment.customer}</h3>
                        <h3>Amount: {payment.amount +""+ payment.currency}</h3>
                        <h3>Provider: {payment.provider}</h3>
                        <h3>Recipient Account: {payment.recipientAccount}</h3>
                        <h3>Swift Code: {payment.swiftCode}</h3>
                        <h3>Payment Date: {new Date(payment.paymentDate).toLocaleString()}</h3>
                        <NavLink to={`/edit/${payment._id}`} className = "edit_btn">Edit</NavLink>
                        <NavLink to={`/delete/${payment._id}`} className="del_btn">Delete</NavLink>
                    </li>)}
                </ul>: <p>Loading... </p>}
    </div>
    );
};

export default GetPayments;