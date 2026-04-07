import React, { useState } from "react";
import { useOtpAuth, OtpStep } from "@/hooks/useOtpAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { FormContainer } from "@/components/ui/FormContainer";
import { ArrowLeft, CheckCircle2, ShieldCheck, KeyRound, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ForgotPasswordFlowProps {
  onBackToLogin: () => void;
}

export default function ForgotPasswordFlow({ onBackToLogin }: ForgotPasswordFlowProps) {
  const { step, phoneNumber, loading, error, sendOtp, verifyOtp, resetPassword, resetFlow } = useOtpAuth();
  const [phoneInput, setPhoneInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.length < 10) return;
    sendOtp(phoneInput);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length < 6) return;
    verifyOtp(otpInput);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return;
    resetPassword(newPassword);
  };

  const renderStep = () => {
    switch (step) {
      case "PHONE":
        return (
          <motion.div
            key="phone"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
                <Smartphone className="w-8 h-8 text-gold" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">Reset Password</h2>
              <p className="text-slate-400 text-sm">Enter your phone number to receive a verification code.</p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <Input
                label="Phone Number"
                placeholder="+91 9876543210"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                required
                type="tel"
                helperText="We'll send a 6-digit OTP code."
              />
              <Button variant="gold" size="lg" className="w-full" loading={loading} type="submit">
                Send OTP Code
              </Button>
            </form>
          </motion.div>
        );

      case "OTP":
        return (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-purple-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-purple-500/20">
                <ShieldCheck className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">Verify OTP</h2>
              <p className="text-slate-400 text-sm">A 6-digit code has been sent to <span className="text-white font-bold">{phoneNumber}</span>.</p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <Input
                label="Verification Code"
                placeholder="• • • • • •"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                required
                maxLength={6}
                className="text-center tracking-[0.5em] text-2xl font-black"
                error={error || ""}
              />
              <div className="space-y-3">
                <Button variant="gold" size="lg" className="w-full" loading={loading} type="submit">
                  Verify & Continue
                </Button>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => sendOtp(phoneNumber)}>
                  Resend Code
                </Button>
              </div>
            </form>
          </motion.div>
        );

      case "RESET":
        return (
          <motion.div
            key="reset"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                <KeyRound className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">New Password</h2>
              <p className="text-slate-400 text-sm">Choose a strong, memorable password for your legacy profile.</p>
            </div>

            <form onSubmit={handleResetSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  error={newPassword !== confirmPassword && confirmPassword ? "Passwords do not match" : ""}
                />
              </div>
              <Button variant="gold" size="lg" className="w-full" loading={loading} type="submit">
                Secure Password
              </Button>
            </form>
          </motion.div>
        );

      case "SUCCESS":
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-4"
          >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 animate-in zoom-in-50 duration-500">
               <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-serif font-bold text-white">Success!</h2>
              <p className="text-slate-400 text-lg">Your password has been successfully updated. You can now access your legacy journey.</p>
            </div>
            <Button variant="gold" size="xl" className="w-full" onClick={onBackToLogin}>
              Log In Now
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full relative shadow-3xl">
      {step !== "SUCCESS" && (
        <button
          onClick={onBackToLogin}
          className="absolute top-8 left-8 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all z-20 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
      )}
      
      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </Card>
  );
}
