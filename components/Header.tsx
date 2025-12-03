import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-slate-100">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Antony Petsas
            </Link>
          </div>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/skills"
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Skills
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-lg text-slate-300 hover:text-blue-400 transition-colors"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
