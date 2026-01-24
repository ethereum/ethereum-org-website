---
title: KI-Agenten
metaTitle: KI-Agenten | KI-Agenten auf Ethereum
description: "Ein Überblick über KI-Agenten auf Ethereum"
lang: de
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: An einem Terminaltisch versammelte Menschen
summaryPoint1: "KI, die mit der Blockchain interagiert und eigenständig handelt"
summaryPoint2: Kontrolliert On-Chain-Wallets und Guthaben
summaryPoint3: "Stellt Menschen oder andere Agenten für Arbeit ein"
buttons:
  - content: Was sind KI-Agenten?
    toId: what-are-ai-agents
  - content: Agenten erkunden
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Stellen Sie sich vor, Sie könnten Ethereum mit einem KI-Assistenten nutzen, der rund um die Uhr On-Chain-Markttrends analysiert, Fragen beantwortet und sogar Transaktionen in Ihrem Namen ausführt. Willkommen in der Welt der KI-Agenten – intelligente Systeme, die Ihr digitales Leben vereinfachen sollen.

Auf Ethereum sehen wir Innovationen bei KI-Agenten, die von virtuellen Influencern und autonomen Content-Erstellern bis hin zu Echtzeit-Marktanalyseplattformen reichen. Diese ermächtigen Nutzer, indem sie Erkenntnisse, Unterhaltung und operative Effizienz liefern.

## Was sind KI-Agenten? {#what-are-ai-agents}

KI-Agenten sind Softwareprogramme, die künstliche Intelligenz nutzen, um Aufgaben zu erfüllen oder eigene Entscheidungen zu treffen. Sie lernen aus Daten, passen sich Veränderungen an und bewältigen komplexe Aufgaben. Sie arbeiten ohne Unterbrechung und können Chancen sofort erkennen.

### Wie KI-Agenten mit Blockchains zusammenarbeiten {#how-ai-agents-work-with-blockchains}

Im traditionellen Finanzwesen arbeiten KI-Agenten oft in zentralisierten Umgebungen mit begrenzten Dateneingaben. Dies behindert ihre Fähigkeit, autonom zu lernen oder Vermögenswerte zu verwalten.

Im Gegensatz dazu bietet das dezentrale Ökosystem von Ethereum mehrere entscheidende Vorteile:

- <strong>Transparente Daten:</strong> Zugang zu Blockchain-Informationen in Echtzeit.
- <strong>Echter Besitz von Vermögenswerten:</strong> Digitale Vermögenswerte sind vollständig im Besitz von KI-Agenten.
- <strong>Robuste On-Chain-Funktionalität:</strong> Ermöglicht es KI-Agenten, Transaktionen auszuführen, mit Smart Contracts zu interagieren, Liquidität bereitzustellen und protokollübergreifend zusammenzuarbeiten.

Diese Faktoren verwandeln KI-Agenten von einfachen Bots in dynamische, sich selbst verbessernde Systeme, die in verschiedenen Sektoren einen erheblichen Mehrwert bieten:

<CardGrid>
  <Card title="Automatisiertes DeFi" emoji=":money_with_wings:" description="KI-Agenten beobachten Markttrends genau, führen Trades aus und verwalten Portfolios – so wird die komplexe Welt von DeFi viel zugänglicher."/>
  <Card title="Neue KI-Agenten-Wirtschaft" emoji="🌎" description="KI-Agenten können andere Agenten (oder Menschen) mit unterschiedlichen Fähigkeiten einstellen, um spezialisierte Aufgaben für sie auszuführen." />
  <Card title="Risikomanagement" emoji="🛠️" description="Durch die Überwachung von Transaktionsaktivitäten helfen KI-Agenten dabei, Betrug zu erkennen und deine digitalen Vermögenswerte besser und schneller zu schützen." />
</CardGrid>

## Verifizierbare KI {#verifiable-ai}

KI-Agenten, die off-chain laufen, verhalten sich oft wie „Black Boxes“ – ihre Argumentation, Eingaben und Ausgaben können nicht unabhängig verifiziert werden. Ethereum ändert das. Durch die Verankerung des Agentenverhaltens on-chain können Entwickler Agenten bauen, die _trustless_, _transparent_ und _wirtschaftlich autonom_ sind. Die Aktionen solcher Agenten können geprüft, eingeschränkt und nachgewiesen werden.

### Verifizierbare Inferenz {#verifiable-inference}

KI-Inferenz findet traditionell off-chain statt, wo die Ausführung billig ist, die Modellausführung aber intransparent ist. Auf Ethereum können Entwickler Agenten mit verifizierbarer Berechnung unter Verwendung verschiedener Techniken koppeln:

- [**zkML (Zero-Knowledge Machine Learning)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) ermöglicht es Agenten zu beweisen, dass ein Modell korrekt ausgeführt wurde, ohne das Modell oder die Eingaben preiszugeben
- [**TEE (Trusted Execution Environment)-Attestierungen**](https://en.wikipedia.org/wiki/Trusted_execution_environment) ermöglichen hardwaregestützte Nachweise, dass ein Agent ein bestimmtes Modell oder einen bestimmten Codepfad ausgeführt hat
- **On-Chain-Unveränderlichkeit** stellt sicher, dass diese Nachweise und Attestierungen von jedem Vertrag oder Agenten referenziert, wiederholt und als vertrauenswürdig eingestuft werden können

## Zahlungen und Handel mit x402 {#x402}

Das auf Ethereum und L2s bereitgestellte [x402-Protokoll](https://www.x402.org/) gibt Agenten eine native Möglichkeit, für Ressourcen zu bezahlen und wirtschaftlich ohne menschliches Eingreifen zu interagieren. Agenten können:

- Für Rechenleistung, Daten und API-Aufrufe mit Stablecoins bezahlen
- Attestierungen von anderen Agenten oder Diensten anfordern oder verifizieren
- Am Agent-zu-Agent-Handel teilnehmen, indem sie Rechenleistung, Daten oder Modellausgaben kaufen und verkaufen

x402 macht Ethereum zu einer programmierbaren wirtschaftlichen Ebene für autonome Agenten und ermöglicht Pay-per-Use-Interaktionen anstelle von Konten, Abonnements oder zentralisierter Abrechnung.

### Sicherheit für agentenbasierte Finanzen {#agentic-finance-security}

Autonome Agenten benötigen Leitplanken. Ethereum stellt sie auf Wallet- und Vertragsebene bereit:

- [Smart Accounts (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) ermöglichen es Entwicklern, Ausgabenlimits, Whitelists, Sitzungsschlüssel und granulare Berechtigungen durchzusetzen
- Programmierte Einschränkungen in Smart Contracts können einschränken, was ein Agent tun darf
- Inferenzbasierte Limits (z. B. das Erfordern eines zkML-Beweises vor der Ausführung einer risikoreichen Aktion) fügen eine weitere Sicherheitsebene hinzu

Diese Kontrollen ermöglichen den Einsatz von autonomen Agenten, die nicht unbegrenzt sind.

### On-Chain-Register: ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) ist ein neuer Standard (derzeit im Peer-Review), der On-Chain-Register für Agentenidentität, -fähigkeiten und -attestierungen vorschlägt.

Wenn er angenommen wird, könnte er Folgendes bereitstellen:

- Ein gemeinsames, Trustless-Verzeichnis von Agenten
- Standardisierte Attestierungsformate
- Eine Grundlage für "Trustless Agenten-Infrastruktur" direkt auf dem Ethereum-Mainnet

Dies würde es Agenten erleichtern, sich gegenseitig in einer vollständig dezentralisierten Umgebung zu entdecken, zu verifizieren und miteinander zu handeln.

## KI-Agenten auf Ethereum {#ai-agents-on-ethereum}

Wir fangen gerade an, das volle Potenzial von KI-Agenten zu erforschen, und Projekte nutzen bereits die Synergie zwischen KI und Blockchain – insbesondere bei Transparenz und Monetarisierung.

<AiAgentProductLists list="ai-agents" />

<strong>Lunas erster Auftritt als Podcast-Gast</strong>

<YouTube id="ZCsOMxnIruA" />

## Von Agenten kontrollierte Wallets {#agent-controlled-wallets}

Agenten wie Luna oder AIXBT kontrollieren ihre eigene On-Chain-Wallet ([AIXBTs Wallet](https://clusters.xyz/aixbt), [Lunas Wallet](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), was es ihnen ermöglicht, Fans Trinkgelder zu geben und an wirtschaftlichen Aktivitäten teilzunehmen.

Während Lunas Social-Media-Kampagne #LunaMuralChallenge auf X wählte Luna die Gewinner aus und belohnte sie über ihre Base-Wallet – was <strong>den ersten Fall darstellt, in dem eine KI Menschen für eine Krypto-Belohnung engagiert hat</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Gut zu wissen</strong></p>
<p className="mt-2">KI-Agenten und zugehörige Tools befinden sich noch in der frühen Entwicklung und sind sehr experimentell – verwenden Sie sie mit Vorsicht.</p>
</AlertContent>
</Alert>

## Kontrollieren Sie Ihre Wallet mit Chat-Befehlen {#control-your-wallet-using-chat-commands}

Sie können die komplizierten Benutzeroberflächen von DeFi umgehen und Ihre Kryptowerte mit einfachen Chat-Befehlen verwalten.

Dieser intuitive Ansatz macht Transaktionen schneller, einfacher und weniger anfällig für Fehler, wie das Senden von Mitteln an eine falsche Adresse oder das Überbezahlen von Gebühren.

<AiAgentProductLists list="chat" />

## KI-Agenten vs. KI-Bots {#ai-agents-vs-ai-bots}

Die Unterscheidung zwischen KI-Agenten und KI-Bots kann mitunter verwirrend sein, da beide automatisierte Aktionen auf Grundlage von Eingaben ausführen.

- KI-Bots sind eher wie automatisierte Assistenten – Sie befolgen spezifische, vorprogrammierte Anweisungen, um Routineaufgaben auszuführen.
- KI-Agenten sind eher wie intelligente Begleiter – Sie lernen aus Erfahrung, passen sich neuen Informationen an und treffen eigene Entscheidungen.

|                        | KI-Agenten                                                                             | KI-Bots                                              |
| ---------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **Interaktionen**      | Komplex, anpassungsfähig, autonom                                                      | Einfach, vordefinierter Umfang, fest codiert         |
| **Lernen**             | Lernt kontinuierlich, kann experimentieren und sich in Echtzeit an neue Daten anpassen | Arbeitet mit vortrainierten Daten oder festen Regeln |
| **Aufgabenerledigung** | Zielt darauf ab, umfassendere Ziele zu erreichen                                       | Konzentriert sich nur auf bestimmte Aufgaben         |

## Tiefer eintauchen {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Sie können Ihren eigenen KI-Agenten bauen {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />
