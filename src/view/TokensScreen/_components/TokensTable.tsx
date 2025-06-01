import { Token } from '@/apis/insidexTrade'
import { insightAI } from '@/commons/askAI'
import { DialogModal } from '@/components/dialog'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Copy from '@/components/utils/copy'
import RenderIf from '@/components/utils/RenderIf'
import Spinner from '@/components/utils/spinner'
import TableEmpty from '@/components/utils/table-custom/table-empty'
import TableLoading from '@/components/utils/table-custom/table-loading'
import { formatAddress } from '@/lib/format'
import React, { useState, useTransition } from 'react'
import Markdown from 'react-markdown'

interface Props {
  dataTable?: Token[]
  isLoading?: boolean
}

const TokensTable = ({ dataTable = [], isLoading = false }: Props) => {
  const [isLoadingAI, startTransition] = useTransition()
  const [data, setData] = useState('')

  const handleOnAsk = (msg: string) => async () => {
    // console.log({ msg })
    startTransition(async () => {
      const res = await insightAI(msg)
      setData(res || '')
    })
  }

  const renderTBody = () => {
    return dataTable.map((item, index) => {
      const prefix = item.coinMetadata.coinType.split('::')[2]?.length || 4
      const ca = formatAddress(item.coinMetadata.coinType, prefix)

      const isGoodScore = item.holderScore > 75
      return (
        <TableRow key={index}>
          <TableCell>
            <div className="flex gap-4 items-center w-fit">
              <a
                href={`https://suivision.xyz/coin/${item.coinMetadata.coinType}`}
                className="size-6"
              >
                <img
                  src={item.coinMetadata.iconUrl || '/defaultToken.svg'}
                  alt="icon-url"
                  className="w-full h-full object-cover rounded-full"
                />
              </a>
              <div className="flex flex-col gap-1">
                <p>{item.coinMetadata.symbol}</p>
                <div className="flex gap-1 items-center">
                  <p>{ca}</p>
                  <Copy value={item.coinMetadata.coinType} />
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell>{item.coin1dTradeCount.toLocaleString('en-US')}</TableCell>
          <TableCell>
            {item.fullyDilutedMarketCap.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
          <TableCell>
            {item.totalLiquidityUsd.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
          <TableCell
            className={isGoodScore ? 'text-blue-600' : 'text-slate-500'}
          >
            {item.holderScore.toFixed(2)}
          </TableCell>
          <TableCell>{item.uniqueTraders1d.toLocaleString('en-US')}</TableCell>
          <TableCell>{item.holdersCount.toLocaleString('en-US')}</TableCell>
          <TableCell>
            <div>
              <DialogModal
                loading={isLoadingAI}
                trigger={
                  <div
                    className="p-[.2rem_.6rem] border bg-black text-white rounded-md"
                    onClick={handleOnAsk(
                      `Analyze,summarize, evaluate the potential of token base on this data: ${JSON.stringify(item)}`,
                    )}
                  >
                    Submit
                  </div>
                }
              >
                <RenderIf.Group>
                  <RenderIf condition={isLoadingAI}>
                    <div className="flex items-center justify-center text-sm text-gray-400 min-h-[200px]">
                      <Spinner />
                    </div>
                  </RenderIf>
                  <RenderIf condition={!!data}>
                    <Markdown>{data}</Markdown>
                  </RenderIf>
                  <RenderIf condition={!data}>Something went wrong!</RenderIf>
                </RenderIf.Group>
              </DialogModal>
            </div>
          </TableCell>
        </TableRow>
      )
    })
  }
  return (
    <div className="flex-1">
      <Card className="flex-1">
        <Table className="w-full flex-1">
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Trades</TableHead>
              <TableHead>Market Cap</TableHead>
              <TableHead>Liquidity</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Traders</TableHead>
              <TableHead>Holders</TableHead>
              <TableHead>AI Assistant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <RenderIf.Group>
              <RenderIf condition={Boolean(isLoading)}>
                <TableLoading />
              </RenderIf>
              <RenderIf condition={!Boolean(dataTable.length)}>
                <TableEmpty />
              </RenderIf>
              <RenderIf condition>{renderTBody()}</RenderIf>
            </RenderIf.Group>
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

export default TokensTable
