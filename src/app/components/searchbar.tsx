"use client";
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

type SearchBarProps = {
  onSearch: (username: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState("");

  const handleSearch = (input: string) => {
    console.log(input);
    if (input.trim() !== "") {
      onSearch(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(input);
    }
  };

  return (
    <div className="space-y-4 bg-amber-500 rounded-lg p-6 w-full max-w-lg">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Enter osu! username..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white text-black'
          />
        </div>
        <button
          className="p-2 cursor-pointer rounded-lg bg-red-400/10 hover:bg-red-400/20 transition-colors flex items-center justify-center"
          onClick={() => handleSearch(input)}
        >
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Player
          </div>
        </button>
      </div>
    </div>
  )
}

export default SearchBar;