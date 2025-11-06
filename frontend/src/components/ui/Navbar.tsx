"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { authService } from "@/lib/auth";
import { apiService } from "@/lib/api";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = authService.getUser();

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      authService.logout();
      router.push("/login");
    }
  };

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `transition-all duration-200 ${
      isActive(path)
        ? "font-semibold underline underline-offset-4 decoration-2 decoration-primary"
        : "hover:underline hover:underline-offset-4"
    }`;

  return (
    <div className="navbar bg-base-100 shadow-md px-31">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/posts" className={linkClass("/posts")}>
                Posts
              </Link>
            </li>
            <li>
              <Link href="/posts/create" className={linkClass("/posts/create")}>
                Create Post
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand */}
        <Link href="/" className="btn btn-ghost text-xl font-bold tracking-wide">
          📝 Post Manager
        </Link>
      </div>

      {/* Center Section */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/posts" className={linkClass("/posts")}>
              Posts
            </Link>
          </li>
          <li>
            <Link href="/posts/create" className={linkClass("/posts/create")}>
              Create Post
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-5">
            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
              <span className="text-lg font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56"
          >
            <li className="mb-2">
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{user?.name}</span>
                <span className="text-xs opacity-60">{user?.email}</span>
              </div>
            </li>
            <div className="divider my-1"></div>
            <li>
              <button
                onClick={handleLogout}
                className="text-error font-medium hover:underline"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
