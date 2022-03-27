import { useWeb3React } from "@web3-react/core";
import { Layout, message } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { Multicall } from "ethereum-multicall";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  allowance,
  approved,
  getWeb3,
  userStake,
  userWithdraw,
} from "../abi/helper/contract";
import mcABI from "../abi/masterchef.json";
import wethABI from "../abi/WETHToken.json";
import AlertCustom from "../components/common/AlertCustom";
import LoadingPage from "../components/common/Loading";
import StakingHeader from "../components/staking/StakingHeader";
import StakingModal from "../components/staking/StakingModal";
import StakingTable from "../components/staking/StakingTable";
import WithdrawModal from "../components/staking/WithdrawModal";
import { ALERT_TIME } from "../utils/constants";
import { convertHexToDecimal } from "../utils/formatting";

const Staking = (props) => {
  const { account, library, chainId, deactivate } = useWeb3React();
  const web3Provider = getWeb3(library?.provider);
  const history = useHistory();
  const multicall = new Multicall({
    web3Instance: web3Provider,
    tryAggregate: true,
  });

  const [balanceUser, setBalanceUser] = useState(0);
  const [tokenEarnedUser, setTokenEarnedUser] = useState(0);
  const [amountStakedUser, setAmountStakedUser] = useState(0);
  const [totalAmountStakedUser, setTotalAmountStakedUser] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setloadingAction] = useState(false);
  const [isOpenStake, setIsOpenStake] = useState(false);
  const [isOpenWithdraw, setisOpenWithdraw] = useState(false);

  const onError = (err) => console.log(err);

  const checkAllowance = async () => {
    if (account) {
      const result = await allowance(library?.provider, account, onError);
      setIsApproved(result > 0);
    }
  };
  const approveToken = async () => {
    if (account) {
      setLoading(true);
      const result = await approved(library?.provider, account, onError);
      checkAllowance();
      setLoading(false);
      if (result) {
        const { transactionHash } = result;
        setIsOpenStake(false);
        return message.info({
          content: (
            <AlertCustom
              type="success"
              message="Transaction Complete!"
              bscscan={true}
              address={transactionHash}
            />
          ),
          icon: <></>,
          duration: ALERT_TIME,
        });
      }
    }
  };
  const userDoHarvest = async () => {
    setLoading(true);
    const result = await userStake(library?.provider, account, 0, onError);
    if (result) {
      const { transactionHash } = result;
      fetchDataFromSC();
      setLoading(false);
      return message.info({
        content: (
          <AlertCustom
            type="success"
            message="Transaction Complete!"
            bscscan={true}
            address={transactionHash}
          />
        ),
        icon: <></>,
        duration: ALERT_TIME,
      });
    }
  
  };
  const userDoStake = async (amount) => {
    if (amount) {
      setloadingAction(true);
      const result = await userStake(
        library?.provider,
        account,
        amount,
        onError
      );

      if (result) {
        const { transactionHash } = result;
        setIsOpenStake(false)
        setloadingAction(false);
        return message.info({
          content: (
            <AlertCustom
              type="success"
              message="Transaction Complete!"
              bscscan={true}
              address={transactionHash}
            />
          ),
          icon: <></>,
          duration: ALERT_TIME,
        });
      }
      
    }
  };
  const userDoWithdraw = async (amount) => {
    if (amount) {
      setloadingAction(true);
      const result = await userWithdraw(
        library?.provider,
        account,
        amount,
        onError
      );
      if (result) {
        const { transactionHash } = result;
        setisOpenWithdraw(false);
        setloadingAction(false);
        return message.info({
          content: (
            <AlertCustom
              type="success"
              message="Transaction Complete!"
              bscscan={true}
              address={transactionHash}
            />
          ),
          icon: <></>,
          duration: ALERT_TIME,
        });
      }
    
    }
  };

  useEffect(() => {
    if (account) checkAllowance();
  }, [account]);

  const fetchDataFromSC = async () => {
    if (!account && !library) return;
    const contractCallcontext = [
      {
        reference: "WETHBalance",
        contractAddress: process.env.REACT_APP_WETH_ADRESS,
        abi: wethABI,
        calls: [
          {
            reference: "balanceWETH",
            methodName: "balanceOf",
            methodParameters: [account],
          },
        ],
      },
      {
        reference: "amountStaked",
        contractAddress: process.env.REACT_APP_MC_ADRESS,
        abi: mcABI,
        calls: [
          {
            reference: "amountStaked",
            methodName: "userInfo",
            methodParameters: [account],
          },
        ],
      },
      {
        reference: "totalStaked",
        contractAddress: process.env.REACT_APP_WETH_ADRESS,
        abi: wethABI,
        calls: [
          {
            reference: "totalStaked",
            methodName: "balanceOf",
            methodParameters: [process.env.REACT_APP_MC_ADRESS],
          },
        ],
      },
      {
        reference: "tokenEarnedDD2",
        contractAddress: process.env.REACT_APP_MC_ADRESS,
        abi: mcABI,
        calls: [
          {
            reference: "tokenEarnedDD2",
            methodName: "pendingDD2",
            methodParameters: [account],
          },
        ],
      },
    ];
    try {
      setLoading(true);
      const result = await multicall.call(contractCallcontext);
      const wethBalanceValue = convertHexToDecimal(
        result.results.WETHBalance.callsReturnContext[0].returnValues[0].hex
      );
      const tokenEarnedValue = convertHexToDecimal(
        result.results.tokenEarnedDD2.callsReturnContext[0].returnValues[0].hex
      );
      const amountStakedValue = convertHexToDecimal(
        result.results.amountStaked.callsReturnContext[0].returnValues[0].hex
      );
      const amountTotalStakedValue = convertHexToDecimal(
        result.results.totalStaked.callsReturnContext[0].returnValues[0].hex
      );

      setBalanceUser(wethBalanceValue);
      setTokenEarnedUser(tokenEarnedValue);
      setAmountStakedUser(amountStakedValue);
      setTotalAmountStakedUser(amountTotalStakedValue);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataFromSC();
  }, [account, library?.provider, chainId, isOpenStake, isOpenWithdraw]);

  useEffect(() => {
    if (!account) {
      history.push("/");
    }
  }, [account, history]);

  const disconnectWallet = () => {
    deactivate();
    localStorage.removeItem("connector");
  };

  return (
    <Layout>
      {loading && <LoadingPage />}
      <Header style={headerStyle}>
        <StakingHeader
          adress={account}
          balance={balanceUser}
          disconnectWallet={disconnectWallet}
        />
      </Header>
      <Content style={mainStyle}>
        <StakingTable
          isApproved={isApproved}
          approveToken={approveToken}
          tokenEarned={tokenEarnedUser}
          stakedValue={amountStakedUser}
          totalStakedValue={totalAmountStakedUser}
          handleClickDeposit={() => setIsOpenStake(true)}
          handleClickWithdraw={() => setisOpenWithdraw(true)}
          handleClickHarvest={userDoHarvest}
        />
        <StakingModal
          visible={isOpenStake}
          onStake={userDoStake}
          onClose={() => setIsOpenStake(false)}
          wethBalance={balanceUser}
          loading={loadingAction}
        />
        <WithdrawModal
          visible={isOpenWithdraw}
          onWithdraw={userDoWithdraw}
          onClose={() => setisOpenWithdraw(false)}
          wethStaked={amountStakedUser}
          loading={loadingAction}
        />
      </Content>
    </Layout>
  );
};
const headerStyle = {
  backgroundColor: "#351A64",
};
const mainStyle = {
  backgroundColor: "#4c268f",
};
// Staking.propTypes = {}

export default Staking;
