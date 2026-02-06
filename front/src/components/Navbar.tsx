import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              className="h-5 w-5 text-text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold text-text">Pulse</span>
        </Link>

        <nav className="gap-8 items-center hidden md:flex">
          <Link
            to="/features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            to="/how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>
        {user && (
          <button
            onClick={logout}
            className="rounded-md border border-primary/30 cursor-pointer px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted-primary hover:text-primary"
          >
            Log out
          </button>
        )}

        {!user && (
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted-primary hover:text-primary"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-primary text-center px-3 py-2 text-sm font-[700] text-white transition-colors hover:bg-primary/90"
            >
              Get Started
            </Link>
          </div>
        )}

        <button
          aria-label="Toggle menu"
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="cursor-pointer h-6 w-6" />
          ) : (
            <Menu className="cursor-pointer h-6 w-6" />
          )}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav
            className="flex flex-col gap-2 px-4 py-4"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Link
              to="/features"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Features
            </Link>
            <Link
              to="/how-it-works"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              About
            </Link>
            {user && (
              <button
                onClick={logout}
                className="rounded-md text-start cursor-pointer px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Logout
              </button>
            )}
            {!user && (
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
                <Link
                  to="/login"
                  className="rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted-primary hover:text-primary"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-md bg-primary text-center px-3 py-2 text-sm font-[700] text-white transition-colors hover:bg-primary/90"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
