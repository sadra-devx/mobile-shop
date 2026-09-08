import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/useAuth";
import { postComment } from "../../api/comment";

export default function CommentForm({ product }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user && !name.trim()) {
      toast.error("لطفاً نام خود را وارد کنید");
      return;
    }
    if (rating === 0) {
      toast.error("لطفاً امتیاز خود را انتخاب کنید");
      return;
    }
    if (!text.trim()) {
      toast.error("لطفاً متن نظر را وارد کنید");
      return;
    }

    try {
      setLoading(true);
      await postComment(user, product, {
        name: user ? user.name : name,
        rating,
        text,
      });
      toast.success("نظر شما ثبت شد و پس از تایید نمایش داده می‌شود");
      setName("");
      setRating(0);
      setText("");
    } catch {
      toast.error("ثبت نظر با خطا مواجه شد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
    >
      <h3 className="font-bold text-zinc-800 dark:text-zinc-100">ثبت نظر شما</h3>

      {!user && (
        <input
          type="text"
          placeholder="نام شما"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl bg-zinc-100 px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-100"
        />
      )}

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                n <= (hoverRating || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700"
              }`}
            />
          </button>
        ))}
      </div>

      <textarea
        placeholder="نظر خود را درباره‌ی این محصول بنویسید..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        className="resize-none rounded-xl bg-zinc-100 px-4 py-2.5 text-sm outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-100"
      />

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? "در حال ارسال..." : "ثبت نظر"}
      </button>
    </form>
  );
}