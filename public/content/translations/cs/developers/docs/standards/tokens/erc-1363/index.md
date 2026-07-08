---
title: "Standard platitelného tokenu ERC-1363"
description: "ERC-1363 je rozšiřující rozhraní pro tokeny ERC-20, které podporuje spouštění vlastní logiky na přijímajícím kontraktu po převodech nebo na utrácejícím kontraktu po schváleních, a to vše v rámci jediné transakce."
lang: cs
---

## Úvod {#introduction}

### Co je ERC-1363? {#what-is-erc1363}

ERC-1363 je rozšiřující rozhraní pro tokeny ERC-20, které podporuje spouštění vlastní logiky na přijímajícím kontraktu po převodech nebo na utrácejícím kontraktu po schváleních, a to vše v rámci jediné transakce.

### Rozdíly oproti ERC-20 {#erc20-differences}

Standardní operace ERC-20, jako jsou `transfer`, `transferFrom` a `approve`, neumožňují spuštění kódu na přijímajícím nebo utrácejícím kontraktu bez samostatné transakce.
To vnáší složitost do vývoje uživatelského rozhraní a překážky v adopci, protože uživatelé musí čekat na provedení první transakce a teprve poté odeslat druhou.
Musí také dvakrát platit gas.

ERC-1363 umožňuje zastupitelným tokenům snadněji provádět akce a fungovat bez použití jakéhokoli offchain posluchače (listeneru).
Umožňuje provést zpětné volání (callback) na přijímajícím nebo utrácejícím kontraktu po převodu nebo schválení, a to v jediné transakci.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o:

- [Standardech tokenů](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Hlavní část {#body}

ERC-1363 zavádí standardní API pro tokeny ERC-20 pro interakci s chytrými kontrakty po `transfer`, `transferFrom` nebo `approve`.

Tento standard poskytuje základní funkcionalitu pro převod tokenů a také umožňuje schválení tokenů, aby mohly být utraceny jinou onchain třetí stranou, a následně provést zpětné volání na přijímajícím nebo utrácejícím kontraktu.

Existuje mnoho navrhovaných využití chytrých kontraktů, které mohou přijímat zpětná volání ERC-20.

Příklady mohou být:

- **Crowdsales (hromadné prodeje)**: odeslané tokeny spustí okamžité přidělení odměny.
- **Služby**: platba aktivuje přístup ke službě v jednom kroku.
- **Faktury**: tokeny automaticky uhradí faktury.
- **Předplatné**: schválení roční sazby aktivuje předplatné v rámci platby za první měsíc.

Z těchto důvodů byl původně nazván **„Payable Token“** (Platitelný token).

Chování zpětného volání dále rozšiřuje jeho užitečnost a umožňuje plynulé interakce, jako jsou:

- **Staking**: převedené tokeny spustí automatické uzamčení ve staking kontraktu.
- **Hlasování**: přijaté tokeny zaregistrují hlasy v systému správy (governance).
- **Swapy**: schválení tokenů aktivují logiku swapu v jediném kroku.

Tokeny ERC-1363 lze použít pro specifické nástroje ve všech případech, které vyžadují provedení zpětného volání po přijetí převodu nebo schválení.
ERC-1363 je také užitečný pro zamezení ztráty tokenů nebo jejich uzamčení v chytrých kontraktech tím, že ověřuje schopnost příjemce s tokeny nakládat.

Na rozdíl od jiných návrhů na rozšíření ERC-20, ERC-1363 nepřepisuje metody ERC-20 `transfer` a `transferFrom` a definuje ID rozhraní, která mají být implementována, čímž zachovává zpětnou kompatibilitu s ERC-20.

Z [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Metody {#methods}

Chytré kontrakty implementující standard ERC-1363 **MUSÍ** implementovat všechny funkce v rozhraní `ERC1363` a také rozhraní `ERC20` a `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Rozšiřující rozhraní pro ERC-20 tokeny, které podporuje spuštění kódu na přijímajícím kontraktu
 * po `transfer` nebo `transferFrom`, nebo kódu na utrácejícím kontraktu po `approve`, v jedné transakci.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * POZNÁMKA: ERC-165 identifikátor pro toto rozhraní je 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Přesune množství tokenů `value` z účtu volajícího na `to`
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adresa, na kterou jsou tokeny převáděny.
   * @param value Množství tokenů k převodu.
   * @return Booleovská hodnota indikující, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Přesune množství tokenů `value` z účtu volajícího na `to`
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adresa, na kterou jsou tokeny převáděny.
   * @param value Množství tokenů k převodu.
   * @param data Dodatečná data bez specifikovaného formátu, odeslaná ve volání na `to`.
   * @return Booleovská hodnota indikující, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Přesune množství tokenů `value` z `from` na `to` pomocí mechanismu povolenek (allowance)
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adresa, ze které se mají odeslat tokeny.
   * @param to Adresa, na kterou jsou tokeny převáděny.
   * @param value Množství tokenů k převodu.
   * @return Booleovská hodnota indikující, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Přesune množství tokenů `value` z `from` na `to` pomocí mechanismu povolenek (allowance)
   * a poté zavolá `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adresa, ze které se mají odeslat tokeny.
   * @param to Adresa, na kterou jsou tokeny převáděny.
   * @param value Množství tokenů k převodu.
   * @param data Dodatečná data bez specifikovaného formátu, odeslaná ve volání na `to`.
   * @return Booleovská hodnota indikující, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Nastaví množství tokenů `value` jako povolenku (allowance) pro `spender` nad tokeny volajícího
   * a poté zavolá `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adresa, která bude utrácet prostředky.
   * @param value Množství tokenů k utracení.
   * @return Booleovská hodnota indikující, že operace byla úspěšná, pokud nevyvolá výjimku.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Nastaví množství tokenů `value` jako povolenku (allowance) pro `spender` nad tokeny volajícího
   * a poté zavolá `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adresa, která bude utrácet prostředky.
   * @param value Množství tokenů k utracení.
   * @param data Dodatečná data bez specifikovaného formátu, odeslaná ve volání na `spender`.
   * @return Booleovská hodnota indikující, že operace byla úspěšná, pokud nevyvolá výjimku.
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

Chytrý kontrakt, který chce přijímat tokeny ERC-1363 prostřednictvím `transferAndCall` nebo `transferFromAndCall`, **MUSÍ** implementovat rozhraní `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Rozhraní pro jakýkoli kontrakt, který chce podporovat `transferAndCall` nebo `transferFromAndCall` z kontraktů ERC-1363 tokenů.
 */
interface ERC1363Receiver {
  /**
   * @dev Kdykoli jsou ERC-1363 tokeny převedeny na tento kontrakt pomocí `ERC1363::transferAndCall` nebo `ERC1363::transferFromAndCall`
   * operátorem (`operator`) z adresy `from`, je zavolána tato funkce.
   *
   * POZNÁMKA: Pro přijetí převodu musí tato funkce vrátit
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (tj. 0x88a7ca5c, nebo svůj vlastní selektor funkce).
   *
   * @param operator Adresa, která zavolala funkci `transferAndCall` nebo `transferFromAndCall`.
   * @param from Adresa, ze které jsou tokeny převáděny.
   * @param value Množství převedených tokenů.
   * @param data Dodatečná data bez specifikovaného formátu.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` pokud je převod povolen, pokud nevyvolá výjimku.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Chytrý kontrakt, který chce přijímat tokeny ERC-1363 prostřednictvím `approveAndCall`, **MUSÍ** implementovat rozhraní `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Rozhraní pro jakýkoli kontrakt, který chce podporovat `approveAndCall` z kontraktů ERC-1363 tokenů.
 */
interface ERC1363Spender {
  /**
   * @dev Kdykoli vlastník (`owner`) ERC-1363 tokenů schválí tento kontrakt pomocí `ERC1363::approveAndCall`
   * k utrácení svých tokenů, je zavolána tato funkce.
   *
   * POZNÁMKA: Pro přijetí schválení musí tato funkce vrátit
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (tj. 0x7b04a2d0, nebo svůj vlastní selektor funkce).
   *
   * @param owner Adresa, která zavolala funkci `approveAndCall` a dříve vlastnila tokeny.
   * @param value Množství tokenů k utracení.
   * @param data Dodatečná data bez specifikovaného formátu.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` pokud je schválení povoleno, pokud nevyvolá výjimku.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Další čtení {#further-reading}

- [ERC-1363: Standard platitelného tokenu](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repozitář na GitHubu](https://github.com/vittominacori/erc1363-payable-token)