// PakistanPaymentPage.jsx
import { useState } from "react";

export default function PakistanPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: "",
    mobile: "",
    upiId: "",
  });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Processed Successfully in PKR! 🎉");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Payment Methods 🇵🇰
        </h1>

        {/* Payment Options */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["card", "easypaisa", "jazzcash", "bank"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`px-6 py-3 rounded-xl border-2 font-semibold transition ${
                paymentMethod === method
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              {method === "card" && "Card 💳"}
              {method === "easypaisa" && "Easypaisa 📱"}
              {method === "jazzcash" && "JazzCash 📱"}
              {method === "bank" && "Bank Transfer 🏦"}
            </button>
          ))}
        </div>

        {/* Card Payment Form */}
        {paymentMethod === "card" && (
          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Card Holder Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Ali Khan"
                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-600 mb-1">Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-600 mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition"
            >
              Pay PKR 10,000
            </button>
          </form>
        )}

        {/* Easypaisa / JazzCash */}
        {(paymentMethod === "easypaisa" || paymentMethod === "jazzcash") && (
          <div className="text-center py-10 space-y-4">
            <p className="text-gray-700 text-lg">
              Enter your {paymentMethod === "easypaisa" ? "Easypaisa" : "JazzCash"} Mobile Number
            </p>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleInputChange}
              placeholder="03XX-XXXXXXX"
              className="w-64 p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handlePayment}
              className="mt-4 bg-green-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-600 transition"
            >
              Pay PKR 10,000
            </button>
          </div>
        )}

        {/* Bank Transfer */}
        {paymentMethod === "bank" && (
          <div className="text-center py-10 space-y-4">
            <p className="text-gray-700 text-lg">
              Transfer the amount to the following bank account:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-left max-w-md mx-auto">
              <p><strong>Bank:</strong> HBL</p>
              <p><strong>Account Title:</strong> Ali Tech Solutions</p>
              <p><strong>Account Number:</strong> 1234567890123</p>
              <p><strong>IBAN:</strong> PK12HBL01234567890123</p>
            </div>
            <button
              onClick={() => alert("Payment recorded!")}
              className="mt-4 bg-green-500 text-white py-3 px-6 rounded-xl font-bold hover:bg-green-600 transition"
            >
              Mark as Paid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}