import { cn } from "@/lib/utils";

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "h-[50px] shrink-0 border-t flex items-center justify-center text-xs text-muted-foreground",
        className
      )}
    >
      จัดทำโดย Kittipat Namjak รหัสนักศึกษา 680610654
    </footer>
  );
}