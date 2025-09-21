"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";

type SearchBarProps = {
  onSearch: (username: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleSearch = async (input: string) => {
    if (input.trim() !== "") {
      await onSearch(input.trim());
      setInput("");
    }
  };

  return (
    <div className="space-y-4 bg-pink-400 rounded-lg p-6 w-full max-w-lg font-mono">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(input)}
            placeholder="Enter osu! username..."
            value={input}
            className="text-sm md:text-base md:w-64 w-full text-left pl-2 pr-12 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent bg-white text-black"
          />
        </div>
        <button
          onClick={() => handleSearch(input)}
          className="px-2 md:px-5 border-2 border-black rounded-lg bg-black hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-600 text-white cursor-pointer"
        >
          <div className="text-sm md:text-lg flex items-center gap-2">
            <Plus className="w-3 h-3 md:w-5 md:h-5" />
            Add Player
          </div>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
