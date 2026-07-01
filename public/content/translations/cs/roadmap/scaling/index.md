---
title: "Škálování Etherea"
description: "Rollupy dávkují transakce mimo řetězec (offchain), čímž snižují náklady pro uživatele. Způsob, jakým rollupy v současnosti využívají data, je však příliš drahý, což omezuje, jak levné mohou transakce být. Proto-danksharding to řeší."
lang: cs
image: /images/roadmap/roadmap-transactions.png
alt: "Plán vývoje Etherea"
template: roadmap
---

Ethereum se škáluje pomocí [vrstev 2](/layer-2/#rollups) (známých také jako rollupy), které dávkují transakce dohromady a odesílají výstup do Etherea. Přestože jsou rollupy až osmkrát levnější než Ethereum Mainnet, je možné je dále optimalizovat a snížit tak náklady pro koncové uživatele. Rollupy také spoléhají na některé centralizované komponenty, které mohou vývojáři s tím, jak rollupy dospívají, odstranit.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Transakční náklady
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Dnešní rollupy jsou <strong>\~5-20x</strong> levnější než vrstva 1 (l1) Etherea</li>
    <li>ZK-rollupy brzy sníží poplatky o <strong>\~40-100x</strong></li>
    <li>Nadcházející změny v Ethereu poskytnou dalších <strong>\~100-1000x</strong> škálování</li>
 <li style={{ marginBottom: 0 }}>Uživatelé by měli těžit z transakcí, <strong>které stojí méně než 0,001 $</strong></li>
  </ul>
</AlertContent>
</Alert>

## Zlevnění dat {#making-data-cheaper}

Rollupy shromažďují velké množství transakcí, provádějí je a odesílají výsledky do Etherea. Tím vzniká spousta dat, která musí být veřejně dostupná, aby si kdokoli mohl transakce sám provést a ověřit, že operátor rollupu byl poctivý. Pokud někdo najde nesrovnalost, může vznést námitku.

### Proto-danksharding {#proto-danksharding}

Data rollupů se historicky ukládala na Ethereu trvale, což je drahé. Více než 90 % transakčních nákladů, které uživatelé na rollupech platí, je způsobeno tímto ukládáním dat. Abychom snížili transakční náklady, můžeme data přesunout do nového dočasného úložiště „blobů“. Bloby jsou levnější, protože nejsou trvalé; jakmile již nejsou potřeba, jsou z Etherea smazány. Dlouhodobé ukládání dat rollupů se stává odpovědností těch, kteří je potřebují, jako jsou operátoři rollupů, burzy, indexovací služby atd. Přidání blobových transakcí do Etherea je součástí aktualizace známé jako „proto-danksharding“.

Díky proto-dankshardingu je možné do bloků Etherea přidat mnoho blobů. To umožňuje další podstatné (>100x) zvýšení propustnosti Etherea a snížení transakčních nákladů.

### Danksharding {#danksharding}

Druhá fáze rozšiřování blobových dat je komplikovaná, protože vyžaduje nové metody pro kontrolu dostupnosti dat rollupů v síti a spoléhá na to, že [validátoři](/glossary/#validator) oddělí své povinnosti při tvorbě [bloku](/glossary/#block) a návrhu bloku. Vyžaduje také způsob, jak kryptograficky dokázat, že validátoři ověřili malé podmnožiny blobových dat.

Tento druhý krok je známý jako [„danksharding“](/roadmap/danksharding/). Práce na implementaci pokračují, přičemž se dosahuje pokroku v předpokladech, jako je [oddělení navrhovatele a tvůrce (PBS)](/roadmap/pbs) a nové návrhy sítě, které umožňují síti efektivně potvrdit, že jsou data dostupná, náhodným vzorkováním několika kilobajtů najednou, což je známé jako [vzorkování dostupnosti dat (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Více o dankshardingu</ButtonLink>

## Decentralizace rollupů {#decentralizing-rollups}

[Rollupy](/layer-2) již Ethereum škálují. [Bohatý ekosystém rollupových projektů](https://l2beat.com/scaling/tvs) umožňuje uživatelům provádět transakce rychle a levně s řadou bezpečnostních záruk. Rollupy však byly spuštěny pomocí centralizovaných sekvencerů (počítačů, které provádějí veškeré zpracování a agregaci transakcí před jejich odesláním do Etherea). To je zranitelné vůči cenzuře, protože operátoři sekvencerů mohou být sankcionováni, podplaceni nebo jinak kompromitováni. Zároveň se [rollupy liší](https://l2beat.com/scaling/summary) ve způsobu, jakým ověřují příchozí data. Nejlepším způsobem je, aby „dokazovatelé“ (provers) předkládali [důkazy o podvodu](/glossary/#fraud-proof) nebo důkazy o platnosti, ale ne všechny rollupy už jsou tak daleko. Dokonce i ty rollupy, které používají důkazy o platnosti/podvodu, využívají malou skupinu známých dokazovatelů. Proto je dalším kritickým krokem ve škálování Etherea rozdělení odpovědnosti za provoz sekvencerů a dokazovatelů mezi více lidí.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Více o rollupech</ButtonLink>

## Současný pokrok {#current-progress}

Proto-danksharding byl úspěšně implementován jako součást aktualizace sítě Cancun-Deneb („Dencun“) v březnu 2024. Od jeho implementace začaly rollupy využívat úložiště blobů, což vedlo ke snížení transakčních nákladů pro uživatele a milionům transakcí zpracovaných v blobech.

Práce na plném dankshardingu pokračují, přičemž se dosahuje pokroku v jeho předpokladech, jako je oddělení navrhovatele a tvůrce (PBS) a vzorkování dostupnosti dat (DAS). Decentralizace infrastruktury rollupů je postupný proces – existuje mnoho různých rollupů, které budují mírně odlišné systémy a budou se plně decentralizovat různou rychlostí.

[Více o aktualizaci sítě Dencun a jejím dopadu](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
