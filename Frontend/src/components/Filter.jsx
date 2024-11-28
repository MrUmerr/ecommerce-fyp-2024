import { useState } from "react";

const Filter = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [name, setName] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleFilter = () => {
    const filters = { category, minPrice, maxPrice, name };
    onFilter(filters);
  };

  const handleReset = (e) => {
    e.preventDefault(); // Prevent default behavior
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setName("");
    onFilter({ category: "", minPrice: "", maxPrice: "", name: "" });
  };

  return (
    <div className="filter-container p-4 rounded shadow-md md:bg-slate-50 md:dark:bg-slate-950">
      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-pink-500 text-white px-4 py-2 rounded-md w-full md:hidden mb-4"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Section */}
      <div
        className={`flex flex-wrap items-center gap-4 ${
          showFilters ? "block" : "hidden md:flex"
        }`}
      >
        <h2 className="text-lg font-semibold w-full md:w-auto text-center">
          Get Filtered Data:
        </h2>

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 w-full md:w-48 border rounded dark:text-white dark:bg-slate-950"
        >
          <option value="">Category</option>
          <option value="Men">Mens</option>
          <option value="Girls">Girls</option>
          <option value="Kids">Kids</option>
        </select>

        {/* Min Price */}
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min price"
          className="p-2 border rounded w-full md:w-32 dark:text-white dark:bg-slate-950"
        />

        {/* Max Price */}
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          className="p-2 border rounded w-full md:w-32 dark:text-white dark:bg-slate-950"
        />

        {/* Name Search */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          className="p-2 border rounded w-full md:w-60 dark:text-white dark:bg-slate-950"
        />

        {/* Buttons */}
        <div className="flex flex-wrap w-full md:w-auto gap-4">
          <button
            type="button"
            onClick={handleFilter}
            className="bg-pink-500 text-white px-12 py-2 rounded hover:bg-pink-600 w-full md:w-auto"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
