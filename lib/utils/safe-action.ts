import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  // Can also be an async function.
  handleServerError(e) {
    // Log to console.
    console.error("Action error:", e.message);

    // In this case, we can use the 'MyCustomError` class to unmask errors
    // and return them with their actual messages to the client.
    if (e instanceof Error) {
      return e.message;
    }

    // Every other error that occurs will be masked with the default message.
    return "Something went wrong";
  },
});
