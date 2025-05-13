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
import { Bookmark, Heart, List, Star } from "lucide-react";
import { addToFavoritesAction } from "../_actions/add-to-favorites.action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReviewForm } from "./review-form";

export function MovieActions({
  movie,
  isFavorite: initialIsFavorite,
}: {
  movie: Movie;
  isFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  const mediaType = pathname.startsWith("/m") ? "movie" : "tv";

  const toggleFavoriteHandler = () => {
    setIsFavorite((prev) => !prev);

    startTransition(async () => {
      try {
        const res = await addToFavoritesAction({
          mediaType,
          movieId: movie.id,
          title: movie.title ?? movie.name,
          posterPath: movie.poster_path,
          voteAverage: movie.vote_average ?? 0,
        });
        if (res?.serverError) throw new Error(res.serverError);
        toast.success(
          isFavorite
            ? "Successfully removed from favorites!"
            : "Successfully added to favorites!",
        );
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : "Unknown error occurred!",
        );
        toast.error(
          error instanceof Error ? error.message : "Unknown error occurred!",
        );
        setIsFavorite(false);
      }
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
            <p>Add to your watched list</p>
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

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="cursor-pointer rounded-full p-3"
              onClick={() => setReviewDialogOpen(true)}
            >
              <Star className="text-black" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to your watch next list</p>
          </TooltipContent>
        </Tooltip>

        <Dialog
          open={reviewDialogOpen}
          onOpenChange={() => setReviewDialogOpen((prev) => !prev)}
        >
          <DialogTrigger className="hidden">Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Leave review for {`'${movie.title ?? movie.name}'`}
              </DialogTitle>
              <DialogDescription>{/* FORM MAYBE  */}</DialogDescription>
            </DialogHeader>
            <ReviewForm />
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </div>
  );
}
