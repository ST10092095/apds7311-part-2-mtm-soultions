import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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


function CreatePayment() {

    const [customer, setCustomer] = useState('');
    const [amount, setAmount] = useState('');
    const [SelectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [SelectedProvider, setSelectedProvider] = useState(providers[0]);
    const [recipientAccount, setRecipientAccount] = useState('');
    const [swiftCode, setSwiftCode] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const token = localStorage.getItem("token");
            await axios.post("/api/", {
                customer,
                amount,
                currency : SelectedCurrency,
                provider : SelectedProvider, 
                recipientAccount,
                swiftCode
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAmount("");
            setSelectedCurrency(currencies[0]);
            setSelectedProvider(providers[0]);
            setRecipientAccount("");
            setSwiftCode("");
            
            //sending the user back to payments 
            navigate("/payment");
        }
        catch(err){
            setError('');
        }   
        

    }
    return (
        <div className="paymentcontainer">
            <h1 className="title">Create Payment</h1>
            {error && <p style={{color: "red"}}>
                {error}
                </p>}
            <form onSubmit={handleSubmit} className="form">         

                <label className="label">Customer Name</label>
                <div className="input">
                    <input 
                    type = "string" 
                    value={customer} 
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="John Doe"/>
                </div>

                <label className="label">Amount</label>
                <div className="input">
                    <input 
                    type = "number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1000"/>
                </div>

                <div className="dropdown">
                    <label className="label">Currency</label>
                    <select value={SelectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="dropdown">
                    <label className="label">Provider</label>
                    <select value = {SelectedProvider} onChange={(e) => setSelectedProvider(e.target.value)}>
                        {providers.map((provider) => (
                            <option key={provider} value={provider}>
                                {provider}
                            </option>
                        ))}
                    </select>     
                </div>

                <label className="label">Account of Recipient</label>
                <div className="input">
                    <input 
                    type = "number" 
                    value={recipientAccount} 
                    onChange={(e) => setRecipientAccount(e.target.value)}
                    placeholder="0123456"/>
                  </div>
                
                <label className="label">Swift Code</label>
                <div className="input">
                    <input 
                    type = "string" 
                    value={swiftCode} 
                    onChange={(e) => setSwiftCode(e.target.value)}
                    placeholder="AAAABBCC123"/>
                </div>
                
                <div className="submit_container">
                    <button className="submitbtn"
                    type="submit">
                        Pay Now
                    </button>

                    <button className="cancelbtn" 
                      onClick={() => navigate('/payment')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePayment;