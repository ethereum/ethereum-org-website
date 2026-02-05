---
title: "Spusťte si vlastní uzel Etherea"
description: "Obecný úvod do spouštění vlastní instance klienta Etherea."
lang: cs
sidebarDepth: 2
---

Provozování vlastního uzlu vám přináší různé výhody, otevírá nové možnosti a pomáhá podporovat ekosystém. Tato stránka vás provede spuštěním vlastního uzlu a účastí na validaci ethereových transakcí.

Všimněte si, že po [Sloučení](/roadmap/merge) jsou k provozu uzlu Etherea zapotřebí dva klienti: klient **exekuční vrstvy (EL)** a klient **konsensuální vrstvy (CL)**. Tato stránka vám ukáže, jak nainstalovat, nakonfigurovat a připojit tyto dva klienty k provozu uzlu Etherea.

## Předpoklady {#prerequisites}

Měli byste rozumět tomu, co je uzel Etherea a proč byste mohli chtít provozovat klienta. Toto je popsáno v části [Uzly a klienti](/developers/docs/nodes-and-clients/).

Pokud jste v tématu provozování uzlu nováčkem nebo hledáte méně technickou cestu, doporučujeme nejprve se podívat na náš uživatelsky přívětivý úvod do [provozování uzlu Etherea](/run-a-node).

## Výběr přístupu {#choosing-approach}

Prvním krokem při spouštění uzlu je výběr přístupu. Na základě požadavků a různých možností si musíte vybrat implementaci klienta (exekučního i konsensuálního klienta), prostředí (hardware, systém) a parametry pro nastavení klienta.

Tato stránka vás provede těmito rozhodnutími a pomůže vám najít nejvhodnější způsob, jak provozovat vaši instanci Etherea.

Chcete-li si vybrat z implementací klientů, podívejte se na všechny dostupné [exekuční klienty](/developers/docs/nodes-and-clients/#execution-clients) a [konsensuální klienty](/developers/docs/nodes-and-clients/#consensus-clients) připravené pro Mainnet a přečtěte si o [diverzitě klientů](/developers/docs/nodes-and-clients/client-diversity).

Rozhodněte se, zda chcete software provozovat na vlastním [hardwaru nebo v cloudu](#local-vs-cloud), a zvažte [požadavky](#requirements) klientů.

Po přípravě prostředí nainstalujte vybrané klienty buď pomocí [rozhraní pro začátečníky](#automatized-setup), nebo [ručně](#manual-setup) pomocí terminálu s pokročilými možnostmi.

Když je uzel spuštěn a synchronizuje se, jste připraveni [jej používat](#using-the-node), ale nezapomeňte dohlížet na jeho [údržbu](#operating-the-node).

![Nastavení klienta](./diagram.png)

### Prostředí a hardware {#environment-and-hardware}

#### Lokálně nebo v cloudu {#local-vs-cloud}

Klienti Etherea mohou běžet na běžných počítačích a nevyžadují žádný speciální hardware, jako například těžařské stroje. Proto máte na základě svých potřeb různé možnosti nasazení uzlu.
Pro zjednodušení si představme provoz uzlu na lokálním fyzickém stroji i na cloudovém serveru:

- Cloud
  - Poskytovatelé nabízejí vysokou dostupnost serverů a statické veřejné IP adresy
  - Pořízení dedikovaného nebo virtuálního serveru může být pohodlnější než stavba vlastního
  - Kompromisem je důvěra třetí straně – poskytovateli serveru
  - Vzhledem k požadované velikosti úložiště pro plný uzel může být cena pronajatého serveru vysoká
- Vlastní hardware
  - Více suverénní přístup, který nevyžaduje důvěru.
  - Jednorázová investice
  - Možnost zakoupení předkonfigurovaných strojů
  - Musíte fyzicky připravit, udržovat a případně řešit problémy se strojem a sítí

Obě možnosti mají různé výhody, které jsou shrnuty výše. Pokud hledáte cloudové řešení, kromě mnoha tradičních poskytovatelů cloudových služeb existují také služby zaměřené na nasazování uzlů. Podívejte se na [uzly jako službu](/developers/docs/nodes-and-clients/nodes-as-a-service/), kde naleznete více možností pro hostované uzly.

#### Hardware {#hardware}

Decentralizovaná síť odolná vůči cenzuře by se však neměla spoléhat na poskytovatele cloudových služeb. Místo toho je pro ekosystém zdravější provozovat uzel na vlastním lokálním hardwaru. [Odhady](https://www.ethernodes.org/networkType/cl/Hosting) ukazují, že velká část uzlů běží v cloudu, což by se mohlo stát jediným bodem selhání.

Klienti Etherea mohou běžet na vašem počítači, notebooku, serveru nebo dokonce na jednodeskovém počítači. I když je možné provozovat klienty na osobním počítači, mít vyhrazený stroj pouze pro váš uzel může výrazně zvýšit jeho výkon a bezpečnost a zároveň minimalizovat dopad na váš primární počítač.

Používání vlastního hardwaru může být velmi snadné. Existuje mnoho jednoduchých možností i pokročilých nastavení pro technicky zdatnější lidi. Pojďme se tedy podívat na požadavky a prostředky pro provozování klientů Etherea na vašem stroji.

#### Požadavky {#requirements}

Hardwarové požadavky se liší podle klienta, ale obecně nejsou tak vysoké, protože uzel musí pouze zůstat synchronizovaný. Nezaměňujte to s těžbou, která vyžaduje mnohem větší výpočetní výkon. Doba synchronizace a výkon se však s výkonnějším hardwarem zlepšují.

Před instalací jakéhokoli klienta se prosím ujistěte, že váš počítač má dostatek zdrojů pro jeho provoz. Minimální a doporučené požadavky naleznete níže.

Úzkým hrdlem pro váš hardware je většinou místo na disku. Synchronizace blockchainu Etherea je velmi náročná na vstup/výstup a vyžaduje hodně místa. Nejlepší je mít **disk SSD (solid-state drive)** se stovkami GB volného místa i po synchronizaci.

Velikost databáze a rychlost počáteční synchronizace závisí na zvoleném klientovi, jeho konfiguraci a [strategii synchronizace](/developers/docs/nodes-and-clients/#sync-modes).

Také se ujistěte, že vaše internetové připojení není omezeno [datovým limitem](https://wikipedia.org/wiki/Data_cap). Doporučuje se používat připojení bez měření, protože počáteční synchronizace a data vysílaná do sítě by mohla překročit váš limit.

##### Operační systém

Všichni klienti podporují hlavní operační systémy – Linux, MacOS, Windows. To znamená, že uzly můžete provozovat na běžných stolních počítačích nebo serverech s operačním systémem (OS), který vám nejvíce vyhovuje. Ujistěte se, že je váš operační systém aktuální, abyste se vyhnuli potenciálním problémům a bezpečnostním zranitelnostem.

##### Minimální požadavky

- CPU s 2 a více jádry
- 8 GB RAM
- 2TB SSD
- Šířka pásma 10+ MBit/s

##### Doporučené specifikace

- Rychlý CPU se 4 a více jádry
- 16 GB+ RAM
- Rychlý SSD s 2+ TB
- Šířka pásma 25+ MBit/s

Režim synchronizace a klient, kterého si vyberete, ovlivní požadavky na prostor, ale níže jsme odhadli místo na disku, které budete pro každého klienta potřebovat.

| Klient     | Velikost disku (snap sync) | Velikost disku (plný archiv) |
| ---------- | --------------------------------------------- | ----------------------------------------------- |
| Besu       | 800 GB+                                       | 12 TB+                                          |
| Erigon     | Není k dispozici                              | 2,5 TB+                                         |
| Geth       | 500 GB+                                       | 12 TB+                                          |
| Nethermind | 500 GB+                                       | 12 TB+                                          |
| Reth       | Není k dispozici                              | 2,2 TB+                                         |

- Poznámka: Erigon a Reth nenabízejí snap sync, ale je možné úplné prořezávání (Full Pruning) (~2 TB pro Erigon, ~1,2 TB pro Reth)

U konsensuálních klientů závisí požadavek na prostor také na implementaci klienta a povolených funkcích (např. validator slasher), ale obecně počítejte s dalšími 200 GB potřebnými pro data beaconu. S velkým počtem validátorů roste i zatížení šířky pásma. [Podrobnosti o požadavcích na konsensuální klienty naleznete v této analýze](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Plug-and-play řešení {#plug-and-play}

Nejjednodušší možností pro provozování uzlu na vlastním hardwaru je použití plug-and-play boxů. Předkonfigurované stroje od prodejců nabízejí nejpřímočařejší zážitek: objednat, připojit, spustit. Vše je předkonfigurováno a běží automaticky s intuitivním průvodcem a řídicím panelem pro monitorování a ovládání softwaru.

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum na jednodeskovém počítači {#ethereum-on-a-single-board-computer}

Snadný a levný způsob, jak provozovat uzel Etherea, je použít jednodeskový počítač, a to i s architekturou ARM, jako je Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) poskytuje snadno spustitelné obrazy několika exekučních a konsensuálních klientů pro Raspberry Pi a další desky ARM.

Malá, cenově dostupná a efektivní zařízení, jako jsou tato, jsou ideální pro provoz uzlu doma, ale mějte na paměti jejich omezený výkon.

## Spuštění uzlu {#spinning-up-node}

Vlastní nastavení klienta lze provést buď pomocí automatizovaných spouštěčů, nebo ručně, přímým nastavením softwaru klienta.

Pro méně pokročilé uživatele je doporučeným přístupem použití spouštěče, softwaru, který vás provede instalací a automatizuje proces nastavení klienta. Pokud však máte nějaké zkušenosti s používáním terminálu, kroky pro ruční nastavení by měly být snadno proveditelné.

### Nastavení s průvodcem {#automatized-setup}

Několik uživatelsky přívětivých projektů si klade za cíl zlepšit zážitek z nastavování klienta. Tyto spouštěče poskytují automatickou instalaci a konfiguraci klienta, přičemž některé dokonce nabízejí grafické rozhraní pro nastavení s průvodcem a monitorování klientů.

Níže je uvedeno několik projektů, které vám mohou pomoci nainstalovat a ovládat klienty na pár kliknutí:

- [DappNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) – DappNode není dodáván pouze se strojem od prodejce. Software, samotný spouštěč uzlu a řídicí centrum s mnoha funkcemi lze použít na libovolném hardwaru.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) – Nejrychlejší a nejjednodušší způsob nastavení plného uzlu. Jednořádkový instalační nástroj a TUI pro správu uzlů. Zdarma. Open source. Veřejné statky pro Ethereum od sólo stakerů. Podpora ARM64 a AMD64.
- [eth-docker](https://eth-docker.net/) – Automatizované nastavení pomocí Dockeru zaměřené na snadný a bezpečný staking, vyžaduje základní znalosti terminálu a Dockeru, doporučeno pro mírně pokročilejší uživatele.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) – Spouštěč pro instalaci klientů na vzdálený server přes SSH připojení s průvodcem nastavení v GUI, řídicím centrem a mnoha dalšími funkcemi.
- [NiceNode](https://www.nicenode.xyz/) – Spouštěč s přímočarým uživatelským zážitkem pro spuštění uzlu na vašem počítači. Stačí si vybrat klienty a spustit je na pár kliknutí. Stále ve vývoji.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) – Nástroj pro nastavení uzlu, který automaticky generuje konfiguraci Dockeru pomocí průvodce CLI. Napsáno v Go od Nethermind.

### Ruční nastavení klientů {#manual-setup}

Druhou možností je ruční stažení, ověření a konfigurace softwaru klienta. I když někteří klienti nabízejí grafické rozhraní, ruční nastavení stále vyžaduje základní dovednosti s terminálem, ale nabízí mnohem větší všestrannost.

Jak bylo vysvětleno dříve, nastavení vlastního uzlu Etherea bude vyžadovat spuštění páru konsensuálního a exekučního klienta. Někteří klienti mohou obsahovat odlehčeného klienta (light client) druhého typu a synchronizovat se bez potřeby dalšího softwaru. Úplné ověření nevyžadující důvěru však vyžaduje obě implementace.

#### Získání softwaru klienta {#getting-the-client}

Nejprve musíte získat software preferovaného [exekučního klienta](/developers/docs/nodes-and-clients/#execution-clients) a [konsensuálního klienta](/developers/docs/nodes-and-clients/#consensus-clients).

Můžete si jednoduše stáhnout spustitelnou aplikaci nebo instalační balíček, který vyhovuje vašemu operačnímu systému a architektuře. Vždy ověřujte podpisy a kontrolní součty stažených balíčků. Někteří klienti také nabízejí repozitáře nebo obrazy Docker pro snadnější instalaci a aktualizace. Všichni klienti jsou open source, takže si je můžete také sestavit ze zdrojového kódu. Toto je pokročilejší metoda, ale v některých případech může být vyžadována.

Pokyny k instalaci každého klienta jsou uvedeny v dokumentaci, na kterou odkazují seznamy klientů výše.

Zde jsou stránky s vydáními klientů, kde naleznete jejich předpřipravené binární soubory nebo pokyny k instalaci:

##### Exekuční klienti

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Je také třeba poznamenat, že diverzita klientů je [problémem na exekuční vrstvě](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Doporučuje se, aby čtenáři zvážili provozování menšinového exekučního klienta.

##### Konsenzuální klienti

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source) (Neposkytuje předpřipravený binární soubor, pouze obraz Dockeru nebo je nutné jej sestavit ze zdrojového kódu)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Diverzita klientů](/developers/docs/nodes-and-clients/client-diversity/) je klíčová pro konsensuální uzly provozující validátory. Pokud většina validátorů provozuje jedinou implementaci klienta, je ohrožena bezpečnost sítě. Proto se doporučuje zvážit výběr menšinového klienta.

[Podívejte se na nejnovější využití síťových klientů](https://clientdiversity.org/) a zjistěte více o [diverzitě klientů](/developers/docs/nodes-and-clients/client-diversity).

##### Ověření softwaru

Při stahování softwaru z internetu se doporučuje ověřit jeho integritu. Tento krok je nepovinný, ale zejména u klíčové části infrastruktury, jako je klient Etherea, je důležité si uvědomit potenciální vektory útoku a vyhnout se jim. Pokud jste si stáhli předpřipravený binární soubor, musíte mu důvěřovat a riskovat, že by útočník mohl spustitelný soubor vyměnit za škodlivý.

Vývojáři podepisují vydané binární soubory svými klíči PGP, takže si můžete kryptograficky ověřit, že spouštíte přesně ten software, který vytvořili. Stačí získat veřejné klíče používané vývojáři, které naleznete na stránkách s vydáními klientů nebo v dokumentaci. Po stažení vydání klienta a jeho podpisu je můžete snadno ověřit pomocí implementace PGP, např. [GnuPG](https://gnupg.org/download/index.html). Podívejte se na návod k ověřování open-source softwaru pomocí `gpg` na [Linuxu](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) nebo [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/).

Další formou ověření je ujistit se, že haš, jedinečný kryptografický otisk, softwaru, který jste stáhli, se shoduje s tím, který poskytli vývojáři. To je ještě jednodušší než použití PGP a někteří klienti nabízejí pouze tuto možnost. Stačí spustit hašovací funkci na staženém softwaru a porovnat ji s tou ze stránky vydání. Například:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Nastavení klienta {#client-setup}

Po instalaci, stažení nebo zkompilování softwaru klienta jste připraveni jej spustit. To pouze znamená, že musí být spuštěn se správnou konfigurací. Klienti nabízejí bohaté možnosti konfigurace, které mohou povolit různé funkce.

Začněme možnostmi, které mohou výrazně ovlivnit výkon klienta a využití dat. [Režimy synchronizace](/developers/docs/nodes-and-clients/#sync-modes) představují různé metody stahování a validace dat blockchainu. Před spuštěním uzlu byste se měli rozhodnout, jakou síť a režim synchronizace použít. Nejdůležitějšími věcmi, které je třeba zvážit, jsou místo na disku a doba synchronizace, kterou bude klient potřebovat. Věnujte pozornost dokumentaci klienta, abyste zjistili, který režim synchronizace je výchozí. Pokud vám to nevyhovuje, vyberte si jiný na základě úrovně zabezpečení, dostupných dat a nákladů. Kromě synchronizačního algoritmu můžete také nastavit prořezávání (pruning) různých druhů starých dat. Prořezávání (pruning) umožňuje mazat zastaralá data, tj. odstraňovat uzly stavového trie, které jsou nedosažitelné z posledních bloků.

Další základní možnosti konfigurace jsou např. výběr sítě – Mainnet nebo testnety, povolení HTTP endpointu pro RPC nebo WebSockets atd. Všechny funkce a možnosti naleznete v dokumentaci klienta. Různé konfigurace klienta lze nastavit spuštěním klienta s odpovídajícími příznaky přímo v CLI nebo konfiguračním souboru. Každý klient je trochu jiný; podrobnosti o možnostech konfigurace naleznete vždy v jeho oficiální dokumentaci nebo na stránce nápovědy.

Pro účely testování můžete preferovat spuštění klienta na jedné z testovacích sítí. [Podívejte se na přehled podporovaných sítí](/developers/docs/nodes-and-clients/#execution-clients).

Příklady spuštění exekučních klientů se základní konfigurací naleznete v další části.

#### Spuštění exekučního klienta {#starting-the-execution-client}

Před spuštěním softwaru klienta Etherea proveďte poslední kontrolu, zda je vaše prostředí připraveno. Například se ujistěte, že:

- Je dostatek místa na disku s ohledem na zvolenou síť a režim synchronizace.
- Paměť a CPU nejsou vytíženy jinými programy.
- Operační systém je aktualizován na nejnovější verzi.
- Systém má správný čas a datum.
- Váš router a firewall přijímají připojení na naslouchajících portech. Ve výchozím nastavení používají klienti Etherea naslouchací port (TCP) a port pro zjišťování (UDP), oba ve výchozím nastavení na 30303.

Nejprve spusťte klienta na testnetu, abyste se ujistili, že vše funguje správně.

Na začátku musíte deklarovat všechna nastavení klienta, která nejsou výchozí. Pro deklarování preferované konfigurace můžete použít příznaky nebo konfigurační soubor. Sada funkcí a syntaxe konfigurace se u každého klienta liší. Specifika naleznete v dokumentaci vašeho klienta.

Exekuční a konsensuální klienti komunikují prostřednictvím ověřeného koncového bodu specifikovaného v [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Aby se mohl exekuční klient připojit ke konsensuálnímu klientovi, musí vygenerovat [`jwtsecret`](https://jwt.io/) ve známé cestě. Z bezpečnostních a stabilizačních důvodů by klienti měli běžet na stejném stroji a oba klienti musí znát tuto cestu, protože se používá k ověření lokálního připojení RPC mezi nimi. Exekuční klient musí také definovat naslouchací port pro ověřená API.

Tento token je generován automaticky softwarem klienta, ale v některých případech jej možná budete muset vytvořit sami. Můžete jej vygenerovat pomocí [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Spuštění exekučního klienta {#running-an-execution-client}

Tato část vás provede spuštěním exekučních klientů. Slouží pouze jako příklad základní konfigurace, která spustí klienta s těmito nastaveními:

- Určuje síť pro připojení, v našich příkladech Mainnet
  - Pro předběžné testování vašeho nastavení si můžete místo toho vybrat [jeden z testnetů](/developers/docs/networks/)
- Definuje datový adresář, kde budou uložena všechna data včetně blockchainu
  - Ujistěte se, že cestu nahradíte skutečnou, např. odkazující na váš externí disk
- Povoluje rozhraní pro komunikaci s klientem
  - Včetně JSON-RPC a Engine API pro komunikaci s konsensuálním klientem
- Definuje cestu k `jwtsecret` pro ověřené API
  - Ujistěte se, že příkladovou cestu nahradíte skutečnou, ke které mají klienti přístup, např. `/tmp/jwtsecret`

Mějte na paměti, že se jedná pouze o základní příklad, všechna ostatní nastavení budou nastavena na výchozí hodnoty. Věnujte pozornost dokumentaci každého klienta, abyste se dozvěděli o výchozích hodnotách, nastaveních a funkcích. Pro více funkcí, například pro provozování validátorů, monitorování atd., se prosím obraťte na dokumentaci konkrétního klienta.

> Všimněte si, že zpětná lomítka `` v příkladech slouží pouze pro účely formátování; konfigurační příznaky lze definovat na jednom řádku.

##### Spuštění Besu

Tento příklad spouští Besu na Mainnetu, ukládá data blockchainu ve výchozím formátu na `/data/ethereum`, povoluje JSON-RPC a Engine RPC pro připojení konsensuálního klienta. Engine API je ověřeno tokenem `jwtsecret` a jsou povolána pouze volání z `localhost`.

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu také přichází s možností spouštěče, který položí řadu otázek a vygeneruje konfigurační soubor. Spusťte interaktivní spouštěč pomocí:

```sh
besu --Xlauncher
```

[Dokumentace Besu](https://besu.hyperledger.org/public-networks/get-started/start-node/) obsahuje další možnosti a podrobnosti o konfiguraci.

##### Spuštění Erigonu

Tento příklad spouští Erigon na Mainnetu, ukládá data blockchainu na `/data/ethereum`, povoluje JSON-RPC, definuje, které jmenné prostory jsou povoleny, a povoluje ověřování pro připojení konsensuálního klienta, což je definováno cestou k `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon ve výchozím nastavení provádí plnou synchronizaci s 8GB HDD, což bude mít za následek více než 2 TB archivních dat. Ujistěte se, že `datadir` ukazuje na disk s dostatkem volného místa, nebo se podívejte na příznak `--prune`, který může oříznout různé druhy dat. Pro více informací se podívejte na `--help` Erigonu.

##### Spuštění Gethu

Tento příklad spouští Geth na Mainnetu, ukládá data blockchainu na `/data/ethereum`, povoluje JSON-RPC a definuje, které jmenné prostory jsou povoleny. Také povoluje ověřování pro připojení konsensuálního klienta, což vyžaduje cestu k `jwtsecret` a také možnost definující, která připojení jsou povolena, v našem příkladu pouze z `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Podívejte se na [dokumentaci pro všechny možnosti konfigurace](https://geth.ethereum.org/docs/fundamentals/command-line-options) a dozvíte se více o [provozování Gethu s konsensuálním klientem](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Spuštění Nethermindu

Nethermind nabízí různé [možnosti instalace](https://docs.nethermind.io/get-started/installing-nethermind). Balíček obsahuje různé binární soubory, včetně spouštěče s průvodcem nastavení, který vám pomůže interaktivně vytvořit konfiguraci. Alternativně najdete Runner, což je samotný spustitelný soubor, a můžete jej spustit s konfiguračními příznaky. JSON-RPC je ve výchozím nastavení povoleno.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Dokumentace Nethermind nabízí [kompletního průvodce](https://docs.nethermind.io/get-started/running-node/) provozováním Nethermindu s konsensuálním klientem.

Exekuční klient spustí své základní funkce, zvolené koncové body a začne hledat peery. Po úspěšném nalezení peerů klient zahájí synchronizaci. Exekuční klient bude čekat na připojení od konsensuálního klienta. Aktuální data blockchainu budou k dispozici, jakmile bude klient úspěšně synchronizován s aktuálním stavem.

##### Spuštění Reth

Tento příklad spouští Reth na Mainnetu s použitím výchozího umístění dat. Povoluje JSON-RPC a ověřování Engine RPC pro připojení konsensuálního klienta, což je definováno cestou k `jwtsecret`, přičemž jsou povolena pouze volání z `localhost`.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Podívejte se na [Konfigurace Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth), abyste se dozvěděli více o výchozích datových adresářích. [Dokumentace Reth](https://reth.rs/run/mainnet.html) obsahuje další možnosti a podrobnosti o konfiguraci.

#### Spuštění konsensuálního klienta {#starting-the-consensus-client}

Konsensuální klient musí být spuštěn se správnou konfigurací portu, aby se navázalo lokální připojení RPC k exekučnímu klientovi. Konsensuální klienti musí být spuštěni s portem vystaveným exekučním klientem jako konfiguračním argumentem.

Konsensuální klient také potřebuje cestu k souboru `jwt-secret` exekučního klienta, aby mohl ověřit připojení RPC mezi nimi. Podobně jako v příkladech s exekučními klienty výše, každý konsensuální klient má konfigurační příznak, který jako argument přijímá cestu k souboru s tokenem jwt. Ta musí být shodná s cestou k `jwtsecret` poskytnutou exekučnímu klientovi.

Pokud plánujete provozovat validátora, ujistěte se, že jste přidali konfigurační příznak specifikující adresu Etherea příjemce poplatků. Zde se hromadí odměny v etheru pro vašeho validátora. Každý konsensuální klient má možnost, např. `--suggested-fee-recipient=0xabcd1`, která jako argument přijímá adresu Etherea.

Při spouštění Beacon Node na testnetu můžete ušetřit značný čas synchronizace použitím veřejného koncového bodu pro [Checkpoint sync](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Spuštění konsensuálního klienta {#running-a-consensus-client}

##### Spuštění Lighthouse

Před spuštěním Lighthouse se dozvíte více o tom, jak jej nainstalovat a nakonfigurovat v [Lighthouse Booku](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Spuštění Lodestaru

Nainstalujte software Lodestar kompilací nebo stažením obrazu Docker. Více se dozvíte v [dokumentaci](https://chainsafe.github.io/lodestar/) a v podrobnějším [průvodci nastavením](https://hackmd.io/@philknows/rk5cDvKmK).

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Spuštění Nimbus

Nimbus přichází s konsensuálním i exekučním klientem. Může být spuštěn na různých zařízeních, dokonce i s velmi skromným výpočetním výkonem.
Po [instalaci závislostí a samotného Nimbusu](https://nimbus.guide/quick-start.html) můžete spustit jeho konsensuálního klienta:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Spuštění Prysm

Prysm přichází se skriptem, který umožňuje snadnou automatickou instalaci. Podrobnosti naleznete v [dokumentaci Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### Spuštění Teku

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

Když se konsensuální klient připojí k exekučnímu klientovi, aby si přečetl depozitní kontrakt a identifikoval validátory, připojí se také k ostatním peerům Beacon Node a zahájí synchronizaci konsensuálních slotů od geneze. Jakmile Beacon Node dosáhne aktuální epochy, stane se Beacon API použitelné pro vaše validátory. Dozvíte se více o [Beacon Node API](https://eth2docs.vercel.app/).

### Přidání validátorů {#adding-validators}

Konsensuální klient slouží jako Beacon Node, ke kterému se validátoři připojují. Každý konsensuální klient má svůj vlastní software pro validátory, který je podrobně popsán v jeho příslušné dokumentaci.

Provozování vlastního validátoru umožňuje sólo staking (solo staking), nejúčinnější metodu podpory sítě Etherea, která nevyžaduje důvěru. To však vyžaduje vklad ve výši 32 ETH. Chcete-li spustit validátora na vlastním uzlu s menší částkou, mohl by vás zajímat decentralizovaný pool s operátory uzlů bez oprávnění, jako je [Rocket Pool](https://rocketpool.net/node-operators).

Nejjednodušší způsob, jak začít se stakingem a generováním klíčů validátora, je použít [testnet Hoodi Staking Launchpad](https://hoodi.launchpad.ethereum.org/), který vám umožní otestovat vaše nastavení [provozováním uzlů na Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Až budete připraveni na Mainnet, můžete tyto kroky zopakovat pomocí [Mainnet Staking Launchpadu](https://launchpad.ethereum.org/).

Podívejte se na [stránku o stakingu](/staking) pro přehled možností stakingu.

### Používání uzlu {#using-the-node}

Exekuční klienti nabízejí koncové body [RPC API](/developers/docs/apis/json-rpc/), které můžete použít k odesílání transakcí, interakci s chytrými kontrakty nebo jejich nasazení na síti Etherea různými způsoby:

- Ručním voláním s vhodným protokolem (např. pomocí `curl`)
- Připojením poskytnuté konzole (např. `geth attach`)
- Implementací v aplikacích pomocí knihoven web3, např. [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Různí klienti mají různé implementace koncových bodů RPC. Existuje však standardní JSON-RPC, který můžete použít s každým klientem. Pro přehled si přečtěte [dokumentaci JSON-RPC](/developers/docs/apis/json-rpc/). Aplikace, které potřebují informace ze sítě Etherea, mohou používat toto RPC. Například populární peněženka MetaMask vám umožňuje [připojit se k vlastnímu koncovému bodu RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node), což má velké výhody v oblasti soukromí a bezpečnosti.

Konsensuální klienti všichni vystavují [Beacon API](https://ethereum.github.io/beacon-APIs), které lze použít ke kontrole stavu konsensuálního klienta nebo ke stahování bloků a konsensuálních dat odesíláním požadavků pomocí nástrojů, jako je [Curl](https://curl.se). Více informací o tomto naleznete v dokumentaci pro každý konsensuální klient.

#### Dosažení RPC {#reaching-rpc}

Výchozí port pro JSON-RPC exekučního klienta je `8545`, ale porty lokálních koncových bodů můžete v konfiguraci upravit. Ve výchozím nastavení je rozhraní RPC dostupné pouze na localhostu vašeho počítače. Chcete-li jej zpřístupnit vzdáleně, můžete jej vystavit veřejnosti změnou adresy na `0.0.0.0`. Tím se stane dostupným přes lokální síť a veřejné IP adresy. Ve většině případů budete také muset nastavit přesměrování portů na vašem routeru.

K vystavování portů na internet přistupujte opatrně, protože to umožní komukoli na internetu ovládat váš uzel. Zlomyslní aktéři by mohli získat přístup k vašemu uzlu, aby shodili váš systém nebo ukradli vaše prostředky, pokud používáte svého klienta jako peněženku.

Jedním ze způsobů, jak se tomu vyhnout, je zabránit modifikaci potenciálně škodlivých metod RPC. Například s Geth můžete deklarovat modifikovatelné metody pomocí příznaku: `--http.api web3,eth,txpool`.

Přístup k rozhraní RPC lze rozšířit vývojem API na okrajové vrstvě nebo aplikací webového serveru, jako je Nginx, a jejich připojením k lokální adrese a portu vašeho klienta. Využití mezivrstvy může také vývojářům umožnit nastavit certifikát pro zabezpečené `https` připojení k rozhraní RPC.

Nastavení webového serveru, proxy nebo externě orientovaného Rest API není jediný způsob, jak poskytnout přístup k koncovému bodu RPC vašeho uzlu. Dalším způsobem, jak nastavit veřejně dostupný koncový bod se zachováním soukromí, je hostovat uzel na vaší vlastní službě onion [Tor](https://www.torproject.org/). To vám umožní dosáhnout RPC mimo vaši lokální síť bez statické veřejné IP adresy nebo otevřených portů. Použití této konfigurace však může umožnit přístup k koncovému bodu RPC pouze přes síť Tor, kterou nepodporují všechny aplikace a může to vést k problémům s připojením.

K tomu si musíte vytvořit vlastní [službu onion](https://community.torproject.org/onion-services/). Podívejte se na [dokumentaci](https://community.torproject.org/onion-services/setup/) o nastavení služby onion pro hostování vaší vlastní. Můžete ji nasměrovat na webový server s proxy na port RPC nebo přímo na RPC.

A konečně, jedním z nejpopulárnějších způsobů poskytování přístupu k interním sítím je připojení VPN. V závislosti na vašem případu použití a počtu uživatelů, kteří potřebují přístup k vašemu uzlu, může být bezpečná VPN připojení volbou. [OpenVPN](https://openvpn.net/) je plně funkční SSL VPN, která implementuje zabezpečené rozšíření sítě na 2. nebo 3. vrstvě OSI pomocí standardního protokolu SSL/TLS, podporuje flexibilní metody ověřování klientů na základě certifikátů, čipových karet a/nebo přihlašovacích údajů s uživatelským jménem/heslem a umožňuje zásady řízení přístupu specifické pro uživatele nebo skupiny pomocí pravidel firewallu aplikovaných na virtuální rozhraní VPN.

### Provozování uzlu {#operating-the-node}

Měli byste pravidelně monitorovat svůj uzel, abyste se ujistili, že funguje správně. Možná budete muset provádět občasnou údržbu.

#### Udržování uzlu online {#keeping-node-online}

Váš uzel nemusí být online neustále, ale měli byste ho udržovat online co nejvíce, aby zůstal v synchronizaci se sítí. Můžete jej vypnout, abyste jej restartovali, ale mějte na paměti, že:

- Vypnutí může trvat několik minut, pokud se poslední stav stále zapisuje na disk.
- Nucené vypnutí může poškodit databázi, což vyžaduje resynchronizaci celého uzlu.
- Váš klient se dostane mimo synchronizaci se sítí a bude se muset při restartu znovu synchronizovat. I když uzel může začít synchronizovat od místa, kde byl naposledy vypnut, proces může trvat určitou dobu v závislosti na tom, jak dlouho byl offline.

_Toto se nevztahuje na uzly validátorů konsensuální vrstvy._ Vypnutí vašeho uzlu ovlivní všechny služby na něm závislé. Pokud provozujete uzel pro účely _stakování_, měli byste se snažit minimalizovat prostoje co nejvíce.

#### Vytváření služeb klienta {#creating-client-services}

Zvažte vytvoření služby pro automatické spouštění vašich klientů při startu. Například na serverech s Linuxem by dobrou praxí bylo vytvořit službu, např. s `systemd`, která spouští klienta se správnou konfigurací, pod uživatelem s omezenými oprávněními a automaticky se restartuje.

#### Aktualizace klientů {#updating-clients}

Musíte udržovat svůj software klienta aktuální s nejnovějšími bezpečnostními záplatami, funkcemi a [EIP](/eips/). Zejména před [hard forky](/ethereum-forks/) se ujistěte, že používáte správné verze klienta.

> Před důležitými aktualizacemi sítě EF zveřejňuje příspěvek na svém [blogu](https://blog.ethereum.org). Můžete se [přihlásit k odběru těchto oznámení](https://blog.ethereum.org/category/protocol#subscribe), abyste dostali upozornění na váš e-mail, když váš uzel potřebuje aktualizaci.

Aktualizace klientů je velmi jednoduchá. Každý klient má ve své dokumentaci specifické pokyny, ale proces je obecně jen stažení nejnovější verze a restartování klienta s novým spustitelným souborem. Klient by měl pokračovat tam, kde skončil, ale s aplikovanými aktualizacemi.

Každá implementace klienta má lidsky čitelný řetězec verze, který se používá v protokolu peer-to-peer, ale je také přístupný z příkazového řádku. Tento řetězec verze umožňuje uživatelům zkontrolovat, zda používají správnou verzi, a umožňuje prohlížečům bloků a dalším analytickým nástrojům, které se zajímají o kvantifikaci distribuce konkrétních klientů v síti. Pro více informací o řetězcích verzí se prosím obraťte na dokumentaci jednotlivých klientů.

#### Provozování dalších služeb {#running-additional-services}

Provozování vlastního uzlu vám umožňuje používat služby, které vyžadují přímý přístup k RPC klienta Etherea. Jedná se o služby postavené na Ethereu, jako jsou [řešení vrstvy 2](/developers/docs/scaling/#layer-2-scaling), backend pro peněženky, prohlížeče bloků, vývojářské nástroje a další infrastruktura Etherea.

#### Monitorování uzlu {#monitoring-the-node}

Chcete-li správně monitorovat svůj uzel, zvažte sběr metrik. Klienti poskytují koncové body pro metriky, takže můžete získat komplexní data o svém uzlu. Použijte nástroje jako [InfluxDB](https://www.influxdata.com/get-influxdb/) nebo [Prometheus](https://prometheus.io/) k vytvoření databází, které můžete přeměnit na vizualizace a grafy v softwaru jako [Grafana](https://grafana.com/). Existuje mnoho nastavení pro použití tohoto softwaru a různé řídicí panely Grafana pro vizualizaci vašeho uzlu a celé sítě. Například se podívejte na [návod na monitorování Gethu](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

V rámci monitorování se ujistěte, že sledujete výkon vašeho stroje. Během počáteční synchronizace vašeho uzlu může být software klienta velmi náročný na CPU a RAM. Kromě Grafany můžete k tomu použít nástroje, které nabízí váš operační systém, jako `htop` nebo `uptime`.

## Další čtení {#further-reading}

- [Ethereum Staking Guides](https://github.com/SomerEsat/ethereum-staking-guides) – _Somer Esat, často aktualizováno_
- [Průvodce | Jak nastavit validátor pro staking na mainnetu Etherea](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, často aktualizováno_
- [Průvodci ETHStaker k provozování validátorů na testnetech](https://github.com/remyroy/ethstaker#guides) – _ETHStaker, pravidelně aktualizováno_
- [Ukázková aplikace AWS Blockchain Node Runner pro uzly Etherea](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) – _AWS, často aktualizováno_
- [Časté dotazy ke Sloučení pro operátory uzlů](https://notes.ethereum.org/@launchpad/node-faq-merge) – _červenec 2022_
- [Analýza hardwarových požadavků pro plně validovaný uzel Etherea](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24. září 2018_
- [Provozování plných uzlů Ethereum: Příručka pro sotva motivované](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7. listopadu 2019_
- [Spuštění uzlu Hyperledger Besu na mainnetu Etherea: Výhody, požadavky a nastavení](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7. května 2020_
- [Nasazení klienta Nethermind Ethereum s monitorovacím balíčkem](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8. července 2020_

## Související témata {#related-topics}

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Bloky](/developers/docs/blocks/)
- [Sítě](/developers/docs/networks/)
