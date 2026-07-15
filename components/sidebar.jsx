"use client"
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white border-r border-gray-800 shadow-2xl flex flex-col">

      {/* Logo / Header */}
      <div className="px-6 py-8 border-b border-gray-800">

        <h1 className="text-3xl font-extrabold tracking-wide">
          Admin Panel
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Store Management System
        </p>

      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6 space-y-2">

        <Link
          href="/admin"
          className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-white hover:text-black transition duration-200 font-medium"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/admin/catogories"
          className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-white hover:text-black transition duration-200 font-medium"
        >
          📂 Categories
        </Link>

        <Link
          href="/admin/products"
          className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-white hover:text-black transition duration-200 font-medium"
        >
          🛍 Products
        </Link>

        <Link
          href="/admin/users"
          className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-white hover:text-black transition duration-200 font-medium"
        >
          👤 Users
        </Link>

        <Link
          href="/admin/orders"
          className="block rounded-xl px-5 py-3 text-gray-300 hover:bg-white hover:text-black transition duration-200 font-medium"
        >
          📦 Orders
        </Link>

      </div>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-gray-800">

        <div className="bg-gray-900 rounded-xl p-4 text-center">

          <h3 className="font-semibold">
            Ecommerce Admin
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Manage products, users & orders
          </p>

        </div>

      </div>

    </nav>
  );
}