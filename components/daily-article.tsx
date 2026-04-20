interface DailyArticleProps {
  title: string;
  paragraphs: string[];
}

export function DailyArticle({ title, paragraphs }: DailyArticleProps) {
  return (
    <article className="rounded-xl border bg-card p-6 space-y-4">
      <h2 className="text-xl font-semibold font-serif flex items-center gap-2">
        <span>📝</span>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-7 text-muted-foreground">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
