---
title: ERC-20 yenye Miongozo ya Usalama
description: Jinsi ya kusaidia watu kuepuka makosa ya kijinga
author: Ori Pomerantz
lang: sw
tags: ["erc-20"]
skill: beginner
breadcrumb: Usalama wa ERC-20
published: 2022-08-15
---

## Utangulizi {#introduction}

Moja ya mambo mazuri kuhusu Ethereum ni kwamba hakuna mamlaka kuu inayoweza kurekebisha au kutengua miamala yako. Moja ya matatizo makubwa ya Ethereum ni kwamba hakuna mamlaka kuu yenye uwezo wa kutengua makosa ya watumiaji au miamala haramu. Katika makala haya utajifunza kuhusu baadhi ya makosa ya kawaida ambayo watumiaji hufanya na tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/), pamoja na jinsi ya kuunda mikataba ya ERC-20 inayosaidia watumiaji kuepuka makosa hayo, au inayopa mamlaka kuu uwezo fulani (kwa mfano kufungia akaunti).

Kumbuka kwamba ingawa tutatumia [mkataba wa tokeni wa ERC-20 wa OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), makala haya hayaelezi kwa kina. Unaweza kupata maelezo haya [hapa](/developers/tutorials/erc20-annotated-code).

Ikiwa unataka kuona msimbo kamili wa chanzo:

1. Fungua [Remix IDE](https://remix.ethereum.org/).
2. Bofya ikoni ya clone github (![clone github icon](icon-clone.png)).
3. Nakili (clone) hazina ya GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Fungua **contracts > erc20-safety-rails.sol**.

Kumbuka kwamba hazina iliandikwa kwa ajili ya OpenZeppelin Contracts 4.7.2, ambapo chaguo la kukokotoa ambalo makala haya inabatilisha linaitwa `_beforeTokenTransfer`. Makala haya yanatumia OpenZeppelin Contracts 5.x ya sasa, ambapo unabatilisha `_update` badala yake, kwa hivyo msimbo katika makala haya unatofautiana kidogo na msimbo kwenye hazina.

## Kuunda mkataba wa ERC-20 {#creating-an-erc-20-contract}

Kabla ya kuongeza utendaji wa miongozo ya usalama tunahitaji mkataba wa ERC-20. Katika makala haya tutatumia [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard). Ifungue kwenye kivinjari kingine na ufuate maagizo haya:

1. Chagua **ERC20**.
2. Weka mipangilio hii:

   | Kigezo | Thamani |
   | -------------- | ------------------------- |
   | Jina | SafetyRailsToken |
   | Alama | SAFE |
   | Kufua Kabla (Premint) | 1000 |
   | Vipengele | Hakuna (ondoa alama kwenye **Permit**) |
   | Udhibiti wa Ufikiaji | Ownable |
   | Uwezo wa Kuboresha | Hakuna |

3. Sogeza juu na ubofye **Open in Remix** (kwa Remix) au **Download** ili kutumia mazingira tofauti. Nitachukulia kuwa unatumia Remix, ikiwa unatumia kitu kingine fanya tu mabadiliko yanayofaa.
4. Sasa tuna mkataba wa ERC-20 unaofanya kazi kikamilifu. Unaweza kupanua `.deps` > `npm` ili kuona msimbo ulioingizwa.
5. Kusanya (compile), sambaza, na ucheze na mkataba ili kuona kwamba unafanya kazi kama mkataba wa ERC-20. Ikiwa unahitaji kujifunza jinsi ya kutumia Remix, [tumia mafunzo haya](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Makosa ya kawaida {#common-mistakes}

### Makosa {#the-mistakes}

Watumiaji wakati mwingine hutuma tokeni kwenye anwani isiyo sahihi. Ingawa hatuwezi kusoma mawazo yao ili kujua walichomaanisha kufanya, kuna aina mbili za makosa ambayo hutokea sana na ni rahisi kuyagundua:

1. Kutuma tokeni kwenye anwani ya mkataba wenyewe. Kwa mfano, [tokeni ya OP ya Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) ilifanikiwa kukusanya [zaidi ya 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) za tokeni za OP katika chini ya miezi miwili. Hii inawakilisha kiasi kikubwa cha utajiri ambacho huenda watu walipoteza tu.

2. Kutuma tokeni kwenye anwani tupu, ambayo hailingani na [akaunti inayomilikiwa na mtu wa nje (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) au [mkataba mahiri](/developers/docs/smart-contracts). Ingawa sina takwimu za mara ngapi hii hutokea, [tukio moja linaweza kuwa limegharimu tokeni 20,000,000](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Kuzuia uhamishaji {#preventing-transfers}

Katika mkataba wa ERC-20 wa OpenZeppelin kila mabadiliko katika salio, iwe ni hamisho, kufua, au kuteketeza, hupitia [chaguo la kukokotoa la ndani, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). Tunaweza kuibatilisha ili kuweka utendaji wetu wenyewe juu yake, kama vile ukaguzi unaotengua ikiwa kuna tatizo.

Ili kufanya hivyo, ongeza chaguo hili la kukokotoa baada ya konstrukta:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Baadhi ya sehemu za chaguo hili la kukokotoa zinaweza kuwa mpya ikiwa hufahamu sana Solidity:

```solidity
        internal virtual
```

Neno kuu la `virtual` linamaanisha kwamba kama vile tulivyorithi utendaji kutoka kwa `ERC20` na kubatilisha chaguo hili la kukokotoa, mikataba mingine inaweza kurithi kutoka kwetu na kubatilisha chaguo hili la kukokotoa.

```solidity
        override(ERC20)
```

Tunapaswa kubainisha wazi kwamba [tunabatilisha](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) ufafanuzi wa tokeni ya ERC20 wa `_update`. Kwa ujumla, ufafanuzi wa wazi ni bora zaidi, kutoka kwa mtazamo wa usalama, kuliko ule uliofichwa - huwezi kusahau kwamba umefanya kitu ikiwa kiko mbele yako. Hiyo pia ndiyo sababu tunahitaji kubainisha ni `_update` ya darasa kuu (superclass) gani tunayobatilisha.

```solidity
        super._update(from, to, value);
```

Mstari huu unaita chaguo la kukokotoa la `_update` la mkataba au mikataba ambayo tulirithi ambayo inayo. Katika kesi hii, hiyo ni `ERC20` pekee, `Ownable` haina chaguo hili la kukokotoa. Tofauti na ndoano (hook) tupu, `ERC20._update` ndiyo inayosogeza tokeni haswa, kwa hivyo ni muhimu kuiita. Ukaguzi wetu huenda kabla ya wito huu, ili waweze kutengua kabla ya mabadiliko yoyote ya salio.

### Kuweka msimbo wa mahitaji {#coding-the-requirements}

Tunataka kuongeza mahitaji haya kwenye chaguo la kukokotoa. Kwa sababu `_update` pia inaitwa wakati tokeni zinateketezwa, huku `to` ikiwekwa kuwa `address(0)`, tunakagua tu `to` wakati si `address(0)`:

- Anwani ya `to` haiwezi kulingana na `address(this)`, anwani ya mkataba wa ERC-20 wenyewe.
- Anwani ya `to` haiwezi kuwa tupu, inapaswa kuwa mojawapo ya:
  - Akaunti inayomilikiwa nje (EOA). Hatuwezi kuangalia ikiwa anwani ni EOA moja kwa moja, lakini tunaweza kuangalia salio la ETH la anwani. EOA karibu kila wakati zina salio, hata kama hazitumiki tena - ni vigumu kuzifuta hadi Wei ya mwisho.
  - Mkataba mahiri. Kujaribu ikiwa anwani ni mkataba mahiri ni ngumu kidogo. Kuna msimbo wa operesheni unaokagua urefu wa msimbo wa nje, unaoitwa [`EXTCODESIZE`](https://www.evm.codes/#3b). Katika Solidity unaweza kuipata kwa [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types), ambayo kikusanyaji (compiler) huigeuza kuwa `EXTCODESIZE`. Hapa tunatumia [Yul](https://docs.soliditylang.org/en/latest/yul.html), ambayo ni mkusanyiko wa EVM, kuonyesha jinsi ya kuita msimbo wa operesheni moja kwa moja. Kumbuka kwamba tangu [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) EOA inaweza pia kuwa na msimbo (ukaimishaji kwa mkataba), kwa hivyo ukaguzi huu hutambua akaunti zilizo na msimbo, si mikataba pekee. Kwa madhumuni yetu, kukataa anwani tupu, hiyo ni sawa.

Hili hapa ni chaguo kamili la kukokotoa:

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Kuteketeza hutuma tokeni kwenye anwani(0), usiweke kitalu
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Hebu tupitie msimbo mpya mstari kwa mstari:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Hili ni hitaji la kwanza, hakikisha kwamba `to` na `this(address)` si kitu kimoja.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Hivi ndivyo tunavyoangalia ikiwa anwani ni mkataba. Hatuwezi kupokea matokeo moja kwa moja kutoka kwa Yul, kwa hivyo badala yake tunafafanua kigezo cha kushikilia matokeo (`isToContract` katika kesi hii). Jinsi Yul inavyofanya kazi ni kwamba kila msimbo wa operesheni unachukuliwa kama chaguo la kukokotoa. Kwa hivyo kwanza tunaita [`EXTCODESIZE`](https://www.evm.codes/#3b) ili kupata ukubwa wa mkataba, na kisha kutumia [`GT`](https://www.evm.codes/#11) kuangalia kuwa si sifuri (tunashughulika na nambari kamili zisizo na saini, kwa hivyo bila shaka haiwezi kuwa hasi). Kisha tunaandika matokeo kwa `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Na hatimaye, tuna ukaguzi halisi wa anwani tupu.

## Ufikiaji wa kiutawala {#admin-access}

Wakati mwingine ni muhimu kuwa na msimamizi anayeweza kutengua makosa. Ili kupunguza uwezekano wa matumizi mabaya, msimamizi huyu anaweza kuwa [saini-nyingi](https://blog.logrocket.com/security-choices-multi-signature-wallets/) ili watu wengi walazimike kukubaliana juu ya kitendo. Katika makala haya tutakuwa na vipengele viwili vya kiutawala:

1. Kufungia na kufungua akaunti. Hii inaweza kuwa muhimu, kwa mfano, wakati akaunti inaweza kuwa imedukuliwa.
2. Usafishaji wa mali.

   Wakati mwingine matapeli hutuma tokeni za ulaghai kwenye mkataba wa tokeni halisi ili kupata uhalali. Kwa mfano, [tazama hapa](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Mkataba halali wa ERC-20 ni [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Ulaghai unaojifanya kuwa wenyewe ni [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Pia inawezekana kwamba watu hutuma tokeni halali za ERC-20 kwenye mkataba wetu kwa makosa, ambayo ni sababu nyingine ya kutaka kuwa na njia ya kuzitoa.

OpenZeppelin hutoa mbinu mbili za kuwezesha ufikiaji wa kiutawala:

- Mikataba ya [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) ina mmiliki mmoja. Chaguo za kukokotoa ambazo zina [kirekebishaji](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) cha `onlyOwner` zinaweza tu kuitwa na mmiliki huyo. Wamiliki wanaweza kuhamisha umiliki kwa mtu mwingine au kuukataa kabisa. Haki za akaunti zingine zote kwa kawaida zinafanana.
- Mikataba ya [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) ina [udhibiti wa ufikiaji kulingana na jukumu (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Kwa ajili ya urahisi, katika makala haya tunatumia `Ownable`.

### Kufungia na kufungua mikataba {#freezing-and-thawing-contracts}

Kufungia na kufungua mikataba kunahitaji mabadiliko kadhaa:

- [Uchoraji ramani (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) kutoka kwa anwani hadi [booleans](https://en.wikipedia.org/wiki/Boolean_data_type) ili kufuatilia ni anwani zipi zimefungiwa. Thamani zote hapo awali ni sifuri, ambayo kwa thamani za boolean inatafsiriwa kama uongo (false). Hivi ndivyo tunavyotaka kwa sababu kwa chaguo-msingi akaunti hazijafungiwa.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Matukio](https://docs.soliditylang.org/en/latest/contracts.html#events) ya kumjulisha mtu yeyote anayevutiwa wakati akaunti imefungiwa au kufunguliwa. Kitaalam matukio hayahitajiki kwa vitendo hivi, lakini inasaidia msimbo wa nje ya mnyororo kuweza kusikiliza matukio haya na kujua kinachoendelea. Inachukuliwa kuwa tabia nzuri kwa mkataba mahiri kuyatoa wakati jambo ambalo linaweza kuwa muhimu kwa mtu mwingine linatokea.

  Matukio yameorodheshwa kwa hivyo itawezekana kutafuta nyakati zote ambazo akaunti imefungiwa au kufunguliwa.

  ```solidity
    // Wakati akaunti zinapogandishwa au kuganduliwa
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Chaguo za kukokotoa za kufungia na kufungua akaunti. Chaguo hizi mbili za kukokotoa zinakaribia kufanana, kwa hivyo tutapitia tu chaguo la kukokotoa la kufungia.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Chaguo za kukokotoa zilizowekwa alama ya [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) zinaweza kuitwa kutoka kwa mikataba mingine mahiri au moja kwa moja na muamala.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // gandishaAkaunti
  ```

  Ikiwa akaunti tayari imefungiwa, tengua. Vinginevyo, ifungie na `emit` tukio.

- Badilisha `_update` ili kuzuia pesa kuhamishwa kutoka kwa akaunti iliyofungiwa. Kumbuka kwamba pesa bado zinaweza kuhamishwa kwenye akaunti iliyofungiwa. Weka mstari huu mwanzoni mwa chaguo la kukokotoa, nje ya kizuizi cha `if`, ili pia kuzuia kuteketeza tokeni kutoka kwa akaunti iliyofungiwa.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Usafishaji wa mali {#asset-cleanup}

Ili kutoa tokeni za ERC-20 zinazoshikiliwa na mkataba huu tunahitaji kuita chaguo la kukokotoa kwenye mkataba wa tokeni ambazo ni zake, iwe [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) au [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Hakuna haja ya kupoteza gesi katika kesi hii kwenye posho (allowances), tunaweza pia kuhamisha moja kwa moja.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

Huu ni muundo wa kuunda kipengee (object) cha mkataba tunapopokea anwani. Ili kuitumia tunahitaji [ufafanuzi wa IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), kiolesura cha mkataba wa ERC-20 wa OpenZeppelin. Mstari wa `import {ERC20} from ...` wa Wizard huleta tu `ERC20`, kwa hivyo ongeza mstari huu karibu na uingizaji mwingine juu ya faili:

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Hili ni chaguo la kukokotoa la usafishaji, kwa hivyo labda hatutaki kuacha tokeni zozote. Badala ya kupata salio kutoka kwa mtumiaji mwenyewe, tunaweza pia kugeuza mchakato huo kuwa wa kiotomatiki.

## Hitimisho {#conclusion}

Hili si suluhisho kamilifu - hakuna suluhisho kamilifu kwa tatizo la "mtumiaji amefanya kosa". Hata hivyo, kutumia aina hizi za ukaguzi kunaweza angalau kuzuia baadhi ya makosa. Uwezo wa kufungia akaunti, ingawa ni hatari, unaweza kutumika kupunguza uharibifu wa udukuzi fulani kwa kumnyima mdukuzi fedha zilizoibiwa.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
