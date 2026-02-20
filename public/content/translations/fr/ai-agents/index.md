---
title: Agents IA
metaTitle: Agents IA | Agents IA sur Ethereum
description: "Un aperçu des agents IA sur Ethereum"
lang: fr
template: use-cases
emoji: ":robot:"
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: "Des gens rassemblés autour d'un panneau de terminal"
summaryPoint1: "IA qui interagit avec la blockchain et effectue des transactions de manière autonome"
summaryPoint2: "Contrôle des portefeuilles et des fonds sur la blockchain"
summaryPoint3: Embauche des humains ou d'autres agents pour travailler
buttons:
  - content: Que sont les agents IA ?
    toId: what-are-ai-agents
  - content: Explorer les agents
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Imaginez naviguer sur Ethereum avec un assistant IA qui étudie les tendances du marché sur la blockchain 24h/24, répond aux questions et exécute même des transactions en votre nom. Bienvenue dans le monde des agents IA — des systèmes intelligents conçus pour simplifier votre vie numérique.

Sur Ethereum, nous assistons à des innovations d’agents IA allant des influenceurs virtuels et créateurs de contenu autonomes aux plateformes d’analyse de marché en temps réel, offrant aux utilisateurs des informations, du divertissement et une efficacité opérationnelle.

## Que sont les agents IA ? {#what-are-ai-agents}

Les agents IA sont des programmes logiciels qui utilisent l’intelligence artificielle pour effectuer des tâches ou prendre leurs propres décisions. Ils apprennent à partir des données, s’adaptent aux changements et gèrent des tâches complexes. Ils fonctionnent en continu et peuvent détecter instantanément des opportunités.

### Comment les agents IA fonctionnent avec les blockchains {#how-ai-agents-work-with-blockchains}

Dans la finance traditionnelle, les agents IA opèrent souvent dans des environnements centralisés avec des entrées de données limitées. Cela limite leur capacité à apprendre ou à gérer des actifs de manière autonome.

En revanche, l’écosystème décentralisé d’Ethereum offre plusieurs avantages clés :

- <strong>Données transparentes :</strong> Accès aux informations de la blockchain en temps réel.
- <strong>Véritable propriété des actifs :</strong> Les actifs numériques sont entièrement détenus par les agents IA.
- <strong>Fonctionnalité sur chaîne robuste :</strong> Permet aux agents IA d’exécuter des transactions, d’interagir avec des contrats intelligents, de fournir de la liquidité et de collaborer entre protocoles.

Ces facteurs transforment les agents IA de simples bots en systèmes dynamiques et auto-améliorants qui apportent une valeur significative dans de nombreux secteurs :

<CardGrid>
  <Card title="DeFi automatisée" emoji=":money_with_wings:" description="Les agents IA surveillent les tendances du marché, exécutent des transactions et gèrent les portefeuilles, rendant le monde complexe de la DeFi bien plus accessible."/>
  <Card title="Nouvelle économie d'agents IA" emoji="🌎" description="Les agents IA peuvent engager d'autres agents (ou humains) dotés de compétences différentes pour accomplir des tâches spécialisées." />
  <Card title="Gestion des risques" emoji="🛠️" description="En surveillant les activités transactionnelles, les agents IA peuvent aider à repérer les arnaques et à protéger vos actifs numériques plus rapidement et plus efficacement." />
</CardGrid>

## IA vérifiable {#verifiable-ai}

Les agents IA fonctionnant hors chaîne se comportent souvent comme des « boîtes noires » — leur raisonnement, leurs entrées et leurs sorties ne peuvent pas être vérifiés indépendamment. Ethereum change cela. En ancrant le comportement des agents sur chaîne, les développeurs peuvent créer des agents qui sont _sans confiance_ (trustless), _transparents_ et _économiquement autonomes_. Les actions de ces agents peuvent être auditées, restreintes et prouvées.

### Inférence vérifiable {#verifiable-inference}

L'inférence de l'IA se produit traditionnellement hors chaîne, où l'exécution est peu coûteuse mais l'exécution du modèle est opaque. Sur Ethereum, les développeurs peuvent associer des agents à des calculs vérifiables en utilisant plusieurs techniques :

- [**zkML (apprentissage automatique à connaissance nulle)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) permet aux agents de prouver qu'un modèle a été exécuté correctement sans révéler le modèle ou les entrées
- [**Attestations TEE (environnement d'exécution de confiance)**](https://en.wikipedia.org/wiki/Trusted_execution_environment) permettent d'obtenir des preuves matérielles qu'un agent a exécuté un modèle ou un chemin de code spécifique
- **L'immuabilité sur chaîne** garantit que ces preuves et attestations peuvent être référencées, rejouées et approuvées par n'importe quel contrat ou agent

## Paiements et commerce avec x402 {#x402}

Le [protocole x402](https://www.x402.org/), déployé sur Ethereum et les couches 2, offre aux agents un moyen natif de payer pour des ressources et d'interagir économiquement sans intervention humaine. Les agents peuvent :

- Payer pour le calcul, les données et les appels API en utilisant des stablecoins
- Demander ou vérifier des attestations auprès d'autres agents ou services
- Participer au commerce entre agents, en achetant et vendant du calcul, des données ou des sorties de modèles

x402 transforme Ethereum en une couche économique programmable pour les agents autonomes, permettant des interactions de type paiement à l'usage au lieu de comptes, d'abonnements ou d'une facturation centralisée.

### Sécurité de la finance agentique {#agentic-finance-security}

Les agents autonomes ont besoin de garde-fous. Ethereum les fournit au niveau du portefeuille et du contrat :

- Les [comptes intelligents (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) permettent aux développeurs d'appliquer des limites de dépenses, des listes blanches, des clés de session et des autorisations granulaires
- Les contraintes programmées dans les contrats intelligents peuvent restreindre ce qu'un agent est autorisé à faire
- Les limites basées sur l'inférence (par exemple, exiger une preuve zkML avant d'exécuter une action à haut risque) ajoutent une couche de sécurité supplémentaire

Ces contrôles permettent le déploiement d'agents autonomes qui ne sont pas sans limites.

### Registres sur chaîne : ERC-8004 {#erc-8004}

L'[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) définit des registres sur chaîne pour l'identité, la réputation et la validation des agents. Co-écrit par des contributeurs de MetaMask, la Fondation Ethereum, Google et Coinbase, il est déployé sur 16 réseaux, y compris le réseau principal Ethereum, Base, Polygon, Arbitrum et d'autres.

Il fournit :

- Un **registre d'identité** pour des identifiants d'agents portables et résistants à la censure
- Un **registre de réputation** pour des signaux d'évaluation standardisés à travers les applications
- Un **registre de validation** pour demander une vérification indépendante (zkML, TEE, réexécution avec mise en jeu)

L'ERC-8004 permet aux agents de se découvrir, de se vérifier et d'effectuer des transactions entre eux plus facilement dans un environnement entièrement décentralisé.

## Agents IA sur Ethereum {#ai-agents-on-ethereum}

Nous commençons à explorer tout le potentiel des agents IA, et des projets tirent déjà parti de la synergie entre l’IA et la blockchain — notamment en matière de transparence et de monétisation.

<AiAgentProductLists list="ai-agents" />

<strong>Première apparition de Luna en tant qu'invitée de podcast</strong>

<YouTube id="ZCsOMxnIruA" />

## Portefeuilles contrôlés par des agents {#agent-controlled-wallets}

Des agents comme Luna ou AIXBT contrôlent leur propre portefeuille sur chaîne ([portefeuille d’AIXBT](https://clusters.xyz/aixbt), [portefeuille de Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), ce qui leur permet de donner des pourboires à leurs fans et de participer à des activités économiques.

Lors de la campagne sociale #LunaMuralChallenge sur X, Luna a sélectionné et récompensé les gagnants via son portefeuille Base — marquant <strong>la première instance d’une IA embauchant des humains contre une récompense en crypto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Bon à savoir</strong></p>
<p className="mt-2">Les agents IA et les outils associés sont encore en phase de développement précoce et très expérimentaux — à utiliser avec prudence.</p>
</AlertContent>
</Alert>

## Contrôlez votre portefeuille à l’aide de commandes de chat {#control-your-wallet-using-chat-commands}

Vous pouvez passer outre les interfaces complexes de la DeFi et gérer votre crypto avec de simples commandes de chat.

Cette approche intuitive rend les transactions plus rapides, plus simples et moins sujettes aux erreurs comme l’envoi de fonds à une mauvaise adresse ou le paiement excessif de frais.

<AiAgentProductLists list="chat" />

## Agents IA vs Bots IA {#ai-agents-vs-ai-bots}

La distinction entre les agents IA et les bots IA peut parfois prêter à confusion, car tous deux exécutent des actions automatisées en fonction d’entrées.

- Les bots IA sont comme des assistants automatisés — Ils suivent des instructions spécifiques et préprogrammées pour effectuer des tâches routinières.
- Les agents IA sont plutôt comme des compagnons intelligents — Ils tirent des leçons de l’expérience, s’adaptent aux nouvelles informations et prennent des décisions par eux-mêmes.

|                         | Agents IA                                                                               | IA bots                                                      |
| ----------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Interactions** | Complexes, adaptables, autonomes                                                        | Simples, périmètre prédéfini, codés en dur                   |
| **Apprentissage** | Apprend en continu, peut expérimenter et s’adapter à de nouvelles données en temps réel | Fonctionne sur des données préentraînées ou des règles fixes |
| **Exécution de tâches** | Vise à atteindre des objectifs plus larges                                              | Se concentre uniquement sur des tâches spécifiques           |

## Approfondir {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Vous pouvez créer votre propre agent IA {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />