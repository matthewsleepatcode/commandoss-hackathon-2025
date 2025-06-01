import HeaderContent from '@/layouts/Header/HeaderContent'
import React from 'react'
import DAppsTable from './_components/DAppsTable'
import { dataDApps } from './mockup/data'

const DAppsScreen = () => {
  return (
    <section>
      <HeaderContent title="Top DApps"></HeaderContent>
      <DAppsTable dataTable={dataDApps} />
    </section>
  )
}

export default DAppsScreen
