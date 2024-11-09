import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/navbar";
import GetPayments from "./components/payment/GetPayments";
import CreatePayment from "./components/payment/CreatePayment";
import EditPayment from "./components/payment/EditPayment"; 
import DeletePayment from "./components/payment/DeletePayment";
import TransactionVerification from "./components/transaction/TransactionVerification";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/payment" element={<GetPayments />} />
          <Route path="/create" element={<CreatePayment />} />
          <Route path="/edit/:id" element={<EditPayment />} />
          <Route path="/delete/:id" element={<DeletePayment />} />
          <Route path="/employee" element={<TransactionVerification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
