import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Review } from "./reviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils/cn";

export function ReviewCard({
  review,
  personal,
  className,
}: {
  review: Review;
  personal?: boolean;
  className?: string;
}) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            {!personal ? (
              <AvatarImage
                src={
                  review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`
                    : "/images/profile-avatar-placeholder.png"
                }
              />
            ) : (
              <AvatarImage src={review.author_details.avatar_path ?? ""} />
            )}
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col justify-center gap-2">
            <p className="text-foreground/70">
              A review by{" "}
              <span className="text-foreground">{review.author}</span>
            </p>

            <div className="flex items-center gap-2">
              {review.author_details.rating !== null && (
                <div className="bg-muted flex w-fit items-center gap-1 rounded-lg p-1.5">
                  <Star className="size-4" />
                  <p className="text-sm">
                    {review.author_details.rating * 10}%
                  </p>
                </div>
              )}
              <p className="text-foreground/70 text-sm font-light">
                Written by {review.author} &nbsp;
                <span className="text-sm">
                  {new Date(review.created_at).toDateString()}
                </span>
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown>{review.content}</Markdown>
      </CardContent>
    </Card>
  );
}
