---
title: "Těžba"
description: "Vysvětlení, jak fungovala těžba na Ethereu."
lang: cs
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Proof-of-work již není základním mechanismem konsensu Etherea, což znamená, že těžení bylo vypnuto. Místo toho je Ethereum zabezpečeno validátory, kteří stakují ETH. Své ETH můžete začít stakeovat hned dnes. Přečtěte si více o <a href='/roadmap/merge/'>Sloučení</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>proof-of-stake</a> a <a href='/staking/'>stakování</a>. Tato stránka má pouze historický význam.
</AlertDescription>
</AlertContent>
</Alert>

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme si nejprve přečíst o [transakcích](/developers/docs/transactions/), [blocích](/developers/docs/blocks/) a [důkazu prací](/developers/docs/consensus-mechanisms/pow/).

## Co je to těžba Etherea? {#what-is-ethereum-mining}

Těžení je proces vytváření bloků transakcí, které byly přidávány do blockchainu Etherea v dříve používané architektuře proof-of-work.

Slovo „těžení“ pochází z analogie se zlatem v kontextu kryptoměn. Zlaté nebo cenné kovy jsou vzácné, stejně jako digitální tokeny, a jediným způsobem, jak zvýšit jejich celkový objem v systému proof-of-work, je těžení. Na proof-of-work Ethereu byl jediný způsob, jak vydávat nové ETH, právě těžba. Na rozdíl od zlata nebo cenných kovů však těžení Etherea také sloužilo k zabezpečení sítě tím, že vytvářelo, ověřovalo, publikovalo a šířilo bloky blockchainu.

Těžení etheru = Zabezpečení sítě

Těžení je krví každého blockchainu založeného na proof-of-work. Těžaři Etherea – počítače, na kterých je spuštěn software – používali před přechodem na proof-of-stake svůj čas a výpočetní výkon ke zpracovávání transakcí a vytváření bloků.

## Proč těžaři existují? {#why-do-miners-exist}

V decentralizovaných systémech, jako je Ethereum, musíme zajistit, aby se všichni shodli na pořadí transakcí. Těžaři tomu napomáhají tím, že řeší výpočetně náročné "hádanky" a vytvářejí tak bloky, které slouží k zabezpečení sítě před útoky.

[Více o důkazu prací](/developers/docs/consensus-mechanisms/pow/)

Dříve měl každý možnost těžit na síti Ethereum pomocí svého počítače. Avšak ne každý mohl těžit ether (ETH) ziskově. V mnoha případech museli těžaři investovat do specializovaného počítačového hardwaru a mít přístup k levným zdrojům energie. Průměrný počítač pravděpodobně nikdy nevydělal dost prostředků na pokrytí nákladů spojených s těžením.

### Náklady na těžbu {#cost-of-mining}

- Potenciální náklady na hardware potřebný k vybudování a údržbě těžebního zařízení
- Náklady napájení těžebního zařízení elektřinou
- Pokud jste těžili v těžebním poolu, účtovaly vám tyto pooly obvykle pevný procentuální poplatek z každého bloku generovaného poolem
- Potenciální náklady na vybavení pro podporu těžebního zařízení (ventilace, monitoring energie, elektrické vedení atd.)

Pro podrobnější prozkoumání ziskovosti těžby použijte kalkulačku těžby, například tu, kterou poskytuje [Etherscan](https://etherscan.io/ether-mining-calculator).

## Jak se těžily transakce na Ethereu {#how-ethereum-transactions-were-mined}

Následující text je přehledem způsobu těžby na proof-of-work Ethereu. Analogický popis tohoto procesu pro Ethereum s důkazem podílem najdete [zde](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Uživatel napíše a podepíše požadavek na [transakci](/developers/docs/transactions/) privátním klíčem nějakého [účtu](/developers/docs/accounts/).
2. Uživatel odešle požadavek na transakci do celé sítě Ethereum z nějakého [uzlu](/developers/docs/nodes-and-clients/).
3. Jakmile se o novém požadavku na transakci dozví, každý uzel v Ethereum síti přidá požadavek do svého lokálního mempoolu, seznamu všech požadavků na transakci, o kterých se dozvěděl a které ještě nebyly odevzdány v bloku do blockchainu.
4. V určitém okamžiku těžební uzel agreguje několik desítek nebo stovek požadavků na transakce do potenciálního [bloku](/developers/docs/blocks/) tak, aby maximalizoval [transakční poplatky](/developers/docs/gas/), které vydělá, a zároveň se udržel pod palivovým limitem bloku. Těžební uzel pak:
   1. Ověří platnost každého požadavku na transakci (tj. nikdo se nepokouší převést ether z účtu, pro který nevytvořil podpis, požadavek není chybný atd.), a poté provede kód požadavku, čímž změní stav své lokální kopie EVM. Těžař obdrží transakční poplatek za každý takový požadavek na svůj vlastní účet.
   2. Zahájí proces vytváření „certifikátu legitimity“ důkazu prací pro potenciální blok, jakmile jsou všechny požadavky na transakce v bloku ověřeny a provedeny na místní kopii EVM.
5. Nakonec těžař dokončí vytvoření certifikátu pro blok, který obsahuje náš konkrétní požadavek na transakci. Těžař pak vyšle dokončený blok, který obsahuje certifikát a kontrolní součet nárokovaného nového stavu EVM.
6. Ostatní uzly se o novém bloku dozvědí. Ověří certifikát, samy provedou všechny transakce na bloku (včetně transakce původně vyslané naším uživatelem) a ověří, zda se kontrolní součet jejich nového stavu EVM po provedení všech transakcí shoduje s kontrolním součtem stavu deklarovaného blokem těžaře. Teprve poté tyto uzly připojí tento blok na konec svého blockchainu a přijmou nový stav EVM jako kanonický stav.
7. Každý uzel odstraní všechny transakce v novém bloku ze svého lokálního mempoolu nesplněných transakčních požadavků.
8. Nové uzly, které se připojují k síti, stahují postupně všechny bloky, včetně bloku obsahujícího naši sledovanou transakci. Inicializují lokální kopii EVM (která začíná prázdném stavu) a poté procházejí procesem provádění všech transakcí v každém bloku nad svou lokální kopií EVM a cestou ověřují kontrolní součty stavu v každém bloku.

Každá transakce je vytěžena (zařazena do nového bloku a poprvé propagována) jednou, ale provedena a ověřena každým účastníkem procesu postupu kanonického stavu EVM. To zdůrazňuje jednu z ústředních manter blockchainu: **Nevěř, ověřuj**.

## Ommer (uncle) bloky {#ommer-blocks}

Těžení bloků v proof-of-work bylo pravděpodobnostní, což znamená, že někdy byly současně publikovány dva platné bloky kvůli latenci sítě. V takovém případě musel protokol určit nejdelší (a tedy nejvíce „platný“) řetězec, přičemž zajistil spravedlnost vůči těžařům tím, že částečně odměnil nezařazený platný blok. To podpořilo další decentralizaci sítě, protože menší těžaři, kteří mohli čelit větší latenci, mohli stále generovat výnosy prostřednictvím odměn za [ommer](/glossary/#ommer) bloky.

Termín „ommer“ je preferovaný genderově neutrální termín pro sourozence rodičovského bloku, ale někdy se také používá termín „strýc“ (uncle). **Od přechodu Etherea na důkaz podílem se ommer bloky již netěží**, protože v každém slotu je zvolen pouze jeden navrhovatel. Tuto změnu můžete vidět na [historickém grafu](https://ycharts.com/indicators/ethereum_uncle_rate) ommer bloků, které byly těženy.

## Vizuální ukázka {#a-visual-demo}

Podívejte se, jak vás Austin provede těžbou a PoS blockchainem.

<YouTube id="zcX7OJ-L8XQ" />

## Algoritmus těžby {#mining-algorithm}

Hlavní síť Ethereum kdy používala pouze jeden algoritmus těžby – ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash byl nástupcem původního R&D algoritmu známého jako ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Více o algoritmech těžby](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Související témata {#related-topics}

- [Palivo](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Důkaz prací](/developers/docs/consensus-mechanisms/pow/)
