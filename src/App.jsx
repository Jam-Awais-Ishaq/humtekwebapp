import MainDashboard from './Component/DashboardLayout/MainDashboard'
import { useState } from 'react';
import EstimatePreview from './utils/EstimatePreview';
function App() {

  // const [estimate, setEstimate] = useState({
  //   estimateNo: "EST-001",
  //   estimateDate: "2026-01-22",
  //   validTill: "2026-02-05",
  //   bankName: "ABC Bank",
  //   branchName: "Main Branch",
  //   branchAddress: "123 Street, City",
  //   complaintNo: "CMP-123",
  //   machine: "Printer",
  //   model: "PX-1000",
  //   items: [
  //     { name: "Part A", qty: 2, price: 500, total: 1000 },
  //     { name: "Part B", qty: 1, price: 750, total: 750 },
  //   ],
  //   subtotal: 1750,
  //   tax: 18,
  //   taxAmount: 315,
  //   total: 2065,
  //   note: "Urgent repair",
  //   terms: "Payment within 30 days",
  //   id: 1,
  // });
  return (
    <>

      {/* <div className="App">
        <h1 className="text-2xl font-bold mb-4">Estimate PDF Preview</h1>
        <EstimatePreview estimate={estimate} />
      </div> */}
      <MainDashboard />
    </>
  )
}
export default App