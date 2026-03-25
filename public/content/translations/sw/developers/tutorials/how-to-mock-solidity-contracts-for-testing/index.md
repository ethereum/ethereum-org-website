---
title: Jinsi ya kuiga mikataba-erevu ya Solidity kwa ajili ya majaribio
description: Kwa nini unapaswa kufanyia mzaha mikataba yako unapofanya majaribio
author: Markus Waas
lang: sw
tags: [ "uimara", "mikataba erevu", "majaribio", "kuiga" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Vitu vya kuiga](https://wikipedia.org/wiki/Mock_object) ni muundo wa kawaida wa usanifu katika upangaji programu unaolenga vitu. Likitokana na neno la zamani la Kifaransa 'mocquer' lenye maana ya 'kufanyia mzaha', lilibadilika na kuwa 'kuiga kitu halisi' ambacho ndicho hasa tunachofanya katika upangaji programu. Tafadhali fanyia mzaha tu mikataba yako erevu ikiwa unataka, lakini iige wakati wowote unapoweza. Inarahisisha maisha yako.

## Majaribio ya kipengele cha mikataba kwa kutumia miigo {#unit-testing-contracts-with-mocks}

Kuiga mkataba kimsingi kunamaanisha kutengeneza toleo la pili la mkataba huo ambalo linafanya kazi sawa na lile la awali, lakini kwa njia ambayo inaweza kudhibitiwa kwa urahisi na msanidi programu. Mara nyingi unajikuta na mikataba tata ambapo unataka tu [kufanya majaribio ya kipengele kwa sehemu ndogo za mkataba](/developers/docs/smart-contracts/testing/). Tatizo ni vipi ikiwa kujaribu sehemu hii ndogo kunahitaji hali maalum ya mkataba ambayo ni vigumu kuifikia?

Unaweza kuandika mantiki tata ya usanidi wa majaribio kila wakati inayoweka mkataba katika hali inayohitajika au unaandika muigo. Kuiga mkataba ni rahisi kwa kutumia urithi. Tengeneza tu mkataba wa pili wa kuiga unaorithi kutoka kwa ule wa awali. Sasa unaweza kubatilisha utendakazi kwenye muigo wako. Hebu tuone kwa mfano.

## Mfano: ERC20 ya Faragha {#example-private-erc20}

Tunatumia mfano wa mkataba wa ERC-20 ambao una muda wa awali wa faragha. Mmiliki anaweza kudhibiti watumiaji wa faragha na ni wao tu ndio watakaoruhusiwa kupokea tokeni mwanzoni. Muda fulani ukishapita, kila mtu ataruhusiwa kutumia tokeni. Kama una hamu ya kujua, tunatumia hooki ya [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) kutoka kwa mikataba mipya ya OpenZeppelin v3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: mpokeaji si sahihi");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Na sasa hebu tuuige.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Utapata moja ya ujumbe ufuatao wa hitilafu:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Kwa kuwa tunatumia toleo jipya la 0.6 la Solidity, tunapaswa kuongeza neno msingi la `virtual` kwa ajili ya utendakazi ambao unaweza kubatilishwa na `override` kwa ajili ya utendakazi unaobatilisha. Kwa hivyo, hebu tuongeze hayo kwenye utendakazi wote wa `isPublic`.

Sasa katika majaribio yako ya kipengele, unaweza kutumia `PrivateERC20Mock` badala yake. Unapotaka kujaribu tabia wakati wa matumizi ya faragha, tumia `setIsPublic(false)` na vile vile `setIsPublic(true)` kwa ajili ya kujaribu muda wa matumizi ya umma. Bila shaka katika mfano wetu, tunaweza pia kutumia [visaidizi vya muda](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) kubadilisha nyakati ipasavyo. Lakini wazo la kuiga linapaswa kuwa wazi sasa na unaweza kufikiria hali ambapo si rahisi kama kusongesha mbele muda tu.

## Kuiga mikataba mingi {#mocking-many-contracts}

Inaweza kuwa fujo ikiwa itabidi utengeneze mkataba mwingine kwa kila muigo mmoja. Ikiwa hili linakusumbua, unaweza kuangalia maktaba ya [MockContract](https://github.com/gnosis/mock-contract). Inakuruhusu kubatilisha na kubadilisha tabia za mikataba papo kwa papo. Hata hivyo, inafanya kazi tu kwa ajili ya kuiga miito kwa mkataba mwingine, kwa hivyo haitafanya kazi kwa mfano wetu.

## Kuiga kunaweza kuwa na nguvu zaidi {#mocking-can-be-even-more-powerful}

Nguvu za kuiga haziishii hapo.

- Kuongeza utendakazi: Si tu kubatilisha utendakazi maalum ni muhimu, bali pia kuongeza tu utendakazi wa ziada. Mfano mzuri kwa tokeni ni kuwa na utendakazi wa ziada wa `mint` ili kuruhusu mtumiaji yeyote kupata tokeni mpya bure.
- Matumizi katika testnet: Unapotuma na kujaribu mikataba yako kwenye testnet pamoja na mfumo wako mtawanyo wa kimamlaka, zingatia kutumia toleo la kuiga. Epuka kubatilisha utendakazi isipokuwa kama ni lazima sana. Unataka kujaribu mantiki halisi hata hivyo. Lakini kuongeza kwa mfano utendakazi wa kuweka upya kunaweza kuwa na manufaa ambao unaweka upya hali ya mkataba hadi mwanzo, bila kuhitaji utumaji mpya. Ni wazi hautaki kuwa na hiyo katika mkataba wa Mtandao Mkuu.
