# Fetch Price Data in Solidity Smart Contracts

DeFi applications and their underlying smart contracts need <a href="https://blog.chain.link/fetch-current-crypto-price-data-solidity/">reliable access to the current price of cryptocurrencies</a> and other off-chain asset data for enabling new on-chain markets while also providing end-to-end security guarantees to users. To securely get the current price of Ethereum, Bitcoin, or other cryptocurrencies in Solidity, one could either:

<ul>
  <li>Fetch price data using Chainlink Price Feeds</li>
  <li>Fetch price data using an external API via a Chainlink oracle</li>
</ul>

In this technical tutorial, we’ll walk through both approaches and share code examples to help you build, deploy, and test your smart contract. First, let’s quickly cover the importance of data quality and end-to-end decentralization when feeding external inputs into your smart contracts.

## How to Use Chainlink Price Feeds
<a href="https://data.chain.link/">Chainlink Price Feeds</a> use hundreds of high-quality data sources and aggregate them through a decentralized network of Chainlink oracles that feed price data into reference contracts, where the results are again aggregated in an Aggregator Smart Contract as the latest, trusted answer. By using numerous sources of data and <a href="https://blog.chain.link/levels-of-data-aggregation-in-chainlink-price-feeds/">multiple levels of aggregation</a> within a decentralized network of nodes, Chainlink oracles ensure price data is of the highest quality and reflects broad market coverage, protecting the data feed from sudden volume shifts and flash loan funded <a href="https://blog.chain.link/flash-loans-and-the-importance-of-tamper-proof-oracles/">price oracle attacks</a>.

### Creating the Smart Contract
To start using Chainlink Price Feeds in your smart contracts, first <a href="https://app.mycrypto.com/faucet">get testnet ETH</a> to use as gas in your smart contract. Once you have some ETH, the easiest way to start building a smart contract that uses Chainlink Price Feeds is to deploy the <a href="https://remix.ethereum.org/#version=soljson-v0.6.7+commit.b8d736ae.js&optimize=false&evmVersion=null&gist=0c5928a00094810d2ba01fd8d1083581">Price Consumer contract</a>. This is a basic template contract for initiating requests for Chainlink Price Feeds. First, we need to import the <a href="https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol">AggregatorV3Interface</a> contract interface, which allows our smart contract to reference the on-chain Price Feeds on the Kovan testnet. An instance of it is then created in a local variable.

```
import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
```

```
AggregatorV3Interface internal priceFeed;
```

In the constructor of the <a href="https://docs.chain.link/docs/ethereum-addresses">Price Feed reference contract</a>, we can then initialize the address of the price feed we’re interested in. By exploring the <a href="https://docs.chain.link/docs/ethereum-addresses">Ethereum Price Feeds page</a> in the Chainlink documentation, we can find all the price feed contract addresses that Chainlink currently provides. Navigate to the Kovan portion of the page and choose a price feed. For the purposes of this example, we’ll choose the <a href="https://data.chain.link/eth-usd">ETH/USD</a> Price Feed, whose address is <a href="https://kovan.etherscan.io/address/0x9326BFA02ADD2366b30bacB125260Af641031331">0x9326BFA02ADD2366b30bacB125260Af641031331</a>.

```
priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
```

A function has been defined called getLatestPrice to obtain the latest price from the Price Feed Aggregator contract that was instantiated in the constructor above. To do this, a new function was defined that calls the <a href="https://docs.chain.link/docs/price-feeds-api-reference#latestrounddata">latestRoundData</a> function from the Aggregator contract. This is the function that returns the current state of the Aggregator contract, and in this case, we are taking the current price and returning it in our consuming function.

```   function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
```
### Deploying and Testing the Smart Contract
Now we are ready to deploy and test our contract. Compile the contract in Remix, then on the deployment tab, change the environment to “Injected Web3”, and ensure the wallet address below is the one in your MetaMask wallet that contains some testnet ETH obtained earlier, press the deploy button, and follow the steps. The end result is you have your smart contract deployed to the Kovan testnet. You should take note of the deployed contract address via the transaction output in the Remix console. 

Once deployed, we simply need to execute the “getLatestPrice” function. The result should be that the function returns the latest price from the ETH/USD Aggregator contract, which can then be used on-chain in our smart contract. Take note that we didn’t need to send any LINK for the request, and we didn’t even use any ETH either since the transaction is a pure read of the data in the on-chain ETH-USD Aggregator contract.

<p align="center">
  <img src="./images/eth-usd.png" />
</p>

<p align="center">
ETH/USD Price Feed result
</p>

## Summary
Chainlink Price Feeds provide a hyper-reliable mechanism for getting high-quality price data into Solidity smart contracts so you can build new DeFi derivatives around real-world asset data. Moreover, Chainlink’s oracle framework provides the flexibility to quickly and easily fetch secure data around stocks, cryptocurrencies, stablecoins, indexes, and many other asset types, giving smart contract developers a robust data infrastructure to power the next wave of DeFi innovation.


If you’re a developer and want to quickly get your application connected to Chainlink Price Reference Data, visit the <a href="https://docs.chain.link/">developer documentation</a> and join the technical discussion in <a href="https://discordapp.com/invite/aSK4zew">Discord</a>.


 
