'use client'

import { insightAI } from '@/commons/askAI'
import { DialogModal } from '@/components/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import RenderIf from '@/components/utils/RenderIf'
import Spinner from '@/components/utils/spinner'
import TableEmpty from '@/components/utils/table-custom/table-empty'
import TableLoading from '@/components/utils/table-custom/table-loading'
import React, { useState, useTransition } from 'react'
import Markdown from 'react-markdown'

type DApps = {
  name: string
  author: string
  img: string
  url: string
}

interface Props {
  dataTable?: DApps[]
  isLoading?: boolean
}

const DAppsTable = ({ dataTable = [], isLoading = false }: Props) => {
  const [isLoadingAI, startTransition] = useTransition()
  const [data, setData] = useState('')

  const handleOnAsk = (msg: string) => async () => {
    startTransition(async () => {
      const res = await insightAI(msg)
      setData(res || '')
    })
  }

  const renderTBody = () => {
    return dataTable.map((item) => {
      return (
        <TableRow key={item.name}>
          <TableCell>
            <div className="size-10 p-2 border rounded-md">
              <a href={item.url}>
                <img
                  src={item.img}
                  alt="img"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.author}</TableCell>
          <TableCell>
            <div>
              <DialogModal
                loading={isLoadingAI}
                trigger={
                  <div
                    className="p-[.2rem_.6rem] border bg-black text-white rounded-md"
                    onClick={handleOnAsk(
                      `Give me infomations about ${item.name} - ${item.author}`,
                    )}
                  >
                    Ask AI
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
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>By</TableHead>
              <TableHead>AI</TableHead>
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

export default DAppsTable
