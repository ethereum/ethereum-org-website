---
title: Kiwango cha Tokeni Inayolipwa cha ERC-1363
description: ERC-1363 ni kiolesura cha upanuzi cha tokeni za ERC-20 kinachounga mkono kutekeleza mantiki maalum kwenye mkataba wa mpokeaji baada ya uhamisho, au kwenye mkataba wa mtumiaji baada ya idhini, yote ndani ya muamala mmoja.
lang: sw
---

## Utangulizi {#introduction}

### ERC-1363 ni nini? {#what-is-erc1363}

ERC-1363 ni kiolesura cha upanuzi cha tokeni za ERC-20 kinachounga mkono kutekeleza mantiki maalum kwenye mkataba wa mpokeaji baada ya uhamisho, au kwenye mkataba wa mtumiaji baada ya idhini, yote ndani ya muamala mmoja.

### Tofauti na ERC-20 {#erc20-differences}

Operesheni za kawaida za ERC-20 kama `transfer`, `transferFrom` na `approve`, haziruhusu utekelezaji wa msimbo kwenye mkataba wa mpokeaji au mtumiaji bila muamala tofauti.
Hii inaleta ugumu katika uundaji wa kiolesura cha mtumiaji (UI) na msuguano katika upokeaji kwa sababu watumiaji lazima wasubiri muamala wa kwanza utekelezwe na kisha wawasilishe wa pili.
Pia lazima walipe gesi mara mbili.

ERC-1363 inafanya tokeni zinazoweza kubadilishana kuwa na uwezo wa kufanya vitendo kwa urahisi zaidi na kufanya kazi bila matumizi ya msikilizaji yeyote wa nje ya mnyororo.
Inaruhusu kufanya wito wa kurudi (callback) kwenye mkataba wa mpokeaji au mtumiaji, baada ya hamisho au idhini, katika muamala mmoja.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu:

- [Viwango vya tokeni](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Mwili {#body}

ERC-1363 inaleta API ya kiwango kwa tokeni za ERC-20 ili kuingiliana na mikataba mahiri baada ya `transfer`, `transferFrom` au `approve`.

Kiwango hiki kinatoa utendaji wa kimsingi wa kuhamisha tokeni, pamoja na kuruhusu tokeni kuidhinishwa ili ziweze kutumiwa na mtu mwingine wa tatu mnyororoni, na kisha kufanya wito wa kurudi kwenye mkataba wa mpokeaji au mtumiaji.

Kuna matumizi mengi yaliyopendekezwa ya mikataba mahiri yanayoweza kukubali wito wa kurudi wa ERC-20.

Mifano inaweza kuwa:

- **Mauzo ya umati (Crowdsales)**: tokeni zilizotumwa huchochea ugawaji wa tuzo wa papo hapo.
- **Huduma**: malipo huwezesha ufikiaji wa huduma katika hatua moja.
- **Ankara**: tokeni hulipa ankara kiotomatiki.
- **Usajili**: kuidhinisha kiwango cha mwaka huwezesha usajili ndani ya malipo ya mwezi wa kwanza.

Kwa sababu hizi hapo awali ilipewa jina la **"Tokeni Inayolipwa"**.

Tabia ya wito wa kurudi inapanua zaidi matumizi yake, kuwezesha mwingiliano usio na mshono kama vile:

- **Uwekaji dhamana**: tokeni zilizohamishwa huchochea ufungaji wa kiotomatiki katika mkataba wa uwekaji dhamana.
- **Kura**: tokeni zilizopokelewa husajili kura katika mfumo wa utawala.
- **Badilishano**: idhini za tokeni huwezesha mantiki ya badilishano katika hatua moja.

Tokeni za ERC-1363 zinaweza kutumika kwa matumizi maalum katika visa vyote vinavyohitaji wito wa kurudi kutekelezwa baada ya hamisho au idhini kupokelewa.
ERC-1363 pia ni muhimu kwa kuepuka upotezaji wa tokeni au kufungwa kwa tokeni katika mikataba mahiri kwa kuthibitisha uwezo wa mpokeaji kushughulikia tokeni.

Tofauti na mapendekezo mengine ya upanuzi wa ERC-20, ERC-1363 haibatilishi mbinu za ERC-20 za `transfer` na `transferFrom` na inafafanua vitambulisho vya violesura (interfaces IDs) vitakavyotekelezwa huku ikidumisha utangamano wa nyuma na ERC-20.

Kutoka [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Mbinu {#methods}

Mikataba mahiri inayotekeleza kiwango cha ERC-1363 **LAZIMA** itekeleze kazi zote katika kiolesura cha `ERC1363`, pamoja na violesura vya `ERC20` na `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Kiolesura cha ugani cha tokeni za ERC-20 kinachounga mkono kutekeleza msimbo kwenye mkataba wa mpokeaji
 * baada ya `transfer` au `transferFrom`, au msimbo kwenye mkataba wa mtumiaji baada ya `approve`, katika muamala mmoja.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * KUMBUKA: kitambulisho cha ERC-165 cha kiolesura hiki ni 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Inahamisha kiasi cha `value` cha tokeni kutoka kwenye akaunti ya mpigaji kwenda `to`
   * na kisha kuita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni zinazopaswa kuhamishwa.
   * @return Thamani ya boolean inayoonyesha operesheni imefaulu isipokuwa kama inatupa kosa (throwing).
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Inahamisha kiasi cha `value` cha tokeni kutoka kwenye akaunti ya mpigaji kwenda `to`
   * na kisha kuita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni zinazopaswa kuhamishwa.
   * @param data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwenda `to`.
   * @return Thamani ya boolean inayoonyesha operesheni imefaulu isipokuwa kama inatupa kosa (throwing).
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Inahamisha kiasi cha `value` cha tokeni kutoka `from` kwenda `to` kwa kutumia utaratibu wa posho (allowance)
   * na kisha kuita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param from Anwani ambayo tokeni zitatumwa kutoka.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni zinazopaswa kuhamishwa.
   * @return Thamani ya boolean inayoonyesha operesheni imefaulu isipokuwa kama inatupa kosa (throwing).
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Inahamisha kiasi cha `value` cha tokeni kutoka `from` kwenda `to` kwa kutumia utaratibu wa posho (allowance)
   * na kisha kuita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param from Anwani ambayo tokeni zitatumwa kutoka.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni zinazopaswa kuhamishwa.
   * @param data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwenda `to`.
   * @return Thamani ya boolean inayoonyesha operesheni imefaulu isipokuwa kama inatupa kosa (throwing).
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Inaweka kiasi cha `value` cha tokeni kama posho ya `spender` juu ya tokeni za mpigaji
   * na kisha kuita `ERC1363Spender::onApprovalReceived` kwenye `spender`.
   * @param spender Anwani itakayotumia fedha.
   * @param value Kiasi cha tokeni zinazopaswa kutumika.
   * @return Thamani ya boolean inayoonyesha operesheni imefaulu isipokuwa kama inatupa kosa (throwing).
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Inaweka kiasi cha `value` cha tokeni kama posho ya `spender` juu ya tokeni za mpigaji
   * na kisha kuita `ERC1363Spender::onApprovalReceived` kwenye `spender`.
   * @param spender Anwani itakayotumia fedha.
   * @param value Kiasi cha tokeni zinazopaswa kutumika.
   * @param data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwenda `spender`.
   * @return Thamani ya boolean inayoonyesha operesheni imefaulu isipokuwa kama inatupa kosa (throwing).
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Mkataba mahiri unaotaka kukubali tokeni za ERC-1363 kupitia `transferAndCall` au `transferFromAndCall` **LAZIMA** utekeleze kiolesura cha `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Kiolesura cha mkataba wowote unaotaka kuunga mkono `transferAndCall` au `transferFromAndCall` kutoka kwenye mikataba ya tokeni za ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Kila wakati tokeni za ERC-1363 zinapohamishiwa kwenye mkataba huu kupitia `ERC1363::transferAndCall` au `ERC1363::transferFromAndCall`
   * na `operator` kutoka `from`, chaguo hili la kukokotoa (function) linaitwa.
   *
   * KUMBUKA: Ili kukubali hamisho, hii lazima irudishe
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (yaani 0x88a7ca5c, au kiteuzi chake cha chaguo la kukokotoa).
   *
   * @param operator Anwani iliyoita chaguo la kukokotoa la `transferAndCall` au `transferFromAndCall`.
   * @param from Anwani ambayo tokeni zinahamishwa kutoka.
   * @param value Kiasi cha tokeni zilizohamishwa.
   * @param data Data ya ziada isiyo na umbizo maalum.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` ikiwa hamisho linaruhusiwa isipokuwa kama inatupa kosa (throwing).
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Mkataba mahiri unaotaka kukubali tokeni za ERC-1363 kupitia `approveAndCall` **LAZIMA** utekeleze kiolesura cha `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Kiolesura cha mkataba wowote unaotaka kuunga mkono `approveAndCall` kutoka kwenye mikataba ya tokeni za ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Kila wakati `owner` wa tokeni za ERC-1363 anapoidhinisha mkataba huu kupitia `ERC1363::approveAndCall`
   * kutumia tokeni zao, chaguo hili la kukokotoa (function) linaitwa.
   *
   * KUMBUKA: Ili kukubali idhini, hii lazima irudishe
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (yaani 0x7b04a2d0, au kiteuzi chake cha chaguo la kukokotoa).
   *
   * @param owner Anwani iliyoita chaguo la kukokotoa la `approveAndCall` na iliyomiliki tokeni hapo awali.
   * @param value Kiasi cha tokeni zinazopaswa kutumika.
   * @param data Data ya ziada isiyo na umbizo maalum.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` ikiwa idhini inaruhusiwa isipokuwa kama inatupa kosa (throwing).
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Usomaji zaidi {#further-reading}

- [ERC-1363: Kiwango cha Tokeni Inayolipwa](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Hifadhi ya GitHub](https://github.com/vittominacori/erc1363-payable-token)