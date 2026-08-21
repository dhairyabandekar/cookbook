import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  verifyOTP,
  resendOTP,
} from "../services/auth.service";

function VerifyOTP() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("resetPasswordEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resendTimer, setResendTimer] = useState(60);

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  // Resend OTP countdown
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleOTPChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
    }

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otp) {
      return setError("Please enter the OTP.");
    }

    if (otp.length !== 6) {
      return setError("OTP must be 6 digits.");
    }

    try {
      setLoading(true);

      const response = await verifyOTP(email, otp);

      if (response.success) {
        sessionStorage.setItem(
          "resetPasswordVerified",
          "true"
        );

        navigate("/reset-password");
      } else {
        setError(response.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to verify OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0 || resending) return;

    setError("");
    setSuccess("");

    try {
      setResending(true);

      const response = await resendOTP(email);

      if (response.success) {
        setSuccess(
          "A new OTP has been sent to your email."
        );

        setOtp("");
        setResendTimer(60);

        sessionStorage.setItem(
          "resetPasswordVerified",
          "false"
        );
      } else {
        setError(
          response.message || "Failed to resend OTP."
        );
      }
    } catch (err) {
      console.error("Resend OTP error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
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
          Verify OTP
        </h1>

        <p className="text-center text-gray-600 mt-3 leading-6">
          We've sent a 6-digit verification code to
        </p>

        <p className="text-center font-semibold text-gray-800 mt-1 break-all">
          {email}
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg mt-6">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-100 border border-green-200 text-green-700 p-3 rounded-lg mt-6">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-6"
        >

          {/* OTP */}
          <div>
            <label
              htmlFor="otp"
              className="block font-semibold text-gray-700 mb-2"
            >
              Enter OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={otp}
              onChange={handleOTPChange}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg p-3 text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        {/* Resend */}
        <div className="text-center mt-6">

          <p className="text-gray-600 text-sm">
            Didn't receive the OTP?
          </p>

          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resendTimer > 0 || resending}
            className={`mt-2 font-semibold ${
              resendTimer > 0 || resending
                ? "text-gray-400 cursor-not-allowed"
                : "text-orange-500 hover:underline"
            }`}
          >
            {resending
              ? "Sending..."
              : resendTimer > 0
              ? `Resend OTP in ${resendTimer}s`
              : "Resend OTP"}
          </button>

        </div>

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

export default VerifyOTP;