import { useState, useEffect, useRef } from "react";

export default function TagDropdown({ tags, selectedTag, onTagChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Close dropdown when clicking outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagSelect = (tag) => {
    onTagChange(tag);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Filter by Tag:
        </label>
        <div
          className="relative flex-1 md:flex-none md:min-w-[250px]"
          ref={dropdownRef}
        >
          {/* Dropdown Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg text-gray-700 font-medium shadow-sm hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all flex items-center justify-between"
          >
            <span>{selectedTag === "All" ? "All Posts" : selectedTag}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`w-full capitalize px-4 py-2.5 text-left hover:bg-orange-50 transition-colors ${
                    selectedTag === tag
                      ? "bg-orange-100 text-orange-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {tag === "All" ? "All Posts" : tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
