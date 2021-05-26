# Fetch Price Data in Solidity Smart Contracts

DeFi applications and their underlying smart contracts need reliable access to the current price of cryptocurrencies and other off-chain asset data for enabling new on-chain markets while also providing end-to-end security guarantees to users. To securely get the current price of Ethereum, Bitcoin, or other cryptocurrencies in Solidity, one could either:

-Fetch price data using Chainlink Price Feeds  
-Fetch price data using an external API via a Chainlink oracle

In this technical tutorial, we’ll walk through both approaches and share code examples to help you build, deploy, and test your smart contract. First, let’s quickly cover the importance of data quality and end-to-end decentralization when feeding external inputs into your smart contracts.

## How to Use Chainlink Price Feeds
Chainlink Price Feeds use hundreds of high-quality data sources and aggregate them through a decentralized network of Chainlink oracles that feed price data into reference contracts, where the results are again aggregated in an Aggregator Smart Contract as the latest, trusted answer. By using numerous sources of data and multiple levels of aggregation within a decentralized network of nodes, Chainlink oracles ensure price data is of the highest quality and reflects broad market coverage, protecting the data feed from sudden volume shifts and flash loan funded price oracle attacks.

### Creating the Smart Contract
To start using Chainlink Price Feeds in your smart contracts, first get testnet ETH to use as gas in your smart contract. Once you have some ETH, the easiest way to start building a smart contract that uses Chainlink Price Feeds is to deploy the Price Consumer contract. This is a basic template contract for initiating requests for Chainlink Price Feeds. First, we need to import the AggregatorV3Interface contract interface, which allows our smart contract to reference the on-chain Price Feeds on the Kovan testnet. An instance of it is then created in a local variable.

```import "https://github.com/smartcontractkit/chainlink/blob/master/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";```

```AggregatorV3Interface internal priceFeed;```

In the constructor of the Price Feed reference contract, we can then initialize the address of the price feed we’re interested in. By exploring the Ethereum Price Feeds page in the Chainlink documentation, we can find all the price feed contract addresses that Chainlink currently provides. Navigate to the Kovan portion of the page and choose a price feed. For the purposes of this example, we’ll choose the ETH/USD Price Feed, whose address is 0x9326BFA02ADD2366b30bacB125260Af641031331.

```priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);```

A function has been defined called getLatestPrice to obtain the latest price from the Price Feed Aggregator contract that was instantiated in the constructor above. To do this, a new function was defined that calls the latestRoundData function from the Aggregator contract. This is the function that returns the current state of the Aggregator contract, and in this case, we are taking the current price and returning it in our consuming function.

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


<ETH/USD Price Feed result>
<ALT: ETH/USD Price Feed result>
## Summary
Chainlink Price Feeds provide a hyper-reliable mechanism for getting high-quality price data into Solidity smart contracts so you can build new DeFi derivatives around real-world asset data. Moreover, Chainlink’s oracle framework provides the flexibility to quickly and easily fetch secure data around stocks, cryptocurrencies, stablecoins, indexes, and many other asset types, giving smart contract developers a robust data infrastructure to power the next wave of DeFi innovation.


If you’re a developer and want to quickly get your application connected to Chainlink Price Reference Data, visit the developer documentation and join the technical discussion in Discord.


 
