const Stats = () => {
  return (
    <section className="bg-violet-600 py-10 px-6 md:px-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-around gap-8 text-white text-center">
        <div>
          <p className="text-4xl font-extrabold">50K+</p>
          <p className="text-sm mt-1 text-violet-200">Active Users</p>
        </div>
        <div className="hidden md:block h-12 w-px bg-violet-400"></div>
        <div>
          <p className="text-4xl font-extrabold">200+</p>
          <p className="text-sm mt-1 text-violet-200">Premium Tools</p>
        </div>
        <div className="hidden md:block h-12 w-px bg-violet-400"></div>
        <div>
          <p className="text-4xl font-extrabold">4.9</p>
          <p className="text-sm mt-1 text-violet-200">Rating</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;