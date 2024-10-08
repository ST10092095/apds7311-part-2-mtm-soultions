import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPayment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState('');
    const currencies = [
        "ZAR",
        "EUR",
        "USD",
        "GBP"
    ];
    const providers = [
        "FNB",
        "Capitec",
        "Netbank",
        "Standard Bank",
        "Investec",
        "ABSA",
        "Bidvest Bank"
    ]
    

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPayments(response.data);
            } catch (err) {
                setError('Error fetching the payment for editing');
            }
        }
        fetchPayments();
    }, [id]);

    const editPayment = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/${id}`, {
                customer: payments.customer,
                amount: payments.amount,
                currency: payments.currency,
                provider: payments.provider,
                recipientAccount: payments.recipientAccount,
                swiftCode: payments.swiftCode

            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            navigate('/payment'); // should navigate to payment page
        } catch (err) {
            console.log("Error in editing of payments: ", err);
        }
    }
    return (
        <div>
            <h1>Edit Payment</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <form>
                    <label>Customer: </label>
                    <input 
                    type="text" 
                    value={payments.customer} 
                    onChange={(e) => setPayments({...payments, customer: e.target.value })} />

                    <label>Amount: </label>
                    <input 
                    type="text" 
                    value={payments.amount} 
                    onChange={(e) => setPayments({...payments, amount: e.target.value })} />
                    <div>
                        <label>Currency</label>
                        <select value={payments.currency} onChange={(e) => setPayments({...payments, currency: e.target.value })}>
                            {currencies.map((currency) => (
                             <option key={currency} value={currency}>
                                {currency}
                             </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Provider</label>
                        <select value={payments.provider} onChange={(e) => setPayments({...payments, provider: e.target.value })}>
                            {providers.map((provider) => (
                             <option key={provider} value={provider}>
                                {provider}
                             </option>
                            ))}
                        </select>
                    </div>

                    <label>Recipient Account: </label>
                    <input 
                    type="text" 
                    value={payments.recipientAccount} 
                    onChange={(e) => setPayments({...payments, recipientAccount: e.target.value })} />

                    <label>Swift Code: </label> 
                    <input
                    type="text" 
                    value={payments.swiftCode} 
                    onChange={(e) => setPayments({...payments, swiftCode: e.target.value })} />

                    <button 
                    onClick={editPayment}>
                        Save Changes</button>
                    <button 
                    onClick={() => navigate('/payment')}>
                        Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditPayment;