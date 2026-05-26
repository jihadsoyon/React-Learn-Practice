const Header = () => {

    const scrollToSection = (id) => {

        const element = document.getElementById(id);

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
        <div className="navbar bg-slate-900/90 shadow-2xl border border-slate-800 rounded-2xl px-6 sticky top-4 z-50 backdrop-blur-xl">

            {/* LOGO */}
            <div className="flex-1">

                <button
                    onClick={() => scrollToSection("home")}
                    className="text-3xl font-black text-error"
                >
                    BloodFinder
                </button>

            </div>

            {/* MENU */}
            <div className="hidden md:flex items-center gap-2">

                <button
                    onClick={() => scrollToSection("home")}
                    className="btn btn-ghost"
                >
                    Home
                </button>

                <button
                    onClick={() => scrollToSection("register")}
                    className="btn btn-ghost"
                >
                    Register
                </button>

                <button
                    onClick={() => scrollToSection("matching")}
                    className="btn btn-ghost"
                >
                    Matching
                </button>

                <button
                    onClick={() => scrollToSection("donors")}
                    className="btn btn-ghost"
                >
                    Donors
                </button>

                <button
                    onClick={() => scrollToSection("request")}
                    className="btn btn-error"
                >
                    Emergency
                </button>

            </div>

        </div>
    );
};

export default Header;