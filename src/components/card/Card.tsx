interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <section className={`shadow-lg rounded-xl p-4 border ${className}`}>
      {children}
    </section>
  );
}
