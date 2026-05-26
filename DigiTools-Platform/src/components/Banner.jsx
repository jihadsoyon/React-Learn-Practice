import { Play } from "lucide-react";
import bannerImg from "../assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 space-y-5">
          <span className="badge bg-violet-100 text-violet-600 border-none px-4 py-3 text-xs font-semibold rounded-full">
            ✨ New: AI-Powered Tools Available
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Supercharge Your <br /> Digital Workflow
          </h1>

          <p className="text-gray-500 text-base max-w-md">
            Access premium AI tools, design assets, templates, and productivity
            software — all in one place. Start creating faster today.
          </p>
          <p className="text-violet-600 text-sm font-medium cursor-pointer hover:underline">
            Explore Products
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button className="btn bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6">
              Explore Products
            </button>
            <button className="btn bg-[#fff] text-[#111] border border-gray-200 rounded-full px-6 gap-2">
              <Play className="w-4 h-4 fill-violet-600 text-violet-600" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={bannerImg}
            alt="Digital Workflow"
            className="rounded-2xl w-full max-w-sm md:max-w-md object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;