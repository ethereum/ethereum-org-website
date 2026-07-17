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

Moja ya mambo mazuri kuhusu Ethereum ni kwamba hakuna mamlaka kuu inayoweza kurekebisha au kutengua miamala yako. Moja ya matatizo makubwa ya Ethereum ni kwamba hakuna mamlaka kuu yenye uwezo wa kutengua makosa ya mtumiaji au miamala haramu. Katika makala haya utajifunza kuhusu baadhi ya makosa ya kawaida ambayo watumiaji hufanya na tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/), pamoja na jinsi ya kuunda mikataba ya ERC-20 inayosaidia watumiaji kuepuka makosa hayo, au inayopa mamlaka kuu uwezo fulani (kwa mfano kufungia akaunti).

Kumbuka kwamba ingawa tutatumia [mkataba wa tokeni wa ERC-20 wa OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), makala haya hayaelezi kwa kina sana. Unaweza kupata maelezo haya [hapa](/developers/tutorials/erc20-annotated-code).

Ikiwa unataka kuona msimbo kamili wa chanzo:

1. Fungua [Remix IDE](https://remix.ethereum.org/).
2. Bofya ikoni ya kuiga ya GitHub (![clone github icon](icon-clone.png)).
3. Iga hazina ya GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Fungua **contracts > erc20-safety-rails.sol**.

## Kuunda mkataba wa ERC-20 {#creating-an-erc-20-contract}

Kabla ya kuongeza utendakazi wa miongozo ya usalama tunahitaji mkataba wa ERC-20. Katika makala haya tutatumia [Mchawi wa Mikataba wa OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Ifungue kwenye kivinjari kingine na ufuate maagizo haya:

1. Chagua **ERC20**.
2. Weka mipangilio hii:

   | Kigezo      | Thamani            |
   | -------------- | ---------------- |
   | Jina           | SafetyRailsToken |
   | Alama         | SAFE             |
   | Premint        | 1000             |
   | Vipengele       | Hakuna             |
   | Udhibiti wa Ufikiaji | Ownable          |
   | Uboreshaji  | Hakuna             |

3. Sogeza juu na ubofye **Open in Remix** (kwa Remix) au **Download** ili kutumia mazingira tofauti. Nitachukulia kuwa unatumia Remix, ikiwa unatumia kitu kingine fanya tu mabadiliko yanayofaa.
4. Sasa tuna mkataba wa ERC-20 unaofanya kazi kikamilifu. Unaweza kupanua `.deps` > `npm` ili kuona msimbo ulioingizwa.
5. Kusanya, sambaza, na ucheze na mkataba ili kuona kwamba unafanya kazi kama mkataba wa ERC-20. Ikiwa unahitaji kujifunza jinsi ya kutumia Remix, [tumia mafunzo haya](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Makosa ya kawaida {#common-mistakes}

### Makosa {#the-mistakes}

Watumiaji wakati mwingine hutuma tokeni kwenye anwani isiyo sahihi. Ingawa hatuwezi kusoma mawazo yao ili kujua walichomaanisha kufanya, kuna aina mbili za makosa ambayo hutokea sana na ni rahisi kuyagundua:

1. Kutuma tokeni kwenye anwani ya mkataba wenyewe. Kwa mfano, [tokeni ya OP ya Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) ilifanikiwa kukusanya [zaidi ya 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) za tokeni za OP katika chini ya miezi miwili. Hii inawakilisha kiasi kikubwa cha utajiri ambacho huenda watu walipoteza tu.

2. Kutuma tokeni kwenye anwani tupu, ambayo hailingani na [akaunti inayomilikiwa na mtu wa nje (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) au [mkataba mahiri](/developers/docs/smart-contracts). Ingawa sina takwimu za mara ngapi hii hutokea, [tukio moja linaweza kuwa limegharimu tokeni 20,000,000](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Kuzuia uhamisho {#preventing-transfers}

Mkataba wa ERC-20 wa OpenZeppelin unajumuisha [ndoano, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), ambayo huitwa kabla ya tokeni kuhamishwa. Kwa chaguo-msingi ndoano hii haifanyi chochote, lakini tunaweza kuweka utendakazi wetu wenyewe juu yake, kama vile ukaguzi unaotengua ikiwa kuna tatizo.

Ili kutumia ndoano, ongeza chaguo hili la kukokotoa baada ya konstrukta:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Baadhi ya sehemu za chaguo hili la kukokotoa zinaweza kuwa mpya ikiwa hufahamu sana Solidity:

```solidity
        internal virtual
```

Neno kuu la `virtual` linamaanisha kwamba kama vile tulivyorithi utendakazi kutoka kwa `ERC20` na kubatilisha chaguo hili la kukokotoa, mikataba mingine inaweza kurithi kutoka kwetu na kubatilisha chaguo hili la kukokotoa.

```solidity
        override(ERC20)
```

Tunapaswa kubainisha wazi kwamba [tunabatilisha](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) ufafanuzi wa tokeni ya ERC-20 wa `_beforeTokenTransfer`. Kwa ujumla, ufafanuzi wa wazi ni bora zaidi, kutoka kwa mtazamo wa usalama, kuliko ule usio wazi - huwezi kusahau kwamba umefanya kitu ikiwa kiko mbele yako. Hiyo pia ndiyo sababu tunahitaji kubainisha ni `_beforeTokenTransfer` ya darasa kuu lipi tunayobatilisha.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Mstari huu unaita chaguo la kukokotoa la `_beforeTokenTransfer` la mkataba au mikataba ambayo tulirithi ambayo inayo. Katika kesi hii, hiyo ni `ERC20` pekee, `Ownable` haina ndoano hii. Ingawa kwa sasa `ERC20._beforeTokenTransfer` haifanyi chochote, tunaiita endapo utendakazi utaongezwa katika siku zijazo (na kisha tukaamua kusambaza tena mkataba, kwa sababu mikataba haibadiliki baada ya usambazaji).

### Kuweka msimbo wa mahitaji {#coding-the-requirements}

Tunataka kuongeza mahitaji haya kwenye chaguo la kukokotoa:

- Anwani ya `to` haiwezi kuwa sawa na `address(this)`, anwani ya mkataba wa ERC-20 wenyewe.
- Anwani ya `to` haiwezi kuwa tupu, inapaswa kuwa ama:
  - Akaunti inayomilikiwa na mtu wa nje (EOA). Hatuwezi kuangalia ikiwa anwani ni EOA moja kwa moja, lakini tunaweza kuangalia salio la ETH la anwani. EOA karibu kila wakati zina salio, hata kama hazitumiki tena - ni vigumu kuzisafisha hadi Wei ya mwisho.
  - Mkataba mahiri. Kujaribu ikiwa anwani ni mkataba mahiri ni ngumu kidogo. Kuna msimbo wa operesheni unaoangalia urefu wa msimbo wa nje, unaoitwa [`EXTCODESIZE`](https://www.evm.codes/#3b), lakini haupatikani moja kwa moja katika Solidity. Tunapaswa kutumia [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), ambayo ni asambli ya EVM, kwa ajili yake. Kuna thamani zingine tunazoweza kutumia kutoka kwa Solidity ([`<address>.code` na `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), lakini zinagharimu zaidi.

Hebu tupitie msimbo mpya mstari kwa mstari:

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

Hili ni hitaji la kwanza, angalia kwamba `to` na `this(address)` si kitu kimoja.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Hivi ndivyo tunavyoangalia ikiwa anwani ni mkataba. Hatuwezi kupokea matokeo moja kwa moja kutoka kwa Yul, kwa hivyo badala yake tunafafanua kigezo cha kushikilia matokeo (`isToContract` katika kesi hii). Jinsi Yul inavyofanya kazi ni kwamba kila msimbo wa operesheni unachukuliwa kama chaguo la kukokotoa. Kwa hivyo kwanza tunaita [`EXTCODESIZE`](https://www.evm.codes/#3b) ili kupata ukubwa wa mkataba, na kisha kutumia [`GT`](https://www.evm.codes/#11) kuangalia kuwa si sifuri (tunashughulika na nambari kamili zisizo na saini, kwa hivyo bila shaka haziwezi kuwa hasi). Kisha tunaandika matokeo kwenye `isToContract`.

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

- Mikataba ya [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) ina mmiliki mmoja. Chaguo za kukokotoa ambazo zina [kirekebishaji](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) cha `onlyOwner` zinaweza tu kuitwa na mmiliki huyo. Wamiliki wanaweza kuhamisha umiliki kwa mtu mwingine au kuukataa kabisa. Haki za akaunti zingine zote kwa kawaida zinafanana.
- Mikataba ya [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) ina [udhibiti wa ufikiaji kulingana na jukumu (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Kwa ajili ya urahisi, katika makala haya tunatumia `Ownable`.

### Kufungia na kufungua mikataba {#freezing-and-thawing-contracts}

Kufungia na kufungua mikataba kunahitaji mabadiliko kadhaa:

- [Uchoraji wa ramani](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) kutoka kwa anwani hadi [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) ili kufuatilia ni anwani zipi zimefungiwa. Thamani zote mwanzoni ni sifuri, ambayo kwa thamani za boolean inatafsiriwa kama uongo. Hiki ndicho tunachotaka kwa sababu kwa chaguo-msingi akaunti hazijafungiwa.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Matukio](https://www.tutorialspoint.com/solidity/solidity_events.htm) ya kumjulisha mtu yeyote anayevutiwa wakati akaunti imefungiwa au kufunguliwa. Kitaalam matukio hayahitajiki kwa vitendo hivi, lakini inasaidia msimbo wa nje ya mnyororo kuweza kusikiliza matukio haya na kujua kinachoendelea. Inachukuliwa kuwa tabia nzuri kwa mkataba mahiri kuyatoa wakati jambo ambalo linaweza kuwa muhimu kwa mtu mwingine linatokea.

  Matukio yameorodheshwa kwa hivyo itawezekana kutafuta nyakati zote ambazo akaunti imefungiwa au kufunguliwa.

  ```solidity
    // Wakati akaunti zinapogandishwa au kuganduliwa
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Chaguo za kukokotoa za kufungia na kufungua akaunti. Chaguo hizi mbili za kukokotoa zinakaribia kufanana, kwa hivyo tutapitia tu chaguo la kukokotoa la kufungia.

  ```solidity
      function gandishaAkaunti(address addr)
        public
        onlyOwner
  ```

  Chaguo za kukokotoa zilizowekwa alama ya [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) zinaweza kuitwa kutoka kwa mikataba mingine mahiri au moja kwa moja na muamala.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Ikiwa akaunti tayari imefungiwa, tengua. Vinginevyo, ifungie na `emit` tukio.

- Badilisha `_beforeTokenTransfer` ili kuzuia pesa kuhamishwa kutoka kwa akaunti iliyofungiwa. Kumbuka kwamba pesa bado zinaweza kuhamishiwa kwenye akaunti iliyofungiwa.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Usafishaji wa mali {#asset-cleanup}

Ili kutoa tokeni za ERC-20 zinazoshikiliwa na mkataba huu tunahitaji kuita chaguo la kukokotoa kwenye mkataba wa tokeni ambazo ni zake, ama [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) au [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Hakuna haja ya kupoteza gesi katika kesi hii kwenye posho, tunaweza pia kufanya hamisho moja kwa moja.

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

Huu ni muundo wa kuunda kipengee cha mkataba tunapopokea anwani. Tunaweza kufanya hivi kwa sababu tuna ufafanuzi wa tokeni za ERC-20 kama sehemu ya msimbo wa chanzo (tazama mstari wa 4), na faili hiyo inajumuisha [ufafanuzi wa IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), kiolesura cha mkataba wa ERC-20 wa OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Hili ni chaguo la kukokotoa la usafishaji, kwa hivyo huenda hatutaki kuacha tokeni zozote. Badala ya kupata salio kutoka kwa mtumiaji kwa mikono, tunaweza pia kugeuza mchakato huo kuwa wa kiotomatiki.

## Hitimisho {#conclusion}

Hili si suluhisho kamilifu - hakuna suluhisho kamilifu kwa tatizo la "mtumiaji amefanya kosa". Hata hivyo, kutumia aina hizi za ukaguzi kunaweza angalau kuzuia baadhi ya makosa. Uwezo wa kufungia akaunti, ingawa ni hatari, unaweza kutumika kupunguza uharibifu wa udukuzi fulani kwa kumnyima mdukuzi fedha zilizoibiwa.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).