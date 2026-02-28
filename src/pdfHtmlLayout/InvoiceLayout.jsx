import { useContext } from 'react';
import logo from '../assets/GearLogo.png';
import { Context } from '../Context/ContextProvider';
const InvoiceLayout = ({ invoice }) => {
    const partItems = invoice?.parts?.length
        ? invoice.parts.map((part) => ({
            parts: part,
            qty: part.qty || 1,
            amount: part.unitPrice || 0,
            hsCode: part.hsCode || "-",
            taxPercent: part.tax || 0,
            tax: part.total - (part.qty * part.unitPrice) || 0,
            totalAmount: part.total || (part.qty * part.unitPrice),
        }))
        : [
            {
                parts: { name: invoice?.machineModel || "N/A" },
                qty: invoice?.qty || 1,
                productModel: invoice?.productModel || "N/A",
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
            amount: Number(invoice.amount),
            hsCode: "-",
            taxPercent: "-",
            tax: "-",
            totalAmount: Number(invoice.amount),
        }
        : null;
    const items = serviceItem
        ? [...partItems, serviceItem]
        : partItems;

    invoice = { ...invoice, items };


    const thStyle = {
        display: "table-cell",
        textAlign: "center",
        verticalAlign: "middle",
        paddingBottom: "18px",
        fontFamily: "britannic bold",
        whiteSpace: "nowrap",
        fontSize: "18px",
    };
    const MIN_ROWS = 4;
    const rows = invoice?.items || [];
    const emptyRows = Math.max(0, MIN_ROWS - rows.length);


    

    return (
        <div
            className="p-3 w-full max-w-3xl mx-auto h-auto rounded-lg">
            {/* Header */}
            <div className=" flex flex-col items-center justify-center">
                <div className="flex items-center space-x-1  space-y-1">
                    <img src={logo} alt="Logo" className="w-26 h-16" />
                    <h1 className="text-3xl text-[#172554] uppercase font-bold italic font-[cambria]">Humtek Solutions</h1>
                </div>
                <div className="h-1 w-full bg-[#172554]"></div>
            </div>

            {/* Bank Info */}
            <div className=" flex flex-wrap justify-between  w-full  h-60 ">
                <div className="w-[50%] space-y-5">
                    <span className="italic font-semibold text-sm">M/S </span>
                    <div>
                        <div className="">
                            <p className=" font-[calibri] font-bold text-[13px] italic  -mt-1  text-[#172554]">{invoice?.bankName || "-"}
                            </p>
                            <p className="text-[#1f2937] text-[10px] font-[calibri] ">{invoice?.branchCode || "-"}</p>
                        </div>
                    </div>
                    <div>
                        <div className="font-[calibri] text-md text-[#172554]">
                            <span className="italic">Invoice to : <br /> {invoice?.bankName || "-"}</span>
                            <p className=" italic">
                                {invoice?.headOffice || "-"}
                            </p>
                        </div>

                        <div>
                            <h6 className="text-[#172554] font-normal text-sm italic">NTN No : {invoice?.ntn || "-"}</h6>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] pl-30 pt-4 space-y-4">
                    <div className="flex items-center ">
                        <p className=" underline text-[#172554] font-[cambria] text-[15px]">Invoice NO </p>
                        <span className="ml-6 text-[#0891b2]">{invoice?.invoiceNumber}</span>
                    </div>
                    <div>
                        <div className="flex items-center ">
                            <p className=" underline text-[#172554] font-[cambria] text-[15px]">Invoice Date:</p>
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
                <h1 className="text-center font-bold text-[20px] w-full mb-2 text-[#6b7280] ">
                    SALES TAX INVOICE
                </h1>
                <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid black', minHeight: "250px", }} className="w-full text-center">
                    <thead>
                        <tr style={{ backgroundColor: "#172554", color: "white", }}>
                            <th style={thStyle}>Sr</th>
                            <th style={thStyle}>Description</th>
                            <th style={thStyle}>HS Code</th>
                            <th style={thStyle}>Qty</th>
                            <th style={thStyle}>Unit Price</th>
                            <th style={thStyle}>%</th>
                            <th style={thStyle}>Tax</th>
                            <th style={thStyle}>Total Price</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(invoice?.items || []).map((item, index) => (
                            <tr key={index}>
                                {console.log("INVOICE:", invoice)}
                                <td className="px-2 pt-8 font-[calibri]  border-r-2 border-black">
                                    {index + 1}
                                </td>

                                <td className="px-2 pt-12 text-start font-[calibri]  py-5 border-r-2 border-black capitalize">
                                    {item?.parts?.name || "N/A"}
                                </td>

                                <td className="px-2 pt-8 font-[calibri] border-r-2 border-black">
                                    {item?.hsCode || "-"}
                                </td>

                                <td className="px-2 pt-8 font-[calibri]  border-r-2 border-black">
                                    {item?.qty || 1}
                                </td>

                                <td className="px-2 pt-8 font-[calibri] border-r-2 border-black">
                                    {item?.amount?.toLocaleString() || 0}
                                </td>

                                <td className="px-2 pt-8 font-[calibri] border-r-2 border-black">
                                    {item?.taxPercent || 0}
                                </td>

                                <td className="px-2 pt-8 font-[calibri] border-r-2 border-black ">
                                    {item?.tax?.toLocaleString() || 0}
                                </td>

                                <td className="px-2 pt-13 text-end py-5 border-r-2 border-black bg-[#cffafe] font-[calibri]">
                                    {item?.totalAmount?.toLocaleString() || 0}
                                </td>
                            </tr>
                        ))}

                        {Array.from({ length: emptyRows }).map((_, i) => (
                            <tr key={`empty-${i}`} style={{ height: "45px" }}>
                                <td className="border-r-2 border-black"></td>
                                <td className="border-r-2 border-black"></td>
                                <td className="border-r-2 border-black"></td>
                                <td className="border-r-2 border-black"></td>
                                <td className="border-r-2 border-black"></td>
                                <td className="border-r-2 border-black "></td>
                                <td className="border-r-2 border-black "></td>
                                <td className="border-r-2 border-black bg-[#cffafe]"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between border-t mt-0.5">
                    <div className="flex items-center h-fit font-[calibri] w-[40%] space-y-1 p-2">
                        <p className="font-[calibri] font-[10B]">Remarks: </p>
                        <p className="ml-1 mt-1.5 font-[calibri] text-[12px] text-[#b45309]">{invoice?.category || "-"}</p>
                        <span className=" ml-2 font-[calibri] text-[12px] text-[#0891b2]"> ({invoice?.productModel || "-"})</span>
                    </div>
                    <div className="w-[27%] border border-[#524f4f] flex justify-end flex-col bg-[#eff6ff]">
                        <div className="border border-[#524f4f] w-full">
                            <div className="flex  justify-between w-full">
                                <span className="font-[aharoni bold] text-[16px] w-1/2 border-r-2 p-1">Sub Total : </span>
                                <span className=" font-[aharoni bold] text-[16px] px-0.5">
                                    {invoice?.items?.reduce((sum, item) => sum + (item?.totalAmount || 0), 0)?.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>
                        <div className="border border-[#524f4f] w-full my-0.5">
                            <div className="flex items-center justify-between w-full">
                                <span className="font-[aharoni bold] text-[16px] w-1/2 border-r-2  p-1">Discount : </span>
                                <span className="font-[aharoni bold] text-[16px] px-0.5">
                                    {invoice?.discount?.toLocaleString() || ""}
                                </span>
                            </div>
                        </div>
                        <div className="border border-[#524f4f] w-full mb-0.5">
                            <div className="flex items-center justify-between w-full">
                                <span className="font-[aharoni bold] text-[16px] w-1/2 border-r-2 p-1">Grand Total : </span>
                                <span className="font-[aharoni bold] text-[16px] px-0.5">
                                    {invoice?.items?.reduce((sum, item) => sum + (item?.totalAmount || 0), 0)?.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center ">
                    <div className="w-[50%]">
                        <div className="flex items-end border-b-2 border-[#1f2937] pb-3">
                            <h1 className="text-[28px] text-[#172554] uppercase font-[cambria] italic">Humtek Solutions</h1>
                            <img src={logo} className="w-15 h-15" alt="" />
                        </div>
                        <div className="border-t border-[#1f2937] ">
                            <p className="p-1 text-[#172554] font-[cambria] -mt-1.5">Email: <span className="underline font-[cambria] italic text-[#1e3a8a] "> Muhammad.amir@humtek.com.pk </span></p>
                        </div>
                    </div>
                    <div className="text-start text-[#172554] ml-3 italic font-calibri font-semibold">
                        Contact.+92301-6783656
                    </div>
                </div>
                <div className="flex justify-between mt-15">
                    <p className="text-[#172554] underline italic font-[cambria]">Customer's Receiver</p>
                    <p className="text-[#172554] underline italic font-[cambria]">Authorized Signatory</p>
                </div>

                <h1 className="text-[#172554] font-extrabold text-3xl text-center  mt-10">A-396,BLOCK-7, K.A.E.C.H.S, KARACHI</h1>
            </div>
        </div>
    );
};

export default InvoiceLayout;