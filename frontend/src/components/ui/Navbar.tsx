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

  return (
    <div className="navbar bg-base-100 shadow-lg px-30">
      <div className="navbar-start">
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/posts/create">Create Post</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          📝 Post Manager
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href="/"
              className={isActive("/") ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              className={isActive("/posts") ? "active" : ""}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              href="/posts/create"
              className={isActive("/posts/create") ? "active" : ""}
            >
              Create Post
            </Link>
          </li>
        </ul>
      </div>

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
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="menu-title">
              <span>{user?.name}</span>
            </li>
            <li className="menu-title">
              <span className="text-xs opacity-60">{user?.email}</span>
            </li>
            <li>
              <button onClick={handleLogout} className="text-error">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}