interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="text-base font-semibold text-gold-deep">{eyebrow}</p>}
      <h2 id={id} className="mt-1 text-3xl font-bold leading-snug text-brand sm:text-4xl">
        {title}
      </h2>
      <div className="mt-3 h-0.5 w-14 bg-gold" aria-hidden="true" />
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </div>
  );
}
