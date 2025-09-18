"use client";
import React from 'react';

const SearchBar = () => {
  return (
    <div className="space-y-4 bg-amber-500 rounded-lg p-6 w-full max-w-lg">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Enter osu! username..."
          />
        </div>
        <button
          className="px-6"
        >
          Search
        </button>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Try searching for: <strong>cookiezi</strong>, <strong>whitecat</strong>, <strong>vaxei</strong>, <strong>mrekk</strong>, or <strong>badewanne3</strong></p>
      </div>
    </div>
  )
}

export default SearchBar;