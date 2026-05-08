function StatCard({ title, value, icon: Icon, change }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-green-500 text-sm mt-2">
            {change}
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;