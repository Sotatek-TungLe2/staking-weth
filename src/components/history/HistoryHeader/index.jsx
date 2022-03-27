import { Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import images from "../../../themes/images";
import "./styles.scss";

const HistoryHeader = () => {
  const history = useHistory();
  const pressStake = () => {
    history.push("/staking");
  };
  return (
    <div className="staking-header">
      <div className="wallet-adress">
      </div>
      <div className="wallet-balance">
        <div className="wallet-action">
          <div className="wallet-history">
            <Button className="" type="primary" onClick={pressStake}>
              Stake Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryHeader;
