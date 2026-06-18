---
title: "EIP-1271: Podepisování a ověřování podpisů chytrých kontraktů"
description: Přehled generování a ověřování podpisů chytrých kontraktů pomocí EIP-1271. Projdeme si také implementaci EIP-1271 použitou v Safe (dříve Gnosis Safe), abychom vývojářům chytrých kontraktů poskytli konkrétní příklad, na kterém mohou stavět.
author: Nathan H. Leung
lang: cs
tags:
  - eip-1271
  - chytré kontrakty
  - ověřování
  - podepisování
skill: intermediate
breadcrumb: Podpisy EIP-1271
published: 2023-01-12
---

Standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) umožňuje chytrým kontraktům ověřovat podpisy.

V tomto tutoriálu poskytneme přehled digitálních podpisů, pozadí EIP-1271 a konkrétní implementaci EIP-1271, kterou používá [Safe](https://safe.global/) (dříve Gnosis Safe). To vše dohromady může posloužit jako výchozí bod pro implementaci EIP-1271 ve vašich vlastních kontraktech.

## Co je to podpis? {#what-is-a-signature}

V tomto kontextu je podpis (přesněji „digitální podpis“) zpráva plus nějaký druh důkazu, že zpráva pochází od konkrétní osoby/odesílatele/adresy.

Digitální podpis může vypadat například takto:

1. Zpráva: „Chci se přihlásit na tuto webovou stránku pomocí své Ethereum peněženky.“
2. Podepisující: Moje adresa je `0x000…`
3. Důkaz: Zde je nějaký důkaz, že já, `0x000…`, jsem skutečně vytvořil celou tuto zprávu (obvykle se jedná o něco kryptografického).

Je důležité si uvědomit, že digitální podpis zahrnuje jak „zprávu“, tak „podpis“.

Proč? Pokud byste mi například dali podepsat kontrakt a já bych pak odstřihl stránku s podpisem a vrátil vám pouze své podpisy bez zbytku kontraktu, kontrakt by nebyl platný.

Stejně tak digitální podpis neznamená nic bez přidružené zprávy!

## Proč existuje EIP-1271? {#why-does-eip-1271-exist}

Abyste mohli vytvořit digitální podpis pro použití na blockchainech založených na Ethereu, obecně potřebujete tajný soukromý klíč, který nikdo jiný nezná. To je to, co dělá váš podpis vaším (nikdo jiný nemůže vytvořit stejný podpis bez znalosti tajného klíče).

Váš Ethereum účet (tj. váš externě vlastněný účet/EOA) má k sobě přidružený soukromý klíč a to je soukromý klíč, který se obvykle používá, když vás webová stránka nebo decentralizovaná aplikace (dapp) požádá o podpis (např. pro „Přihlášení pomocí Etherea“).

Aplikace může [ověřit podpis](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum), který vytvoříte pomocí knihovny třetí strany, jako je Ethers.js, [aniž by znala váš soukromý klíč](https://en.wikipedia.org/wiki/Public-key_cryptography), a mít jistotu, že _vy_ jste byli tím, kdo podpis vytvořil.

> Ve skutečnosti, protože digitální podpisy EOA používají kryptografii veřejného klíče, mohou být generovány a ověřovány **offchain**! Takto funguje hlasování v DAO bez poplatků za gas – místo odesílání hlasů onchain lze digitální podpisy vytvářet a ověřovat offchain pomocí kryptografických knihoven.

Zatímco účty EOA mají soukromý klíč, účty chytrých kontraktů nemají žádný druh soukromého nebo tajného klíče (takže „Přihlášení pomocí Etherea“ atd. nemůže nativně fungovat s účty chytrých kontraktů).

Problém, který se EIP-1271 snaží vyřešit: jak můžeme poznat, že je podpis chytrého kontraktu platný, pokud chytrý kontrakt nemá žádné „tajemství“, které by mohl do podpisu začlenit?

## Jak funguje EIP-1271? {#how-does-eip-1271-work}

Chytré kontrakty nemají soukromé klíče, které by bylo možné použít k podepisování zpráv. Jak tedy můžeme poznat, zda je podpis autentický?

Jedním z nápadů je, že se můžeme chytrého kontraktu jednoduše _zeptat_, zda je podpis autentický!

To, co EIP-1271 dělá, je, že standardizuje tuto myšlenku „dotazování“ chytrého kontraktu, zda je daný podpis platný.

Kontrakt, který implementuje EIP-1271, musí mít funkci nazvanou `isValidSignature`, která přijímá zprávu a podpis. Kontrakt pak může spustit nějakou ověřovací logiku (specifikace zde nevynucuje nic konkrétního) a poté vrátit hodnotu indikující, zda je podpis platný, či nikoli.

Pokud `isValidSignature` vrátí platný výsledek, je to v podstatě kontrakt, který říká „ano, schvaluji tento podpis + zprávu!“

### Rozhraní {#interface}

Zde je přesné rozhraní ve specifikaci EIP-1271 (o parametru `_hash` budeme mluvit níže, ale prozatím si ho představte jako zprávu, která se ověřuje):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Měl by vrátit, zda je poskytnutý podpis platný pro poskytnutý hash
   * @param _hash      Hash dat k podepsání
   * @param _signature Bajtové pole podpisu přidružené k _hash
   *
   * MUSÍ vrátit magickou hodnotu bytes4 0x1626ba7e, pokud funkce projde.
   * NESMÍ měnit stav (pomocí STATICCALL pro solc < 0.5, modifikátoru view pro solc > 0.5)
   * MUSÍ umožňovat externí volání
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Příklad implementace EIP-1271: Safe {#example-eip-1271-implementation-safe}

Kontrakty mohou implementovat `isValidSignature` mnoha způsoby – specifikace o přesné implementaci příliš nemluví.

Jedním z významných kontraktů, který implementuje EIP-1271, je Safe (dříve Gnosis Safe).

V kódu Safe [je implementována](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) funkce `isValidSignature` tak, že podpisy lze vytvářet a ověřovat [dvěma způsoby](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Onchain zprávy
   1. Vytvoření: vlastník Safe vytvoří novou Safe transakci k „podepsání“ zprávy, přičemž zprávu předá jako data do transakce. Jakmile transakci podepíše dostatek vlastníků k dosažení prahu multisig, transakce je odeslána do sítě a spuštěna. V transakci je volána funkce Safe (`signMessage(bytes calldata _data)`), která přidá zprávu do seznamu „schválených“ zpráv.
   2. Ověření: zavolejte `isValidSignature` na kontraktu Safe a předejte zprávu k ověření jako parametr zprávy a [prázdnou hodnotu pro parametr podpisu](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (tj. `0x`). Safe uvidí, že parametr podpisu je prázdný, a místo kryptografického ověřování podpisu bude vědět, že má jednoduše zkontrolovat, zda je zpráva na seznamu „schválených“ zpráv.
2. Offchain zprávy:
   1. Vytvoření: vlastník Safe vytvoří zprávu offchain a poté získá další vlastníky Safe, aby zprávu každý individuálně podepsal, dokud nebude dostatek podpisů k překonání prahu pro schválení multisig.
   2. Ověření: zavolejte `isValidSignature`. V parametru zprávy předejte zprávu, která má být ověřena. V parametru podpisu předejte jednotlivé podpisy každého vlastníka Safe spojené dohromady, jeden za druhým. Safe zkontroluje, zda je dostatek podpisů ke splnění prahu **a** zda je každý podpis platný. Pokud ano, vrátí hodnotu indikující úspěšné ověření podpisu.

## Co přesně je parametr `_hash`? Proč nepředat celou zprávu? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

Možná jste si všimli, že funkce `isValidSignature` v [rozhraní EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) nepřijímá samotnou zprávu, ale místo toho parametr `_hash`. To znamená, že místo předání celé zprávy libovolné délky funkci `isValidSignature` předáme 32bajtový hash zprávy (obecně keccak256).

Každý bajt dat volání – tj. dat parametrů funkce předaných funkci chytrého kontraktu – [stojí 16 gas (4 gas, pokud jde o nulový bajt)](https://eips.ethereum.org/EIPS/eip-2028), takže to může ušetřit spoustu gas, pokud je zpráva dlouhá.

### Předchozí specifikace EIP-1271 {#previous-eip-1271-specifications}

V praxi existují specifikace EIP-1271, které mají funkci `isValidSignature` s prvním parametrem typu `bytes` (libovolná délka, místo pevné délky `bytes32`) a názvem parametru `message`. Jedná se o [starší verzi](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) standardu EIP-1271.

## Jak by měl být EIP-1271 implementován v mých vlastních kontraktech? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

Specifikace je zde velmi otevřená. Implementace Safe má několik dobrých nápadů:

- Můžete považovat podpisy EOA od „vlastníka“ kontraktu za platné.
- Mohli byste ukládat seznam schválených zpráv a považovat za platné pouze ty.

Nakonec je to na vás jako na vývojáři kontraktu!

## Závěr {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) je všestranný standard, který umožňuje chytrým kontraktům ověřovat podpisy. Otevírá dveře k tomu, aby se chytré kontrakty chovaly více jako EOA – například poskytuje způsob, jak může „Přihlášení pomocí Etherea“ fungovat s chytrými kontrakty – a lze jej implementovat mnoha způsoby (Safe má netriviální, zajímavou implementaci, která stojí za zvážení).