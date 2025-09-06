// import React, { useState } from "react";

// interface PaymentPopupProps {
//   open: boolean;
//   onClose: () => void;
// }
// interface Transaction {
//   id: number;
//   date: string;
//   amount: number;
//   status: string;
//   description: string;
// }

// interface PaymentDetail {
//   id: number;
//   method: string;
//   cardNumber: string;
//   expiryDate: string;
//   cardholder: string;
// }
// const PaymentPopup: React.FC<PaymentPopupProps> = ({ open, onClose }) => {
//   const [activeTab, setActiveTab] = useState<"payment" | "transaction">("payment");

//     const transactions: Transaction[] = [
//     { id: 1, date: '2023-04-15', amount: 125.75, status: 'Completed', description: 'Premium Subscription' },
//     { id: 2, date: '2023-03-28', amount: 89.99, status: 'Completed', description: 'Service Upgrade' },
//     { id: 3, date: '2023-02-14', amount: 215.50, status: 'Refunded', description: 'Annual Plan' },
//   ];

//   const paymentDetails: PaymentDetail[] = [
//     { id: 1, method: 'Credit Card', cardNumber: '**** **** **** 1234', expiryDate: '12/2024', cardholder: 'John Doe' },
//     { id: 2, method: 'Gpay', cardNumber: 'john.doe@example.com', expiryDate: 'N/A', cardholder: 'John Doe' },
//   ];

//   if (!open) return null; // Hide popup if not open

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white w-[500px] rounded-lg shadow-lg p-5">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-2 capitalize">
//           <h2 className="text-lg font-semibold">Payment Information</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-red-600 text-xl"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex mt-4 border-b">
//           <button
//           type="button"
//             onClick={() => setActiveTab("payment")}
//             className={`flex-1 py-2 text-center ${
//               activeTab === "payment"
//                 ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
//                 : "text-gray-600"
//             }`}
//           >
//             Payment Details
//           </button>
//           <button
//           type="button"
//             onClick={() => setActiveTab("transaction")}
//             className={`flex-1 py-2 text-center ${
//               activeTab === "transaction"
//                 ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
//                 : "text-gray-600"
//             }`}
//           >
//             Transaction Details
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className="mt-4">
//           {activeTab === "payment" && (
//          <>
//                      <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-800">Saved Payment Methods</h3>
//               {paymentDetails.map(payment => (
//                 <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-medium text-gray-800">{payment.method}</h4>
//                       <p className="text-gray-600">{payment.cardNumber}</p>
//                       <p className="text-sm text-gray-500">Expires: {payment.expiryDate}</p>
//                     </div>
//                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
//                       {payment.cardholder}
//                     </span>
//                   </div>
//                   <div className="mt-3 flex space-x-2">
//                     <button type="button" className="text-blue-700 hover:text-blue-900 text-sm font-medium">
//                       Edit
//                     </button>
//                     <button  type="button" className="text-red-600 hover:text-red-800 text-sm font-medium">
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//    ))}  <button type="button" className="mt-4 flex items-center text-blue-700 hover:text-blue-900 font-medium">
//                 <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Add New Payment Method
//               </button>
//             </div>
//          </>
//           )}


//           {activeTab === "transaction" && (
//            <>
//            <div>
//               <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                       <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {transactions.map(transaction => (
//                       <tr key={transaction.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{transaction.date}</td>
//                         <td className="px-4 py-3 text-sm text-gray-700">{transaction.description}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">${transaction.amount.toFixed(2)}</td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <span className={`px-2 py-1 text-xs rounded-full ${
//                             transaction.status === 'Completed' 
//                               ? 'bg-green-100 text-green-800' 
//                               : transaction.status === 'Refunded'
//                                 ? 'bg-yellow-100 text-yellow-800'
//                                 : 'bg-blue-100 text-blue-800'
//                           }`}>
//                             {transaction.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//            </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPopup;


import React, { useState } from "react";

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
}

interface Transaction {
  id: number;
  date: string;
  amount: number;
  status: string;
  description: string;
}

interface PaymentDetail {
  id: number;
  paid_amount: number;
  payment_for: string;
  payment_mode: string;
  payment_date: string;
  discount: number;
  gpay_no?: string;
  reference_id: string;
  cardholder: string;
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState<"payment" | "transaction">("payment");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([
    { 
      id: 1, 
      paid_amount: 125.75, 
      payment_for: 'Premium Subscription', 
      payment_mode: 'Credit Card', 
      payment_date: '2023-04-15', 
      discount: 0, 
      reference_id: 'REF123456', 
      cardholder: 'John Doe' 
    },
    { 
      id: 2, 
      paid_amount: 89.99, 
      payment_for: 'Service Upgrade', 
      payment_mode: 'Gpay', 
      payment_date: '2023-03-28', 
      discount: 5, 
      gpay_no: 'john.doe@example.com', 
      reference_id: 'REF789012', 
      cardholder: 'John Doe' 
    },
  ]);

  const [formData, setFormData] = useState<PaymentDetail>({
    id: 0,
    paid_amount: 0,
    payment_for: '',
    payment_mode: 'Credit Card',
    payment_date: '',
    discount: 0,
    gpay_no: '',
    reference_id: '',
    cardholder: ''
  });

  const transactions: Transaction[] = [
    { id: 1, date: '2023-04-15', amount: 125.75, status: 'Completed', description: 'Premium Subscription' },
    { id: 2, date: '2023-03-28', amount: 89.99, status: 'Completed', description: 'Service Upgrade' },
    { id: 3, date: '2023-02-14', amount: 215.50, status: 'Refunded', description: 'Annual Plan' },
  ];

  const handleEdit = (payment: PaymentDetail) => {
    setIsEditing(payment.id);
    setFormData(payment);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setFormData({
      id: 0,
      paid_amount: 0,
      payment_for: '',
      payment_mode: 'Credit Card',
      payment_date: '',
      discount: 0,
      gpay_no: '',
      reference_id: '',
      cardholder: ''
    });
  };

  const handleSave = () => {
    if (isEditing) {
      // Update existing payment
      setPaymentDetails(paymentDetails.map(p => 
        p.id === isEditing ? formData : p
      ));
      setIsEditing(null);
    } else if (isAdding) {
      // Add new payment with a new ID
      const newId = Math.max(...paymentDetails.map(p => p.id), 0) + 1;
      setPaymentDetails([...paymentDetails, {...formData, id: newId}]);
      setIsAdding(false);
    }
    
    setFormData({
      id: 0,
      paid_amount: 0,
      payment_for: '',
      payment_mode: 'Credit Card',
      payment_date: '',
      discount: 0,
      gpay_no: '',
      reference_id: '',
      cardholder: ''
    });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({
      id: 0,
      paid_amount: 0,
      payment_for: '',
      payment_mode: 'Credit Card',
      payment_date: '',
      discount: 0,
      gpay_no: '',
      reference_id: '',
      cardholder: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'paid_amount' || name === 'discount' ? parseFloat(value) || 0 : value
    });
  };

  const handleRemove = (id: number) => {
    setPaymentDetails(paymentDetails.filter(p => p.id !== id));
  };

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
            className={`flex-1 py-2 text-center ${
              activeTab === "payment"
                ? "border-b-2 border-[#DC2635] text-[#DC2635] bg-[#fff9c9] font-semibold"
                : "text-gray-600"
            }`}
          >
            Payment Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("transaction")}
            className={`flex-1 py-2 text-center ${
              activeTab === "transaction"
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
                 <button 
                      type="button" 
                      onClick={handleAddNew}
                      className="mt-4 flex items-center border  p-2 rounded bg-blue-700 text-white font-medium"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add New Payment
                    </button>
               </div>
                {isEditing || isAdding ? (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800 mb-3">
                      {isEditing ? 'Edit Payment' : 'Add New Payment'}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment For</label>
                        <input
                          type="text"
                          name="payment_for"
                          value={formData.payment_for}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount ($)</label>
                        <input
                          type="number"
                          name="paid_amount"
                          value={formData.paid_amount}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount ($)</label>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                        <select
                          name="payment_mode"
                          value={formData.payment_mode}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="Credit Card">Credit Card</option>
                          <option value="Gpay">Gpay</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                        <input
                          type="date"
                          name="payment_date"
                          value={formData.payment_date}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      {formData.payment_mode === 'Gpay' && (
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gpay Number</label>
                          <input
                            type="text"
                            name="gpay_no"
                            value={formData.gpay_no || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                      )}
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reference ID</label>
                        <input
                          type="text"
                          name="reference_id"
                          value={formData.reference_id}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardholder"
                          value={formData.cardholder}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button 
                        type="button" 
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button 
                        type="button" 
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {paymentDetails.map(payment => (
                      <div key={payment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <p className="text-sm text-gray-500">Payment For</p>
                            <p className="font-medium text-gray-800">{payment.payment_for}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Mode</p>
                            <p className="font-medium text-gray-800">{payment.payment_mode}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Paid Amount</p>
                            <p className="font-medium text-gray-800">${payment.paid_amount.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Discount</p>
                            <p className="font-medium text-gray-800">${payment.discount.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Date</p>
                            <p className="font-medium text-gray-800">{payment.payment_date}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Reference ID</p>
                            <p className="font-medium text-gray-800">{payment.reference_id}</p>
                          </div>
                          {payment.gpay_no && (
                            <div className="col-span-2">
                              <p className="text-sm text-gray-500">Gpay Number</p>
                              <p className="font-medium text-gray-800">{payment.gpay_no}</p>
                            </div>
                          )}
                          <div className="col-span-2">
                            <p className="text-sm text-gray-500">Cardholder</p>
                            <p className="font-medium text-gray-800">{payment.cardholder}</p>
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
                          <button 
                            type="button" 
                            onClick={() => handleRemove(payment.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    
                   
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "transaction" && (
            <>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map(transaction => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{transaction.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{transaction.description}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">${transaction.amount.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              transaction.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : transaction.status === 'Refunded'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-blue-100 text-blue-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;