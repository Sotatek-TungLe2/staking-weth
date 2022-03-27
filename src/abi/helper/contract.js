import { constants, ethers } from "ethers";
import Web3 from "web3";
import DD2 from "../DD2Token.json";
import masterchef from "../masterchef.json";
import WETH from "../WETHToken.json";

export const getWeb3 = (provider) => {
  return new Web3(provider);
};

export const getWETHContract = (provider) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    WETH,
    process.env.REACT_APP_WETH_ADRESS
  );
  return { web3, contract };
};
export const getDD2Contract = (provider) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(DD2, process.env.REACT_APP_DD2_ADRESS);
  return { web3, contract };
};
export const getMasterchefContract = (provider) => {
  const web3 = new Web3(provider);
  const contract = new web3.eth.Contract(
    masterchef,
    process.env.REACT_APP_MC_ADRESS
  );
  return { web3, contract };
};

export const getBalanceOfWETH = async (provider, userAdress, onError) => {
  const { web3, contract } = getWETHContract(provider);

  if (!(userAdress && ethers.utils.isAddress(userAdress)))
    throw new Error("incorrect address contract");
  if (!contract) throw new Error("incorrect contract");

  try {
    const result = await contract.methods?.balanceOf(userAdress).call();
    return web3.utils.fromWei(result);
  } catch (err) {
    onError(err);
  }
};

export const allowance = async (provider, userAdress, onError) => {
  const { web3, contract } = getWETHContract(provider);
  if (!(userAdress && ethers.utils.isAddress(userAdress)))
    throw new Error("incorrect address contract");
  if (!contract) throw new Error("incorrect contract");

  try {
    const result = await contract.methods
      ?.allowance(userAdress, process.env.REACT_APP_MC_ADRESS)
      .call();
    console.log("result", result);
    return web3.utils.fromWei(result);
  } catch (err) {
    onError(err);
  }
};

export const approved = async (provider, userAdress, onError) => {
  const { contract } = getWETHContract(provider);
  if (!(userAdress && ethers.utils.isAddress(userAdress)))
    throw new Error("incorrect address contract");
  if (!contract) throw new Error("incorrect contract");

  const ALLOW_NUMBER = constants.MaxInt256;

  try {
    const result = await contract.methods
      ?.approve(process.env.REACT_APP_MC_ADRESS, ALLOW_NUMBER)
      .send({
        from: userAdress,
      });
    console.log("result", result);
    return result;
  } catch (err) {
    onError(err);
  }
};

export const userStake = async (provider, userAdress,amount, onError) => {
  const {web3, contract } = getMasterchefContract(provider);
  if (!(userAdress && ethers.utils.isAddress(userAdress)))
    throw new Error("incorrect address contract");
  if (!contract) throw new Error("incorrect contract");

  const amountValue = typeof amount === 'string' ? web3.utils.toWei(amount) : web3.utils.toWei(amount.toString());
  try {
    const result = await contract.methods
      ?.deposit(amountValue)
      .send({
        from: userAdress,
      });
    console.log("result", result);
    return result;
  } catch (err) {
    onError(err);
  }
};

export const userWithdraw = async (provider, userAdress,amount, onError) => {
  const {web3, contract } = getMasterchefContract(provider);
  if (!(userAdress && ethers.utils.isAddress(userAdress)))
    throw new Error("incorrect address contract");
  if (!contract) throw new Error("incorrect contract");

  const amountValue = typeof amount === 'string' ? web3.utils.toWei(amount) : web3.utils.toWei(amount.toString());
  try {
    const result = await contract.methods
      ?.withdraw(amountValue)
      .send({
        from: userAdress,
      });
    console.log("result", result);
    return result;
  } catch (err) {
    onError(err);
  }
};
