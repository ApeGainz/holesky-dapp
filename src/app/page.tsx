"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./components/Button/Button";
import SendWeth from "./components/SendWeth/SendWeth";
import Subtitle from "./components/Subtitle/Subtitle";
import Title from "./components/Title/Title";
import Transactions from "./components/Transactions/Transactions";
import styles from "./page.module.css";
import { useAccount } from "wagmi";
import { type UseAccountReturnType } from "wagmi";
import UserBalance from "./components/UserBalance/UserBalance";

export default function Home() {
  const account: UseAccountReturnType = useAccount();

  return (
    <>
      <div className={styles.connectButtonContainer}>
        <ConnectButton />
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.centerContent}>
          <div className={styles.headingContainer}>
            <Title text={"Holesky Dapp"} />
            <Subtitle text={"Transfer fake WETH on Holesky testnet safely"} />
          </div>
          <UserBalance address={account.address} />
          <div className={styles.bodyContainer}>
            <SendWeth account={account} />
          </div>
        </div>
      </div>
    </>
  );
}
