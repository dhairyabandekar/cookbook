import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function SubscriptionPayment() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");

  if (!order) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            No payment order found
          </h1>

          <p className="text-gray-500 mt-2">
            Please select a subscription plan first.
          </p>

          <button
            onClick={() => navigate("/subscription")}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Plans
          </button>
        </div>
      </main>
    );
  }

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const generatedTransactionId =
        "TXN-" + Date.now();

      const response = await API.patch(
        "/subscription/payment",
        {
          transactionId: generatedTransactionId,
          orderId: order.orderId,
        }
      );

      if (response.data.success) {
        setTransactionId(generatedTransactionId);
      }
    } catch (error) {
      console.error(
        "Subscription payment error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-12">

      <div className="max-w-md mx-auto">

        {/* HEADER */}

        <div className="text-center mb-8">

          <p className="text-orange-500 font-semibold uppercase tracking-wider text-sm">
            Cook Book Premium
          </p>

          <h1 className="text-4xl font-bold text-gray-800 mt-2">
            Payment
          </h1>

        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* PLAN */}

          <div className="text-center mb-8">

            <div className="text-5xl mb-4">
              👑
            </div>

            <h2 className="text-2xl font-bold">
              Read + Watch
            </h2>

            <p className="text-gray-500 mt-2">
              Complete recipes + video tutorials
            </p>

          </div>

          {/* ORDER DETAILS */}

          <div className="border rounded-xl p-5 space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <p className="font-semibold">
                {order.orderId}
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

          {/* ERROR */}

          {error && (
            <div className="mt-5 bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* SUCCESS */}

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
                    Your Read + Watch subscription is now
                    active.
                  </p>

                </div>

                <div className="mt-5 border rounded-lg bg-white p-4">

                  <p className="text-sm text-gray-500">
                    Transaction ID
                  </p>

                  <p className="font-semibold break-all">
                    {transactionId}
                  </p>

                </div>

              </div>

              <button
                onClick={() => navigate("/recipes")}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
              >
                Start Watching Recipes
              </button>

            </div>
          ) : (

            /* PAY BUTTON */

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-7 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading
                ? "Processing..."
                : `Pay ₹${order.amount}`}
            </button>

          )}

          <button
            onClick={() => navigate("/subscription")}
            className="w-full mt-3 text-gray-500 hover:text-gray-700 py-2"
          >
            ← Back to Plans
          </button>

        </div>

      </div>

    </main>
  );
}

export default SubscriptionPayment;