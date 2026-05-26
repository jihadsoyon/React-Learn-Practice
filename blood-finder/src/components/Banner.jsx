const Banner = () => {
    return (
        <div
            id="home"
            className="hero min-h-[75vh] rounded-3xl overflow-hidden relative bg-gradient-to-r from-slate-950 via-red-950 to-slate-950 border border-slate-800 shadow-2xl"
        >

            {/* ANIMATED GLOW */}
            <div className="absolute w-96 h-96 bg-red-500/20 blur-3xl rounded-full -top-20 -left-20 animate-pulse"></div>

            <div className="absolute w-96 h-96 bg-pink-500/10 blur-3xl rounded-full bottom-0 right-0 animate-pulse"></div>

            <div className="hero-content flex-col lg:flex-row-reverse relative z-10">

                {/* RIGHT CARD */}
                <div className="card bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-sm hover:scale-105 transition-all duration-500">

                    <div className="card-body">

                        <div className="flex justify-between items-center">

                            <h2 className="card-title text-white">
                                Emergency Status
                            </h2>

                            <div className="badge badge-error animate-pulse">
                                LIVE
                            </div>

                        </div>

                        <div className="stats stats-vertical bg-transparent text-white">

                            <div className="stat">
                                <div className="stat-title text-gray-300">
                                    Total Donors
                                </div>

                                <div className="stat-value text-error">
                                    25+
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title text-gray-300">
                                    Emergency Requests
                                </div>

                                <div className="stat-value text-error">
                                    120+
                                </div>
                            </div>

                            <div className="stat">
                                <div className="stat-title text-gray-300">
                                    Available Now
                                </div>

                                <div className="stat-value text-success">
                                    18
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* LEFT CONTENT */}
                <div>

                    <div className="badge badge-error mb-4 p-4 font-bold animate-bounce">
                        AI Powered Blood Donation Platform
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-tight text-white">

                        Save Lives <br />

                        <span className="text-error">
                            Donate Blood
                        </span>

                    </h1>

                    <p className="py-6 text-lg text-gray-300 max-w-2xl">
                        BloodFinder connects blood donors and patients instantly
                        with smart filtering, emergency request systems,
                        donor matching, and real-time availability tracking.
                    </p>

                    <div className="flex flex-wrap gap-4">

                        <button
                            onClick={() =>
                                document
                                    .getElementById("register")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                            }
                            className="btn btn-error btn-lg hover:scale-105 transition-all duration-300"
                        >
                            Become a Donor
                        </button>

                        <button
                            onClick={() =>
                                document
                                    .getElementById("donors")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                    })
                            }
                            className="btn btn-outline btn-lg text-white hover:scale-105 transition-all duration-300"
                        >
                            Explore Donors
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Banner;