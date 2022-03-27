import { useWeb3React } from '@web3-react/core';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { injected, walletConnectConnector } from '../abi/helper/connection';
import { Heading } from '../components/common/Heading';
import images from '../themes/images';
const ConnectPage = props => {

    const {account, activate} = useWeb3React()
    
    const [loading,setLoading] = useState(false)
    const history = useHistory()
    const connectByInjectConnector = () => {
        setLoading(true)
        activate(injected);
        localStorage.setItem("connector", "metamask");
        setLoading(false)
    }
    const connectByWalletConnector = () => {
        setLoading(true)
        activate(walletConnectConnector,undefined,true).catch(e => console.log(e))
        localStorage.setItem("connector", "walletconnect");
        setLoading(false)
    }
    useEffect(() => {
        if(account) {
            history.push('/staking')
        }
    },[account,history])
  return (
    <div style={connectPageStyle}>
        <Heading>CONNECTING TO YOUR WALLET</Heading>

        <div style={boxStyle}>
            <Button type="primary" style={buttonStyle} onClick={connectByInjectConnector} loading={loading}>
                <img src ={images.icons.metamask} alt=""/>
                <span style={spanStyle}>METAMASK</span>
            </Button>
            <Button type="primary" style={buttonStyle} onClick={connectByWalletConnector} loading={loading}>
                <img src ={images.icons.walletConnect} alt=""/>
                <span style={spanStyle}>WALLET CONNECT</span>
            </Button>
        </div>
    </div>
  )
}

ConnectPage.propTypes = {}
const connectPageStyle = {
    padding:'30px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
}
const buttonStyle={
    height:'unset',
    alignItems: 'center',
    display: 'inline-flex',
    backgroundColor:'#99eeb4',
    borderColor: '#99eeb4',
    margin:'0 10px'
}
const spanStyle = {
    marginLeft:'20px',
    letterSpacing:'0.05em',
    textTransform:'uppercase',
    color:'#4c268f',
    fontWeight:'bold',
}
const boxStyle={
    border:'2px dashed #99eeb4',
    borderRadius:'10px',
    maxWidth:'600px',
    minHeight:'300px',
    padding:'20px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'30px'
}
export default ConnectPage