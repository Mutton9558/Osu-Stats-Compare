"use client";
import React, { useState } from "react";

const SearchBar = ({ onSearch }: { onSearch: (username: string) => void }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  return (
    <div className="space-y-4 bg-pink-400 rounded-lg p-6 w-full max-w-lg font-mono">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            className="border-2 border-black pl-2 pr-2 rounded-md w-72"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Enter osu! username..."
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 border-2 border-black rounded-lg bg-black text-white cursor-pointer"
        >
          Search
        </button>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>
          Try searching for: <strong>cookiezi</strong>,{" "}
          <strong>whitecat</strong>, <strong>vaxei</strong>,{" "}
          <strong>mrekk</strong>, or <strong>badewanne3</strong>
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
