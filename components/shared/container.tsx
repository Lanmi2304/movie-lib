import { cn } from "@/lib/utils/cn";
import { type HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  isComponent?: boolean;
}

export function Container({
  className,
  children,
  isComponent = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "container px-4 lg:px-8",
        !isComponent && "mb-14 lg:mb-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
