---
title: "7 heuristik pro návrh rozhraní Web3"
description: "Principy pro zlepšení použitelnosti Web3"
lang: cs
---

Heuristiky použitelnosti jsou obecná „empirická pravidla“, která můžete použít k měření použitelnosti vašich stránek.
Těchto 7 heuristik je speciálně přizpůsobeno pro Web3 a měly by se používat společně s [deseti obecnými principy pro návrh interakce](https://www.nngroup.com/articles/ten-usability-heuristics/) od Jakoba Nielsena.

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

**Mělo by být zřejmé, kdy se něco stalo nebo se děje.**

Uživatelé se rozhodují o svých dalších krocích na základě výsledku svých předchozích kroků. Proto je nezbytné, aby byli stále informováni o stavu systému. To je důležité zejména ve Web3, protože transakcím může někdy chvíli trvat, než se zapíší do blockchainu. Pokud není k dispozici žádná zpětná vazba, která by je informovala, aby počkali, uživatelé si nejsou jisti, zda se něco stalo.

**Tipy:**

- Informujte uživatele prostřednictvím zpráv, oznámení a dalších upozornění.
- Srozumitelně sdělujte čekací doby.
- Pokud bude akce trvat déle než několik sekund, uklidněte uživatele časovačem nebo animací, aby měli pocit, že se něco děje.
- Pokud má proces více kroků, zobrazte každý krok.

**Příklad:**
Zobrazení každého kroku transakce pomáhá uživatelům vědět, kde se v procesu nacházejí. Vhodné ikony informují uživatele o stavu jejich akcí.

![Informování uživatele o každém kroku při směně tokenů](./Image1.png)

### 2. Bezpečnost a důvěra jsou integrovány {#security-and-trust-are-backed-in}

Bezpečnost by měla být prioritou a to by mělo být uživateli zdůrazněno.
Lidem velmi záleží na jejich datech. Bezpečnost je pro uživatele často primárním zájmem, proto by se na ni mělo myslet na všech úrovních návrhu. Vždy byste se měli snažit získat důvěru svých uživatelů, ale způsob, jakým to děláte, se může u různých aplikací lišit. Nemělo by se na to myslet dodatečně, ale mělo by to být vědomě navrženo v celém rozsahu. Budujte důvěru v rámci celé uživatelské zkušenosti, včetně sociálních kanálů a dokumentace, a také konečného uživatelského rozhraní. Věci jako úroveň decentralizace, stav multi-sig pokladnice a to, zda je tým „doxxed“ (veřejně známý), to vše ovlivňuje důvěru uživatelů.

**Tipy:**

- Hrdě uvádějte své audity
- Získejte několik auditů
- Propagujte všechny bezpečnostní funkce, které jste navrhli
- Zvýrazněte možná rizika, včetně souvisejících integrací
- Sdělujte složitost strategií
- Zvažte problémy mimo uživatelské rozhraní, které by mohly ovlivnit vnímání bezpečnosti vašimi uživateli

**Příklad:**
Uveďte své audity v zápatí na viditelném místě.

![Odkazy na audity v zápatí webu](./Image2.png)

### 3. Nejdůležitější informace jsou zřejmé {#the-most-important-info-is-obvious}

U složitých systémů zobrazujte pouze nejrelevantnější data. Určete, co je nejdůležitější, a upřednostněte zobrazení těchto informací.
Příliš mnoho informací je zahlcující a uživatelé se při rozhodování obvykle soustředí na jednu informaci. V DeFi to bude pravděpodobně RPSN u výnosových aplikací a LTV u aplikací pro půjčování.

**Tipy:**

- Uživatelský průzkum odhalí nejdůležitější metriku
- Klíčové informace udělejte velké a ostatní detaily malé a nenápadné
- Lidé nečtou, ale prolétávají text očima; zajistěte, aby byl váš design snadno přehledný

**Příklad:** Velké, plně barevné tokeny lze při rychlém procházení snadno najít. RPSN je velká a zvýrazněná doplňkovou barvou.

![Token a RPSN lze snadno najít](./Image3.png)

### 4. Jasná terminologie {#clear-terminology}

Terminologie by měla být srozumitelná a vhodná.
Technický žargon může být obrovskou překážkou, protože vyžaduje vytvoření zcela nového mentálního modelu. Uživatelé si nedokážou spojit design se slovy, frázemi a koncepty, které již znají. Všechno se zdá matoucí a neznámé a je zde strmá křivka učení, než se vůbec pokusí aplikaci použít. Uživatel může přijít k DeFi s tím, že si chce ušetřit nějaké peníze, a najde: těžbu, farming, stakování, emise, úplatky, trezory, skříňky, veTokeny, vesting, epochy, decentralizované algoritmy, likviditu vlastněnou protokolem…
Snažte se používat jednoduché termíny, kterým porozumí co nejširší skupina lidí. Nevymýšlejte zcela nové termíny jen pro svůj projekt.

**Tipy:**

- Používejte jednoduchou a konzistentní terminologii
- Co nejvíce používejte stávající jazyk
- Nevymýšlejte si vlastní termíny
- Dodržujte konvence tak, jak se objevují
- Co nejvíce vzdělávejte uživatele

**Příklad:**
„Vaše odměny“ je široce srozumitelný, neutrální termín; nikoliv nové slovo vymyšlené pro tento projekt. Odměny jsou denominovány v USD, aby odpovídaly mentálním modelům reálného světa, i když samotné odměny jsou v jiném tokenu.

![Odměny v tokenech, zobrazené v amerických dolarech](./Image4.png)

### 5. Akce jsou co nejkratší {#actions-are-as-short-as-possible}

Zrychlete interakce uživatele seskupením dílčích akcí.
To lze provést na úrovni chytrého kontraktu i na úrovni uživatelského rozhraní. Uživatel by se neměl muset přesouvat z jedné části systému do druhé – nebo systém zcela opouštět – aby dokončil běžnou akci.

**Tipy:**

- Kombinujte „Schválit“ s jinými akcemi, kde je to možné
- Seskupte kroky podepisování co nejblíže k sobě

**Příklad:** Kombinace „přidat likviditu“ a „stakovat“ je jednoduchým příkladem urychlovače, který uživateli šetří čas i palivo.

![Modální okno zobrazující přepínač pro zkombinování akcí vkladu a stakování](./Image5.png)

### 6. Síťová připojení jsou viditelná a flexibilní {#network-connections-are-visible-and-flexible}

Informujte uživatele o tom, ke které síti je připojen, a poskytněte jasné zkratky pro změnu sítě.
To je důležité zejména u multichain aplikací. Hlavní funkce aplikace by měly být stále viditelné, i když je odpojena nebo připojena k nepodporované síti.

**Tipy:**

- Při odpojení zobrazte co nejvíce z aplikace
- Zobrazte, ke které síti je uživatel aktuálně připojen
- Nenuťte uživatele chodit do peněženky, aby změnil síť
- Pokud aplikace vyžaduje, aby uživatel přepnul síť, vyzvěte k akci z hlavní výzvy k akci
- Pokud aplikace obsahuje trhy nebo trezory pro více sítí, jasně uveďte, kterou sadu si uživatel právě prohlíží

**Příklad:** Ukažte uživateli, ke které síti je připojen, a umožněte mu ji změnit v panelu aplikace.

![Rozbalovací tlačítko zobrazující připojenou síť](./Image6.png)

### 7. Ovládání z aplikace, nikoli z peněženky {#control-from-the-app-not-the-wallet}

Uživatelské rozhraní by mělo uživateli sdělit vše, co potřebuje vědět, a dát mu kontrolu nad vším, co potřebuje udělat.
Ve Web3 existují akce, které provádíte v uživatelském rozhraní, a akce, které provádíte v peněžence. Obecně platí, že akci zahájíte v uživatelském rozhraní a poté ji potvrdíte v peněžence. Uživatelé se mohou cítit nepříjemně, pokud tyto dvě části nejsou pečlivě integrovány.

**Tipy:**

- Informujte o stavu systému prostřednictvím zpětné vazby v uživatelském rozhraní
- Veďte záznamy o jejich historii
- Poskytněte odkazy na prohlížeče bloků pro staré transakce
- Poskytněte zkratky pro změnu sítí.

**Příklad:** Nenápadný kontejner ukazuje uživateli, jaké relevantní tokeny má ve své peněžence, a hlavní výzva k akci poskytuje zkratku ke změně sítě.

![Hlavní výzva k akci vyzývá uživatele k přepnutí sítě](./Image7.png)
