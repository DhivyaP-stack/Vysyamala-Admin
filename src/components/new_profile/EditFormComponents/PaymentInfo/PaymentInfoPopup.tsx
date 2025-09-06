import React, { useEffect, useState } from "react";
import { apiAxios } from "../../../../api/apiUrl";
import { NotifySuccess } from "../../../../common/Toast/ToastMessage";

interface PaymentPopupProps {
  open: boolean;
  onClose: () => void;
  profileId: string;
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
  payment_date: string;
  gpay_no?: string | null;
  status: number;
  payment_id?: string | null;
  payment_for?: string;   // ✅ add
  discount?: string;
  reference_id: string;

}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ open, onClose, profileId }) => {
  const [activeTab, setActiveTab] = useState<"payment" | "transaction">("payment");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Add this line
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<PaymentDetail>>({
    id: 0,
    paid_amount: '',
    payment_mode: '',
    payment_date: '',
    gpay_no: '',
    payment_for: "",
    discount: "",
    reference_id: ""

  });



  const handleEdit = (payment: PaymentDetail) => {
    setIsEditing(payment.id);
    setFormData(payment);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setFormData({
      id: 0,
      paid_amount: "",
      payment_mode: '',
      payment_date: '',
      payment_id: '',
      reference_id: '',
    });
  };

  const handleSave = async () => {
    try {
      if (isAdding) {
        // Create new payment
        const payload = {
          profile_id: profileId,
          paid_amount: formData.paid_amount,
          payment_mode: formData.payment_mode,
          payment_date: formData.payment_date,
          status: 1,
          payment_for: formData.payment_for || "",
          discount: formData.discount || "",
          reference_id: formData.reference_id || ""
        };

        const res = await apiAxios.post(
          "/api/subscriptions/create/",
          payload
        );

        console.log("Payment added:", res.data);
        await fetchPaymentDetails();
        NotifySuccess("Payment Created Successfully");
        setIsAdding(false);

      } else if (isEditing) {

        // Update existing payment by ID
        const payload = {
          profile_id: profileId,
          paid_amount: formData.paid_amount,
          payment_mode: formData.payment_mode,
          payment_date: formData.payment_date,
          status: 1,
          payment_for: formData.payment_for || "",
          discount: formData.discount || "",
          reference_id: formData.reference_id || ""

        };

        const res = await apiAxios.patch(
          `/api/subscriptions/${isEditing}/update/`, // ✅ dynamic id
          payload
        );

        console.log("Payment updated:", res.data);
        await fetchPaymentDetails();
        NotifySuccess("Payment Updated Successfully");
        setIsEditing(null);
      }

      // Reset form after save
      setFormData({
        id: 0,
        paid_amount: "",
        payment_mode: "",
        payment_date: "",
        gpay_no: "",
        payment_for: "",
        discount: "",
        reference_id: "",
      });

    } catch (error) {
      console.error("Error saving payment:", error);
      alert("Failed to save payment. Please try again.");
    }
  };


  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setFormData({
      id: 0,
      paid_amount: "",
      payment_mode: '',
      payment_date: '',
      payment_id: '',
      reference_id: '',
      payment_for: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'paid_amount' ? parseFloat(value) || 0 : value
    });
  };

  // const handleRemove = (id: number) => {
  //   setPaymentDetails(paymentDetails.filter(p => p.id !== id));
  // };

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
        // Refresh transactions to update the status
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
        // Refresh transactions to update the status
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
                </div>

                {loading ? (
                  <div className="text-center py-4">Loading payment details...</div>
                ) : (
                  <>
                    {isEditing || isAdding ? (
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-medium text-gray-800 mb-3">
                          {isEditing ? 'Edit Payment' : 'Add New Payment'}
                        </h4>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Payment For</label>
                          <input
                            type="text"
                            name="payment_for"
                            value={formData.payment_for || ""}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount (₹)</label>
                            <input
                              type="number"
                              name="paid_amount"
                              value={formData.paid_amount || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (₹)</label>
                            <input
                              type="number"
                              name="discount"
                              value={formData.discount || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                            <select
                              name="payment_mode"
                              value={formData.payment_mode || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="">Select Payment Mode</option>
                              <option value="Razor pay">Razor pay</option>
                              <option value="Gpay">Gpay</option>
                              <option value="Cash">Cash</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                            <input
                              type="date"
                              name="payment_date"
                              value={formData.payment_date || ''}
                              onChange={handleInputChange}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>

                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reference ID</label>
                          <input
                            type="text"
                            name="reference_id"
                            value={formData.reference_id || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                          />
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
                                    ₹ {payment.paid_amount || "N/A"}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Discount</p>
                                  <p className="font-medium text-gray-800">
                                    ₹ {payment.discount || 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Payment Date</p>
                                  <p className="font-medium text-gray-800">
                                    {/* {payment.payment_date || 'N/A'} */}
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
                                {/* <button
                                  type="button"
                                  onClick={() => handleRemove(payment.id)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Remove
                                </button> */}
                              </div>
                            </div>
                          ))
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "transaction" && (
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