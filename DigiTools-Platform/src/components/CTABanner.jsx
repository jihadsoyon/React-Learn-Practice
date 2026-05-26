const CTABanner = () => {
  return (
    <section className="bg-gradient-to-r from-violet-600 to-purple-700 py-16 px-6 md:px-16 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold">Ready To Transform Your Workflow?</h2>
      <p className="mt-3 text-violet-200 text-sm max-w-md mx-auto">
        Join thousands of professionals who are already using DigiTools to work smarter and start
        faster today.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button className="btn bg-white text-violet-600 hover:bg-gray-100 rounded-full px-8">
          Explore Products
        </button>
        <button className="btn bg-transparent border border-white text-white hover:bg-white hover:text-violet-600 rounded-full px-8">
          View Pricing
        </button>
      </div>
      <p className="mt-5 text-xs text-violet-300">
        14-day free trial • No credit card required • Cancel anytime
      </p>
    </section>
  );
};

export default CTABanner;