'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table as TableType } from '@tanstack/react-table'

export const SelectPageSize = <T,>({ table }: { table: TableType<T> }) => {
  const { pageSize } = table.getState().pagination

  const pageSizes = [10, 20, 50, 100]

  const onChangePageSize = (size: string) => {
    table.setPageSize(Number(size))
    table.firstPage()
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm whitespace-nowrap">Rows per page</span>
      <Select value={String(pageSize)} onValueChange={onChangePageSize}>
        <SelectTrigger className="gap-1">
          <SelectValue placeholder="Rows per page" />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
