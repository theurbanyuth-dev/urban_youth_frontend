"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import OtpInput from "react-otp-input";
import logo from "../../../images/ulogo1.png";

const Login = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState(""); // ✅ error state

  // Loading states
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  // Timer state
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval;

    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [step, timer]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  // STEP 1 → Send OTP
  const handleSendOtp = async () => {
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Enter valid email");
      return;
    }

    try {
      setLoadingOtp(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/send-otp`,
        { email },
      );

      setStep(2);
      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  // STEP 2 → Verify OTP
  const handleVerifyOtp = async () => {
    setError("");

    if (otp.length !== 4) {
      setError("Enter valid OTP");
      return;
    }

    try {
      setLoadingVerify(true);

      const res = await signIn("credentials", {
        email,
        otp,
        type: "otp",
        redirect: false,
      });

      if (res?.error === "NEW_USER") {
        setStep(3);
        return;
      }

      if (res?.error) {
        setError(res.error);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Verification failed");
    } finally {
      setLoadingVerify(false);
    }
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    setError("");

    try {
      setLoadingOtp(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/send-otp`,
        { email },
      );

      setTimer(30);
      setCanResend(false);
    } catch (err) {
      setError("Failed to resend OTP");
    } finally {
      setLoadingOtp(false);
    }
  };

  // STEP 3 → Complete profile
  const handleRegister = async () => {
    setError("");

    if (!name || !phone || !email) {
      setError("All fields are required");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Enter valid 10-digit phone number");
      return;
    }

    try {
      setLoadingRegister(true);

      const formattedPhone = `+91${phone}`;

      const res = await signIn("credentials", {
        email,
        otp,
        name,
        phone: formattedPhone,
        type: "otp",
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      router.push("/");
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/30 flex items-end justify-center">
      <div className="w-full md:w-[420px] h-[80vh] bg-white pt-10 rounded-t-3xl shadow-2xl p-6 animate-slideUp">
        
        {/* Logo */}
        <div className="text-center mb-6 flex flex-col items-center">
          <Image alt="logo" src={logo} width={70} height={70} />
          <p className="text-md text-gray-800 font-semibold mt-2">
            Welcome to UrbanYouth
          </p>
        </div>

        <div className="space-y-5 mt-10">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-gray-700 text-sm">Enter your Email</h2>

              <input
                type="email"
                placeholder="example@email.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md text-gray-800 border mt-2"
              />

              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}

              <button
                onClick={handleSendOtp}
                disabled={loadingOtp}
                className="w-full py-3 rounded-md mt-4 bg-black text-white font-semibold disabled:opacity-50"
              >
                {loadingOtp ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              <button
                onClick={() => setStep(1)}
                className="text-sm text-gray-600"
              >
                ← Back
              </button>

              <h2 className="text-gray-800 text-md font-semibold">
                Verify OTP
              </h2>

              <p className="text-sm text-gray-700">Otp sent on: {email}</p>

              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                inputType="number"
                inputStyle={{
                  width: "25%",
                  height: "50px",
                }}
                shouldAutoFocus
                renderInput={(props) => (
                  <input
                    {...props}
                    className="mx-1 w-12 h-12 text-center border rounded-md"
                  />
                )}
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={loadingVerify}
                className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold disabled:opacity-50"
              >
                {loadingVerify ? "Verifying..." : "Verify"}
              </button>

              <div className="text-center text-sm text-gray-600">
                {canResend ? (
                  <button
                    onClick={handleResendOtp}
                    disabled={loadingOtp}
                    className="text-black font-semibold disabled:opacity-50"
                  >
                    {loadingOtp ? "Sending..." : "Resend OTP"}
                  </button>
                ) : (
                  <p>Resend OTP in {timer}s</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-gray-800 text-lg font-semibold text-center">
                Complete Profile
              </h2>

              <input
                placeholder="Full Name"
                autoCapitalize="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-xl border"
              />

              <input
                placeholder="Phone Number"
                autoCapitalize="mobile"
                value={phone}
                type="tel"
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                maxLength={10}
                className="w-full p-3 rounded-xl border"
              />

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                onClick={handleRegister}
                disabled={loadingRegister}
                className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold disabled:opacity-50"
              >
                {loadingRegister ? "Processing..." : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;