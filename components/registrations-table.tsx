"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define the Registration type
interface Registration {
  id: string
  name: string
  email: string
  phone: string
  organization: string
  registrationDate: string
}

// Sample data for registrations
const data: Registration[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    organization: "Acme Inc.",
    registrationDate: "2025-03-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    organization: "TechCorp",
    registrationDate: "2025-03-16",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "+1 (555) 456-7890",
    organization: "Globex",
    registrationDate: "2025-03-17",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    organization: "Initech",
    registrationDate: "2025-03-18",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    phone: "+1 (555) 876-5432",
    organization: "Umbrella Corp",
    registrationDate: "2025-03-19",
  },
  {
    id: "6",
    name: "Jessica Lee",
    email: "jessica.l@example.com",
    phone: "+1 (555) 345-6789",
    organization: "Stark Industries",
    registrationDate: "2025-03-20",
  },
  {
    id: "7",
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "+1 (555) 654-3210",
    organization: "Wayne Enterprises",
    registrationDate: "2025-03-21",
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    email: "jennifer.m@example.com",
    phone: "+1 (555) 789-0123",
    organization: "Oscorp",
    registrationDate: "2025-03-22",
  },
  {
    id: "9",
    name: "Daniel Anderson",
    email: "daniel.a@example.com",
    phone: "+1 (555) 321-0987",
    organization: "Cyberdyne Systems",
    registrationDate: "2025-03-23",
  },
  {
    id: "10",
    name: "Lisa Thomas",
    email: "lisa.t@example.com",
    phone: "+1 (555) 210-9876",
    organization: "Massive Dynamic",
    registrationDate: "2025-03-24",
  },
]

export function RegistrationsTable() {
  // Define columns
  const columns: ColumnDef<Registration>[] = React.useMemo(
    () => [
      {
        accessorKey: "id",
        header: "No.",
        cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
      },
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Name
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
      },
      {
        accessorKey: "organization",
        header: "Organization",
        cell: ({ row }) => <div>{row.getValue("organization")}</div>,
      },
      {
        accessorKey: "registrationDate",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Registration Date
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div>{row.getValue("registrationDate")}</div>,
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const registration = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(registration.id)}>
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View details</DropdownMenuItem>
                <DropdownMenuItem>Edit registration</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete registration</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    [],
  )

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Registrations</CardTitle>
        <CardDescription>Manage all participant registrations for your events.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="pl-8"
            />
          </div>
          <Button>Add Registration</Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-end space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, data.length)}{" "}
            of {data.length} entries
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
