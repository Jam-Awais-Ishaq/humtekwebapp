import React from "react";
import logo from '../assets/GearLogo.jpeg';

const InvoiceLayout = ({ invoice }) => {
    const partItems = invoice?.parts?.length
        ? invoice.parts.map((part) => ({
            parts: part,                 // direct part object
            qty: part.qty || 1,
            amount: part.unitPrice || 0,
            taxPercent: part.tax || 0,
            tax: part.total - (part.qty * part.unitPrice) || 0,
            totalAmount: part.total || (part.qty * part.unitPrice),
        }))
        : [
            {
                parts: { name: invoice?.machineModel || "N/A" },
                qty: invoice?.qty || 1,
                amount: invoice?.amount || 0,
                taxPercent: invoice?.tax || 0,
                tax: (invoice?.amount * invoice?.tax) / 100 || 0,
                totalAmount: invoice?.totalAmount || 0,
            },
        ];
    const serviceItem = invoice?.amount
        ? {
            parts: { name: "Service Charges" },
            qty: "-",
            amount: Number(invoice.amount),   // Unit Price
            taxPercent: "-",                    // Agar tax nahi lagana
            tax: "-",
            totalAmount: Number(invoice.amount), // Total Amount column me same amount
        }
        : null;
    const items = serviceItem
        ? [...partItems, serviceItem]
        : partItems;
        
    invoice = { ...invoice, items };

    return (
        <div
            className="p-3 w-full max-w-3xl mx-auto h-auto rounded-lg">
            {/* Header */}
            <div className=" flex flex-col items-center justify-center">
                <div className="flex items-center space-x-1  space-y-1">
                    <img src={logo} alt="Logo" className="w-26 h-16" />
                    <h1 className="text-3xl text-[#172554] uppercase font-bold italic ">Humtek Solution</h1>
                </div>
                <div className="h-1 w-full bg-[#172554]"></div>
            </div>

            {/* Bank Info */}
            <div className=" flex flex-wrap justify-between  w-full  h-60 ">
                <div className="w-[50%] space-y-5">
                    <span className="italic font-semibold text-sm">M/S </span>
                    <div>
                        <div className="flex">
                            {/* <span className="italic font-semibold ">Bank Name : </span> */}
                            <p className=" font-bold text-sm italic  -mt-1  text-[#172554]">{invoice?.bankName || "-"} <br />
                                <span className="text-[#1f2937] text-xs font-medium ">Gulshan-e-Iqbal Block-1</span>
                            </p>
                        </div>
                        <div className="flex mt-0.5">
                            <p className="font-semibold text-sm text-[#172554]">Branch Code :</p>
                            <p className="underline ml-1 text-[#1f2937] text-sm font-medium ">{invoice?.branchCode || "-"}</p>
                        </div>
                    </div>
                    <div>
                        <div className="font- text-md text-[#172554]">
                            <span className="italic">Invoice to : <br /> {invoice?.bankName || "-"}</span>
                            <p className=" italic">
                                Adminstration Division Karachi
                            </p>
                        </div>

                        <div>
                            <h6 className="text-[#172554] font-normal text-sm italic">NTN No : {invoice?.ntnNumber || "109389"}</h6>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] pl-30 pt-4  space-y-4">
                    <div className="flex items-center ">
                        <p className=" underline text-[#172554] font-bold text-sm">Invoice NO </p>
                        <span className="ml-6 text-[#0891b2]">HS-00{invoice?.id}</span>
                    </div>
                    <div>
                        {/* <div className="flex items-center ">
                            <p className=" underline text-[#172554] font-bold text-sm">Machine Model: </p>
                            <span className=" ml-2 text-[#0891b2]"> {invoice?.product || "-"}</span>
                        </div> */}
                        <div className="flex items-center ">
                            <p className=" underline text-[#172554] font-bold text-sm">Invoice Date:</p>
                            <p className="ml-7 text-[#0891b2]">{invoice?.invoiceDate || "-"}</p>
                        </div>
                    </div>

                    <div>
                        <h6 className="text-[#0891b2] text-sm">NTN # : <span className=" ml-1">{invoice?.ntnNumber || "9731807-8"}</span> </h6>
                        <h6 className="text-[#0891b2] text-sm">STRN # : <span className=" ">{invoice?.strnNumber || "S9731807-8"}</span> </h6>
                    </div>
                </div>
            </div>

            <div className="mb-4 -mt-10">
                <h1 className="text-center font-[impact] text-2xl w-full mb-2 text-[#6b7280] ">
                    SALES TAX INVOICE
                </h1>
                <table
                    style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        border: '1px solid black'
                    }}
                    className="w-full text-center "
                >
                    <thead>
                        <tr className="bg-[#172554] text-white p-2">
                            <th style={{ padding: '8px' }} >Sr</th>
                            <th style={{ padding: '8px' }}>Description</th>
                            <th style={{ padding: '8px' }}>Qty</th>
                            <th style={{ padding: '8px' }}>Unit Price</th>
                            <th style={{ padding: '8px' }}>%</th>
                            <th style={{ padding: '8px' }}>Tax</th>
                            <th style={{ padding: '8px' }}>Total Price</th>
                        </tr>
                    </thead>
                    <tbody className="min-h-80">
                        {(invoice?.items || []).map((item, index) => (
                            <tr key={index}>
                                {console.log("INVOICE:", invoice)}
                                <td className="px-2 py-5  border-r-2 border-black">
                                    {index + 1}
                                </td>

                                <td className="px-2 text-start py-5 border-r-2 border-black capitalize">
                                    {item?.parts?.name || "N/A"}
                                </td>

                                <td className="px-2 py-5  border-r-2 border-black">
                                    {item?.qty || 1}
                                </td>

                                <td className="px-2 py-5  border-r-2 border-black">
                                    {item?.amount?.toLocaleString() || 0}
                                </td>

                                <td className="px-2 py-5  border-r-2 border-black">
                                    {item?.taxPercent || 0}
                                </td>

                                <td className="px-2 py-5  border-r-2 border-black">
                                    {item?.tax?.toLocaleString() || 0}
                                </td>

                                <td className="px-2 text-end py-5 border-r-2 border-black bg-[#cffafe] font-semibold">
                                    {item?.totalAmount?.toLocaleString() || 0}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between border-t mt-0.5">
                    <div className="flex  w-[40%] space-y-1 p-2">
                        <p className="font-semibold">Status : </p>
                        <p className="ml-1 text-[#b45309]">{invoice?.status || "Pending"}</p>
                    </div>
                    <div className="w-[29%] border border-[#524f4f] flex justify-end flex-col bg-[#eff6ff]">
                        <div className="border border-[#524f4f] w-full">
                            <div className="flex items-center justify-between ">
                                <span className="font-bold p-1">Sub Total : </span>
                                <span className=" px-0.5">
                                    {invoice?.items?.reduce((sum, item) => sum + (item?.totalAmount || 0), 0)?.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>
                        <div className="border border-[#524f4f] w-full my-0.5">
                            <div className="flex items-center justify-between">
                                <span className="font-bold p-1">Discount : </span>
                                <span className=" px-0.5">
                                    {invoice?.discount?.toLocaleString() || ""}
                                </span>
                            </div>
                        </div>
                        <div className="border border-[#524f4f] w-full mb-0.5">
                            <div className="flex items-center justify-between">
                                <span className="font-bold p-1">Grand Total : </span>
                                <span className=" px-0.5">
                                    {invoice?.items?.reduce((sum, item) => sum + (item?.totalAmount || 0), 0)?.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center -mt-6">
                    <div className="w-[50%]">
                        <div className="flex items-end border-b-2 border-[#1f2937] pb-3">
                            <h1 className="text-3xl text-[#172554] uppercase font-bold italic">Humtek Solutions</h1>
                            <img src={logo} className="w-15 h-15" alt="" />
                        </div>
                        <div className="border-t border-[#1f2937] ">
                            <p className="p-1 text-[#172554] font-bold -mt-1.5">Email: <span className="underline font-medium italic text-[#1e3a8a] "> Muhammad.amir@humtek.com.pk </span></p>
                        </div>
                    </div>
                    <div className="text-start text-[#172554] ml-3 italic font-semibold">
                        Contact.+92301-6783656
                    </div>
                </div>
                <div className="flex justify-between mt-15">
                    <p className="text-[#172554] underline italic font-semibold ">Customer's Receiver</p>
                    <p className="text-[#172554] underline italic font-semibold" >Authorized Signatory</p>
                </div>

                <h1 className="text-[#172554] font-bold text-3xl text-center mt-10">A-396,BLOCK-7, K.A.E.C.H.S, KARACHI</h1>
            </div>
        </div>
    );
};

export default InvoiceLayout;