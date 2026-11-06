---
title: How to mock Solidity smart contracts for testing
description: Why you should make fun of your contracts when testing
author: Markus Waas
lang: en
tags: ["solidity", "smart contracts", "testing", "mocking"]
skill: intermediate
breadcrumb: Mocking contracts
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Mock objects](https://wikipedia.org/wiki/Mock_object) are a common design pattern in object-oriented programming. Coming from the old French word 'mocquer' with the meaning of 'making fun of', it evolved to 'imitating something real' which is actually what we are doing in programming. Please only make fun of your smart contracts if you want to, but mock them whenever you can. It makes your life easier.

## Unit-testing contracts with mocks {#unit-testing-contracts-with-mocks}

Mocking a contract essentially means creating a second version of that contract which behaves very similar to the original one, but in a way that can be easily controlled by the developer. You often end up with complex contracts where you only want to [unit-test small parts of the contract](/developers/docs/smart-contracts/testing/). The problem is what if testing this small part requires a very specific contract state that is difficult to end up in?

You could write complex test setup logic every time that brings in the contract in the required state or you write a mock. Mocking a contract is easy with inheritance. Simply create a second mock contract that inherits from the original one. Now you can override functions to your mock. Let us see it with an example.

The examples below use [Foundry](https://www.getfoundry.sh/introduction/installation) and OpenZeppelin Contracts 5.x. To follow along, create a project and install OpenZeppelin:

```sh
forge init private-erc20
cd private-erc20
forge install OpenZeppelin/openzeppelin-contracts
```

Foundry picks up the `@openzeppelin/contracts/` import remapping from the installed library automatically.

## Example: Private ERC20 {#example-private-erc20}

We use an example ERC-20 contract that has an initial private time. The owner can manage private users and only those will be allowed to receive tokens at the beginning. Once a certain time has passed, everyone will be allowed to use the tokens. If you are curious, we are overriding the [`_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-) function of OpenZeppelin Contracts 5.x, which every mint, burn and transfer goes through.

Save this as `src/PrivateERC20.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") Ownable(msg.sender) {
        publicAfterTime = block.timestamp + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return block.timestamp >= publicAfterTime;
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        require(_validRecipient(to), "PrivateERC20: invalid recipient");

        super._update(from, to, value);
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

And now let's mock it. Save this as `src/mocks/PrivateERC20Mock.sol`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PrivateERC20} from "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() PrivateERC20(0) {}

    function setIsPublic(bool isPublic_) external {
        isPublicConfig = isPublic_;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
```

When you run `forge build`, you will get the following error messages:

- `Error (9456): Overriding function is missing "override" specifier.`
- `Error (4334): Trying to override non-virtual function. Did you forget to add "virtual"?`

Since Solidity 0.6, you have to add the `virtual` keyword for functions that can be overridden and `override` for the overriding function. So let us add those to both `isPublic` functions:

```solidity
// In PrivateERC20.sol
function isPublic() public view virtual returns (bool) {

// In PrivateERC20Mock.sol
function isPublic() public view override returns (bool) {
```

Now in your unit tests, you can use `PrivateERC20Mock` instead. When you want to test the behavior during the private usage time, use `setIsPublic(false)` and likewise `setIsPublic(true)` for testing the public usage time. The mock also has a `mint` function, so tests can create balances without any extra setup. Save this as `test/PrivateERC20.t.sol` and run `forge test`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {PrivateERC20} from "../src/PrivateERC20.sol";
import {PrivateERC20Mock} from "../src/mocks/PrivateERC20Mock.sol";

contract PrivateERC20Test is Test {
    PrivateERC20Mock token;
    address alice = makeAddr("alice");

    function setUp() public {
        token = new PrivateERC20Mock();
    }

    function test_PrivatePhaseRejectsUnknownRecipient() public {
        token.setIsPublic(false);

        vm.expectRevert("PrivateERC20: invalid recipient");
        token.mint(alice, 1 ether);
    }

    function test_PrivatePhaseAcceptsPrivateUser() public {
        token.setIsPublic(false);
        token.addUser(alice);

        token.mint(alice, 1 ether);
        assertEq(token.balanceOf(alice), 1 ether);
    }

    function test_PublicPhaseAcceptsAnyRecipient() public {
        token.setIsPublic(true);

        token.mint(alice, 1 ether);
        assertEq(token.balanceOf(alice), 1 ether);
    }

    function test_BecomesPublicAfterTime() public {
        PrivateERC20 realToken = new PrivateERC20(1 days);
        assertFalse(realToken.isPublic());

        vm.warp(block.timestamp + 1 days);
        assertTrue(realToken.isPublic());
    }
}
```

Of course in our example, we could just change the block time instead, as the last test does with Foundry's [`vm.warp`](https://www.getfoundry.sh/reference/cheatcodes/warp) cheatcode (in Hardhat, use the [`time` network helpers](https://hardhat.org/docs/plugins/hardhat-network-helpers#increase)). But the idea of mocking should be clear now and you can imagine scenarios where it is not as easy as simply advancing the time.

## Mocking many contracts {#mocking-many-contracts}

It can become messy if you have to create another contract for every single mock. If this bothers you, Foundry's [`vm.mockCall`](https://www.getfoundry.sh/reference/cheatcodes/mock-call) and [`vm.mockCallRevert`](https://www.getfoundry.sh/reference/cheatcodes/mock-call-revert) cheatcodes let you change what a contract returns on-the-fly, even for an address that has no code at all:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockCallTest is Test {
    function test_MockedBalance() public {
        address someToken = makeAddr("someToken");
        address alice = makeAddr("alice");

        vm.mockCall(
            someToken,
            abi.encodeCall(IERC20.balanceOf, (alice)),
            abi.encode(100 ether)
        );

        assertEq(IERC20(someToken).balanceOf(alice), 100 ether);
    }
}
```

However, it works only for mocking calls to another contract. `PrivateERC20` calls `isPublic()` internally, which never goes through an external call, so it would not work for our example.

## Mocking can be even more powerful {#mocking-can-be-even-more-powerful}

The powers of mocking do not end there.

- Adding functions: Not only overriding a specific function is useful, but also just adding additional functions. A good example for tokens is just having an additional `mint` function to allow any user to get new tokens for free, like the one in `PrivateERC20Mock` above.
- Usage in testnets: When you deploy and test your contracts on testnets together with your dapp, consider using a mocked version. Avoid overriding functions unless you really have to. You want to test the real logic after all. But adding for example a reset function can be useful that simply resets the contract state to the beginning, no new deployment required. Obviously you would not want to have that in a Mainnet contract.
