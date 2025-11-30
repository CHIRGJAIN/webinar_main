interface OttShellProps {
  children: React.ReactNode;
  className?: string;
}

export const OttShell = ({ children, className }: OttShellProps) => (
  <section className={`w-full px-4 pb-12 pt-8 text-foreground md:px-0 ${className ?? ""}`}>
    {children}
  </section>
);
