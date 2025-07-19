'use client';
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md transition-colors duration-300 hover:bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            Contact Management
          </Link>

          {/* Navigation Links */}
          <div className="space-x-4 flex items-center">
            <Link
              href="/"
              className="text-medium text-gray-700 hover:text-black transition-colors duration-300 font-medium px-3 py-2 rounded hover:bg-gray-200"
            >
              Home
            </Link>

            <Link
              href="/contacts/new"
              className="bg-green-500 text-white font-medium px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Add Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
