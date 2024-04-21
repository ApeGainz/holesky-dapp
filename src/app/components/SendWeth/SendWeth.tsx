"use client";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import styles from "./SendWeth.module.css";
import {
  UseAccountReturnType,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { erc20Abi, isAddress, parseUnits } from "viem";
import {
  ETHERSCAN_LINK,
  FAKE_WETH_ADDRESS,
  HARDCODED_AMOUNT,
  HARDCODED_WALLET,
} from "../../constants";
import { type UseWriteContractReturnType } from "wagmi";
import { type UseWaitForTransactionReceiptReturnType } from "wagmi";
import Link from "next/link";
import Transactions from "../Transactions/Transactions";
import { TransactionDetail } from "../../types";

const SendWeth: React.FC<{ account: UseAccountReturnType }> = ({ account }) => {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const walletInputRef = useRef<HTMLInputElement>(null);

  const [showPendingTx, setShowPendingTx] = useState(false);
  const [transactions, setTransactions] = useState<TransactionDetail[]>([]);

  const { writeContract, data: hash }: UseWriteContractReturnType =
    useWriteContract();

  const { isSuccess: isConfirmed }: UseWaitForTransactionReceiptReturnType =
    useWaitForTransactionReceipt({ hash });

  const decimals = useReadContract({
    abi: erc20Abi,
    address: FAKE_WETH_ADDRESS,
    functionName: "decimals",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTransactions = localStorage.getItem("confirmedTransactions");
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    }
  }, []);

  const handleHardcodedTransfer = () => {
    if (account.address) {
      writeContract({
        abi: erc20Abi,
        address: FAKE_WETH_ADDRESS,
        functionName: "transfer",
        args: [HARDCODED_WALLET, BigInt(HARDCODED_AMOUNT)],
      });
    }
  };

  const handleCustomTransfer = (amount: string, wallet: string) => {
    if (account.address && amount && isAddress(wallet) && decimals.data) {
      writeContract({
        abi: erc20Abi,
        address: FAKE_WETH_ADDRESS,
        functionName: "transfer",
        args: [wallet, BigInt(parseUnits(amount.toString(), decimals.data))],
      });
    }
  };

  useEffect(() => {
    if (!isConfirmed && hash) {
      setShowPendingTx(true);
    } else if (isConfirmed && hash) {
      setShowPendingTx(false);
      const newTransaction = {
        timestamp: Date.now(),
        hash: hash,
      };

      const txs = [...transactions, newTransaction];
      localStorage.setItem("confirmedTransactions", JSON.stringify(txs));
      setTransactions(txs);
    }
  }, [isConfirmed, hash]);

  return (
    <>
      <div className={styles.mainContainer}>
        <Button
          disabled={!account.isConnected}
          onClick={handleHardcodedTransfer}
        >
          {!account.isConnected
            ? "Connect wallet first"
            : "Send a small amount to my wallet"}
        </Button>
        <div className={styles.orText}>or</div>
        <div className={styles.formContainer}>
          <input
            ref={amountInputRef}
            type="number"
            className={styles.input}
            placeholder="Enter custom amount"
          />
          <input
            ref={walletInputRef}
            type="text"
            className={styles.input}
            placeholder="0x32...f858"
          />
          <Button
            disabled={!account.isConnected}
            onClick={() =>
              handleCustomTransfer(
                amountInputRef.current?.value ?? "",
                walletInputRef.current?.value ?? ""
              )
            }
          >
            {!account.isConnected
              ? "Connect wallet first"
              : "Send custom amount"}
          </Button>
        </div>
      </div>
      <div>
        <Transactions transactions={transactions} />
      </div>
      {showPendingTx && hash && (
        <div className={styles.pendingTxContainer}>
          <div className={styles.pendingTxText}>
            <div className={styles.pendingTxTitle}>Transaction pending</div>
            <div className={styles.pendingTxBody}>
              <Link
                target="_blank"
                href={`${ETHERSCAN_LINK}${hash}`}
                className={styles.pendingTxLink}
              >
                Click&nbsp;here
              </Link>
              &nbsp;to view transaction details
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SendWeth;
