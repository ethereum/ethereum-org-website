---
title: "Pojmenování chytrých kontraktů"
description: "Osvědčené postupy pro pojmenování chytrých kontraktů Ethereum pomocí ENS"
lang: cs
---

Chytré kontrakty jsou základním kamenem decentralizované infrastruktury Etherea, umožňující autonomní aplikace a protokoly. Ale i když se schopnosti kontraktů vyvíjejí, uživatelé a vývojáři se stále spoléhají na nezpracované hexadecimální adresy, aby tyto kontrakty identifikovali a odkazovali na ně.

Pojmenování chytrých kontraktů pomocí [Služby Ethereum Name Service (ENS)](https://ens.domains/) zlepšuje uživatelskou zkušenost tím, že odstraňuje hexadecimální adresy kontraktů a snižuje riziko útoků, jako je otrava adresy (address poisoning) a podvržení (spoofing). Tato příručka vysvětluje, proč je pojmenování chytrých kontraktů důležité, jak jej lze implementovat a jaké nástroje jsou k dispozici, jako například [Enscribe](https://www.enscribe.xyz), pro zjednodušení procesu a pomoc vývojářům při osvojení si této praxe.

## Proč pojmenovávat chytré kontrakty? {#why-name-contracts}

### Člověkem čitelné identifikátory {#human-readable-identifiers}

Namísto interakce s nečitelnými adresami kontraktů, jako je `0x8f8e...f9e3`, mohou vývojáři a uživatelé používat lidsky čitelná jména jako `v2.myapp.eth`. To zjednodušuje interakce s chytrými kontrakty.

Umožňuje to [Služba Ethereum Name Service](https://ens.domains/), která poskytuje decentralizovanou službu pro pojmenování ethereových adres. Je to analogické tomu, jak Služba doménových jmen (DNS) umožňuje uživatelům internetu přistupovat k síťovým adresám pomocí jména, jako je ethereum.org, namísto prostřednictvím IP adresy, jako je `104.18.176.152`.

### Zvýšená bezpečnost a důvěra {#improved-security-and-trust}

Pojmenované kontrakty pomáhají omezit neúmyslné transakce na nesprávnou adresu. Také pomáhají uživatelům identifikovat kontrakty spojené s konkrétními aplikacemi nebo značkami. To přidává vrstvu reputační důvěry, zejména když jsou jména připojena k dobře známým nadřazeným doménám, jako je `uniswap.eth`.

Kvůli 42znakové délce ethereové adresy je pro uživatele velmi těžké identifikovat malé změny v adresách, kde bylo upraveno několik znaků. Například adresa jako `0x58068646C148E313CB414E85d2Fe89dDc3426870` by normálně byla zkrácena na `0x580...870` v uživatelských aplikacích, jako jsou peněženky. Uživatel si pravděpodobně nevšimne škodlivé adresy, kde bylo změněno několik znaků.

Tento typ techniky se používá při útocích podvržením (spoofing) a otravou adres (address poisoning), kdy jsou uživatelé vedeni k domněnce, že komunikují se správnou adresou nebo na ni posílají finanční prostředky, přičemž ve skutečnosti adresa správnou adresu pouze připomíná, ale není stejná.

Jména ENS pro peněženky a kontrakty chrání proti těmto typům útoků. Podobně jako u útoků podvržením DNS (DNS spoofing) se mohou objevit i útoky podvržením ENS (ENS spoofing), nicméně uživatel si pravděpodobněji všimne překlepu ve jméně ENS než malé úpravy v hexadecimální adrese.

### Lepší UX pro peněženky a průzkumníky {#better-ux}

Pokud byl chytrý kontrakt nakonfigurován s názvem ENS, je možné, aby aplikace jako peněženky a průzkumníci blockchainu zobrazovaly názvy ENS pro chytré kontrakty, namísto hexadecimálních adres. To přináší uživatelům výrazné zlepšení uživatelské zkušenosti (UX).

Například při interakci s aplikací, jako je Uniswap, uživatelé obvykle uvidí, že aplikace, se kterou pracují, je hostována na webové stránce `uniswap.org`, ale pokud Uniswap nepojmenoval své chytré kontrakty pomocí ENS, zobrazí se jim hexadecimální adresa kontraktu. Pokud je kontrakt pojmenován, mohli by místo toho vidět `v4.contracts.uniswap.eth`, což je mnohem užitečnější.

## Pojmenování při nasazení vs. po nasazení {#when-to-name}

Existují dva body, ve kterých lze pojmenovat chytré kontrakty:

- **V době nasazení**: přiřazení jména ENS kontraktu při jeho nasazování.
- **Po nasazení**: namapování stávající adresy kontraktu na nové jméno ENS.

Oba přístupy se spoléhají na to, že máte vlastnický nebo manažerský přístup k doméně ENS, abyste mohli vytvářet a nastavovat záznamy ENS.

## Jak funguje pojmenování kontraktů pomocí ENS {#how-ens-naming-works}

Jména ENS jsou uložena na blockchainu a převádějí se na ethereové adresy prostřednictvím resolverů ENS. Jak pojmenovat chytrý kontrakt:

1. Zaregistrujte nebo ovládejte nadřazenou doménu ENS (např. `myapp.eth`)
2. Vytvořte subdoménu (např. `v1.myapp.eth`)
3. Nastavte záznam `address` subdomény na adresu kontraktu
4. Nastavte reverzní záznam kontraktu na ENS, aby bylo možné jméno nalézt pomocí jeho adresy

Jména ENS jsou hierarchická a podporují neomezený počet podjmen. Nastavení těchto záznamů obvykle zahrnuje interakci s registrem ENS a veřejnými resolver kontrakty.

## Nástroje pro pojmenování kontraktů {#tools}

Existují dva přístupy k pojmenování chytrých kontraktů. Buď pomocí [aplikace ENS](https://app.ens.domains) s několika manuálními kroky, nebo pomocí [Enscribe](https://www.enscribe.xyz). Ty jsou popsány níže.

### Ruční nastavení ENS {#manual-ens-setup}

Pomocí [aplikace ENS](https://app.ens.domains/) mohou vývojáři ručně vytvářet podjména a nastavovat dopředné záznamy adres. Nemohou však nastavit primární název pro chytrý kontrakt nastavením reverzního záznamu pro název prostřednictvím aplikace ENS. Je třeba provést manuální kroky, které jsou popsány v [dokumentaci ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) zjednodušuje pojmenování chytrých kontraktů pomocí ENS a zvyšuje důvěru uživatelů v chytré kontrakty. Poskytuje:

- **Atomické nasazení a pojmenování**: Přiřaďte jméno ENS při nasazování nového kontraktu
- **Pojmenování po nasazení**: Připojte jména k již nasazeným kontraktům
- **Podpora více řetězců**: Funguje napříč sítěmi Ethereum a L2, kde je podporována služba ENS.
- **Údaje o ověření kontraktu**: Zahrnuje údaje o ověření kontraktu získané z více zdrojů pro zvýšení důvěry uživatelů

Enscribe podporuje jména ENS poskytnutá uživateli, nebo vlastní domény, pokud uživatel nemá jméno ENS.

Můžete přistoupit k [aplikaci Enscribe](https://app.enscribe.xyz) a začít pojmenovávat a prohlížet chytré kontrakty.

## Osvědčené postupy {#best-practices}

- **Používejte jasná, verzovaná jména** jako `v1.myapp.eth`, aby byly aktualizace kontraktů transparentní
- **Nastavte reverzní záznamy** pro propojení kontraktů s názvy ENS pro viditelnost v aplikacích, jako jsou peněženky a průzkumníci blockchainu.
- **Pečlivě sledujte data expirace**, pokud chcete zabránit nechtěným změnám vlastnictví
- **Ověřte zdrojový kód kontraktu**, aby uživatelé mohli věřit, že se pojmenovaný kontrakt chová podle očekávání

## Rizika {#risks}

Pojmenování chytrých kontraktů přináší uživatelům Etherea značné výhody, nicméně vlastníci domén ENS musí být při jejich správě ostražití. Mezi významná rizika patří:

- **Expirace**: Stejně jako názvy DNS mají i registrace názvů ENS konečnou platnost. Je proto životně důležité, aby majitelé sledovali data expirace svých domén a obnovovali je v dostatečném předstihu před jejich vypršením. Jak aplikace ENS, tak Enscribe poskytují majitelům domén vizuální indikátory, když se blíží datum expirace.
- **Změna vlastnictví**: Záznamy ENS jsou na Ethereu reprezentovány jako NFT, kde vlastník konkrétní domény `.eth` drží přidružené NFT. Pokud by tedy vlastnictví tohoto NFT převzal jiný účet, nový vlastník může libovolně upravovat jakékoli záznamy ENS.

Pro zmírnění těchto rizik by měl být vlastnický účet pro domény 2. úrovně `.eth` (2LD) zabezpečen pomocí peněženky s více podpisy, přičemž pro správu pojmenování kontraktů by měly být vytvořeny subdomény. Tímto způsobem, v případě jakýchkoli náhodných nebo škodlivých změn ve vlastnictví na úrovni subdomény, je může vlastník 2LD přepsat.

## Budoucnost pojmenovávání kontraktů {#future}

Pojmenovávání kontraktů se stává osvědčeným postupem pro vývoj dapp, podobně jako doménová jména nahradila IP adresy na webu. S tím, jak více infrastruktury, jako jsou peněženky, průzkumníci a dashboardy, integruje řešení ENS pro kontrakty, pojmenované kontrakty zlepší bezpečnost a sníží počet chyb v celém ekosystému.

Tím, že pojmenování usnadňuje rozpoznávání a chápání chytrých kontraktů, pomáhá překlenout propast mezi uživateli a aplikacemi na Ethereu a zlepšuje bezpečnost i UX pro uživatele.

## Další čtení {#further-reading}

- [Pojmenování chytrých kontraktů pomocí ENS](https://docs.ens.domains/web/naming-contracts/)
- [Pojmenování chytrých kontraktů pomocí Enscribe](https://www.enscribe.xyz/docs).
