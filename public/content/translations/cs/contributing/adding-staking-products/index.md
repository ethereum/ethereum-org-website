---
title: Přidávání stakingových produktů nebo služeb
description: Zásady, které používáme při přidávání stakingových produktů nebo služeb na ethereum.org
lang: cs
---

Chceme se ujistit, že uvádíme ty nejlepší možné zdroje a zároveň udržujeme uživatele v bezpečí a jistotě.

Kdokoli může navrhnout přidání stakingového produktu nebo služby na ethereum.org. Pokud jsme nějaký vynechali, **[prosím, navrhněte jej](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml)!**

V současné době uvádíme stakingové produkty a služby na následujících stránkách:

- [Sólo staking](/staking/solo/)
- [Staking jako služba](/staking/saas/)
- [Stakingové pooly](/staking/pools/)

Důkaz podílem (PoS) na Beacon chainu je v provozu od 1. prosince 2020. Ačkoli je staking stále relativně nový, snažili jsme se vytvořit spravedlivý a transparentní rámec pro zvažování na ethereum.org, ale kritéria pro zařazení se budou v průběhu času měnit a vyvíjet a konečné rozhodnutí je na uvážení týmu webu ethereum.org.

## Rámec pro rozhodování {#the-decision-framework}

Rozhodnutí o zařazení produktu na ethereum.org nezávisí na jediném faktoru. Při rozhodování o zařazení produktu nebo služby se zvažuje více kritérií současně. Čím více těchto kritérií je splněno, tím je pravděpodobnější, že bude zařazen.

**Za prvé, o jakou kategorii produktu nebo služby se jedná?**

- Nástroje pro uzel nebo klienta
- Správa klíčů
- Staking jako služba (SaaS)
- Stakingový pool

V současné době uvádíme pouze produkty nebo služby v těchto kategoriích.

### Kritéria pro zařazení {#criteria-for-inclusion}

Návrhy stakingových produktů nebo služeb budou posuzovány podle následujících kritérií:

**Kdy byl projekt nebo služba spuštěna?**

- Existují důkazy o tom, kdy se produkt nebo služba stala dostupnou veřejnosti?
- To se používá k určení skóre „prověření v praxi“ (battle tested) produktu.

**Je projekt aktivně udržován?**

- Vyvíjí projekt aktivní tým? Kdo je do něj zapojen?
- Budou zvažovány pouze aktivně udržované produkty.

**Je produkt nebo služba bez důvěryhodných/lidských zprostředkovatelů?**

- Jaké kroky na cestě uživatele vyžadují důvěru v lidi, že buď drží klíče k jejich prostředkům, nebo že správně rozdělují odměny?
- To se používá k určení skóre „nevyžadující důvěru“ (trustless) produktu nebo služby.

**Poskytuje projekt přesné a spolehlivé informace?**

- Je zásadní, aby webové stránky produktu obsahovaly aktuální, přesné a nezavádějící informace, zejména pokud se týkají protokolu Ethereum nebo jiných souvisejících technologií.
- Návrhy obsahující dezinformace, zastaralé podrobnosti nebo potenciálně zavádějící prohlášení o Ethereu nebo jiných relevantních tématech nebudou zařazeny, nebo budou odstraněny, pokud již zařazeny jsou.

**Jaké platformy jsou podporovány?**

- tj. Linux, macOS, Windows, iOS, Android

#### Software a chytré kontrakty {#software-and-smart-contracts}

Pro jakýkoli zapojený vlastní software nebo chytré kontrakty:

**Je vše open source?**

- Open source projekty by měly mít veřejně dostupný repozitář zdrojového kódu.
- To se používá k určení skóre „open source“ produktu.

**Je produkt mimo fázi _beta_ vývoje?**

- V jaké fázi vývojového cyklu se produkt nachází?
- Produkty ve fázi beta nejsou zvažovány pro zařazení na ethereum.org.

**Prošel software externím bezpečnostním auditem?**

- Pokud ne, plánuje se provedení externího auditu?
- To se používá k určení skóre „auditováno“ produktu.

**Má projekt program odměn za nalezení chyb (bug bounty)?**

- Pokud ne, plánuje se vytvoření bezpečnostního bug bounty programu?
- To se používá k určení skóre „bug bounty“ produktu.

#### Nástroje pro uzel nebo klienta {#node-or-client-tooling}

Pro softwarové produkty související s nastavením, správou nebo migrací uzlu nebo klienta:

**Kteří klienti vrstvy konsensu (tj. Lighthouse, Teku, Nimbus, Prysm, Grandine) jsou podporováni?**

- Kteří klienti jsou podporováni? Může si uživatel vybrat?
- To se používá k určení skóre „více klientů“ (multi-client) produktu.

#### Staking jako služba {#staking-as-a-service}

Pro [seznamy stakingu jako služby](/staking/saas/) (tj. delegovaný provoz uzlu):

**Jaké jsou poplatky spojené s používáním služby?**

- Jaká je struktura poplatků, např. existuje měsíční poplatek za službu?
- Existují nějaké další požadavky na staking?

**Je od uživatelů vyžadováno, aby si zaregistrovali účet?**

- Může někdo používat službu bez povolení nebo KYC?
- To se používá k určení skóre „nevyžadující povolení“ (permissionless) produktu.

**Kdo drží podepisovací klíče a klíče pro výběr?**

- Ke kterým klíčům si uživatel zachovává přístup? Ke kterým klíčům získává přístup služba?
- To se používá k určení skóre „nevyžadující důvěru“ (trustless) produktu.

**Jaká je klientská diverzita provozovaných uzlů?**

- Jaké procento klíčů validátorů je provozováno většinovým klientem vrstvy konsensu (CL)?
- K datu poslední úpravy je Prysm klientem vrstvy konsensu, kterého provozuje většina provozovatelů uzlů, což je pro síť nebezpečné. Pokud je jakýkoli CL klient v současné době používán více než 33 % sítě, požadujeme údaje týkající se jeho používání.
- To se používá k určení skóre „diverzita klientů“ produktu.

#### Stakingový pool {#staking-pool}

Pro [služby společného stakingu](/staking/pools/):

**Jaké je minimální množství ETH potřebné pro staking?**

- např. 0,01 ETH

**Jaké jsou s tím spojené poplatky nebo požadavky na staking?**

- Jaké procento odměn je odečteno jako poplatky?
- Existují nějaké další požadavky na staking?

**Existuje token likvidity?**

- O jaké tokeny se jedná? Jak fungují? Jaké jsou adresy kontraktů?
- To se používá k určení skóre „token likvidity“ produktu.

**Mohou se uživatelé účastnit jako provozovatelé uzlu?**

- Co je potřeba k provozování klientů validátoru pomocí společných prostředků?
- Vyžaduje to povolení od jednotlivce, společnosti nebo DAO?
- To se používá k určení skóre „uzly nevyžadující povolení“ (permissionless nodes) produktu.

**Jaká je klientská diverzita provozovatelů uzlů poolu?**

- Jaké procento provozovatelů uzlů provozuje většinového klienta vrstvy konsensu (CL)?
- K datu poslední úpravy je Prysm klientem vrstvy konsensu, kterého provozuje většina provozovatelů uzlů, což je pro síť nebezpečné. Pokud je jakýkoli CL klient v současné době používán více než 33 % sítě, požadujeme údaje týkající se jeho používání.
- To se používá k určení skóre „diverzita klientů“ produktu.

### Další kritéria: co je dobré mít {#other-criteria}

**Jaká uživatelská rozhraní jsou podporována?**

- tj. aplikace v prohlížeči, desktopová aplikace, mobilní aplikace, CLI

**Poskytuje software u nástrojů pro uzly snadný způsob přepínání mezi klienty?**

- Může uživatel pomocí nástroje snadno a bezpečně změnit klienty?

**Kolik validátorů je v současné době provozováno službou v případě SaaS?**

- To nám dává představu o dosavadním dosahu vaší služby.

## Jak zobrazujeme výsledky {#product-ordering}

Výše uvedená [kritéria pro zařazení](#criteria-for-inclusion) se používají k výpočtu kumulativního skóre pro každý produkt nebo službu. To slouží jako prostředek k třídění a prezentaci produktů, které splňují určitá objektivní kritéria. Čím více kritérií je doloženo, tím výše bude produkt zařazen, přičemž při shodě se pořadí při načtení náhodně promíchá.

Logika kódu a váhy pro tato kritéria jsou v současné době obsaženy v [této JavaScriptové komponentě](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) v našem repozitáři.

## Přidejte svůj produkt nebo službu {#add-product}

Pokud chcete přidat stakingový produkt nebo službu na ethereum.org, vytvořte issue na GitHubu.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Vytvořit issue
</ButtonLink>