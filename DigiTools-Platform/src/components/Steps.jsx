const steps = [
  {
    number: "01",
    icon: "👤",
    title: "Create Account",
    description: "Sign up for free in seconds. No credit card required to get started.",
  },
  {
    number: "02",
    icon: "📦",
    title: "Choose Products",
    description: "Browse our catalog and select the tools that fit your needs.",
  },
  {
    number: "03",
    icon: "🚀",
    title: "Start Creating",
    description: "Download and start using your premium tools immediately.",
  },
];

const Steps = () => {
  return (
    <section className="py-16 px-6 md:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Get Started In 3 Steps</h2>
        <p className="text-gray-500 mt-2 text-sm">Start using premium digital tools in minutes, not hours.</p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center gap-4">
              <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center text-2xl">
                {step.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-lg">{step.title}</h3>
              <p className="text-gray-500 text-sm text-center leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;