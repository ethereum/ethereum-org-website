---
title: Standard zaplatitelného tokenu ERC-1363
description: ERC-1363 je rozšiřující rozhraní pro tokeny ERC-20, které podporuje provádění vlastní logiky na kontraktu příjemce po převodech nebo na kontraktu plátce po schváleních, a to vše v rámci jediné transakce.
lang: cs
---

## Úvod {#introduction}

### Co je ERC-1363? {#what-is-erc1363}

ERC-1363 je rozšiřující rozhraní pro tokeny ERC-20, které podporuje provádění vlastní logiky na kontraktu příjemce po převodech nebo na kontraktu plátce po schváleních, a to vše v rámci jediné transakce.

### Rozdíly oproti ERC-20 {#erc20-differences}

Standardní operace ERC-20 jako `transfer`, `transferFrom` a `approve` neumožňují spuštění kódu na kontraktu příjemce nebo plátce bez samostatné transakce.
To vnáší složitost do vývoje uživatelského rozhraní a ztěžuje přijetí, protože uživatelé musí čekat na provedení první transakce a poté odeslat druhou.
Musí také dvakrát zaplatit palivo.

ERC-1363 umožňuje, aby zastupitelné tokeny mohly snadněji provádět akce a fungovat bez použití jakéhokoli off-chain listeneru.
Umožňuje provést zpětné volání (callback) na kontraktu příjemce nebo plátce po převodu nebo schválení, a to v jediné transakci.

## Předpoklady {#prerequisites}

Pro lepší porozumění této stránce doporučujeme nejprve přečíst o:

- [Standardy tokenů](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Tělo {#body}

ERC-1363 zavádí standardní API pro tokeny ERC-20 pro interakci s chytrými kontrakty po operacích `transfer`, `transferFrom` nebo `approve`.

Tento standard poskytuje základní funkcionalitu pro převod tokenů a také umožňuje schválení tokenů, aby je mohla utratit jiná on-chain třetí strana, a poté provést zpětné volání (callback) na kontraktu příjemce nebo plátce.

Existuje mnoho navrhovaných využití chytrých kontraktů, které mohou přijímat zpětná volání (callbacky) ERC-20.

Mezi příklady patří:

- **Hromadné prodeje (crowdsales)**: odeslané tokeny spouští okamžité přidělení odměny.
- **Služby**: platba aktivuje přístup ke službě v jednom kroku.
- **Faktury**: tokeny automaticky hradí faktury.
- **Předplatná**: schválení roční sazby aktivuje předplatné v rámci platby za první měsíc.

Z těchto důvodů byl původně pojmenován **„zaplatitelný token“**.

Chování zpětného volání (callback) dále rozšiřuje jeho užitečnost a umožňuje bezproblémové interakce, jako jsou:

- **Staking (uzamčení)**: převedené tokeny spouštějí automatické uzamčení ve stakingovém kontraktu.
- **Hlasování**: přijaté tokeny registrují hlasy v systému správy.
- **Směna (swapping)**: schválení tokenů aktivuje logiku směny v jediném kroku.

Tokeny ERC-1363 lze použít pro specifické účely ve všech případech, které vyžadují spuštění zpětného volání (callback) po přijatém převodu nebo schválení.
ERC-1363 je také užitečný pro zamezení ztráty nebo uzamčení tokenů v chytrých kontraktech ověřením schopnosti příjemce s tokeny nakládat.

Na rozdíl od jiných návrhů na rozšíření ERC-20, ERC-1363 nepřepisuje metody `transfer` a `transferFrom` z ERC-20 a definuje ID rozhraní, která se mají implementovat, při zachování zpětné kompatibility s ERC-20.

Z [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Metody {#methods}

Chytré kontrakty implementující standard ERC-1363 **MUSÍ** implementovat všechny funkce v rozhraní `ERC1363` a také rozhraní `ERC20` a `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Rozšiřující rozhraní pro tokeny ERC-20, které podporuje spouštění kódu na kontraktu příjemce
 * po `transfer` nebo `transferFrom` nebo kódu na kontraktu plátce po `approve` v jediné transakci.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * POZNÁMKA: Identifikátor ERC-165 pro toto rozhraní je 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Přesune množství tokenů `value` z účtu volajícího na adresu `to`
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adresa, na kterou se tokeny převádějí.
   * @param value Množství tokenů k převodu.
   * @return Booleovská hodnota, která označuje, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Přesune množství tokenů `value` z účtu volajícího na adresu `to`
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adresa, na kterou se tokeny převádějí.
   * @param value Množství tokenů k převodu.
   * @param data Dodatečná data bez specifikovaného formátu, odeslaná při volání na `to`.
   * @return Booleovská hodnota, která označuje, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Přesune množství tokenů `value` z `from` na `to` pomocí mechanismu povolenky
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adresa, ze které se tokeny odesílají.
   * @param to Adresa, na kterou se tokeny převádějí.
   * @param value Množství tokenů k převodu.
   * @return Booleovská hodnota, která označuje, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Přesune množství tokenů `value` z `from` na `to` pomocí mechanismu povolenky
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adresa, ze které se tokeny odesílají.
   * @param to Adresa, na kterou se tokeny převádějí.
   * @param value Množství tokenů k převodu.
   * @param data Dodatečná data bez specifikovaného formátu, odeslaná při volání na `to`.
   * @return Booleovská hodnota, která označuje, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Nastaví množství tokenů `value` jako povolenku pro `spender` nad tokeny volajícího
   * a poté zavolá `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adresa, která utratí prostředky.
   * @param value Množství tokenů, které se mají utratit.
   * @return Booleovská hodnota, která označuje, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Nastaví množství tokenů `value` jako povolenku pro `spender` nad tokeny volajícího
   * a poté zavolá `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adresa, která utratí prostředky.
   * @param value Množství tokenů, které se mají utratit.
   * @param data Dodatečná data bez specifikovaného formátu, odeslaná při volání na `spender`.
   * @return Booleovská hodnota, která označuje, že operace byla úspěšná, pokud nevyvolá výjimku.
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

Chytrý kontrakt, který chce přijímat tokeny ERC-1363 přes `transferAndCall` nebo `transferFromAndCall`, **MUSÍ** implementovat rozhraní `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Rozhraní pro jakýkoli kontrakt, který chce podporovat `transferAndCall` nebo `transferFromAndCall` z kontraktů tokenů ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Kdykoli jsou tokeny ERC-1363 převedeny na tento kontrakt přes `ERC1363::transferAndCall` nebo `ERC1363::transferFromAndCall`
   * `operátorem` z `from`, je zavolána tato funkce.
   *
   * POZNÁMKA: Pro přijetí převodu musí tato funkce vrátit
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (tj. 0x88a7ca5c, nebo svůj vlastní selektor funkce).
   *
   * @param operator Adresa, která zavolala funkci `transferAndCall` nebo `transferFromAndCall`.
   * @param from Adresa, ze které jsou tokeny převedeny.
   * @param value Množství převedených tokenů.
   * @param data Dodatečná data bez specifikovaného formátu.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`, pokud je převod povolen, jinak vyvolá výjimku.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Chytrý kontrakt, který chce přijímat tokeny ERC-1363 přes `approveAndCall`, **MUSÍ** implementovat rozhraní `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Rozhraní pro jakýkoli kontrakt, který chce podporovat `approveAndCall` z kontraktů tokenů ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Kdykoli `vlastník` tokenů ERC-1363 schválí tento kontrakt přes `ERC1363::approveAndCall`
   * k utracení svých tokenů, je zavolána tato funkce.
   *
   * POZNÁMKA: Pro přijetí schválení musí tato funkce vrátit
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (tj. 0x7b04a2d0, nebo svůj vlastní selektor funkce).
   *
   * @param owner Adresa, která zavolala funkci `approveAndCall` a předtím vlastnila tokeny.
   * @param value Množství tokenů, které se mají utratit.
   * @param data Dodatečná data bez specifikovaného formátu.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`, pokud je schválení povoleno, jinak vyvolá výjimku.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Další čtení {#further-reading}

- [ERC-1363: Standard zaplatitelného tokenu](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repozitář na GitHubu](https://github.com/vittominacori/erc1363-payable-token)
