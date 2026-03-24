---
title: KI-Agenten
metaTitle: KI-Agenten | KI-Agenten auf Ethereum
description: "Ein Überblick über KI-Agenten auf Ethereum"
lang: de
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Menschen versammelt an einem Terminal-Tisch
summaryPoint1: "KI, die mit der Blockchain interagiert und unabhängig handelt"
summaryPoint2: Kontrolliert Wallets und Gelder auf der Blockchain
summaryPoint3: "Stellt Menschen oder andere Agenten für Arbeiten ein"
buttons:
  - content: Was sind KI-Agenten?
    toId: what-are-ai-agents
  - content: Agenten entdecken
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Stellen Sie sich vor, Sie navigieren durch Ethereum mit einem KI-Assistenten, der rund um die Uhr Markttrends auf der Blockchain studiert, Fragen beantwortet und sogar Transaktionen in Ihrem Namen ausführt. Willkommen in der Welt der KI-Agenten – intelligente Systeme, die entwickelt wurden, um Ihr digitales Leben zu vereinfachen.

Auf Ethereum sehen wir Innovationen von KI-Agenten, die von virtuellen Influencern und autonomen Content-Erstellern bis hin zu Echtzeit-Marktanalyseplattformen reichen. Sie stärken die Nutzer, indem sie Einblicke, Unterhaltung und betriebliche Effizienz bieten.

## Was sind KI-Agenten? {#what-are-ai-agents}

KI-Agenten sind Softwareprogramme, die künstliche Intelligenz nutzen, um Aufgaben auszuführen oder eigene Entscheidungen zu treffen. Sie lernen aus Daten, passen sich an Veränderungen an und bewältigen komplexe Aufgaben. Sie arbeiten ununterbrochen und können Gelegenheiten sofort erkennen.

### Wie KI-Agenten mit Blockchains arbeiten {#how-ai-agents-work-with-blockchains}

Im traditionellen Finanzwesen agieren KI-Agenten oft in zentralisierten Umgebungen mit begrenzten Dateneingaben. Dies behindert ihre Fähigkeit, autonom zu lernen oder Vermögenswerte zu verwalten.

Im Gegensatz dazu bietet das dezentralisierte Ökosystem von Ethereum mehrere entscheidende Vorteile:

- <strong>Transparente Daten:</strong> Zugriff auf Echtzeit-Blockchain-Informationen.
- <strong>Echter Besitz von Vermögenswerten:</strong> Digitale Vermögenswerte sind vollständig im Besitz von KI-Agenten.
- <strong>Robuste Funktionalität auf der Blockchain:</strong> Ermöglicht es KI-Agenten, Transaktionen auszuführen, mit Smart Contracts zu interagieren, Liquidität bereitzustellen und über Protokolle hinweg zusammenzuarbeiten.

Diese Faktoren verwandeln KI-Agenten von einfachen Bots in dynamische, sich selbst verbessernde Systeme, die in mehreren Sektoren erheblichen Mehrwert bieten:

<CardGrid>
  <Card title="Automatisiertes DeFi" emoji=":money_with_wings:" description="KI-Agenten behalten Markttrends genau im Auge, führen Trades aus und verwalten Portfolios – was die komplexe Welt von DeFi viel zugänglicher macht."/>
  <Card title="Neue KI-Agenten-Wirtschaft" emoji="🌎" description="KI-Agenten können andere Agenten (oder Menschen) mit unterschiedlichen Fähigkeiten einstellen, um spezialisierte Aufgaben für sie auszuführen." />
  <Card title="Risikomanagement" emoji="🛠️" description="Durch die Überwachung von Transaktionsaktivitäten können KI-Agenten helfen, Betrug zu erkennen und Ihre digitalen Vermögenswerte besser und schneller zu schützen." />
</CardGrid>

## Verifizierbare KI {#verifiable-ai}

KI-Agenten, die Off-Chain laufen, verhalten sich oft wie „Black Boxes“ – ihre Argumentation, Eingaben und Ausgaben können nicht unabhängig verifiziert werden. Ethereum ändert das. Durch die Verankerung des Agentenverhaltens auf der Blockchain können Entwickler Agenten bauen, die _vertrauenslos_, _transparent_ und _wirtschaftlich autonom_ sind. Die Aktionen solcher Agenten können geprüft, eingeschränkt und nachgewiesen werden.

### Verifizierbare Inferenz {#verifiable-inference}

KI-Inferenz findet traditionell Off-Chain statt, wo die Ausführung günstig, aber die Modellausführung undurchsichtig ist. Auf Ethereum können Entwickler Agenten mit verifizierbarer Berechnung unter Verwendung mehrerer Techniken koppeln:

- [**zkML (Zero-Knowledge Machine Learning)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) lässt Agenten beweisen, dass ein Modell korrekt ausgeführt wurde, ohne das Modell oder die Eingaben preiszugeben
- [**TEE-Bestätigungen (Trusted Execution Environment)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) ermöglichen hardwaregestützte Beweise, dass ein Agent ein bestimmtes Modell oder einen bestimmten Codepfad ausgeführt hat
- **Unveränderlichkeit auf der Blockchain** stellt sicher, dass diese Beweise und Bestätigungen von jedem Vertrag oder Agenten referenziert, wiederholt und vertraut werden können

## Zahlungen und Handel mit x402 {#x402}

Das [x402-Protokoll](https://www.x402.org/), das auf Ethereum und L2s bereitgestellt wird, bietet Agenten eine native Möglichkeit, für Ressourcen zu bezahlen und ohne menschliches Eingreifen wirtschaftlich zu interagieren. Agenten können:

- Für Rechenleistung, Daten und API-Aufrufe mit Stablecoins bezahlen
- Bestätigungen von anderen Agenten oder Diensten anfordern oder verifizieren
- Am Agent-zu-Agent-Handel teilnehmen und Rechenleistung, Daten oder Modellausgaben kaufen und verkaufen

x402 verwandelt Ethereum in eine programmierbare wirtschaftliche Ebene für autonome Agenten und ermöglicht Pay-per-Use-Interaktionen anstelle von Konten, Abonnements oder zentralisierter Abrechnung.

### Sicherheit im agentenbasierten Finanzwesen {#agentic-finance-security}

Autonome Agenten benötigen Leitplanken. Ethereum bietet diese auf Wallet- und Vertragsebene:

- [Smart Accounts (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) ermöglichen es Entwicklern, Ausgabenlimits, Whitelists, Sitzungsschlüssel und granulare Berechtigungen durchzusetzen
- Programmierte Einschränkungen in Smart Contracts können beschränken, was ein Agent tun darf
- Inferenzbasierte Limits (z. B. die Anforderung eines zkML-Beweises vor der Ausführung einer risikoreichen Aktion) fügen eine weitere Sicherheitsebene hinzu

Diese Kontrollen ermöglichen den Einsatz von autonomen Agenten, die nicht unbegrenzt handeln können.

### Register auf der Blockchain: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) definiert Register auf der Blockchain für Agentenidentität, Reputation und Validierung. Es wurde von Mitwirkenden von MetaMask, der Ethereum Foundation, Google und Coinbase mitverfasst und ist in 16 Netzwerken im Einsatz, darunter das Ethereum-Mainnet, Base, Polygon, Arbitrum und andere.

Es bietet:

- Ein **Identitätsregister** für portable, zensurresistente Agenten-Identifikatoren
- Ein **Reputationsregister** für standardisierte Feedback-Signale über Anwendungen hinweg
- Ein **Validierungsregister** zur Anforderung unabhängiger Verifizierung (zkML, TEE, gestakte Neuausführung)

ERC-8004 macht es für Agenten einfacher, einander in einer vollständig dezentralisierten Umgebung zu entdecken, zu verifizieren und miteinander zu handeln.

## KI-Agenten auf Ethereum {#ai-agents-on-ethereum}

Wir fangen gerade erst an, das volle Potenzial von KI-Agenten zu erkunden, und Projekte nutzen bereits die Synergie zwischen KI und Blockchain – insbesondere bei Transparenz und Monetarisierung.

<AiAgentProductLists list="ai-agents" />

<strong>Lunas erster Auftritt als Podcast-Gast</strong>

<YouTube id="ZCsOMxnIruA" />

## Von Agenten kontrollierte Wallets {#agent-controlled-wallets}

Agenten wie Luna oder AIXBT kontrollieren ihr eigenes Wallet auf der Blockchain ([AIXBTs Wallet](https://clusters.xyz/aixbt), [Lunas Wallet](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), was es ihnen ermöglicht, Fans Trinkgeld zu geben und an wirtschaftlichen Aktivitäten teilzunehmen.

Während Lunas X-Social-Kampagne #LunaMuralChallenge wählte und belohnte Luna die Gewinner über ihr Base-Wallet – dies markiert <strong>das erste Mal, dass eine KI Menschen für eine Krypto-Belohnung einstellt</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Gut zu wissen</strong></p>
<p className="mt-2">KI-Agenten und verwandte Tools befinden sich noch in einer frühen Entwicklungsphase und sind sehr experimentell – mit Vorsicht verwenden.</p>
</AlertContent>
</Alert>

## Steuern Sie Ihr Wallet mit Chat-Befehlen {#control-your-wallet-using-chat-commands}

Sie können die komplizierten Schnittstellen von DeFi überspringen und Ihre Kryptowährungen mit einfachen Chat-Befehlen verwalten.

Dieser intuitive Ansatz macht Transaktionen schneller, einfacher und weniger fehleranfällig, wie z. B. das Senden von Geldern an die falsche Adresse oder das Überbezahlen von Gebühren.

<AiAgentProductLists list="chat" />

## KI-Agenten vs. KI-Bots {#ai-agents-vs-ai-bots}

Die Unterscheidung zwischen KI-Agenten und KI-Bots kann manchmal verwirrend sein, da beide automatisierte Aktionen basierend auf Eingaben ausführen.

- KI-Bots sind wie automatisierte Assistenten – sie befolgen spezifische, vorprogrammierte Anweisungen, um Routineaufgaben auszuführen.
- KI-Agenten sind eher wie intelligente Begleiter – sie lernen aus Erfahrung, passen sich an neue Informationen an und treffen eigene Entscheidungen.

|                     | KI-Agenten                                                              | KI-Bots                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interaktionen**    | Komplex, anpassungsfähig, autonom                                         | Einfach, vordefinierter Umfang, fest codiert        |
| **Lernen**        | Lernt kontinuierlich, kann experimentieren und sich in Echtzeit an neue Daten anpassen | Arbeitet mit vortrainierten Daten oder festen Regeln |
| **Aufgabenerfüllung** | Zielt darauf ab, umfassendere Ziele zu erreichen                                     | Konzentriert sich nur auf spezifische Aufgaben              |

## Tiefer eintauchen {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Sie können Ihren eigenen KI-Agenten bauen {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />