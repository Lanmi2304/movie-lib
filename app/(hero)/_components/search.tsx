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
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { searchSchema, SearchSchemaInput } from "../_schemas/search.schema";
import { useRouter } from "next/navigation";

export function Search() {
  // 1. Define your form.
  const form = useForm<SearchSchemaInput>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      term: "",
    },
  });

  // const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit({ term }: SearchSchemaInput) {
    // startTransition(async () => {
    //   await searchAction({ term });
    // });
    router.push(`/movie-results?searchTerm=${term}&page=1`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full relative">
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" className="pr-20" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="absolute top-6 right-0">
          Search
        </Button>
      </form>
    </Form>
  );
}
