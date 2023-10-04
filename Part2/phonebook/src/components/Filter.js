import React from "react";

const Filter = ({ search, handleFilterChange }) => {
    return (
        <div> filter shown with: <input
            value={search}
            onChange={handleFilterChange}
        />
        </div>
    )
}

export default Filter