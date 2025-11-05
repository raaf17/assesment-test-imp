"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { apiService } from "@/lib/api";
import { authService } from "@/lib/auth";
import { Post, PostFormData } from "@/types";
import PostForm from "@/components/forms/PostForm";
import toast from "react-hot-toast";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await apiService.getPost(Number(id));
      if (response.success) {
        const fetchedPost = response.data;
        const currentUser = authService.getUser();

        // Check if user owns the post
        if (currentUser && fetchedPost.author_id !== currentUser.id) {
          toast.error("You can only edit your own posts!");
          router.push("/posts");
          return;
        }

        setPost(fetchedPost);
      }
    } catch (error) {
      console.error("Failed to fetch post:", error);
      toast.error("Post not found!");
      router.push("/posts");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);

    try {
      const response = await apiService.updatePost(Number(id), data);
      if (response.success) {
        toast.success("Post updated successfully!");
        router.push(`/posts/${id}`);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update post. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={`/posts/${id}`} className="btn btn-ghost btn-sm">
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
          Back to Post
        </Link>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold mb-6">Edit Post</h2>

          <PostForm
            initialData={{
              title: post.title,
              content: post.content,
            }}
            onSubmit={handleSubmit}
            submitLabel="Update Post"
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}