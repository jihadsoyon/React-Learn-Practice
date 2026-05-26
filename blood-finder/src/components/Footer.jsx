const Footer = () => {

    const scrollToSection = (id) => {

        const element =
            document.getElementById(id);

        if (element) {

            const offset = 120;

            const top =
                element.offsetTop - offset;

            window.scrollTo({
                top,
                behavior: "smooth",
            });
        }
    };

    return (
        <footer className="bg-slate-950 border-t border-slate-800 mt-16">

            <div className="container mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <div>

                        <h2 className="text-3xl font-black text-error">
                            BloodFinder
                        </h2>

                        <p className="text-gray-400 mt-3 leading-relaxed">
                            Smart blood donation platform with AI-powered donor matching.
                        </p>

                    </div>

                    {/* LINKS */}
                    <div>

                        <h3 className="text-xl font-bold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-gray-400">

                            <li>
                                <button
                                    onClick={() =>
                                        scrollToSection("home")
                                    }
                                    className="hover:text-white transition"
                                >
                                    Home
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() =>
                                        scrollToSection("register")
                                    }
                                    className="hover:text-white transition"
                                >
                                    Register
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() =>
                                        scrollToSection("matching")
                                    }
                                    className="hover:text-white transition"
                                >
                                    Blood Matching
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() =>
                                        scrollToSection("donors")
                                    }
                                    className="hover:text-white transition"
                                >
                                    Donors
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() =>
                                        scrollToSection("request")
                                    }
                                    className="hover:text-white transition"
                                >
                                    Emergency
                                </button>
                            </li>

                        </ul>

                    </div>

                    {/* EMERGENCY */}
                    <div>

                        <h3 className="text-xl font-bold mb-4 text-error">
                            Emergency Support
                        </h3>

                        <div className="space-y-2 text-gray-400">

                            <p>📞 Hotline: 999</p>

                            <p>🩸 24/7 Emergency Blood Service</p>

                            <p>⚡ Instant Donor Matching</p>

                        </div>

                    </div>

                    {/* ABOUT */}
                    <div>

                        <h3 className="text-xl font-bold mb-4">
                            Project
                        </h3>

                        <p className="text-gray-400">
                            Portfolio-grade React project focused on healthcare UX,
                            filtering systems, and donor management.
                        </p>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} BloodFinder
                    </p>

                    <div className="flex gap-4 text-gray-400">

                        <span className="hover:text-white cursor-pointer transition">
                            Privacy
                        </span>

                        <span className="hover:text-white cursor-pointer transition">
                            Terms
                        </span>

                        <span className="hover:text-white cursor-pointer transition">
                            Support
                        </span>

                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;