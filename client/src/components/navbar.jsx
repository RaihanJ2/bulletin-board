import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../hook/useAuth";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const { isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl rubik font-bold hover:scale-105 scale-95 duration-300 text-white p-2 rounded bg-orange-500">
              Postly™
            </span>
          </Link>

          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-orange-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <ProfileDropdown />
              </>
            ) : (
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
