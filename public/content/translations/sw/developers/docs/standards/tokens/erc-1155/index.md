---
title: ERC-1155 Mengi-ishara Kiwango
description: Jifunze kuhusu ERC-1155, kiwango cha tokeni-nyingi ambacho kinachanganya tokeni zinazoweza kubadilishana na zisizoweza kubadilishana katika mkataba mmoja.
lang: sw
---

## Utangulizi {#introduction}

Kiwango Mtandao kwa ajili ya mikataba ambayo kusimamia aina nyingi ishara. Mkataba mmoja uliotumwa unaweza kuwa na mchanganyiko wowote wa tokeni zinazoweza kubadilishana, tokeni zisizoweza kubadilishana au usanidi mwingine (k.m., tokeni nusu-badilishani).

**Nini maana ya mengi-ishara kiwango?**

Wazo ni rahisi na inataka kujenga erevu mkataba ni Mtandao ambayo inaweza kuwakilisha na kudhibiti idadi yoyote ya badilishwa na zisizo badilishwa aina ishara. Kwa njia hii, tokeni ya ERC-1155 inaweza kufanya kazi sawa na tokeni ya [ERC-20](/developers/docs/standards/tokens/erc-20/) na [ERC-721](/developers/docs/standards/tokens/erc-721/), na hata zote mbili kwa wakati mmoja. Wezesha utendaji wa viwango vya ERC-20 na ERC-721, na kuifanya iwe na ufanisi zaidi na kurekebisha makosa dhahiri ya utekelezaji.

Tokeni ya ERC-1155 imeelezewa kikamilifu katika [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri, tunapendekeza kwanza usome kuhusu [viwango vya tokeni](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), na [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Kazi na Vipengele vya ERC-1155: {#body}

- [Uhamisho wa Kundi](#batch_transfers): Hamisha rasilimali nyingi kwa wito mmoja.
- [Salio la Kundi](#batch_balance): Pata salio za rasilimali nyingi kwa wito mmoja.
- [Idhini ya Kundi](#batch_approval): Idhinisha tokeni zote kwa anwani.
- [Hook](#receive_hook): Hook ya kupokea tokeni.
- [Usaidizi wa NFT](#nft_support): Ikiwa usambazaji ni 1 pekee, ichukulie kama NFT.
- [Kanuni za Uhamisho Salama](#safe_transfer_rule): Seti ya kanuni za uhamisho salama.

### Uhamisho wa Kundi {#batch-transfers}

Uhamisho wa kundi hufanya kazi sawa na uhamisho wa kawaida wa ERC-20. Hebu tuangalie kazi ya kawaida ya `transferFrom` ya ERC-20:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

Tofauti tu katika ERC-1155 ni kwamba sisi kupita maadili kama safu na sisi pia kupita safu ya kitambulisho. Kwa mfano, ukipewa `ids=[3, 6, 13]` na `values=[100, 200, 5]`, uhamisho utakaotokea utakuwa

1. Hamisha tokeni 100 zenye id 3 kutoka `_from` kwenda `_to`.
2. Hamisha tokeni 200 zenye id 6 kutoka `_from` kwenda `_to`.
3. Hamisha tokeni 5 zenye id 13 kutoka `_from` kwenda `_to`.

Katika ERC-1155 tuna `transferFrom` pekee, hakuna `transfer`. Ili kuitumia kama `transfer` ya kawaida, weka tu anwani ya kutoka iwe anwani inayoita kazi.

### Salio la Kundi {#batch-balance}

Wito husika wa `balanceOf` wa ERC-20 kadhalika una kazi yake mshirika yenye usaidizi wa kundi. Kama ukumbusho, hii ni ERC-20 toleo:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Hata rahisi kwa usawa wito, tunaweza kupata mizani nyingi katika wito moja. Sisi kupita safu ya wenyeji, kufuatia na safu ya kitambulisho ishara.

Kwa mfano ukipewa `_ids=[3, 6, 13]` na `_owners=[0xbeef..., 0x1337..., 0x1111...]`, thamani ya kurudi itakuwa

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Idhini ya Kundi {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

Idhini ni tofauti kidogo kuliko ERC-20. Badala ya kuidhinisha kiasi maalum, unaweka opereta kuwa ameidhinishwa au hajaidhinishwa kupitia `setApprovalForAll`.

Kusoma hali ya sasa kunaweza kufanywa kupitia `isApprovedForAll`. Kama una tazama, ni operesheni ya yote au hakuna. Huwezi kufafanua jinsi ishara nyingi kupitisha au hata ambayo ishara ya darasa.

Hii ni makusudi iliyoundwa na unyenyekevu katika akili. Unaweza tu kupitisha kila kitu kwa anwani moja.

### Hook ya Kupokea {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Kwa usaidizi wa [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 inasaidia hook za kupokea kwa mikataba-erevu pekee. Kulabu kazi lazima kurudi uchawi kabla ya faini baiti4 thamani ambayo ni kutokana na:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Wakati mkataba kupokea anarudi thamani hii, kuchukuliwa mkataba anakubali uhamisho na anajua jinsi ya kushughulikia ERC-1155 ishara. Kubwa, hakuna zaidi kukwama ishara katika mkataba!

### Usaidizi wa NFT {#nft-support}

Wakati ugavi ni moja tu, ishara ni kimsingi ishara zisizo badilishwa (NFT). Na kama ni kiwango kwa ERC-721, unaweza kufafanua URL habari. URL inaweza kusomwa na kubadilishwa na wateja, angalia [hapa](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Kanuni ya Uhamisho Salama {#safe-transfer-rule}

Tumekuwa kuguswa juu ya utawala chache salama uhamisho tayari katika maelezo ya awali. Lakini hebu tazama utawala muhimu zaidi:

1. Mtoa wito lazima aidhinishwe kutumia tokeni za anwani ya `_from` au mtoa wito lazima awe sawa na `_from`.
2. Wito uhamisho lazima kurudi kama
   1. Anwani ya `_to` ni 0.
   2. urefu wa `_ids` si sawa na urefu wa `_values`.
   3. salio lolote la mmiliki kwa ajili ya tokeni katika `_ids` ni dogo kuliko kiasi husika katika `_values` kilichotumwa kwa mpokeaji.
   4. kosa lolote lingine hutokea.

_Kumbuka_: Kazi zote za kundi, ikiwemo hook, pia zinapatikana kama matoleo yasiyo na kundi. Hii ni kufanyika kwa ajili ya ufanisi wa gesi, kuzingatia kuhamisha tu mali moja pengine bado kuwa njia ya kawaida kutumika. Wacha nje kwa uwazi katika maelezo, ikiwa ni pamoja na utawala za uhamisho salama. Majina ni sawa, tu kuondoa 'Kikundi'.

## Masomo zaidi {#further-reading}

- [EIP-1155: Kiwango cha Tokeni Nyingi](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Nyaraka za OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Repo ya GitHub](https://github.com/enjin/erc-1155)
- [API ya NFT ya Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)
