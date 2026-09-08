import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown, Store } from "lucide-react";
import { likeComment, dislikeComment } from "../../api/comment";

export default function CommentCard({ comment }) {
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);
  const [voted, setVoted] = useState(null);

  const handleLike = async () => {
    if (voted) return;
    setLikes((l) => l + 1);
    setVoted("like");
    try {
      await likeComment(comment.id, likes);
    } catch {
      setLikes((l) => l - 1);
      setVoted(null);
    }
  };

  const handleDislike = async () => {
    if (voted) return;
    setDislikes((d) => d + 1);
    setVoted("dislike");
    try {
      await dislikeComment(comment.id, dislikes);
    } catch {
      setDislikes((d) => d - 1);
      setVoted(null);
    }
  };

  const formattedDate = new Date(comment.createdAt).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-b border-zinc-100 py-5 last:border-0 dark:border-zinc-800">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {comment.name}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{formattedDate}</span>
      </div>

      <div className="mb-3 flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`h-4 w-4 ${
              n <= comment.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700"
            }`}
          />
        ))}
      </div>

      <p className="mb-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        {comment.comment}
      </p>

      {comment.adminReply && (
        <div className="mb-4 flex gap-2 rounded-xl bg-indigo-50/60 p-3 dark:bg-indigo-500/5">
          <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-indigo-600 text-white">
            <Store className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-xs font-semibold text-indigo-700 dark:text-indigo-400">
              پاسخ دیجی‌موبایل
            </p>
            <p className="text-xs leading-6 text-zinc-600 dark:text-zinc-300">
              {comment.adminReply.text}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={voted !== null}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            voted === "like"
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          {likes > 0 && likes}
        </button>
        <button
          onClick={handleDislike}
          disabled={voted !== null}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            voted === "dislike"
              ? "text-rose-600 dark:text-rose-400"
              : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          }`}
        >
          <ThumbsDown className="h-4 w-4" />
          {dislikes > 0 && dislikes}
        </button>
      </div>
    </div>
  );
}