import React from "react";
import 'chartjs-plugin-annotation';
import Web3 from "web3";
import { 
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Row,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import AppNavbar from "./navbar/Navbar";
import AppFooter from "./footer/Footer";
import BN from "bn.js";
import meme from './images/hodler_meme.jpg';

let web3;
const WETH = require("./web3/WETH.json");
const HodlerFactory = require("./web3/HodlerFactory.json");
const Hodler = require("./web3/Hodler.json");
const IERC20 = require("./web3/IERC20.json");
class App extends React.Component {
  constructor(props) {    
    super(props)
    this.handleChangeAmountTokens = this.handleChangeAmountTokens.bind(this)
    this.handleChangeAmountAssets = this.handleChangeAmountAssets.bind(this)
    this.handleChangeAmountETH = this.handleChangeAmountETH.bind(this)
    this.sendmax = this.sendmax.bind(this)
    this.state = {
      web3Available: false,
      networkID: 1,
      addressHodlerFactory: "",
      hodler: "",
      weth: "",
      asset: "",
      assetLabel: "",
      asset_enabled: "",
      account: "",
      carddeposit: "",
      asset_symbol: "",
      token_symbol: "",
      asset_balance: "",
      token_balance: "",
      eth_balance: "",
      amountTokensLabel: "",
      amountAssetsLabel: "",
      amountTokens: "",
      amountAssets: "",
      currentTokens: 0,
      currentAssets: 0,
      precision: 18,
      progress_old: 0,
      progress_new: 0,
      valid: "is-valid",
      visible: true,
      createnewAsset: "",
      start_amount: "",
      started: "",
      closed: "",
      index: "",
      current_index: 0,
      modal: false,
      amount_label_eth: "",
      amount_eth: "",
      totalWithdrawn: "",
      currentTimestamp: "",
      startTimestamp: "",
      txhash: "",
    }
  }
  componentDidMount() {
    this.startEth();
    try {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", () => {
          this.startEth();
        })
        window.ethereum.on("chainChanged", () => {
          this.startEth();
        })
      }
    } catch (e) {console.log("no window.ethereum")}
  }
  async startEth () {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false
        web3 = new Web3(window.ethereum);
        try {
          let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          this.setState({ account: accounts[0] })
          let chainId = await window.ethereum.request({ method: 'eth_chainId' })
          await this.setState({networkID: chainId})
          await this.setState({web3Available: true})
          this.initialETHdata()
        } catch(e) {
          try {
            let accounts = await web3.eth.getAccounts()
            this.setState({ account: accounts[0] })
            let chainId = await web3.eth.getChainId()
            await this.setState({networkID: chainId})
            await this.setState({web3Available: true})
            this.initialETHdata()
          } catch (e) {
            console.log("No web3 injected")
          } 
        } 
      }
      // Legacy DApp Browsers
      else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        let chainId = await window.web3.request({ method: 'eth_chainId' })
        await window.web3.request({ method: 'eth_requestAccounts' })
        await this.setState({networkID: chainId})
        await this.setState({web3Available: true})
        this.initialETHdata()
        }
      // Non-DApp Browsers
      else {
        console.log("No web3")
      }
  }
  async initialETHdata () {
    if (this.state.networkID === "0x539" ) {
      await this.setState({addressHodlerFactory: "0x6Cb749e08832edEDf77cFB34fF362e011cB1cDa3"})
      await this.setState({asset: "0xA6731e8A3174daBc92FbDAe2cD7c7148051eab64"})
      await this.setState({weth: "0xA6731e8A3174daBc92FbDAe2cD7c7148051eab64"})
    } else if (this.state.networkID === "0x03" || this.state.networkID === "0x3" || this.state.networkID === "3" || this.state.networkID === 3){
      await this.setState({addressHodlerFactory: "0x5aCe11c5b46989C09138A7143d0b6d37Ac488046"})
      await this.setState({asset: "0x47035543eC9A06046FfD02245d407B29A0c0FeF2"})
      await this.setState({weth: "0x47035543eC9A06046FfD02245d407B29A0c0FeF2"})
    } else if (this.state.networkID === "0x04" || this.state.networkID === "0x4" || this.state.networkID === "4" || this.state.networkID === 4){
      await this.setState({addressHodlerFactory: "0x145375461eA7fFcFBD665C35f99ECE9366e3069A"})
      await this.setState({asset: "0x16C8aF24E965bEEC49dA02E7A2f527aaa465cA61"})
      await this.setState({weth: "0x16C8aF24E965bEEC49dA02E7A2f527aaa465cA61"})
    } else if (this.state.networkID === "0x05" || this.state.networkID === "0x5" || this.state.networkID === "5" || this.state.networkID === 5){
      await this.setState({addressHodlerFactory: "0x543F5f09A92d248fB2B31154bd76A5B931dFD701"})
      await this.setState({asset: "0x779D147E77C86A526267BcEA8D65419542B611F0"})
      await this.setState({weth: "0x779D147E77C86A526267BcEA8D65419542B611F0"})
    } else if (this.state.networkID === "0x2a" || this.state.networkID === "42" || this.state.networkID === 42){
      await this.setState({addressHodlerFactory: "0x3108C5aEe9a76123210C80CB19bC95324d8600cd"})
      await this.setState({asset: "0xC20d30Cee8a6C03c110F4B8837560EC35034b3b0"})
      await this.setState({weth: "0xC20d30Cee8a6C03c110F4B8837560EC35034b3b0"})
    } else {
      await this.setState({addressHodlerFactory: ""})
      await this.setState({asset: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"})
      await this.setState({weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"})
    }
    this.gethETHdata()
  }
  async gethETHdata () {
      try {
        let factory = await new web3.eth.Contract(HodlerFactory.abi, this.state.addressHodlerFactory)
        let index = await factory.methods.index(this.state.asset).call()
        await this.setState({index: index})
        let hodler_address = await factory.methods.hodler(this.state.asset, this.state.current_index).call()
        let hodler = await new web3.eth.Contract(Hodler.abi, hodler_address) 
        await this.setState({hodler: hodler_address})
        let asset = await new web3.eth.Contract(IERC20.abi, this.state.asset)
        let asset_symbol = await asset.methods.symbol().call()
        let token_symbol = await hodler.methods.symbol().call()
        await this.setState({asset_symbol: asset_symbol})
        await this.setState({token_symbol: token_symbol})    
        let asset_balance = await asset.methods.balanceOf(this.state.account).call()
        let token_balance = await hodler.methods.balanceOf(this.state.account).call() 
        await this.setState({asset_balance: asset_balance})
        await this.setState({token_balance: token_balance})
        let asset_enabled = await asset.methods.allowance(this.state.account, hodler_address).call()  
        await this.setState({asset_enabled: asset_enabled})
        let total_tokens = await hodler.methods.totalSupply().call()
        await this.setState({currentTokens: total_tokens})
        let total_assets = await asset.methods.balanceOf(hodler_address).call()
        await this.setState({currentAssets: total_assets})
        let max_assets = await hodler.methods.start_amount().call()
        let started = await hodler.methods.started().call()
        await this.setState({start_amount: max_assets})
        await this.setState({started: started})
        let progress_old = total_tokens / max_assets * 100
        await this.setState({progress_old: progress_old})
        if (started) {
          this.setState({carddeposit: false})
        } else {
          this.setState({carddeposit: true})
        }
        let closed = await hodler.methods.ended().call()
        await this.setState({closed: closed})
        let balance = await web3.eth.getBalance(this.state.account)
        await this.setState({eth_balance: balance})  
        let totalWithdrawn = await hodler.methods.totalWithdraw().call() 
        await this.setState({totalWithdrawn: totalWithdrawn}) 
        let currentTimestamp = await web3.eth.getBlock("latest")
        await this.setState({currentTimestamp: currentTimestamp.timestamp}) 
        let startTimestamp = await hodler.methods.start_time().call()
        await this.setState({startTimestamp: startTimestamp}) 
      } catch {
        console.log("no hodler instance found")
      }
  }
  toggle () {
    this.setState({modal: !this.state.modal})
  }
  handleChangeAmountETH(e) {
    if(isNaN(Number(e.target.value))){
      return
    }
    this.changeETH(e.target.value)
  }
  async changeETH(input) {
    this.setState({amount_label_eth: input})
    let amount = input * 10**18
    this.setState({amount_eth: amount})
  }
  async convert () {
    let weth = await new web3.eth.Contract(WETH.abi, this.state.asset)
    let amount = this.state.amount_eth.toLocaleString('fullwide', {useGrouping:false})
    await weth.methods.deposit().send({from: this.state.account, value: amount}, function(error, hash){
      this.setState({txhash: hash})
    }.bind(this))
    this.setState({txhash: ""})
    this.setState({modal: !this.state.modal})
    this.gethETHdata()
  }
  async setCard (front) {
    await this.setState({carddeposit: front})
    await this.changeTokens(this.state.amountTokensLabel)
  }
  handleChangeAmountTokens(e) {
    if(isNaN(Number(e.target.value))){
      return
    }
    this.changeTokens(e.target.value)
  }
  async changeTokens(input) {
    this.setState({amountTokensLabel: input});
    let amount = input * 10**this.state.precision
    this.setState({amountTokens: amount});
    let changeAssets;
    if (this.state.started === false) {
      if (this.state.carddeposit) {
        changeAssets = amount
        let progress_old = this.state.currentTokens / this.state.start_amount * 100
        let progress_new = amount / this.state.start_amount * 100
        this.setState({progress_old: progress_old});
        this.setState({progress_new: progress_new});
      } else {
        changeAssets = amount
        let new_supply = this.state.currentTokens - amount
        let progress_old = new_supply / this.state.start_amount * 100
        this.setState({progress_new: 0});
        this.setState({progress_old: progress_old});
      }
      this.setState({amountAssetsLabel: input});
      if (changeAssets === 0) {
        this.setState({amountAssetsLabel: ""});
      }
      this.setState({amountAssets: changeAssets});
    } else if (this.state.started === true){
      let hodler_address = this.state.hodler
      let hodler = await new web3.eth.Contract(Hodler.abi, hodler_address) 
      amount = amount.toLocaleString('fullwide', {useGrouping:false})
      let amount_return = await hodler.methods.calculateAssetOut(amount).call()
      let label_return = amount_return / (10**this.state.precision)
      this.setState({amountAssetsLabel: label_return});
      this.setState({amountAssets: amount_return});
    }
  }
  handleChangeAmountAssets(e) {
    if(isNaN(Number(e.target.value))){
      return
    }
    this.changeAssets(e.target.value)
  }
  changeAssets(amount) {
    let _assets
    if (amount !== "") {
      _assets = amount
    } else {
      _assets = ""
    }
    this.setState({amountAssetsLabel: _assets});
    let _amount = _assets * 10**this.state.precision
    this.setState({amountAssets: _amount});
    let changeTokens;
    if (this.state.carddeposit) {
      changeTokens = _amount
      let progress_old = this.state.currentTokens / this.state.start_amount * 100
      let progress_new = _amount / this.state.start_amount * 100
      this.setState({progress_old: progress_old});
      this.setState({progress_new: progress_new});
    } else {
      changeTokens = _amount
      let new_supply = this.state.currentTokens - _amount
      let progress_old = new_supply / this.state.start_amount * 100
      this.setState({progress_new: 0});
      this.setState({progress_old: progress_old});
    }
    this.setState({amountTokensLabel: _assets});
    if (changeTokens.toString() === "0") {
      this.setState({amountTokensLabel: ""});
    }
    this.setState({amountTokens: changeTokens});
  }
  async sendmessage (input){
    let hodler_address = this.state.hodler
    let hodler = await new web3.eth.Contract(Hodler.abi, hodler_address) 
    let asset = await new web3.eth.Contract(IERC20.abi, this.state.asset)
    if (input === "Approve") {
      let base = new BN(2)
      let exp = new BN(256)
      let sub = new BN(1)
      let max = base.pow(exp).sub(sub)
      await asset.methods.approve(hodler_address, max.toString()).send({from: this.state.account}, function(error, hash){
        this.setState({txhash: hash})
      }.bind(this))
      this.setState({txhash: ""})
      console.log("approve")
    } else if (input === "Deposit") {
      let asst = new BN(this.state.amountAssets.toString())
      await hodler.methods.deposit(asst).send({from: this.state.account}, function(error, hash){
        this.setState({txhash: hash})
      }.bind(this))
      this.setState({txhash: ""})
      console.log("deposit")
    } else if (input === "Withdraw") {
      let tkn = new BN(this.state.amountTokens.toString())
      await hodler.methods.withdraw(tkn).send({from: this.state.account}, function(error, hash){
        this.setState({txhash: hash})
      }.bind(this))
      this.setState({txhash: ""})
      console.log("withdraw")
    }
    this.gethETHdata()
  }
  async sendmax (setter) {
    if (setter) {
      this.changeAssets(+parseFloat(this.state.asset_balance / 10**this.state.precision).toFixed(5))
    } else {
      this.changeTokens(this.state.token_balance / 10**this.state.precision)
    }  
  }
  Dismiss = () => {
    this.setState({visible: false})
  }
  render() {
    let color;
    let disabled;
    let name;
    let token_name;
    let asset_name;
    if (!window.ethereum) {
      disabled = true
      color = "dark"
      name = "no connection"
    } else {
      disabled = false
      if (this.state.asset_enabled > 10**30){
        color = "primary"
        if (this.state.carddeposit) {
          name = "Deposit"   
        } else if (!this.state.carddeposit) {
          name = "Withdraw"
        }
      } else {
        color = "primary"
        name = "Approve"
      }  
      if (this.state.closed === true) {
        disabled = true
        color = "dark"
        name = "Closed"
      }
    }
    let readonly;
    if (this.state.carddeposit) {
      token_name = this.state.token_symbol+" to mint"
      asset_name = this.state.asset_symbol+" to deposit"
    } else {
      if (this.state.started === true) {
        readonly = true;
      } 
      token_name = this.state.token_symbol+" to burn"
      asset_name = this.state.asset_symbol+" to withdraw"
    }
    let warning
    if (this.state.visible === true) {
      warning = <CardBody >
                  <div className="alert alert-primary">
                    Hodler is in <b>beta</b> and <b>unaudited</b>, please use at your own risk
                    <button type="button" className="close" onClick={() => this.Dismiss()}>
                      <span className="text-dark-blue" aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </CardBody>
    } else {
       warning = <div/>
    }
    let progress
    if (this.state.started === true) {
      if (this.state.closed === false) {
        progress = <Progress className="mb-3 rounded" bar color="success" value="100">active</Progress>
      } else if (this.state.closed === true) {
        progress = <Progress className="mb-3 rounded" bar color="info" value="100">closed</Progress>
      }
    } else  if (this.state.started === false) {
      progress =  <div>
                  <h5><b>{this.state.currentAssets/10**this.state.precision} {this.state.asset_symbol}</b> deposited</h5>
                  <p>The threshold to start the game is <b>{this.state.start_amount/10**this.state.precision} {this.state.asset_symbol}</b></p>
                  <Progress multi>
                    <Progress animated bar value={this.state.progress_old} />
                    <Progress animated bar color="info" value={this.state.progress_new}/>
                  </Progress>
                  </div>
    }
    let topbuttons
    if (this.state.started === false) {
      topbuttons =  <Row className="text-center">
                      <Col className="mycontent-left">
                        <Button className="btn disabled text-dark" onClick={() => this.setCard(true)}>Deposit</Button>
                      </Col>
                      <Col>
                        <Button className="btn disabled text-dark" onClick={() => this.setCard(false)}>Withdraw</Button>
                      </Col>
                    </Row>
    } else if (this.state.started === true) {
      topbuttons =  <Row className="text-center">
                      <Col>
                        <Button className="btn disabled text-dark" onClick={() => this.setCard(false)}>Withdraw</Button>
                      </Col>
                    </Row>
    }

    let convert_button
    if (this.state.weth === this.state.asset) {
      convert_button =  <div>
                        <button 
                          type="button" 
                          className="btn btn-primary mb-3"
                          onClick={() => this.toggle()}
                        >
                          Convert ETH to {this.state.asset_symbol}
                        </button>
                        <Modal isOpen={this.state.modal}>
                        <ModalHeader>Convert ETH to {this.state.asset_symbol}</ModalHeader>
                        <Row>
                          <ModalBody>
                            <Col>
                            <InputGroup className="input-group-alternative mb-3">
                              <span className="input-group-text">Balance ETH</span>
                              <Input 
                                className="text-right"
                                value={(this.state.eth_balance / 10**18).toFixed(5)} 
                                type="text"
                                readOnly
                              />
                            </InputGroup>
                            </Col>
                          </ModalBody>
                        </Row>
                        <Row>
                          <ModalBody>
                            <Col>
                              <InputGroup className="input-group-alternative mb-3">
                                <span className="input-group-text">ETH to convert</span>
                                <Input 
                                  className="text-right"
                                  placeholder="0.00"
                                  value={(this.state.amount_label_eth)} 
                                  type="text"
                                  onChange={this.handleChangeAmountETH}
                                />
                              </InputGroup>
                            </Col>
                          </ModalBody>
                        </Row>
                        <ModalFooter>
                          <Button color="primary" onClick={() => this.convert()}>Convert</Button>{' '}
                          <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      </div> 
    }
    let data_hodler
    if (this.state.started === true) {
      if (this.state.closed === false) {
        let withdrawn = this.state.totalWithdrawn / (10**this.state.precision)
        let diff = this.state.currentTimestamp - this.state.startTimestamp
        let days
        if (this.state.token_balance > 0) {
          days = diff / 86400
          days = Math.round(days)
        }
        data_hodler = <div>
                      <FormGroup>
                        <InputGroup className="input-group-alternative mb-3">
                          <span className="input-group-text" >Total withdrawn</span>
                          <Input 
                            className="text-right"
                            value={withdrawn+" "+this.state.token_symbol}  
                            type="text"
                            readOnly={true}
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <span className="input-group-text" >You have been hodling for </span>
                        <Input 
                          className="text-right"
                          value={days+" Days"}  
                          type="text"
                          readOnly={true}
                        />
                      </InputGroup>
                    </FormGroup>
                    </div>
      } 
    }
    return (
      <div className="bg-gradient-dark-blue h-100vh">
        <AppNavbar 
          chainID={this.state.networkID}
          web3_available={this.state.web3Available}
          account={this.state.account}
          asset_symbol={this.state.asset_symbol}
          token_symbol={this.state.token_symbol}
          asset_balance={this.state.asset_balance / (10**this.state.precision)}
          token_balance ={this.state.token_balance / (10**this.state.precision)}
          texthash={this.state.txhash}
          sendmax={this.sendmax}
          eth_balance={this.state.eth_balance}
        />
        {/* Page content */}
        <Container className="py-7 py-lg-5">
          <Row className="justify-content-center mb-3">
            <img src={meme} className="rounded-corners" alt="meme" height={200} width={300}/>
          </Row>
          <Row className="justify-content-center">
            <Col lg="8" md="12">
              <Row>
                <Col lg="10" md="12">
                  <InputGroup className="input-group-alternative mb-3">
                      <span className="input-group-text bg-primary text-white">Hodler address</span>
                      <Input 
                        className={"text-right " + this.state.valid}
                        value={this.state.hodler}
                        type="text"
                        readOnly
                      />  
                  </InputGroup> 
                </Col>
                <Col lg="2" md="8">
                  {convert_button}
                </Col>
              </Row>
            </Col>
            <Col lg="5" md="12">
              <Card className="bg-secondary shadow border-0 mb-3">
                <CardHeader className="bg-transparent pb-3">
                    {topbuttons}
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <Form role="form">  
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <span className="input-group-text">{token_name}</span>
                        <Input 
                          className="text-right"
                          placeholder="0.0"
                          value={(this.state.amountTokensLabel)} 
                          type="text"
                          onChange={this.handleChangeAmountTokens}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative mb-3">
                        <span className="input-group-text" >{asset_name}</span>
                        <Input 
                          className="text-right"
                          placeholder="0.0"
                          value={(this.state.amountAssetsLabel)}  
                          type="text"
                          onChange={this.handleChangeAmountAssets}
                          readOnly={readonly}
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button 
                        disabled={disabled}
                        className="mt-4" 
                        color={color} 
                        type="button"
                        onClick={() => this.sendmessage(name)}
                      >
                        {name}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card className="bg-secondary shadow border-0">
                {warning}
                <CardHeader className="bg-transparent">
                  {progress}
                  {data_hodler}
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </Container>
        <AppFooter/>
      </div>
    );
  }
}

export default App;
