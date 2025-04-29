"use client";

import { useState, useTransition } from "react";
import { Movie } from "@/app/search-results/page";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, Heart, List } from "lucide-react";
import { addToFavoritesAction } from "../_actions/add-to-favorites.action";
import { cn } from "@/lib/utils";

export function MovieActions({
  movie,
  isFavorite: initialIsFavorite,
}: {
  movie: Movie;
  isFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  const toggleFavoriteHandler = () => {
    setIsFavorite((prev) => !prev);

    startTransition(() => {
      addToFavoritesAction({
        type: "movie",
        movieId: movie.id,
      }).catch(() => {
        setIsFavorite((prev) => !prev);
      });
    });
  };

  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                "cursor-pointer rounded-full p-3 transition-colors",
                isFavorite && "bg-red-500",
              )}
              onClick={toggleFavoriteHandler}
              disabled={isPending}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Heart className={cn("text-black", isFavorite && "text-white")} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="cursor-pointer rounded-full p-3">
              <Bookmark className="text-black" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to your watchlist</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="cursor-pointer rounded-full p-3">
              <List className="text-black" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to your watch next list</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
