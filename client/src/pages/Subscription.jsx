import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { activateFreePlan } from "../services/subscription.service";
import API from "../api/axios";

function Subscription() {
  const navigate = useNavigate();
  const { user, refreshSubscription } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ======================================================
  // FREE PLAN
  // ======================================================

  const handleFreePlan = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await activateFreePlan();

      if (response.success) {
        await refreshSubscription();
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Free subscription error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to activate free plan."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // PAID PLAN
  // ======================================================

  const handlePaidPlan = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.post(
        "/subscription/order"
      );

      console.log(
        "SUBSCRIPTION ORDER:",
        response.data
      );

      if (response.data.success) {
        navigate("/subscription-payment", {
          state: {
            order: response.data.order,
          },
        });
      }

    } catch (error) {
      console.error(
        "Subscription order error:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Unable to create subscription order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-12">

      <div className="max-w-6xl mx-auto">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="text-center mb-12">

          <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            Cook Book Premium
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2">
            Choose Your Plan
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Get complete access to delicious recipes and
            unlock video tutorials with our premium plan.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="max-w-md mx-auto mb-8 bg-red-100 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* ==================================================
            PLANS
        ================================================== */}

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* ==================================================
              FREE PLAN
          ================================================== */}

          <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-8 flex flex-col">

            <div className="text-center">

              <div className="text-5xl mb-4">
                🥕
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Read Recipe
              </h2>

              <p className="text-gray-500 mt-2">
                Everything you need to cook
              </p>

              <div className="mt-6">

                <span className="text-5xl font-bold text-orange-500">
                  FREE
                </span>

              </div>

            </div>

            {/* FEATURES */}

            <div className="mt-8 space-y-4 flex-1">

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span>
                  Complete recipe steps
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span>
                  Full ingredients list
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span>
                  Recipe descriptions
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <span>
                  ✕
                </span>

                <span>
                  Video tutorials
                </span>
              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={handleFreePlan}
              disabled={loading}
              className="w-full mt-8 bg-orange-100 hover:bg-orange-200 text-orange-700 py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading
                ? "Activating..."
                : "Get Free Access"}
            </button>

          </div>

          {/* ==================================================
              PREMIUM PLAN
          ================================================== */}

          <div className="relative bg-white rounded-2xl shadow-xl border-2 border-orange-500 p-8 flex flex-col">

            {/* POPULAR */}

            <div className="absolute -top-4 left-1/2 -translate-x-1/2">

              <span className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow">
                ⭐ Most Popular
              </span>

            </div>

            <div className="text-center">

              <div className="text-5xl mb-4">
                👑
              </div>

              <h2 className="text-2xl font-bold text-gray-800">
                Read + Watch
              </h2>

              <p className="text-gray-500 mt-2">
                The complete Cook Book experience
              </p>

              <div className="mt-6">

                <span className="text-5xl font-bold text-orange-500">
                  ₹79
                </span>

                <span className="text-gray-500 ml-2">
                  / month
                </span>

              </div>

            </div>

            {/* FEATURES */}

            <div className="mt-8 space-y-4 flex-1">

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span>
                  Complete recipe steps
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span>
                  Full ingredients list
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span>
                  Recipe descriptions
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-green-500">
                  ✓
                </span>

                <span className="font-semibold">
                  🎥 Video tutorials
                </span>
              </div>

            </div>

            {/* BUTTON */}

            <button
              onClick={handlePaidPlan}
              disabled={loading}
              className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition shadow-md disabled:opacity-60"
            >
              {loading
                ? "Creating Order..."
                : "Subscribe Now — ₹79"}
            </button>

          </div>

        </div>

        {/* ==================================================
            FOOTER NOTE
        ================================================== */}

        <p className="text-center text-gray-500 text-sm mt-10">
          Cancel anytime. Your subscription gives you
          access to Cook Book premium features.
        </p>

      </div>

    </main>
  );
}

export default Subscription;