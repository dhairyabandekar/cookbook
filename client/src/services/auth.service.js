import API from "../api/axios";

// Register User
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);

  return response.data;
};


// Login User
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  return response.data;
};


// Get Logged-in User
export const getProfile = async () => {
  const response = await API.get("/users/me");

  return response.data;
};


// Forgot Password - Send OTP
export const forgotPassword = async (email) => {
  const response = await API.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};


// Verify OTP
export const verifyOTP = async (email, otp) => {
  const response = await API.post("/auth/verify-otp", {
    email,
    otp,
  });

  return response.data;
};


// Resend OTP
export const resendOTP = async (email) => {
  const response = await API.post("/auth/resend-otp", {
    email,
  });

  return response.data;
};


// Reset Password
export const resetPassword = async (
  email,
  newPassword,
  confirmPassword
) => {
  const response = await API.post("/auth/reset-password", {
    email,
    newPassword,
    confirmPassword,
  });

  return response.data;
};