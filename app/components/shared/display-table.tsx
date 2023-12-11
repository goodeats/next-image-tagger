import { cn } from '@/app/lib/utils';
import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui';
import Link from 'next/link';

type DisplayTableCellLinkProps = {
  href: string;
  children: React.ReactNode | string;
  className?: string;
};

export const DisplayTableCellLink = ({
  href,
  children,
  className,
}: DisplayTableCellLinkProps) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Button asChild variant="link">
        <Link href={href}>
          <p>{children}</p>
        </Link>
      </Button>
    </div>
  );
};

type ClassNameProps = {
  className?: string;
};

type RowCell = {
  children: React.ReactNode | string;
  className?: string;
};

type Row = {
  cells: RowCell[];
  className?: string;
};

type DisplayTableProps = {
  tableProps?: React.LabelHTMLAttributes<HTMLTableElement>;
  tableBodyProps?: ClassNameProps;
  caption?: RowCell;
  headerRows?: RowCell[];
  rows: Row[];
  className?: string;
};

export function DisplayTable({
  tableProps,
  tableBodyProps,
  caption,
  headerRows,
  rows,
  className,
}: DisplayTableProps) {
  const DisplayTableCaption = () => {
    if (!caption) return null;
    return (
      <TableCaption className={caption.className}>
        {caption.children}
      </TableCaption>
    );
  };

  const DisplayTableHeader = () => {
    if (!headerRows?.length) return null;
    return (
      <TableHeader>
        {/* hiding border bottom not working, but that's ok fix later */}
        {/* rounded table body rows effect */}
        <TableRow className="border-b-0 border-0">
          {headerRows.map((column, i) => (
            <TableHead
              key={i}
              className={cn('text-foreground', column.className)}
            >
              {column.children}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
    );
  };

  const DisplayTableRow = ({ row }: { row: Row }) => {
    return (
      <TableRow
        className={cn(
          '[&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg',
          row.className
        )}
      >
        {row.cells.map((cell, i) => (
          <TableCell key={i} className={cell.className}>
            {cell.children}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const DisplayTableRows = () => {
    if (!rows?.length) return null;
    return (
      <>
        {rows.map((row, i) => {
          return <DisplayTableRow key={i} row={row} />;
        })}
      </>
    );
  };

  return (
    <Table className={className} {...tableProps}>
      <DisplayTableCaption />
      <DisplayTableHeader />
      <TableBody className={cn('bg-background', tableBodyProps?.className)}>
        <DisplayTableRows />
      </TableBody>
    </Table>
  );
}
