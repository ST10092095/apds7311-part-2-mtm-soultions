import React, { useState, useEffect } from "react";
import axios from "axios";
import './transaction.css';

function TransactionVerification() {
    const [transactions, setTransactions] = useState([]);
    const [verifiedTransactionIds, setVerifiedTransactionIds] = useState([]);
    const [error, setError] = useState('');

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, []);

    // Function to fetch transactions with 'verified' status as false
    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTransactions(response.data.filter(transaction => transaction.verified === false));
        } catch (err) {
            setError('Failed to fetch transactions');
        }
    };

    // Function to add a transaction to the selected list
    const handleSelection = (id) => {
        setVerifiedTransactionIds(prevIds =>
            prevIds.includes(id) ? prevIds.filter(existingId => existingId !== id) : [...prevIds, id]
        );
    };

    // Function to submit verification updates for selected transactions
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            for (let i = 0; i < verifiedTransactionIds.length; i++) {
                const transactionId = verifiedTransactionIds[i];
                const transaction = transactions.find(t => t._id === transactionId);

                await axios.put(`/api/${transactionId}`, {
                    customer: transaction.customer,
                    amount: transaction.amount,
                    currency: transaction.currency,
                    provider: transaction.provider,
                    recipientAccount: transaction.recipientAccount,
                    swiftCode: transaction.swiftCode,
                    verified: true
                },   {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }

            // Clear the verified transaction IDs and refresh transactions
            setVerifiedTransactionIds([]);
            fetchTransactions();
        } catch (err) {
            setError('Failed to verify transactions');
        }
    };

    return (
        <div className="container">
            <h1 className="title">Transaction Verification</h1>
            {error && <p className="error">{error}</p>}
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
