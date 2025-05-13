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
  const [cacheKey, setCacheKey] = useState(`${type}-${id}`);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset state when cache key changes
  useEffect(() => {
    const newKey = `${type}-${id}`;
    if (newKey !== cacheKey) {
      setCacheKey(newKey);
      setReviews([]);
      setPage(1);
      setShowAll(false);
      setTotalPages(0);
      setError(null);
    }
  }, [type, id, cacheKey]);

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

        // If its page 1 replace the reviews otherwise append
        if (page === 1) {
          setReviews(data.results);
        } else {
          // only unique ids
          const existingIds = new Set(reviews.map((review) => review.id));
          const uniqueNewReviews = data.results.filter(
            (review: Review) => !existingIds.has(review.id),
          );
          setReviews((prev) => [...prev, ...uniqueNewReviews]);
        }

        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to load reviews. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [cacheKey, page, type, id]);

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
            <Skeleton key={`skeleton-${idx}`} className="h-40 w-full" />
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
                  <ReviewCard
                    key={`${cacheKey}-${review.id}`}
                    review={review}
                  />
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
                  <ReviewCard
                    key={`${cacheKey}-${review.id}`}
                    review={review}
                  />
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
