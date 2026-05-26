import { useState } from "react";
import { useForm } from "react-hook-form";

const DonorRequest = ({
    divisions,
    bloodGroups,
    donors,
}) => {

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const [loading, setLoading] =
        useState(false);

    const [matchedDonors, setMatchedDonors] =
        useState([]);

    const [status, setStatus] =
        useState("");

    const [showAlert, setShowAlert] =
        useState(false);

    const onSubmit = (data) => {

        if (
            !data.patient ||
            !data.bloodGroup ||
            !data.division
        ) {
            alert("Please complete all fields");
            return;
        }

        setLoading(true);
        setShowAlert(true);

        setMatchedDonors([]);

        setStatus(
            "Scanning emergency donor network..."
        );

        setTimeout(() => {

            let results = donors.filter(
                (donor) =>
                    donor.bloodGroup === data.bloodGroup &&
                    donor.division === data.division &&
                    donor.available
            );

            // 🔥 PRIORITY SORT
            results.sort(
                (a, b) => b.available - a.available
            );

            setMatchedDonors(results);

            setLoading(false);

            setStatus(
                results.length > 0
                    ? `${results.length} donors notified successfully`
                    : "No donors available right now"
            );

            reset();

        }, 2200);
    };

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-800 to-red-900 border border-red-500 shadow-2xl">

            {/* ANIMATED GLOW */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_40%)]"></div>

            <div className="card-body relative z-10">

                {/* TOP */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

                    <div>

                        <h2 className="text-4xl font-black text-white">
                            Emergency Blood Request
                        </h2>

                        <p className="text-red-100 mt-2">
                            Instantly alert matching donors nearby during emergencies.
                        </p>

                    </div>

                    {/* LIVE ALERT */}
                    <div className="flex items-center gap-2">

                        <span className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                        </span>

                        <span className="font-bold text-white">
                            LIVE EMERGENCY SYSTEM
                        </span>

                    </div>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4"
                >

                    <input
                        type="text"
                        placeholder="Patient Name"
                        className="input input-bordered bg-black/20 border-red-300 text-white placeholder:text-gray-300"
                        {...register("patient")}
                    />

                    <select
                        className="select bg-black/20 border-red-300 text-white"
                        {...register("bloodGroup")}
                    >

                        <option value="">Blood Group</option>

                        {
                            bloodGroups.map((g) => (
                                <option key={g} value={g}>
                                    {g}
                                </option>
                            ))
                        }

                    </select>

                    <select
                        className="select bg-black/20 border-red-300 text-white"
                        {...register("division")}
                    >

                        <option value="">Division</option>

                        {
                            divisions.map((d) => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))
                        }

                    </select>

                    <button
                        className={`btn border-none text-white font-bold transition-all duration-300 ${
                            loading
                                ? "bg-black"
                                : "bg-black hover:scale-105 hover:bg-red-950"
                        }`}
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Searching..."
                                : "Request Emergency Blood"
                        }

                    </button>

                </form>

                {/* LOADING */}
                {
                    loading && (
                        <div className="mt-6 bg-black/20 p-5 rounded-2xl border border-red-400 animate-pulse">

                            <div className="flex items-center gap-3 text-white">

                                <span className="loading loading-spinner loading-lg"></span>

                                <div>

                                    <h3 className="font-bold">
                                        Emergency Broadcast Active
                                    </h3>

                                    <p className="text-sm text-red-100">
                                        Searching nearby compatible donors...
                                    </p>

                                </div>

                            </div>

                        </div>
                    )
                }

                {/* RESULT */}
                {
                    !loading && matchedDonors.length > 0 && (
                        <div className="mt-8 animate-fade-in">

                            {/* STATUS */}
                            <div className="flex flex-col md:flex-row justify-between gap-3 mb-5">

                                <div>

                                    <h2 className="text-2xl font-bold text-white">
                                        Emergency Matches Found
                                    </h2>

                                    <p className="text-red-100">
                                        Notifications sent successfully
                                    </p>

                                </div>

                                <div className="stats shadow bg-black/20 text-white">

                                    <div className="stat">
                                        <div className="stat-title text-red-100">
                                            Donors Alerted
                                        </div>

                                        <div className="stat-value text-3xl">
                                            {matchedDonors.length}
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* DONOR LIST */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {
                                    matchedDonors.map((donor) => (

                                        <div
                                            key={donor.id}
                                            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300"
                                        >

                                            <div className="flex justify-between items-start">

                                                <div>

                                                    <h2 className="font-bold text-xl text-white">
                                                        {donor.name}
                                                    </h2>

                                                    <p className="text-red-100">
                                                        {donor.division}
                                                    </p>

                                                </div>

                                                <div className="badge badge-success">
                                                    READY
                                                </div>

                                            </div>

                                            <div className="mt-4 flex justify-between items-center">

                                                <div className="badge badge-error">
                                                    {donor.bloodGroup}
                                                </div>

                                                <p className="text-white">
                                                    📞 {donor.phone}
                                                </p>

                                            </div>

                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                    )
                }

                {/* EMPTY */}
                {
                    !loading &&
                    status &&
                    matchedDonors.length === 0 && (
                        <div className="mt-6 bg-black/20 border border-red-400 rounded-2xl p-5 text-white">
                            {status}
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default DonorRequest;