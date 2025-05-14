"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CommentRatings } from "@/components/ui/rating";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { reviewSchema, ReviewSchemaInput } from "../_schemas/review.schema";

export function ReviewForm({
  submitReviewHandler,
}: {
  submitReviewHandler: (review: string, currentRating: number) => Promise<void>;
}) {
  const form = useForm<ReviewSchemaInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      review: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const [currentRating, setCurrentRating] = useState(1);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref } = form.register("review");
  const dirtyMessage = form.formState.dirtyFields.review;

  const adjustTextareaHeight = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${event.target.scrollHeight}px`;
    }
  };

  const preventBreakRow = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await form.handleSubmit(onSubmit)();
    }
  };

  function onSubmit({ review }: ReviewSchemaInput) {
    startTransition(() => {
      submitReviewHandler(review, currentRating);
    });
  }

  return (
    <div className="grid gap-8">
      <CommentRatings
        currentRating={currentRating}
        setCurrentRating={setCurrentRating}
        totalStars={10}
        variant="yellow"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Textarea
                    rows={5}
                    className="peer bg-transparent"
                    onKeyDown={(event) => preventBreakRow(event)}
                    onInput={adjustTextareaHeight}
                    {...field}
                    ref={(element) => {
                      ref(element);
                      textAreaRef.current = element;
                    }}
                  />
                </FormControl>
                <FormLabel
                  htmlFor="review"
                  className={cn(
                    "bg-background text-foreground/70 absolute start-2.5 top-4.5 -z-10 -translate-y-1.5 px-1 transition-all duration-300 peer-focus:top-0 peer-focus:z-10 peer-focus:scale-75",
                    dirtyMessage ? "top-0 z-10 scale-75" : null,
                  )}
                >
                  Review
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} variant="secondary">
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
