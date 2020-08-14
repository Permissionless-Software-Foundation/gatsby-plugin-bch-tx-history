import React from 'react'
import { Row, Col, Button } from 'adminlte-2-react'

// const BchWallet = typeof window !== 'undefined' ? window.SlpWallet : null
let _this
class TXHistory extends React.Component {
  constructor(props) {
    super(props)
    _this = this
    this.state = {
      transactions: [],
      bchWallet: props.bchWallet
    }
    // this.walletInfo = props.walletInfo
    // console.log('constructor walletInfo: ', props.walletInfo)
  }

  render() {
    const { transactions } = _this.state
    return (
      <Row>
        <Col sm={12} className='text-center mt-2 mb-2'>
          <Button
            text='Get TX History'
            type='primary'
            className='btn-lg'
            onClick={this.handleGetTxHistory}
          />
        </Col>

        {/* Show the transactions */}
        <Col sm={12}>
          {
            transactions.map(val => {
              return <div key={val} className='text-center mt-1 mb-1'>
                {val}
              </div>
            })
          }
        </Col>

        { /*Close the transaction list*/}
        <Col className='text-center mt-2 mb-2'>
        {
            transactions.length > 0 && (
              <Button
                text='Close'
                type='primary'
                className='btn-lg'
                onClick={this.handleCleanTransactions}
              />
            )
          }
        </Col>

      </Row>
    )
  }
  componentDidUpdate() {
    //Update state if a new wallet is detected
    if (_this.state.bchWallet !== _this.props.bchWallet) {
      _this.setState({
        bchWallet: _this.props.bchWallet, // Update wallet instance
        transactions: [] // Clean transaction array if a new wallet is detected
      })
    }
  }

  // This event handler would use the minimal-slp-wallet-web library to retrieve
  // the transaction history for the address.
  async handleGetTxHistory() {
    try {
      console.log('Entering handleGetTxHistory()')

      const { bchWallet } = _this.state
      if (!bchWallet) throw new Error('Wallet not found!')

      const transactions = await bchWallet.getTransactions();

      _this.setState({
        transactions
      })
    } catch (err) {
      console.error(
        'Error in gatsby-plugin-bch-tx-history/handleGetTxHistory(): ',
        err
      )
    }
  }
  // Clean the transaction list with an empty array
  handleCleanTransactions() {
    _this.setState({
      transactions: []
    })
  }
}

export default TXHistory

