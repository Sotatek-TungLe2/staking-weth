import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import images from "../../../themes/images";
import "./styles.scss";

const StakingHeader = ({ adress, balance, disconnectWallet }) => {
  const history = useHistory();
  const isMetamask = localStorage.getItem('connector') === 'metamask'
  const getIconWallet = () => {
    return isMetamask ? images.icons.metamask : images.icons.walletConnect;
  };
  const pressDisconnect = () => {
    if(disconnectWallet) disconnectWallet();
  }
  const pressHistory = () => {
    history.push("/history");
  };
  return (
    <div className="staking-header">
      <div className="wallet-adress">
        <img src={getIconWallet()} alt="" />
        <span>{adress}</span>
      </div>
      <div className="wallet-balance">
        <div className="wallet-balance__value">
          Balance: <span>{balance} WETH</span>
        </div>

        <div className="wallet-action">
          {/* <div className="wallet-disconnect">
            <Button className="" type="primary" onClick={pressDisconnect}>
              <img src={images.icons.ico_signout} alt="disconnect" />
              <span>Disconnect</span>
            </Button>
          </div> */}
          <div className="wallet-history">
            <Button className="" type="primary" onClick={pressHistory}>
              History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingHeader;
