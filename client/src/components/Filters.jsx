import FilterButton from "./FilterButton";
import { X } from "lucide-react";

function Filters({ filters, setFilters, showFilters, setShowFilters, clearFilters }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">

            <div className="flex items-center gap-3 mb-6">

                {/* Search */}
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="🔍 Search recipes..."
                        value={filters.search}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                        className="w-full border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    {filters.search && (
                        <button
                            onClick={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    search: "",
                                }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full hover:bg-gray-200 transition"
                        >
                            <X size={18} className="text-gray-500" />
                        </button>
                    )}
                </div>

                {/* Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-orange-500 text-white px-5 py-3 rounded-lg hover:bg-orange-600 transition whitespace-nowrap"
                >
                    {showFilters ? "Hide Filters ▲" : "Filters ▼"}
                </button>

            </div>


            {showFilters && (
                <>
                    {/* Diet */}

                    <div>

                        <h3 className="font-semibold mb-3">
                            Diet
                        </h3>

                        <div className="flex gap-3 flex-wrap">

                            <FilterButton
                                label="All"
                                active={filters.diet === "All"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        diet: "All",
                                    }))
                                }
                            />

                            <FilterButton
                                label="Veg"
                                active={filters.diet === "Veg"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        diet: "Veg",
                                    }))
                                }
                            />

                            <FilterButton
                                label="Non-Veg"
                                active={filters.diet === "Non-Veg"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        diet: "Non-Veg",
                                    }))
                                }
                            />

                        </div>

                        {/*Cuisine*/}
                        <div>
                            <h3 className="font-semibold mb-3">
                                Cuisine
                            </h3>

                            <div className="flex gap-3 flex-wrap">

                                <FilterButton
                                    label="All"
                                    active={filters.cuisine === "All"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuisine: "All",
                                        }))
                                    }
                                />
                                <FilterButton
                                    label="Indian"
                                    active={filters.cuisine === "Indian"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuisine: "Indian",
                                        }))
                                    }
                                />
                                <FilterButton
                                    label="Chinese"
                                    active={filters.cuisine === "Chinese"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuisine: "Chinese",
                                        }))
                                    }
                                />
                                <FilterButton
                                    label="Italian"
                                    active={filters.cuisine === "Italian"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuisine: "Italian",
                                        }))
                                    }
                                />
                                <FilterButton
                                    label="American"
                                    active={filters.cuisine === "American"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            cuisine: "American",
                                        }))
                                    }
                                />
                            </div>
                        </div>


                        {/*Taste*/}

                        <div>
                            <h3 className="font-semibold mb-3">
                                Taste
                            </h3>
                            <FilterButton
                                label="All"
                                active={filters.taste === "All"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        taste: "All",
                                    }))
                                }
                            />
                            <FilterButton
                                label="Sweet"
                                active={filters.taste === "Sweet"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        taste: "Sweet",
                                    }))
                                }
                            />
                            <FilterButton
                                label="Savoury"
                                active={filters.taste === "Savoury"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        taste: "Savoury",
                                    }))
                                }
                            />
                        </div>

                        {/*Course*/}

                        <div>
                            <h3 className="font-semibold mb-3">
                                Course
                            </h3>
                            <FilterButton
                                label="All"
                                active={filters.course === "All"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        course: "All",
                                    }))
                                }
                            />
                            <FilterButton
                                label="Main Course"
                                active={filters.course === "Main Course"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        course: "Main Course",
                                    }))
                                }
                            />
                            <FilterButton
                                label="Dessert"
                                active={filters.course === "Dessert"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        course: "Dessert",
                                    }))
                                }
                            />
                            <FilterButton
                                label="Snacks"
                                active={filters.course === "Snacks"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        course: "Snacks",
                                    }))
                                }
                            />
                            <FilterButton
                                label="Starter"
                                active={filters.course === "Starter"}
                                onClick={() =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        course: "Starter",
                                    }))
                                }
                            />
                        </div>
                    </div>

                    {/* Main Course Category */}

                    {filters.course === "Main Course" && (
                        <div>
                            <h3 className="font-semibold mb-3">
                                Main Course Category
                            </h3>

                            <div className="flex gap-3 flex-wrap">

                                <FilterButton
                                    label="All"
                                    active={filters.subcategory === "All"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            subcategory: "All",
                                        }))
                                    }
                                />

                                <FilterButton
                                    label="Rice"
                                    active={filters.subcategory === "Rice"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            subcategory: "Rice",
                                        }))
                                    }
                                />

                                <FilterButton
                                    label="Curry"
                                    active={filters.subcategory === "Curry"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            subcategory: "Curry",
                                        }))
                                    }
                                />

                                <FilterButton
                                    label="Dal"
                                    active={filters.subcategory === "Dal"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            subcategory: "Dal",
                                        }))
                                    }
                                />

                                <FilterButton
                                    label="Pasta"
                                    active={filters.subcategory === "Pasta"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            subcategory: "Pasta",
                                        }))
                                    }
                                />

                                <FilterButton
                                    label="Noodles"
                                    active={filters.subcategory === "Noodles"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            subcategory: "Noodles",
                                        }))
                                    }
                                />

                                <FilterButton
                                    label="Bread"
                                    active={filters.subcategory === "Bread"}
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            subcategory: "Bread",
                                        }))
                                    }
                                />

                            </div>
                        </div>
                    )}

                    {(filters.search ||
                        filters.diet !== "All" ||
                        filters.cuisine !== "All" ||
                        filters.taste !== "All" ||
                        filters.course !== "All" ||
                        filters.subcategory !== "All") && (
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={clearFilters}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                </>
            )}

        </div>
    );
}

export default Filters;