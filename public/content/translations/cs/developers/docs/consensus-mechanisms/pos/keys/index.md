---
title: "Klíče v Ethereu s důkazem podílem (PoS)"
description: "Vysvětlení klíčů používaných v mechanismu konsensu důkazu podílem (PoS) v Ethereu"
lang: cs
---

Ethereum zabezpečuje aktiva uživatelů pomocí kryptografie veřejného a soukromého klíče. Veřejný klíč se používá jako základ pro adresu Etherea – to znamená, že je viditelný pro širokou veřejnost a používá se jako jedinečný identifikátor. Soukromý (nebo „tajný“) klíč by měl být vždy přístupný pouze vlastníkovi účtu. Soukromý klíč se používá k „podepisování“ transakcí a dat, aby kryptografie mohla dokázat, že držitel schvaluje nějakou akci konkrétního soukromého klíče.

Klíče Etherea jsou generovány pomocí [kryptografie eliptických křivek](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Když však Ethereum přešlo z [důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow) na [důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos), byl do Etherea přidán nový typ klíče. Původní klíče stále fungují úplně stejně jako dříve – nedošlo k žádným změnám u klíčů založených na eliptických křivkách, které zabezpečují účty. Uživatelé však potřebovali nový typ klíče pro účast v důkazu podílem (PoS) prostřednictvím stakingu ETH a provozování validátorů. Tato potřeba vyvstala z problémů se škálovatelností spojených s mnoha zprávami předávanými mezi velkým počtem validátorů, což vyžadovalo kryptografickou metodu, kterou by bylo možné snadno agregovat, aby se snížilo množství komunikace potřebné k tomu, aby síť dospěla ke konsensu.

Tento nový typ klíče používá [schéma podpisů **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). Podpisy BLS od mnoha validátorů lze agregovat do jednoho podpisu, který je ověřen v jediné kontrole, což udržuje zprávy konsensu malé. BLS není odolné vůči kvantovým počítačům, takže [postkvantová roadmapa](/roadmap/security/quantum-resistance/) plánuje nahradit klíče BLS validátorů klíči založenými na hashi.

## Dva typy klíčů validátora {#two-types-of-keys}

Před přechodem na důkaz podílem (PoS) měli uživatelé Etherea pro přístup ke svým prostředkům pouze jeden soukromý klíč založený na eliptických křivkách. Se zavedením důkazu podílem (PoS) uživatelé, kteří chtěli být sólo stakery, vyžadovali také **klíč validátora** a **klíč pro výběr**.

### Klíč validátora {#validator-key}

Podepisovací klíč validátora se skládá ze dvou prvků:

- **Soukromý** klíč validátora
- **Veřejný** klíč validátora

Účelem soukromého klíče validátora je podepisovat onchain operace, jako jsou návrhy bloků a atestace. Z tohoto důvodu musí být tyto klíče uloženy v horké peněžence.

Tato flexibilita má tu výhodu, že podepisovací klíče validátora lze velmi rychle přesouvat z jednoho zařízení do druhého, avšak pokud dojde k jejich ztrátě nebo krádeži, zloděj může **jednat zlomyslně** několika způsoby:

- Způsobit penalizaci validátora tím, že:
  - Jako navrhovatel podepíše dva různé beacon bloky pro stejný slot
  - Jako atestátor podepíše atestaci, která „obklopuje“ jinou
  - Jako atestátor podepíše dvě různé atestace se stejným cílem
- Vynutit dobrovolný výstup, což zastaví staking validátora a udělí přístup k jeho zůstatku ETH vlastníkovi klíče pro výběr

**Veřejný klíč validátora** je zahrnut v datech transakce, když uživatel vloží ETH do kontraktu pro stakingový vklad. To je známé jako _data vkladu_ (deposit data) a umožňuje to Ethereu identifikovat validátora.

### Pověření k výběru {#withdrawal-credentials}

Každý validátor má vlastnost známou jako _pověření k výběru_. První bajt tohoto 32bajtového pole identifikuje typ účtu: `0x00` představuje starší pověření BLS (před upgradem Shapella, bez možnosti výběru), `0x01` představuje starší pověření, která ukazují na exekuční adresu, a `0x02` představuje moderní typ pověření pro skládání (compounding).

Validátory s klíči BLS `0x00` musí tato pověření aktualizovat tak, aby ukazovala na exekuční adresu, aby se aktivovaly platby přebytečného zůstatku nebo úplný výběr ze stakingu. To lze provést poskytnutím exekuční adresy v datech vkladu během počátečního generování klíčů, _NEBO_ pozdějším použitím klíče pro výběr k podepsání a odeslání zprávy `BLSToExecutionChange`. Diskutuje se o návrzích na postupné vyřazení pověření `0x00` před postkvantovým přechodem, takže validátory, které stále používají `0x00`, by měly provést konverzi hned.

[Více o pověřeních k výběru validátora](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Klíč pro výběr {#withdrawal-key}

Klíč pro výběr bude vyžadován k aktualizaci pověření k výběru tak, aby ukazovala na exekuční adresu, pokud nebyla nastavena během počátečního vkladu. To umožní zahájit zpracování plateb přebytečného zůstatku a také to uživatelům umožní plně vybrat své stakované ETH.

Stejně jako klíče validátora se i klíče pro výběr skládají ze dvou komponent:

- **Soukromý** klíč pro výběr
- **Veřejný** klíč pro výběr

Ztráta tohoto klíče před aktualizací pověření k výběru na typ `0x01` znamená ztrátu přístupu k zůstatku validátora. Validátor může stále podepisovat atestace a bloky, protože tyto akce vyžadují soukromý klíč validátora, avšak pokud dojde ke ztrátě klíčů pro výběr, existuje jen malá nebo žádná motivace.

Oddělení klíčů validátora od klíčů účtu Etherea umožňuje jednomu uživateli provozovat více validátorů. S pověřeními `0x02` může jeden validátor držet až 2 048 ETH, takže větší stake již není nutné rozdělovat mezi mnoho validátorů.

<ValidatorKeysDiagram />

**Poznámka**: Validátor může provést výstup podepsáním [zprávy o dobrovolném výstupu (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) pomocí klíče validátora. Od upgradu Pectra umožňuje [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) také adrese pro výběr spustit výstup validátora a částečné výběry pro validátory `0x02`. To snižuje předpoklady důvěry tím, že stakerům, kteří delegují ETH [poskytovatelům stakingu jako služby](/staking/saas/#what-is-staking-as-a-service), umožňuje zachovat si kontrolu nad svými prostředky.

## Odvození klíčů ze seed fráze {#deriving-keys-from-seed}

Pokud by každých 32 stakovaných ETH vyžadovalo novou sadu 2 zcela nezávislých klíčů, správa klíčů by se rychle stala nepraktickou, zejména pro uživatele provozující více validátorů. Místo toho lze z jednoho společného tajemství odvodit více klíčů validátora a uložení tohoto jediného tajemství umožňuje přístup k více klíčům validátora.

[Mnemotechnické pomůcky](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) a cesty jsou prominentní funkce, se kterými se uživatelé často setkávají, když [přistupují](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) ke svým peněženkám. Mnemotechnická pomůcka je sekvence slov, která funguje jako počáteční seed pro soukromý klíč. V kombinaci s dalšími daty mnemotechnická pomůcka generuje hash známý jako „hlavní klíč“ (master key). To si lze představit jako kořen stromu. Větve z tohoto kořene pak lze odvodit pomocí hierarchické cesty, takže podřízené uzly mohou existovat jako kombinace hashe jejich nadřazeného uzlu a jejich indexu ve stromu. Přečtěte si o standardech [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) a [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) pro generování klíčů na základě mnemotechnických pomůcek.

Tyto cesty mají následující strukturu, která bude povědomá uživatelům, kteří interagovali s hardwarovými peněženkami:

```
m/44'/60'/0'/0
```

Lomítka v této cestě oddělují komponenty soukromého klíče následovně:

```
master_key / purpose / coin_type / account / change / address_index
```

Tato logika umožňuje uživatelům připojit co nejvíce validátorů k jediné **mnemotechnické frázi**, protože kořen stromu může být společný a k rozlišení může dojít na větvích. Uživatel může z mnemotechnické fráze **odvodit libovolný počet klíčů**.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Každá větev je oddělena znakem `/`, takže `m/2` znamená začít s hlavním klíčem a sledovat větev 2. Klíče validátora se řídí [EIP-2334](https://eips.ethereum.org/EIPS/eip-2334): validátor `i` získá svůj klíč pro výběr na `m/12381/3600/i/0` a svůj podepisovací klíč na `m/12381/3600/i/0/0` (12381 identifikuje křivku BLS12-381, 3600 typ mince pro klíče vrstvy konsensu).

<KeyDerivationDiagram />

## Další čtení {#further-reading}

- [Příspěvek na blogu Nadace Ethereum od Carla Beekhuizena](https://blog.ethereum.org/2020/05/21/keys)
- [EIP-2333: Generování klíčů BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Výstupy spouštěné exekuční vrstvou](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Správa klíčů ve velkém měřítku](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
