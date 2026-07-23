---
title: Jinsi ya kuiga mikataba mahiri ya Solidity kwa ajili ya majaribio
description: Kwa nini unapaswa kuifanyia mzaha mikataba yako wakati wa majaribio
author: Markus Waas
lang: sw
tags: ["Solidity", "mikataba mahiri", "majaribio", "kuiga"]
skill: intermediate
breadcrumb: Kuiga mikataba
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Vitu vya kuiga (Mock objects)](https://wikipedia.org/wiki/Mock_object) ni muundo wa kawaida wa usanifu katika upangaji unaozingatia vitu (object-oriented programming). Ikitokana na neno la Kifaransa cha kale 'mocquer' lenye maana ya 'kufanyia mzaha', ilibadilika na kuwa 'kuiga kitu halisi' ambacho ndicho hasa tunachofanya katika upangaji. Tafadhali fanyia mzaha mikataba yako mahiri tu ikiwa unataka, lakini iige (mock) kila unapoweza. Inafanya maisha yako kuwa rahisi.

## Kufanya majaribio ya vipengele vya mikataba kwa kutumia mbinu ya kuiga {#unit-testing-contracts-with-mocks}

Kuiga mkataba kimsingi kunamaanisha kuunda toleo la pili la mkataba huo ambalo linafanya kazi sawa na lile la asili, lakini kwa njia ambayo inaweza kudhibitiwa kwa urahisi na msanidi. Mara nyingi unaishia na mikataba tata ambapo unataka tu [kufanya majaribio ya vipengele vidogo vya mkataba](/developers/docs/smart-contracts/testing/). Tatizo ni nini ikiwa kufanya majaribio ya sehemu hii ndogo kunahitaji hali maalum sana ya mkataba ambayo ni ngumu kuifikia?

Unaweza kuandika mantiki tata ya usanidi wa majaribio kila wakati inayoleta mkataba katika hali inayohitajika au unaandika mkataba wa kuiga. Kuiga mkataba ni rahisi kwa kutumia urithi (inheritance). Unda tu mkataba wa pili wa kuiga ambao unarithi kutoka kwa ule wa asili. Sasa unaweza kubatilisha (override) vipengele vya utendaji (functions) kwenye mkataba wako wa kuiga. Hebu tuone kwa mfano.

## Mfano: ERC-20 ya Kibinafsi {#example-private-erc20}

Tunatumia mfano wa mkataba wa ERC-20 ambao una muda wa awali wa kibinafsi. Mmiliki anaweza kusimamia watumiaji wa kibinafsi na hao tu ndio wataruhusiwa kupokea tokeni mwanzoni. Baada ya muda fulani kupita, kila mtu ataruhusiwa kutumia tokeni hizo. Ikiwa una hamu ya kujua, tunatumia ndoano (hook) ya [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) kutoka kwenye mikataba mipya ya OpenZeppelin v3.

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

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
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

Utapata mojawapo ya jumbe zifuatazo za hitilafu:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Kwa kuwa tunatumia toleo jipya la 0.6 la Solidity, inabidi tuongeze neno kuu la `virtual` kwa vipengele vya utendaji vinavyoweza kubatilishwa na kubatilisha kwa kipengele cha utendaji kinachobatilisha. Kwa hivyo hebu tuongeze hizo kwenye vipengele vyote viwili vya utendaji vya `isPublic`.

Sasa katika majaribio yako ya vipengele, unaweza kutumia `PrivateERC20Mock` badala yake. Unapotaka kufanya majaribio ya tabia wakati wa matumizi ya kibinafsi, tumia `setIsPublic(false)` na vivyo hivyo `setIsPublic(true)` kwa kufanya majaribio ya wakati wa matumizi ya umma. Bila shaka katika mfano wetu, tungeweza tu kutumia [visaidizi vya wakati](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) kubadilisha nyakati ipasavyo pia. Lakini wazo la kuiga linapaswa kuwa wazi sasa na unaweza kufikiria matukio ambapo si rahisi kama kusogeza mbele muda tu.

## Kuiga mikataba mingi {#mocking-many-contracts}

Inaweza kuwa vurugu ikiwa itabidi uunde mkataba mwingine kwa kila uigaji mmoja. Ikiwa hili linakusumbua, unaweza kuangalia maktaba ya [MockContract](https://github.com/gnosis/mock-contract). Inakuruhusu kubatilisha na kubadilisha tabia za mikataba papo hapo. Hata hivyo, inafanya kazi tu kwa kuiga simu (calls) kwenda kwenye mkataba mwingine, kwa hivyo isingefanya kazi kwa mfano wetu.

## Kuiga kunaweza kuwa na nguvu zaidi {#mocking-can-be-even-more-powerful}

Nguvu za kuiga haziishii hapo.

- Kuongeza vipengele vya utendaji: Sio tu kubatilisha kipengele maalum cha utendaji ni muhimu, lakini pia kuongeza tu vipengele vya ziada vya utendaji. Mfano mzuri kwa tokeni ni kuwa tu na kipengele cha utendaji cha ziada cha `mint` ili kuruhusu mtumiaji yeyote kupata tokeni mpya bila malipo.
- Matumizi katika mitandao ya majaribio (testnets): Unaposambaza na kufanya majaribio ya mikataba yako kwenye mitandao ya majaribio pamoja na programu tumizi iliyogatuliwa (dapp) yako, fikiria kutumia toleo la kuigwa. Epuka kubatilisha vipengele vya utendaji isipokuwa kama inabidi kweli. Unataka kufanya majaribio ya mantiki halisi baada ya yote. Lakini kuongeza kwa mfano kipengele cha utendaji cha kuweka upya (reset) kunaweza kuwa na manufaa ambacho kinaweka upya hali ya mkataba hadi mwanzo, hakuna usambazaji mpya unaohitajika. Ni wazi usingependa kuwa na hilo katika mkataba wa Mtandao Mkuu.