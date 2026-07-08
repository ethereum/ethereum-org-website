---
title: Utangulizi wa mikataba mahiri
description: Muhtasari wa mikataba mahiri, ukizingatia sifa zake za kipekee na mapungufu yake.
lang: sw
---

## Mkataba mahiri ni nini? {#what-is-a-smart-contract}

"Mkataba mahiri" ni programu tu inayoendeshwa kwenye mnyororo wa vitalu wa [Ethereum](/). Ni mkusanyiko wa msimbo (kazi zake) na data (hali yake) unaokaa kwenye anwani maalum kwenye mnyororo wa vitalu wa Ethereum.

Mikataba mahiri ni aina ya [akaunti ya Ethereum](/developers/docs/accounts/). Hii inamaanisha ina salio na inaweza kuwa lengwa la miamala. Hata hivyo haidhibitiwi na mtumiaji, badala yake inasambazwa kwenye mtandao na kuendeshwa kama ilivyopangwa. Akaunti za watumiaji zinaweza kuingiliana na mkataba mahiri kwa kuwasilisha miamala inayotekeleza kazi iliyofafanuliwa kwenye mkataba mahiri. Mikataba mahiri inaweza kufafanua sheria, kama mkataba wa kawaida, na kuzitekeleza kiotomatiki kupitia msimbo. Mikataba mahiri haiwezi kufutwa kwa chaguo-msingi, na mwingiliano nayo hauwezi kutenduliwa.

## Mahitaji ya awali {#prerequisites}

Ikiwa ndio kwanza unaanza au unatafuta utangulizi usio wa kiufundi sana, tunapendekeza [utangulizi wetu wa mikataba mahiri](/smart-contracts/).

Hakikisha umesoma kuhusu [akaunti](/developers/docs/accounts/), [miamala](/developers/docs/transactions/) na [mashine pepe ya Ethereum](/developers/docs/evm/) kabla ya kurukia ulimwengu wa mikataba mahiri.

## Mashine ya kidijitali ya kuuza bidhaa {#a-digital-vending-machine}

Labda sitiari bora zaidi ya mkataba mahiri ni mashine ya kuuza bidhaa, kama ilivyoelezwa na [Nick Szabo](https://unenumerated.blogspot.com/). Kwa pembejeo sahihi, pato fulani linahakikishwa.

Ili kupata kitafunwa kutoka kwenye mashine ya kuuza bidhaa:

```
pesa + uchaguzi wa kitafunwa = kitafunwa kutolewa
```

Mantiki hii imepangwa kwenye mashine ya kuuza bidhaa.

Mkataba mahiri, kama mashine ya kuuza bidhaa, una mantiki iliyopangwa ndani yake. Huu hapa ni mfano rahisi wa jinsi mashine hii ya kuuza bidhaa ingeonekana kama ingekuwa mkataba mahiri ulioandikwa kwa Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Tangaza vigezo vya hali vya mkataba
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Wakati mkataba wa 'VendingMachine' unasambazwa:
    // 1. weka anwani inayosambaza kama mmiliki wa mkataba
    // 2. weka salio la cupcake la mkataba mahiri uliosambazwa kuwa 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Ruhusu mmiliki kuongeza salio la cupcake la mkataba mahiri
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Ruhusu mtu yeyote kununua cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Kama vile mashine ya kuuza bidhaa inavyoondoa hitaji la mfanyakazi wa muuzaji, mikataba mahiri inaweza kuchukua nafasi ya waamuzi katika tasnia nyingi.

## Bila ruhusa {#permissionless}

Mtu yeyote anaweza kuandika mkataba mahiri na kuusambaza kwenye mtandao. Unahitaji tu kujifunza jinsi ya kuweka msimbo katika [lugha ya mkataba mahiri](/developers/docs/smart-contracts/languages/), na kuwa na ETH ya kutosha kusambaza mkataba wako. Kusambaza mkataba mahiri kiufundi ni muamala, kwa hivyo unahitaji kulipa [gesi](/developers/docs/gas/) kwa njia sawa na unavyohitaji kulipa gesi kwa hamisho rahisi la ETH. Hata hivyo, gharama za gesi kwa usambazaji wa mkataba ni kubwa zaidi.

Ethereum ina lugha zinazofaa kwa wasanidi programu kwa ajili ya kuandika mikataba mahiri:

- Solidity
- Vyper

[Zaidi kuhusu lugha](/developers/docs/smart-contracts/languages/)

Hata hivyo, lazima zikusanywe kabla ya kusambazwa ili mashine pepe ya Ethereum iweze kufasiri na kuhifadhi mkataba. [Zaidi kuhusu ukusanyaji](/developers/docs/smart-contracts/compiling/)

## Utangamano {#composability}

Mikataba mahiri ni ya umma kwenye Ethereum na inaweza kufikiriwa kama API zilizo wazi. Hii inamaanisha unaweza kuita mikataba mahiri mingine katika mkataba wako mahiri ili kupanua sana kile kinachowezekana. Mikataba inaweza hata kusambaza mikataba mingine.

Jifunze zaidi kuhusu [utangamano wa mkataba mahiri](/developers/docs/smart-contracts/composability/).

## Mapungufu {#limitations}

Mikataba mahiri pekee haiwezi kupata taarifa kuhusu matukio ya "ulimwengu halisi" kwa sababu haiwezi kupata data kutoka vyanzo vya nje ya mnyororo. Hii inamaanisha haiwezi kujibu matukio katika ulimwengu halisi. Hii ni kwa muundo. Kutegemea taarifa za nje kunaweza kuhatarisha mwafaka, ambao ni muhimu kwa usalama na ugatuzi.

Hata hivyo, ni muhimu kwa programu za mnyororo wa vitalu kuweza kutumia data ya nje ya mnyororo. Suluhisho ni [oracles](/developers/docs/oracles/) ambazo ni zana zinazochukua data ya nje ya mnyororo na kuifanya ipatikane kwa mikataba mahiri.

Kizuizi kingine cha mikataba mahiri ni ukubwa wa juu wa mkataba. Mkataba mahiri unaweza kuwa na ukubwa wa juu wa 24KB au utaishiwa na gesi. Hili linaweza kuepukwa kwa kutumia [Muundo wa Almasi (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535).

## Mikataba ya saini-nyingi {#multisig}

Mikataba ya saini-nyingi (sahihi nyingi) ni akaunti za mkataba mahiri zinazohitaji sahihi nyingi halali ili kutekeleza muamala. Hii ni muhimu sana kwa kuepuka sehemu moja ya kutofaulu kwa mikataba inayoshikilia kiasi kikubwa cha Etha au tokeni nyingine. Saini-nyingi pia hugawanya jukumu la utekelezaji wa mkataba na usimamizi wa ufunguo kati ya pande nyingi na kuzuia upotevu wa ufunguo wa siri mmoja unaosababisha upotevu wa fedha usioweza kutenduliwa. Kwa sababu hizi, mikataba ya saini-nyingi inaweza kutumika kwa utawala rahisi wa DAO. Saini-nyingi zinahitaji sahihi N kati ya sahihi M zinazokubalika (ambapo N ≤ M, na M > 1) ili kutekeleza. `N = 3, M = 5` na `N = 4, M = 7` hutumiwa sana. Saini-nyingi ya 4/7 inahitaji sahihi nne kati ya saba zinazowezekana. Hii inamaanisha fedha bado zinaweza kurejeshwa hata kama sahihi tatu zimepotea. Katika kesi hii, inamaanisha pia kwamba idadi kubwa ya wamiliki wa ufunguo lazima wakubaliane na kusaini ili mkataba utekelezwe.

## Rasilimali za mkataba mahiri {#smart-contract-resources}

**Mikataba ya OpenZeppelin -** **_Maktaba kwa ajili ya uundaji salama wa mkataba mahiri._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Jukwaa la Jamii](https://forum.openzeppelin.com/c/general/16)

## Usomaji zaidi {#further-reading}

- [Coinbase: Mkataba mahiri ni nini?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Mkataba mahiri ni nini?](https://chain.link/education/smart-contracts)
- [Video: Imefafanuliwa kwa Urahisi - Mikataba Mahiri](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Jukwaa la kujifunza na kukagua Web3](https://updraft.cyfrin.io)

## Mafunzo: Sahihi za mkataba mahiri (EIP-1271) kwenye Ethereum {#tutorials}

- [EIP-1271: Kusaini na Kuthibitisha Sahihi za Mkataba Mahiri](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Jinsi EIP-1271 inavyowezesha mikataba mahiri kuthibitisha sahihi, pamoja na mwongozo wa utekelezaji wa Safe._