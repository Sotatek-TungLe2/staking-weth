import { Table } from 'antd'
import React from 'react'
import { Heading } from '../../common/Heading'
import './styles.scss'

const HistoryTable = ({dataSource,columns}) => {
  return (
    <div className='history-table'>
        <Heading>History</Heading>
          <Table bordered dataSource={dataSource} columns={columns} />
    </div>
  )
}

export default HistoryTable