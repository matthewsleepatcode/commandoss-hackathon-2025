import React from 'react'
import { Table as TableType } from '@tanstack/react-table'
import { SelectPageSize } from './SelectPageSize'
import { TablePagination } from './TablePagination'

const PaginationCustom = <T,>({ table }: { table: TableType<T> }) => {
  return (
    <div className="flex items-center justify-between p-2 gap-6 border-t">
      <div className="text-sm text-muted-foreground">
        Search found {table.getRowCount()} records
      </div>
      <div className="flex gap-4">
        <SelectPageSize table={table} />
        <TablePagination table={table} />
      </div>
    </div>
  )
}

export default PaginationCustom
