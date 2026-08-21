import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/auth.service";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      return setError("Please enter your email address.");
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email.trim());

      if (response.success) {
        // Store email temporarily for the next step
        sessionStorage.setItem(
          "resetPasswordEmail",
          email.trim().toLowerCase()
        );

        navigate("/verify-otp");
      } else {
        setError(response.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Forgot password error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Icon */}
        <div className="text-center text-5xl mb-4">
          🔐
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Forgot Password?
        </h1>

        <p className="text-center text-gray-600 mt-3 mb-7 leading-6">
          Enter your registered email address and we'll send
          you a verification OTP.
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

        </form>

        {/* Back to Login */}
        <p className="text-center mt-6 text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;