---
title: Spusťte si vlastní uzel Etherea
description: Obecný úvod do provozování vlastní instance klienta Etherea.
lang: cs
sidebarDepth: 2
---

Provozování vlastního uzlu vám přináší různé výhody, otevírá nové možnosti a pomáhá podporovat ekosystém. Tato stránka vás provede spuštěním vlastního uzlu a zapojením se do validace transakcí [Etherea](/).

Vezměte na vědomí, že po [Merge](/roadmap/merge) jsou k provozu uzlu Etherea vyžadováni dva klienti; klient **exekuční vrstvy (EL)** a klient **vrstvy konsensu (CL)**. Tato stránka ukáže, jak nainstalovat, nakonfigurovat a propojit tyto dva klienty pro provoz uzlu Etherea.

## Předpoklady {#prerequisites}

Měli byste rozumět tomu, co je uzel Etherea a proč byste mohli chtít provozovat klienta. Tomuto tématu se věnuje část [Uzly a klienti](/developers/docs/nodes-and-clients/).

Pokud jste v tématu provozování uzlu nováčkem nebo hledáte méně technickou cestu, doporučujeme si nejprve přečíst náš uživatelsky přívětivý úvod do [provozování uzlu Etherea](/run-a-node).

## Výběr přístupu {#choosing-approach}

Prvním krokem při spouštění uzlu je výběr přístupu. Na základě požadavků a různých možností musíte vybrat implementaci klienta (jak exekučního, tak konsensuálního klienta), prostředí (hardware, systém) a parametry pro nastavení klienta.

Tato stránka vás provede těmito rozhodnutími a pomůže vám najít nejvhodnější způsob, jak provozovat vaši instanci Etherea.

Chcete-li si vybrat z implementací klientů, podívejte se na všechny dostupné [exekuční klienty](/developers/docs/nodes-and-clients/#execution-clients) a [konsensuální klienty](/developers/docs/nodes-and-clients/#consensus-clients) připravené pro Mainnet a zjistěte více o [klientské diverzitě](/developers/docs/nodes-and-clients/client-diversity).

Rozhodněte se, zda budete software provozovat na vlastním [hardwaru nebo v cloudu](#local-vs-cloud), s ohledem na [požadavky](#requirements) klientů.

Po přípravě prostředí nainstalujte vybrané klienty buď pomocí [rozhraní pro začátečníky](#automatized-setup), nebo [ručně](#manual-setup) pomocí terminálu s pokročilými možnostmi.

Když uzel běží a probíhá synchronizace, jste připraveni jej [používat](#using-the-node), ale nezapomeňte dohlížet na jeho [údržbu](#operating-the-node).

![Client setup](./diagram.png)

### Prostředí a hardware {#environment-and-hardware}

#### Lokálně nebo v cloudu {#local-vs-cloud}

Klienti Etherea mohou běžet na běžných počítačích a nevyžadují žádný speciální hardware, jako například těžební stroje. Proto máte různé možnosti nasazení uzlu podle svých potřeb.
Pro zjednodušení se zamysleme nad provozováním uzlu jak na lokálním fyzickém stroji, tak na cloudovém serveru:

- Cloud
  - Poskytovatelé nabízejí vysokou dostupnost serveru a statické veřejné IP adresy
  - Pořízení dedikovaného nebo virtuálního serveru může být pohodlnější než stavba vlastního
  - Nevýhodou je nutnost důvěřovat třetí straně – poskytovateli serveru
  - Kvůli požadované velikosti úložiště pro plný uzel může být cena pronajatého serveru vysoká
- Vlastní hardware
  - Suverénnější přístup nevyžadující důvěru
  - Jednorázová investice
  - Možnost zakoupit předkonfigurované stroje
  - Stroj a síť musíte fyzicky připravit, udržovat a případně řešit problémy

Obě možnosti mají různé výhody shrnuté výše. Pokud hledáte cloudové řešení, kromě mnoha tradičních poskytovatelů cloud computingu existují také služby zaměřené na nasazení uzlů. Podívejte se na [uzly jako službu](/developers/docs/nodes-and-clients/nodes-as-a-service/) pro více možností hostovaných uzlů.

#### Hardware {#hardware}

Decentralizovaná síť odolná vůči cenzuře by však neměla spoléhat na poskytovatele cloudu. Místo toho je pro ekosystém zdravější provozovat uzel na vlastním lokálním hardwaru. [Odhady](https://www.ethernodes.org/networkType/cl/Hosting) ukazují, že velký podíl uzlů běží v cloudu, což by se mohlo stát jediným bodem selhání (single point of failure).

Klienti Etherea mohou běžet na vašem počítači, notebooku, serveru nebo dokonce na jednodeskovém počítači. Ačkoli je možné provozovat klienty na vašem osobním počítači, vyhrazený stroj pouze pro váš uzel může výrazně zvýšit jeho výkon a bezpečnost a zároveň minimalizovat dopad na váš primární počítač.

Použití vlastního hardwaru může být velmi snadné. Existuje mnoho jednoduchých možností i pokročilých nastavení pro techničtěji zaměřené lidi. Pojďme se tedy podívat na požadavky a prostředky pro provoz klientů Etherea na vašem stroji.

#### Požadavky {#requirements}

Hardwarové požadavky se liší podle klienta, ale obecně nejsou tak vysoké, protože uzel potřebuje pouze zůstat synchronizovaný. Nezaměňujte to s těžbou, která vyžaduje mnohem větší výpočetní výkon. Doba synchronizace a výkon se však s výkonnějším hardwarem zlepšují.

Před instalací jakéhokoli klienta se prosím ujistěte, že váš počítač má dostatek prostředků k jeho spuštění. Minimální a doporučené požadavky najdete níže.

Úzkým hrdlem vašeho hardwaru je většinou místo na disku. Synchronizace blockchainu Etherea je velmi náročná na vstupy/výstupy a vyžaduje spoustu místa. Nejlepší je mít **SSD disk (solid-state drive)** se stovkami GB volného místa i po dokončení synchronizace.

Velikost databáze a rychlost počáteční synchronizace závisí na zvoleném klientovi, jeho konfiguraci a [strategii synchronizace](/developers/docs/nodes-and-clients/#sync-modes).

Také se ujistěte, že vaše internetové připojení není omezeno [datovým limitem](https://wikipedia.org/wiki/Data_cap). Doporučuje se používat neomezené připojení, protože počáteční synchronizace a data vysílaná do sítě by mohla váš limit překročit.

##### Operační systém {#plug-and-play}

Všichni klienti podporují hlavní operační systémy – Linux, macOS, Windows. To znamená, že můžete provozovat uzly na běžných stolních nebo serverových počítačích s operačním systémem (OS), který vám nejvíce vyhovuje. Ujistěte se, že je váš OS aktuální, abyste předešli potenciálním problémům a bezpečnostním zranitelnostem.

##### Minimální požadavky {#ethereum-on-a-single-board-computer}

- CPU se 2+ jádry
- 8 GB RAM
- 2TB SSD
- Šířka pásma 10+ MBit/s

##### Doporučené specifikace {#spinning-up-node}

- Rychlý CPU se 4+ jádry
- 16 GB+ RAM
- Rychlé SSD s 2+TB
- Šířka pásma 25+ MBit/s

Režim synchronizace a klient, kterého si vyberete, ovlivní požadavky na místo, ale níže jsme odhadli místo na disku, které budete pro každého klienta potřebovat.

| Klient     | Velikost disku (snap sync) | Velikost disku (plný archiv) |
| ---------- | -------------------------- | ---------------------------- |
| Besu       | 800GB+                     | 12TB+                        |
| Erigon     | N/A                        | 2.5TB+                       |
| Geth       | 500GB+                     | 12TB+                        |
| Nethermind | 500GB+                     | 12TB+                        |
| Reth       | N/A                        | 2.2TB+                       |

- Poznámka: Erigon a Reth nenabízejí snap sync, ale je možné plné prořezávání (Full Pruning) (~2TB pro Erigon, ~1.2TB pro Reth)

U konsensuálních klientů závisí požadavek na místo také na implementaci klienta a povolených funkcích (např. slasher validátoru), ale obecně počítejte s dalšími 200 GB potřebnými pro data uzlu Beacon. S velkým počtem validátorů roste i zatížení šířky pásma. [Podrobnosti o požadavcích na konsensuální klienty najdete v této analýze](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc).

#### Řešení Plug-and-play {#automatized-setup}

Nejjednodušší možností pro provozování uzlu s vlastním hardwarem je použití plug-and-play boxů. Předkonfigurované stroje od prodejců nabízejí nejpřímočařejší zážitek: objednat, připojit, spustit. Vše je předkonfigurováno a běží automaticky s intuitivním průvodcem a řídicím panelem pro monitorování a ovládání softwaru.

- [DAppNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### Ethereum na jednodeskovém počítači {#manual-setup}

Snadným a levným způsobem, jak provozovat uzel Etherea, je použití jednodeskového počítače, a to i s architekturou ARM, jako je Raspberry Pi. [Ethereum on ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) poskytuje snadno spustitelné obrazy několika exekučních a konsensuálních klientů pro Raspberry Pi a další desky ARM.

Malá, cenově dostupná a efektivní zařízení, jako jsou tato, jsou ideální pro provozování uzlu doma, ale mějte na paměti jejich omezený výkon.

## Spuštění uzlu {#getting-the-client}

Samotné nastavení klienta lze provést buď pomocí automatizovaných spouštěčů (launcherů), nebo ručně, přímým nastavením klientského softwaru.

Pro méně pokročilé uživatele se doporučuje použít spouštěč, software, který vás provede instalací a automatizuje proces nastavení klienta. Pokud však máte nějaké zkušenosti s používáním terminálu, kroky pro ruční nastavení by pro vás měly být snadno sledovatelné.

### Řízené nastavení {#client-setup}

Několik uživatelsky přívětivých projektů si klade za cíl zlepšit zážitek z nastavování klienta. Tyto spouštěče poskytují automatickou instalaci a konfiguraci klienta, přičemž některé dokonce nabízejí grafické rozhraní pro řízené nastavení a monitorování klientů.

Níže je uvedeno několik projektů, které vám mohou pomoci nainstalovat a ovládat klienty pouhými několika kliknutími:

- [DAppNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DAppNode se nedodává pouze se strojem od prodejce. Software, samotný spouštěč uzlu a řídicí centrum s mnoha funkcemi lze použít na libovolném hardwaru.
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - Nejrychlejší a nejjednodušší způsob, jak nastavit plný uzel. Nástroj pro nastavení pomocí jednoho příkazu a TUI pro správu uzlu. Zdarma. Open source. Veřejné statky pro Ethereum od sólo stakerů. Podpora ARM64 a AMD64.
- [eth-docker](https://eth-docker.net/) - Automatizované nastavení pomocí Dockeru zaměřené na snadný a bezpečný staking, vyžaduje základní znalosti terminálu a Dockeru, doporučeno pro o něco pokročilejší uživatele.
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - Spouštěč pro instalaci klientů na vzdálený server přes SSH připojení s průvodcem nastavením v GUI, řídicím centrem a mnoha dalšími funkcemi.
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - Nástroj pro nastavení uzlu, který automaticky generuje konfiguraci Dockeru pomocí průvodce v CLI. Napsáno v Go týmem Nethermind.
- [Chainstack Self-Hosted](https://docs.chainstack.com/docs/self-hosted/introduction) - Webové uživatelské rozhraní a CLI pro nasazení exekučních a konsensuálních klientů na Kubernetes. Zahrnuje bootstrap ze snapshotu a vestavěné monitorování. Zdarma. Není vyžadován účet Chainstack. Vytvořeno společností Chainstack.

### Ruční nastavení klientů {#starting-the-execution-client}

Další možností je stáhnout, ověřit a nakonfigurovat klientský software ručně. I když někteří klienti nabízejí grafické rozhraní, ruční nastavení stále vyžaduje základní dovednosti s terminálem, ale nabízí mnohem větší všestrannost.

Jak již bylo vysvětleno, nastavení vlastního uzlu Etherea bude vyžadovat spuštění dvojice konsensuálního a exekučního klienta. Někteří klienti mohou obsahovat lehkého klienta druhého typu a synchronizovat se bez potřeby jakéhokoli dalšího softwaru. Plné ověření nevyžadující důvěru však vyžaduje obě implementace.

#### Získání klientského softwaru {#running-an-execution-client}

Nejprve musíte získat software vámi preferovaného [exekučního klienta](/developers/docs/nodes-and-clients/#execution-clients) a [konsensuálního klienta](/developers/docs/nodes-and-clients/#consensus-clients).

Můžete si jednoduše stáhnout spustitelnou aplikaci nebo instalační balíček, který vyhovuje vašemu operačnímu systému a architektuře. Vždy ověřujte podpisy a kontrolní součty stažených balíčků. Někteří klienti také nabízejí repozitáře nebo obrazy Dockeru pro snazší instalaci a aktualizace. Všichni klienti jsou open source, takže je můžete také zkompilovat ze zdrojového kódu. Jedná se o pokročilejší metodu, ale v některých případech může být vyžadována.

Pokyny k instalaci každého klienta jsou uvedeny v dokumentaci odkazované v seznamech klientů výše.

Zde jsou stránky s vydáními klientů, kde najdete jejich předkompilované binární soubory nebo pokyny k instalaci:

##### Exekuční klienti {#starting-the-consensus-client}

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [Nethermind](https://downloads.nethermind.io/)
- [Reth](https://reth.rs/installation/installation.html)

Za zmínku také stojí, že klientská diverzita je [problémem na exekuční vrstvě](/developers/docs/nodes-and-clients/client-diversity/#execution-layer). Čtenářům se doporučuje zvážit provozování menšinového exekučního klienta.

##### Konsensuální klienti {#running-a-consensus-client}

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/) (Neposkytuje předkompilovaný binární soubor, pouze obraz Dockeru nebo je nutné jej zkompilovat ze zdrojového kódu)
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[Klientská diverzita](/developers/docs/nodes-and-clients/client-diversity/) je kritická pro konsensuální uzly provozující validátory. Pokud většina validátorů provozuje jedinou implementaci klienta, je ohrožena bezpečnost sítě. Proto se doporučuje zvážit výběr menšinového klienta.

[Podívejte se na nejnovější využití klientů v síti](https://clientdiversity.org/) a zjistěte více o [klientské diverzitě](/developers/docs/nodes-and-clients/client-diversity).

##### Ověření softwaru {#adding-validators}

Při stahování softwaru z internetu se doporučuje ověřit jeho integritu. Tento krok je volitelný, ale zejména u klíčové součásti infrastruktury, jako je klient Etherea, je důležité si být vědom potenciálních vektorů útoku a vyhnout se jim. Pokud jste si stáhli předkompilovaný binární soubor, musíte mu důvěřovat a riskovat, že by útočník mohl spustitelný soubor vyměnit za škodlivý.

Vývojáři podepisují vydané binární soubory svými PGP klíči, takže můžete kryptograficky ověřit, že spouštíte přesně ten software, který vytvořili. Stačí získat veřejné klíče používané vývojáři, které najdete na stránkách s vydáními klientů nebo v dokumentaci. Po stažení vydání klienta a jeho podpisu můžete k jejich snadnému ověření použít implementaci PGP, např. [GnuPG](https://gnupg.org/download/index.html). Podívejte se na návod k ověřování open-source softwaru pomocí `gpg` na [Linuxu](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) nebo [Windows/macOS](https://freedom.press/training/verifying-open-source-software/).

Další formou ověření je ujistit se, že hash, jedinečný kryptografický otisk, staženého softwaru odpovídá tomu, který poskytli vývojáři. To je ještě jednodušší než použití PGP a někteří klienti nabízejí pouze tuto možnost. Stačí spustit hashovací funkci na staženém softwaru a porovnat ji s tou ze stránky vydání. Například:

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### Nastavení klienta {#using-the-node}

Po instalaci, stažení nebo kompilaci klientského softwaru jste připraveni jej spustit. To pouze znamená, že musí být spuštěn se správnou konfigurací. Klienti nabízejí bohaté možnosti konfigurace, které mohou povolit různé funkce.

Začněme možnostmi, které mohou významně ovlivnit výkon klienta a využití dat. [Režimy synchronizace](/developers/docs/nodes-and-clients/#sync-modes) představují různé metody stahování a ověřování dat blockchainu. Před spuštěním uzlu byste se měli rozhodnout, jakou síť a režim synchronizace použít. Nejdůležitějšími věcmi ke zvážení jsou místo na disku a doba synchronizace, kterou bude klient potřebovat. Věnujte pozornost dokumentaci klienta, abyste zjistili, který režim synchronizace je výchozí. Pokud vám nevyhovuje, vyberte si jiný na základě úrovně zabezpečení, dostupných dat a nákladů. Kromě synchronizačního algoritmu můžete také nastavit prořezávání (pruning) různých druhů starých dat. Prořezávání umožňuje mazání zastaralých dat, tj. odstraňování uzlů stavové trie, které jsou z nedávných bloků nedosažitelné.

Dalšími základními možnostmi konfigurace jsou např. výběr sítě – Mainnet nebo testnety, povolení HTTP koncového bodu pro RPC nebo WebSockets atd. Všechny funkce a možnosti najdete v dokumentaci klienta. Různé konfigurace klienta lze nastavit spuštěním klienta s odpovídajícími příznaky (flags) přímo v CLI nebo v konfiguračním souboru. Každý klient je trochu jiný; podrobnosti o možnostech konfigurace vždy hledejte v jeho oficiální dokumentaci nebo na stránce nápovědy.

Pro účely testování možná upřednostníte spuštění klienta na jedné z testnet sítí. [Podívejte se na přehled podporovaných sítí](/developers/docs/nodes-and-clients/#execution-clients).

Příklady spuštění exekučních klientů se základní konfigurací najdete v další části.

#### Spuštění exekučního klienta {#reaching-rpc}

Před spuštěním klientského softwaru Etherea proveďte poslední kontrolu, zda je vaše prostředí připraveno. Například se ujistěte, že:

- Je k dispozici dostatek místa na disku s ohledem na zvolenou síť a režim synchronizace.
- Paměť a CPU nejsou blokovány jinými programy.
- Operační systém je aktualizován na nejnovější verzi.
- Systém má správný čas a datum.
- Váš router a firewall přijímají připojení na naslouchajících portech. Ve výchozím nastavení používají klienti Etherea naslouchající (TCP) port a port pro objevování (UDP), oba standardně na 30303.

Nejprve spusťte svého klienta na testnetu, abyste se ujistili, že vše funguje správně.

Při spuštění musíte deklarovat všechna nastavení klienta, která nejsou výchozí. K deklaraci preferované konfigurace můžete použít příznaky nebo konfigurační soubor. Sada funkcí a syntaxe konfigurace se u každého klienta liší. Specifika najdete v dokumentaci vašeho klienta.

Exekuční a konsensuální klienti komunikují prostřednictvím ověřeného koncového bodu specifikovaného v [Engine API](https://github.com/ethereum/execution-apis/tree/main/src/engine). Aby se exekuční klient mohl připojit ke konsensuálnímu klientovi, musí vygenerovat [`jwtsecret`](https://jwt.io/) na známé cestě. Z důvodu bezpečnosti a stability by klienti měli běžet na stejném stroji a oba klienti musí tuto cestu znát, protože se používá k ověření lokálního RPC připojení mezi nimi. Exekuční klient musí také definovat naslouchající port pro ověřená API.

Tento token je generován automaticky klientským softwarem, ale v některých případech to možná budete muset udělat sami. Můžete jej vygenerovat pomocí [OpenSSL](https://www.openssl.org/):

```sh
openssl rand -hex 32 > jwtsecret
```

#### Spuštění exekučního klienta {#operating-the-node}

Tato část vás provede spuštěním exekučních klientů. Slouží pouze jako příklad základní konfigurace, která spustí klienta s těmito nastaveními:

- Určuje síť, ke které se má připojit, v našich příkladech Mainnet
  - Místo toho si můžete vybrat [jeden z testnetů](/developers/docs/networks/) pro předběžné testování vašeho nastavení
- Definuje datový adresář, kde budou uložena všechna data včetně blockchainu
  - Nezapomeňte nahradit cestu skutečnou, např. ukazující na váš externí disk
- Povoluje rozhraní pro komunikaci s klientem
  - Včetně JSON-RPC a Engine API pro komunikaci s konsensuálním klientem
- Definuje cestu k `jwtsecret` pro ověřené API
  - Nezapomeňte nahradit ukázkovou cestu skutečnou, ke které mají klienti přístup, např. `/tmp/jwtsecret`

Mějte prosím na paměti, že se jedná pouze o základní příklad, všechna ostatní nastavení budou nastavena na výchozí hodnoty. Věnujte pozornost dokumentaci každého klienta, abyste se dozvěděli o výchozích hodnotách, nastaveních a funkcích. Pro více funkcí, například pro provozování validátorů, monitorování atd., se prosím podívejte do dokumentace konkrétního klienta.

> Vezměte na vědomí, že zpětná lomítka `\` v příkladech slouží pouze pro účely formátování; konfigurační příznaky lze definovat na jednom řádku.

##### Spuštění Besu {#keeping-node-online}

Tento příklad spustí Besu na Mainnetu, uloží data blockchainu ve výchozím formátu do `/data/ethereum`, povolí JSON-RPC a Engine RPC pro připojení konsensuálního klienta. Engine API je ověřeno tokenem `jwtsecret` a jsou povolena pouze volání z `localhost`.

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

##### Spuštění Erigon {#creating-client-services}

Tento příklad spustí Erigon na Mainnetu, uloží data blockchainu do `/data/ethereum`, povolí JSON-RPC, definuje, které jmenné prostory jsou povoleny, a povolí ověřování pro připojení konsensuálního klienta, které je definováno cestou `jwtsecret`.

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Erigon ve výchozím nastavení provádí plnou synchronizaci s 8GB HDD, což povede k více než 2 TB archivních dat. Ujistěte se, že `datadir` ukazuje na disk s dostatkem volného místa, nebo se podívejte na příznak `--prune`, který může oříznout různé druhy dat. Pro více informací zkontrolujte `--help` Erigonu.

##### Spuštění Geth {#updating-clients}

Tento příklad spustí Geth na Mainnetu, uloží data blockchainu do `/data/ethereum`, povolí JSON-RPC a definuje, které jmenné prostory jsou povoleny. Povoluje také ověřování pro připojení konsensuálního klienta, které vyžaduje cestu k `jwtsecret` a také možnost definující, která připojení jsou povolena, v našem příkladu pouze z `localhost`.

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

Podívejte se do [dokumentace na všechny možnosti konfigurace](https://geth.ethereum.org/docs/fundamentals/command-line-options) a zjistěte více o [spuštění Geth s konsensuálním klientem](https://geth.ethereum.org/docs/getting-started/consensus-clients).

##### Spuštění Nethermind {#running-additional-services}

Nethermind nabízí různé [možnosti instalace](https://docs.nethermind.io/get-started/installing-nethermind). Balíček obsahuje různé binární soubory, včetně spouštěče (Launcher) s řízeným nastavením, který vám pomůže interaktivně vytvořit konfiguraci. Alternativně najdete Runner, což je samotný spustitelný soubor a můžete jej jednoduše spustit s konfiguračními příznaky. JSON-RPC je ve výchozím nastavení povoleno.

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Dokumentace Nethermind nabízí [kompletního průvodce](https://docs.nethermind.io/get-started/running-node/) spuštěním Nethermind s konsensuálním klientem.

Exekuční klient zahájí své základní funkce, vybrané koncové body a začne hledat peery. Po úspěšném objevení peerů klient zahájí synchronizaci. Exekuční klient bude čekat na připojení od konsensuálního klienta. Aktuální data blockchainu budou k dispozici, jakmile bude klient úspěšně synchronizován do aktuálního stavu.

##### Spuštění Reth {#monitoring-the-node}

Tento příklad spustí Reth na Mainnetu s použitím výchozího umístění dat. Povoluje JSON-RPC a ověřování Engine RPC pro připojení konsensuálního klienta, které je definováno cestou `jwtsecret`, přičemž jsou povolena pouze volání z `localhost`.

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

Podívejte se na [Konfigurace Reth](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth), kde se dozvíte více o výchozích datových adresářích. [Dokumentace Reth](https://reth.rs/run/mainnet.html) obsahuje další možnosti a podrobnosti o konfiguraci.

#### Spuštění konsensuálního klienta {#further-reading}

Konsensuální klient musí být spuštěn se správnou konfigurací portů, aby navázal lokální RPC připojení k exekučnímu klientovi. Konsensuální klienti musí být spuštěni s vystaveným portem exekučního klienta jako konfiguračním argumentem.

Konsensuální klient také potřebuje cestu k `jwt-secret` exekučního klienta, aby mohl ověřit RPC připojení mezi nimi. Podobně jako u výše uvedených příkladů exekuce má každý konsensuální klient konfigurační příznak, který bere jako argument cestu k souboru s jwt tokenem. To musí být konzistentní s cestou `jwtsecret` poskytnutou exekučnímu klientovi.

Pokud plánujete provozovat validátor, nezapomeňte přidat konfigurační příznak specifikující adresu Etherea příjemce poplatků. Zde se shromažďují odměny v etherech pro váš validátor. Každý konsensuální klient má možnost, např. `--suggested-fee-recipient=0xabcd1`, která bere jako argument adresu Etherea.

Při spouštění uzlu Beacon na testnetu můžete ušetřit značný čas synchronizace použitím veřejného koncového bodu pro [synchronizaci z kontrolního bodu (Checkpoint sync)](https://notes.ethereum.org/@launchpad/checkpoint-sync).

#### Spuštění konsensuálního klienta {#related-topics}

##### Spuštění Lighthouse

Před spuštěním Lighthouse se dozvíte více o tom, jak jej nainstalovat a nakonfigurovat v [Lighthouse Book](https://lighthouse-book.sigmaprime.io/installation.html).

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### Spuštění Lodestar

Nainstalujte software Lodestar jeho kompilací nebo stažením obrazu Dockeru. Zjistěte více v [dokumentaci](https://chainsafe.github.io/lodestar/) a v komplexnějším [průvodci nastavením](https://hackmd.io/@philknows/rk5cDvKmK).

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### Spuštění Nimbus

Nimbus přichází s konsensuálními i exekučními klienty. Lze jej spustit na různých zařízeních i s velmi skromným výpočetním výkonem.
Po [instalaci závislostí a samotného Nimbusu](https://nimbus.guide/quick-start.html) můžete spustit jeho konsensuálního klienta:

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### Spuštění Prysm

Prysm přichází se skriptem, který umožňuje snadnou automatickou instalaci. Podrobnosti najdete v [dokumentaci Prysm](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/).

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

Když se konsensuální klient připojí k exekučnímu klientovi, aby přečetl depozitní kontrakt a identifikoval validátory, připojí se také k dalším peerům uzlu Beacon a začne synchronizovat konsensuální sloty od genesis. Jakmile uzel Beacon dosáhne aktuální epochy, Beacon API se stane použitelným pro vaše validátory. Zjistěte více o [API uzlu Beacon](https://eth2docs.vercel.app/).

### Přidání validátorů

Konsensuální klient slouží jako uzel Beacon pro připojení validátorů. Každý konsensuální klient má svůj vlastní software validátoru podrobně popsaný v příslušné dokumentaci.

Provozování vlastního validátoru umožňuje [sólo staking](/staking/solo/), což je nejúčinnější metoda podpory sítě Ethereum nevyžadující důvěru. To však vyžaduje vklad 32 ETH. Chcete-li provozovat validátor na vlastním uzlu s menší částkou, mohl by vás zajímat decentralizovaný pool s provozovateli uzlů nevyžadujícími povolení, jako je [Rocket Pool](https://rocketpool.net/node-operators).

Nejjednodušší způsob, jak začít se stakingem a generováním klíčů validátoru, je použít [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org/), který vám umožní otestovat vaše nastavení [spuštěním uzlů na Hoodi](https://notes.ethereum.org/@launchpad/hoodi). Až budete připraveni na Mainnet, můžete tyto kroky zopakovat pomocí [Mainnet Staking Launchpad](https://launchpad.ethereum.org/).

Podívejte se na [stránku o stakingu](/staking) pro přehled možností stakingu.

### Používání uzlu

Exekuční klienti nabízejí [koncové body RPC API](/developers/docs/apis/json-rpc/), které můžete použít k odesílání transakcí, interakci s chytrými kontrakty nebo jejich nasazení v síti Ethereum různými způsoby:

- Jejich ručním voláním pomocí vhodného protokolu (např. pomocí `curl`)
- Připojením poskytnuté konzole (např. `geth attach`)
- Jejich implementací v aplikacích pomocí knihoven Web3, např. [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview), [ethers](https://github.com/ethers-io/ethers.js/)

Různí klienti mají různé implementace koncových bodů RPC. Existuje však standardní JSON-RPC, které můžete použít s každým klientem. Pro přehled si [přečtěte dokumentaci k JSON-RPC](/developers/docs/apis/json-rpc/). Aplikace, které potřebují informace ze sítě Ethereum, mohou toto RPC využít. Například populární peněženka MetaMask vám umožňuje [připojit se k vašemu vlastnímu koncovému bodu RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node), což má velké výhody pro soukromí a bezpečnost.

Všichni konsensuální klienti vystavují [Beacon API](https://ethereum.github.io/beacon-APIs), které lze použít ke kontrole stavu konsensuálního klienta nebo ke stahování bloků a dat konsensu odesíláním požadavků pomocí nástrojů, jako je [Curl](https://curl.se). Více informací o tom najdete v dokumentaci ke každému konsensuálnímu klientovi.

#### Přístup k RPC

Výchozí port pro JSON-RPC exekučního klienta je `8545`, ale porty lokálních koncových bodů můžete v konfiguraci upravit. Ve výchozím nastavení je rozhraní RPC dostupné pouze na localhostu vašeho počítače. Chcete-li jej zpřístupnit vzdáleně, možná jej budete chtít vystavit veřejnosti změnou adresy na `0.0.0.0`. Tím bude dostupné přes lokální síť a veřejné IP adresy. Ve většině případů budete také muset nastavit přesměrování portů na vašem routeru.

K vystavování portů do internetu přistupujte opatrně, protože to umožní komukoli na internetu ovládat váš uzel. Zlomyslní aktéři by mohli získat přístup k vašemu uzlu, aby shodili váš systém nebo ukradli vaše prostředky, pokud používáte svého klienta jako peněženku.

Způsobem, jak to obejít, je zabránit tomu, aby byly potenciálně škodlivé metody RPC modifikovatelné. Například u Geth můžete deklarovat modifikovatelné metody pomocí příznaku: `--http.api web3,eth,txpool`.

Přístup k rozhraní RPC lze rozšířit vývojem API na okrajové vrstvě (edge layer) nebo aplikací webového serveru, jako je Nginx, a jejich připojením k lokální adrese a portu vašeho klienta. Využití střední vrstvy může vývojářům také umožnit nastavit certifikát pro zabezpečená připojení `https` k rozhraní RPC.

Nastavení webového serveru, proxy nebo externě přístupného Rest API není jediným způsobem, jak poskytnout přístup ke koncovému bodu RPC vašeho uzlu. Dalším způsobem, jak nastavit veřejně dostupný koncový bod se zachováním soukromí, je hostovat uzel na vaší vlastní onion službě [Tor](https://www.torproject.org/). To vám umožní dosáhnout na RPC mimo vaši lokální síť bez statické veřejné IP adresy nebo otevřených portů. Použití této konfigurace však může umožnit přístup ke koncovému bodu RPC pouze prostřednictvím sítě Tor, což není podporováno všemi aplikacemi a může to vést k problémům s připojením.

K tomu si musíte vytvořit vlastní [onion službu](https://community.torproject.org/onion-services/). Podívejte se na [dokumentaci](https://community.torproject.org/onion-services/setup/) k nastavení onion služby, abyste mohli hostovat svou vlastní. Můžete ji nasměrovat na webový server s proxy na port RPC nebo přímo na RPC.

A konečně, jedním z nejpopulárnějších způsobů, jak poskytnout přístup k interním sítím, je prostřednictvím připojení VPN. V závislosti na vašem případu použití a množství uživatelů, kteří potřebují přístup k vašemu uzlu, může být možností zabezpečené připojení VPN. [OpenVPN](https://openvpn.net/) je plně vybavená SSL VPN, která implementuje zabezpečené rozšíření sítě na vrstvě 2 nebo 3 modelu OSI pomocí průmyslového standardu protokolu SSL/TLS, podporuje flexibilní metody ověřování klientů založené na certifikátech, čipových kartách a/nebo přihlašovacích údajích (uživatelské jméno/heslo) a umožňuje zásady řízení přístupu specifické pro uživatele nebo skupiny pomocí pravidel brány firewall aplikovaných na virtuální rozhraní VPN.

### Provozování uzlu

Měli byste svůj uzel pravidelně monitorovat, abyste se ujistili, že běží správně. Možná budete muset provádět občasnou údržbu.

#### Udržování uzlu online

Váš uzel nemusí být online neustále, ale měli byste jej udržovat online co nejvíce, aby zůstal synchronizovaný se sítí. Můžete jej vypnout a restartovat, ale mějte na paměti, že:

- Vypnutí může trvat několik minut, pokud se nedávný stav stále zapisuje na disk.
- Vynucené vypnutí může poškodit databázi, což bude vyžadovat opětovnou synchronizaci celého uzlu.
- Váš klient se přestane synchronizovat se sítí a po restartu se bude muset znovu synchronizovat. Ačkoli uzel může začít synchronizovat od místa, kde byl naposledy vypnut, proces může nějakou dobu trvat v závislosti na tom, jak dlouho byl offline.

_To neplatí pro uzly validátorů na vrstvě konsensu._ Odpojení vašeho uzlu ovlivní všechny služby, které jsou na něm závislé. Pokud provozujete uzel pro účely _stakingu_, měli byste se snažit minimalizovat prostoje na co nejmenší možnou míru.

#### Vytváření klientských služeb

Zvažte vytvoření služby pro automatické spouštění vašich klientů při startu systému. Například na serverech s Linuxem by bylo dobrou praxí vytvořit službu, např. pomocí `systemd`, která spustí klienta se správnou konfigurací pod uživatelem s omezenými oprávněními a automaticky se restartuje.

#### Aktualizace klientů

Klientský software musíte udržovat aktuální s nejnovějšími bezpečnostními záplatami, funkcemi a [EIP](/eips/). Zejména před [hard forky](/ethereum-forks/) se ujistěte, že používáte správné verze klientů.

> Před důležitými aktualizacemi sítě publikuje EF příspěvek na svém [blogu](https://blog.ethereum.org). Můžete se [přihlásit k odběru těchto oznámení](https://blog.ethereum.org/category/protocol#subscribe), abyste dostali upozornění na e-mail, když váš uzel potřebuje aktualizaci.

Aktualizace klientů je velmi jednoduchá. Každý klient má ve své dokumentaci specifické pokyny, ale proces obecně spočívá pouze ve stažení nejnovější verze a restartování klienta s novým spustitelným souborem. Klient by měl navázat tam, kde přestal, ale s aplikovanými aktualizacemi.

Každá implementace klienta má lidsky čitelný řetězec verze používaný v peer-to-peer protokolu, ale je přístupný i z příkazového řádku. Tento řetězec verze umožňuje uživatelům zkontrolovat, zda používají správnou verzi, a umožňuje průzkumníkům bloků a dalším analytickým nástrojům kvantifikovat distribuci konkrétních klientů v síti. Další informace o řetězcích verzí najdete v dokumentaci k jednotlivým klientům.

#### Spouštění dalších služeb

Provozování vlastního uzlu vám umožňuje využívat služby, které vyžadují přímý přístup k RPC klienta Etherea. Jedná se o služby postavené na Ethereu, jako jsou [řešení vrstvy 2 (l2)](/developers/docs/scaling/#layer-2-scaling), backend pro peněženky, průzkumníky bloků, vývojářské nástroje a další infrastruktura Etherea.

#### Monitorování uzlu

Chcete-li svůj uzel správně monitorovat, zvažte shromažďování metrik. Klienti poskytují koncové body metrik, takže můžete získat komplexní data o svém uzlu. Použijte nástroje jako [InfluxDB](https://www.influxdata.com/get-influxdb/) nebo [Prometheus](https://prometheus.io/) k vytvoření databází, které můžete přeměnit na vizualizace a grafy v softwaru, jako je [Grafana](https://grafana.com/). Existuje mnoho nastavení pro použití tohoto softwaru a různé řídicí panely Grafana, abyste mohli vizualizovat svůj uzel a síť jako celek. Podívejte se například na [návod na monitorování Geth](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/).

V rámci monitorování nezapomeňte sledovat výkon vašeho stroje. Během počáteční synchronizace vašeho uzlu může být klientský software velmi náročný na CPU a RAM. Kromě Grafany k tomu můžete použít nástroje, které nabízí váš OS, jako je `htop` nebo `uptime`.

## Další čtení

- [Průvodci stakingem Etherea](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat, často aktualizováno_
- [Průvodce | Jak nastavit validátor pro staking Etherea na Mainnetu](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew, často aktualizováno_
- [Průvodci EthStaker pro provozování validátorů na testnetech](https://github.com/remyroy/ethstaker#guides) – _EthStaker, pravidelně aktualizováno_
- [Ukázková aplikace AWS Blockchain Node Runner pro uzly Etherea](https://aws-samples.github.io/aws-blockchain-node-runners/docs/Blueprints/Ethereum) - _AWS, často aktualizováno_
- [Časté dotazy k Merge pro provozovatele uzlů](https://notes.ethereum.org/@launchpad/node-faq-merge) - _červenec 2022_
- [Analýza hardwarových požadavků pro plně validovaný uzel Etherea](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24. září 2018_
- [Provozování plných uzlů Etherea: Průvodce pro sotva motivované](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux, 7. listopadu 2019_
- [Provozování uzlu Hyperledger Besu na Ethereum Mainnetu: Výhody, požadavky a nastavení](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7. května 2020_
- [Nasazení klienta Nethermind Ethereum s monitorovacím stackem](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8. července 2020_

## Související témata

- [Uzly a klienti](/developers/docs/nodes-and-clients/)
- [Bloky](/developers/docs/blocks/)
- [Sítě](/developers/docs/networks/)