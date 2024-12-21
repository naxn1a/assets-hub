interface CardOverviewProps {
  title: string;
  Icon?: React.ElementType;
  value: string;
}

export default function CardOverview(props: CardOverviewProps) {
  const { title, Icon, value } = props;
  return (
    <div>
      <div className="flex justify-between text-gray-400 mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {Icon && <Icon />}
      </div>
      <div>
        <h1 className="text-4xl font-semibold text-right">{value}</h1>
      </div>
    </div>
  );
}
