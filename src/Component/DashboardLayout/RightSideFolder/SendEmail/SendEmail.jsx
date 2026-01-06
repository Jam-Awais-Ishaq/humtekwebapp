import { useContext, useState } from "react";
import { Mail, Edit3, MessageCircle } from "lucide-react";
import { Context } from "../../../../Context/ContextProvider";

const SendEmail = () => {
    const [formData, setFormData] = useState({
        email: "",
        subject: "",
        message: "",
    });

    const { showStatusModal } = useContext(Context);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sending Email:", formData);
        // TODO: API call to send email
        showStatusModal({
            type: "success",
            title: "Email Sent",
            message: "Your email has been sent successfully!",
            primaryButtonText: "OK",
        })
        setFormData({ email: "", subject: "", message: "" });
    };

    const inputClasses =
        "peer w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";
    const labelClasses =
        "absolute left-4 text-gray-400 text-sm transition-all pointer-events-none flex items-center gap-2 " +
        "peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm " +
        "peer-focus:top-[-0.6rem] peer-focus:text-blue-500 peer-focus:text-xs " +
        "peer-valid:top-[-0.6rem] peer-valid:text-blue-500 peer-valid:text-xs";

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
                <h2 className="text-4xl font-bold text-slate-800 mb-6 flex items-center gap-2">  <Mail className="text-slate-800 md:w-12 md:h-12 peer-focus:text-blue-500 transition-colors" />  <span>Send Email</span> </h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Email + Subject in one line */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                                placeholder=" " // Important for floating label
                            />
                            <label className={labelClasses}>
                                <Mail className="w-4 h-4 text-gray-400 peer-focus:text-blue-500 transition-colors" /> Email
                            </label>
                        </div>

                        {/* Subject */}
                        <div className="relative">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={inputClasses}
                                required
                                placeholder=" "
                            />
                            <label className={labelClasses}>
                                <Edit3 className="w-4 h-4 text-gray-400 peer-focus:text-green-500 transition-colors" /> Subject
                            </label>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={`${inputClasses} min-h-30 resize-vertical`}
                            required
                            placeholder=" "
                        />
                        <label className={labelClasses}>
                            <MessageCircle className="w-4 h-4 text-gray-400 peer-focus:text-blue-500 transition-colors" /> Message
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendEmail;
