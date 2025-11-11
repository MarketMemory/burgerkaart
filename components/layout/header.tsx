"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-blue-600">
              NL
            </div>
            <div>
              <h1 className="text-2xl font-bold">Burgerkaart</h1>
              <p className="text-blue-100 text-xs">Nederland</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-100 transition font-medium">
              Kaart
            </Link>
            <Link href="/municipalities" className="hover:text-blue-100 transition font-medium">
              Gemeenten
            </Link>
            <Link href="/proposals" className="hover:text-blue-100 transition font-medium">
              Voorstellen
            </Link>
            <Link href="/budget-simulator" className="hover:text-blue-100 transition font-medium">
              Budget
            </Link>
            <a href="#about" className="hover:text-blue-100 transition font-medium">
              Over
            </a>
          </nav>

          {/* Mobile Menu */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 hover:bg-blue-500 rounded transition">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4">
            <Link href="/" className="block px-4 py-2 hover:bg-blue-500 rounded transition">
              Kaart
            </Link>
            <Link href="/municipalities" className="block px-4 py-2 hover:bg-blue-500 rounded transition">
              Gemeenten
            </Link>
            <Link href="/proposals" className="block px-4 py-2 hover:bg-blue-500 rounded transition">
              Voorstellen
            </Link>
            <Link href="/budget-simulator" className="block px-4 py-2 hover:bg-blue-500 rounded transition">
              Budget
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
