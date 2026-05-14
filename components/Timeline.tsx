type TimelineItem = {
  period: string;
  title: string;
  items: string[];
};

type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline__item" key={`${item.period}-${item.title}`}>
          <div className="timeline__marker" aria-hidden="true" />
          <div>
            <p className="timeline__period">{item.period}</p>
            <h3>{item.title}</h3>
            <ul className="clean-list">
              {item.items.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
