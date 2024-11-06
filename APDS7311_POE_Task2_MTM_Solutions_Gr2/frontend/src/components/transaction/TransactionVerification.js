import React, { useState, useEffect } from "react";
import axios from "axios";

function TransactionVerification(){
    const [transactions, setTransactions] = useState([])
    const [verifiedTransactionIds, setVerifiedTransactionIds] = useState([])
    
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
                return transaction.verified == false;
            }

        } catch (err) {
            console.log(err);
        }
    }

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
                        verified: true
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
            }  
        }
        editPayments();
        
        // Fetching unverified transactions
        fetchTransactions();
    }
}