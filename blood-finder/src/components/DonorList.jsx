import { useMemo, useState } from "react";

const DonorList = ({ donors }) => {

    const [search, setSearch] = useState("");
    const [bloodFilter, setBloodFilter] =
        useState("");

    const [divisionFilter, setDivisionFilter] =
        useState("");

    const [availabilityFilter,
        setAvailabilityFilter] = useState("");

    const bloodGroups = [
        ...new Set(
            donors.map((d) => d.bloodGroup)
        ),
    ];

    const divisions = [
        ...new Set(
            donors.map((d) => d.division)
        ),
    ];

    const filteredDonors = useMemo(() => {

        return donors.filter((donor) => {

            const matchesSearch =
                donor.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                donor.phone.includes(search);

            const matchesBlood =
                bloodFilter
                    ? donor.bloodGroup === bloodFilter
                    : true;

            const matchesDivision =
                divisionFilter
                    ? donor.division === divisionFilter
                    : true;

            const matchesAvailability =
                availabilityFilter === ""
                    ? true
                    : donor.available ===
                      (availabilityFilter ===
                          "available");

            return (
                matchesSearch &&
                matchesBlood &&
                matchesDivision &&
                matchesAvailability
            );
        });

    }, [
        donors,
        search,
        bloodFilter,
        divisionFilter,
        availabilityFilter,
    ]);

    return (
        <div className="card bg-slate-900 border border-slate-800 shadow-xl">

            <div className="card-body">

                <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

                    <div>
                        <h2 className="text-3xl font-black">
                            Available Donors
                        </h2>

                        <p className="text-gray-400 mt-1">
                            Find verified blood donors instantly.
                        </p>
                    </div>

                    <div className="stats bg-slate-800 shadow">

                        <div className="stat">

                            <div className="stat-title">
                                Total Donors
                            </div>

                            <div className="stat-value text-error">
                                {donors.length}
                            </div>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                    <input
                        type="text"
                        placeholder="Search donor..."
                        className="input input-bordered"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <select
                        className="select select-bordered"
                        value={bloodFilter}
                        onChange={(e) =>
                            setBloodFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Blood Groups
                        </option>

                        {
                            bloodGroups.map((group) => (
                                <option
                                    key={group}
                                    value={group}
                                >
                                    {group}
                                </option>
                            ))
                        }

                    </select>

                    <select
                        className="select select-bordered"
                        value={divisionFilter}
                        onChange={(e) =>
                            setDivisionFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Divisions
                        </option>

                        {
                            divisions.map((division) => (
                                <option
                                    key={division}
                                    value={division}
                                >
                                    {division}
                                </option>
                            ))
                        }

                    </select>

                    <select
                        className="select select-bordered"
                        value={availabilityFilter}
                        onChange={(e) =>
                            setAvailabilityFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="available">
                            Available
                        </option>

                        <option value="unavailable">
                            Unavailable
                        </option>

                    </select>

                </div>

                <div className="overflow-x-auto rounded-2xl">

                    <table className="table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Donor</th>
                                <th>Blood</th>
                                <th>Division</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                filteredDonors.map((donor, index) => (
                                    <tr
                                        key={donor.id}
                                        className="hover"
                                    >

                                        <th>
                                            {index + 1}
                                        </th>

                                        <td>

                                            <div>

                                                <div className="font-bold">
                                                    {donor.name}
                                                </div>

                                                <div className="text-sm text-gray-400">
                                                    {donor.id}
                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            <div className="badge badge-error">
                                                {donor.bloodGroup}
                                            </div>

                                        </td>

                                        <td>
                                            {donor.division}
                                        </td>

                                        <td>
                                            {donor.phone}
                                        </td>

                                        <td>

                                            <div
                                                className={`badge ${
                                                    donor.available
                                                        ? "badge-success"
                                                        : "badge-neutral"
                                                }`}
                                            >
                                                {
                                                    donor.available
                                                        ? "Available"
                                                        : "Unavailable"
                                                }
                                            </div>

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                    {
                        filteredDonors.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                No donors found.
                            </div>
                        )
                    }

                </div>

            </div>

        </div>
    );
};

export default DonorList;