const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
};

export default StatCard;