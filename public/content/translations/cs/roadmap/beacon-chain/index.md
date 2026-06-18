---
title: Beacon chain
description: Přečtěte si o Beacon chainu – aktualizaci, která do Etherea přinesla důkaz podílem (PoS).
lang: cs
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "Beacon chain přinesl do ekosystému Etherea důkaz podílem (PoS)."
  - "V září 2022 byl sloučen s původním řetězcem Etherea využívajícím důkaz prací (PoW)."
  - "Beacon chain zavedl logiku konsensu a protokol pro šíření bloků (gossip), který nyní zabezpečuje Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Beacon chain byl spuštěn 1. prosince 2020 a formalizoval důkaz podílem (PoS) jako mechanismus konsensu Etherea při aktualizaci Merge 15. září 2022.
</UpgradeStatus>

## Co je Beacon chain? {#what-is-the-beacon-chain}

Beacon chain je název původního blockchainu s důkazem podílem (PoS), který byl spuštěn v roce 2020. Byl vytvořen, aby se zajistilo, že logika konsensu důkazu podílem je spolehlivá a udržitelná před jejím povolením na [Ethereum](/) Mainnetu. Proto běžel souběžně s původním Ethereem využívajícím důkaz prací (PoW). Beacon chain byl řetězec „prázdných“ bloků, ale vypnutí důkazu prací a zapnutí důkazu podílem na Ethereu vyžadovalo dát Beacon chainu pokyn, aby přijímal transakční data od exekučních klientů, sdružoval je do bloků a poté je organizoval do blockchainu pomocí mechanismu konsensu založeného na důkazu podílem. Ve stejném okamžiku původní klienti Etherea vypnuli svou těžbu, šíření bloku a logiku konsensu a předali to vše Beacon chainu. Tato událost byla známá jako [Merge](/roadmap/merge/). Jakmile Merge proběhl, už neexistovaly dva blockchainy. Místo toho existovalo jen jedno Ethereum s důkazem podílem, které nyní vyžaduje dva různé klienty na uzel. Beacon chain je nyní vrstva konsensu, peer-to-peer síť klientů konsensu, která zpracovává šíření bloků (gossip) a logiku konsensu, zatímco původní klienti tvoří exekuční vrstvu, která je zodpovědná za šíření a provádění transakcí a správu stavu Etherea. Obě vrstvy spolu mohou komunikovat pomocí Engine API.

## Co dělá Beacon chain? {#what-does-the-beacon-chain-do}

Beacon chain je název pro účetní knihu, která vedla a koordinovala síť [stakerů](/staking/) Etherea předtím, než tito stakeři začali validovat skutečné bloky Etherea. Nezpracovává však transakce ani neřeší interakce s chytrými kontrakty, protože to se děje v exekuční vrstvě.
Beacon chain je zodpovědný za věci, jako je zpracování bloků a atestací, běh algoritmu volby forku a správa odměn a sankcí.
Přečtěte si více na naší [stránce o architektuře uzlů](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Dopad Beacon chainu {#beacon-chain-features}

### Zavedení stakingu {#introducing-staking}

Beacon chain přinesl do Etherea [důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos/). To udržuje Ethereum v bezpečí a validátorům to v procesu vydělává více ETH. V praxi staking zahrnuje uzamčení (stake) ETH za účelem aktivace softwaru validátoru. Jako staker provozujete software, který vytváří a validuje nové bloky v řetězci.

Staking slouží podobnému účelu, jakému dříve sloužila [těžba](/developers/docs/consensus-mechanisms/pow/mining/), ale v mnoha ohledech se liší. Těžba vyžadovala velké počáteční výdaje v podobě výkonného hardwaru a spotřeby energie, což vedlo k úsporám z rozsahu a podporovalo centralizaci. Těžba také nepřinášela žádný požadavek na uzamčení aktiv jako zajištění, což omezovalo schopnost protokolu potrestat špatné aktéry po útoku.

Přechod na důkaz podílem učinil Ethereum ve srovnání s důkazem prací výrazně bezpečnějším a decentralizovanějším. Čím více lidí se do sítě zapojí, tím více decentralizovanou a bezpečnou před útoky se stává.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Pokud máte zájem stát se validátorem a pomoci zabezpečit Ethereum, [přečtěte si více o stakingu](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Příprava na sharding {#setting-up-for-sharding}

Od chvíle, kdy se Beacon chain sloučil s původním Ethereum Mainnetem, začala komunita Etherea hledat způsoby, jak síť škálovat.

Důkaz podílem má tu výhodu, že má v daném okamžiku registr všech schválených producentů bloků, z nichž každý má v sázce (stake) ETH. Tento registr připravuje půdu pro schopnost rozdělit a panovat, ale spolehlivě rozdělit specifické odpovědnosti sítě.

Tato odpovědnost je v kontrastu s důkazem prací, kde těžaři nemají vůči síti žádné závazky a mohli by okamžitě a bez následků trvale přestat těžit a vypnout software svého uzlu. Neexistuje zde také žádný registr známých navrhovatelů bloků a žádný spolehlivý způsob, jak bezpečně rozdělit odpovědnosti sítě.

[Více o shardingu](/roadmap/danksharding/)

## Vztah mezi aktualizacemi {#relationship-between-upgrades}

Všechny aktualizace Etherea spolu do jisté míry souvisejí. Pojďme si tedy shrnout, jak Beacon chain ovlivňuje ostatní aktualizace.

### Beacon chain a Merge {#merge-and-beacon-chain}

Zpočátku existoval Beacon chain odděleně od Ethereum Mainnetu, ale v roce 2022 byly sloučeny.

<ButtonLink href="/roadmap/merge/">
  Merge
</ButtonLink>

### Shardy a Beacon chain {#shards-and-beacon-chain}

Sharding může bezpečně vstoupit do ekosystému Etherea pouze se zavedeným mechanismem konsensu důkazu podílem. Beacon chain zavedl staking, který se „sloučil“ s Mainnetem, čímž připravil půdu pro sharding, který pomůže Ethereum dále škálovat.

<ButtonLink href="/roadmap/danksharding/">
  Shardové řetězce
</ButtonLink>

## Další čtení {#further-reading}

- [Více o architektuře uzlů](/developers/docs/nodes-and-clients/node-architecture)
- [Více o důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos)