---
title: Pojmenování chytrých kontraktů
description: Osvědčené postupy pro pojmenování chytrých kontraktů na Ethereu pomocí ENS
lang: cs
---

Chytré kontrakty jsou základním kamenem decentralizované infrastruktury Etherea a umožňují fungování autonomních aplikací a protokolů. Ale i když se schopnosti kontraktů vyvíjejí, uživatelé a vývojáři se při jejich identifikaci a odkazování na ně stále spoléhají na surové hexadecimální adresy.

Pojmenování chytrých kontraktů pomocí [Ethereum Name Service (ENS)](https://ens.domains/) zlepšuje uživatelský zážitek tím, že eliminuje hexadecimální adresy kontraktů, a snižuje riziko útoků, jako je otrava adres (address poisoning) a podvržení (spoofing). Tento průvodce vysvětluje, proč na pojmenování chytrých kontraktů záleží, jak jej lze implementovat a jaké nástroje jsou k dispozici, jako například [Enscribe](https://www.enscribe.xyz), které tento proces zjednodušují a pomáhají vývojářům tuto praxi osvojit.

## Proč pojmenovávat chytré kontrakty? {#why-name-contracts}

### Lidsky čitelné identifikátory {#human-readable-identifiers}

Místo interakce s neprůhlednými adresami kontraktů, jako je `0x8f8e...f9e3`, mohou vývojáři a uživatelé používat lidsky čitelná jména, jako je `v2.myapp.eth`. To zjednodušuje interakce s chytrými kontrakty.

To umožňuje [Ethereum Name Service](https://ens.domains/), která poskytuje decentralizovanou službu pojmenování pro adresy na Ethereu. Je to analogické k tomu, jak Domain Name Service (DNS) umožňuje uživatelům internetu přistupovat k síťovým adresám pomocí jména, jako je ethereum.org, místo přes IP adresu, jako je `104.18.176.152`.

### Zlepšená bezpečnost a důvěra {#improved-security-and-trust}

Pojmenované kontrakty pomáhají snížit počet náhodných transakcí na nesprávnou adresu. Pomáhají také uživatelům identifikovat kontrakty spojené s konkrétními aplikacemi nebo značkami. To přidává vrstvu reputační důvěry, zejména když jsou jména připojena ke známým nadřazeným doménám, jako je `uniswap.eth`.

Vzhledem k délce adresy na Ethereu, která činí 42 znaků, je pro uživatele velmi obtížné identifikovat malé změny v adresách, kde bylo upraveno jen několik znaků. Například adresa jako `0x58068646C148E313CB414E85d2Fe89dDc3426870` by byla běžně zkrácena na `0x580...870` aplikacemi určenými pro uživatele, jako jsou peněženky. Je nepravděpodobné, že by si uživatel všiml škodlivé adresy, kde bylo změněno jen pár znaků.

Tento typ techniky se používá při útocích typu podvržení (spoofing) a otravy adres (poisoning), kdy jsou uživatelé vedeni k přesvědčení, že interagují se správnou adresou nebo na ni posílají prostředky, i když ve skutečnosti se adresa té správné pouze podobá, ale není stejná.

Jména ENS pro peněženky a kontrakty chrání před těmito typy útoků. Stejně jako u útoků typu DNS spoofing se mohou vyskytnout i útoky typu ENS spoofing, nicméně je pravděpodobnější, že si uživatel všimne překlepu ve jméně ENS než malé úpravy v hexadecimální adrese.

### Lepší UX pro peněženky a prohlížeče {#better-ux}

Když je chytrý kontrakt nakonfigurován se jménem ENS, je možné, aby aplikace, jako jsou peněženky a blockchainové prohlížeče, zobrazovaly pro chytré kontrakty jména ENS místo hexadecimálních adres. To uživatelům přináší významné zlepšení uživatelského zážitku (UX).

Například při interakci s aplikací, jako je Uniswap, uživatelé obvykle uvidí, že aplikace, se kterou interagují, je hostována na webové stránce `uniswap.org`, ale pokud by Uniswap nepojmenoval své chytré kontrakty pomocí ENS, zobrazila by se jim hexadecimální adresa kontraktu. Pokud je kontrakt pojmenován, mohli by místo toho vidět `v4.contracts.uniswap.eth`, což je mnohem užitečnější.

## Pojmenování při nasazení vs. po nasazení {#when-to-name}

Existují dva okamžiky, kdy lze chytré kontrakty pojmenovat:

- **Při nasazení**: přiřazení jména ENS kontraktu v okamžiku jeho nasazení.
- **Po nasazení**: mapování existující adresy kontraktu na nové jméno ENS.

Oba přístupy spoléhají na to, že máte přístup vlastníka nebo správce k doméně ENS, abyste mohli vytvářet a nastavovat záznamy ENS.

## Jak funguje pojmenování ENS pro kontrakty {#how-ens-naming-works}

Jména ENS jsou uložena onchain a překládají se na adresy na Ethereu prostřednictvím resolverů ENS. Chcete-li pojmenovat chytrý kontrakt:

1. Zaregistrujte nebo ovládejte nadřazenou doménu ENS (např. `myapp.eth`)
2. Vytvořte subdoménu (např. `v1.myapp.eth`)
3. Nastavte záznam `address` subdomény na adresu kontraktu
4. Nastavte reverzní záznam kontraktu v ENS, aby bylo možné jméno najít prostřednictvím jeho adresy

Jména ENS jsou hierarchická a podporují neomezený počet podřízených jmen. Nastavení těchto záznamů obvykle zahrnuje interakci s registrem ENS a veřejnými kontrakty resolverů.

## Nástroje pro pojmenování kontraktů {#tools}

Existují dva přístupy k pojmenování chytrých kontraktů. Buď pomocí [aplikace ENS](https://app.ens.domains) s několika manuálními kroky, nebo pomocí [Enscribe](https://www.enscribe.xyz). Ty jsou nastíněny níže.

### Manuální nastavení ENS {#manual-ens-setup}

Pomocí [aplikace ENS](https://app.ens.domains/) mohou vývojáři manuálně vytvářet podřízená jména a nastavovat dopředné záznamy adres. Nemohou však nastavit primární jméno pro chytrý kontrakt nastavením reverzního záznamu pro jméno prostřednictvím aplikace ENS. Je nutné provést manuální kroky, které jsou popsány v [dokumentaci ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) zjednodušuje pojmenování chytrých kontraktů pomocí ENS a zvyšuje důvěru uživatelů v chytré kontrakty. Poskytuje:

- **Atomické nasazení a pojmenování**: Přiřazení jména ENS při nasazení nového kontraktu
- **Pojmenování po nasazení**: Připojení jmen k již nasazeným kontraktům
- **Podpora více řetězců**: Funguje napříč Ethereem a sítěmi vrstvy 2 (l2), kde je podporováno ENS
- **Data o ověření kontraktu**: Zahrnuje data o ověření kontraktu stažená z více zdrojů pro zvýšení důvěry uživatelů

Enscribe podporuje jména ENS poskytnutá uživateli, nebo své vlastní domény, pokud uživatel nemá jméno ENS.

Můžete přistoupit k [aplikaci Enscribe](https://app.enscribe.xyz) a začít pojmenovávat a prohlížet chytré kontrakty.

## Osvědčené postupy {#best-practices}

- **Používejte jasná, verzovaná jména** jako `v1.myapp.eth`, aby byly upgrady kontraktů transparentní
- **Nastavte reverzní záznamy** pro propojení kontraktů se jmény ENS kvůli viditelnosti v aplikacích, jako jsou peněženky a blockchainové prohlížeče.
- **Pečlivě sledujte expirace**, pokud chcete zabránit náhodným změnám ve vlastnictví
- **Ověřte zdrojový kód kontraktu**, aby uživatelé mohli důvěřovat, že se pojmenovaný kontrakt chová podle očekávání

## Rizika {#risks}

Pojmenování chytrých kontraktů poskytuje uživatelům Etherea významné výhody, nicméně vlastníci domén ENS musí být ohledně jejich správy ostražití. Mezi významná rizika patří:

- **Expirace**: Stejně jako u jmen DNS mají registrace jmen ENS omezenou dobu platnosti. Proto je nezbytné, aby vlastníci sledovali data expirace svých domén a obnovovali je s dostatečným předstihem před jejich vypršením. Aplikace ENS i Enscribe poskytují vlastníkům domén vizuální indikátory, když se blíží expirace.
- **Změna vlastnictví**: Záznamy ENS jsou na Ethereu reprezentovány jako NFT, kde vlastník konkrétní domény `.eth` má příslušné NFT ve svém držení. Pokud by tedy vlastnictví tohoto NFT převzal jiný účet, nový vlastník může upravit jakékoli záznamy ENS podle svého uvážení.

Ke zmírnění takových rizik by měl být účet vlastníka pro domény 2. úrovně (2LD) `.eth` zabezpečen pomocí multi-sig peněženky, přičemž pro správu pojmenování kontraktů by se měly vytvářet subdomény. Tímto způsobem mohou být v případě jakýchkoli náhodných nebo škodlivých změn vlastnictví na úrovni subdomény tyto změny přepsány vlastníkem 2LD.

## Budoucnost pojmenování kontraktů {#future}

Pojmenování kontraktů se stává osvědčeným postupem pro vývoj decentralizovaných aplikací (dapp), podobně jako doménová jména nahradila IP adresy na webu. Jak bude více infrastruktury, jako jsou peněženky, prohlížeče a řídicí panely, integrovat překlad ENS pro kontrakty, pojmenované kontrakty zlepší bezpečnost a sníží chybovost napříč ekosystémem.

Tím, že usnadňuje rozpoznávání a pochopení chytrých kontraktů, pomáhá pojmenování překlenout propast mezi uživateli a aplikacemi na Ethereu, čímž zlepšuje bezpečnost i UX pro uživatele.

## Další čtení {#further-reading}

- [Pojmenování chytrých kontraktů pomocí ENS](https://docs.ens.domains/web/naming-contracts/)
- [Pojmenování chytrých kontraktů pomocí Enscribe](https://www.enscribe.xyz/docs).