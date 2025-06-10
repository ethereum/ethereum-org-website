---
title: Škálování Etherea
description: Rollupy združují transakce mimo blockchain, čímž uživateli snižují náklady za transkaci. Současný způsob, jakým rollupy zpracovávají data, je však příliš drahý, což limituje, nakolik mohou transakce zlevnit. Tento problém řeší Proto-Danksharding.
lang: cs
image: /images/roadmap/roadmap-transactions.png
alt: "Plán Etherea"
template: roadmap
---

Ethereum je škálováno pomocí [druhé vrstvy](/layer-2/#rollups) (řešení též známého pod pojmem „rollupy“), která sdružuje transakce a výstup odesílá do Etherea. Přestože jsou rollupy až osmkrát levnější než hlavní síť Ethereum, je možné je dále optimalizovat a snížit tak náklady pro koncové uživatele. Rollupy spoléhají na některé centralizované komponenty, které mohou vývojáři v budoucnu odstranit.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Transakční náklady
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Dnešní rollupy jsou přibližně <strong>5x až 20x</strong> levnější než 1. vrstva Etherea</li>
    <li>ZK-rollupy brzy sníží poplatky <strong>asi 40x až 100x</strong></li>
    <li>ZK-rollupy brzy sníží poplatky <strong>asi 40x až 100x</strong></li>
    <li style={{ marginBottom: 0 }}>Pro uživatele to bude znamenat, že se cena za provedení transakce ustálí na hodnotě, která odpovídá přibližně <strong>0,001 USD</strong></li>
  </ul>
</AlertContent>
</Alert>

## Zlevnění dat {#making-data-cheaper}

Rollupy sdružují velké množství transakcí, provádějí je a výsledky zasílají do Etherea. Tento postup generuje mnoho dat, která musí být otevřeně dostupná, aby kdokoli mohl provádět transakce a ověřit čestnost operátora rollupu. Pokud někdo zjistí nějakou nesrovnalost, může vznést námitku.

### Proto-Danksharding {#proto-danksharding}

Rollupová data jsou permanentně uložena na Ethereu, což je drahé. Více než 90 % transakčních nákladů, které uživatelé platí za použití rollupů, je využito na uložení dat. Abychom snížili transakční náklady, můžeme data přesunout do nového dočasného úložiště zvaného „blob“. Bloby jsou levnější, protože nejsou permanentní; jakmile nebudou potřeba, budou z Etherea odstraněny. Dlouhodobé ukládání dat rollupů je odpovědností lidí, kteří je potřebují, jako jsou operátoři rollupů, burzy, indexovací služby atd. Přidání blobových transakcí do infrastruktury Etherea je součástí vylepšení známého jako „Proto-Danksharding“.

Pomocí Proto-Dankshardingu je možné do bloků na Ethereu přidávat spoustu blobů. To umožňuje další podstatné zvýšení škálovatelnosti (více než >100x) Etherea a zmenšení transakčních nákladů.

### Danksharding {#danksharding}

Druhá fáze rozšiřování blobových dat je komplikovaná, protože vyžaduje nové metody kontroly dostupnosti souhrnných dat v síti. Také se v otázce oddělení odpovědnosti za vytváření bloků a návrhy [bloků](/glossary/#block) spoléhá na [validátory](/glossary/#validator). To také vyžaduje vývoj řešení kryptografického důkazu, že validátoři skutečně ověřili malé podmnožiny blobových dat.

Tento druhý krok je známý jako [„Danksharding“](/roadmap/danksharding/). Do úplné implementace pravděpodobně **zbývá několik let**. Danksharding spoléhá na další vývoj, jako je [oddělení tvorby bloků a návrhů bloků](/roadmap/pbs) a nové návrhy sítí, které umožňují efektivně potvrdit dostupnost dat náhodným vzorkováním několika kilobajtů najednou, známým jako [vzorkování dostupnosti dat (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Více o Dankshardingu</ButtonLink>

## Decentralizující rollupy {#decentralizing-rollups}

[Rollupy](/layer-2) již v současné době pomáhají škálovat Ethereum. [Rozsáhlý ekosystém rollupových projektů](https://l2beat.com/scaling/tvl) umožňuje uživatelům provádět transakce rychle a levně s řadou bezpečnostních záruk. Rollupy ale byly zavedeny pomocí centralizovaných sekvencerů (to jsou počítače, které provádějí veškeré zpracování a agregaci transakcí před jejich odesláním do Etherea). To je řešení s potenciální cenzurou, protože operátory sekvenceru mohou být sankcionovány, podplaceny nebo jinak kompromitovány. [Rollupy se zároveň liší](https://l2beat.com) ve způsobu, jakým ověřují příchozí data. Nejlepším způsobem je, že „prověřovatelé“ předkládají [důkazy o podvodu](/glossary/#fraud-proof) nebo důkazy o platnosti, ale ne všechny rollupy už toto umí. Dokonce i ty, které používají důkazy o platnosti/podvodu, používají jen malou skupinu známých důkazů. Proto je dalším kritickým krokem při škálování Etherea rozdělení odpovědnosti za provoz sekvencerů a prověřovatelů mezi více entit.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Více o rollupech</ButtonLink>

## Aktuální průběh {#current-progress}

Proto-Danksharding je první z bodů plánu, které budou implementovány v rámci vylepšení sítě Cancun-Deneb („Dencun“) v březnu 2024. **Úplný Danksharding bude pravděpodobně implementován za několik let**. Nejprve je třeba spustit několik dalších bodů plánu vylepšení Etherea. Decentralizace rollupové infrastruktury bude pravděpodobně postupný proces – existuje mnoho různých rollupů, které budují mírně odlišné systémy a budou se plně decentralizovat různým tempem.

[Více o vylepšení sítě s názvem Dencun](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
