import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { NETWORK_URLS, WALLETCONNECT_BRIDGE_URL } from "../../utils/constants";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4, 5,97],
});

export const walletConnectConnector = new WalletConnectConnector({
  supportedChainIds: [1, 4, 5,97],
  rpc: NETWORK_URLS,
  bridge: WALLETCONNECT_BRIDGE_URL,
  qrcode: true,
});