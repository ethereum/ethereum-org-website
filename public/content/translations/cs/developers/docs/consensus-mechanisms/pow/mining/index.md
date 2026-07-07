---
title: "Těžba"
description: "Vysvětlení, jak fungovala těžba na Ethereu."
lang: cs
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
Důkaz prací (PoW) již není základem mechanismu konsensu Etherea, což znamená, že těžba byla vypnuta. Místo toho je [Ethereum](/) zabezpečeno validátory, kteří provádějí staking ETH. Se stakingem svých ETH můžete začít ještě dnes. Přečtěte si více o <a href='/roadmap/merge/'>Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>důkazu podílem (PoS)</a> a <a href='/staking/'>stakingu</a>. Tato stránka slouží pouze pro historické účely.
</AlertDescription>
</AlertContent>
</Alert>

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [transakcích](/developers/docs/transactions/), [blocích](/developers/docs/blocks/) a [důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow/).

## Co je těžba na Ethereu? {#what-is-ethereum-mining}

Těžba je proces vytváření bloku transakcí, který má být přidán do blockchainu Etherea v nyní již zastaralé architektuře důkazu prací (PoW).

Slovo těžba pochází z kontextu analogie kryptoměn se zlatem. Zlato nebo drahé kovy jsou vzácné, stejně jako digitální tokeny, a jediný způsob, jak zvýšit celkový objem v systému důkazu prací, je prostřednictvím těžby. V Ethereu s důkazem prací byl jediným způsobem emise proces těžby. Na rozdíl od zlata nebo drahých kovů však těžba na Ethereu byla také způsobem, jak zabezpečit síť vytvářením, ověřováním, publikováním a šířením bloků v blockchainu.

Těžba etheru = Zabezpečení sítě

Těžba je mízou každého blockchainu s důkazem prací. Těžaři Etherea – počítače se spuštěným softwarem – využívali svůj čas a výpočetní výkon ke zpracování transakcí a produkci bloků před přechodem na důkaz podílem (PoS).

## Proč existují těžaři? {#why-do-miners-exist}

V decentralizovaných systémech, jako je Ethereum, musíme zajistit, aby se všichni shodli na pořadí transakcí. Těžaři k tomu přispívali řešením výpočetně náročných hádanek za účelem produkce bloků, čímž zabezpečovali síť před útoky.

[Více o důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow/)

Dříve mohl na síti Ethereum těžit kdokoli pomocí svého počítače. Ne každý však mohl těžit ether (ETH) se ziskem. Ve většině případů si těžaři museli pořídit specializovaný počítačový hardware a mít přístup k levným zdrojům energie. Průměrný počítač by pravděpodobně nezískal dostatek odměn za bloky, aby pokryl související náklady na těžbu.

### Náklady na těžbu {#cost-of-mining}

- Potenciální náklady na hardware nezbytný k sestavení a údržbě těžební sestavy (rigu)
- Náklady na elektřinu pro napájení těžební sestavy
- Pokud jste těžili v poolu, tyto pooly si obvykle účtovaly paušální % poplatek z každého bloku vygenerovaného poolem
- Potenciální náklady na vybavení pro podporu těžební sestavy (ventilace, monitorování energie, elektrické vedení atd.)

Chcete-li dále prozkoumat ziskovost těžby, použijte kalkulačku těžby, jako je ta, kterou poskytuje [Etherscan](https://etherscan.io/ether-mining-calculator).

## Jak se těžily transakce na Ethereu {#how-ethereum-transactions-were-mined}

Následující text poskytuje přehled o tom, jak se těžily transakce v Ethereu s důkazem prací. Analogický popis tohoto procesu pro Ethereum s důkazem podílem naleznete [zde](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Uživatel napíše a podepíše požadavek na [transakci](/developers/docs/transactions/) pomocí soukromého klíče nějakého [účtu](/developers/docs/accounts/).
2. Uživatel odešle požadavek na transakci do celé sítě Ethereum z nějakého [uzlu](/developers/docs/nodes-and-clients/).
3. Jakmile se každý uzel v síti Ethereum dozví o novém požadavku na transakci, přidá jej do svého lokálního mempoolu, což je seznam všech požadavků na transakce, o kterých slyšel a které ještě nebyly zapsány do blockchainu v bloku.
4. V určitém okamžiku těžební uzel agreguje několik desítek nebo stovek požadavků na transakce do potenciálního [bloku](/developers/docs/blocks/) takovým způsobem, který maximalizuje [transakční poplatky](/developers/docs/gas/), jež získá, a zároveň zůstane pod limitem plynu (gas limit) bloku. Těžební uzel poté:
   1. Ověří platnost každého požadavku na transakci (tj. nikdo se nepokouší o převod etheru z účtu, pro který neposkytl podpis, požadavek není poškozený atd.) a poté provede kód požadavku, čímž změní stav své lokální kopie EVM. Těžař si připíše transakční poplatek za každý takový požadavek na transakci na svůj vlastní účet.
   2. Zahájí proces vytváření „certifikátu legitimity“ důkazu prací pro potenciální blok, jakmile jsou všechny požadavky na transakce v bloku ověřeny a provedeny na lokální kopii EVM.
5. Nakonec těžař dokončí vytváření certifikátu pro blok, který obsahuje náš konkrétní požadavek na transakci. Těžař poté odešle dokončený blok, který obsahuje certifikát a kontrolní součet (checksum) deklarovaného nového stavu EVM.
6. Ostatní uzly se dozvědí o novém bloku. Ověří certifikát, samy provedou všechny transakce v bloku (včetně transakce původně odeslané naším uživatelem) a ověří, že kontrolní součet jejich nového stavu EVM po provedení všech transakcí odpovídá kontrolnímu součtu stavu deklarovaného blokem těžaře. Teprve poté tyto uzly připojí tento blok na konec svého blockchainu a přijmou nový stav EVM jako kanonický stav.
7. Každý uzel odstraní všechny transakce v novém bloku ze svého lokálního mempoolu nevyřízených požadavků na transakce.
8. Nové uzly připojující se k síti stahují všechny bloky postupně, včetně bloku obsahujícího naši sledovanou transakci. Inicializují lokální kopii EVM (která začíná jako EVM s prázdným stavem) a poté projdou procesem provádění každé transakce v každém bloku nad svou lokální kopií EVM, přičemž průběžně ověřují kontrolní součty stavu u každého bloku.

Každá transakce je vytěžena (zahrnuta do nového bloku a poprvé šířena) pouze jednou, ale je provedena a ověřena každým účastníkem v procesu posouvání kanonického stavu EVM. To zdůrazňuje jednu z ústředních manter blockchainu: **Nedůvěřuj, prověřuj**.

## Ommer bloky (strýčkovské bloky) {#ommer-blocks}

Těžba bloků na důkazu prací byla pravděpodobnostní, což znamená, že někdy byly kvůli latenci sítě publikovány dva platné bloky současně. V tomto případě musel protokol určit nejdelší (a tedy nejvíce „platný“) řetězec a zároveň zajistit spravedlnost vůči těžařům částečným odměněním navrženého, ale nezahrnutého platného bloku. To podpořilo další decentralizaci sítě, protože menší těžaři, kteří mohli čelit větší latenci, mohli stále generovat výnosy prostřednictvím odměn za [ommer](/glossary/#ommer) bloky.

Termín „ommer“ je preferovaný genderově neutrální termín pro sourozence rodičovského bloku, ale někdy se také označuje jako „strýček“ (uncle). **Od přechodu Etherea na důkaz podílem se ommer bloky již netěží**, protože v každém slotu je zvolen pouze jeden navrhovatel. Tuto změnu můžete vidět při pohledu na [historický graf](https://ycharts.com/indicators/ethereum_uncle_rate) vytěžených ommer bloků.

## Vizuální ukázka {#a-visual-demo}

Podívejte se, jak vás Austin provede těžbou a blockchainem s důkazem prací.

<VideoWatch slug="blockchain-eth-build" />

## Těžební algoritmus {#mining-algorithm}

Ethereum Mainnet používal vždy pouze jeden těžební algoritmus – ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). Ethash byl nástupcem původního R&D algoritmu známého jako ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Více o těžebních algoritmech](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Související témata {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow/)