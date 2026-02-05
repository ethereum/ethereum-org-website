---
title: Přidávání produktů nebo služeb pro uzamčení
description: Zásady, které používáme při přidávání produktů nebo služeb pro uzamčení na ethereum.org
lang: cs
---

# Přidávání produktů nebo služeb pro uzamčení {#adding-staking-products-or-services}

Chceme se ujistit, že uvádíme nejlepší možné zdroje a zároveň se postaráme o to, aby byli uživatelé v bezpečí a cítili se jistě.

Kdokoli může na stránkách ethereum.org navrhnout přidání produktu nebo služby pro uzamčení. Pokud jsme nějaký vynechali, **[navrhněte ho prosím](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

V současné době uvádíme produkty a služby pro uzamčení na následujících stránkách:

- [Samostatné uzamčení](/staking/solo/)
- [Uzamčení jako služba](/staking/saas/)
- [Pooly pro uzamčení](/staking/pools/)

Proof-of-stake na Beacon Chainu je v provozu od 1. prosince 2020. Ačkoli je uzamčení stále relativně nové, snažili jsme se na ethereum.org vytvořit spravedlivý a transparentní rámec pro posuzování, ale kritéria pro zařazení se budou časem měnit a vyvíjet a jsou v konečném důsledku na uvážení týmu webových stránek ethereum.org.

## Rozhodovací rámec {#the-decision-framework}

Rozhodnutí o uvedení produktu na ethereum.org nezávisí na žádném jediném faktoru. Při rozhodování o uvedení produktu nebo služby se posuzuje více kritérií najednou. Čím více těchto kritérií je splněno, tím je pravděpodobnější, že bude produkt uveden.

**Zaprvé, do jaké kategorie produkt nebo služba spadá?**

- Nástroje pro uzly nebo klienty
- Správa klíčů
- Uzamčení jako služba (SaaS)
- Pool pro uzamčení

V současné době uvádíme pouze produkty nebo služby v těchto kategoriích.

### Kritéria pro zařazení {#criteria-for-inclusion}

Návrhy produktů nebo služeb pro uzamčení budou posuzovány podle následujících kritérií:

**Kdy byl projekt nebo služba spuštěna?**

- Existují důkazy o tom, kdy byl produkt nebo služba zpřístupněna veřejnosti?
- To se používá k určení skóre produktu z hlediska "prověření v praxi".

**Je projekt aktivně udržován?**

- Existuje aktivní tým, který projekt vyvíjí? Kdo je zapojen?
- V úvahu budou brány pouze aktivně udržované produkty.

**Je produkt nebo služba bez důvěryhodných/lidských zprostředkovatelů?**

- Které kroky na cestě uživatele vyžadují důvěru v lidi, ať už při držení klíčů k jejich prostředkům, nebo při správném rozdělování odměn?
- To se používá k určení "trustless" skóre produktu nebo služby.

**Poskytuje projekt přesné a spolehlivé informace?**

- Je zásadní, aby webové stránky produktu obsahovaly aktuální, přesné a nezavádějící informace, zejména pokud se týkají protokolu Ethereum nebo jiných souvisejících technologií.
- Návrhy obsahující dezinformace, zastaralé údaje nebo potenciálně zavádějící prohlášení o Ethereu nebo jiných relevantních tématech nebudou zařazeny, nebo budou odstraněny, pokud již zařazeny jsou.

**Které platformy jsou podporovány?**

- tj. Linux, macOS, Windows, iOS, Android

#### Software a chytré kontrakty {#software-and-smart-contracts}

Pro jakýkoli použitý software na míru nebo chytré kontrakty:

**Je vše open source?**

- Open source projekty by měly mít veřejně dostupné úložiště zdrojového kódu.
- To se používá k určení "open source" skóre produktu.

**Je produkt již po fázi _beta_ vývoje?**

- V jaké fázi svého vývojového cyklu se produkt nachází?
- Produkty ve fázi beta se pro zařazení na ethereum.org nezvažují.

**Prošel software externím bezpečnostním auditem?**

- Pokud ne, plánuje se provedení externího auditu?
- To se používá k určení skóre produktu z hlediska "auditu".

**Má projekt program bug bounty?**

- Pokud ne, plánuje se vytvoření bezpečnostního bug bounty programu?
- To se používá k určení "bug bounty" skóre produktu.

#### Nástroje pro uzly nebo klienty {#node-or-client-tooling}

Pro softwarové produkty související s nastavením, správou nebo migrací uzlů nebo klientů:

**Kteří klienti konsensuální vrstvy (tj. Lighthouse, Teku, Nimbus, Prysm, Grandine) jsou podporováni?**

- Kteří klienti jsou podporováni? Může si uživatel vybrat?
- To se používá k určení skóre produktu "multi-client".

#### Uzamčení jako služba {#staking-as-a-service}

Pro [seznamy uzamčení jako služby](/staking/saas/) (tj. delegovaný provoz uzlů):

**Jaké jsou poplatky spojené s používáním služby?**

- Jaká je struktura poplatků, např. platí se za službu měsíční poplatek?
- Nějaké další požadavky na uzamčení?

**Musí se uživatelé registrovat k účtu?**

- Může někdo službu používat bez povolení nebo KYC?
- To se používá k určení "permissionless" skóre produktu.

**Kdo drží podpisové klíče a klíče pro výběr?**

- K jakým klíčům si uživatel ponechává přístup? K jakým klíčům získá přístup služba?
- To se používá k určení "trustless" skóre produktu.

**Jaká je klientská diverzita provozovaných uzlů?**

- Jaké procento klíčů validátorů je provozováno většinovým klientem konsensuální vrstvy (CL)?
- Při poslední úpravě byl Prysm klientem konsensuální vrstvy, kterého provozovala většina operátorů uzlů, což je pro síť nebezpečné. Pokud jakýkoli klient konsensuální vrstvy v současné době používá více než 33 % sítě, požadujeme údaje týkající se jeho používání.
- To se používá k určení skóre produktu z hlediska "diverzity klientů".

#### Pool pro uzamčení {#staking-pool}

Pro [služby sdruženého uzamčení](/staking/pools/):

**Jaké je minimální množství ETH potřebné k uzamčení?**

- např. 0,01 ETH

**Jaké jsou s tím spojené poplatky nebo požadavky na uzamčení?**

- Jaké procento odměn je odebráno na poplatcích?
- Nějaké další požadavky na uzamčení?

**Existuje token likvidity?**

- O jaké tokeny se jedná? Jak fungují? Jaké jsou adresy kontraktů?
- To se používá k určení skóre produktu z hlediska "tokenu likvidity".

**Mohou se uživatelé účastnit jako operátoři uzlů?**

- Co je potřeba k provozování validátorských klientů s využitím sdružených prostředků?
- Vyžaduje to povolení od jednotlivce, společnosti nebo DAO?
- To se používá k určení skóre produktu z hlediska "permissionless uzlů".

**Jaká je klientská diverzita operátorů uzlů v poolu?**

- Jaké procento operátorů uzlů provozuje většinového klienta konsensuální vrstvy (CL)?
- Při poslední úpravě byl Prysm klientem konsensuální vrstvy, kterého provozovala většina operátorů uzlů, což je pro síť nebezpečné. Pokud jakýkoli klient konsensuální vrstvy v současné době používá více než 33 % sítě, požadujeme údaje týkající se jeho používání.
- To se používá k určení skóre produktu z hlediska "diverzity klientů".

### Další kritéria: užitečné vlastnosti {#other-criteria}

**Jaká uživatelská rozhraní jsou podporována?**

- tj. prohlížečová aplikace, desktopová aplikace, mobilní aplikace, CLI

**Poskytuje software u nástrojů pro uzly snadný způsob přepínání mezi klienty?**

- Může uživatel pomocí nástroje snadno a bezpečně měnit klienty?

**Kolik validátorů v současné době provozuje služba v rámci SaaS?**

- To nám dává představu o dosavadním dosahu vaší služby.

## Jak zobrazujeme výsledky {#product-ordering}

Výše uvedená [kritéria pro zařazení](#criteria-for-inclusion) se používají k výpočtu kumulativního skóre pro každý produkt nebo službu. Používá se jako prostředek pro třídění a prezentaci produktů, které splňují určitá objektivní kritéria. Čím více kritérií je doloženo, tím výše bude produkt zařazen, přičemž v případě shody se pořadí při načtení náhodně zamíchá.

Logika kódu a váhy pro tato kritéria jsou v současné době obsaženy v [této komponentě JavaScriptu](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) v našem repozitáři.

## Přidejte svůj produkt nebo službu {#add-product}

Pokud chcete na ethereum.org přidat produkt nebo službu pro uzamčení, vytvořte problém na GitHubu.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Vytvořit issue
</ButtonLink>
