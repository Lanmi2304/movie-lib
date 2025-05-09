"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Review {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  author_details: {
    avatar_path: string | null;
    name: string;
    rating: number;
    username: string;
  };
}

export function Reviews({ type, id }: { type: "tv" | "movie"; id: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/reviews?type=${type}&id=${id}&page=${page}`,
        );
        const data = await res.json();

        setReviews((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.log("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [id, page, type]);

  const loadMoreHandler = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-red-500">
      <h3 className="text-foreground/70 text-2xl">Reviews</h3>

      <div>
        {reviews.map((review, idx) => (
          <h1 key={idx}>{review.author}</h1>
        ))}
      </div>

      {page < totalPages && (
        <Button onClick={loadMoreHandler}>
          {loading ? "Loading..." : "Load More"}
        </Button>
      )}
    </div>
  );
}
