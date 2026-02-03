import MainDashboard from './Component/DashboardLayout/MainDashboard'
import { useState } from 'react';
import EstimatePreview from './utils/EstimatePreview';
import InvoicePreview from './utils/InvoicePreview';
function App() {

  // const [invoice] = useState({
  //   id: 1,
  //   bankName: "Dubai islami bank",
  //   branch: "Main Branch",
  //   branchCode: "BR-101",
  //   product: "Printer PX-1000",
  //   serviceType: "Repair",
  //   serviceDate: "2026-01-20",
  //   invoiceDate: "2026-01-22",
  //   dueDate: "2026-02-05",
  //   status: "Pending",
  //   items: [
  //     {
  //       serviceDescription: "Parts replacement",
  //       qty: 1,
  //       amount: 1750,
  //       taxPercent: 18,
  //       tax: 315,
  //       totalAmount: 2065,
  //     },
  //     {
  //       serviceDescription: "Website Development",
  //       qty: 2,
  //       amount: 5000,
  //       taxPercent: 10,
  //       tax: 1000,
  //       totalAmount: 6000,
  //     },
  //     {
  //       serviceDescription: "Website Development",
  //       qty: 2,
  //       amount: 5000,
  //       taxPercent: 10,
  //       tax: 1000,
  //       totalAmount: 6000,
  //     },
  //   ]
  // });
  return (
    <>

      {/* <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Invoice PDF Preview</h1>
        <InvoicePreview invoice={invoice} />
      </div> */}
      <MainDashboard />
    </>
  )
}
export default App