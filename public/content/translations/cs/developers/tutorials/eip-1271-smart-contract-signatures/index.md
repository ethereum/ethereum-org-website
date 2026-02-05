---
title: "EIP-1271: Podepisování a ověřování podpisů chytrých kontraktů"
description: "Přehled vytváření a ověřování podpisů chytrých kontraktů pomocí EIP-1271. Projdeme si také implementaci EIP-1271 použitou v Safe (dříve Gnosis Safe), abychom vývojářům chytrých kontraktů poskytli konkrétní příklad, na kterém mohou stavět."
author: Nathan H. Leung
lang: cs
tags:
  [
    "eip-1271",
    "chytré kontrakty",
    "ověřování",
    "podepisování"
  ]
skill: intermediate
published: 2023-01-12
---

Standard [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) umožňuje chytrým kontraktům ověřovat podpisy.

V tomto tutoriálu poskytneme přehled digitálních podpisů, pozadí EIP-1271 a specifické implementace EIP-1271 používané službou [Safe](https://safe.global/) (dříve Gnosis Safe). Celkově to může sloužit jako výchozí bod pro implementaci EIP-1271 ve vašich vlastních kontraktech.

## Co je to podpis?

V tomto kontextu je podpis (přesněji „digitální podpis“) zpráva plus nějaký druh důkazu, že zpráva pochází od konkrétní osoby/odesílatele/adresy.

Digitální podpis může vypadat například takto:

1. Zpráva: „Chci se na tuto webovou stránku přihlásit pomocí své peněženky Ethereum.“
2. Podepisující: Moje adresa je `0x000…`
3. Důkaz: Zde je důkaz, že já, `0x000...`, jsem skutečně vytvořil celou tuto zprávu (obvykle se jedná o něco kryptografického).

Je důležité si uvědomit, že digitální podpis zahrnuje jak „zprávu“, tak „podpis“.

Proč? Pokud byste mi například dali k podpisu smlouvu a já bych odtrhl stránku s podpisem a vrátil vám pouze své podpisy bez zbytku smlouvy, smlouva by nebyla platná.

Stejně tak digitální podpis bez přidružené zprávy nic neznamená!

## Proč existuje EIP-1271?

Abyste mohli vytvořit digitální podpis pro použití na blockchainechech založených na Ethereu, obecně potřebujete tajný privátní klíč, který nikdo jiný nezná. Díky tomu je váš podpis skutečně váš (nikdo jiný nemůže vytvořit stejný podpis bez znalosti tajného klíče).

Váš účet na Ethereu (tj. váš externě vlastněný účet / EOA) má s ním spojený privátní klíč, a to je privátní klíč, který se obvykle používá, když vás web nebo dapp požádá o podpis (např. pro „Přihlásit se pomocí Etherea“).

Aplikace může [ověřit podpis](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum), který vytvoříte pomocí knihovny třetí strany, jako je ethers.js, [aniž by znala váš privátní klíč](https://en.wikipedia.org/wiki/Public-key_cryptography), a být si jistá, že jste to byli _vy_, kdo podpis vytvořil.

> Ve skutečnosti, protože digitální podpisy EOA používají kryptografii s veřejným klíčem, mohou být generovány a ověřovány **mimo blockchain**! Takto funguje hlasování v DAO bez poplatků – místo odesílání hlasů na blockchainu lze digitální podpisy vytvářet a ověřovat mimo blockchain pomocí kryptografických knihoven.

Zatímco účty EOA mají privátní klíč, účty chytrých kontraktů nemají žádný privátní ani tajný klíč (takže "Přihlásit se pomocí Etherea" atd. nemůže nativně fungovat s účty chytrých kontraktů).

Problém, který se EIP-1271 snaží vyřešit: jak můžeme poznat, že podpis chytrého kontraktu je platný, pokud chytrý kontrakt nemá žádné „tajemství“, které by mohl do podpisu začlenit?

## Jak EIP-1271 funguje?

Chytré kontrakty nemají privátní klíče, které by se daly použít k podepisování zpráv. Jak tedy poznáme, zda je podpis autentický?

Jedním z nápadů je, že se můžeme chytrého kontraktu jednoduše _zeptat_, zda je podpis autentický!

EIP-1271 standardizuje myšlenku „zeptat se“ chytrého kontraktu, zda je daný podpis platný.

Kontrakt, který implementuje EIP-1271, musí mít funkci s názvem `isValidSignature`, která přijímá zprávu a podpis. Kontrakt pak může spustit nějakou ověřovací logiku (specifikace zde nevynucuje nic konkrétního) a poté vrátit hodnotu označující, zda je podpis platný, či nikoli.

Pokud `isValidSignature` vrátí platný výsledek, je to v podstatě jako by kontrakt říkal „ano, schvaluji tento podpis + zprávu!“

### Rozhraní

Zde je přesné rozhraní ve specifikaci EIP-1271 (o parametru `_hash` budeme mluvit níže, ale prozatím si ho představte jako zprávu, která je ověřována):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Měla by vrátit, zda je poskytnutý podpis platný pro poskytnutý haš
   * @param _hash      Haš dat k podepsání
   * @param _signature Pole bajtů podpisu spojené s _hash
   *
   * MUSÍ vrátit magickou hodnotu bytes4 0x1626ba7e, když funkce projde.
   * NESMÍ upravovat stav (pomocí STATICCALL pro solc < 0.5, modifikátor view pro solc > 0.5)
   * MUSÍ povolit externí volání
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Příklad implementace EIP-1271: Safe

Kontrakty mohou implementovat `isValidSignature` mnoha způsoby — specifikace neříká mnoho o přesné implementaci.

Jedním z pozoruhodných kontraktů, který implementuje EIP-1271, je Safe (dříve Gnosis Safe).

V kódu Safe je `isValidSignature` [implementována](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) tak, že podpisy lze vytvářet a ověřovat [dvěma způsoby](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Zprávy na blockchainu
   1. Vytvoření: vlastník Safe vytvoří novou transakci Safe k „podepsání“ zprávy a předá zprávu jako data do transakce. Jakmile transakci podepíše dostatek vlastníků k dosažení prahu pro multisig, transakce se odešle a spustí. V transakci je funkce Safe s názvem (`signMessage(bytes calldata _data)`), která přidá zprávu na seznam „schválených“ zpráv.
   2. Ověření: zavolejte `isValidSignature` na kontraktu Safe a předejte zprávu k ověření jako parametr zprávy a [prázdnou hodnotu pro parametr podpisu](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (tj. `0x`). Safe uvidí, že parametr podpisu je prázdný, a místo kryptografického ověření podpisu bude vědět, že má pouze zkontrolovat, zda je zpráva na seznamu „schválených“ zpráv.
2. Zprávy mimo blockchain:
   1. Vytvoření: vlastník Safe vytvoří zprávu mimo blockchain, poté nechá ostatní vlastníky Safe podepsat zprávu jednotlivě, dokud nebude dostatek podpisů k překonání prahu schválení multisig.
   2. Ověření: zavolejte `isValidSignature`. Do parametru zprávy předejte zprávu k ověření. Do parametru podpisu předejte jednotlivé podpisy všech vlastníků Safe, všechny spojené za sebou. Safe zkontroluje, že je dostatek podpisů pro splnění prahu **a** že každý podpis je platný. Pokud ano, vrátí hodnotu označující úspěšné ověření podpisu.

## Co přesně je parametr `_hash`? Proč nepředat celou zprávu?

Možná jste si všimli, že funkce `isValidSignature` v [rozhraní EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) nepřijímá samotnou zprávu, ale místo toho parametr `_hash`. To znamená, že místo předání celé zprávy libovolné délky do `isValidSignature` předáme 32bajtový haš zprávy (obvykle keccak256).

Každý bajt calldata — tj. data parametrů funkce předaná funkci chytrého kontraktu — [stojí 16 jednotek paliva (4 jednotky paliva, pokud je to nulový bajt)](https://eips.ethereum.org/EIPS/eip-2028), takže to může ušetřit spoustu paliva, pokud je zpráva dlouhá.

### Předchozí specifikace EIP-1271

Existují specifikace EIP-1271, které mají funkci `isValidSignature` s prvním parametrem typu `bytes` (libovolná délka, místo pevné délky `bytes32`) a názvem parametru `message`. Toto je [starší verze](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) standardu EIP-1271.

## Jak by měl být EIP-1271 implementován v mých vlastních kontraktech?

Specifikace je v tomto ohledu velmi otevřená. Implementace Safe má několik dobrých nápadů:

- Můžete považovat podpisy EOA od "vlastníka" kontraktu za platné.
- Můžete si uložit seznam schválených zpráv a pouze ty považovat za platné.

Nakonec je to na vás jako na vývojáři kontraktu!

## Závěr

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) je všestranný standard, který umožňuje chytrým kontraktům ověřovat podpisy. Otevírá dveře pro chytré kontrakty, aby se chovaly více jako EOA – například poskytuje způsob, jak "Přihlásit se pomocí Etherea" funguje s chytrými kontrakty – a může být implementován mnoha způsoby (Safe má netriviální, zajímavou implementaci k zvážení).
