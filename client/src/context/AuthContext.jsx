import { createContext, useEffect, useState } from "react";
import { getSubscription } from "../services/subscription.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ======================================================
  // USER
  // ======================================================

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ======================================================
  // SUBSCRIPTION
  // ======================================================

  const [subscription, setSubscription] = useState(null);
  const [subscriptionLoading, setSubscriptionLoading] =
    useState(false);

  // ======================================================
  // LOGIN
  // ======================================================

  const login = (userData, token) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem("token", token);

    setUser(userData);
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setSubscription(null);
  };

  // ======================================================
  // LOAD SUBSCRIPTION
  // ======================================================

  const refreshSubscription = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setSubscription(null);
      return;
    }

    try {
      setSubscriptionLoading(true);

      const response = await getSubscription();

      if (response.success) {
        setSubscription(response.subscription);
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error(
        "Failed to load subscription:",
        error
      );

      setSubscription(null);
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // ======================================================
  // LOAD SUBSCRIPTION WHEN USER LOGS IN
  // ======================================================

  useEffect(() => {
    if (user) {
      refreshSubscription();
    } else {
      setSubscription(null);
    }
  }, [user]);

  // ======================================================
  // ACCESS CONTROL
  // ======================================================

  const hasActiveSubscription =
    subscription?.status === "active" &&
    subscription?.expiryDate &&
    new Date(subscription.expiryDate) > new Date();

  const hasReadAccess =
    hasActiveSubscription &&
    (
      subscription?.plan === "read" ||
      subscription?.plan === "read_watch"
    );

  const hasWatchAccess =
    hasActiveSubscription &&
    subscription?.plan === "read_watch";

  // ======================================================
  // CONTEXT
  // ======================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,

        subscription,
        subscriptionLoading,

        hasActiveSubscription,
        hasReadAccess,
        hasWatchAccess,

        refreshSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};