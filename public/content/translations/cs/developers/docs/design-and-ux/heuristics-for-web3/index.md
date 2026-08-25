---
title: "7 heuristik pro návrh rozhraní Web3"
description: "Principy pro zlepšení použitelnosti Web3"
lang: cs
---

Heuristiky použitelnosti jsou obecná osvědčená pravidla, která můžete použít k měření použitelnosti vašeho webu.
Zde uvedených 7 heuristik je speciálně přizpůsobeno pro Web3 a měly by být používány společně s [10 obecnými principy pro návrh interakce](https://www.nngroup.com/articles/ten-usability-heuristics/) od Jakoba Nielsena.

## Sedm heuristik použitelnosti pro Web3 {#seven-usability-heuristics-for-web3}

1. Zpětná vazba následuje po akci
2. Bezpečnost a důvěra
3. Nejdůležitější informace jsou zřejmé
4. Srozumitelná terminologie
5. Akce jsou co nejkratší
6. Síťová připojení jsou viditelná a flexibilní
7. Ovládání z aplikace, nikoli z peněženky


## Definice a příklady {#definitions-and-examples}

### 1. Zpětná vazba následuje po akci {#feedback-follows-action}

**Mělo by být zřejmé, když se něco stalo nebo právě děje.**

Uživatelé se rozhodují o svých dalších krocích na základě výsledku svých předchozích kroků. Proto je nezbytné, aby zůstali informováni o stavu systému. To je obzvláště důležité ve Web3, protože někdy může chvíli trvat, než se transakce zapíší do blockchainu. Pokud neexistuje žádná zpětná vazba, která by je informovala, že mají počkat, uživatelé si nejsou jisti, zda se vůbec něco stalo.

**Tipy:** 
- Informujte uživatele prostřednictvím zpráv, oznámení a dalších upozornění.
- Jasně komunikujte dobu čekání.
- Pokud bude akce trvat déle než několik sekund, uklidněte uživatele časovačem nebo animací, aby měli pocit, že se něco děje.
- Pokud má proces více kroků, zobrazte každý z nich.

**Příklad:**
Zobrazení každého kroku zapojeného do transakce pomáhá uživatelům zjistit, kde se v procesu nacházejí. Vhodné ikony informují uživatele o stavu jejich akcí.

![Informing the user about each step when swapping tokens](./Image1.png)

### 2. Bezpečnost a důvěra jsou nedílnou součástí {#security-and-trust-are-backed-in}

Bezpečnost by měla být prioritou a to by mělo být uživateli zdůrazněno. 
Lidem velmi záleží na jejich datech. Bezpečnost je pro uživatele často hlavním zájmem, proto by měla být zohledněna na všech úrovních návrhu. Vždy byste se měli snažit získat důvěru svých uživatelů, ale způsob, jakým to uděláte, může v různých aplikacích znamenat různé věci. Nemělo by to být něco, na co se myslí až dodatečně, ale mělo by to být vědomě navrhováno od samého začátku. Budujte důvěru napříč celou uživatelskou zkušeností, včetně sociálních kanálů a dokumentace, stejně jako ve finálním uživatelském rozhraní. Věci jako úroveň decentralizace, stav multi-sig pokladny a to, zda je tým veřejně známý (doxxed), to vše ovlivňuje důvěru uživatelů.

**Tipy:**
- Hrdě uvádějte své audity
- Získejte více auditů
- Propagujte jakékoli bezpečnostní funkce, které jste navrhli
- Upozorněte na možná rizika, včetně základních integrací
- Komunikujte složitost strategií
- Zvažte problémy mimo uživatelské rozhraní, které by mohly ovlivnit vnímání bezpečnosti vašimi uživateli

**Příklad:** 
Zahrňte své audity do zápatí ve výrazné velikosti.

![Audits referenced in the website footer](./Image2.png)

### 3. Nejdůležitější informace jsou zřejmé {#the-most-important-info-is-obvious}

U složitých systémů zobrazujte pouze ta nejrelevantnější data. Určete, co je nejdůležitější, a upřednostněte to při zobrazení. 
Příliš mnoho informací je zahlcující a uživatelé se při rozhodování obvykle upínají k jedné informaci. V decentralizovaných financích (DeFi) to pravděpodobně bude APR u výnosových aplikací a LTV u aplikací pro půjčování.

**Tipy:**
- Uživatelský výzkum odhalí nejdůležitější metriku
- Udělejte klíčové informace velké a ostatní detaily malé a nenápadné
- Lidé nečtou, ale skenují očima; zajistěte, aby byl váš design snadno prohlédnutelný

**Příklad:** Velké tokeny v plných barvách se při skenování očima snadno hledají. APR je velké a zvýrazněné doplňkovou barvou.

![The token and APR are easy to find](./Image3.png)

### 4. Jasná terminologie {#clear-terminology}

Terminologie by měla být srozumitelná a vhodná.
Technický žargon může být obrovskou překážkou, protože vyžaduje vytvoření zcela nového mentálního modelu. Uživatelé nedokážou spojit design se slovy, frázemi a koncepty, které již znají. Vše se zdá matoucí a neznámé a existuje strmá křivka učení, než se to vůbec mohou pokusit použít. Uživatelé mohou přistupovat k DeFi s tím, že chtějí ušetřit nějaké peníze, a to, co najdou, je: Těžba, farmaření, staking, emise, úplatky (bribes), trezory (vaults), uzamykače (lockers), veTokeny, postupné uvolňování, epochy, decentralizované algoritmy, likvidita vlastněná protokolem…
Snažte se používat jednoduché termíny, kterým porozumí co nejširší skupina lidí. Nevymýšlejte zcela nové termíny jen pro svůj projekt.

**Tipy:**
- Používejte jednoduchou a konzistentní terminologii
- Co nejvíce využívejte existující jazyk
- Nevymýšlejte si vlastní termíny
- Dodržujte konvence tak, jak se objevují
- Vzdělávejte uživatele, jak jen to je možné

**Příklad:**
„Vaše odměny“ je široce srozumitelný, neutrální termín; nejedná se o nové slovo vymyšlené pro tento projekt. Odměny jsou denominovány v USD, aby odpovídaly mentálním modelům reálného světa, i když samotné odměny jsou v jiném tokenu.

![Token rewards, displayed in U.S. dollars](./Image4.png)

### 5. Akce jsou co nejkratší {#actions-are-as-short-as-possible}

Urychlete interakce uživatele seskupením dílčích akcí. 
To lze provést na úrovni chytrého kontraktu i v uživatelském rozhraní. Uživatel by se neměl muset přesouvat z jedné části systému do druhé – nebo systém zcela opustit – aby dokončil běžnou akci. 

**Tipy:**
- Kde je to možné, zkombinujte „Schválit“ s dalšími akcemi
- Seskupte kroky podepisování co nejblíže k sobě

**Příklad:** Kombinace „přidat likviditu“ a „stake“ je jednoduchým příkladem urychlovače, který uživateli šetří čas i gas.

![Modal showing a switch to combine the deposit and stake actions](./Image5.png)

### 6. Síťová připojení jsou viditelná a flexibilní {#network-connections-are-visible-and-flexible}

Informujte uživatele o tom, k jaké síti je připojen, a poskytněte mu jasné zkratky pro změnu sítě. 
To je obzvláště důležité u multichainových aplikací. Hlavní funkce aplikace by měly být stále viditelné i při odpojení nebo připojení k nepodporované síti.

**Tipy:**
- Zobrazte co největší část aplikace i při odpojení
- Zobrazte, k jaké síti je uživatel aktuálně připojen
- Nenuťte uživatele přejít do peněženky kvůli změně sítě
- Pokud aplikace vyžaduje, aby uživatel přepnul síť, vyvolejte tuto akci z hlavního tlačítka s výzvou k akci (call to action)
- Pokud aplikace obsahuje trhy nebo trezory pro více sítí, jasně uveďte, na kterou sadu se uživatel právě dívá

**Příklad:** Zobrazte uživateli, k jaké síti je připojen, a umožněte mu ji změnit v horní liště aplikace (appbar).

![Dropdown button showing the connected network](./Image6.png)

### 7. Ovládání z aplikace, nikoli z peněženky {#control-from-the-app-not-the-wallet}

Uživatelské rozhraní by mělo uživateli sdělit vše, co potřebuje vědět, a poskytnout mu kontrolu nad vším, co potřebuje udělat. 
Ve Web3 existují akce, které provádíte v uživatelském rozhraní, a akce, které provádíte v peněžence. Obecně platí, že akci zahájíte v uživatelském rozhraní a poté ji potvrdíte v peněžence. Uživatelé se mohou cítit nepříjemně, pokud tyto dvě roviny nejsou pečlivě integrovány.

**Tipy:**
- Komunikujte stav systému prostřednictvím zpětné vazby v uživatelském rozhraní
- Uchovávejte záznamy o jejich historii
- Poskytněte odkazy na průzkumníky bloků pro staré transakce
- Poskytněte zkratky pro změnu sítí. 

**Příklad:** Decentní kontejner ukazuje uživateli, jaké relevantní tokeny má ve své peněžence, a hlavní výzva k akci (CTA) poskytuje zkratku pro změnu sítě.

![Main CTA is prompting the user to switch network](./Image7.png)