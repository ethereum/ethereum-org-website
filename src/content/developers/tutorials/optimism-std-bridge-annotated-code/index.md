---
title: "Optimism Standard Bridge Contract Walk-Through"
description: How does the standard bridge for Optimism work? Why does it work this way?
author: Ori Pomerantz
sidebar: true
tags: ["solidity", "optimism", "bridge", "layer 2", "l2"]
skill: intermediate
published: 2022-03-30
lang: en
---

## Introduction {#introduction}

[Optimism](https://www.optimism.io/) is an [Optimistic Rollup](/developers/docs/scaling/optimistic-rollups/#top).
Optimism can process transactions for a much lower price than the Ethereum mainnet (also known as layer 1 or L1) because transactions are processed a few times, rather than once on each node. 
At the same time, the data is all writted to L1 so everything can be proved and reconstructed with all the integrity and availability guarantees of mainnet.

To use L1 assets on Optimism (or any other layer 2, or L2), those assets need to be [bridged](/bridges/#prerequisites).
One way to achieve this is for users to lock assets (ETH and [ERC-20 tokens](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) are the most common ones) on L1, and receive equivalent assets on L2. 
Those assets can then be used, transferred, etc. on L2. 
Eventually, whoever ends up with them might want to bridge them back to L1. 
When doing this, the assets are burned on L2 and then released back to the user on L1.

This is the way the [Optimism standard bridge](https://community.optimism.io/docs/developers/bridge/standard-bridge/#) works. 
In this article we go over the source code for that bridge to see how it works and study it as an example of well written Solidity code.


## L1 Code {#l1-code}

This is the code that runs on L1, the mainnet Ethereum network.


### IL1ERC20Bridge {#IL1ERC20Bridge}

[This interface is defined here](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol).
It includes functions and definitions required for bridging ERC-20 tokens.

```solidity
// SPDX-License-Identifier: MIT
```

[Most of Optimism's code is released under the MIT license](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-).


```solidity
pragma solidity >0.5.0 <0.9.0;
```

At writing the latest version of Solidity is 0.8.12. 
Until version 0.9.0 is released, we don't know if this code is compatible with it or not.


```solidity
/**
 * @title IL1ERC20Bridge
 */
interface IL1ERC20Bridge {
    /**********
     * Events *
     **********/

    event ERC20DepositInitiated(
```

In Optimism bridge terminology *deposit* means transfer from L1 to L2, and *withdrawal* means a transfer from L2 to L1.

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

In most cases the address of an ERC-20 on L1 is not the same the address of the equivalent ERC-20 on L2.
[You can see the list of token addresses here](https://static.optimism.io/optimism.tokenlist.json).
The address with `chainId` 1 is on L1 (mainnet) and the address with `chainId` 10 is on L2 (Optimism).
The other two `chainId` values are for the Kovan test network (42) and the Optimistic Kovan test network (69).


```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

It is possible to add notes to transfers, in which case they are added to the events that report them. 


```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

The same bridge contract handles transfers in both directions.

```solidity

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev get the address of the corresponding L2 bridge contract.
     * @return Address of the corresponding L2 bridge contract.
     */
    function l2TokenBridge() external returns (address);
```

This function is not really needed, because on L2 it is a predeployed contract, so it is always at address `0x4200000000000000000000000000000000000010`.
It is here for symmetry with the L2 bridge, because the address of the L1 bridge is *not* trivial to know.


```solidity
    /**
     * @dev deposit an amount of the ERC20 to the caller's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _amount Amount of the ERC20 to deposit
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```    

The `_l2Gas` parameter is the amount of L2 gas the transaction is allowed to spend.
[Up to a certain (high) limit, this is free](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), so unless the ERC-20 contract does something really strange when minting, it should not be an issue.
This function takes care of the common scenario, where a user bridges assets to the same address on a different blockchain.

```solidity
    /**
     * @dev deposit an amount of ERC20 to a recipient's balance on L2.
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _to L2 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

This function is almost identical to `depositERC20`, but it lets you send the ERC-20 to a different address.

```solidity
    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ERC20 token.
     * This call will fail if the initialized withdrawal from L2 has not been finalized.
     *
     * @param _l1Token Address of L1 token to finalizeWithdrawal for.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from L2 address initiating the transfer.
     * @param _to L1 address to credit the withdrawal to.
     * @param _amount Amount of the ERC20 to deposit.
     * @param _data Data provided by the sender on L2. This data is provided
     *   solely as a convenience for external contracts. Aside from enforcing a maximum
     *   length, these contracts provide no guarantees about its content.
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Withdrawals (and other messages from L2 to L1) in Optimism are a two step process:

1. An initiating transaction on L2. 
1. A finalizing or claiming transaction on L1.
   This transaction needs to happen after the [fault challenge period](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) for the L2 transaction ends.
   

### IL1StandardBridge {#il1standardbridge}

[This interface is defined here](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol).
The events and functions are nearly identical to those defined in `IL1ERC20Bridge` above.

The bridge interface is divided between two files because some ERC-20 tokens require custom processing and cannot be handled by the standard bridge.
This way the custom bridge that handles such a token can implement `IL1ERC20Bridge` and not have to also bridge ETH.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/**
 * @title IL1StandardBridge
 */
interface IL1StandardBridge is IL1ERC20Bridge {
    /**********
     * Events *
     **********/
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

This event is nearly identical to the ERC-20 version (`ERC20DepositInitiated`), except without the L1 and L2 token addresses. 
The same is true for the other events and the functions.

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .        
    );

    /********************
     * Public Functions *
     ********************/

    /**
     * @dev Deposit an amount of the ETH to the caller's balance on L2.
            .
            .
            .            
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /**
     * @dev Deposit an amount of ETH to a recipient's balance on L2.
            .
            .
            .       
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @dev Complete a withdrawal from L2 to L1, and credit funds to the recipient's balance of the
     * L1 ETH token. Since only the xDomainMessenger can call this function, it will never be called
     * before the withdrawal is finalized.
                .
                .
                .
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

[This contract](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) is inherited by both bridges ([L1](#the-l1-bridge-contract) and [L2](#the-l2-bridge-contract)) to send messages to the other layer.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* Interface Imports */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[This interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) tells the contract how to send messages to the other layer, using the cross domain messenger.
This cross domain messenger is a whole other system, and deserves its own article, which I hope to write in the future.


```solidity
/**
 * @title CrossDomainEnabled
 * @dev Helper contract for contracts performing cross-domain communications
 *
 * Compiler used: defined by inheriting contract
 */
contract CrossDomainEnabled {
    /*************
     * Variables *
     *************/

    // Messenger contract used to send and recieve messages from the other domain.
    address public messenger;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _messenger Address of the CrossDomainMessenger on the current layer.
     */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

The one parameter that the contract needs to know, the address of the cross domain messenger on this layer.
This parameter is set once, in the constructor, and never changes.

```solidity

    /**********************
     * Function Modifiers *
     **********************/

    /**
     * Enforces that the modified function is only callable by a specific cross-domain account.
     * @param _sourceDomainAccount The only account on the originating domain which is
     *  authenticated to call this function.
     */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

The cross domain messaging is accessible by any contract on the blockchain (either Ethereum mainnet or Optimism). 
But we need the bridge on each side to *only* trust certain messages if they come from the bridge on the other side.


```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

Only messages from the appropriate cross domain messenger (`messenger`, as you see below) can be trusted.

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

The way the cross domain messenger provides the address that sent a message with the other layer is [the `.xDomainMessageSender()` function](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128). 
As long as it is called in the same transaction as the one that receives the message, it can provide this data.

We need to make sure that the message we received came from the other bridge.

```solidity

        _;
    }

    /**********************
     * Internal Functions *
     **********************/

    /**
     * Gets the messenger, usually from storage. This function is exposed in case a child contract
     * needs to override.
     * @return The address of the cross-domain messenger contract which should be used.
     */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

This function returns the cross domain messenger. 
We use a function than the variable `messenger` to allow contracts than inherit from this one to use an algorithm to specify which cross domain messenger to use. 

```solidity

    /**
     * Sends a message to an account on another domain
     * @param _crossDomainTarget The intended recipient on the destination domain
     * @param _message The data to send to the target (usually calldata to a function with
     *  `onlyFromCrossDomainAccount()`)
     * @param _gasLimit The gasLimit for the receipt of the message on the target domain.
     */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

Finally, the function that sends a message to the other layer. 

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) is a static analyzer Optimism runs on every contract to look for vulnerabilities.
In this case, the following line triggers two vulnerabilities:

1. [Reentrancy events](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
1. [Benigh reentrancy](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

In this case we are not worried about reentrancy we know `getCrossDomainMessenger()` returns a trustworthy address, even if slither has no way to know that.

### The L1 bridge contract {#the-l1-bridge-contract}

[The source code for this contract is here](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol).


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

The interfaces can be part of other contracts, so they have to support a wide range of Solidity versions.
But the bridge itself is our contract, and we can be strict about what Solidity version it uses.

```solidity
/* Interface Imports */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) and [IL1StandardBridge](#IL1StandardBridge) are explained above. 

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[This interface](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) lets us create messages to control the standard bridge on L2. 

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[This interface](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) lets us control ERC-20 contracts. 
[You can read more about it here](/developers/tutorials/erc20-annotated-code/#the-interface).

```solidity
/* Library Imports */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```



```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title L1StandardBridge
 * @dev The L1 ETH and ERC20 Bridge is a contract which stores deposited L1 funds and standard
 * tokens that are in use on L2. It synchronizes a corresponding L2 Bridge, informing it of deposits
 * and listening to it for newly finalized withdrawals.
 *
 */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;

    /********************************
     * External Contract References *
     ********************************/

    address public l2TokenBridge;

    // Maps L1 token to L2 token to balance of the L1 token deposited
    mapping(address => mapping(address => uint256)) public deposits;

    /***************
     * Constructor *
     ***************/

    // This contract lives behind a proxy, so the constructor parameters will go unused.
    constructor() CrossDomainEnabled(address(0)) {}

    /******************
     * Initialization *
     ******************/

    /**
     * @param _l1messenger L1 Messenger address being used for cross-chain communications.
     * @param _l2TokenBridge L2 standard bridge address.
     */
    // slither-disable-next-line external-function
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }

    /**************
     * Depositing *
     **************/

    /** @dev Modifier requiring sender to be EOA.  This check could be bypassed by a malicious
     *  contract via initcode, but it takes care of the user error we want to avoid.
     */
    modifier onlyEOA() {
        // Used to stop deposits from contracts (avoid accidentally lost tokens)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }

    /**
     * @dev This function can be called with no data
     * to deposit an amount of ETH to the caller's balance on L2.
     * Since the receive function doesn't take data, a conservative
     * default amount is forwarded to L2.
     */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1StandardBridge
     */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }

    /**
     * @dev Performs the logic for deposits by storing the ETH and informing the L2 ETH Gateway of
     * the deposit.
     * @param _from Account to pull the deposit from on L1.
     * @param _to Account to give the deposit to on L2.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // Construct calldata for finalizeDeposit call
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }

    /**
     * @dev Performs the logic for deposits by informing the L2 Deposited Token
     * contract of the deposit and calling a handler to lock the L1 funds. (e.g. transferFrom)
     *
     * @param _l1Token Address of the L1 ERC20 we are depositing
     * @param _l2Token Address of the L1 respective L2 ERC20
     * @param _from Account to pull the deposit from on L1
     * @param _to Account to give the deposit to on L2
     * @param _amount Amount of the ERC20 to deposit.
     * @param _l2Gas Gas limit required to complete the deposit on L2.
     * @param _data Optional data to forward to L2. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
        // When a deposit is initiated on L1, the L1 Bridge transfers the funds to itself for future
        // withdrawals. safeTransferFrom also checks if the contract has code, so this will fail if
        // _from is an EOA or address(0).
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);

        // Construct calldata for _l2Token.finalizeDeposit(_to, _amount)
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // Send calldata into L2
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*************************
     * Cross-chain Functions *
     *************************/

    /**
     * @inheritdoc IL1StandardBridge
     */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
    }

    /**
     * @inheritdoc IL1ERC20Bridge
     */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;

        // When a withdrawal is finalized on L1, the L1 Bridge transfers the funds to the withdrawer
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /*****************************
     * Temporary - Migrating ETH *
     *****************************/

    /**
     * @dev Adds ETH balance to the account. This is meant to allow for ETH
     * to be migrated from an old gateway to a new gateway.
     * NOTE: This is left for one upgrade only so we are able to receive the migrated ETH from the
     * old contract
     */
    function donateETH() external payable {}
}
```

## L2 Code {#l2-code}

### The L2 bridge contract {#the-l2-bridge-contract}

[The source for this contract is here](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol).


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Interface Imports */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";

/* Library Imports */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* Contract Imports */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/**
 * @title L2StandardBridge
 * @dev The L2 Standard bridge is a contract which works together with the L1 Standard bridge to
 * enable ETH and ERC20 transitions between L1 and L2.
 * This contract acts as a minter for new tokens when it hears about deposits into the L1 Standard
 * bridge.
 * This contract also acts as a burner of the tokens intended for withdrawal, informing the L1
 * bridge to release L1 funds.
 */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /********************************
     * External Contract References *
     ********************************/

    address public l1TokenBridge;

    /***************
     * Constructor *
     ***************/

    /**
     * @param _l2CrossDomainMessenger Cross-domain messenger used by this contract.
     * @param _l1TokenBridge Address of the L1 bridge deployed to the main chain.
     */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /***************
     * Withdrawing *
     ***************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }

    /**
     * @dev Performs the logic for deposits by storing the token and informing the L2 token Gateway
     * of the deposit.
     * @param _l2Token Address of L2 token where withdrawal was initiated.
     * @param _from Account to pull the deposit from on L2.
     * @param _to Account to give the withdrawal to on L1.
     * @param _amount Amount of the token to withdraw.
     * param _l1Gas Unused, but included for potential forward compatibility considerations.
     * @param _data Optional data to forward to L1. This data is provided
     *        solely as a convenience for external contracts. Aside from enforcing a maximum
     *        length, these contracts provide no guarantees about its content.
     */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // When a withdrawal is initiated, we burn the withdrawer's funds to prevent subsequent L2
        // usage
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);

        // Construct calldata for l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // Send message up to L1 bridge
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /************************************
     * Cross-chain Function: Depositing *
     ************************************/

    /**
     * @inheritdoc IL2ERC20Bridge
     */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
        // Check the target token is compliant and
        // verify the deposited token on L1 matches the L2 deposited token representation here
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
        ) {
            // When a deposit is finalized, we credit the account on L2 with the same amount of
            // tokens.
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
        } else {
            // Either the L2 token which is being deposited-into disagrees about the correct address
            // of its L1 token, or does not support the correct interface.
            // This should only happen if there is a  malicious L2 token, or if a user somehow
            // specified the wrong L2 token address to deposit into.
            // In either case, we stop the process here and construct a withdrawal
            // message so that users can get their funds out in some cases.
            // There is no way to prevent malicious token contracts altogether, but this does limit
            // user error and mitigate some forms of malicious contract behavior.
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // switched the _to and _from here to bounce back the deposit to the sender
                _from,
                _amount,
                _data
            );

            // Send message up to L1 bridge
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```
