"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "./review-card";
import { Skeleton } from "@/components/ui/skeleton";

export interface Review {
  id: string;
  content: string;
  author: string;
  created_at: string;
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
  const [showAll, setShowAll] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state on ID/type change
    setReviews([]);
    setPage(1);
    setShowAll(false);
    setTotalPages(0);
  }, [id, type]);

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/reviews?type=${type}&id=${id}&page=${page}`,
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");

        const data = await res.json();
        setReviews((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError("Failed to load reviews. Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [id, page, type]);

  const handleShowAll = () => setShowAll(true);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="grid gap-4">
      <h3 className="text-foreground/70 text-2xl">Reviews</h3>

      {error && <div className="text-red-500">{error}</div>}

      {loading && reviews.length === 0 && (
        <>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full" />
          ))}
        </>
      )}

      {!loading && reviews.length === 0 && !error && (
        <div>No reviews found for this media.</div>
      )}

      {reviews.length > 0 && (
        <div className="flex flex-col gap-4">
          {!showAll ? (
            <>
              <div className="flex flex-col gap-2.5">
                {reviews.slice(0, 3).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              <Button variant="secondary" onClick={handleShowAll}>
                Show All Reviews
              </Button>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2.5">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
              {page < totalPages && (
                <Button
                  variant="secondary"
                  onClick={handleLoadMore}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
