---
title: Obnoviteľné financie (ReFi)
description: Prehľad ReFi a aktuálnych prípadov použitia.
lang: sk
template: use-cases
emoji: ":recycle:"
sidebarDepth: 2
image: /images/future_transparent.png
alt: ""
summaryPoint1: Alternatívny ekonomický systém postavený na obnoviteľných princípoch
summaryPoint2: Pokus využiť Ethereum na riešenie koordinačných kríz na globálnej úrovni, ako je zmena klímy
summaryPoint3: Nástroj na významné zvýšenie škálovania ekologických výhod, ako sú overené emisné kvóty
---

## Čo je ReFi? {#what-is-refi}

Pod pojmom **Obnoviteľné financie (ReFi)** rozumieme sadu nástrojov a nápadov na [blockchainoch](/glossary/#blockchain), ktorých cieľom je vytvárať ekonomiky, ktoré sú obnoviteľné, a nie vykorisťovateľské alebo zamerané na ťažbu. Systémy zamerané na vyťaženie surovín časom spotrebujú dostupné zdroje a zrútia sa – bez obnoviteľných mechanizmov im chýba odolnosť. ReFi predpokladá, že vytváranie monetárnej hodnoty je potrebné oddeliť od neudržateľného vyťažovania zdrojov z našej planéty a komunít.

Namiesto toho sa ReFi snaží riešiť environmentálne, komunitné alebo sociálne problémy vytváraním obnoviteľných cyklov. Tieto systémy vytvárajú hodnotu pre účastníkov a súčasne sú prospešné pre ekosystémy a komunity.

Jedným zo základov ReFi je koncept obnoviteľnej ekonómie, ktorého priekopníkom je John Fullerton z Capital Institute. Navrhol [osem vzájomne prepojených princípov](https://capitalinstitute.org/8-principles-regenerative-economy/), ktoré sú základom zdravého ekosystému:

![Osem vzájomne prepojených princípov](refi-regenerative-economy-diagram.png)

Projekty ReFi tieto princípy realizujú pomocou [smart kontraktov](/glossary/#smart-contract) a [aplikácií decentralizovaných financií (DeFi)](/glossary/#defi), ktoré motivujú k obnoviteľnému správaniu, napr. k obnove degradovaných ekosystémov, a uľahčujú rozsiahlu spoluprácu pri riešení globálnych problémov, ako je globálne otepľovanie a strata biodiverzity.

ReFi sa tiež čiastočne prekrýva s hnutím [decentralizovanej vedy (DeSci)](/desci/), ktoré využíva platformu Ethereum na financovanie, vytváranie, recenzovanie, oceňovanie, ukladanie a šírenie vedeckých znalostí. Nástroje DeSci by mohli byť užitočné pre vývoj overiteľných štandardov a postupov pre implementáciu a monitorovanie obnoviteľných aktivít, ako je výsadba stromov, odstraňovanie plastov z oceánu alebo obnova degradovaného ekosystému.

<YouTube id="La52dDzBt2k" />

## Tokenizácia emisných kvót {#tokenization-of-carbon-credits}

**[Dobrovoľný trh s emisnými kvótami (VCM)](https://climatefocus.com/so-what-voluntary-carbon-market-exactly/)** je mechanizmus na financovanie projektov, ktoré majú overiteľný pozitívny vplyv na emisie uhlíka, či už ide o znižovanie prebiehajúcich emisií alebo odstraňovanie skleníkových plynov už vypustených do atmosféry. Tieto projekty po overení dostanú aktívum nazvané „uhlíkové kredity“. Tieto kredity môžu predávať jednotlivcom a organizáciám, ktoré chcú podporiť opatrenia na ochranu klímy.

Okrem VCM existuje aj niekoľko vládou riadených trhov s emisnými kvótami (tzv. „povinné trhy“), ktoré sa snažia stanoviť cenu uhlíka prostredníctvom zákonov alebo nariadení v určitej jurisdikcii (napr. krajiny alebo regiónu), a tým riadi ponuku distribuovaných kvót. Povinné trhy motivujú znečisťovateľov v rámci svojej jurisdikcie k znižovaniu emisií, ale nie sú schopné redukovať skleníkové plyny, ktoré už boli emitované.

Napriek svojmu vývoju v posledných desaťročiach má VCM rad nedostatkov:

1. silne fragmentovaná likvidita,
2. netransparentné mechanizmy transakcií,
3. vysoké poplatky,
4. príliš malá rýchlosť obchodovania,
5. nedostatok škálovateľnosti.

Prechod VCM na nový digitálny **trh s uhlíkovými kreditmi (DCM)** založený na blockchainovej technológii by mohol byť príležitosťou pre modernizáciu existujúcej technológie pre overovanie, prevod a spotrebu emisných kvót. Blockchainové technológie umožňujú verejne overiteľné dáta, prístup pre širokú škálu užívateľov a vyššiu likviditu.

Projekty ReFi využívajú technológiu blockchainu na riešenie množstva problémov tradičného trhu:

- **Likvidita je sústredená v malom počte likvidných poolov**, ktoré môže ktokoľvek voľne obchodovať. Veľké organizácie, rovnako ako jednotliví užívatelia, môžu tieto pooly využívať bez manuálneho vyhľadávania predajcov/kupcov, bez účastníckych poplatkov alebo registrácie.
- **Všetky transakcie sa zaznamenávajú na verejné blockchainy**. Od okamihu, keď je kredit k dispozícii v DCM, je cesta, ktorú každá emisná kvóta absolvuje v dôsledku obchodnej aktivity, navždy sledovateľná.
- **Transakcie sú spracované takmer okamžite**. Obstaranie veľkého množstva emisných kvót prostredníctvom tradičných trhov môže trvať dni alebo týždne, ale na DCM to možno dosiahnuť v priebehu niekoľkých sekúnd.
- **Obchodovanie prebieha bez sprostredkovateľov**, ktorí si účtujú vysoké poplatky. Digitálne emisné kvóty predstavujú významný pokles nákladov v porovnaní s tradičnými kvótami.
- **DCM je škálovateľný** a môže uspokojiť potreby jednotlivcov i nadnárodných spoločností.

### Kľúčové zložky DCM {#key-components-dcm}

Súčasný ekosystém DCM sa skladá zo štyroch hlavných zložiek:

1. Registre, ako je napríklad [Verra](https://verra.org/project/vcs-program/registry-system/) a [Gold Standard](https://www.goldstandard.org/), zaisťujú, že projekty vytvárajúce emisné kvóty sú spoľahlivé. Tiež prevádzkujú databázy, v ktorých digitálne emisné kvóty vznikajú a môžu byť prevádzané alebo spotrebované (zrušené).

Nová vlna inovatívnych projektov budovaných na blockchainoch sa snaží konkurovať tradičným hráčom v tomto odvetví.

2. Emistné mosty, tzv. tokenizéry poskytujú technológiu pre reprezentáciu alebo prenos emisných kvót z tradičných registrov do DCM. Medzi zaujímavé príklady patrí [Toucan Protocol](https://toucan.earth/) [C3](https://c3.app/) a [Moss.Earth](https://moss.earth/).
3. Integrované služby ponúkajú koncovým používateľom kredity za zamedzenie a/alebo odstránenie uhlíkových emisií. Takto môžu získať reputáciu v oblasti životného prostredia a zdieľať so svetom, že podporujú kroky vedúce k zlepšeniu životného prostredia.

Niektoré organizácie, ako sú [Klíma Infinity](https://www.klimadao.finance/infinity) a [Senken](https://senken.io/), ponúkajú širokú škálu projektov vyvinutých tretími stranami a vydávaných podľa zavedených štandardov, ako je Verra – iné, ako je [Nori](https://nori.com/), ponúkajú iba konkrétne projekty vyvinuté v rámci ich vlastného štandardu emisných kvót, ktoré vydávajú a pre ktoré majú vyhradený svoj vlastný trh.

4. Základná infraštruktúra, ktorá uľahčuje zvýšenie vplyvu a účinnosti celého dodávateľského reťazca na trhu s emisnými kvótami. [KlimaDAO](http://klimadao.finance/) dodáva likviditu ako verejný statok (umožňuje komukoľvek nakupovať alebo predávať emisné kvóty za transparentnú cenu), nabáda k zvýšeniu prístupnosti trhov s kvótami a odmenám za ich vyradenie. Tiež poskytuje užívateľsky prívetivé interoperabilné nástroje pre prístup k údajom o širokej škále tokenizovaných emisných kvót, o ich získavaní a vyradení.

## ReFi mimo trhov s emisnými kvótami {#refi-beyond}

Hoci je v súčasnosti kladený silný dôraz na trhy s emisnými kvótami všeobecne a najmä na prechod z VCM na DCM, termín „ReFi“ nie je striktne obmedzený na tento problém. Ďalšie environmentálne aktíva mimo emisných kvót môžu byť vyvinuté a tokenizované, čo znamená, že ďalšie negatívne externality môžu byť tiež zahrnuté do základných vrstiev budúcich ekonomických systémov. Navyše je možné regeneratívny aspekt tohto ekonomického modelu aplikovať aj na iné oblasti, ako je financovanie verejných statkov prostredníctvom platforiem pre kvadratické financovanie, napríklad [Gitcoin](https://gitcoin.co/). Organizácie postavené na myšlienke otvorenej účasti a spravodlivej distribúcie zdrojov umožňujú komukoľvek smerovať peniaze do open-source softvéru projektov, rovnako ako do projektov zameraných na vzdelávanie, životné prostredie a komunity.

Presunom smerovania kapitálu z projektov vyťažujúcich zdroje k obnoviteľne zameraným akciám môžu projekty a spoločnosti, ktoré poskytujú sociálne, environmentálne alebo komunitné výhody – a ktoré by nemuseli získať financovanie v tradičnom finančnom sektore – rýchlejšie a ľahšie získať základné imanie a generovať pozitívne externality pre spoločnosť. Prechod na tento model financovania tiež otvára dvere oveľa inkluzívnejším ekonomickým systémom, v ktorých sa ľudia všetkých demografických skupín môžu stať aktívnymi účastníkmi namiesto iba pasívnych pozorovateľov. ReFi ponúka víziu Etherea ako mechanizmu pre koordináciu akcií súvisiacich s existenčnými výzvami, ktorým čelia naše druhy a všetok život na našej planéte, ako základnú vrstvu novej ekonomickej paradigmy, ktorá umožňuje inkluzívnejšiu a udržateľnú budúcnosť pre nadchádzajúce storočia.

## Ďalšie zdroje informácií o ReFi

- [Základný prehľad emisných mien a ich miesto v ekonomike](https://www.klimadao.finance/blog/the-vision-of-a-carbon-currency)
- [The Ministry for the Future, román popisujúci úlohu meny krytej emisnými kvótami v boji proti zmene klímy](https://en.wikipedia.org/wiki/The_Ministry_for_the_Future)
- [Podrobná správa od Taskforce pre škálovanie dobrovoľných trhov s uhlíkom](https://www.iif.com/Portals/1/Files/TSVCM_Report.pdf)
- [Glosár o ReFi od Kevina Owockiho a Evana Miyazona na CoinMarketCape](https://coinmarketcap.com/alexandria/glossary/regenerative-finance-refi)
