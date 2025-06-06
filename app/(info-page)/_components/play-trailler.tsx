"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlayCircle } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function PlayTrailer({ videoKey }: { videoKey: string }) {
  return (
    <Dialog>
      <DialogTrigger className="z-20">
        <div className="flex w-fit cursor-pointer items-center gap-2">
          <PlayCircle />
          <p>Play trailer</p>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <VisuallyHidden asChild>
          <DialogTitle>Trailer title</DialogTitle>
        </VisuallyHidden>
        <iframe
          style={{
            borderRadius: "1rem",
          }}
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${videoKey}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  );
}
