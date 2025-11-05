"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PostFormData } from "@/types";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  submitLabel?: string;
  isLoading?: boolean;
}

export default function PostForm({
  initialData,
  onSubmit,
  submitLabel = "Submit",
  isLoading = false,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="form-control">
        <label className="label mb-2">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Enter post title"
          className={`input input-bordered w-full ${
            errors.title ? "input-error" : ""
          }`}
          {...register("title")}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.title.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control">
        <label className="label mb-2">
          <span className="label-text">Content</span>
        </label>
        <textarea
          placeholder="Write your post content here..."
          className={`textarea textarea-bordered h-32 w-full ${
            errors.content ? "textarea-error" : ""
          }`}
          {...register("content")}
        />
        {errors.content && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.content.message}
            </span>
          </label>
        )}
      </div>

      <div className="form-control mt-6">
        <button
          type="submit"
          className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : submitLabel}
        </button>
      </div>
    </form>
  );
}