import { TableCell, TableRow } from '@/components/ui/table'
import Spinner from '../spinner'
import { cn } from '@/lib/utils'

interface Props {
  colSpan?: number
}
const TableLoading = ({ colSpan = 100 }: Props) => (
  <TableRow className={cn('hover:!bg-transparent')}>
    <TableCell colSpan={colSpan} className="h-[250px]">
      <div className="flex items-center justify-center text-sm text-gray-400 min-h-[200px]">
        <Spinner />
      </div>
    </TableCell>
  </TableRow>
)

export default TableLoading
