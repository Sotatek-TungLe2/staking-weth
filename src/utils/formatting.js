import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import moment from 'moment'
export const convertHexToDecimal = (hex) => {
    return ethers.utils.formatEther(BigNumber.from(hex));
  };

  export const convertDateTime = (time) => {
    return moment.unix(time).format('lll')
  }