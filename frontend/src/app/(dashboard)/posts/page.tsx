"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "@/lib/api";
import { authService } from "@/lib/auth";
import { Post } from "@/types";
import PostCard from "@/components/ui/PostCard";
import Pagination from "@/components/ui/Pagination";
import toast from "react-hot-toast";

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await apiService.getPosts(page, 9);
      if (response.success) {
        setPosts(response.data);
        if (response.meta) {
          setLastPage(response.meta.last_page);
        }
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await apiService.deletePost(id);
      if (response.success) {
        fetchPosts(currentPage);
        toast.success("Post deleted successfully!");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete post. You can only delete your own posts."
      );
    }
  };

  const currentUser = authService.getUser();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">All Posts</h1>
          <p className="text-base-content/60 mt-2">
            Browse and manage all posts
          </p>
        </div>
        <button
          onClick={() => router.push("/posts/create")}
          className="btn btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Create Post
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton h-64 w-full"></div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                showActions={post.author_id === currentUser?.id}
              />
            ))}
          </div>

          {lastPage > 1 && (
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No posts found. Be the first to create one!</span>
        </div>
      )}
    </div>
  );
}