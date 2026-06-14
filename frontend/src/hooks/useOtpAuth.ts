import { useState, useCallback } from "react";
import toast from "react-hot-toast";

export type OtpStep = "PHONE" | "OTP" | "RESET" | "SUCCESS";

export function useOtpAuth() {
  const [step, setStep] = useState<OtpStep>("PHONE");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock API: Send OTP
  const sendOtp = useCallback(async (phone: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(`OTP sent to ${phone}`);
      setPhoneNumber(phone);
      setStep("OTP");
      toast.success("OTP sent successfully to your mobile.");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      toast.error("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Mock API: Verify OTP
  const verifyOtp = useCallback(async (otp: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (otp === "123456" || otp === "111111") {
            resolve(true);
          } else {
            reject(new Error("Invalid OTP code."));
          }
        }, 1200);
      });
      setStep("RESET");
      toast.success("OTP verified.");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mock API: Reset Password
  const resetPassword = useCallback(async (password: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("SUCCESS");
      toast.success("Password reset successfully.");
    } catch (err) {
      setError("Failed to reset password.");
      toast.error("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  }, []);

  const resetFlow = useCallback(() => {
    setStep("PHONE");
    setPhoneNumber("");
    setError(null);
  }, []);

  return {
    step,
    phoneNumber,
    loading,
    error,
    sendOtp,
    verifyOtp,
    resetPassword,
    resetFlow,
    setStep,
  };
}
