import { cn } from '@/app/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui';

type HeaderProps = {
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  className?: string;
};

type ChildAndClassNameProps = {
  children: React.ReactNode | string;
  className?: string;
};

type DisplayCardProps = {
  cardContentProps?: ChildAndClassNameProps;
  cardDescriptionProps?: ChildAndClassNameProps;
  cardFooterProps?: ChildAndClassNameProps;
  cardHeaderProps?: HeaderProps;
  className?: string;
};

export function DisplayCard({
  cardContentProps,
  cardDescriptionProps,
  cardFooterProps,
  cardHeaderProps,
  className,
}: DisplayCardProps) {
  const DisplayCardHeader = () => {
    if (!cardHeaderProps) return null;

    const { title, description, className } = cardHeaderProps;
    return (
      <CardHeader className={className}>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
    );
  };

  const DisplayCardContent = () => {
    if (!cardContentProps) return null;

    const { children, className } = cardContentProps;
    return <CardContent className={className}>{children}</CardContent>;
  };

  const DisplayCardFooter = () => {
    if (!cardFooterProps) return null;

    const { children, className } = cardFooterProps;
    return <CardFooter className={className}>{children}</CardFooter>;
  };

  return (
    <Card className={cn('w-[380px]', className)}>
      <DisplayCardHeader />
      <DisplayCardContent />
      <DisplayCardFooter />
    </Card>
  );
}
