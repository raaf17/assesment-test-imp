import Link from "next/link";
import { Post } from "@/types";
import { formatDate, truncateText } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
  showActions?: boolean;
}

export default function PostCard({
  post,
  onDelete,
  showActions = true,
}: PostCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <h2 className="card-title">
          {post.title}
          <div className="badge badge-secondary">New</div>
        </h2>
        <p className="text-sm opacity-70">
          By {post.author?.name || "Unknown"} • {formatDate(post.created_at)}
        </p>
        <p className="mt-2">{truncateText(post.content, 150)}</p>
        <div className="card-actions justify-end mt-4">
          <Link href={`/posts/${post.id}`} className="btn btn-primary btn-sm">
            Read More
          </Link>
          {showActions && (
            <>
              <Link
                href={`/posts/edit/${post.id}`}
                className="btn btn-info btn-sm"
              >
                Edit
              </Link>
              {onDelete && (
                <button
                  onClick={() => onDelete(post.id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}