import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-sans text-xs font-medium uppercase tracking-widest2 text-paper/45",
        className
      )}
    >
      {index && <span className="text-coral">{index}</span>}
      <span className="h-px w-8 bg-current opacity-40" aria-hidden="true" />
      {children}
    </div>
  );
}
