import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react';
import LoadingPage from '../../components/common/Loading';
import { injected, walletConnectConnector } from './connection';

function MetamaskProvider({ children }) {
  const { account, activate} = useWeb3React();
  const [loading, setLoading] = useState(false);
  const connectByMetamask = () => {
    setLoading(true);
    activate(injected);
    localStorage.setItem("connector", "metamask");
    setLoading(false);
  }
  const connectByWalletConnect = () => {
    setLoading(true);
    activate(walletConnectConnector, undefined, true).catch((e) =>
      console.log(e)
    );
    localStorage.setItem("connector", "walletconnect");
    setLoading(false);
  }
  useEffect(() => {
    const connectWalletOnReload = async () => {
      if(!account){
        const connector = localStorage.getItem("connector");
        if(connector === 'metamask') {
          const isConnect = await injected.isAuthorized()
          if(isConnect) connectByMetamask();

        }else if(connector === 'walletconnect') {
          connectByWalletConnect()
        }else{
          return
        }
      }
    }
    connectWalletOnReload()
  }, [account])
  return (
    <>
     {loading && <LoadingPage />}
    {children}
    </>
  )
}

export default MetamaskProvider