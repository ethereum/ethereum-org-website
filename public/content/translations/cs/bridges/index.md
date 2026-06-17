---
title: Blockchainové mosty
metaTitle: Úvod do blockchainových mostů
description: Mosty umožňují uživatelům přesouvat své prostředky mezi různými blockchainy
lang: cs
---

_Web3 se vyvinul v ekosystém blockchainů vrstvy 1 (l1) a řešení škálování vrstvy 2 (l2), z nichž každé je navrženo s jedinečnými schopnostmi a kompromisy. S rostoucím počtem blockchainových protokolů roste i poptávka po přesunu aktiv mezi řetězci. K uspokojení této poptávky potřebujeme mosty._

<Divider />

## Co jsou mosty? {#what-are-bridges}

Blockchainové mosty fungují stejně jako mosty, které známe z fyzického světa. Stejně jako fyzický most spojuje dvě fyzická místa, blockchainový most spojuje dva blockchainové ekosystémy. **Mosty usnadňují komunikaci mezi blockchainy prostřednictvím převodu informací a aktiv**.

Uvažujme příklad:

Jste z USA a plánujete cestu do Evropy. Máte USD, ale k placení potřebujete EUR. K výměně USD za EUR můžete za malý poplatek využít směnárnu.

Co ale uděláte, pokud chcete provést podobnou výměnu, abyste mohli použít jiný [blockchain](/glossary/#blockchain)? Řekněme, že chcete vyměnit [ETH](/glossary/#ether) na [Ethereum](/) Mainnetu za ETH na síti [Arbitrum](https://arbitrum.io/). Stejně jako u směnárny, kterou jsme použili pro EUR, potřebujeme mechanismus pro přesun našeho ETH z Etherea na Arbitrum. Mosty takovou transakci umožňují. V tomto případě [má Arbitrum nativní most](https://portal.arbitrum.io/bridge), který dokáže převést ETH z Mainnetu na Arbitrum.

## Proč potřebujeme mosty? {#why-do-we-need-bridges}

Všechny blockchainy mají svá omezení. Aby Ethereum mohlo škálovat a držet krok s poptávkou, vyžadovalo [rollupy](/glossary/#rollups). Alternativně jsou blockchainy vrstvy 1 (l1) jako Solana a Avalanche navrženy odlišně, aby umožnily vyšší propustnost, ale za cenu nižší decentralizace.

Všechny blockchainy jsou však vyvíjeny v izolovaných prostředích a mají odlišná pravidla a mechanismy [konsensu](/glossary/#consensus). To znamená, že spolu nemohou nativně komunikovat a tokeny se nemohou volně pohybovat mezi blockchainy.

Mosty existují k propojení blockchainů, což umožňuje převod informací a tokenů mezi nimi.

**Mosty umožňují**:

- meziřetězcový převod aktiv a informací.
- [decentralizovaným aplikacím (dapp)](/glossary/#dapp) přístup k silným stránkám různých blockchainů – čímž se rozšiřují jejich možnosti (protože protokoly mají nyní větší prostor pro inovace).
- uživatelům přístup k novým platformám a využití výhod různých řetězců.
- vývojářům z různých blockchainových ekosystémů spolupracovat a budovat nové platformy pro uživatele.

[Jak přemostit tokeny na vrstvu 2 (l2)](/guides/how-to-use-a-bridge/)

<Divider />

## Případy užití mostů {#bridge-use-cases}

Níže jsou uvedeny některé scénáře, kdy můžete využít most:

### Nižší transakční poplatky {#transaction-fees}

Řekněme, že máte ETH na Ethereum Mainnetu, ale chcete levnější transakční poplatky pro prozkoumání různých decentralizovaných aplikací (dapp). Přemostěním vašeho ETH z Mainnetu na Ethereum l2 rollup si můžete užívat nižších transakčních poplatků.

### Dapps na jiných blockchainech {#dapps-other-chains}

Pokud jste používali Aave na Ethereum Mainnetu k poskytování USDT, ale úroková sazba, kterou můžete získat za poskytování USDT pomocí Aave na síti Polygon, je vyšší.

### Prozkoumávání blockchainových ekosystémů {#explore-ecosystems}

Pokud máte ETH na Ethereum Mainnetu a chcete prozkoumat alternativní vrstvu 1 (l1), abyste si vyzkoušeli její nativní dapps. Můžete použít most k převodu vašeho ETH z Ethereum Mainnetu na alternativní l1.

### Vlastnictví nativních krypto aktiv {#own-native}

Řekněme, že chcete vlastnit nativní Bitcoin (BTC), ale máte prostředky pouze na Ethereum Mainnetu. Chcete-li získat expozici vůči BTC na Ethereu, můžete si koupit zabalený Bitcoin (WBTC). WBTC je však [ERC-20](/glossary/#erc-20) token nativní pro síť Ethereum, což znamená, že jde o ethereovou verzi Bitcoinu a ne o původní aktivum na blockchainu Bitcoin. Abyste vlastnili nativní BTC, museli byste svá aktiva přemostit z Etherea na Bitcoin pomocí mostu. Tím se přemostí vaše WBTC a převede se na nativní BTC. Alternativně můžete vlastnit BTC a chtít jej použít v protokolech [decentralizovaných financí (DeFi)](/glossary/#defi) na Ethereu. To by vyžadovalo přemostění opačným směrem, z BTC na WBTC, které pak může být použito jako aktivum na Ethereu.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Vše výše uvedené můžete provést také pomocí [centralizované burzy](/get-eth). Pokud však vaše prostředky již na burze nejsou, zahrnovalo by to více kroků a pravděpodobně by pro vás bylo výhodnější použít most.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Typy mostů {#types-of-bridge}

Mosty mají mnoho typů návrhů a složitostí. Obecně se mosty dělí do dvou kategorií: důvěryhodné mosty a mosty nevyžadující důvěru.

| Důvěryhodné mosty                                                                                                                                         | Mosty nevyžadující důvěru                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Důvěryhodné mosty závisí při svém provozu na centrální entitě nebo systému.                                                                            | Mosty nevyžadující důvěru fungují pomocí chytrých kontraktů a algoritmů.                                        |
| Mají předpoklady důvěry s ohledem na úschovu prostředků a bezpečnost mostu. Uživatelé se většinou spoléhají na pověst provozovatele mostu. | Jsou nevyžadující důvěru, tj. bezpečnost mostu je stejná jako bezpečnost podkladového blockchainu. |
| Uživatelé se musí vzdát kontroly nad svými krypto aktivy.                                                                                                   | Prostřednictvím [chytrých kontraktů](/glossary/#smart-contract) umožňují mosty nevyžadující důvěru uživatelům zachovat si kontrolu nad svými prostředky.           |

Stručně řečeno můžeme říci, že důvěryhodné mosty mají předpoklady důvěry, zatímco mosty nevyžadující důvěru jsou s minimalizovanou důvěrou a nevytvářejí nové předpoklady důvěry nad rámec těch, které mají podkladové domény. Zde je popis těchto pojmů:

- **Nevyžadující důvěru**: mají rovnocennou bezpečnost jako podkladové domény. Jak popsal [Arjun Bhuptani v tomto článku.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Předpoklady důvěry:** odklon od bezpečnosti podkladových domén přidáním externích ověřovatelů do systému, čímž se stává méně kryptoekonomicky bezpečným.

Pro lepší pochopení klíčových rozdílů mezi těmito dvěma přístupy si uveďme příklad:

Představte si, že jste na letištním bezpečnostním kontrolním bodu. Existují dva typy kontrolních bodů:

1. Manuální kontrolní body — obsluhované úředníky, kteří ručně zkontrolují všechny podrobnosti vaší letenky a totožnosti, než vám předají palubní vstupenku.
2. Samoobslužné odbavení — obsluhované strojem, do kterého zadáte údaje o letu a obdržíte palubní vstupenku, pokud je vše v pořádku.

Manuální kontrolní bod je podobný důvěryhodnému modelu, protože při svém provozu závisí na třetí straně, tj. na úřednících. Jako uživatel důvěřujete úředníkům, že učiní správná rozhodnutí a správně použijí vaše soukromé informace.

Samoobslužné odbavení je podobné modelu nevyžadujícímu důvěru, protože odstraňuje roli operátora a pro svůj provoz využívá technologie. Uživatelé mají svá data vždy pod kontrolou a nemusí svěřovat své soukromé informace třetí straně.

Mnoho řešení přemostění přijímá modely mezi těmito dvěma extrémy s různou mírou bezdůvěrnosti.

<Divider />

## Používání mostů {#use-bridge}

Používání mostů vám umožňuje přesouvat vaše aktiva mezi různými blockchainy. Zde jsou některé zdroje, které vám mohou pomoci najít a používat mosty:

- **[Shrnutí mostů na L2BEAT](https://l2beat.com/bridges/summary) a [Analýza rizik mostů na L2BEAT](https://l2beat.com/bridges/summary)**: Komplexní shrnutí různých mostů, včetně podrobností o podílu na trhu, typu mostu a cílových řetězcích. L2BEAT má také analýzu rizik pro mosty, která uživatelům pomáhá činit informovaná rozhodnutí při výběru mostu.
- **[Shrnutí mostů na DefiLlama](https://defillama.com/bridges/Ethereum)**: Shrnutí objemů mostů napříč sítěmi Etherea.

<Divider />

## Rizika používání mostů {#bridge-risk}

Mosty jsou v raných fázích vývoje. Je pravděpodobné, že optimální návrh mostu ještě nebyl objeven. Interakce s jakýmkoli typem mostu s sebou nese riziko:

- **Riziko chytrého kontraktu —** riziko chyby v kódu, která může způsobit ztrátu prostředků uživatele
- **Technologické riziko —** selhání softwaru, chybný kód, lidská chyba, spam a škodlivé útoky mohou narušit operace uživatelů

Navíc, protože důvěryhodné mosty přidávají předpoklady důvěry, nesou s sebou další rizika, jako jsou:

- **Riziko cenzury —** provozovatelé mostu mohou teoreticky zabránit uživatelům v převodu jejich aktiv pomocí mostu
- **Riziko úschovy —** provozovatelé mostu se mohou domluvit na krádeži prostředků uživatelů

Prostředky uživatele jsou ohroženy, pokud:

- je v chytrém kontraktu chyba
- uživatel udělá chybu
- je podkladový blockchain hacknut
- mají provozovatelé mostu v důvěryhodném mostu škodlivé úmysly
- je most hacknut

Jedním z nedávných hacků byl most Wormhole na síti Solana, [kde bylo během hacku ukradeno 120 tisíc wETH (325 milionů USD)](https://rekt.news/wormhole-rekt/). Mnoho z [největších hacků v blockchainech se týkalo mostů](https://rekt.news/leaderboard/).

Mosty jsou klíčové pro onboarding uživatelů na vrstvy 2 (l2) Etherea a dokonce i pro uživatele, kteří chtějí prozkoumat různé ekosystémy. Vzhledem k rizikům spojeným s interakcí s mosty však uživatelé musí rozumět kompromisům, které mosty dělají. Zde jsou některé [strategie pro meziřetězcovou bezpečnost](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Další čtení {#further-reading}
- [EIP-5164: Meziřetězcové provádění](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18. června 2022 - Brendan Asselstine_
- [Rámec rizik L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5. července 2022 - Bartek Kiepuszewski_
- ["Proč bude budoucnost víceřetězcová, ale nebude meziřetězcová."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8. ledna 2022 - Vitalik Buterin_
- [Využití sdílené bezpečnosti pro bezpečnou meziřetězcovou interoperabilitu: Výbory pro stav Lagrange a dále](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12. června 2024 - Emmanuel Awosika_
- [Stav řešení interoperability rollupů](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20. června 2024 - Alex Hook_