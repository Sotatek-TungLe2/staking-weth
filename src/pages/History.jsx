import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React, { useEffect, useState } from 'react'
import LoadingPage from '../components/common/Loading';
import HistoryHeader from '../components/history/HistoryHeader';
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useWeb3React } from '@web3-react/core';
import HistoryTable from '../components/history/HistoryTable';
import { getWeb3 } from '../abi/helper/contract';
import { convertDateTime } from '../utils/formatting';

const History = props => {
  const [loading, setLoading] = useState(false);
  const [dataHistory,setDataHistory] = useState([])
  const {account,library} = useWeb3React()
  const web3 = getWeb3(library?.provider)
  useEffect(() => {

    const fetchHistoryData = async () => {
      const client = new ApolloClient({
        uri: process.env.REACT_APP_URI_API,
        cache: new InMemoryCache(),
      });
      
      setLoading(true)
      const results = await client.query({
        query: gql`
        query GetDeposit {
          historyEventEntities(
            where: { user: "${account}" }
          ) {
            id
            event
            user
            amountValue
            time
          }
        }
        `,
      });
      const {historyEventEntities} = results.data
      setDataHistory(historyEventEntities)
      setLoading(false)
      
    };
    fetchHistoryData()
  },[account])
 
  const tableColumn = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Amount",
      dataIndex: "amountValue",
      key: "amountValue",
      render: (text) => (
        <span>{web3.utils.fromWei(text.toString())}</span>
      )
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => (
        <span>{convertDateTime(text)}</span>
      )
    },
  ];

  return (
    <Layout>
    {loading && <LoadingPage />}
    <Header style={headerStyle}>
      <HistoryHeader/>
    </Header>
    <Content style={mainStyle}>
      <HistoryTable dataSource={dataHistory} columns={tableColumn}/>
    </Content>
  </Layout>
  )
}
const headerStyle = {
  backgroundColor: "#351A64",
};
const mainStyle = {
  backgroundColor: "#4c268f",
};
// History.propTypes = {}

export default History