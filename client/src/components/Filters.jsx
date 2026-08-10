function Filters({
  filters,
  setFilters,
  showFilters,
  setShowFilters,
  clearFilters,
}) {
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="mb-8">

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 mb-4">

        {/* Show / Hide Filters */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Clear Filters */}
        <button
          type="button"
          onClick={clearFilters}
          className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Clear Filters
        </button>

      </div>

      {/* Filters */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } bg-white rounded-2xl shadow-md p-5`}
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">

          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>

            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                updateFilter("search", e.target.value)
              }
              placeholder="Search recipes..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Diet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diet
            </label>

            <select
              value={filters.diet}
              onChange={(e) =>
                updateFilter("diet", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>

            <select
              value={filters.cuisine}
              onChange={(e) =>
                updateFilter("cuisine", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Italian">Italian</option>
              <option value="American">American</option>
            </select>
          </div>

          {/* Taste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taste
            </label>

            <select
              value={filters.taste}
              onChange={(e) =>
                updateFilter("taste", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Sweet">Sweet</option>
              <option value="Savoury">Savoury</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course
            </label>

            <select
              value={filters.course}
              onChange={(e) =>
                updateFilter("course", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Snacks">Snacks</option>
              <option value="Starter">Starter</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategory
            </label>

            <select
              value={filters.subcategory}
              onChange={(e) =>
                updateFilter(
                  "subcategory",
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="All">All</option>
              <option value="Curry">Curry</option>
              <option value="Rice">Rice</option>
              <option value="Pasta">Pasta</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Filters;