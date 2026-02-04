---
title: Kiwango cha Tokeni ya Kulipwa cha ERC-1363
description: ERC-1363 ni kiolesura cha upanuzi kwa tokeni za ERC-20 ambacho kinawezesha utekelezaji wa mantiki maalum kwenye mkataba wa mpokeaji baada ya uhamisho, au kwenye mkataba wa mtumiaji baada ya idhini, yote ndani ya muamala mmoja.
lang: sw
---

## Utangulizi {#introduction}

### ERC-1363 ni nini? {#what-is-erc1363}

ERC-1363 ni kiolesura cha upanuzi kwa tokeni za ERC-20 ambacho kinawezesha utekelezaji wa mantiki maalum kwenye mkataba wa mpokeaji baada ya uhamisho, au kwenye mkataba wa mtumiaji baada ya idhini, yote ndani ya muamala mmoja.

### Tofauti kutoka ERC-20 {#erc20-differences}

Operesheni za kawaida za ERC-20 kama `transfer`, `transferFrom` na `approve`, haziruhusu utekelezaji wa msimbo kwenye mkataba wa mpokeaji au mtumiaji bila muamala tofauti.
Hii inaleta ugumu katika uundaji wa UI na kikwazo katika utumiaji kwa sababu watumiaji lazima wasubiri muamala wa kwanza utekelezwe na kisha wawasilishe wa pili.
Lazima pia walipe GAS mara mbili.

ERC-1363 inafanya tokeni zinazoweza kubadilishwa kuwa na uwezo wa kutekeleza vitendo kwa urahisi zaidi na kufanya kazi bila kutumia msikilizaji yeyote wa nje ya mnyororo.
Inaruhusu kufanya mwitikio kwenye mkataba wa mpokeaji au mtumiaji, baada ya uhamisho au idhini, katika muamala mmoja.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza kuhusu:

- [Viwango vya tokeni](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Mwili{#body}

ERC-1363 inaleta API ya kawaida kwa tokeni za ERC-20 ili kuingiliana na mikataba-erevu baada ya `transfer`, `transferFrom` au `approve`.

Kiwango hiki kinatoa utendaji wa msingi wa kuhamisha tokeni, pamoja na kuruhusu tokeni kuidhinishwa ili ziweze kutumiwa na mhusika mwingine wa tatu kwenye mnyororo, na kisha kufanya mwitikio kwenye mkataba wa mpokeaji au mtumiaji.

Kuna matumizi mengi yaliyopendekezwa ya mikataba-erevu ambayo inaweza kukubali mwitikio wa ERC-20.

Mifano inaweza kuwa:

- **Crowdsales**: tokeni zilizotumwa huchochea ugawaji wa zawadi papo hapo.
- **Huduma**: malipo huwasha ufikiaji wa huduma kwa hatua moja.
- **Ankara**: tokeni hulipa ankara kiotomatiki.
- **Usajili**: kuidhinisha kiwango cha mwaka huwasha usajili ndani ya malipo ya mwezi wa kwanza.

Kwa sababu hizi hapo awali iliitwa **"Tokeni ya Kulipwa"**.

Tabia ya mwitikio hupanua zaidi manufaa yake, na kuwezesha mwingiliano usio na mshono kama vile:

- **Kusimamisha**: tokeni zilizohamishwa huchochea kufungwa kiotomatiki katika mkataba wa kusimamisha.
- **Kupiga kura**: tokeni zilizopokewa husajili kura katika mfumo wa utawala.
- **Kubadilisha**: idhini za tokeni huwasha mantiki ya kubadilisha kwa hatua moja.

Tokeni za ERC-1363 zinaweza kutumika kwa manufaa maalum katika visa vyote vinavyohitaji mwitikio kutekelezwa baada ya uhamisho au idhini kupokewa.
ERC-1363 pia ni muhimu kwa kuepuka upotevu wa tokeni au kufungiwa kwa tokeni katika mikataba-erevu kwa kuthibitisha uwezo wa mpokeaji kushughulikia tokeni.

Tofauti na mapendekezo mengine ya upanuzi wa ERC-20, ERC-1363 haibatilishi mbinu za ERC-20 `transfer` na `transferFrom` na inafafanua Vitambulisho vya violesura vitakavyotekelezwa huku ikidumisha uoanifu nyuma na ERC-20.

Kutoka [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Mbinu {#methods}

Mikataba-erevu inayotekeleza kiwango cha ERC-1363 **LAZIMA** itekeleze kazi zote katika kiolesura cha `ERC1363`, pamoja na violesura vya `ERC20` na `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Kiolesura cha upanuzi kwa tokeni za ERC-20 ambacho kinawezesha utekelezaji wa msimbo kwenye mkataba wa mpokeaji
 * baada ya `transfer` au `transferFrom`, au msimbo kwenye mkataba wa mtumiaji baada ya `approve`, katika muamala mmoja.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * KUMBUKA: kitambulisho cha ERC-165 kwa kiolesura hiki ni 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Huhamisha kiasi cha `value` cha tokeni kutoka kwa akaunti ya mwitaji hadi `to`
   * kisha huita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni kitakachohamishwa.
   * @return Thamani ya boolean inayoonyesha operesheni ilifanikiwa isipokuwa kama kuna hitilafu.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Huhamisha kiasi cha `value` cha tokeni kutoka kwa akaunti ya mwitaji hadi `to`
   * kisha huita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni kitakachohamishwa.
   * @param data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwa `to`.
   * @return Thamani ya boolean inayoonyesha operesheni ilifanikiwa isipokuwa kama kuna hitilafu.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Huhamisha kiasi cha `value` cha tokeni kutoka `from` kwenda `to` kwa kutumia utaratibu wa posho
   * kisha huita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param from Anwani ambayo tokeni zinatumwa kutoka.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni kitakachohamishwa.
   * @return Thamani ya boolean inayoonyesha operesheni ilifanikiwa isipokuwa kama kuna hitilafu.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Huhamisha kiasi cha `value` cha tokeni kutoka `from` kwenda `to` kwa kutumia utaratibu wa posho
   * kisha huita `ERC1363Receiver::onTransferReceived` kwenye `to`.
   * @param from Anwani ambayo tokeni zinatumwa kutoka.
   * @param to Anwani ambayo tokeni zinahamishiwa.
   * @param value Kiasi cha tokeni kitakachohamishwa.
   * @param data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwa `to`.
   * @return Thamani ya boolean inayoonyesha operesheni ilifanikiwa isipokuwa kama kuna hitilafu.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Huweka kiasi cha `value` cha tokeni kama posho ya `spender` juu ya tokeni za mwitaji
   * kisha huita `ERC1363Spender::onApprovalReceived` kwenye `spender`.
   * @param spender Anwani itakayotumia fedha.
   * @param value Kiasi cha tokeni kitakachotumiwa.
   * @return Thamani ya boolean inayoonyesha operesheni ilifanikiwa isipokuwa kama kuna hitilafu.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Huweka kiasi cha `value` cha tokeni kama posho ya `spender` juu ya tokeni za mwitaji
   * kisha huita `ERC1363Spender::onApprovalReceived` kwenye `spender`.
   * @param spender Anwani itakayotumia fedha.
   * @param value Kiasi cha tokeni kitakachotumiwa.
   * @param data Data ya ziada isiyo na umbizo maalum, iliyotumwa katika wito kwa `spender`.
   * @return Thamani ya boolean inayoonyesha operesheni ilifanikiwa isipokuwa kama kuna hitilafu.
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

Mkataba-erevu unaotaka kukubali tokeni za ERC-1363 kupitia `transferAndCall` au `transferFromAndCall` **LAZIMA** utekeleze kiolesura cha `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Kiolesura cha mkataba wowote unaotaka kusaidia `transferAndCall` au `transferFromAndCall` kutoka kwa mikataba ya tokeni ya ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Wakati wowote tokeni za ERC-1363 zinapohamishiwa kwenye mkataba huu kupitia `ERC1363::transferAndCall` au `ERC1363::transferFromAndCall`
   * na `operator` kutoka `from`, kazi hii inaitwa.
   *
   * KUMBUKA: Ili kukubali uhamisho, ni lazima hii irudishe
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (yaani 0x88a7ca5c, au kiteuzi chake cha kazi).
   *
   * @param operator Anwani iliyoita kazi ya `transferAndCall` au `transferFromAndCall`.
   * @param from Anwani ambayo tokeni zinahamishwa kutoka.
   * @param value Kiasi cha tokeni zilizohamishwa.
   * @param data Data ya ziada isiyo na umbizo maalum.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` ikiwa uhamisho unaruhusiwa isipokuwa kama kuna hitilafu.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Mkataba-erevu unaotaka kukubali tokeni za ERC-1363 kupitia `approveAndCall` **LAZIMA** utekeleze kiolesura cha `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Kiolesura cha mkataba wowote unaotaka kusaidia `approveAndCall` kutoka kwa mikataba ya tokeni ya ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Wakati wowote `mmiliki` wa tokeni za ERC-1363 anapoidhinisha mkataba huu kupitia `ERC1363::approveAndCall`
   * kutumia tokeni zao, kazi hii inaitwa.
   *
   * KUMBUKA: Ili kukubali idhini, hii lazima irudishe
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (yaani 0x7b04a2d0, au kiteuzi chake cha kazi).
   *
   * @param owner Anwani iliyoita kazi ya `approveAndCall` na iliyomiliki tokeni hapo awali.
   * @param value Kiasi cha tokeni kitakachotumiwa.
   * @param data Data ya ziada isiyo na umbizo maalum.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` ikiwa idhini inaruhusiwa isipokuwa kama kuna hitilafu.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Masomo zaidi {#further-reading}

- [ERC-1363: Kiwango cha Tokeni ya Kulipwa](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repo ya GitHub](https://github.com/vittominacori/erc1363-payable-token)
