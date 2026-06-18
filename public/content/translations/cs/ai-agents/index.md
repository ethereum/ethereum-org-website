---
title: AI agenti
metaTitle: AI agenti | AI agenti na Ethereu
description: Přehled AI agentů na Ethereu
lang: cs
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Lidé shromáždění u stolu s terminálem
summaryPoints:
  - "Umělá inteligence, která interaguje s blockchainem a nezávisle obchoduje"
  - "Ovládá onchain peněženky a prostředky"
  - "Najímá lidi nebo jiné agenty na práci"
buttons:
  - content: Co jsou AI agenti?
    toId: what-are-ai-agents
  - content: Prozkoumat agenty
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Představte si, že se pohybujete v Ethereu s AI asistentem, který 24 hodin denně, 7 dní v týdnu studuje onchain tržní trendy, odpovídá na otázky a dokonce za vás provádí transakce. Vítejte ve světě AI agentů – inteligentních systémů navržených tak, aby vám zjednodušily digitální život.

Na Ethereu jsme svědky inovací AI agentů od virtuálních influencerů a autonomních tvůrců obsahu až po platformy pro analýzu trhu v reálném čase, které uživatelům poskytují přehledy, zábavu a provozní efektivitu.

## Co jsou AI agenti? {#what-are-ai-agents}

AI agenti jsou softwarové programy, které využívají umělou inteligenci k provádění úkolů nebo k vlastnímu rozhodování. Učí se z dat, přizpůsobují se změnám a zvládají složité úkoly. Fungují nepřetržitě a dokážou okamžitě detekovat příležitosti.

### Jak AI agenti spolupracují s blockchainy {#how-ai-agents-work-with-blockchains}

V tradičních financích AI agenti často fungují v centralizovaných prostředích s omezenými datovými vstupy. To brání jejich schopnosti učit se nebo autonomně spravovat aktiva.

Naproti tomu decentralizovaný ekosystém Etherea nabízí několik klíčových výhod:

- <strong>Transparentní data:</strong> Přístup k informacím z blockchainu v reálném čase.
- <strong>Skutečné vlastnictví aktiv:</strong> Digitální aktiva jsou plně ve vlastnictví AI agentů.
- <strong>Robustní onchain funkcionalita:</strong> Umožňuje AI agentům provádět transakce, interagovat s chytrými kontrakty, poskytovat likviditu a spolupracovat napříč protokoly.

Tyto faktory mění AI agenty z jednoduchých botů na dynamické, sebezdokonalující se systémy, které nabízejí významnou hodnotu v mnoha odvětvích:

<Grid>
  <Card title="Automatizované DeFi" emoji=":money_with_wings:" description="AI agenti pečlivě sledují trendy na trhu, provádějí obchody a spravují portfolia – díky čemuž je složitý svět DeFi mnohem přístupnější."/>
  <Card title="Nová ekonomika AI agentů" emoji="🌎" description="AI agenti si mohou najímat další agenty (nebo lidi) s různými dovednostmi, aby pro ně vykonávali specializované úkoly." />
  <Card title="Řízení rizik" emoji="🛠️" description="Sledováním transakčních aktivit mohou AI agenti pomoci odhalit podvody a lépe a rychleji chránit vaše digitální aktiva." />
</Grid>

## Ověřitelná umělá inteligence {#verifiable-ai}

AI agenti běžící offchain se často chovají jako „černé skříňky“ – jejich uvažování, vstupy a výstupy nelze nezávisle ověřit. Ethereum to mění. Ukotvením chování agentů onchain mohou vývojáři vytvářet agenty, kteří jsou _nevyžadující důvěru (trustless)_, _transparentní_ a _ekonomicky autonomní_. Akce takových agentů lze auditovat, omezovat a prokazovat.

### Ověřitelná inference {#verifiable-inference}

Inference umělé inteligence tradičně probíhá offchain, kde je provádění levné, ale běh modelu je neprůhledný. Na Ethereu mohou vývojáři spárovat agenty s ověřitelnými výpočty pomocí několika technik:

- [**zkML (strojové učení s nulovým vědomím)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) umožňuje agentům prokázat, že model byl proveden správně, aniž by odhalili model nebo vstupy
- [**Atestace TEE (důvěryhodné spouštěcí prostředí)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) umožňují hardwarově podložené důkazy, že agent spustil konkrétní model nebo cestu kódu
- **Onchain neměnnost** zajišťuje, že na tyto důkazy a atestace může odkazovat, přehrávat je a důvěřovat jim jakýkoli kontrakt nebo agent

## Platby a obchodování s x402 {#x402}

[Protokol x402](https://www.x402.org/), nasazený na Ethereu a L2, dává agentům nativní způsob, jak platit za zdroje a ekonomicky interagovat bez lidského zásahu. Agenti mohou:

- Platit za výpočetní výkon, data a volání API pomocí stablecoinů
- Vyžadovat nebo ověřovat atestace od jiných agentů nebo služeb
- Účastnit se obchodu mezi agenty, nakupovat a prodávat výpočetní výkon, data nebo výstupy modelů

x402 mění Ethereum na programovatelnou ekonomickou vrstvu pro autonomní agenty, což umožňuje interakce s platbou za použití (pay-per-use) namísto účtů, předplatných nebo centralizovaného účtování.

### Bezpečnost financí agentů {#agentic-finance-security}

Autonomní agenti potřebují mantinely. Ethereum je poskytuje na úrovni peněženky a kontraktu:

- [Chytré účty (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) umožňují vývojářům vynucovat limity útraty, seznamy povolených (whitelists), klíče relací a granulární oprávnění
- Naprogramovaná omezení v chytrých kontraktech mohou omezit, co má agent povoleno dělat
- Limity založené na inferenci (např. vyžadování důkazu zkML před provedením vysoce rizikové akce) přidávají další vrstvu bezpečnosti

Tyto ovládací prvky umožňují nasazení autonomních agentů, kteří nejsou bez omezení.

### Onchain registry: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) definuje onchain registry pro identitu, reputaci a validaci agentů. Byl vytvořen ve spolupráci s přispěvateli z MetaMask, Nadace Ethereum, Google a Coinbase a je nasazen na 16 sítích včetně Ethereum Mainnet, Base, Polygon, Arbitrum a dalších.

Poskytuje:

- **Registr identit** pro přenositelné identifikátory agentů odolné vůči cenzuře
- **Registr reputace** pro standardizované signály zpětné vazby napříč aplikacemi
- **Registr validace** pro vyžádání nezávislého ověření (zkML, TEE, opětovné spuštění se stakem)

ERC-8004 usnadňuje agentům vzájemné objevování, ověřování a provádění transakcí v plně decentralizovaném prostředí.

## AI agenti na Ethereu {#ai-agents-on-ethereum}

Začínáme zkoumat plný potenciál AI agentů a projekty již využívají synergii mezi umělou inteligencí a blockchainem – zejména v oblasti transparentnosti a monetizace.

<AiAgentProductLists list="ai-agents" />

<strong>První vystoupení Luny jako hosta v podcastu</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Peněženky ovládané agenty {#agent-controlled-wallets}

Agenti jako Luna nebo AIXBT ovládají svou vlastní onchain peněženku ([peněženka AIXBT](https://clusters.xyz/aixbt), [peněženka Luny](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), což jim umožňuje odměňovat fanoušky a účastnit se ekonomických aktivit.

Během sociální kampaně Luny na síti X #LunaMuralChallenge Luna vybrala a odměnila vítěze prostřednictvím své peněženky na síti Base – což představuje <strong>první případ, kdy si umělá inteligence najala lidi za krypto odměnu</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Dobré vědět</strong></strong>
<p className="mt-2">AI agenti a související nástroje jsou stále v raném stádiu vývoje a jsou velmi experimentální – používejte je s opatrností.</p>
</AlertContent>
</Alert>

## Ovládejte svou peněženku pomocí chatovacích příkazů {#control-your-wallet-using-chat-commands}

Můžete přeskočit složitá rozhraní decentralizovaných financí (DeFi) a spravovat své krypto pomocí jednoduchých chatovacích příkazů.

Tento intuitivní přístup činí transakce rychlejšími, snazšími a méně náchylnými k chybám, jako je odeslání prostředků na nesprávnou adresu nebo přeplácení poplatků.

<AiAgentProductLists list="chat" />

## AI agenti vs. AI boti {#ai-agents-vs-ai-bots}

Rozdíl mezi AI agenty a AI boty může být někdy matoucí, protože oba provádějí automatizované akce na základě vstupu.

- AI boti jsou jako automatizovaní asistenti – řídí se specifickými, předem naprogramovanými pokyny k provádění rutinních úkolů.
- AI agenti jsou spíše jako inteligentní společníci – učí se ze zkušeností, přizpůsobují se novým informacím a rozhodují se sami.

|                     | AI agenti                                                              | AI boti                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interakce**       | Komplexní, adaptabilní, autonomní                                      | Jednoduché, předem definovaný rozsah, pevně zakódované |
| **Učení**           | Učí se neustále, mohou experimentovat a přizpůsobovat se novým datům v reálném čase | Fungují na předem natrénovaných datech nebo pevných pravidlech |
| **Plnění úkolů**    | Zaměřují se na dosažení širších cílů                                   | Soustředí se pouze na specifické úkoly      |

## Ponořte se hlouběji {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Můžete si vytvořit vlastního AI agenta {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />