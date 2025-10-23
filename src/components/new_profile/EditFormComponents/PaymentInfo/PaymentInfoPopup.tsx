// import React, { useEffect, useState } from "react";
// import { apiAxios } from "../../../../api/apiUrl";
// import { NotifySuccess } from "../../../../common/Toast/ToastMessage";

// interface PaymentPopupProps {
//   open: boolean;
//   onClose: () => void;
//   profileId: string;
//   showAddButton?: boolean; // Add this prop
// }

// interface Transaction {
//   id: number;
//   profile_id: string;
//   plan_id: number | null;
//   order_id: string;
//   payment_id: string;
//   amount: string;
//   status: string;
//   created_at: string;
//   payment_type: string;
//   discount_amont: string | null;
//   payment_refno: string | null;
//   description: string | null;
//   owner_id: string | null;
//   addon_package: string;
// }

// interface PaymentDetail {
//   id: number;
//   paid_amount: string;
//   payment_mode: string;
//   payment_date: string;
//   gpay_no?: string | null;
//   status: number;
//   payment_id?: string | null;
//   payment_for?: string;   // ✅ add
//   discount?: string;
//   reference_id: string;

// }

// const PaymentPopup: React.FC<PaymentPopupProps> = ({ open, onClose, profileId, showAddButton = true }) => {
//   const [activeTab, setActiveTab] = useState<"payment" | "transaction">("payment");
//   const [isEditing, setIsEditing] = useState<number | null>(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [transactions, setTransactions] = useState<Transaction[]>([]); // Add this line
//   const [transactionLoading, setTransactionLoading] = useState(false);
//   const [formData, setFormData] = useState<Partial<PaymentDetail>>({
//     id: 0,
//     paid_amount: '',
//     payment_mode: '',
//     payment_date: '',
//     gpay_no: '',
//     payment_for: "",
//     discount: "",
//     reference_id: ""

//   });



//   const handleEdit = (payment: PaymentDetail) => {
//     setIsEditing(payment.id);
//     setFormData(payment);
//   };

//   const handleAddNew = () => {
//     setIsAdding(true);
//     setFormData({
//       id: 0,
//       paid_amount: "",
//       payment_mode: '',
//       payment_date: '',
//       payment_id: '',
//       reference_id: '',
//     });
//   };

//   const handleSave = async () => {
//     try {
//       if (isAdding) {
//         // Create new payment
//         const payload = {
//           profile_id: profileId,
//           paid_amount: formData.paid_amount,
//           payment_mode: formData.payment_mode,
//           payment_date: formData.payment_date,
//           status: 1,
//           payment_for: formData.payment_for || "",
//           discount: formData.discount || "",
//           reference_id: formData.reference_id || ""
//         };

//         const res = await apiAxios.post(
//           "/api/subscriptions/create/",
//           payload
//         );

//         console.log("Payment added:", res.data);
//         await fetchPaymentDetails();
//         NotifySuccess("Payment Created Successfully");
//         setIsAdding(false);

//       } else if (isEditing) {

//         // Update existing payment by ID
//         const payload = {
//           profile_id: profileId,
//           paid_amount: formData.paid_amount,
//           payment_mode: formData.payment_mode,
//           payment_date: formData.payment_date,
//           status: 1,
//           payment_for: formData.payment_for || "",
//           discount: formData.discount || "",
//           reference_id: formData.reference_id || ""

//         };

//         const res = await apiAxios.patch(
//           `/api/subscriptions/${isEditing}/update/`, // ✅ dynamic id
//           payload
//         );

//         console.log("Payment updated:", res.data);
//         await fetchPaymentDetails();
//         NotifySuccess("Payment Updated Successfully");
//         setIsEditing(null);
//       }

//       // Reset form after save
//       setFormData({
//         id: 0,
//         paid_amount: "",
//         payment_mode: "",
//         payment_date: "",
//         gpay_no: "",
//         payment_for: "",
//         discount: "",
//         reference_id: "",
//       });

//     } catch (error) {
//       console.error("Error saving payment:", error);
//       alert("Failed to save payment. Please try again.");
//     }
//   };


//   const handleCancel = () => {
//     setIsEditing(null);
//     setIsAdding(false);
//     setFormData({
//       id: 0,
//       paid_amount: "",
//       payment_mode: '',
//       payment_date: '',
//       payment_id: '',
//       reference_id: '',
//       payment_for: '',
//     });
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === 'paid_amount' ? parseFloat(value) || 0 : value
//     });
//   };

//   // const handleRemove = (id: number) => {
//   //   setPaymentDetails(paymentDetails.filter(p => p.id !== id));
//   // };

//   const handleApprove = async (transactionId: number, paymentFor: string = "") => {
//     try {
//       const payload = {
//         transaction_id: transactionId.toString(),
//         action: "accept",
//         payment_for: paymentFor
//       };

//       const response = await apiAxios.post(
//         "/api/process-transaction/",
//         payload
//       );

//       if (response.data.status === "success") {
//         NotifySuccess(response.data.message || "Transaction rejected successfully");
//         // Refresh transactions to update the status
//         await fetchTransactions();
//       } else {
//         alert(response.data.message || "Failed to reject transaction");
//       }
//     } catch (error) {
//       console.error("Error rejecting transaction:", error);
//       alert("Failed to reject transaction. Please try again.");
//     }
//   };

//   const handleDeny = async (transactionId: number, paymentFor: string = "") => {
//     try {
//       const payload = {
//         transaction_id: transactionId.toString(),
//         action: "reject",
//         payment_for: paymentFor
//       };

//       const response = await apiAxios.post(
//         "/api/process-transaction/",
//         payload
//       );

//       if (response.data.status === "success") {
//         NotifySuccess(response.data.message || "Transaction rejected successfully");
//         // Refresh transactions to update the status
//         await fetchTransactions();
//       } else {
//         alert(response.data.message || "Failed to reject transaction");
//       }
//     } catch (error) {
//       console.error("Error rejecting transaction:", error);
//       alert("Failed to reject transaction. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (open && profileId) {
//       fetchPaymentDetails();
//       if (activeTab === "transaction") {
//         fetchTransactions();
//       }
//     }
//   }, [open, profileId]);

//   const fetchPaymentDetails = async () => {
//     try {
//       setLoading(true);
//       const res = await apiAxios.get(
//         `/api/subscriptions/?profile_id=${profileId}`
//       );
//       setPaymentDetails(res.data || []);
//     } catch (error) {
//       console.error("Error fetching payment details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       setTransactionLoading(true);
//       const res = await apiAxios.get(
//         `/api/payment-transactions/?profile_id=${profileId}`
//       );
//       setTransactions(res.data || []);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//     } finally {
//       setTransactionLoading(false);
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "1": return "Initiated";
//       case "2": return "Success";
//       case "3": return "Failed";
//       default: return "Unknown";
//     }
//   };

//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case "3": return "bg-red-100 text-red-800";
//       case "2": return "bg-green-100 text-green-800";
//       case "1": return "bg-yellow-100 text-yellow-800";
//       default: return "bg-gray-100 text-gray-800";
//     }
//   };


//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white w-[800px] rounded-lg shadow-lg p-5 max-h-[80vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-2 capitalize">
//           <h2 className="text-lg justify-items-center font-semibold">Payment Information</h2>
//           <button
//             onClick={onClose}
//             className="text-red-600 text-xl font-bold"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex mt-4 border-b">
//           <button
//             type="button"
//             onClick={() => setActiveTab("payment")}
//             className={`flex-1 py-2 text-center ${activeTab === "payment"
//               ? "border-b-2 border-[#DC2635] text-[#DC2635] bg-[#fff9c9] font-semibold"
//               : "text-gray-600"
//               }`}
//           >
//             Payment Details
//           </button>
//           <button
//             type="button"
//             onClick={() => setActiveTab("transaction")}
//             className={`flex-1 py-2 text-center ${activeTab === "transaction"
//               ? "border-b-2 border-[#DC2635] text-[#DC2635] bg-[#fff9c9] font-semibold"
//               : "text-gray-600"
//               }`}
//           >
//             Transaction Details
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="mt-4">
//           {activeTab === "payment" && (
//             <>
//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <h3 className="text-lg font-medium text-gray-800">Payment Details</h3>
//                   {showAddButton && (
//                     <button
//                       type="button"
//                       onClick={handleAddNew}
//                       className="mt-4 flex items-center border p-2 rounded bg-blue-700 text-white font-medium"
//                     >
//                       <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       </svg>
//                       Add New Payment
//                     </button>
//                   )}
//                 </div>


//                 {loading ? (
//                   <div className="text-center py-4">Loading payment details...</div>
//                 ) : (
//                   <>
//                     {isEditing || isAdding ? (
//                       <div className="border rounded-lg p-4 bg-gray-50">
//                         <h4 className="font-medium text-gray-800 mb-3">
//                           {isEditing ? 'Edit Payment' : 'Add New Payment'}
//                         </h4>
//                         <div className="mb-4">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Payment For</label>
//                           <input
//                             type="text"
//                             name="payment_for"
//                             value={formData.payment_for || ""}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded-md"
//                           />
//                         </div>
//                         <div className="grid grid-cols-2 gap-3">

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount (₹)</label>
//                             <input
//                               type="number"
//                               name="paid_amount"
//                               value={formData.paid_amount || ""}
//                               onChange={handleInputChange}
//                               className="w-full p-2 border rounded-md"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Discount (₹)</label>
//                             <input
//                               type="number"
//                               name="discount"
//                               value={formData.discount || ""}
//                               onChange={handleInputChange}
//                               className="w-full p-2 border rounded-md"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
//                             <select
//                               name="payment_mode"
//                               value={formData.payment_mode || ""}
//                               onChange={handleInputChange}
//                               className="w-full p-2 border rounded-md"
//                             >
//                               <option value="">Select Payment Mode</option>
//                               <option value="Razor pay">Razor pay</option>
//                               <option value="Gpay">Gpay</option>
//                               <option value="Cash">Cash</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
//                             <input
//                               type="date"
//                               name="payment_date"
//                               value={formData.payment_date || ''}
//                               onChange={handleInputChange}
//                               className="w-full p-2 border rounded-md"
//                             />
//                           </div>

//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Reference ID</label>
//                           <input
//                             type="text"
//                             name="reference_id"
//                             value={formData.reference_id || ''}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded-md"
//                           />
//                         </div>
//                         <div className="mt-4 flex space-x-2">
//                           <button
//                             type="button"
//                             onClick={handleSave}
//                             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                           >
//                             Save
//                           </button>
//                           <button
//                             type="button"
//                             onClick={handleCancel}
//                             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         {paymentDetails.length === 0 ? (
//                           <div className="text-center py-4 text-gray-500">No payment details found</div>
//                         ) : (
//                           paymentDetails.map(payment => (
//                             <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                               <div className="grid grid-cols-2 gap-2 mb-3">
//                                 <div>
//                                   <p className="text-sm text-gray-500">Payment for</p>
//                                   <p className="font-medium text-gray-800">{payment.payment_for || 'N/A'}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Payment Mode</p>
//                                   <p className="font-medium text-gray-800">{payment.payment_mode || ""}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Paid Amount</p>
//                                   <p className="font-medium text-gray-800">
//                                     ₹ {payment.paid_amount || "N/A"}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Discount</p>
//                                   <p className="font-medium text-gray-800">
//                                     ₹ {payment.discount || 'N/A'}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Payment Date</p>
//                                   <p className="font-medium text-gray-800">
//                                     {/* {payment.payment_date || 'N/A'} */}
//                                     {payment.payment_date
//                                       ? new Date(payment.payment_date).toLocaleDateString()
//                                       : 'N/A'
//                                     }
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-gray-500">Reference ID</p>
//                                   <p className="font-medium text-gray-800">{payment.reference_id || 'N/A'}</p>
//                                 </div>

//                               </div>
//                               <div className="flex space-x-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleEdit(payment)}
//                                   className="text-blue-700 hover:text-blue-900 text-sm font-medium"
//                                 >
//                                   Edit
//                                 </button>
//                                 {/* <button
//                                   type="button"
//                                   onClick={() => handleRemove(payment.id)}
//                                   className="text-red-600 hover:text-red-800 text-sm font-medium"
//                                 >
//                                   Remove
//                                 </button> */}
//                               </div>
//                             </div>
//                           ))
//                         )}
//                       </>
//                     )}
//                   </>
//                 )}
//               </div>
//             </>
//           )}

//           {activeTab === "transaction" && (
//             <>
//               <div>
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
//                 {transactionLoading ? (
//                   <div className="text-center py-4">Loading transactions...</div>
//                 ) : (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-50">
//                         <tr>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                           <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         {transactions.length === 0 ? (
//                           <tr>
//                             <td colSpan={6} className="px-4 py-4 text-center text-sm text-gray-500">
//                               No transactions found
//                             </td>
//                           </tr>
//                         ) : (
//                           transactions.map(transaction => (
//                             <tr key={transaction.id} className="hover:bg-gray-50">
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
//                                 {new Date(transaction.created_at).toLocaleDateString()}
//                               </td>
//                               <td className="px-4 py-3 text-sm text-gray-700">{transaction.order_id}</td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹{transaction.amount}</td>
//                               <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{transaction.payment_type}</td>
//                               <td className="px-4 py-3 whitespace-nowrap">
//                                 <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(transaction.status)}`}>
//                                   {getStatusText(transaction.status)}
//                                 </span>
//                               </td>
//                               <td className="px-4 py-3 whitespace-nowrap flex gap-2">
//                                 <button
//                                   onClick={() => handleApprove(transaction.id)}
//                                   className="px-4 py-1 text-xs font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm"
//                                 >
//                                   Approve
//                                 </button>
//                                 <button
//                                   onClick={() => handleDeny(transaction.id)}
//                                   className="px-4 py-1 text-xs font-semibold rounded-md border border-red-600 text-red-600 hover:bg-red-50 shadow-sm"
//                                 >
//                                   Deny
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPopup;


import React, { useEffect, useMemo, useState } from "react";
import { apiAxios } from "../../../../api/apiUrl";
import { NotifySuccess } from "../../../../common/Toast/ToastMessage";

// ----- Moved Utilities & Constants Here -----
// These are now at the top level so the component can access them.

const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function currencyToNumber(v: string | number | null | undefined) {
  if (v === "" || v === null || v === undefined) return 0;
  const x = typeof v === "number" ? v : Number(String(v).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(x) ? x : 0;
}

// ----- Data: Main Packages ---------------------------------------------------
const MAIN_PACKAGES = [
  { key: "Gold", label: "Gold", price: 4900, fixed: true, category: "new" },
  { key: "Platinum", label: "Platinum", price: 7900, fixed: true, category: "new" },
  { key: "PlatinumPrivate", label: "Platinum Private", price: 9900, fixed: true, category: "new" },
  { key: "VysyamalaDelight", label: "Vysyamala Delight", price: null, fixed: false, category: "new" }, // custom
  { key: "Mini10", label: "Mini10", price: 2000, fixed: true, category: "new" },
  { key: "Mini20", label: "Mini20", price: 3000, fixed: true, category: "new" },
  { key: "Mini30", label: "Mini30", price: 4000, fixed: true, category: "new" },
  // --- Renewals ---
  { key: "RenewalGold", label: "Renewal - Gold", price: 2000, fixed: true, category: "renewal" },
  { key: "RenewalPlatinum", label: "Renewal - Platinum", price: 3000, fixed: true, category: "renewal" },
  { key: "RenewalPlatinumPrivate", label: "Renewal - Platinum Private", price: 4000, fixed: true, category: "renewal" },
  { key: "RenewalVysyamalaDelight", label: "Renewal - Vysyamala Delight", price: null, fixed: false, category: "renewal" }, // custom
  { key: "Upgrade", label: "Upgrade", price: null, fixed: false, category: "new" }, // custom
  { key: "Others", label: "Others", price: null, fixed: false, category: "new" }, // custom
];

// ----- Data: Add-on Packages -------------------------------------------------
const ADDONS = [
  {
    key: "VysAssist",
    label: "Vys Assist",
    details: "5 members",
    price: 900,
  },
  {
    key: "AstroService",
    label: "Astro Service",
    details: "10 Profiles",
    price: 900,
  },
  {
    key: "ProfileBooster",
    label: "Profile Booster",
    details: "3 months",
    price: 900,
  },
  {
    key: "PortraitPhotography",
    label: "Portrait Photography",
    details: "6 Shots – Physical Presence required",
    price: 4900,
  },
  {
    key: "VideoProfile",
    label: "Video Profile",
    details: "60 Seconds – Video input required",
    price: 2900,
  },
];


// ----- Interfaces -----

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  profileId: string;
  showAddButton?: boolean;
}

interface Transaction {
  id: number;
  profile_id: string;
  plan_id: number | null;
  order_id: string;
  payment_id: string;
  amount: string;
  status: string;
  created_at: string;
  payment_type: string;
  discount_amont: string | null;
  payment_refno: string | null;
  description: string | null;
  owner_id: string | null;
  addon_package: string;
}

interface PaymentDetail {
  id: number;
  paid_amount: string;
  payment_mode: string;
  payment_date: string; // This is required by handleSave
  gpay_no?: string | null;
  status: number;
  payment_id?: string | null;
  payment_for?: string;
  discount?: string;
  reference_id: string;
}

// ----- Main Component -----

const PaymentPopup: React.FC<PaymentPopupProps> = ({ open, onClose, profileId, showAddButton = true }) => {
  const [activeTab, setActiveTab] = useState<"payment" | "transaction">("payment");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionLoading, setTransactionLoading] = useState(false);

  // ----- START: State from PaymentInfoForm -----
  const [mainPackage, setMainPackage] = useState("");
  const [mainAmount, setMainAmount] = useState(0); // auto for fixed, editable for custom
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({}); // {key: true|false}
  const [discount, setDiscount] = useState(0);

  const [validFrom, setValidFrom] = useState(""); // YYYY-MM-DD
  const [validTo, setValidTo] = useState(""); // YYYY-MM-DD

  const [offerAny, setOfferAny] = useState(""); // free text
  const [hintToSave, setHintToSave] = useState(""); // rich text area (simple)

  // Payment details
  const [paymentType, setPaymentType] = useState(""); // RazorPay | OnlineGpay | ManualGpay | AccountTransfer | Cash
  const [paymentDate, setPaymentDate] = useState(""); // YYYY-MM-DD (Added this, as it's required for handleSave)
  const [gpayNumber, setGpayNumber] = useState(""); // required when ManualGpay
  const [referenceId, setReferenceId] = useState(""); // UTR / Razorpay id / Txn ref
  const [paymentStatus, setPaymentStatus] = useState(""); // Success | Failure
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Small toggle filter for Main Packages
  const [packageFilter, setPackageFilter] = useState("all"); // all | new | renewal

  const filteredMainPackages = useMemo(() => {
    if (packageFilter === "all") return MAIN_PACKAGES;
    return MAIN_PACKAGES.filter((p) => p.category === packageFilter);
  }, [packageFilter]);

  // ----- Derived totals -------------------------------------------------------
  const addonsTotal = useMemo(() => {
    return ADDONS.reduce((sum, a) => (selectedAddons[a.key] ? sum + a.price : sum), 0);
  }, [selectedAddons]);

  const subtotal = useMemo(() => currencyToNumber(mainAmount) + addonsTotal, [mainAmount, addonsTotal]);

  const safeDiscount = useMemo(() => {
    const d = currencyToNumber(discount);
    return Math.max(0, Math.min(d, subtotal));
  }, [discount, subtotal]);

  const netAmount = useMemo(() => subtotal - safeDiscount, [subtotal, safeDiscount]);
  // ----- END: State from PaymentInfoForm -----


  // ----- START: Handlers from PaymentInfoForm -----
  function needsRefId(type: string) {
    return type === "RazorPay" || type === "OnlineGpay" || type === "ManualGpay" || type === "AccountTransfer";
  }
  function needsGpayNo(type: string) {
    return type === "ManualGpay";
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!mainPackage) {
      e.mainPackage = "Main package must be selected.";
    }
    if (needsGpayNo(paymentType) && !String(gpayNumber).trim()) {
      e.gpayNumber = "GPay number is required for Manual GPay.";
    }
    if (needsRefId(paymentType) && !String(referenceId).trim()) {
      e.referenceId = "Reference ID is required for the selected payment type.";
    }
    if (validFrom && validTo && validTo < validFrom) {
      e.validity = "To date cannot be earlier than From date.";
    }
    if (!paymentType) {
      e.paymentType = "Payment type is required.";
    }
    if (!paymentDate) {
      e.paymentDate = "Payment date is required."; // Added validation
    }
    if (!paymentStatus) {
      e.paymentStatus = "Payment status is required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onChangeMainPackage(key: React.SetStateAction<string>) {
    setMainPackage(key);
    const pkg = MAIN_PACKAGES.find((p) => p.key === key);
    if (!pkg) {
      setMainAmount(0);
      return;
    }
    if (pkg.fixed && typeof pkg.price === "number") {
      setMainAmount(pkg.price);
    } else {
      // Custom amount for Delight / Upgrade / Others
      setMainAmount(0);
    }
  }

  function onToggleAddon(key: string) {
    setSelectedAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function resetForm() {
    setMainPackage("");
    setMainAmount(0);
    setSelectedAddons({});
    setDiscount(0);
    setValidFrom("");
    setValidTo("");
    setOfferAny("");
    setHintToSave("");
    setPaymentType("");
    setGpayNumber("");
    setPaymentDate(""); // Reset new field
    setReferenceId("");
    setPaymentStatus("");
    setErrors({});
  }

  const handleEdit = (payment: PaymentDetail) => {
    // We can't perfectly restore the form state, but we can set the values
    // that were saved in the PaymentDetail object.
    setIsEditing(payment.id);

    // Try to find package, default to 'Others'
    const pkg = MAIN_PACKAGES.find((p) => p.label === payment.payment_for);
    setMainPackage(pkg ? pkg.key : "Others");
    
    // We can't know the original mainAmount vs addons, so we set netAmount
    // and discount. This will mean subtotal is correct.
    const savedDiscount = currencyToNumber(payment.discount);
    const savedPaidAmount = currencyToNumber(payment.paid_amount);
    
    setMainAmount(savedPaidAmount + savedDiscount); // This sets the subtotal
    setSelectedAddons({}); // Addons are lost, cannot be reverse-engineered
    setDiscount(savedDiscount);
    
    setValidFrom(""); // Not saved in PaymentDetail
    setValidTo("");   // Not saved in PaymentDetail
    setOfferAny("");  // Not saved
    setHintToSave("");// Not saved
    
    setPaymentType(payment.payment_mode || "");
    setPaymentDate(payment.payment_date ? payment.payment_date.split('T')[0] : ""); // Format as YYYY-MM-DD
    setGpayNumber(payment.gpay_no || "");
    setReferenceId(payment.reference_id || "");
    setPaymentStatus(payment.status === 1 ? "Success" : "Failure"); // Map status 1 to 'Success'
  };

  const handleAddNew = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (!validate()) {
      NotifySuccess("Please fix the errors in the form."); // Use your toast
      return;
    }

    try {
      // Build the 'payment_for' string
      const mainPackageLabel = MAIN_PACKAGES.find((p) => p.key === mainPackage)?.label || "Unknown Package";
      const addonLabels = ADDONS.filter((a) => selectedAddons[a.key]).map((a) => a.label).join(", ");
      const paymentForString = addonLabels ? `${mainPackageLabel} + ${addonLabels}` : mainPackageLabel;

      // Build the payload for the *existing* API endpoint
      const payload = {
        profile_id: profileId,
        paid_amount: netAmount.toString(),
        payment_mode: paymentType,
        payment_date: paymentDate, // From the new state
        status: paymentStatus === "Success" ? 1 : 0, // Map 'Success' to 1
        payment_for: paymentForString,
        discount: safeDiscount.toString(),
        reference_id: referenceId,
        gpay_no: gpayNumber || null // Add GPay number if it exists
      };

      if (isAdding) {
        // Create new payment
        const res = await apiAxios.post("/api/subscriptions/create/", payload);
        console.log("Payment added:", res.data);
        NotifySuccess("Payment Created Successfully");
        setIsAdding(false);

      } else if (isEditing) {
        // Update existing payment by ID
        const res = await apiAxios.patch(
          `/api/subscriptions/${isEditing}/update/`,
          payload
        );
        console.log("Payment updated:", res.data);
        NotifySuccess("Payment Updated Successfully");
        setIsEditing(null);
      }

      await fetchPaymentDetails(); // Refresh list
      resetForm(); // Clear the form

    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Failed to save payment. Please try again.");
    }
  };


  const handleCancel = () => {
    resetForm();
    setIsEditing(null);
    setIsAdding(false);
  };

  // handleApprove, handleDeny, fetchPaymentDetails, fetchTransactions, getStatusText, getStatusClass
  // remain unchanged as they relate to the *other* tab.
  // ----- END: Original Handlers (Modified) -----

  // ... (All other functions like handleApprove, handleDeny, fetchPaymentDetails, etc., remain exactly the same)
  const handleApprove = async (transactionId: number, paymentFor: string = "") => {
    try {
      const payload = {
        transaction_id: transactionId.toString(),
        action: "accept",
        payment_for: paymentFor
      };

      const response = await apiAxios.post(
        "/api/process-transaction/",
        payload
      );

      if (response.data.status === "success") {
        NotifySuccess(response.data.message || "Transaction rejected successfully");
        await fetchTransactions();
      } else {
        alert(response.data.message || "Failed to reject transaction");
      }
    } catch (error) {
      console.error("Error rejecting transaction:", error);
      alert("Failed to reject transaction. Please try again.");
    }
  };

  const handleDeny = async (transactionId: number, paymentFor: string = "") => {
    try {
      const payload = {
        transaction_id: transactionId.toString(),
        action: "reject",
        payment_for: paymentFor
      };

      const response = await apiAxios.post(
        "/api/process-transaction/",
        payload
      );

      if (response.data.status === "success") {
        NotifySuccess(response.data.message || "Transaction rejected successfully");
        await fetchTransactions();
      } else {
        alert(response.data.message || "Failed to reject transaction");
      }
    } catch (error) {
      console.error("Error rejecting transaction:", error);
      alert("Failed to reject transaction. Please try again.");
    }
  };

  useEffect(() => {
    if (open && profileId) {
      fetchPaymentDetails();
      if (activeTab === "transaction") {
        fetchTransactions();
      }
    }
  }, [open, profileId]);

   useEffect(() => {
    if (open && profileId) {
      if (activeTab === "payment") {
        fetchPaymentDetails();
      } else if (activeTab === "transaction") {
        fetchTransactions();
      }
    }
  }, [open, profileId, activeTab]); // Added activeTab as dependency

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true);
      const res = await apiAxios.get(
        `/api/subscriptions/?profile_id=${profileId}`
      );
      setPaymentDetails(res.data || []);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setTransactionLoading(true);
      const res = await apiAxios.get(
        `/api/payment-transactions/?profile_id=${profileId}`
      );
      setTransactions(res.data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setTransactionLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "1": return "Initiated";
      case "2": return "Success";
      case "3": return "Failed";
      default: return "Unknown";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "3": return "bg-red-100 text-red-800";
      case "2": return "bg-green-100 text-green-800";
      case "1": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // ----- START: Component Render -----

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-[800px] rounded-lg shadow-lg p-5 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 capitalize">
          <h2 className="text-lg justify-items-center font-semibold">Payment Information</h2>
          <button
            onClick={onClose}
            className="text-red-600 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-4 border-b">
          <button
            type="button"
            onClick={() => setActiveTab("payment")}
            className={`flex-1 py-2 text-center ${activeTab === "payment"
              ? "border-b-2 border-[#DC2635] text-[#DC2635] bg-[#fff9c9] font-semibold"
              : "text-gray-600"
              }`}
          >
            Payment Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("transaction")}
            className={`flex-1 py-2 text-center ${activeTab === "transaction"
              ? "border-b-2 border-[#DC2635] text-[#DC2635] bg-[#fff9c9] font-semibold"
              : "text-gray-600"
              }`}
          >
            Transaction Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "payment" && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-800">Payment Details</h3>
                  {showAddButton && !(isAdding || isEditing) && ( // Hide "Add" button when form is open
                    <button
                      type="button"
                      onClick={handleAddNew}
                      className="mt-4 flex items-center border p-2 rounded bg-blue-700 text-white font-medium"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add New Payment
                    </button>
                  )}
                </div>


                {loading ? (
                  <div className="text-center py-4">Loading payment details...</div>
                ) : (
                  <>
                    {/* ----- START: New Form UI ----- */}
                    {isEditing || isAdding ? (
                      <div className="border rounded-lg p-4 bg-gray-50">
                        {/* Removed the extra min-h-screen and bg-neutral-50 */}
                        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                          <h1 className="text-2xl font-semibold tracking-tight">
                            {isEditing ? 'Edit Payment' : 'Add New Payment'}
                          </h1>
                          <p className="mt-1 text-sm text-neutral-500">Fill package selections, add-ons, discount, validity, and notes.</p>

                          {/* Main Package */}
                          <section className="mt-6 grid gap-4 rounded-xl border p-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <label htmlFor="mainPackage" className="text-sm font-medium">Package Name <span className="text-neutral-400">(Main Package)</span></label>
                                <div role="tablist" aria-label="Filter packages" className="inline-flex items-center gap-1 rounded-full border bg-white p-0.5 text-xs">
                                  <button
                                    type="button"
                                    onClick={() => setPackageFilter("all")}
                                    className={`rounded-full px-2 py-1 ${packageFilter === "all" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
                                  >All</button>
                                  <button
                                    type="button"
                                    onClick={() => setPackageFilter("new")}
                                    className={`rounded-full px-2 py-1 ${packageFilter === "new" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
                                  >New</button>
                                  <button
                                    type="button"
                                    onClick={() => setPackageFilter("renewal")}
                                    className={`rounded-full px-2 py-1 ${packageFilter === "renewal" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
                                  >Renewal</button>
                                </div>
                              </div>
                              <select
                                id="mainPackage"
                                name="mainPackage"
                                value={mainPackage}
                                onChange={(e) => onChangeMainPackage(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                              >
                                <option value="" disabled>
                                  Select a package
                                </option>
                                {filteredMainPackages.map((p) => (
                                  <option key={p.key} value={p.key}>
                                    {p.label}
                                  </option>
                                ))}
                              </select>
                              {errors.mainPackage && (
                                <p className="mt-1 text-xs text-red-600">{errors.mainPackage}</p>
                              )}
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="mainAmount" className="text-sm font-medium">Package Amount</label>
                              <div className="flex items-center gap-2">
                                <span className="rounded-xl border bg-neutral-50 px-3 py-2 text-sm">₹</span>
                                <input
                                  id="mainAmount"
                                  name="mainAmount"
                                  type="number"
                                  min={0}
                                  step="1"
                                  value={mainAmount}
                                  onChange={(e) => setMainAmount(currencyToNumber(e.target.value))}
                                  className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                  placeholder="Auto-filled for fixed plans; enter for custom"
                                  // Disable if the package is fixed
                                  disabled={MAIN_PACKAGES.find(p => p.key === mainPackage)?.fixed} 
                                />
                              </div>
                              <p className="text-xs text-neutral-500">
                                Amount is auto-filled for fixed plans. Enter manually for custom plans (Delight, Upgrade, Others).
                              </p>
                            </div>
                          </section>

                          {/* Add-ons */}
                          <section className="mt-6 rounded-xl border p-4">
                            <p className="text-sm font-medium">Another Package Name <span className="text-neutral-400">(Add‑ons)</span></p>
                            <div className="mt-3 grid gap-3 md:grid-cols-2">
                              {ADDONS.map((a) => (
                                <label key={a.key} className="flex cursor-pointer items-start gap-3 rounded-xl border p-3 hover:bg-neutral-50">
                                  <input
                                    type="checkbox"
                                    id={`addon_${a.key}`}
                                    name="addons"
                                    checked={!!selectedAddons[a.key]}
                                    onChange={() => onToggleAddon(a.key)}
                                    className="mt-1"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium">{a.label}</span>
                                      <span className="text-sm text-neutral-600">{INR.format(a.price)}</span>
                                    </div>
                                    <p className="text-xs text-neutral-500">{a.details}</p>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </section>

                          {/* Pricing Summary */}
                          <section className="mt-6 grid gap-4 rounded-xl border p-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="discount" className="text-sm font-medium">Discount</label>
                              <div className="flex items-center gap-2">
                                <span className="rounded-xl border bg-neutral-50 px-3 py-2 text-sm">₹</span>
                                <input
                                  id="discount"
                                  name="discount"
                                  type="number"
                                  min={0}
                                  step="1"
                                  value={discount}
                                  onChange={(e) => setDiscount(currencyToNumber(e.target.value))}
                                  className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                  placeholder="Enter discount amount (₹)"
                                />
                              </div>
                              <p className="text-xs text-neutral-500">Discount cannot exceed subtotal; limited automatically.</p>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-sm font-medium">Calculated Amounts</label>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="rounded-xl bg-neutral-50 p-3">
                                  <p className="text-neutral-500">Main + Add-ons</p>
                                  <p className="font-semibold">{INR.format(subtotal)}</p>
                                </div>
                                <div className="rounded-xl bg-neutral-50 p-3">
                                  <p className="text-neutral-500">Net Amount</p>
                                  <p className="font-semibold">{INR.format(netAmount)}</p>
                                </div>
                              </div>
                            </div>
                          </section>

                          {/* Validity */}
                          <section className="mt-6 grid gap-4 rounded-xl border p-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="validFrom" className="text-sm font-medium">Validity Period – From date</label>
                              <input
                                id="validFrom"
                                name="validFrom"
                                type="date"
                                value={validFrom}
                                onChange={(e) => setValidFrom(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="validTo" className="text-sm font-medium">Validity Period – To date</label>
                              <input
                                id="validTo"
                                name="validTo"
                                type="date"
                                value={validTo}
                                onChange={(e) => setValidTo(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                              />
                              {errors.validity && (
                                <p className="mt-1 text-xs text-red-600">{errors.validity}</p>
                              )}
                            </div>
                          </section>

                          {/* Payment Details */}
                          <section className="mt-6 grid gap-4 rounded-xl border p-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="paymentType" className="text-sm font-medium">Payment Type</label>
                              <select
                                id="paymentType"
                                name="paymentType"
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                              >
                                <option value="" disabled>Select payment type</option>
                                <option value="RazorPay">Razor pay</option>
                                <option value="OnlineGpay">Online Gpay</option>
                                <option value="ManualGpay">Manual Gpay</option>
                                <option value="AccountTransfer">Account Transfer</option>
                                <option value="Cash">Cash</option>
                              </select>
                              {errors.paymentType && (
                                <p className="mt-1 text-xs text-red-600">{errors.paymentType}</p>
                              )}

                              {paymentType === "ManualGpay" && (
                                <div className="mt-2">
                                  <label htmlFor="gpayNumber" className="text-sm font-medium">Gpay No.</label>
                                  <input
                                    id="gpayNumber"
                                    name="gpayNumber"
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={gpayNumber}
                                    onChange={(e) => setGpayNumber(e.target.value)}
                                    className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                    placeholder="Enter GPay phone number"
                                  />
                                  {errors?.gpayNumber && (
                                    <p className="mt-1 text-xs text-red-600">{errors.gpayNumber}</p>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="referenceId" className="text-sm font-medium">Reference ID</label>
                              <input
                                id="referenceId"
                                name="referenceId"
                                type="text"
                                value={referenceId}
                                onChange={(e) => setReferenceId(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                placeholder="UTR / Razorpay ID / Txn Ref"
                              />
                              {errors?.referenceId && (
                                <p className="mt-1 text-xs text-red-600">{errors.referenceId}</p>
                              )}
                            </div>

                            {/* == ADDED PAYMENT DATE FIELD == */}
                            <div className="flex flex-col gap-2">
                              <label htmlFor="paymentDate" className="text-sm font-medium">Payment Date</label>
                              <input
                                id="paymentDate"
                                name="paymentDate"
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                              />
                              {errors.paymentDate && (
                                <p className="mt-1 text-xs text-red-600">{errors.paymentDate}</p>
                              )}
                            </div>

                            <div className="flex flex-col gap-2">
                              <label htmlFor="paymentStatus" className="text-sm font-medium">Payment Status</label>
                              <select
                                id="paymentStatus"
                                name="paymentStatus"
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                              >
                                <option value="" disabled>Select status</option>
                                <option value="Success">Success</option>
                                <option value="Failure">Failure</option>
                              </select>
                              {errors.paymentStatus && (
                                <p className="mt-1 text-xs text-red-600">{errors.paymentStatus}</p>
                              )}
                            </div>
                          </section>

                          {/* Offer & Hints */}
                          <section className="mt-6 grid gap-4 rounded-xl border p-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="offerAny" className="text-sm font-medium">Offer any</label>
                              <input
                                id="offerAny"
                                name="offerAny"
                                type="text"
                                value={offerAny}
                                onChange={(e) => setOfferAny(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                placeholder="Type any special offer here"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label htmlFor="hintToSave" className="text-sm font-medium">Hint to save <span className="text-neutral-400">(notes)</span></label>
                              <textarea
                                id="hintToSave"
                                name="hintToSave"
                                rows={4}
                                value={hintToSave}
                                onChange={(e) => setHintToSave(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                placeholder="Notes / instructions for the team"
                              />
                            </div>
                          </section>

                          {/* Actions */}
                          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={handleCancel} // Wired to new handleCancel
                                className="rounded-2xl border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={resetForm} // Kept reset logic
                                className="rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                              >
                                Reset Form
                              </button>
                              <button
                                type="button"
                                onClick={handleSave} // Wired to new handleSave
                                className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
                              >
                                Save Payment
                              </button>
                            </div>
                          </div>

                        
                

                        </div>
                      </div>
                    ) : (
                      <>
                        {paymentDetails.length === 0 ? (
                          <div className="text-center py-4 text-gray-500">No payment details found</div>
                        ) : (
                          paymentDetails.map(payment => (
                            <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                              <div className="grid grid-cols-2 gap-2 mb-3">
                                <div>
                                  <p className="text-sm text-gray-500">Payment for</p>
                                  <p className="font-medium text-gray-800">{payment.payment_for || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Payment Mode</p>
                                  <p className="font-medium text-gray-800">{payment.payment_mode || ""}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Paid Amount</p>
                                  <p className="font-medium text-gray-800">
                                    {INR.format(currencyToNumber(payment.paid_amount))}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Discount</p>
                                  <p className="font-medium text-gray-800">
                                    {INR.format(currencyToNumber(payment.discount))}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Payment Date</p>
                                  <p className="font-medium text-gray-800">
                                    {payment.payment_date
                                      ? new Date(payment.payment_date).toLocaleDateString()
                                      : 'N/A'
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Reference ID</p>
                                  <p className="font-medium text-gray-800">{payment.reference_id || 'N/A'}</p>
                                </div>

                              </div>
                              <div className="flex space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handleEdit(payment)}
                                  className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                                >
                                  Edit
                                </button>
                                {/* Remove button is still commented out as per your original code */}
                              </div>
                            </div>
                          ))
                        )}
                      </>
                      // ----- END: Existing Payment List -----
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "transaction" && (
            // ... Transaction tab content remains unchanged ...
            <>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
                  {transactionLoading ? (
                    <div className="text-center py-4">Loading transactions...</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {transactions.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="px-4 py-4 text-center text-sm text-gray-500">
                                No transactions found
                              </td>
                            </tr>
                          ) : (
                            transactions.map(transaction => (
                              <tr key={transaction.id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                                  {new Date(transaction.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">{transaction.order_id}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹{transaction.amount}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{transaction.payment_type}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(transaction.status)}`}>
                                    {getStatusText(transaction.status)}
                                  </span>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap flex gap-2">
                                  <button
                                    onClick={() => handleApprove(transaction.id)}
                                    className="px-4 py-1 text-xs font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleDeny(transaction.id)}
                                    className="px-4 py-1 text-xs font-semibold rounded-md border border-red-600 text-red-600 hover:bg-red-50 shadow-sm"
                                  >
                                    Deny
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;