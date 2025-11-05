"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiService } from "@/lib/api";
import { PostFormData } from "@/types";
import PostForm from "@/components/forms/PostForm";
import toast from "react-hot-toast";

export default function CreatePostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);

    try {
      const response = await apiService.createPost(data);
      if (response.success) {
        toast.success("Post created successfully!");
        router.push("/posts");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to create post. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
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
          <h2 className="card-title text-3xl font-bold mb-6">Create New Post</h2>

          <PostForm
            onSubmit={handleSubmit}
            submitLabel="Create Post"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}