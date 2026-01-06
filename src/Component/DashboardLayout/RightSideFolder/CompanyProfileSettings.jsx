import { useContext, useState } from "react";
import { Context } from "../../../Context/ContextProvider";
import {
  Building2,
  User,
  Mail,
  Phone,
  FileDigit,
  Globe,
  MapPin,
  Building,
  BriefcaseBusiness,
  Earth
} from "lucide-react";

const CompanyProfileSettings = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    ntn: "",
    strn: "",
    businessType: "",
    address: "",
    city: "",
    country: "Pakistan",
    website: "",
  });

  const { showStatusModal, setUserProfile } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserProfile({
      name: formData.ownerName,
      email: formData.email,
      companyName: formData.companyName
    })
    
    showStatusModal({
      type: "success",
      title: "Profile Updated",
      message: "Company profile updated successfully!",
      primaryButtonText: "OK",
    });
  };

  const inputClasses = "w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all duration-200 placeholder:text-slate-400 bg-white";
  const labelClasses = "block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2";
  const sectionClasses = "space-y-4";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 md:mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                  Company Profile
                </h1>
              </div>
              <p className="text-sm md:text-base text-slate-500 ml-11">
                Update your company & tax-related information securely
              </p>
            </div>
            <div className="hidden md:block bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="text-xs text-slate-500">Last Updated</div>
              <div className="text-sm font-medium text-slate-700">Not yet</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Basic Information Section */}
              <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-4">
                  <BriefcaseBusiness className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Basic Information</h3>
                  <div className="h-px flex-1 bg-linear-to-r from-blue-100 to-transparent ml-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <Building className="w-4 h-4" />
                      Company Name
                    </label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="HumTek Pvt Ltd"
                      className={inputClasses}
                      required
                    />
                  </div>

                  {/* Authorized Person */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <User className="w-4 h-4" />
                      Authorized Person
                    </label>
                    <input
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Muhammad Owais"
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
                  <div className="h-px flex-1 bg-linear-to-r from-indigo-100 to-transparent ml-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <Mail className="w-4 h-4" />
                      Company Email (FBR Registered)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="company@email.com"
                      className={`${inputClasses} focus:ring-indigo-600 focus:border-indigo-600`}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 3xx xxxxxxx"
                      className={`${inputClasses} focus:ring-indigo-600 focus:border-indigo-600`}
                      required
                    />
                  </div>

                  {/* Website */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <Globe className="w-4 h-4" />
                      Website (Optional)
                    </label>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://humtek.com"
                      className={`${inputClasses} focus:ring-blue-500 focus:border-blue-500`}
                    />
                  </div>
                </div>
              </div>

              {/* Tax Information Section */}
              <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-4">
                  <FileDigit className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Tax Information</h3>
                  <div className="h-px flex-1 bg-linear-to-r from-red-100 to-transparent ml-2"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* NTN */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <FileDigit className="w-4 h-4 text-red-500" />
                      NTN Number
                    </label>
                    <input
                      name="ntn"
                      value={formData.ntn}
                      onChange={handleChange}
                      placeholder="1234567-8"
                      className={`${inputClasses} focus:ring-red-500 focus:border-red-500`}
                      required
                    />
                  </div>

                  {/* STRN */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <FileDigit className="w-4 h-4 text-red-400" />
                      STRN (Optional)
                    </label>
                    <input
                      name="strn"
                      value={formData.strn}
                      onChange={handleChange}
                      placeholder="327787654321"
                      className={`${inputClasses} focus:ring-red-400 focus:border-red-400`}
                    />
                  </div>

                  {/* Business Type */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <BriefcaseBusiness className="w-4 h-4" />
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className={`${inputClasses} bg-white`}
                      required
                    >
                      <option value="">Select business type</option>
                      <option>Software Company</option>
                      <option>Retail Business</option>
                      <option>Wholesale Trading</option>
                      <option>Service Provider</option>
                      <option>Manufacturer</option>
                      <option>E-commerce</option>
                      <option>Consulting</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address Information Section */}
              <div className={sectionClasses}>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Address Information</h3>
                  <div className="h-px flex-1 bg-linear-to-r from-green-100 to-transparent ml-2"></div>
                </div>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="space-y-2">
                    <label className={labelClasses}>
                      <MapPin className="w-4 h-4" />
                      Company Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Complete office address including floor, building, street, etc."
                      className={`${inputClasses} min-h-30 resize-vertical`}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* City */}
                    <div className="space-y-2">
                      <label className={labelClasses}>
                        <Building className="w-4 h-4" />
                        City
                      </label>
                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Bahawalpur"
                        className={`${inputClasses} focus:ring-indigo-600 focus:border-indigo-600`}
                        required
                      />
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label className={labelClasses}>
                        <Earth className="w-4 h-4" />
                        Country
                      </label>
                      <div className="relative">
                        <input
                          value="Pakistan"
                          disabled
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-600 font-medium cursor-not-allowed"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                          🇵🇰
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-sm text-slate-500">
                    <p>All fields marked with * are required</p>
                    <p className="text-xs mt-1">Your information is securely stored and encrypted</p>
                  </div>
                  <button
                    type="submit"
                    className="px-8 md:py-4 py-1 bg-linear-to-r cursor-pointer from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white rounded-2xl font-semibold text-lg tracking-wide transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Save Profile Information
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Status Card */}
        <div className="md:hidden mt-6 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Last Updated</div>
              <div className="text-sm font-medium text-slate-700">Not yet</div>
            </div>
            <div className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
              Draft
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileSettings;