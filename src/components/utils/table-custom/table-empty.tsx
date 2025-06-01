import { TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface Props {
  colSpan?: number
}

const TableEmpty = ({ colSpan = 100 }: Props) => (
  <TableRow className={cn('hover:!bg-transparent')}>
    <TableCell colSpan={colSpan} className="h-[250px] text-center">
      <div className="flex flex-col items-center justify-center text-gray-500">
        {'No data'}
      </div>
    </TableCell>
  </TableRow>
)

export default TableEmpty
