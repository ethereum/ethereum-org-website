---
title: Úvod do blockchainových mostov
description: Mosty umožňujú používateľom presúvať svoje prostriedky cez rôzne blockchainy
lang: sk
---

# Mosty blockchainu {#prerequisites}

_Web3 sa vyvinul do ekosystému L1 blockchainov a L2 škálovacích riešení, z ktorých každý je navrhnutý s jedinečnými schopnosťami a kompromismi. S rastúcim počtom blockchainových protokolov rastie aj dopyt po presune aktív naprieč blockchainami. Na splnenie tejto požiadavky potrebujeme mosty._

<Divider />

## Čo sú mosty? {#what-are-bridges}

Blockchainové mosty fungujú rovnako ako mosty, ktoré poznáme vo fyzickom svete. Tak ako fyzický most spája dve fyzické miesta, blockchainový most spája dva blockchainové ekosystémy. **Mosty uľahčujú komunikáciu medzi blockchainami prostredníctvom prenosu informácií a aktív**.

Uveďme si príklad:

Ste z USA a plánujete cestu do Európy. Máte USD, ale na míňanie potrebujete EUR. Na výmenu USD za EUR môžete využiť zmenáreň za malý poplatok.

Čo však urobíte, ak chcete uskutočniť podobnú výmenu a použiť iný [blockchain](/glossary/#blockchain)? Povedzme, že chcete vymeniť [ETH](/glossary/#ether) na Ethereum Mainnet blockchaine za ETH na [Arbitrum](https://arbitrum.io/) blockchaine. Rovnako ako výmena meny, ktorú sme urobili za EUR, potrebujeme mechanizmus na presun nášho ETH z Etherea do Arbitrum. Mosty umožňujú takúto transakciu. V tomto prípade [Arbitrum má natívny most](https://bridge.arbitrum.io/), ktorý dokáže preniesť ETH z Mainnetu do Arbitrum.

## Prečo potrebujeme mosty? {#why-do-we-need-bridges}

Všetky blockchainy majú svoje obmedzenia. Aby sa Ethereum škálovalo a udržalo krok s dopytom, vyžadovalo si [rollupy](/glossary/#rollups). Alternatívne L1 blockchainy, ako Solana a Avalanche sú navrhnuté tak, aby umožnili vyššiu priepustnosť, ale za cenu decentralizácie.

Všetky blockchainy sa však vyvíjajú v izolovaných prostrediach a majú odlišné pravidlá a mechanizmy [konsenzu](/glossary/#consensus). To znamená, že nemôžu natívne komunikovať a tokeny sa nemôžu voľne pohybovať medzi blockchainami.

Na prepojenie blockchainov existujú mosty, ktoré umožňujú prenos informácií a tokenov medzi nimi.

**Mostly umožňujú**:

- Prevod aktív a informácií medzi blockchainami.
- [Dapps](/glossary/#dapp) na prístup k silným stránkam rôznych blockchainov – čím sa rozšíria ich schopnosti (keďže protokoly majú teraz väčší priestor pre inovácie).
- Prístup používateľom k novým platformám a využívaniu výhod rôznych blockchainov.
- Vývojárom z rôznych blockchainových ekosystémov, aby spolupracovali a vytvorili nové platformy pre používateľov.

[Ako preniesť tokeny do siete druhej úrovne](/guides/how-to-use-a-bridge/)

<Divider />

## Prípady použitia mosta {#bridge-use-cases}

Nasleduje niekoľko scenárov, v ktorých môžete použiť most:

### Nižšie transakčné poplatky {#transaction-fees}

Povedzme, že máte ETH na Ethereum Mainnet, ale chcete lacnejšie transakčné poplatky na preskúmanie rôznych dapps. Premostením vášho ETH z Mainnetu na Ethereum L2 rollup si môžete užiť nižšie transakčné poplatky.

### Dapps na iných blockchainoch {#dapps-other-chains}

Ak ste na požičiavanie USDT používali Aave na Ethereum Mainnet, ale úroková sadzba za požičiavanie USDT pomocou Aave na Polygone je vyššia.

### Preskúmajte blockchainové ekosystémy {#explore-ecosystems}

Ak máte ETH na Ethereum Mainnet a chcete preskúmať alternatívne L1 blockchainy, aby ste vyskúšali ich natívne dapps. Môžete použiť most na prenos vášho ETH z Ethereum Mainnet do alternatívneho L1 blockchainu.

### Vlastnite natívne krypto aktíva {#own-native}

Povedzme, že chcete vlastniť natívny bitcoin (BTC), ale máte prostriedky iba na Ethereum Mainnet. Aby ste získali BTC zastupený na Ethereu, môžete si kúpiť Wrapped Bitcoin (WBTC). WBTC je však token [ERC-20](/glossary/#erc-20), ktorý je natívny v sieti Ethereum, čo znamená, že ide o Ethereum verziu Bitcoinu a nie o pôvodné aktívum na Bitcoin blockchaine. Aby ste mohli vlastniť natívny BTC, museli by ste premostiť svoje aktíva z Etherea do Bitcoinu pomocou mosta. To premostí vaše WBTC a prevedie ich na natívny BTC. Prípadne môžete vlastniť BTC a používať ho v Ethereum [DeFi](/glossary/#defi) protokoloch. To by si vyžadovalo premostenie iným spôsobom, z BTC na WBTC, ktoré potom možno použiť ako aktívum v Ethereu.

<InfoBanner shouldCenter emoji=":bulb:">
  Všetky vyššie uvedené činnosti môžete vykonať aj pomocou <a href="/get-eth/">centralizovanej výmeny</a>. Zahŕňalo by to viacero krokov a pravdepodobne by bolo lepšie použiť most, ak však vaše prostriedky už nemáte na centralizovanej burze.
</InfoBanner>

<Divider />

## Typy mostov {#types-of-bridge}

Mosty majú mnoho typov dizajnu a zložitostí. Mosty vo všeobecnosti spadajú do dvoch kategórií: dôveryhodné a nedôveryhodné mosty.

| Dôveryhodné mosty                                                                                                                                                   | Nedôveryhodné mosty                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dôveryhodné mosty závisia pri svojej činnosti od centrálnej entity alebo systému.                                                                                   | Mosty bez potreby dôvery fungujú pomocou smart kontraktov a algoritmov.                                                                                      |
| Majú dôveryhodné predpoklady, pokiaľ ide o úschovu finančných prostriedkov a bezpečnosť mosta. Používatelia sa väčšinou spoliehajú na povesť prevádzkovateľa mosta. | Sú bez potreby dôvery, t.j. bezpečnosť mosta je rovnaká ako bezpečnosť základného blockchainu.                                                               |
| Používatelia sa musia vzdať kontroly nad svojimi kryptografickými aktívami.                                                                                         | Prostredníctvom [smart kontraktov](/glossary/#smart-contract) umožňujú mosty bez potreby dôvery používateľom si zachovať kontrolu nad svojimi prostriedkami. |

Stručne povedané, môžeme povedať, že dôveryhodné mosty majú predpoklady dôvery, zatiaľ čo mosty bez potreby dôvery minimalizovujú dôveru a nevytvárajú nové predpoklady dôvery nad rámec predpokladov základných domén. Tieto výrazy možno opísať takto:

- **Dôveryhodný**: má rovnaké zabezpečenie ako základné domény. Ako to opísal [Arjun Bhuptani v tomto článku.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Predpoklady dôvery:** odklon od bezpečnosti základných domén pridaním externých overovateľov do systému, čím sa zníži krypto-ekonomická bezpečnosť.

Aby sme lepšie pochopili kľúčové rozdiely medzi týmito dvoma prístupmi, uveďme si príklad:

Predstavte si, že ste na bezpečnostnej kontrole na letisku. Existujú tam dva typy kontrolných bodov:

1. Manuálne kontrolné stanovištia – prevádzkujú ich úradníci, ktorí pred odovzdaním palubného lístka manuálne skontrolujú všetky podrobnosti o vašej letenke a vašej totožnosti.
2. Samoobslužné odbavenie – prevádzkuje ho automat, do ktorého zadáte údaje o lete a ak je všetko v poriadku, dostanete palubný lístok.

Manuálne kontrolné stanovište je podobný dôveryhodnému modelu, pretože jeho operácie závisia od tretej strany, t. j. úradníkov. Ako používateľ dôverujete úradníkom, že robia správne rozhodnutia a správne používajú vaše súkromné ​​informácie.

Samoobslužné odbavenie je podobné modelu bez potreby dôvery, pretože odstraňuje úlohu operátora a využíva technológiu na svoje operácie. Používatelia majú svoje údaje vždy pod kontrolou a nemusia dôverovať tretej strane so svojimi súkromnými ​​informáciami.

Mnohé premosťovacie riešenia využívajú modely medzi týmito dvoma extrémami s rôznym stupňom nedôvery.

<Divider />

## Riziko používania mostov {#bridge-risk}

Mosty sú v počiatočnom štádiu vývoja. Je pravdepodobné, že optimálný návrh mosta ešte nebol objavený. Interakcia s akýmkoľvek typom mosta prináša riziko:

- **riziko smart kontraktu –** riziko chyby v kóde, ktorá môže spôsobiť stratu prostriedkov používateľa,
- **technologické riziko –** zlyhanie softvéru, chybný kód, ľudská chyba, spam a škodlivé útoky môžu narušiť operácie používateľov.

Navyše, keďže dôveryhodné mosty pridávajú predpoklady dôvery, nesú so sebou ďalšie riziká, napríklad:

- **riziko cenzúry –** operátori mostov môžu teoreticky zabrániť používateľom v prevode ich majetku pomocou mosta,
- **rziko úschovy –** operátori mostov sa môžu dohodnúť s cieľom ukradnúť prostriedky používateľov.

Finančné prostriedky používateľa sú ohrozené ak:

- je chyba v smart kontrakte,
- používateľ urobí chybu,
- blockchain je hacknutý,
- operátori mosta majú v dôveryhodnom moste zlý úmysel,
- most je hacknutý.

Solana's Wormhole most bol jedným z nedávnych hackov, [kde bolo počas hacku ukradnutých 120 000 wETH (325 miliónov USD)](https://rekt.news/wormhole-rekt/). Mnohé z [najväčších hackov v blockchainoch zahŕňali mosty](https://rekt.news/leaderboard/).

Mosty sú rozhodujúce pre integráciu používateľov do Ethereum vrstvy L2 a dokonca aj pre používateľov, ktorí chcú preskúmať rôzne ekosystémy. Avšak vzhľadom na riziká spojené s interakciou s mostami musia používatelia pochopiť kompromisy, ktoré robia mosty. Toto sú niektoré [stratégie zabezpečenia transakcií medzi blockchainami](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Ďalšie zdroje informácií {#further-reading}

- [EIP-5164: medziblokové vykonanie](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18. jún 2022 – Brendan Asselstine_
- [Riziko premostenia 2. vrstvy](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5. júl, 2022 – Bartek Kiepuszewski_
- [„Prečo bude budúcnosť multiblockchainová, ale nie medziblockchainová.“](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8. január, 2022 – Vitalik Buterin_
