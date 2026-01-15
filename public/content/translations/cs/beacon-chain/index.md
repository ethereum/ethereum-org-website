---
title: Beacon chain
description: Přečtěte si o Řetězové vazbě – vylepšení, které umožnilo důkaz podílem na Ethereu.
lang: cs
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: Řetězová vazba zavedla důkaz podílem do ekosystému Etherea.
summaryPoint2: V září 2022 byla sloučena s původním Ethereem založeným na důkazu prací.
summaryPoint3: Řetězová vazba představila logiku konsensu a blokový komunikační protokol, který v současné době zabezpečuje Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Řetězová vazba byla spuštěna 1. prosince 2020 a formalizovala důkaz podílem jako mechanismus konsenzu Etherea s upgradem Sloučení dne 15. září 2022.
</UpgradeStatus>

## Co je Řetězová vazba? {#what-is-the-beacon-chain}

Řetězová vazba je název původního blockchainu založeného na důkazu podílem, který byl spuštěn v roce 2020. Byl vytvořen za účelem zajištění správnosti a udržitelnosti logiky konsensu důkazu podílem před nasazením na hlavní síť Ethereum. Proto běžel souběžně s původním Ethereem založeným na důkazu prací. Řetězová vazba byla řetězec „prázdných“ bloků, ale vypnutí důkazu prací a zapnutí důkazu podílem na Ethereu vyžadovalo instruovat Řetězovou vazbu, aby přijímala transakční data od exekučních klientů, sdružovala je do bloků a poté organizovala do blockchainu pomocí mechanismu konsenzu založeného na důkazu podílem. Ve stejnou chvíli původní klienti Etherea vypnuli těžbu, tvorbu bloků a logiku konsensu a převedli vše na Řetězovou vazbu. Tato událost byla známá jako [Sloučení](/roadmap/merge/). Jakmile došlo ke Sloučení, už neexistovaly dva blockchainy. Místo toho nyní existuje jen jedno Ethereum, které vyžaduje dva různé klienty na síťový uzel. Řetězová vazba je nyní konsensuální vrstva: Peer-to-peer síť konsenzuálních klientů, která zpracovává blokovou komunikaci a konsenzuální logiku, zatímco původní klienti tvoří exekuční vrstvu, která je zodpovědná za komunikaci a exekuci transakcí a správu stavu Etherea. Tyto dvě vrstvy spolu mohou komunikovat pomocí Engine API.

## Co Řetězová vazba dělá? {#what-does-the-beacon-chain-do}

Řetězová vazba je název pro řetězec účtů, který vedla a koordinovala síť [uzamykatelů](/staking/) Etherea předtím, než tito uzamykatelé začali ověřovat skutečné bloky Etherea. Nezpracovává transakce ani interakce s chytrými kontrakty, protože to se děje v exekuční vrstvě. Řetězová vazba je zodpovědná za akce, jako je zpracování bloků a atestací, provozování algoritmu výběru forku a správa odměn a sankcí. Přečtěte si více na naší stránce věnované [architektuře síťových uzlů](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Důsledky spuštění Řetězové vazby {#beacon-chain-features}

### Zavedení uzamčení {#introducing-staking}

Řetězová vazba umožnila v Ethereu [důkaz podílem](/developers/docs/consensus-mechanisms/pos/). To udržuje Ethereum v bezpečí a vydělává validátorům více ETH. V praxi to znamená, že uzamknete ETH, abyste se stali validátorem. Jako uzamykatel spouštíte software, který vytváří a ověřuje nové bloky.

Uzamčení slouží k podobnému účelu, jako dříve sloužila [těžba](/developers/docs/consensus-mechanisms/pow/mining/), ale v mnoha ohledech se liší. Těžba vyžadovala velké výdaje ve formě pořízení výkonného hardwaru a spotřeby energie, což vedlo k úsporám z rozsahu a tím k podpoře centralizace. Těžba nevyžadovala zablokování aktiv jako kolaterálu, což omezovalo schopnost protokolu uvalit sankce na těžaře, kteří útočili na síť.

Přechod na Ethereum založené na důkazu podílem významně zabezpečil a decentralizoval jeho provoz ve srovnání s důkazem prací. Čím více lidí se do sítě zapojí, tím bude decentralizovanější a bezpečnější před útoky.

Použití Důkazu podílem jako mechanismu konsenzu je navíc základním stavebním kamenem [bezpečného, ekologického a škálovatelného Etherea, které máme v současné době](/roadmap/vision/).

<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Pokud se chcete stát validátorem a pomoci zabezpečit Ethereum, [zjistěte více o uzamčení](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Nastavení pro tříštění {#setting-up-for-sharding}

Od té doby, co se Řetězová vazba sloučila s původní hlavní sítí Ethereum, začala komunita Ethereum usilovat o škálování sítě.

Důkaz podílem má tu výhodu, že má neustále registr všech schválených producentů bloků a každý producent bloků má uzamčené ETH. Tento registr nastavuje scénu pro schopnost dobře rozdělit konkrétní síťové zodpovědnosti.

Tato odpovědnost je v kontrastu s důkazem prací, kde těžaři nemají žádné závazky vůči síti a mohli by zastavit těžbu a vypnout software síťových uzlů okamžitě a bez následků. V důkazu prací také neexistuje žádný registr známých navrhovatelů bloků a žádný spolehlivý způsob, jak bezpečně rozdělit síťové odpovědnosti.

[Více o tříštění](/roadmap/danksharding/)

## Vztahy mezi vylepšeními {#relationship-between-upgrades}

Všechna vylepšení Etherea jsou vzájemně provázaná. Pojďme si tedy zrekapitulovat, jak Řetězová vazba ovlivňuje další vylepšení.

### Řetězová vazba a Sloučení {#merge-and-beacon-chain}

Řetězová vazba nejprve existovala odděleně od hlavní sítě Ethereum, ale v roce 2022 byly oba blockchainy sloučeny.

<ButtonLink href="/roadmap/merge/">
  Sloučení
</ButtonLink>

### Tříštění a Řetězová vazba {#shards-and-beacon-chain}

Tříštění může být bezpečně implementováno do ekosystému Ethereum pouze se zavedeným mechanismem konsenzu důkazu podílem. Řetězová vazba představila uzamčení, když se „sloučila“ s hlavní sítí, čímž se otevřela cesta pro tříštění, které pomůže dále škálovat Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Řetězce úlomků
</ButtonLink>

## Další informace

- [Více o budoucích vylepšeních Etherea](/roadmap/vision)
- [Více o architektuře síťových uzlů](/developers/docs/nodes-and-clients/node-architecture)
- [Více o důkazu podílem](/developers/docs/consensus-mechanisms/pos)
