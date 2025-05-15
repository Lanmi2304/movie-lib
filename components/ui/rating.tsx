import React, { Dispatch, SetStateAction, useState } from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/lib/hooks/use-mobile";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-yellow-200",
  },
};

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  currentRating: number;
  rating?: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement<{
    size?: number;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
    "data-star-index"?: number;
  }>;
  variant?: keyof typeof ratingVariants;
  onRatingChange?: (rating: number) => void;
  setCurrentRating: Dispatch<SetStateAction<number>>;
}

export const CommentRatings = ({
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  onRatingChange,
  currentRating,
  setCurrentRating,
  ...props
}: RatingsProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovering(true);
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0",
    );
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0",
    );
    setCurrentRating(starIndex);
    setHoverRating(null);
    onRatingChange?.(starIndex);
  };

  const displayRating = hoverRating ?? currentRating;
  const fullStars = Math.floor(displayRating);
  const partialStar =
    displayRating % 1 > 0 ? (
      <PartialStar
        fillPercentage={displayRating % 1}
        size={size}
        className={cn(ratingVariants[variant].star)}
        Icon={Icon}
      />
    ) : null;

  return (
    <>
      {!isMobile && (
        <div
          className={cn("flex w-fit items-center gap-2")}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          <div className="flex items-center" onMouseEnter={handleMouseEnter}>
            {[...Array(fullStars)].map((_, i) =>
              React.cloneElement(Icon, {
                key: i,
                size,
                className: cn(
                  fill ? "fill-current stroke-1" : "fill-transparent",
                  ratingVariants[variant].star,
                ),
                onClick: handleClick,
                onMouseEnter: handleMouseEnter,
                "data-star-index": i + 1,
              }),
            )}
            {partialStar}
            {[
              ...Array(
                Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0)),
              ),
            ].map((_, i) =>
              React.cloneElement(Icon, {
                key: i + fullStars + 1,
                size,
                className: cn("stroke-1", ratingVariants[variant].emptyStar),
                onClick: handleClick,
                onMouseEnter: handleMouseEnter,
                "data-star-index": i + fullStars + 1,
              }),
            )}
          </div>
          <span className="text-muted-foreground">
            Rate: <span className="text-foreground">{`${currentRating}`}</span>
          </span>
        </div>
      )}

      {isMobile && (
        <div
          className={cn("flex w-fit items-center gap-2")}
          // onMouseLeave={handleMouseLeave}
          {...props}
        >
          <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) =>
              React.cloneElement(Icon, {
                key: i,
                size,
                className: cn(
                  fill ? "fill-current stroke-1" : "fill-transparent",
                  ratingVariants[variant].star,
                ),
                onClick: handleClick,
                // onMouseEnter: handleMouseEnter,
                "data-star-index": i + 1,
              }),
            )}
            {partialStar}
            {[
              ...Array(
                Math.max(0, totalStars - fullStars - (partialStar ? 1 : 0)),
              ),
            ].map((_, i) =>
              React.cloneElement(Icon, {
                key: i + fullStars + 1,
                size,
                className: cn("stroke-1", ratingVariants[variant].emptyStar),
                onClick: handleClick,
                // onMouseEnter: handleMouseEnter,
                "data-star-index": i + fullStars + 1,
              }),
            )}
          </div>
          <span className="text-muted-foreground">
            Rate: <span className="text-foreground">{`${currentRating}`}</span>
          </span>
        </div>
      )}
    </>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement<{ size?: number; className?: string }>;
}

const PartialStar = ({ ...props }: PartialStarProps) => {
  const { fillPercentage, size, className, Icon } = props;
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};
