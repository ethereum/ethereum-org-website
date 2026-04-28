---
title: ERC-20 yenye Kinga za Usalama
description: Jinsi ya kuwasaidia watu kuepuka makosa ya kizembe
author: Ori Pomerantz
lang: sw
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Utangulizi {#introduction}

Moja ya mambo makuu kuhusu Ethereum ni kwamba hakuna mamlaka kuu inayoweza kurekebisha au kutengua miamala yako. Moja ya matatizo makuu ya Ethereum ni kwamba hakuna mamlaka kuu yenye uwezo wa kutengua makosa ya mtumiaji au miamala haramu. Katika makala haya utajifunza kuhusu baadhi ya makosa ya kawaida ambayo watumiaji hufanya na tokeni za [ERC-20](/developers/docs/standards/tokens/erc-20/), pamoja na jinsi ya kuunda mikataba ya ERC-20 inayowasaidia watumiaji kuepuka makosa hayo, au inayopa mamlaka kuu nguvu fulani (kwa mfano kufungia akaunti).

Kumbuka kwamba ingawa tutatumia mkataba wa tokeni wa [OpenZeppelin ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), makala haya hayaielezei kwa undani sana. Unaweza kupata maelezo haya [hapa](/developers/tutorials/erc20-annotated-code).

Ikiwa unataka kuona msimbo chanzo kamili:

1. Fungua [Remix IDE](https://remix.ethereum.org/).
2. Bofya aikoni ya kuiga ya github (![aikoni ya kuiga ya github](icon-clone.png)).
3. Iga hifadhi ya github `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Fungua **contracts > erc20-safety-rails.sol**.

## Kuunda mkataba wa ERC-20 {#creating-an-erc-20-contract}

Kabla hatujaongeza utendaji wa kinga za usalama, tunahitaji mkataba wa ERC-20. Katika makala haya tutatumia [Mchawi wa Mikataba ya OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Ifungue katika kivinjari kingine na ufuate maagizo haya:

1. Chagua **ERC20**.

2. Weka mipangilio hii:

   | Kigezo               | Thamani          |
   | -------------------- | ---------------- |
   | Jina                 | SafetyRailsToken |
   | Alama                | SAFE             |
   | Premint              | 1000             |
   | Vipengele            | Hakuna           |
   | Udhibiti wa Ufikiaji | Ownable          |
   | Uwezo wa Kuboresha   | Hakuna           |

3. Sogeza juu na ubofye **Fungua kwenye Remix** (kwa Remix) au **Pakua** ili utumie mazingira tofauti. Nitachukulia kuwa unatumia Remix, ikiwa unatumia kitu kingine, fanya tu mabadiliko yanayofaa.

4. Sasa tuna mkataba wa ERC-20 unaofanya kazi kikamilifu. Unaweza kupanua `.deps` > `npm` ili kuona msimbo ulioingizwa.

5. Kusanya, sambaza, na cheza na mkataba ili kuona kuwa inafanya kazi kama mkataba wa ERC-20. Ikiwa unahitaji kujifunza jinsi ya kutumia Remix, [tumia mafunzo haya](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Makosa ya kawaida {#common-mistakes}

### Makosa {#the-mistakes}

Wakati mwingine watumiaji hutuma tokeni kwenye anwani isiyo sahihi. Ingawa hatuwezi kusoma akili zao kujua walichokusudia kufanya, kuna aina mbili za makosa yanayotokea sana na ni rahisi kugundua:

1. Kutuma tokeni kwenye anwani ya mkataba wenyewe. Kwa mfano, tokeni ya OP ya [Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) iliweza kukusanya [zaidi ya 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) tokeni za OP katika chini ya miezi miwili. Hii inawakilisha kiasi kikubwa cha mali ambayo inawezekana watu wameipoteza tu.

2. Kutuma tokeni kwenye anwani tupu, ile ambayo haiendani na [akaunti inayomilikiwa nje](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) au [mkataba-erevu](/developers/docs/smart-contracts). Ingawa sina takwimu za mara ngapi hili hutokea, [tukio moja lingeweza kugharimu tokeni 20,000,000](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Kuzuia uhamisho {#preventing-transfers}

Mkataba wa OpenZeppelin ERC-20 unajumuisha [kiunganishi, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), ambacho huitwa kabla ya tokeni kuhamishwa. Kwa chaguo-msingi kiunganishi hiki hakifanyi chochote, lakini tunaweza kuweka utendaji wetu wenyewe juu yake, kama vile ukaguzi unaorejesha nyuma ikiwa kuna tatizo.

Ili kutumia kiunganishi, ongeza chaguo hili la kukokotoa baada ya kiunda:

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Baadhi ya sehemu za chaguo hili la kukokotoa zinaweza kuwa mpya ikiwa huna uzoefu sana na Solidity:

```solidity
        internal virtual
```

Neno kuu `virtual` linamaanisha kuwa kama vile tulivyorithi utendaji kutoka `ERC20` na kubatilisha chaguo hili la kukokotoa, mikataba mingine inaweza kurithi kutoka kwetu na kubatilisha chaguo hili la kukokotoa.

```solidity
        override(ERC20)
```

Lazima tubainishe waziwazi kwamba [tunabatilisha](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) ufafanuzi wa tokeni ya ERC20 wa `_beforeTokenTransfer`. Kwa ujumla, ufafanuzi wa wazi ni bora zaidi, kutoka kwa mtazamo wa usalama, kuliko zile zilizodokezwa - huwezi kusahau kwamba umefanya kitu ikiwa kiko mbele yako. Hiyo pia ndiyo sababu tunahitaji kubainisha `_beforeTokenTransfer` ya daraja gani kuu tunayobatilisha.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Mstari huu unaita chaguo la kukokotoa la `_beforeTokenTransfer` la mkataba au mikataba tuliyorithi kutoka kwayo ambayo inayo. Katika kesi hii, hiyo ni `ERC20` tu, `Ownable` haina kiunganishi hiki. Ingawa kwa sasa `ERC20._beforeTokenTransfer` haifanyi chochote, tunaiita endapo utendaji utaongezwa katika siku zijazo (na kisha tunaamua kusambaza tena mkataba, kwa sababu mikataba haibadiliki baada ya usambazaji).

### Kuweka msimbo wa mahitaji {#coding-the-requirements}

Tunataka kuongeza mahitaji haya kwenye chaguo la kukokotoa:

- Anwani ya `to` haiwezi kuwa sawa na `address(this)`, anwani ya mkataba wa ERC-20 wenyewe.
- Anwani ya `to` haiwezi kuwa tupu, lazima iwe ama:
  - Akaunti inayomilikiwa nje (EOA). Hatuwezi kuangalia kama anwani ni EOA moja kwa moja, lakini tunaweza kuangalia salio la ETH la anwani. EOA karibu kila mara huwa na salio, hata kama hazitumiki tena - ni vigumu kuzisafisha hadi wei ya mwisho.
  - Mkataba-erevu. Kupima kama anwani ni mkataba-erevu ni kugumu kidogo. Kuna opcode inayokagua urefu wa msimbo wa nje, inayoitwa [`EXTCODESIZE`](https://www.evm.codes/#3b), lakini haipatikani moja kwa moja katika Solidity. Lazima tutumie [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), ambayo ni mkusanyiko wa EVM, kwa ajili yake. Kuna thamani zingine ambazo tunaweza kutumia kutoka Solidity ([`<address>.code` na `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), lakini zinagharimu zaidi.

Hebu tupitie msimbo mpya mstari kwa mstari:

```solidity
        require(to != address(this), "Haiwezi kutuma tokeni kwa anwani ya mkataba");
```

Hili ndilo sharti la kwanza, angalia kuwa `to` na `this(address)` si kitu kimoja.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Hivi ndivyo tunavyoangalia kama anwani ni mkataba. Hatuwezi kupokea matokeo moja kwa moja kutoka Yul, kwa hivyo badala yake tunafafanua kigezo cha kushikilia matokeo (`isToContract` katika kesi hii). Jinsi Yul inavyofanya kazi ni kwamba kila opcode inachukuliwa kama chaguo la kukokotoa. Kwa hivyo kwanza tunaita [`EXTCODESIZE`](https://www.evm.codes/#3b) ili kupata ukubwa wa mkataba, na kisha kutumia [`GT`](https://www.evm.codes/#11) kuangalia si sifuri (tunashughulika na nambari kamili zisizo na alama, kwa hivyo bila shaka haiwezi kuwa hasi). Kisha tunaandika matokeo kwa `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Haiwezi kutuma tokeni kwa anwani tupu");
```

Na hatimaye, tuna ukaguzi halisi wa anwani tupu.

## Ufikiaji wa kiutawala {#admin-access}

Wakati mwingine ni muhimu kuwa na msimamizi anaye weza kutengua makosa. Ili kupunguza uwezekano wa matumizi mabaya, msimamizi huyu anaweza kuwa [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) ili watu wengi wakubaliane juu ya hatua. Katika makala haya tutakuwa na vipengele viwili vya kiutawala:

1. Kufungia na kufungua akaunti. Hii inaweza kuwa muhimu, kwa mfano, wakati akaunti inaweza kuathiriwa.
2. Usafishaji wa mali.

   Wakati mwingine walaghai hutuma tokeni za ulaghai kwa mkataba halisi wa tokeni ili kupata uhalali. Kwa mfano, [angalia hapa](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Mkataba halali wa ERC-20 ni [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). Ulaghai unaojifanya kuwa ni [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Inawezekana pia kwamba watu hutuma tokeni halali za ERC-20 kwenye mkataba wetu kwa makosa, ambayo ni sababu nyingine ya kutaka kuwa na njia ya kuzitoa.

OpenZeppelin hutoa mifumo miwili ya kuwezesha ufikiaji wa kiutawala:

- Mikataba ya [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) ina mmiliki mmoja. Chaguo za kukokotoa zilizo na [kirekebishaji](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) cha `onlyOwner` zinaweza kuitwa tu na mmiliki huyo. Wamiliki wanaweza kuhamisha umiliki kwa mtu mwingine au kuukana kabisa. Haki za akaunti zingine zote kwa kawaida huwa sawa.
- Mikataba ya [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) ina [udhibiti wa ufikiaji unaotegemea jukumu (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Kwa urahisi, katika makala haya tunatumia `Ownable`.

### Kufungia na kufungua mikataba {#freezing-and-thawing-contracts}

Kufungia na kufungua mikataba kunahitaji mabadiliko kadhaa:

- [Ramani](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) kutoka kwa anwani hadi [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) ili kufuatilia ni anwani gani zimefungiwa. Thamani zote awali ni sifuri, ambayo kwa thamani za boolean inatafsiriwa kama uongo. Hiki ndicho tunachotaka kwa sababu kwa chaguomsingi akaunti hazijafungiwa.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [Matukio](https://www.tutorialspoint.com/solidity/solidity_events.htm) ya kumjulisha yeyote anayevutiwa wakati akaunti imefungiwa au kufunguliwa. Kitaalamu, matukio hayahitajiki kwa vitendo hivi, lakini inasaidia msimbo wa offchain kuweza kusikiliza matukio haya na kujua kinachoendelea. Inachukuliwa kuwa ni adabu njema kwa mkataba-erevu kuzitoa wakati kitu kinachoweza kuwa muhimu kwa mtu mwingine kinapotokea.

  Matukio yameorodheshwa kwa hivyo itawezekana kutafuta kwa nyakati zote ambazo akaunti imefungiwa au kufunguliwa.

  ```solidity
    // Wakati akaunti zimefungiwa au kufunguliwa
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Chaguo za kukokotoa za kufungia na kufungua akaunti. Chaguo hizi mbili za kukokotoa karibu zinafanana, kwa hivyo tutapitia tu chaguo la kukokotoa la kufungia.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Chaguo za kukokotoa zilizo na alama ya [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) zinaweza kuitwa kutoka kwa mikataba-erevu mingine au moja kwa moja na muamala.

  ```solidity
    {
        require(!frozenAccounts[addr], "Akaunti tayari imefungiwa");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Ikiwa akaunti tayari imefungiwa, rejesha. Vinginevyo, ifungie na `toa` tukio.

- Badilisha `_beforeTokenTransfer` ili kuzuia pesa zisihamishwe kutoka kwa akaunti iliyofungiwa. Kumbuka kuwa pesa bado zinaweza kuhamishiwa kwenye akaunti iliyofungiwa.

  ```solidity
       require(!frozenAccounts[from], "Akaunti imefungiwa");
  ```

### Usafishaji wa mali {#asset-cleanup}

Ili kutoa tokeni za ERC-20 zinazoshikiliwa na mkataba huu tunahitaji kuita chaguo la kukokotoa kwenye mkataba wa tokeni ambao zinahusika, ama [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) au [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Hakuna maana ya kupoteza gesi katika kesi hii kwenye posho, tunaweza pia kuhamisha moja kwa moja.

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

Hii ndiyo sintaksia ya kuunda kitu kwa ajili ya mkataba tunapopokea anwani. Tunaweza kufanya hivi kwa sababu tuna ufafanuzi wa tokeni za ERC20 kama sehemu ya msimbo chanzo (tazama mstari wa 4), na faili hiyo inajumuisha [ufafanuzi wa IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), kiolesura cha mkataba wa OpenZeppelin ERC-20.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Hili ni chaguo la kukokotoa la usafishaji, kwa hivyo inawezekana hatutaki kuacha tokeni zozote. Badala ya kupata salio kutoka kwa mtumiaji mwenyewe, tunaweza pia kufanya mchakato uwe wa kiotomatiki.

## Hitimisho {#conclusion}

Hili si suluhisho kamili - hakuna suluhisho kamili kwa tatizo la "mtumiaji amefanya kosa". Hata hivyo, kutumia aina hizi za ukaguzi kunaweza angalau kuzuia makosa kadhaa. Uwezo wa kufungia akaunti, ingawa ni hatari, unaweza kutumika kupunguza uharibifu wa udukuzi fulani kwa kumnyima mdukuzi fedha zilizoibwa.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
