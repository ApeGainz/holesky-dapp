import Title from "../Title/Title";
import Subtitle from "../Subtitle/Subtitle";
import styles from "./Transactions.module.css";
import { TransactionDetail } from "../../types";
import Link from "next/link";
import { ETHERSCAN_LINK } from "../../constants";

const Transactions: React.FC<{ transactions: TransactionDetail[] }> = ({
  transactions,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <Title text={"Recent Transactions"} small={true} />
        <Subtitle text={"View your recent transactions here"} />
      </div>
      <div className={styles.bodyContainer}>
        {transactions?.length === 0 ? (
          <div>No recent transactions to show</div>
        ) : (
          <div className={styles.txList}>
            {transactions.map((tx) => (
              <div key={tx.hash}>
                <Link
                  href={`${ETHERSCAN_LINK}${tx.hash}`}
                  target="_blank"
                  className={styles.txLink}
                >
                  <div className={styles.txItem}>
                    <div>{tx.hash}</div>
                    <div>{new Date(tx.timestamp).toLocaleString()}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
