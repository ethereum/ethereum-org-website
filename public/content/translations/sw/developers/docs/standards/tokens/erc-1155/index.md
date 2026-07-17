---
title: Kiwango cha Tokeni Nyingi cha ERC-1155
description: Jifunze kuhusu ERC-1155, kiwango cha tokeni nyingi kinachounganisha tokheni mbadala na tokeni zisizobadilika katika mkataba mmoja.
lang: sw
---

## Utangulizi {#introduction}

Kiolesura cha kawaida cha mikataba inayosimamia aina nyingi za tokeni. Mkataba mmoja uliotumwa unaweza kujumuisha mchanganyiko wowote wa tokheni mbadala, tokeni zisizobadilika au usanidi mwingine (k.m., tokeni nusu-mbadala).

**Nini maana ya Kiwango cha Tokeni Nyingi?**

Wazo ni rahisi na linalenga kuunda kiolesura cha mkataba mahiri kinachoweza kuwakilisha na kudhibiti idadi yoyote ya aina za tokheni mbadala na tokeni zisizobadilika. Kwa njia hii, tokeni ya ERC-1155 inaweza kufanya kazi sawa na tokeni ya [ERC-20](/developers/docs/standards/tokens/erc-20/) na [ERC-721](/developers/docs/standards/tokens/erc-721/), na hata zote mbili kwa wakati mmoja. Inaboresha utendaji wa viwango vyote viwili vya ERC-20 na ERC-721, na kuifanya iwe na ufanisi zaidi na kusahihisha makosa dhahiri ya utekelezaji.

Tokeni ya ERC-1155 imeelezewa kikamilifu katika [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155).

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [viwango vya tokeni](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), na [ERC-721](/developers/docs/standards/tokens/erc-721/).

## Kazi na Vipengele vya ERC-1155: {#body}

- [Hamisho la Pamoja](#batch-transfers): Hamisha rasilimali nyingi katika wito mmoja.
- [Salio la Pamoja](#batch-balance): Pata salio la rasilimali nyingi katika wito mmoja.
- [Uidhinishaji wa Pamoja](#batch-approval): Idhinisha tokeni zote kwa anwani.
- [Ndoano (Hooks)](#receive-hook): Ndoano ya kupokea tokeni.
- [Usaidizi wa NFT](#nft-support): Ikiwa usambazaji ni 1 tu, ichukulie kama NFT.
- [Sheria za Hamisho Salama](#safe-transfer-rule): Seti ya sheria kwa ajili ya hamisho salama.

### Mahamisho ya Pamoja {#batch-transfers}

Hamisho la pamoja linafanya kazi sawa na mahamisho ya kawaida ya ERC-20. Hebu tuangalie kazi ya kawaida ya ERC-20 ya `transferFrom`:

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

Tofauti pekee katika ERC-1155 ni kwamba tunapitisha thamani kama safu (array) na pia tunapitisha safu ya vitambulisho (ids). Kwa mfano ukipewa `ids=[3, 6, 13]` na `values=[100, 200, 5]`, mahamisho yatakayotokea yatakuwa

1. Hamisha tokeni 100 zenye kitambulisho 3 kutoka `_from` kwenda `_to`.
2. Hamisha tokeni 200 zenye kitambulisho 6 kutoka `_from` kwenda `_to`.
3. Hamisha tokeni 5 zenye kitambulisho 13 kutoka `_from` kwenda `_to`.

Katika ERC-1155 tuna `transferFrom` pekee, hakuna `transfer`. Ili kuitumia kama `transfer` ya kawaida, weka tu anwani ya kutoka (from) iwe anwani inayoita kazi hiyo.

### Salio la Pamoja {#batch-balance}

Wito husika wa ERC-20 wa `balanceOf` vilevile una kazi yake mshirika yenye usaidizi wa pamoja. Kama ukumbusho, hili ni toleo la ERC-20:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

Rahisi zaidi kwa wito wa salio, tunaweza kupata masalio mengi katika wito mmoja. Tunapitisha safu ya wamiliki, ikifuatiwa na safu ya vitambulisho vya tokeni.

Kwa mfano ukipewa `_ids=[3, 6, 13]` na `_owners=[0xbeef..., 0x1337..., 0x1111...]`, thamani itakayorudishwa itakuwa

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### Uidhinishaji wa Pamoja {#batch-approval}

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

Uidhinishaji ni tofauti kidogo na ERC-20. Badala ya kuidhinisha kiasi maalum, unaweka mwendeshaji kuwa ameidhinishwa au hajaidhinishwa kupitia `setApprovalForAll`.

Kusoma hali ya sasa kunaweza kufanywa kupitia `isApprovedForAll`. Kama unavyoona, ni operesheni ya yote au hakuna. Huwezi kufafanua ni tokeni ngapi za kuidhinisha au hata darasa gani la tokeni.

Hii imeundwa kwa makusudi kwa kuzingatia urahisi. Unaweza tu kuidhinisha kila kitu kwa anwani moja.

### Ndoano ya Kupokea {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

Kutokana na usaidizi wa [EIP-165](https://eips.ethereum.org/EIPS/eip-165), ERC-1155 inasaidia ndoano za kupokea kwa mikataba mahiri pekee. Kazi ya ndoano lazima irudishe thamani ya uchawi iliyofafanuliwa awali ya bytes4 ambayo inatolewa kama:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

Wakati mkataba unaopokea unaporudisha thamani hii, inachukuliwa kuwa mkataba unakubali hamisho na unajua jinsi ya kushughulikia tokeni za ERC-1155. Safi, hakuna tena tokeni zilizokwama kwenye mkataba!

### Usaidizi wa NFT {#nft-support}

Wakati usambazaji ni mmoja tu, tokeni kimsingi ni tokeni isiyobadilika (NFT). Na kama ilivyo kawaida kwa ERC-721, unaweza kufafanua URL ya data fafanuzi. URL inaweza kusomwa na kurekebishwa na wateja, tazama [hapa](https://eips.ethereum.org/EIPS/eip-1155#metadata).

### Sheria ya Hamisho Salama {#safe-transfer-rule}

Tumeshagusia sheria chache za hamisho salama tayari katika maelezo yaliyopita. Lakini hebu tuangalie sheria muhimu zaidi:

1. Mpigaji lazima aidhinishwe kutumia tokeni kwa anwani ya `_from` au mpigaji lazima awe sawa na `_from`.
2. Wito wa hamisho lazima utengue ikiwa
   1. anwani ya `_to` ni 0.
   2. urefu wa `_ids` sio sawa na urefu wa `_values`.
   3. salio lolote la mmiliki (wamiliki) wa tokeni katika `_ids` liko chini ya kiasi husika katika `_values` kilichotumwa kwa mpokeaji.
   4. kosa lingine lolote linatokea.

_Kumbuka_: Kazi zote za pamoja ikiwa ni pamoja na ndoano pia zipo kama matoleo yasiyo ya pamoja. Hii inafanywa kwa ufanisi wa gesi, ikizingatiwa kuhamisha rasilimali moja tu huenda bado itakuwa njia inayotumiwa sana. Tumeziacha kwa urahisi katika maelezo, ikiwa ni pamoja na sheria za hamisho salama. Majina yanafanana, ondoa tu 'Batch' (Pamoja).

## Usomaji zaidi {#further-reading}

- [EIP-1155: Kiwango cha Tokeni Nyingi](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Nyaraka za OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: Hifadhi ya GitHub](https://github.com/enjin/erc-1155)
- [API ya NFT ya Alchemy](https://www.alchemy.com/docs/reference/nft-api-quickstart)