import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    subtitle: "Perfect for getting started",
    price: 0,
    period: "Month",
    features: [
      "Access to 10 free tools",
      "Basic templates",
      "Community support",
      "1 project per month",
    ],
    cta: "Get Started Free",
    variant: "outline",
    highlight: false,
  },
  {
    name: "Pro",
    subtitle: "Best for professionals",
    price: 29,
    period: "Month",
    tag: "Most Popular",
    features: [
      "Access to all premium tools",
      "Unlimited templates",
      "Priority support",
      "Unlimited projects",
      "Cloud Sync",
      "Advanced analytics",
    ],
    cta: "Start Free Trial",
    variant: "filled",
    highlight: true,
  },
  {
    name: "Enterprise",
    subtitle: "For teams and businesses",
    price: 99,
    period: "Month",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom branding",
    ],
    cta: "Contact Sales",
    variant: "outline",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Simple, Transparent Pricing</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Choose the plan that fits your needs. Upgrade or downgrade anytime.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 flex flex-col gap-5 border transition-all ${
                plan.highlight
                  ? "bg-violet-600 text-white border-violet-600 shadow-lg scale-105"
                  : "bg-white text-gray-800 border-gray-200 shadow-sm"
              }`}
            >
              {plan.tag && (
                <span className="self-start bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                  {plan.tag}
                </span>
              )}

              <div>
                <h3 className={`font-bold text-xl ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mt-1 ${plan.highlight ? "text-violet-200" : "text-gray-500"}`}>
                  {plan.subtitle}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className={`text-4xl font-extrabold ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${plan.highlight ? "text-violet-200" : "text-gray-400"}`}>
                  /{plan.period}
                </span>
              </div>

              <ul className="space-y-2 text-left flex-1">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle
                      className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-white" : "text-violet-500"}`}
                    />
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`btn w-full rounded-full mt-4 ${
                  plan.highlight
                    ? "bg-white text-violet-600 hover:bg-gray-100"
                    : "bg-violet-600 text-white hover:bg-violet-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;