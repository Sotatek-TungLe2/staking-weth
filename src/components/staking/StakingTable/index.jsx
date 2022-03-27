import { Button } from "antd";
import React from "react";
import "./styles.scss";

const StakingTable = (props) => {
  const {
    isApproved,
    approveToken,
    tokenEarned,
    stakedValue,
    totalStakedValue,
    handleClickHarvest,
    handleClickDeposit,
    handleClickWithdraw,
  } = props;

  const pressApprove = () => {
    if (approveToken) approveToken();
  };
  const pressHarvest = () => {
    if (handleClickHarvest) handleClickHarvest();
  }
  const pressDeposit = () => {
    if (handleClickDeposit) handleClickDeposit();
  };
  const pressWithdraw = () => {
    if (handleClickWithdraw) handleClickWithdraw();
  };
  const renderButton = () => {
    return (
      <>
        {isApproved ? (
          <>
            <Button
              className="staking-table__button"
              type="primary"
              onClick={pressDeposit}
            >
              Deposit
            </Button>
            <Button
              className="staking-table__button"
              type="primary"
              onClick={pressWithdraw}
            >
              Withdraw
            </Button>
          </>
        ) : (
          <Button
            className="staking-table__button"
            type="primary"
            onClick={pressApprove}
          >
            Approve
          </Button>
        )}
      </>
    );
  };
  return (
    <div className="staking-table">
      <div className="staking-table__stake">
        <div className="staking-table__stake__box">
          <div className="staking-table__title">
            Your staked: <span>{stakedValue}</span> WETH
          </div>
          <div className="staking-table__title">
            Total staked: <span>{totalStakedValue}</span> WETH
          </div>
        </div>
        <div className="staking-table__stake__boxBtn">{renderButton()}</div>
      </div>
      <div className="staking-table__harvest">
        <div className="staking-table__title">
          Token earned: <span>{tokenEarned}</span> DD2
        </div>
        <Button className="staking-table__button" type="primary" onClick={pressHarvest}>
          Harvest
        </Button>
      </div>
    </div>
  );
};

// StakingTable.propTypes = {}

export default StakingTable;
