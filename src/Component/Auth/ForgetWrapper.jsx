import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import VerifyOTP from "./VerifyOTP";
import ResetPassword from "./ResetPassword";

const ForgetWrapper = ({ closeModal, onCloseModal }) => {
    const [step, setStep] = useState("forget"); // "forget" | "otp" | "reset"
    const [formData, setFormData] = useState({ email: "", ntn: "" });

    // 1️⃣ ForgetPassword submit success
    const handleForgetSuccess = (data) => {
        setFormData(data); // store email & NTN
        alert("Validation Successful!");
        setStep("otp"); // move to OTP step
    };

    // 2️⃣ OTP verify success
    const handleOTPSuccess = () => {
        alert("OTP Verified!");
        setStep("reset"); // move to reset password step
    };

    // 3️⃣ Reset password success
    const handleResetSuccess = () => {
        alert("Password Reset Successful!");
        if (closeModal) closeModal(); // close modal after reset
    };

    return (
        <div>
            {step === "forget" && (
                <ForgetPassword onSuccess={handleForgetSuccess} />
            )}
            {step === "otp" && (
                <VerifyOTP formData={formData} onSuccess={handleOTPSuccess} />
            )}
            {step === "reset" && (
                <ResetPassword formData={formData} onSuccess={handleResetSuccess} onSuccessModel={() => { onCloseModal(); }} />
            )}
        </div>
    );
};

export default ForgetWrapper;
