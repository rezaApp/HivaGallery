import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-background/10 border-border/10 rounded-xl border backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

export { Card };
