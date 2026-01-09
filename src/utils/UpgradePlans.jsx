import { Crown, Check } from "lucide-react";

const plans = [
    {
        title: "Starter",
        price: "$30",
        cycle: "/3 months",
        popular: false,
        features: [
            "500 invoices",
            "50 customers",
            "PDF export",
            "Email invoices",
            "Basic analytics",
            "Company logo on invoice",
            "No due date reminders",
        ],
    },
    {
        title: "Business",
        price: "$70",
        cycle: "/6 months",
        popular: true,
        features: [
            "3,000 invoices",
            "300 customers",
            "Due date reminders",
            "Remove watermark",
            "Multi branch support",
            "Reports & insights",
            "Annual Stats Report"
        ],
    },
    {
        title: "Enterprise",
        price: "$150",
        cycle: "/year",
        popular: false,
        features: [
            "Unlimited invoices",
            "Unlimited customers",
            "Custom branding",
            "Unlimited-Devices Login",
            "Priority support",
        ],
    },
];

export default function UpgradePlans() {
    return (
        <div className="w-full h-full flex flex-col items-center px-4 py-4">

            <div className="flex items-center gap-2 mb-6">
                <Crown size={26} className="text-yellow-500" />
                <h1 className="text-2xl font-bold">Upgrade Your Invoicing Plan</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {plans.map((p) => (
                    <div
                        key={p.title}
                        className={`relative w-full rounded-2xl border shadow-lg p-6 flex flex-col items-center 
            transition hover:shadow-xl bg-white
            ${p.popular ? "border-purple-500 scale-[1.03]" : "border-gray-300"}
            `}
                    >
                        {p.popular && (
                            <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                                Most Popular
                            </span>
                        )}
                        <h2 className="text-xl font-bold">{p.title}</h2>
                        <p className="text-3xl font-bold mt-2 text-purple-600">{p.price}</p>
                        <p className="text-sm text-gray-500">{p.cycle}</p>

                        <ul className="mt-5 space-y-2 text-gray-700 w-full">
                            {p.features.map((f, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <Check size={16} className="text-green-600" /> {f}
                                </li>
                            ))}
                        </ul>

                        <button className="
              mt-6 w-full py-2 rounded-lg font-semibold text-white
              bg-linear-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-95 transition
            ">
                            Choose Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
