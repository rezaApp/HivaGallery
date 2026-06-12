import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-card border-border rounded-xl border", className)}
      {...props}
    />
  );
}

export { Card };
