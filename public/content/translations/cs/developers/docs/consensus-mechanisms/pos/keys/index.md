---
title: "Klíče v proof-of-stake Ethereu"
description: "Vysvětlení klíčů používaných v mechanismu konsensu proof-of-stake v Ethereu"
lang: cs
---

Ethereum zabezpečuje majetek uživatelů pomocí kryptografie s veřejným a soukromým klíčem. Veřejný klíč se používá jako základ pro adresu Etherea – to znamená, že je viditelný pro širokou veřejnost a používá se jako jedinečný identifikátor. Soukromý (neboli „tajný“) klíč by měl být přístupný pouze majiteli účtu. Soukromý klíč se používá k „podepisování“ transakcí a dat, aby kryptografie mohla prokázat, že držitel schvaluje určitou akci konkrétního soukromého klíče.

Klíče Etherea se generují pomocí [kryptografie na bázi eliptických křivek](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Když však Ethereum přešlo z [důkazu prací](/developers/docs/consensus-mechanisms/pow) na [důkaz podílem](/developers/docs/consensus-mechanisms/pos), byl do Etherea přidán nový typ klíče. Původní klíče stále fungují úplně stejně jako dříve – u klíčů založených na eliptických křivkách, které zabezpečují účty, nedošlo k žádným změnám. Uživatelé však potřebovali nový typ klíče pro účast v mechanismu proof-of-stake prostřednictvím stakingu ETH a provozování validátorů. Tato potřeba vznikla z problémů se škálovatelností spojených s velkým množstvím zpráv předávaných mezi velkým počtem validátorů, což vyžadovalo kryptografickou metodu, kterou by bylo možné snadno agregovat, aby se snížilo množství komunikace potřebné k tomu, aby síť dosáhla konsensu.

Tento nový typ klíče používá schéma podpisu [**Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS umožňuje velmi efektivní agregaci podpisů, ale také umožňuje zpětné inženýrství agregovaných jednotlivých klíčů validátorů a je ideální pro správu akcí mezi validátory.

## Dva typy klíčů validátora {#two-types-of-keys}

Před přechodem na proof-of-stake měli uživatelé Etherea pro přístup ke svým prostředkům pouze jediný soukromý klíč založený na eliptických křivkách. Se zavedením proof-of-stake potřebovali uživatelé, kteří chtěli být solo stakery, také **klíč validátora** a **klíč pro výběr**.

### Klíč validátora {#validator-key}

Podpisový klíč validátora se skládá ze dvou prvků:

- **Soukromý** klíč validátora
- **Veřejný** klíč validátora

Účelem soukromého klíče validátora je podepisovat on-chain operace, jako jsou návrhy bloků a atestace. Z tohoto důvodu musí být tyto klíče uloženy v horké peněžence.

Tato flexibilita má tu výhodu, že umožňuje velmi rychlý přesun podpisových klíčů validátora z jednoho zařízení na druhé, avšak v případě jejich ztráty nebo odcizení může zloděj několika způsoby **jednat se zlým úmyslem**:

- Způsobit slashing validátora tím, že:
  - Jako navrhovatel podepíše dva různé beacon bloky pro stejný slot
  - Jako atestátor podepíše atestaci, která "obklopuje" jinou
  - Jako atestátor podepíše dvě různé atestace se stejným cílem
- Vynutí si dobrovolný odchod, čímž validátor přestane se stakingem a majitel klíče pro výběr získá přístup k jeho zůstatku ETH

**Veřejný klíč validátora** je zahrnut v transakčních datech, když uživatel vkládá ETH do smlouvy o vkladu pro staking. Toto se nazývá _data vkladu_ a umožňuje to Ethereu identifikovat validátora.

### Pověření pro výběr {#withdrawal-credentials}

Každý validátor má vlastnost známou jako _pověření pro výběr_. První bajt tohoto 32bajtového pole identifikuje typ účtu: `0x00` představuje původní BLS pověření (před upgradem Shapella, bez možnosti výběru), `0x01` představuje starší pověření, která odkazují na exekuční adresu, a `0x02` představuje moderní typ složeného pověření.

Validátoři s BLS klíči `0x00` musí tato pověření aktualizovat, aby odkazovala na exekuční adresu, a aktivovat tak platby z přebytku zůstatku nebo plný výběr ze stakingu. To lze provést buď poskytnutím exekuční adresy v datech vkladu během počátečního generování klíčů, _NEBO_ pozdějším použitím klíče pro výběr k podepsání a odvysílání zprávy `BLSToExecutionChange`.

[Více o pověřeních pro výběr validátora](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Klíč pro výběr {#withdrawal-key}

Klíč pro výběr bude vyžadován k aktualizaci pověření pro výběr, aby odkazovala na exekuční adresu, pokud nebyla nastavena během počátečního vkladu. To umožní zahájení zpracování plateb z přebytku zůstatku a také umožní uživatelům plně vybrat jejich stakovaná ETH.

Stejně jako klíče validátora se i klíče pro výběr skládají ze dvou složek:

- **Soukromý** klíč pro výběr
- **Veřejný** klíč pro výběr

Ztráta tohoto klíče před aktualizací pověření pro výběr na typ `0x01` znamená ztrátu přístupu k zůstatku validátora. Validátor může stále podepisovat atestace a bloky, protože tyto akce vyžadují soukromý klíč validátora, avšak v případě ztráty klíčů pro výběr je motivace malá nebo žádná.

Oddělení klíčů validátora od klíčů účtu Ethereum umožňuje jednomu uživateli provozovat více validátorů.

![schéma klíče validátora](validator-key-schematic.png)

**Poznámka**: Ukončení povinností stakingu a výběr zůstatku validátora v současné době vyžaduje podepsání [zprávy o dobrovolném odchodu (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) klíčem validátora. [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) je však návrh, který v budoucnu umožní uživateli spustit odchod validátora a výběr jeho zůstatku podepsáním zpráv o odchodu klíčem pro výběr. Tím se sníží předpoklady důvěry, protože stakerům, kteří delegují ETH [poskytovatelům stakingu jako služby](/staking/saas/#what-is-staking-as-a-service), umožní mít své prostředky stále pod kontrolou.

## Odvození klíčů z bezpečnostní fráze {#deriving-keys-from-seed}

Pokud by každých 32 stakovaných ETH vyžadovalo novou sadu 2 zcela nezávislých klíčů, správa klíčů by se rychle stala nepraktickou, zejména pro uživatele provozující více validátorů. Místo toho lze odvodit více klíčů validátora z jediného společného tajemství a uložení tohoto jediného tajemství umožňuje přístup k více klíčům validátora.

[Mnemotechnické pomůcky](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) a cesty jsou prominentními prvky, se kterými se uživatelé často setkávají, když [přistupují](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) ke svým peněženkám. Mnemotechnická pomůcka je sekvence slov, která funguje jako počáteční seed pro soukromý klíč. V kombinaci s dalšími daty generuje mnemotechnická pomůcka haš známý jako „hlavní klíč“. To si lze představit jako kořen stromu. Větve z tohoto kořene lze poté odvodit pomocí hierarchické cesty, takže podřízené uzly mohou existovat jako kombinace haše jejich nadřazeného uzlu a jejich indexu ve stromě. Přečtěte si o standardech [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) a [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) pro generování klíčů na základě mnemotechnických pomůcek.

Tyto cesty mají následující strukturu, která bude známá uživatelům, kteří interagovali s hardwarovými peněženkami:

```
m/44'/60'/0'/0`
```

Lomítka v této cestě oddělují složky soukromého klíče následovně:

```
hlavní_klíč / účel / typ_mince / účet / změna / index_adresy
```

Tato logika umožňuje uživatelům připojit co nejvíce validátorů k jediné **mnemotechnické frázi**, protože kořen stromu může být společný a odlišení může probíhat na úrovni větví. Uživatel může z mnemotechnické fráze **odvodit libovolný počet klíčů**.

```
      [m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Každá větev je oddělena znakem `/`, takže `m/2` znamená začít od hlavního klíče a sledovat větev 2. V níže uvedeném schématu se jediná mnemotechnická fráze používá k uložení tří klíčů pro výběr, z nichž každý má dva přidružené validátory.

![logika klíčů validátora](multiple-keys.png)

## Další čtení {#further-reading}

- [Příspěvek na blogu Nadace Ethereum od Carla Beekhuizena](https://blog.ethereum.org/2020/05/21/keys/)
- [EIP-2333 Generování klíčů BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Odchody spouštěné exekuční vrstvou](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Správa klíčů ve velkém měřítku](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)
