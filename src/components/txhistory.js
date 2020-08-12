import React from "react";
import { Row, Col, Button } from "adminlte-2-react";

const BchWallet = typeof window !== "undefined" ? window.SlpWallet : null;

// let _this

class TXHistory extends React.Component {
  constructor(props) {
    super(props)

    this.walletInfo = props.walletInfo
    console.log(`constructor walletInfo: `, props.walletInfo)
  }

  render() {
    return (
      <Row>
        <Col sm={12} className="text-center mt-2 mb-2">
          <Button
            text="Get TX History"
            type="primary"
            className="btn-lg"
            onClick={this.handleGetTxHistory}
          />
        </Col>
      </Row>
    );
  }

  async handleGetTxHistory() {
    try {
      const walletInfo = this.walletInfo
      console.log(`walletInfo: `, walletInfo)

      console.log("Entering handleGetTxHistory()");
      // debugger;

      const txs = await BchWallet.getTransactions();
      console.log(`txs: ${JSON.stringify(txs, null, 2)}`);
    } catch (err) {
      console.error(
        `Error in gatsby-plugin-bch-tx-history/handleGetTxHistory(): `,
        err
      );
    }
  }
}

export default TXHistory;
