'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IInterestConfig } from './interest-rate-calculator';
import { thousandSeperator } from '@/lib/helper';
import { usePaginationQueries } from '@/hooks/useQueryState';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const columns: ColumnDef<IInterestConfig>[] = [
  {
    accessorKey: 'duration',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:transform-none'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Duration <small>(months)</small>
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className='capitalize'>{row.index + 1}</div>,
  },
  {
    accessorKey: 'principal',
    header: () => 'Principal',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('principal'));

      // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // }).format(amount);

      return <div className=' font-medium'>{thousandSeperator(amount)}</div>;
    },
  },
  {
    accessorKey: 'return',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='hover:transform-none '
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Return
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const returnAmount = parseFloat(row.getValue('return'));
      return <div className='lowercase'>{thousandSeperator(returnAmount)}</div>;
    },
    filterFn: 'includesString',
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const interest = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant='ghost' className='h-8 w-8 p-0'>
  //             <span className='sr-only'>Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align='end'>
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() =>
  //               navigator.clipboard.writeText(
  //                 interest.return?.toString() ?? '0'
  //               )
  //             }
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

interface DataTable {
  data?: IInterestConfig[];
}

export function DataTableDemo(props: DataTable) {
  const { data } = props;
  const { pageSize, setPageSize, page, setPage } = usePaginationQueries();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // const [pagination, setPagination] = React.useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });

  const defaultPageSize = 10;

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function'
          ? updater({
              pageIndex: page ?? 0,
              pageSize: pageSize ?? defaultPageSize,
            })
          : updater;
      setPage(next.pageIndex);
      setPageSize(next.pageSize);
    },
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination: {
        pageIndex: page ?? 0,
        pageSize: pageSize ?? 10,
      },
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const { pageIndex, pageSize: limit } = table.getState().pagination;

  const totalRows = table.getFilteredRowModel().rows.length;

  const start = pageIndex * limit + 1;
  const end = Math.min(start + limit - 1, totalRows);

  return (
    <div className='w-full border rounded-xl p-4'>
      <div className='flex items-center py-4'>
        {/* <Input
          placeholder='Filter duration...'
          value={table.getColumn('return')?.getFilterValue() as string}
          onChange={(event) => {
            table.getColumn('return')?.setFilterValue(event.target.value);
          }}
          className='max-w-sm'
        /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=' border'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='flex-1 flex items-center gap-3 text-sm text-muted-foreground'>
          <p>
            {start}-{end} of {totalRows}
          </p>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className='ml-auto'>
                  Show {pageSize} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {[10, 20, 50, 100].map((pageSize) => (
                  <DropdownMenuCheckboxItem
                    key={pageSize}
                    onClick={() => {
                      setPageSize(pageSize);
                      table.setPageSize(Number(pageSize));
                    }}
                  >
                    Show {pageSize}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='space-x-2'>
          <Button
            size='sm'
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
