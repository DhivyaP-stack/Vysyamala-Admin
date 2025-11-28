import React, { useEffect, useMemo, useState } from "react";
import { apiAxios } from "../../../../api/apiUrl";
import { NotifyError, NotifySuccess } from "../../../../common/Toast/ToastMessage";

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

// const MAIN_PACKAGES = [
//   { key: "Gold", label: "Gold", price: 4900, fixed: true, category: "new" },
//   { key: "Platinum", label: "Platinum", price: 7900, fixed: true, category: "new" },
//   { key: "PlatinumPrivate", label: "Platinum Private", price: 9900, fixed: true, category: "new" },
//   { key: "VysyamalaDelight", label: "Vysyamala Delight", price: null, fixed: false, category: "new" }, // custom
//   { key: "Mini10", label: "Mini10", price: 2000, fixed: true, category: "new" },
//   { key: "Mini20", label: "Mini20", price: 3000, fixed: true, category: "new" },
//   { key: "Mini30", label: "Mini30", price: 4000, fixed: true, category: "new" },
//   // --- Renewals ---
//   { key: "RenewalGold", label: "Renewal - Gold", price: 2000, fixed: true, category: "renewal" },
//   { key: "RenewalPlatinum", label: "Renewal - Platinum", price: 3000, fixed: true, category: "renewal" },
//   { key: "RenewalPlatinumPrivate", label: "Renewal - Platinum Private", price: 4000, fixed: true, category: "renewal" },
//   { key: "RenewalVysyamalaDelight", label: "Renewal - Vysyamala Delight", price: null, fixed: false, category: "renewal" }, // custom
//   { key: "Upgrade", label: "Upgrade", price: null, fixed: false, category: "new" }, // custom
//   { key: "Others", label: "Others", price: null, fixed: false, category: "new" }, // custom
// ];

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
  payment_date: string;
  gpay_no?: string | null;
  status: number;
  payment_id?: string | null;
  payment_for?: string;
  discount?: string;
  reference_id: string;
  // Add the new fields
  plan_id: number | null;
  addon_package: string | null;
  validity_startdate: string | null;
  validity_enddate: string | null;
  payment_by: string | null;
  admin_user: string | null;
  order_id: string | null;
  trans_id: string | null;
  offer: string | null;
  notes: string | null;
  package_amount: string | null;
  is_sent_email: boolean; // Add this field
}

interface AddonPackage {
  package_id: number;
  name: string;
  description: string;
  amount: number;
}

interface AddonApiResponse {
  status: string;
  message: string;
  data: AddonPackage[];
}

interface Plan {
  id: number;
  plan_name: string;
  plan_price: string;
}

interface PlansApiResponse {
  status: string;
  data: Plan[];
}

const PaymentPopup: React.FC<PaymentPopupProps> = ({ open, onClose, profileId, showAddButton = true }) => {
  const [activeTab, setActiveTab] = useState<"payment" | "transaction">("payment");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionLoading, setTransactionLoading] = useState(false);
  const [mainPackage, setMainPackage] = useState("");
  console.log("mainPackage", mainPackage)
  const [mainAmount, setMainAmount] = useState(0); // auto for fixed, editable for custom
  const [selectedAddons, setSelectedAddons] = useState<Record<number, boolean>>({}); // {key: true|false}
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
  const [addons, setAddons] = useState<AddonPackage[]>([]);
  const [addonsLoading, setAddonsLoading] = useState(false);
  // Small toggle filter for Main Packages
  const [mainPackages, setMainPackages] = useState<Array<{
    key: string;
    label: string;
    price: number | null;
    fixed: boolean;
    category: string;
    id: number;
  }>>([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [packageFilter, setPackageFilter] = useState(""); // all | new | renewal
  const RoleID = localStorage.getItem('role_id');
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null); // Add this line
  const [sendingEmail, setSendingEmail] = useState<number | null>(null);
  const adminUserID = sessionStorage.getItem('id') || localStorage.getItem('id');

  const filteredMainPackages = useMemo(() => {
    if (packageFilter === "") return mainPackages;
    return mainPackages.filter((p) => p.category === packageFilter);
  }, [packageFilter, mainPackages]);

  const addonsTotal = useMemo(() => {
    return addons.reduce((sum, addon) => {
      return selectedAddons[addon.package_id] ? sum + addon.amount : sum;
    }, 0);
  }, [selectedAddons, addons]);

  const subtotal = useMemo(() => currencyToNumber(mainAmount) + addonsTotal, [mainAmount, addonsTotal]);

  const safeDiscount = useMemo(() => {
    const d = currencyToNumber(discount);
    return Math.max(0, Math.min(d, subtotal));
  }, [discount, subtotal]);

  const netAmount = useMemo(() => subtotal - safeDiscount, [subtotal, safeDiscount]);

  function needsRefId(type: string) {
    return type === "RazorPay" || type === "OnlineGpay" || type === "ManualGpay";
  }
  function needsGpayNo(type: string) {
    return type === "ManualGpay";
  }

  function validate() {
    const e: Record<string, string> = {};
    // if (!mainPackage) {
    //   e.mainPackage = "Main package must be selected.";
    // }
    if (needsGpayNo(paymentType)) {
      const gpayStr = String(gpayNumber).trim();
      if (!gpayStr) {
        e.gpayNumber = "GPay number is required for Manual GPay.";
      } else if (gpayStr.length !== 10) {
        e.gpayNumber = "GPay number must be exactly 10 digits.";
      }
    }
    if (needsRefId(paymentType) && !String(referenceId).trim()) {
      e.referenceId = "Reference ID is required for the selected payment type.";
    }
    // if (validFrom && validTo && validTo < validFrom) {
    //   e.validity = "To date cannot be earlier than From date.";
    // }
    // if (!paymentType) {
    //   e.paymentType = "Payment type is required.";
    // }
    if (!paymentDate) {
      e.paymentDate = "Payment date is required."; // Added validation
    }
    // if (!paymentStatus) {
    //   e.paymentStatus = "Payment status is required.";
    // }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onChangeMainPackage(key: React.SetStateAction<string>) {
    setMainPackage(key);
    const pkg = mainPackages.find((p) => p.key === key);
    if (!pkg) {
      setMainAmount(0);
      setSelectedPlanId(null); // Reset plan ID
      return;
    }
    if (pkg.fixed && typeof pkg.price === "number") {
      setMainAmount(pkg.price);
    } else {
      // Custom amount for non-fixed packages
      setMainAmount(0);
    }
    setSelectedPlanId(pkg.id); // Set the plan ID from the selected package
  }

  function onToggleAddon(packageId: number) {
    setSelectedAddons((prev) => ({
      ...prev,
      [packageId]: !prev[packageId]
    }));
  }

  const fetchAddonPackages = async () => {
    try {
      setAddonsLoading(true);
      const response = await apiAxios.post<AddonApiResponse>(
        "https://app.vysyamala.com/auth/Get_addon_packages/",
        {} // empty payload if required, or add any required parameters
      );

      if (response.data.status === "success") {
        setAddons(response.data.data);
      } else {
        NotifyError("Failed to fetch addon packages");
        console.error("Addon packages API error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching addon packages:", error);
      NotifyError("Error loading addon packages");
    } finally {
      setAddonsLoading(false);
    }
  };

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
    setPaymentStatus("Success");
    setSelectedPlanId(null); // Reset plan ID
    setPackageFilter("");
    setErrors({});
  }

  const handleEdit = (payment: PaymentDetail) => {
    setIsEditing(payment.id);

    // Try to find package, default to 'Others'
    const pkg = mainPackages.find((p) => p.id === payment.plan_id);
    setMainPackage(pkg ? pkg.key : "Others");
    setSelectedPlanId(pkg ? pkg.id : null); // Set plan ID for editing
    // We can't know the original mainAmount vs addons, so we set netAmount
    // and discount. This will mean subtotal is correct.
    const savedDiscount = currencyToNumber(payment.discount);
    //const savedPaidAmount = currencyToNumber(payment.paid_amount);

    setMainAmount(currencyToNumber(payment.package_amount));

    // Parse addon_package from existing payment data
    const addonIds = payment.addon_package ? payment.addon_package.split(',').map(id => parseInt(id.trim())) : [];
    const addonSelection: Record<number, boolean> = {};
    addonIds.forEach(id => {
      addonSelection[id] = true;
    });
    setSelectedAddons(addonSelection);

    setDiscount(savedDiscount);

    setValidFrom(payment.validity_startdate ? payment.validity_startdate.split('T')[0] : "");
    setValidTo(payment.validity_enddate ? payment.validity_enddate.split('T')[0] : "");
    setOfferAny(payment.offer || "");
    setHintToSave(payment.notes || "");

    setPaymentType(payment.payment_mode || "");
    setPaymentDate(payment.payment_date ? payment.payment_date.split('T')[0] : "");
    setGpayNumber(payment.gpay_no || "");
    setReferenceId(payment.reference_id || "");
    setPaymentStatus(payment.status === 1 ? "Success" : "Failure");
  };


  const handleAddNew = () => {
    resetForm();
    setIsAdding(true);
  };

  const handleSave = async () => {
    if (!validate()) {
      NotifyError("Please fill all required fields");
      return;
    }

    try {
      // Build the 'payment_for' string
      // const mainPackageLabel = MAIN_PACKAGES.find((p) => p.key === mainPackage)?.label || "Unknown Package";

      // // Get selected addon names for payment_for description
      // const selectedAddonNames = addons
      //   .filter(addon => selectedAddons[addon.package_id])
      //   .map(addon => addon.name)
      //   .join(", ");

      // const paymentForString = selectedAddonNames
      //   ? `${mainPackageLabel} + ${selectedAddonNames}`
      //   : mainPackageLabel;

      // Build addon_package string as comma-separated IDs
      const selectedAddonIds = addons
        .filter(addon => selectedAddons[addon.package_id])
        .map(addon => addon.package_id)
        .join(",");

      // Calculate package_amount (main amount without addons)
      const packageAmount = mainAmount;

      // Build the complete payload
      const payload = {
        profile_id: profileId,
        admin_user_id: adminUserID,
        plan_id: selectedPlanId, // You may need to map mainPackage to actual plan_id
        addon_package: selectedAddonIds || null, // Comma-separated IDs like "1,2,3"
        paid_amount: netAmount.toString(),
        discount: safeDiscount.toString(),
        payment_mode: paymentType,
        // payment_for: paymentForString,
        payment_for: "",
        status: paymentStatus === "Success" ? 1 : 0,
        payment_date: paymentDate,
        validity_startdate: validFrom || null,
        validity_enddate: validTo || null,
        payment_by: profileId, // Assuming profile_id is also the payer
        admin_user: RoleID, // You may need to get this from auth context
        // order_id: referenceId || null,
        // payment_id: referenceId || null,
        gpay_no: gpayNumber || null,
        // trans_id: referenceId || null,
        offer: offerAny || null,
        notes: hintToSave || null,
        package_amount: packageAmount.toString()
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

    } catch (error: any) {
      console.error("Error saving payment:", error);
      NotifyError("Failed to save payment. Please try again.");
    }
  };


  const handleCancel = () => {
    resetForm();
    setIsEditing(null);
    setIsAdding(false);
  };

  const handleInvoice = (payment: PaymentDetail) => {
    if (!payment.id) {
      NotifyError("Payment ID is required");
      return;
    }

    // Construct the invoice URL with the subscription_id
    const invoiceUrl = `https://app.vysyamala.com/api/generate-invoice/?subscription_id=${payment.id}&admin_user_id=${adminUserID}`;

    // Open the invoice in a new tab
    window.open(invoiceUrl, '_blank', 'noopener,noreferrer');

    //NotifySuccess("Opening invoice in new tab...");
    console.log("Opening invoice in new tab...");
  };

  const handleSend = async (payment: PaymentDetail) => {
    if (!payment.id) {
      NotifyError("Payment ID is required to send invoice");
      return;
    }
    setSendingEmail(payment.id); // Set loading state
    try {
      const response = await apiAxios.get(
        `https://app.vysyamala.com/api/send-invoice/?subscription_id=${payment.id}`, {
        params: {
          // subscription_id: payment.id,
          admin_user_id: adminUserID       // 👈 Added here
        }
      }
      );

      if (response.data.success) {
        NotifySuccess(response.data.success || "Email sent successfully!");
        fetchPaymentDetails();
      } else {
        NotifyError("Failed to send email");
        console.error("Send Email API error:", response.data);
      }
    } catch (error: any) {
      console.error("Error sending email:", error);

      // Handle the specific "Recipient email not found" error
      if (error.response?.data?.error === "Recipient email not found") {
        NotifyError("Recipient email not found. Please check if the user has a valid email address.");
      } else if (error.response?.data?.error) {
        // Display any other error message from the API
        NotifyError(error.response.data.error);
      } else if (error.response?.data?.message) {
        NotifyError(error.response.data.message);
      } else {
        NotifyError("Failed to send invoice email. Please try again.");
      }
    } finally {
      setSendingEmail(null); // Clear loading state
    }
  };

  const fetchMainPackages = async (type: string = "") => {
    try {
      setPackagesLoading(true);
      const response = await apiAxios.post<PlansApiResponse>(
        "https://app.vysyamala.com/api/renewal-plan/",
        { type } // Send type as empty string for "all", "renewal", or "new"
      );

      if (response.data.status === "success") {
        // Transform API data to match your existing structure
        const transformedPackages = response.data.data.map(plan => ({
          key: plan.plan_name.replace(/\s+/g, ''), // Remove spaces for key
          label: plan.plan_name,
          price: parseFloat(plan.plan_price),
          fixed: true, // Assuming all from API are fixed prices
          category: type || "", // Use provided type or default to "new"
          id: plan.id
        }));

        setMainPackages(transformedPackages);
      } else {
        NotifyError("Failed to fetch packages");
        console.error("Packages API error:", response.data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
      NotifyError("Error loading packages");
      // Fallback to empty array
      setMainPackages([]);
    } finally {
      setPackagesLoading(false);
    }
  };

  const handleApprove = async (transactionId: number, paymentFor: string = "") => {
    try {
      const payload = {
        transaction_id: transactionId.toString(),
        action: "accept",
        payment_for: paymentFor,
        admin_user_id: adminUserID
      };

      const response = await apiAxios.post(
        "/api/process-transaction/",
        payload
      );

      if (response.data.status === "success") {
        NotifySuccess(response.data.message || "Transaction approving successfully");
        await fetchTransactions();
      } else {
        NotifyError(response.data.message || "Failed to approving transaction");
      }
    } catch (error) {
      console.error("Error approving transaction:", error);
      NotifyError("Failed to approve transaction. Please try again.");
    }
  };

  const handleDeny = async (transactionId: number, paymentFor: string = "") => {
    try {
      const payload = {
        transaction_id: transactionId.toString(),
        action: "reject",
        payment_for: paymentFor,
        admin_user_id: adminUserID
      };

      const response = await apiAxios.post(
        "/api/process-transaction/",
        payload
      );

      if (response.data.status === "success") {
        NotifySuccess(response.data.message || "Transaction rejected successfully");
        await fetchTransactions();
      } else {
        NotifyError(response.data.message || "Failed to reject transaction");
      }
    } catch (error) {
      console.error("Error rejecting transaction:", error);
      NotifyError("Failed to reject transaction. Please try again.");
    }
  };

  useEffect(() => {
    if (open && profileId) {
      fetchPaymentDetails();
      fetchAddonPackages();
      fetchMainPackages("");
      if (activeTab === "transaction") {
        fetchTransactions();
      }
    }
  }, [open, profileId]);

  useEffect(() => {
    if (open) {
      const type = packageFilter === "" ? "" : packageFilter;
      fetchMainPackages(type);
    }
  }, [packageFilter, open]);

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
        `/api/subscriptions/?profile_id=${profileId}`, {
        params: {
          admin_user_id: adminUserID,
        },
      });
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
        `/api/payment-transactions/?profile_id=${profileId}`, {
        params: {
          admin_user_id: adminUserID
        }
      });
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

  const handleChangePackageFilter = (newFilter: "" | "new" | "renewal") => {
    setPackageFilter(newFilter); // Set the filter
    setMainPackage("");       // Reset selected package
    setMainAmount(0);         // Reset package amount
    setSelectedPlanId(null);  // Reset selected plan ID
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-[900px] rounded-lg shadow-lg p-5 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 capitalize">
          <h2 className="text-lg justify-items-center font-semibold">Payment Information</h2>
          <button
            // onClick={() => {
            //   setIsAdding(false);
            //   setIsEditing(null);
            //   onClose();
            // }}
            onClick={() => {
              if (isEditing || isAdding) {
                handleCancel(); // Reset form state if editing/adding
                onClose();
              }
              onClose(); // Always close the popup
            }}
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
                    {isEditing || isAdding ? (
                      <div className="border border-gray rounded-lg p-4 bg-gray-50">
                        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                          <h1 className="text-2xl font-semibold tracking-tight">
                            {isEditing ? 'Edit Payment' : 'Add New Payment'}
                          </h1>
                          <p className="mt-1 text-sm text-neutral-500">Fill package selections, add-ons, discount, validity, and notes.</p>

                          {/* Main Package */}
                          <section className="mt-6 grid gap-4 rounded-xl border border-gray p-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between">
                                <label htmlFor="mainPackage" className="text-sm font-medium">Package Name <span className="text-neutral-400">(Main Package)</span></label>

                                <div role="tablist" aria-label="Filter packages" className="inline-flex items-center gap-1 rounded-full border bg-white p-0.5 text-xs">
                                  <button
                                    type="button"
                                    onClick={() => handleChangePackageFilter("")}
                                    className={`rounded-full px-2 py-1 ${packageFilter === "" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
                                  >
                                    All
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleChangePackageFilter("new")}
                                    className={`rounded-full px-2 py-1 ${packageFilter === "new" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
                                  >
                                    New
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleChangePackageFilter("renewal")}
                                    className={`rounded-full px-2 py-1 ${packageFilter === "renewal" ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"}`}
                                  >
                                    Renewal
                                  </button>
                                </div>
                              </div>
                              {packagesLoading ? (
                                <div className="text-center py-2">Loading packages...</div>
                              ) : (
                                <select
                                  id="mainPackage"
                                  name="mainPackage"
                                  value={mainPackage}
                                  onChange={(e) => onChangeMainPackage(e.target.value)}
                                  className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                >
                                  <option value="">Select a package</option>
                                  {filteredMainPackages.map((p) => (
                                    <option key={p.key} value={p.key}>
                                      {/* {p.label} - {INR.format(p.price || 0)} */}
                                      {p.label}
                                    </option>
                                  ))}
                                  {/* Add custom packages that might not come from API */}
                                  {/* <option value="VysyamalaDelight">Vysyamala Delight (Custom)</option>
                                  <option value="Upgrade">Upgrade (Custom)</option>
                                  <option value="Others">Others (Custom)</option> */}
                                </select>
                              )}
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
                                // disabled={MAIN_PACKAGES.find(p => p.key === mainPackage)?.fixed}
                                />
                              </div>
                              <p className="text-xs text-neutral-500">
                                Fixed prices: Gold ₹4900, Platinum ₹7900, Platinum Private ₹9900, Mini10 ₹2000, Mini20 ₹3000, Mini30 ₹4000, Renewal - Gold ₹2000, Renewal - Platinum ₹3000, Renewal - Platinum Private ₹4000. Custom for Delight/Upgrade/Others and Renewal - Vysyamala Delight.
                              </p>
                            </div>
                          </section>

                          {/* Add-ons */}
                          <section className="mt-6 rounded-xl border border-gray p-4">
                            <p className="text-sm font-medium">Another Package Name <span className="text-neutral-400">(Add‑ons)</span></p>

                            {addonsLoading ? (
                              <div className="text-center py-4">Loading addon packages...</div>
                            ) : (
                              <div className="mt-3 grid gap-3 md:grid-cols-2">
                                {addons.map((addon) => {
                                  return (
                                    <label key={addon.package_id} className="flex cursor-pointer items-start gap-3 rounded-xl border p-3 hover:bg-neutral-50">
                                      <input
                                        type="checkbox"
                                        id={`addon_${addon.package_id}`}
                                        name="addons"
                                        checked={!!selectedAddons[addon.package_id]}
                                        onChange={() => onToggleAddon(addon.package_id)}
                                        className="mt-1"
                                      />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <span className="font-medium">{addon.name}</span>
                                          <span className="text-sm text-neutral-600">{INR.format(addon.amount)}</span>
                                        </div>
                                        <p className="text-xs text-neutral-500">{addon.description}</p>
                                      </div>
                                    </label>
                                  );
                                })}
                              </div>
                            )}
                          </section>

                          {/* Pricing Summary */}
                          <section className="mt-6 grid gap-4 rounded-xl border border-gray p-4 md:grid-cols-2">
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
                          <section className="mt-6 grid gap-4 rounded-xl border border-gray p-4 md:grid-cols-2">
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
                          <section className="mt-6 grid gap-4 rounded-xl border border-gray p-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="paymentType" className="text-sm font-medium">Payment Type</label>
                              <select
                                id="paymentType"
                                name="paymentType"
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                              >
                                <option value="">Select payment type</option>
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
                                    // onChange={(e) => setGpayNumber(e.target.value)}
                                    onChange={(e) => {
                                      const numericValue = e.target.value.replace(/[^0-9]/g, "");
                                      setGpayNumber(numericValue.slice(0, 15));
                                      if (errors.gpayNumber) {
                                        setErrors(prev => {
                                          const newErrors = { ...prev };
                                          delete newErrors.gpayNumber;
                                          return newErrors;
                                        });
                                      }
                                    }}
                                    maxLength={15}
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
                                //onChange={(e) => setReferenceId(e.target.value)}
                                onChange={(e) => {
                                  setReferenceId(e.target.value);
                                  if (errors.referenceId) {
                                    setErrors(prev => {
                                      const newErrors = { ...prev };
                                      delete newErrors.referenceId;
                                      return newErrors;
                                    });
                                  }
                                }}
                                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5"
                                placeholder="UTR / Razorpay ID / Txn Ref"
                              />
                              {errors?.referenceId && (
                                <p className="mt-1 text-xs text-red-600">{errors.referenceId}</p>
                              )}
                            </div>

                            {/* == ADDED PAYMENT DATE FIELD == */}
                            <div className="flex flex-col gap-2">
                              <label htmlFor="paymentDate" className="text-sm font-medium">Payment Date <span className="text-red-500">*</span></label>
                              <input
                                id="paymentDate"
                                name="paymentDate"
                                type="date"
                                value={paymentDate}
                                // onChange={(e) => setPaymentDate(e.target.value)}
                                onChange={(e) => {
                                  setPaymentDate(e.target.value);
                                  if (errors.paymentDate) {
                                    setErrors(prev => {
                                      const newErrors = { ...prev };
                                      delete newErrors.paymentDate;
                                      return newErrors;
                                    });
                                  }
                                }}
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
                                <option value="">Select status</option>
                                <option value="Success">Success</option>
                                <option value="Failure">Failure</option>
                              </select>
                              {errors.paymentStatus && (
                                <p className="mt-1 text-xs text-red-600">{errors.paymentStatus}</p>
                              )}
                            </div>
                          </section>

                          {/* Offer & Hints */}
                          <section className="mt-6 grid gap-4 rounded-xl border  border-gray p-4 md:grid-cols-2">
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
                              {/* {showAddButton && !(isAdding || isEditing) && ( */}
                              {isAdding && (
                                <button
                                  type="button"
                                  onClick={resetForm} // Kept reset logic
                                  className="rounded-2xl border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                                >
                                  Reset
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={handleSave} // Wired to new handleSave
                                className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90"
                              >
                                Save
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
                              <div className="flex space-x-3">
                                {/* {showAddButton && !(isAdding || isEditing) && ( */}
                                <button
                                  type="button"
                                  onClick={() => handleEdit(payment)}
                                  disabled={payment.is_sent_email}
                                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm transition ${payment.is_sent_email
                                    ? 'bg-[#A4A7AE] text-black cursor-not-allowed opacity-70'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                  Edit
                                </button>
                                {/* )} */}
                                <button
                                  type="button"
                                  onClick={() => handleInvoice(payment)}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-emerald-600 transition"
                                >
                                  {/* <FaFileInvoice className="text-white" size={14} /> */}
                                  Invoice
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleSend(payment)}
                                  disabled={sendingEmail === payment.id}
                                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm transition ${sendingEmail === payment.id
                                    ? 'bg-indigo-400 cursor-not-allowed'
                                    : 'bg-indigo-500 hover:bg-indigo-600'
                                    } text-white`}
                                >
                                  {sendingEmail === payment.id ? (
                                    <>
                                      {/* Loading spinner */}
                                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                      </svg>
                                      Sending Email...
                                    </>
                                  ) : (
                                    <>
                                      {/* <FaPaperPlane className="text-white" size={13} /> */}
                                      Send Email
                                    </>
                                  )}
                                </button>
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
                                {/* <button
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
                                </button> */}
                                {transaction.status === "1" ? (
                                  <div className="flex gap-2 justify-center">
                                    <button
                                      type="button"
                                      onClick={() => handleApprove(transaction.id)}
                                      className="px-4 py-1 text-xs font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeny(transaction.id)}
                                      className="px-4 py-1 text-xs font-semibold rounded-md border border-red-600 text-red-600 hover:bg-red-50 shadow-sm"
                                    >
                                      Deny
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-500 text-center">No actions available</span>
                                )}

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
    </div >
  );
};

export default PaymentPopup;