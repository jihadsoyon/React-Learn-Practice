import { useMemo, useState } from "react";

const DonorMatching = ({
    donors,
    bloodGroups,
    bloodCompatibility,
}) => {

    const [selectedBlood, setSelectedBlood] = useState("");
    const [mode, setMode] = useState("exact"); // exact | compatible

    // SMART FILTERING ENGINE
    const matchedDonors = useMemo(() => {

        if (!selectedBlood) return [];

        let result = [];

        if (mode === "exact") {
            // 🔥 STRICT MATCH (what you asked)
            result = donors.filter(
                (donor) => donor.bloodGroup === selectedBlood
            );
        }

        if (mode === "compatible") {
            // 🧠 SMART COMPATIBILITY MODE
            const allowed =
                bloodCompatibility[selectedBlood] || [];

            result = donors.filter((donor) =>
                allowed.includes(donor.bloodGroup)
            );
        }

        // ⭐ PRIORITY SORT: Available first
        return result.sort(
            (a, b) => b.available - a.available
        );

    }, [selectedBlood, donors, mode, bloodCompatibility]);

    const availableCount = matchedDonors.filter(d => d.available).length;
    const unavailableCount = matchedDonors.length - availableCount;

    return (
        <div className="card bg-slate-900 border border-slate-800 shadow-xl">
            <div className="card-body">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">

                    <div>
                        <h2 className="text-3xl font-black">
                            Smart Blood Matching Engine
                        </h2>

                        <p className="text-gray-400">
                            Find exact or compatible donors instantly with AI-style filtering.
                        </p>
                    </div>

                    {/* MODE SWITCH */}
                    <div className="flex gap-2">
                        <button
                            className={`btn btn-sm ${mode === "exact" ? "btn-error" : "btn-outline"}`}
                            onClick={() => setMode("exact")}
                        >
                            Exact Match
                        </button>

                        <button
                            className={`btn btn-sm ${mode === "compatible" ? "btn-error" : "btn-outline"}`}
                            onClick={() => setMode("compatible")}
                        >
                            Compatibility
                        </button>
                    </div>

                </div>

                {/* SELECT */}
                <select
                    className="select select-bordered w-full"
                    value={selectedBlood}
                    onChange={(e) => setSelectedBlood(e.target.value)}
                >
                    <option value="">Select Blood Group</option>

                    {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                            {group}
                        </option>
                    ))}
                </select>

                {/* RESULTS */}
                {selectedBlood && (
                    <div className="mt-6 space-y-4">

                        {/* STATS */}
                        <div className="flex justify-between items-center">

                            <h3 className="font-bold text-xl">
                                Results for {selectedBlood}
                            </h3>

                            <div className="flex gap-2">
                                <div className="badge badge-success">
                                    Available: {availableCount}
                                </div>

                                <div className="badge badge-neutral">
                                    Total: {matchedDonors.length}
                                </div>
                            </div>

                        </div>

                        {/* LIST */}
                        <div className="space-y-3 max-h-[350px] overflow-y-auto">

                            {matchedDonors.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">
                                    No donors found for this selection.
                                </div>
                            ) : (
                                matchedDonors.map((donor) => (
                                    <div
                                        key={donor.id}
                                        className="bg-slate-800 hover:bg-slate-700 transition rounded-2xl p-4 flex justify-between items-center"
                                    >

                                        {/* LEFT */}
                                        <div>
                                            <h2 className="font-bold text-lg">
                                                {donor.name}
                                            </h2>

                                            <p className="text-sm text-gray-400">
                                                {donor.division}
                                            </p>
                                        </div>

                                        {/* RIGHT */}
                                        <div className="text-right">

                                            <div className="flex gap-2 justify-end items-center">

                                                <div className="badge badge-error">
                                                    {donor.bloodGroup}
                                                </div>

                                                <div className={`badge ${donor.available ? "badge-success" : "badge-neutral"}`}>
                                                    {donor.available ? "Available" : "Busy"}
                                                </div>

                                            </div>

                                            <p className="text-sm mt-1">
                                                📞 {donor.phone}
                                            </p>

                                        </div>

                                    </div>
                                ))
                            )}

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default DonorMatching;