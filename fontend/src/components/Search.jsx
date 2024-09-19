import React, { useState, useMemo, useEffect } from "react";
import { useCallback } from "react";
import HotelService from "../services/hotel.service";
import debouce from "lodash.debounce";

const Search = ({ setHotels }) => {
  const handleSearch = useCallback(async (e) => {
    console.log(e);

    // Hotel Search
    const res = await HotelService.hotelSearch(e.target.value);

    setHotels(res.data.searched ?? []);
  }, []);

  const debouncedList = useMemo(() => {
    return debouce(handleSearch, 500);
  }, [handleSearch]);

  useEffect(() => {
    return () => {
      debouncedList.cancel();
    };
  });

  return (
    <div className="flex justify-center">
      <label
        className="input input-bordered flex items-center gap-2 mt-6"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <input
          type="text"
          className="grow"
          placeholder="Search Room"
          onChange={debouncedList}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
};

export default Search;
