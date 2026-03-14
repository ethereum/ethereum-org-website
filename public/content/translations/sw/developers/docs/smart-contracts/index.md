---
title: Utangulizi wa mikataba-erevu
description: Muhtasari wa mikataba-erevu, unaozingatia sifa na mapungufu yake ya kipekee.
lang: sw
---

## Mkataba-erevu ni nini? {#what-is-a-smart-contract}

"Mkataba-erevu" ni programu tu inayoendeshwa kwenye mnyororo wa bloku wa Ethereum. Ni mkusanyiko wa msimbo (kazi zake) na data (hali yake) unaokaa kwenye anwani maalum kwenye mnyororo wa bloku wa Ethereum.

Mikataba-erevu ni aina ya [akaunti ya Ethereum](/developers/docs/accounts/). Hii inamaanisha zina salio na zinaweza kulengwa na miamala. Hata hivyo, hazidhibitiwi na mtumiaji, badala yake hupelekwa kwenye mtandao na huendeshwa kama zilivyopangwa. Akaunti za watumiaji zinaweza kisha kuingiliana na mkataba-erevu kwa kuwasilisha miamala inayotekeleza kazi iliyobainishwa kwenye mkataba-erevu. Mikataba-erevu inaweza kufafanua sheria, kama mkataba wa kawaida, na kuzitekeleza kiotomatiki kupitia msimbo. Mikataba-erevu haiwezi kufutwa kwa chaguo-msingi, na mwingiliano nayo hauwezi kubatilishwa.

## Mahitaji ya awali {#prerequisites}

Ikiwa unaanza sasa hivi au unatafuta utangulizi usio wa kiufundi sana, tunapendekeza [utangulizi wetu wa mikataba-erevu](/smart-contracts/).

Hakikisha umesoma kuhusu [akaunti](/developers/docs/accounts/), [miamala](/developers/docs/transactions/) na [mashine halisi ya Ethereum](/developers/docs/evm/) kabla ya kuingia katika ulimwengu wa mikataba-erevu.

## Mashine ya kuuza ya kidijitali {#a-digital-vending-machine}

Labda sitiari bora kwa mkataba-erevu ni mashine ya kuuza, kama ilivyoelezwa na [Nick Szabo](https://unenumerated.blogspot.com/). Ukiweka pembejeo sahihi, matokeo fulani yamehakikishwa.

Ili kupata vitafunio kutoka kwa mashine ya kuuza:

```
pesa + uteuzi wa vitafunio = vitafunio vimetolewa
```

Mantiki hii imepangwa ndani ya mashine ya kuuza.

Mkataba-erevu, kama mashine ya kuuza, una mantiki iliyopangwa ndani yake. Huu hapa ni mfano rahisi wa jinsi mashine hii ya kuuza ingeonekana kama ingekuwa mkataba-erevu ulioandikwa kwa Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Tangaza vigezo vya hali ya mkataba
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Wakati mkataba wa 'VendingMachine' unaposambazwa:
    // 1. weka anwani ya usambazaji kama mmiliki wa mkataba
    // 2. weka salio la cupcake la mkataba-erevu uliosambazwa kuwa 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Ruhusu mmiliki aongeze salio la cupcake la mkataba-erevu
    function refill(uint amount) public {
        require(msg.sender == owner, "Ni mmiliki pekee anayeweza kujaza tena.");
        cupcakeBalances[address(this)] += amount;
    }

    // Ruhusu mtu yeyote anunue cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Lazima ulipe angalau ETH 1 kwa kila cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Hakuna cupcakes za kutosha kwenye hifadhi ili kukamilisha ununuzi huu");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Kama vile mashine ya kuuza inavyoondoa hitaji la mfanyakazi muuzaji, mikataba-erevu inaweza kuchukua nafasi ya wasuluhishi katika tasnia nyingi.

## Bila ruhusa {#permissionless}

Mtu yeyote anaweza kuandika mkataba-erevu na kuusambaza kwenye mtandao. Unahitaji tu kujifunza jinsi ya kuandika msimbo katika [lugha ya mkataba-erevu](/developers/docs/smart-contracts/languages/), na kuwa na ETH ya kutosha kusambaza mkataba wako. Kusambaza mkataba-erevu kimsingi ni muamala, kwa hivyo unahitaji kulipa [gesi](/developers/docs/gas/) kwa njia ile ile unayohitaji kulipa gesi kwa uhamisho rahisi wa ETH. Hata hivyo, gharama za gesi kwa usambazaji wa mkataba ni kubwa zaidi.

Ethereum ina lugha zinazofaa kwa wasanidi programu za kuandikia mikataba-erevu:

- Solidity
- Vyper

[Zaidi kuhusu lugha](/developers/docs/smart-contracts/languages/)

Hata hivyo, ni lazima zikusanywe kabla ya kusambazwa ili mashine halisi ya Ethereum iweze kutafsiri na kuhifadhi mkataba. [Zaidi kuhusu ukusanyaji](/developers/docs/smart-contracts/compiling/)

## Uwezo wa kuunganisha {#composability}

Mikataba-erevu ni ya umma kwenye Ethereum na inaweza kufikiriwa kama API zilizo wazi. Hii inamaanisha unaweza kuita mikataba-erevu mingine ndani ya mkataba wako mwenyewe ili kupanua pakubwa kile kinachowezekana. Mikataba inaweza hata kusambaza mikataba mingine.

Jifunze zaidi kuhusu [uwezo wa kuunganisha wa mikataba-erevu](/developers/docs/smart-contracts/composability/).

## Vizuizi {#limitations}

Mikataba-erevu peke yake haiwezi kupata taarifa kuhusu matukio ya "ulimwengu halisi" kwa sababu haiwezi kupata data kutoka kwa vyanzo vya nje ya mnyororo. Hii inamaanisha haziwezi kujibu matukio katika ulimwengu halisi. Hii ni kwa makusudi. Kutegemea taarifa za nje kunaweza kuhatarisha makubaliano, ambayo ni muhimu kwa usalama na ugatuaji.

Hata hivyo, ni muhimu kwa mifumo ya mnyororo wa bloku kuweza kutumia data ya nje ya mnyororo. Suluhisho ni [oracles](/developers/docs/oracles/) ambazo ni zana zinazokusanya data ya nje ya mnyororo na kuifanya ipatikane kwa mikataba-erevu.

Kikomo kingine cha mikataba-erevu ni saizi ya juu ya mkataba. Mkataba-erevu unaweza kuwa na upeo wa 24KB la sivyo utaishiwa na gesi. Hili linaweza kuepukwa kwa kutumia [The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Mikataba ya Multisig {#multisig}

Mikataba ya Multisig (saini-nyingi) ni akaunti za mkataba-erevu zinazohitaji saini nyingi halali ili kutekeleza muamala. Hii ni muhimu sana kwa kuepuka sehemu moja ya kutofaulu kwa mikataba inayoshikilia kiasi kikubwa cha ether au tokeni zingine. Multisigs pia hugawanya jukumu la utekelezaji wa mkataba na usimamizi wa ufunguo kati ya pande nyingi na kuzuia upotezaji wa ufunguo mmoja binafsi unaosababisha upotezaji usioweza kurekebishwa wa fedha. Kwa sababu hizi, mikataba ya multisig inaweza kutumika kwa utawala rahisi wa DAO. Multisigs huhitaji saini N kati ya M saini zinazokubalika (ambapo N ≤ M, na M > 1) ili kutekeleza. `N = 3, M = 5` na `N = 4, M = 7` hutumika sana. Multisig ya 4/7 inahitaji saini nne kati ya saini saba halali zinazowezekana. Hii inamaanisha fedha bado zinaweza kupatikana hata kama saini tatu zimepotea. Katika kesi hii, inamaanisha pia kwamba wamiliki wengi wa funguo lazima wakubaliane na kusaini ili mkataba utekelezwe.

## Rasilimali za mkataba-erevu {#smart-contract-resources}

**Mikataba ya OpenZeppelin -** **_Maktaba ya uundaji salama wa mikataba-erevu._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Jukwaa la Jumuiya](https://forum.openzeppelin.com/c/general/16)

## Masomo zaidi {#further-reading}

- [Coinbase: Mkataba-erevu ni nini?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Mkataba-erevu ni nini?](https://chain.link/education/smart-contracts)
- [Video: Imefafanuliwa Kirahisi - Mikataba-Erevu](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Jukwaa la kujifunza na kukagua Web3](https://updraft.cyfrin.io)
