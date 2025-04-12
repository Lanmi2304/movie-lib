"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { searchSchema, SearchSchemaInput } from "../_schemas/search.schema";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function Search({ className }: { className?: string }) {
  const form = useForm<SearchSchemaInput>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      term: "",
    },
  });

  const router = useRouter();

  function onSubmit({ term }: SearchSchemaInput) {
    router.push(`/movie-results?searchTerm=${term}&page=1`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative mt-10 w-full"
      >
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
