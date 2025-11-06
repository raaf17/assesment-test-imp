"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { apiService } from "@/lib/api";
import { authService } from "@/lib/auth";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await apiService.getPost(Number(id));
      if (response.success) {
        setPost(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
      toast.error("Post not found!");
      router.push("/posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await apiService.deletePost(Number(id));
      if (response.success) {
        toast.success("Post deleted successfully!");
        router.push("/posts");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete post. You can only delete your own posts."
      );
    }
  };

  const currentUser = authService.getUser();
  const isOwner = post && currentUser && post.author_id === currentUser.id;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="alert alert-error">
        <span>Post not found!</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/posts" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Posts
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm opacity-70">
                <div className="flex items-center gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8">
                      <span className="text-xs">
                        {post.author?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span>{post.author?.name}</span>
                </div>
                <span>•</span>
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>

            {isOwner && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={`/posts/edit/${post.id}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      Edit Post
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleDelete} className="text-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete Post
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="divider"></div>

          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {post.updated_at !== post.created_at && (
            <div className="text-xs opacity-50 mt-4">
              Last updated: {formatDate(post.updated_at)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}