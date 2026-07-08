---
title: "Klíče v Ethereu s důkazem podílem (PoS)"
description: "Vysvětlení klíčů používaných v mechanismu konsensu důkazu podílem (PoS) v Ethereu"
lang: cs
---

Ethereum zabezpečuje aktiva uživatelů pomocí kryptografie veřejného a soukromého klíče. Veřejný klíč se používá jako základ pro adresu Etherea – to znamená, že je viditelný pro širokou veřejnost a používá se jako jedinečný identifikátor. Soukromý (nebo „tajný“) klíč by měl být vždy přístupný pouze vlastníkovi účtu. Soukromý klíč se používá k „podepisování“ transakcí a dat, aby kryptografie mohla dokázat, že držitel schvaluje určitou akci konkrétního soukromého klíče.

Klíče Etherea jsou generovány pomocí [kryptografie eliptických křivek](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography).

Když však Ethereum přešlo z [důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow) na [důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos), byl do Etherea přidán nový typ klíče. Původní klíče stále fungují úplně stejně jako dříve – u klíčů založených na eliptických křivkách, které zabezpečují účty, nedošlo k žádným změnám. Uživatelé však potřebovali nový typ klíče pro účast v důkazu podílem (PoS) prostřednictvím stakingu ETH a provozování validátorů. Tato potřeba vyvstala z problémů se škálovatelností spojených s mnoha zprávami předávanými mezi velkým počtem validátorů, což vyžadovalo kryptografickou metodu, kterou by bylo možné snadno agregovat, aby se snížilo množství komunikace potřebné k tomu, aby síť dospěla ke konsensu.

Tento nový typ klíče používá [schéma podpisu **Boneh-Lynn-Shacham (BLS)**](https://wikipedia.org/wiki/BLS_digital_signature). BLS umožňuje velmi efektivní agregaci podpisů, ale také umožňuje zpětné inženýrství agregovaných jednotlivých klíčů validátorů a je ideální pro správu akcí mezi validátory.

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

Každý validátor má vlastnost známou jako _pověření k výběru_. První bajt tohoto 32bajtového pole identifikuje typ účtu: `0x00` představuje původní pověření BLS (před Shapella, bez možnosti výběru), `0x01` představuje starší pověření, která ukazují na adresu exekuční vrstvy, a `0x02` představuje moderní typ složeného pověření.

Validátory s klíči BLS `0x00` musí tato pověření aktualizovat tak, aby ukazovala na adresu exekuční vrstvy, aby se aktivovaly platby nadměrného zůstatku nebo úplný výběr ze stakingu. To lze provést poskytnutím adresy exekuční vrstvy v datech vkladu během počátečního generování klíče, _NEBO_ pozdějším použitím klíče pro výběr k podepsání a odeslání zprávy `BLSToExecutionChange`.

[Více o pověření k výběru validátora](/developers/docs/consensus-mechanisms/pos/withdrawal-credentials/)

### Klíč pro výběr {#withdrawal-key}

Klíč pro výběr bude vyžadován k aktualizaci pověření k výběru tak, aby ukazovalo na adresu exekuční vrstvy, pokud nebylo nastaveno během počátečního vkladu. To umožní zahájení zpracování plateb nadměrného zůstatku a také to uživatelům umožní plně vybrat jejich stakované ETH.

Stejně jako klíče validátora se i klíče pro výběr skládají ze dvou komponent:

- **Soukromý** klíč pro výběr
- **Veřejný** klíč pro výběr

Ztráta tohoto klíče před aktualizací pověření k výběru na typ `0x01` znamená ztrátu přístupu k zůstatku validátora. Validátor může stále podepisovat atestace a bloky, protože tyto akce vyžadují soukromý klíč validátora, avšak pokud dojde ke ztrátě klíčů pro výběr, existuje jen malá nebo žádná motivace.

Oddělení klíčů validátora od klíčů účtu Etherea umožňuje jednomu uživateli provozovat více validátorů.

![validator key schematic](validator-key-schematic.png)

**Poznámka**: Výstup z povinností stakingu a výběr zůstatku validátora v současné době vyžaduje podepsání [zprávy o dobrovolném výstupu (VEM)](https://mirror.xyz/ladislaus.eth/wmoBbUBes2Wp1_6DvP6slPabkyujSU7MZOFOC3QpErs&1) pomocí klíče validátora. Nicméně [EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) je návrh, který v budoucnu umožní uživateli spustit výstup validátora a vybrat jeho zůstatek podepsáním zpráv o výstupu pomocí klíče pro výběr. To sníží předpoklady důvěry tím, že umožní stakerům, kteří delegují ETH [poskytovatelům stakingu jako služby (staking-as-a-service)](/staking/saas/#what-is-staking-as-a-service), aby si zachovali kontrolu nad svými prostředky.

## Odvozování klíčů ze seed fráze {#deriving-keys-from-seed}

Pokud by každých 32 stakovaných ETH vyžadovalo novou sadu 2 zcela nezávislých klíčů, správa klíčů by se rychle stala nepraktickou, zejména pro uživatele provozující více validátorů. Místo toho lze z jednoho společného tajemství odvodit více klíčů validátora a uložení tohoto jediného tajemství umožňuje přístup k více klíčům validátora.

[Mnemotechnické pomůcky](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) a cesty jsou prominentní funkce, se kterými se uživatelé často setkávají, když [přistupují](https://ethereum.stackexchange.com/questions/19055/what-is-the-difference-between-m-44-60-0-0-and-m-44-60-0) ke svým peněženkám. Mnemotechnická pomůcka je sekvence slov, která funguje jako počáteční seed pro soukromý klíč. V kombinaci s dalšími daty generuje mnemotechnická pomůcka hash známý jako „hlavní klíč“ (master key). To si lze představit jako kořen stromu. Větve z tohoto kořene pak lze odvodit pomocí hierarchické cesty, takže podřízené uzly mohou existovat jako kombinace hashe jejich nadřazeného uzlu a jejich indexu ve stromu. Přečtěte si o standardech [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) a [BIP-19](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) pro generování klíčů na základě mnemotechnických pomůcek.

Tyto cesty mají následující strukturu, která bude povědomá uživatelům, kteří interagovali s hardwarovými peněženkami:

```
m/44'/60'/0'/0`
```

Lomítka v této cestě oddělují komponenty soukromého klíče následovně:

```
master_key / purpose / coin_type / account / change / address_index
```

Tato logika umožňuje uživatelům připojit co nejvíce validátorů k jedné **mnemotechnické frázi**, protože kořen stromu může být společný a k diferenciaci může dojít na větvích. Uživatel může z mnemotechnické fráze **odvodit libovolný počet klíčů**.

```
[m / 0]
     /
    /
[m] - [m / 1]
    \
     \
      [m / 2]
```

Každá větev je oddělena znakem `/`, takže `m/2` znamená začít s hlavním klíčem a sledovat větev 2. Ve schématu níže se k uložení tří klíčů pro výběr používá jedna mnemotechnická fráze, z nichž každý má dva přidružené validátory.

![validator key logic](multiple-keys.png)

## Další čtení {#further-reading}

- [Příspěvek na blogu Nadace Ethereum od Carla Beekhuizena](https://blog.ethereum.org/2020/05/21/keys)
- [EIP-2333: Generování klíčů BLS12-381](https://eips.ethereum.org/EIPS/eip-2333)
- [EIP-7002: Výstupy spouštěné exekuční vrstvou](https://web.archive.org/web/20250125035123/https://research.2077.xyz/eip-7002-unpacking-improvements-to-staking-ux-post-merge)
- [Správa klíčů ve velkém měřítku](https://docs.ethstaker.cc/ethstaker-knowledge-base/scaled-node-operators/key-management-at-scale)