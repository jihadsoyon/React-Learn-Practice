import { useForm } from "react-hook-form";

const DonorRegistry = ({
    divisions,
    bloodGroups,
    onAddDonor,
}) => {

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = (data) => {

        const newDonor = {
            id: `DN-${Date.now()}`,
            ...data,
            available: true,
        };

        onAddDonor(newDonor);

        reset();
    };

    return (
        <div className="card bg-slate-900 border border-slate-800 shadow-xl">
            <div className="card-body">

                <div className="flex justify-between items-center mb-4">

                    <div>
                        <h2 className="text-3xl font-black">
                            Donor Registration
                        </h2>

                        <p className="text-gray-400 mt-1">
                            Join the donor community and save lives.
                        </p>
                    </div>

                    <div className="badge badge-error badge-lg">
                        LIVE
                    </div>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >

                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input input-bordered"
                        {...register("name")}
                    />

                    <select
                        className="select select-bordered"
                        {...register("bloodGroup")}
                    >
                        <option disabled selected>
                            Blood Group
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
                        {...register("division")}
                    >
                        <option disabled selected>
                            Division
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

                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="input input-bordered"
                        {...register("phone")}
                    />

                    <button className="btn btn-error col-span-2">
                        Register Donor
                    </button>

                </form>

            </div>
        </div>
    );
};

export default DonorRegistry;