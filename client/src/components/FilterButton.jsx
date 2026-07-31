function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition duration-200
      ${
        active
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-white text-gray-700 hover:bg-orange-100"
      }`}
    >
      {label}
    </button>
  );
}

export default FilterButton;