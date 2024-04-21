import React from "react";
import { useBalance, useReadContract } from "wagmi";
import { type UseBalanceReturnType } from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { holesky } from "wagmi/chains";
import { FAKE_WETH_ADDRESS, HARDCODED_WALLET } from "../../constants";
import styles from "./UserBalance.module.css";

const UserBalance: React.FC<{ address: `0x${string}` | undefined }> = ({
  address,
}) => {
  const ethBalance: UseBalanceReturnType = useBalance({
    address,
    chainId: holesky.id,
  });

  const fakeWethBalance = useReadContract({
    abi: erc20Abi,
    address: FAKE_WETH_ADDRESS,
    functionName: "balanceOf",
    args: address ? [address] : [HARDCODED_WALLET],
  });

  const fakeWethDecimals = useReadContract({
    abi: erc20Abi,
    address: FAKE_WETH_ADDRESS,
    functionName: "decimals",
  });

  return (
    <div>
      {address &&
        ethBalance.data &&
        fakeWethBalance.data &&
        fakeWethDecimals.data && (
          <div className={styles.userBalance}>
            <div>
              {ethBalance.data.symbol} Balance&nbsp;
              {formatUnits(
                ethBalance.data.value,
                ethBalance.data.decimals
              ).substring(0, 5)}
              &nbsp;
            </div>
            <div>
              Fake WETH Balance&nbsp;
              {formatUnits(
                fakeWethBalance.data,
                fakeWethDecimals.data
              ).substring(0, 5)}
            </div>
          </div>
        )}
    </div>
  );
};

export default UserBalance;
