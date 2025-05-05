"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { z } from "zod";

export const searchSchema = z.object({
  term: z.string().min(2, {
    message: "Term must be at least 2 characters.",
  }),
});

export type SearchSchemaInput = z.infer<typeof searchSchema>;

export function Search({ className }: { className?: string }) {
  const form = useForm<SearchSchemaInput>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      term: "",
    },
  });

  const router = useRouter();

  function onSubmit({ term }: SearchSchemaInput) {
    router.push(`/search-results?searchTerm=${term}&page=1`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative w-full">
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search for desired movie"
                  className={cn("pr-20", className)}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="absolute top-0 right-0">
          Search
        </Button>
      </form>
    </Form>
  );
}
