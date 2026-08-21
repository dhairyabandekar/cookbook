import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { resetPassword } from "../services/auth.service";

function ResetPassword() {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("resetPasswordEmail");
  const verified = sessionStorage.getItem("resetPasswordVerified");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Protect the page
  useEffect(() => {
    if (!email || verified !== "true") {
      navigate("/forgot-password");
    }
  }, [email, verified, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      return setError("Please fill all fields.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    // Same password rules as backend
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
    }

    try {
      setLoading(true);

      const response = await resetPassword(
        email,
        newPassword,
        confirmPassword
      );

      if (response.success) {
        // Clear password reset session
        sessionStorage.removeItem("resetPasswordEmail");
        sessionStorage.removeItem("resetPasswordVerified");

        setSuccess(true);
      } else {
        setError(
          response.message || "Failed to reset password."
        );
      }
    } catch (err) {
      console.error("Reset password error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">

          <div className="text-6xl mb-5">
            ✅
          </div>

          <h1 className="text-3xl font-bold text-green-600">
            Password Reset Successfully
          </h1>

          <p className="text-gray-600 mt-4 leading-6">
            Your Cook Book password has been updated successfully.
            You can now login using your new password.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="w-full mt-7 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Icon */}
        <div className="text-center text-5xl mb-4">
          🔑
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Reset Password
        </h1>

        <p className="text-center text-gray-600 mt-3 mb-7 leading-6">
          Create a new password for your Cook Book account.
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block font-semibold text-gray-700 mb-2"
            >
              New Password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-semibold text-gray-700 mb-2"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-orange-50 rounded-lg p-4 text-sm text-gray-600">
            <p className="font-semibold text-gray-700 mb-2">
              Password must contain:
            </p>

            <ul className="space-y-1">
              <li>• At least 8 characters</li>
              <li>• One uppercase letter</li>
              <li>• One lowercase letter</li>
              <li>• One number</li>
              <li>• One special character</li>
            </ul>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-60"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
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

export default ResetPassword;