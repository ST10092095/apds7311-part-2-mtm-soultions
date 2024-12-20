import React, { useState, useEffect } from "react";
import axios from "axios";
import './transaction.css';

function TransactionVerification() {
    const [transactions, setTransactions] = useState([]);
    const [verifiedTransactionIds, setVerifiedTransactionIds] = useState([]);
    const [banks, setBanks] = useState([]);
    const [error, setError] = useState('');
    

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
        fetchBanks();
    }, [transactions]);

    // Function to fetch transactions with 'verified' status as false
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTransactions(response.data.filter(checkStatus));

            function checkStatus(transaction){
                return transaction.isVerified === false
            }

        } catch (err) {
            console.log(err);
        }
    }

    // Function to add a transaction to the selected list
    const handleSelection = async (id) => {
        setVerifiedTransactionIds([
            ...verifiedTransactionIds,
            id,
        ]);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const editPayments = async () => {
            const token = localStorage.getItem('token');

            console.log(verifiedTransactionIds.length.toString())
            for(let i = 0; i < verifiedTransactionIds.length; i++)
            {
                let transaction = axios.get(`/api/${verifiedTransactionIds[i]}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                axios.put(`/api/${verifiedTransactionIds[i]}`,
                    {
                        customer: transaction.customer,
                        amount: transaction.amount,
                        currency: transaction.currency,
                        provider: transaction.provider,
                        recipientAccount: transaction.recipientAccount,
                        swiftCode: transaction.swiftCode,
                        isVerified: true
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

            }  
        }
        await editPayments();

        
        // Fetching unverified transactions
        await fetchTransactions();

    }

    const fetchBanks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/bank`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setBanks(response.data);
        } catch (err) {
            setError('Failed to fetch bank details');
        }
    };



    return (
        <div className="tcontainer">
            <h1 className="title">Transaction Verification</h1>
            {error && <p className="error">{error}</p>}
            <div className="banks-container">
                <h2>Bank SWIFT Codes</h2>
                <ul>
                    {banks.map((bank) => (
                        <li key={banks._id}>
                            <strong>{bank.BankName}</strong>: {bank.swiftCode}
                        </li>
                    ))}
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction._id} className="transaction-item">
                            <input
                                type="checkbox"
                                checked={verifiedTransactionIds.includes(transaction._id)}
                                onChange={() => handleSelection(transaction._id)}
                            />
                            <div className="transaction-details">
                                <p><strong>Customer:</strong> {transaction.customer}</p>
                                <p><strong>Amount:</strong> {transaction.amount} {transaction.currency}</p>
                                <p><strong>Provider:</strong> {transaction.provider}</p>
                                <p><strong>Recipient Account:</strong> {transaction.recipientAccount}</p>
                                <p><strong>SWIFT Code:</strong> {transaction.swiftCode}</p>
                                <p><strong>Payment Date:</strong> {new Date(transaction.paymentDate).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                {transactions.length > 0 && (
                    <button type="submit" className="verify-button">Submit Verified Transactions</button>
                )}
                {transactions.length === 0 && <p>No unverified transactions available.</p>}
            </form>
        </div>
    );
}

export default TransactionVerification;
