import { MessageSquare } from "lucide-react";
import CommentCard from "./CommentCard";

export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-zinc-300 py-12 text-center dark:border-zinc-700">
        <MessageSquare className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          هنوز نظری برای این محصول ثبت نشده
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-5 dark:border-zinc-700 dark:bg-zinc-900">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}