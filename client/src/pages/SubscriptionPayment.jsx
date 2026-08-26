import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function SubscriptionPayment() {
    const location = useLocation();
    const navigate = useNavigate();

    const { refreshSubscription } = useContext(AuthContext);

    const order = location.state?.order;

    const [loading, setLoading] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState("");

    const RAZORPAY_KEY_ID =
        import.meta.env.VITE_RAZORPAY_KEY_ID;

    // ======================================================
    // LOAD RAZORPAY CHECKOUT
    // ======================================================

    useEffect(() => {
        if (window.Razorpay) {
            return;
        }

        const script = document.createElement("script");

        script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        script.onload = () => {
            console.log("✅ Razorpay Checkout loaded");
        };

        script.onerror = () => {
            console.error(
                "❌ Failed to load Razorpay Checkout"
            );

            setError(
                "Unable to load Razorpay. Please refresh the page."
            );
        };

        document.body.appendChild(script);

        return () => {
            // Don't remove the script here because
            // Razorpay may still be needed after navigation.
        };
    }, []);

    // ======================================================
    // NO ORDER
    // ======================================================

    if (!order) {
        return (
            <main className="min-h-screen bg-orange-50 flex items-center justify-center px-4">

                <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">

                    <h1 className="text-2xl font-bold text-gray-800">
                        No payment order found
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Please select a subscription plan first.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/subscription")
                        }
                        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Back to Plans
                    </button>

                </div>

            </main>
        );
    }

    // ======================================================
    // HANDLE PAYMENT
    // ======================================================

    const handlePayment = async () => {
        try {
            setLoading(true);
            setError("");

            // --------------------------------------------------
            // CHECK RAZORPAY KEY
            // --------------------------------------------------

            if (!RAZORPAY_KEY_ID) {
                setError(
                    "Razorpay Key ID is missing. Please check VITE_RAZORPAY_KEY_ID."
                );

                setLoading(false);
                return;
            }

            // --------------------------------------------------
            // CHECK RAZORPAY SCRIPT
            // --------------------------------------------------

            if (!window.Razorpay) {
                setError(
                    "Razorpay Checkout is not loaded. Please refresh the page and try again."
                );

                setLoading(false);
                return;
            }

            // --------------------------------------------------
            // CHECK RAZORPAY ORDER ID
            // --------------------------------------------------

            if (!order.razorpayOrderId) {
                setError(
                    "Razorpay Order ID is missing."
                );

                setLoading(false);
                return;
            }

            console.log(
                "Opening Razorpay Checkout..."
            );

            console.log(
                "Razorpay Order ID:",
                order.razorpayOrderId
            );

            // ==================================================
            // RAZORPAY OPTIONS
            // ==================================================

            const options = {
                key: RAZORPAY_KEY_ID,

                amount:
                    Number(order.amount) * 100,

                currency:
                    order.currency || "INR",

                name: "Cook Book",

                description:
                    "Read + Watch Subscription - 30 Days",

                order_id:
                    order.razorpayOrderId,

                notes: {
                    subscriptionOrderId:
                        order.orderId,

                    plan: "read_watch",
                },

                theme: {
                    color: "#f97316",
                },

                // ==================================================
                // SUCCESS HANDLER
                // ==================================================

                handler: async function (response) {

                    console.log(
                        "========== RAZORPAY SUCCESS RESPONSE =========="
                    );

                    console.log(
                        "Payment ID:",
                        response.razorpay_payment_id
                    );

                    console.log(
                        "Order ID:",
                        response.razorpay_order_id
                    );

                    console.log(
                        "Signature:",
                        response.razorpay_signature
                    );

                    console.log(
                        "==============================================="
                    );

                    try {

                        // ------------------------------------------
                        // VALIDATE RAZORPAY RESPONSE
                        // ------------------------------------------

                        if (
                            !response.razorpay_payment_id ||
                            !response.razorpay_order_id ||
                            !response.razorpay_signature
                        ) {
                            setError(
                                "Razorpay did not return complete payment details."
                            );

                            setLoading(false);

                            return;
                        }

                        // ------------------------------------------
                        // SEND PAYMENT DETAILS TO BACKEND
                        // ------------------------------------------

                        const verificationResponse =
                            await API.patch(
                                "/subscription/payment",
                                {
                                    razorpay_payment_id:
                                        response.razorpay_payment_id,

                                    razorpay_order_id:
                                        response.razorpay_order_id,

                                    razorpay_signature:
                                        response.razorpay_signature,

                                    orderId:
                                        order.orderId,
                                }
                            );

                        console.log(
                            "PAYMENT VERIFICATION RESPONSE:",
                            verificationResponse.data
                        );

                        // ------------------------------------------
                        // PAYMENT VERIFIED
                        // ------------------------------------------

                        if (
                            verificationResponse.data
                                .success
                        ) {

                            console.log(
                                "✅ Payment verified successfully"
                            );

                            // Refresh AuthContext subscription
                            await refreshSubscription();

                            // Show payment success
                            setTransactionId(
                                response.razorpay_payment_id
                            );

                            setError("");

                        } else {

                            setError(
                                verificationResponse.data
                                    .message ||
                                    "Payment verification failed."
                            );
                        }

                    } catch (error) {

                        console.error(
                            "❌ Payment verification error:",
                            error
                        );

                        setError(
                            error.response?.data
                                ?.message ||
                                "Payment verification failed. Please try again."
                        );

                    } finally {

                        setLoading(false);
                    }
                },

                // ==================================================
                // PAYMENT MODAL CLOSED
                // ==================================================

                modal: {

                    ondismiss: function () {

                        console.log(
                            "Razorpay Checkout closed."
                        );

                        setLoading(false);
                    },

                },

            };

            // ==================================================
            // CREATE RAZORPAY INSTANCE
            // ==================================================

            const razorpay =
                new window.Razorpay(options);

            // ==================================================
            // PAYMENT FAILED
            // ==================================================

            razorpay.on(
                "payment.failed",
                function (response) {

                    console.error(
                        "❌ Razorpay payment failed:",
                        response
                    );

                    setError(
                        response.error?.description ||
                            "Payment failed. Please try again."
                    );

                    setLoading(false);
                }
            );

            // ==================================================
            // OPEN CHECKOUT
            // ==================================================

            razorpay.open();

        } catch (error) {

            console.error(
                "❌ Razorpay checkout error:",
                error
            );

            setError(
                error.message ||
                    "Unable to start payment."
            );

            setLoading(false);
        }
    };

    // ======================================================
    // UI
    // ======================================================

    return (
        <main className="min-h-screen bg-orange-50 px-4 py-12">

            <div className="max-w-md mx-auto">

                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="text-center mb-8">

                    <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
                        Cook Book Premium
                    </p>

                    <h1 className="text-4xl font-bold text-gray-800 mt-2">
                        Payment
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Secure payment powered by Razorpay
                    </p>

                </div>


                {/* ==================================================
                    PAYMENT CARD
                ================================================== */}

                <div className="bg-white rounded-2xl shadow-xl p-8">

                    {/* ==================================================
                        PLAN
                    ================================================== */}

                    <div className="text-center mb-8">

                        <div className="text-5xl mb-4">
                            👑
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800">
                            Read + Watch
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Complete recipes + video tutorials
                        </p>

                    </div>


                    {/* ==================================================
                        ORDER DETAILS
                    ================================================== */}

                    <div className="border rounded-xl p-5 space-y-5">

                        <div>

                            <p className="text-sm text-gray-500">
                                Order ID
                            </p>

                            <p className="font-semibold break-all">
                                {order.orderId}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">
                                Razorpay Order ID
                            </p>

                            <p className="font-semibold text-sm break-all">
                                {order.razorpayOrderId}
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">
                                Plan
                            </p>

                            <p className="font-semibold">
                                Read + Watch
                            </p>

                        </div>


                        <div>

                            <p className="text-sm text-gray-500">
                                Duration
                            </p>

                            <p className="font-semibold">
                                30 Days
                            </p>

                        </div>


                        <div className="border-t pt-4 flex justify-between items-center">

                            <span className="font-semibold">
                                Total
                            </span>

                            <span className="text-3xl font-bold text-orange-500">
                                ₹{order.amount}
                            </span>

                        </div>

                    </div>


                    {/* ==================================================
                        TEST MODE NOTICE
                    ================================================== */}

                    <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4">

                        <p className="text-sm text-blue-700">

                            <strong>Test Mode:</strong>{" "}
                            This is a Razorpay test payment.
                            No real money will be charged.

                        </p>

                    </div>


                    {/* ==================================================
                        ERROR
                    ================================================== */}

                    {error && (

                        <div className="mt-5 bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg">

                            <p className="font-medium">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* ==================================================
                        SUCCESS
                    ================================================== */}

                    {transactionId ? (

                        <div className="mt-6">

                            <div className="bg-green-50 border border-green-200 rounded-xl p-5">

                                <div className="text-center">

                                    <div className="text-5xl">
                                        ✅
                                    </div>

                                    <h3 className="text-xl font-bold text-green-700 mt-3">
                                        Payment Successful!
                                    </h3>

                                    <p className="text-gray-600 mt-2">
                                        Your Read + Watch subscription
                                        is now active.
                                    </p>

                                </div>


                                <div className="mt-5 border rounded-lg bg-white p-4">

                                    <p className="text-sm text-gray-500">
                                        Razorpay Payment ID
                                    </p>

                                    <p className="font-semibold break-all">
                                        {transactionId}
                                    </p>

                                </div>

                            </div>


                            <button
                                onClick={() =>
                                    navigate("/recipes")
                                }
                                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                            >
                                Start Watching Recipes
                            </button>

                        </div>

                    ) : (

                        /* ==================================================
                           PAY BUTTON
                        ================================================== */

                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full mt-7 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
                        >

                            {loading
                                ? "Opening Razorpay..."
                                : `Pay ₹${order.amount}`}

                        </button>

                    )}


                    {/* ==================================================
                        BACK BUTTON
                    ================================================== */}

                    {!transactionId && (

                        <button
                            onClick={() =>
                                navigate("/subscription")
                            }
                            disabled={loading}
                            className="w-full mt-3 text-gray-500 hover:text-gray-700 py-2 disabled:opacity-50"
                        >
                            ← Back to Plans
                        </button>

                    )}

                </div>

            </div>

        </main>
    );
}

export default SubscriptionPayment;