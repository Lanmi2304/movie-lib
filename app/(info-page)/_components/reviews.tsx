"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "./review-card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getPersonalReviewsAction } from "../_actions/get-personal-reviews.action";
import { authClient } from "@/lib/auth-client";
import { PersonalReview, Review } from "../_types/reviews.type";

export function Reviews({
  type,
  id,
}: {
  type: "tv" | "movie";
  id: string;
  review: PersonalReview;
}) {
  const [cacheKey, setCacheKey] = useState(`${type}-${id}`);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const { data: session } = authClient.useSession();

  const { data } = useQuery(
    queryOptions({
      queryKey: ["submitReviews"],
      queryFn: () => getPersonalReviewsAction({ mediaId: Number(id) }),
    }),
  );

  const {
    data: reviewsData,
    isFetching,
    isError,
  } = useQuery(
    queryOptions({
      queryKey: ["getReviews"],
      queryFn: async () => {
        const data = await fetch(
          `/api/reviews?type=${type}&id=${id}&page=${page}`,
        ).then((data) => data.json());
        return data;
      },
    }),
  );

  const personalReview = data?.data?.[0];

  const handleShowAll = () => setShowAll(true);

  const handleLoadMore = () => {
    if (page < reviewsData?.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  const review = {
    id: session?.user.id ?? "",
    content: personalReview?.review ?? "",
    author: session?.user.name ?? "",
    created_at: personalReview?.createdAt ?? "",
    author_details: {
      avatar_path: session?.user.image ?? null,
      name: session?.user.name ?? "",
      rating: personalReview?.rate ?? 0,
      username: session?.user.name ?? "",
    },
  };

  useEffect(() => {
    const newKey = `${type}-${id}`;
    if (newKey !== cacheKey) {
      setCacheKey(newKey);
      setReviews([]);
      setPage(1);
      setShowAll(false);
    }
  }, [type, id, cacheKey]);

  useEffect(() => {
    if (page === 1) {
      setReviews(reviewsData?.results);
    } else {
      const existingIds = new Set(reviews.map((review) => review.id));
      const uniqueNewReviews = reviewsData?.results.filter(
        (review: Review) => !existingIds.has(review.id),
      );
      setReviews((prev) => [...prev, ...uniqueNewReviews]);
    }
  }, [cacheKey, page, type, id]);

  return (
    <div className="grid gap-4">
      <h3 className="text-foreground/70 text-2xl">Reviews</h3>
      {isError && <div className="text-red-500">{isError}</div>}

      {isFetching && reviewsData?.results.length !== 0 && (
        <>
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={`skeleton-${idx}`} className="h-40 w-full" />
          ))}
        </>
      )}

      {!isFetching &&
        reviewsData?.results.length === 0 &&
        !isError &&
        !personalReview && <div>No reviews found for this media.</div>}

      {personalReview && (
        <ReviewCard
          review={review}
          personal={true}
          className="border-amber-500"
        />
      )}
      {reviewsData?.results.length > 0 && (
        <div className="flex flex-col gap-4">
          {!showAll ? (
            <>
              <div className="flex flex-col gap-2.5">
                {reviewsData.results.slice(0, 3).map((review: Review) => (
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
                {reviewsData.results.map((review: Review) => (
                  <ReviewCard
                    key={`${cacheKey}-${review.id}`}
                    review={review}
                  />
                ))}
              </div>
              {page < reviewsData.total_pages && (
                <Button
                  variant="secondary"
                  onClick={handleLoadMore}
                  disabled={isFetching}
                >
                  {isFetching ? "Loading..." : "Load More"}
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
