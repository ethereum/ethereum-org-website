---
title: KI-Agenten
metaTitle: KI-Agenten | KI-Agenten auf Ethereum
description: "Ein Überblick über KI-Agenten auf Ethereum"
lang: de
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Menschen versammelt an einem Terminal-Tisch
summaryPoints:
  - "KI, die mit der Blockchain interagiert und eigenständig handelt"
  - "Kontrolliert Onchain-Wallets und -Guthaben"
  - "Beauftragt Menschen oder andere Agenten mit Aufgaben"
buttons:
  - content: Was sind KI-Agenten?
    toId: what-are-ai-agents
  - content: Agenten entdecken
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Stell dir vor, du navigierst durch Ethereum mit einem KI-Assistenten, der rund um die Uhr Onchain-Markttrends analysiert, Fragen beantwortet und sogar Transaktionen in deinem Namen ausführt. Willkommen in der Welt der KI-Agenten – intelligente Systeme, die entwickelt wurden, um dein digitales Leben zu vereinfachen.

Auf Ethereum sehen wir Innovationen bei KI-Agenten, die von virtuellen Influencern und autonomen Content-Erstellern bis hin zu Echtzeit-Marktanalyseplattformen reichen. Sie stärken die Nutzer, indem sie Einblicke, Unterhaltung und betriebliche Effizienz bieten.

## Was sind KI-Agenten? {#what-are-ai-agents}

KI-Agenten sind Softwareprogramme, die künstliche Intelligenz nutzen, um Aufgaben auszuführen oder eigene Entscheidungen zu treffen. Sie lernen aus Daten, passen sich an Veränderungen an und bewältigen komplexe Aufgaben. Sie arbeiten ununterbrochen und können Gelegenheiten sofort erkennen.

### Wie KI-Agenten mit Blockchains arbeiten {#how-ai-agents-work-with-blockchains}

Im traditionellen Finanzwesen agieren KI-Agenten oft in zentralisierten Umgebungen mit begrenzten Dateneingaben. Dies behindert ihre Fähigkeit, autonom zu lernen oder Vermögenswerte zu verwalten.

Im Gegensatz dazu bietet das dezentrale Ökosystem von Ethereum mehrere entscheidende Vorteile:

- <strong>Transparente Daten:</strong> Zugriff auf Echtzeit-Blockchain-Informationen.
- <strong>Wahrer Besitz von Vermögenswerten:</strong> Digitale Vermögenswerte sind vollständig im Besitz der KI-Agenten.
- <strong>Robuste Onchain-Funktionalität:</strong> Ermöglicht es KI-Agenten, Transaktionen auszuführen, mit Smart Contracts zu interagieren, Liquidität bereitzustellen und protokollübergreifend zusammenzuarbeiten.

Diese Faktoren verwandeln KI-Agenten von einfachen Bots in dynamische, sich selbst verbessernde Systeme, die in mehreren Sektoren erheblichen Mehrwert bieten:

<Grid>
  <Card title="Automatisiertes DeFi" emoji=":money_with_wings:" description="KI-Agenten behalten Markttrends genau im Auge, führen Trades aus und verwalten Portfolios – was die komplexe Welt von DeFi viel zugänglicher macht."/>
  <Card title="Neue KI-Agenten-Wirtschaft" emoji="🌎" description="KI-Agenten können andere Agenten (oder Menschen) mit unterschiedlichen Fähigkeiten beauftragen, um spezialisierte Aufgaben für sie zu erledigen." />
  <Card title="Risikomanagement" emoji="🛠️" description="Durch die Überwachung von Transaktionsaktivitäten können KI-Agenten helfen, Betrug zu erkennen und Ihre digitalen Vermögenswerte besser und schneller zu schützen." />
</Grid>

## Verifizierbare KI {#verifiable-ai}

KI-Agenten, die offchain laufen, verhalten sich oft wie „Black Boxes“ – ihre Argumentation, Eingaben und Ausgaben können nicht unabhängig verifiziert werden. Ethereum ändert das. Durch die Onchain-Verankerung des Agentenverhaltens können Entwickler Agenten erstellen, die _vertrauenslos_ (trustless), _transparent_ und _wirtschaftlich autonom_ sind. Die Aktionen solcher Agenten können geprüft, eingeschränkt und nachgewiesen werden.

### Verifizierbare Inferenz {#verifiable-inference}

KI-Inferenz findet traditionell offchain statt, wo die Ausführung günstig, die Modellausführung jedoch undurchsichtig ist. Auf Ethereum können Entwickler Agenten mithilfe verschiedener Techniken mit verifizierbarer Berechnung koppeln:

- [**zkML (Zero-Knowledge Machine Learning)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) ermöglicht es Agenten zu beweisen, dass ein Modell korrekt ausgeführt wurde, ohne das Modell oder die Eingaben preiszugeben
- [**TEE-Attestierungen (Trusted Execution Environment)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) ermöglichen hardwaregestützte Beweise dafür, dass ein Agent ein bestimmtes Modell oder einen bestimmten Codepfad ausgeführt hat
- **Onchain-Unveränderlichkeit** stellt sicher, dass diese Beweise und Attestierungen von jedem Vertrag oder Agenten referenziert, wiederholt und als vertrauenswürdig eingestuft werden können

## Zahlungen und Handel mit x402 {#x402}

Das [x402-Protokoll](https://www.x402.org/), das auf Ethereum und L2s bereitgestellt wird, bietet Agenten eine native Möglichkeit, für Ressourcen zu bezahlen und ohne menschliches Eingreifen wirtschaftlich zu interagieren. Agenten können:

- Mit Stablecoins für Rechenleistung, Daten und API-Aufrufe bezahlen
- Attestierungen von anderen Agenten oder Diensten anfordern oder verifizieren
- Am Agent-zu-Agent-Handel teilnehmen und Rechenleistung, Daten oder Modellausgaben kaufen und verkaufen

x402 macht Ethereum zu einer programmierbaren wirtschaftlichen Schicht für autonome Agenten und ermöglicht Pay-per-Use-Interaktionen anstelle von Konten, Abonnements oder zentralisierter Abrechnung.

### Sicherheit für agentenbasierte Finanzen {#agentic-finance-security}

Autonome Agenten benötigen Leitplanken. Ethereum bietet diese auf Wallet- und Vertragsebene:

- [Smart Accounts (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) ermöglichen es Entwicklern, Ausgabenlimits, Whitelists, Sitzungsschlüssel und granulare Berechtigungen durchzusetzen
- Programmierte Einschränkungen in Smart Contracts können begrenzen, was ein Agent tun darf
- Inferenzbasierte Limits (z. B. die Anforderung eines zkML-Beweises vor der Ausführung einer hochriskanten Aktion) fügen eine weitere Sicherheitsebene hinzu

Diese Kontrollen ermöglichen die Bereitstellung autonomer Agenten, die nicht grenzenlos agieren können.

### Onchain-Register: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) definiert Onchain-Register für die Identität, Reputation und Validierung von Agenten. Es wurde von Mitwirkenden von MetaMask, der Ethereum Foundation, Google und Coinbase mitverfasst und ist auf 16 Netzwerken bereitgestellt, darunter das Ethereum Mainnet, Base, Polygon, Arbitrum und andere.

Es bietet:

- Ein **Identitätsregister** für portable, zensurresistente Agenten-Identifikatoren
- Ein **Reputationsregister** für standardisierte Feedback-Signale über Anwendungen hinweg
- Ein **Validierungsregister** zur Anforderung unabhängiger Verifizierungen (zkML, TEE, gestakte Neuausführung)

ERC-8004 macht es Agenten leichter, einander in einer vollständig dezentralen Umgebung zu entdecken, zu verifizieren und miteinander zu transagieren.

## KI-Agenten auf Ethereum {#ai-agents-on-ethereum}

Wir fangen gerade erst an, das volle Potenzial von KI-Agenten zu erkunden, und Projekte nutzen bereits die Synergie zwischen KI und Blockchain – insbesondere in Bezug auf Transparenz und Monetarisierung.

<AiAgentProductLists list="ai-agents" />

<strong>Lunas erster Auftritt als Podcast-Gast</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Agentengesteuerte Wallets {#agent-controlled-wallets}

Agenten wie Luna oder AIXBT kontrollieren ihre eigene Onchain-Wallet ([AIXBTs Wallet](https://clusters.xyz/aixbt), [Lunas Wallet](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), was es ihnen ermöglicht, Fans Trinkgeld zu geben und an wirtschaftlichen Aktivitäten teilzunehmen.

Während Lunas Social-Media-Kampagne #LunaMuralChallenge auf X wählte und belohnte Luna die Gewinner über ihre Base-Wallet – dies markiert <strong>das erste Mal, dass eine KI Menschen gegen eine Krypto-Belohnung beauftragt hat</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Gut zu wissen</strong></p>
<p className="mt-2">KI-Agenten und verwandte Tools befinden sich noch in einer frühen Entwicklungsphase und sind sehr experimentell – mit Vorsicht verwenden.</p>
</AlertContent>
</Alert>

## Steuere deine Wallet mit Chat-Befehlen {#control-your-wallet-using-chat-commands}

Du kannst die komplizierten Benutzeroberflächen von Dezentralisierten Finanzen (DeFi) überspringen und deine Krypto-Werte mit einfachen Chat-Befehlen verwalten.

Dieser intuitive Ansatz macht Transaktionen schneller, einfacher und weniger fehleranfällig, wie z. B. das Senden von Geldern an die falsche Adresse oder das Überbezahlen von Gebühren.

<AiAgentProductLists list="chat" />

## KI-Agenten vs. KI-Bots {#ai-agents-vs-ai-bots}

Die Unterscheidung zwischen KI-Agenten und KI-Bots kann manchmal verwirrend sein, da beide basierend auf Eingaben automatisierte Aktionen ausführen.

- KI-Bots sind wie automatisierte Assistenten – sie befolgen spezifische, vorprogrammierte Anweisungen, um Routineaufgaben zu erledigen.
- KI-Agenten sind eher wie intelligente Begleiter – sie lernen aus Erfahrung, passen sich an neue Informationen an und treffen eigenständig Entscheidungen.

|                     | KI-Agenten                                                              | KI-Bots                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interaktionen**    | Komplex, anpassungsfähig, autonom                                         | Einfach, vordefinierter Umfang, fest codiert        |
| **Lernen**        | Lernt kontinuierlich, kann experimentieren und sich in Echtzeit an neue Daten anpassen | Arbeitet mit vorab trainierten Daten oder festen Regeln |
| **Aufgabenerfüllung** | Zielt darauf ab, umfassendere Ziele zu erreichen                                     | Konzentriert sich nur auf spezifische Aufgaben              |

## Tiefer eintauchen {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Du kannst deinen eigenen KI-Agenten bauen {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />