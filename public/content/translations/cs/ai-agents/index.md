---
title: AI agenti
metaTitle: AI agenti | AI agenti na Ethereu
description: "Přehled AI agentů na Ethereu"
lang: cs
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: "Lidé shromáždění u stolu s terminálem"
summaryPoints:
  - "AI, která interaguje s blockchainem a samostatně obchoduje"
  - "Ovládá peněženky a prostředky na blockchainu"
  - "Najímá lidi nebo jiné agenty na práci"
buttons:
  - content: Co jsou AI agenti?
    toId: what-are-ai-agents
  - content: Prozkoumat agenty
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Představte si, že se pohybujete po Ethereu s AI asistentem, který 24/7 studuje tržní trendy na blockchainu, odpovídá na otázky a dokonce vaším jménem provádí transakce. Vítejte ve světě AI agentů – inteligentních systémů navržených tak, aby vám zjednodušily digitální život.

Na Ethereu jsme svědky inovací v oblasti AI agentů, od virtuálních influencerů a autonomních tvůrců obsahu až po platformy pro analýzu trhu v reálném čase, které posilují postavení uživatelů tím, že jim poskytují přehledy, zábavu a provozní efektivitu.

## Co jsou AI agenti? {#what-are-ai-agents}

AI agenti jsou softwarové programy, které využívají umělou inteligenci k plnění úkolů nebo k vlastním rozhodnutím. Učí se z dat, přizpůsobují se změnám a zvládají složité úkoly. Pracují nepřetržitě a dokážou okamžitě odhalit příležitosti.

### Jak AI agenti pracují s blockchainy {#how-ai-agents-work-with-blockchains}

V tradičních financích AI agenti často fungují v centralizovaných prostředích s omezenými datovými vstupy. To omezuje jejich schopnost učit se nebo autonomně spravovat aktiva.

Naproti tomu decentralizovaný ekosystém Etherea nabízí několik klíčových výhod:

- <strong>Transparentní data:</strong> Přístup k informacím z blockchainu v reálném čase.
- <strong>Skutečné vlastnictví aktiv:</strong> Digitální aktiva jsou plně ve vlastnictví AI agentů.
- <strong>Robustní funkčnost na blockchainu:</strong> Umožňuje AI agentům provádět transakce, interagovat s chytrými kontrakty, poskytovat likviditu a spolupracovat napříč protokoly.

Tyto faktory přeměňují AI agenty z jednoduchých botů na dynamické, sebezdokonalující se systémy, které nabízejí významnou hodnotu v mnoha odvětvích:

<CardGrid>
  <Card title="Automatizované DeFi" emoji=":money_with_wings:" description="AI agenti pozorně sledují trendy na trhu, provádějí obchody a spravují portfolia – a tím zpřístupňují složitý svět DeFi."/>
  <Card title="Nová ekonomika AI agentů" emoji="🌎" description="AI agenti si mohou najímat jiné agenty (nebo lidi) s různými dovednostmi, aby pro ně plnili specializované úkoly." />
  <Card title="Řízení rizik" emoji="🛠️" description="Sledováním transakčních aktivit mohou AI agenti pomoci odhalit podvody a ochránit vaše digitální aktiva lépe a rychleji." />
</CardGrid>

## Ověřitelná AI {#verifiable-ai}

AI agenti běžící mimo blockchain se často chovají jako \"černé skříňky\" – jejich uvažování, vstupy a výstupy nelze nezávisle ověřit. Ethereum to mění. Ukotvením chování agentů na blockchainu mohou vývojáři vytvářet agenty, kteří jsou _na důvěře nezávislí_, _transparentní_ a _ekonomicky autonomní_. Akce takových agentů lze auditovat, omezovat a prokazovat.

### Ověřitelná inference {#verifiable-inference}

Inference AI se tradičně odehrává mimo blockchain, kde je provádění levné, ale provádění modelu je neprůhledné. Na Ethereu mohou vývojáři párovat agenty s ověřitelným výpočtem pomocí několika technik:

- [**zkML (strojové učení s nulovou znalostí)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) umožňuje agentům prokázat, že model byl proveden správně, aniž by odhalili model nebo vstupy
- [**Atestace TEE (důvěryhodné spouštěcí prostředí)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) umožňují hardwarově podložené důkazy o tom, že agent spustil konkrétní model nebo cestu kódu
- **Neměnnost na blockchainu** zajišťuje, že na tyto důkazy a atestace může odkazovat, znovu je přehrávat a důvěřovat jim jakýkoli kontrakt nebo agent

## Platby a obchodování s x402 {#x402}

[Protokol x402](https://www.x402.org/), nasazený na Ethereu a L2, dává agentům nativní způsob, jak platit za zdroje a ekonomicky interagovat bez lidského zásahu. Agenti mohou:

- Platit za výpočetní výkon, data a volání API pomocí stablecoinů
- Vyžadovat nebo ověřovat atestace od jiných agentů nebo služeb
- Účastnit se obchodování mezi agenty, nakupovat a prodávat výpočetní výkon, data nebo výstupy modelů

x402 mění Ethereum v programovatelnou ekonomickou vrstvu pro autonomní agenty, což umožňuje interakce s platbou za použití namísto účtů, předplatných nebo centralizovaného účtování.

### Bezpečnost agentních financí {#agentic-finance-security}

Autonomní agenti potřebují mantinely. Ethereum je poskytuje na úrovni peněženky a kontraktu:

- [Chytré účty (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) umožňují vývojářům vynucovat limity útrat, whitelisty, relační klíče a granulární oprávnění
- Naprogramovaná omezení v chytrých kontraktech mohou omezit, co smí agent dělat
- Limity založené na inferenci (např. vyžadování důkazu zkML před provedením vysoce rizikové akce) přidávají další vrstvu bezpečnosti

Tyto ovládací prvky umožňují nasazení autonomních agentů, kteří nejsou neomezení.

### Registry na blockchainu: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) je vznikající standard (v současné době prochází recenzním řízením), který navrhuje registry na blockchainu pro identitu, schopnosti a atestace agentů.

Pokud bude přijat, mohl by poskytnout:

- Sdílený, na důvěře nezávislý adresář agentů
- Standardizované formáty atestací
- Základ pro \"na důvěře nezávislou infrastrukturu agentů\" přímo na hlavní síti Etherea

To by agentům usnadnilo vzájemně se objevovat, ověřovat a provádět transakce v plně decentralizovaném prostředí.

## AI agenti na Ethereu {#ai-agents-on-ethereum}

Začínáme zkoumat plný potenciál AI agentů a projekty již využívají synergii mezi AI a blockchainem – zejména v oblasti transparentnosti a monetizace.

<AiAgentProductLists list="ai-agents" />

<strong>První vystoupení Luny jako hosta v podcastu</strong>

<YouTube id="ZCsOMxnIruA" />

## Peněženky ovládané agenty {#agent-controlled-wallets}

Agenti jako Luna nebo AIXBT ovládají svou vlastní peněženku na blockchainu ([peněženka AIXBT](https://clusters.xyz/aixbt), [peněženka Luny](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), což jim umožňuje dávat spropitné fanouškům a účastnit se ekonomických aktivit.

Během sociální kampaně Luny na síti X #LunaMuralChallenge Luna vybrala a odměnila vítěze prostřednictvím své peněženky na síti Base – což je <strong>první případ, kdy AI najala lidi za odměnu v kryptoměnách</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Dobré vědět</strong></p>
<p className="mt-2">AI agenti a související nástroje jsou stále v rané fázi vývoje a velmi experimentální – používejte je opatrně.</p>
</AlertContent>

</Alert>

## Ovládejte svou peněženku pomocí příkazů v chatu {#control-your-wallet-using-chat-commands}

Můžete přeskočit složitá rozhraní DeFi a spravovat své kryptoměny pomocí jednoduchých příkazů v chatu.

Tento intuitivní přístup zrychluje a zjednodušuje transakce a snižuje náchylnost k chybám, jako je odeslání prostředků na špatnou adresu nebo přeplácení poplatků.

<AiAgentProductLists list="chat" />

## AI agenti vs. AI boti {#ai-agents-vs-ai-bots}

Rozdíl mezi AI agenty a AI boty může být někdy matoucí, protože oba provádějí automatizované akce na základě vstupů.

- AI boti jsou jako automatizovaní asistenti – řídí se konkrétními, předem naprogramovanými pokyny k provádění rutinních úkolů.
- AI agenti jsou spíše jako inteligentní společníci – učí se ze zkušeností, přizpůsobují se novým informacím a sami se rozhodují.

|                  | AI agenti                                                                             | AI boti                                                     |
| ---------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Interakce**    | Složité, přizpůsobivé, autonomní                                                      | Jednoduché, s předem definovaným rozsahem, pevně zakódované |
| **Učení**        | Učí se nepřetržitě, může experimentovat a přizpůsobovat se novým datům v reálném čase | Pracuje s předem natrénovanými daty nebo pevnými pravidly   |
| **Plnění úkolů** | Snaží se dosáhnout širších cílů                                                       | Zaměřuje se pouze na konkrétní úkoly                        |

## Ponořte se hlouběji {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Můžete si vytvořit vlastního AI agenta {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />
