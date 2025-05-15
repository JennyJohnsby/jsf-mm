import React from "react";

interface SortingProps {
  sortOrder: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
}

const Sorting: React.FC<SortingProps> = ({ sortOrder, onSortChange }) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="sort" className="font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value as "asc" | "desc")}
        className="p-2 border rounded"
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;
