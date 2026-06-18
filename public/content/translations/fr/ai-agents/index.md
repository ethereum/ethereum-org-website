---
title: Agents IA
metaTitle: Agents IA | Agents IA sur Ethereum
description: Un aperçu des agents IA sur Ethereum
lang: fr
template: use-cases
sidebarDepth: 2
image: /images/ai-agents/hero-image.png
alt: Des personnes rassemblées autour d'une table avec un terminal
summaryPoints:
  - "Une IA qui interagit avec la chaîne de blocs et trade de manière indépendante"
  - "Contrôle des portefeuilles et des fonds onchain"
  - "Embauche des humains ou d'autres agents pour travailler"
buttons:
  - content: Que sont les agents IA ?
    toId: what-are-ai-agents
  - content: Explorer les agents
    toId: ai-agents-on-ethereum
    isSecondary: false
---

Imaginez naviguer sur Ethereum avec un assistant IA qui étudie les tendances du marché onchain 24h/24 et 7j/7, répond à vos questions et exécute même des transactions en votre nom. Bienvenue dans le monde des agents IA, des systèmes intelligents conçus pour simplifier votre vie numérique.

Sur Ethereum, nous observons des innovations en matière d'agents IA allant des influenceurs virtuels et créateurs de contenu autonomes aux plateformes d'analyse de marché en temps réel, qui autonomisent les utilisateurs en leur offrant des informations, du divertissement et une efficacité opérationnelle.

## Que sont les agents IA ? {#what-are-ai-agents}

Les agents IA sont des programmes logiciels qui utilisent l'intelligence artificielle pour effectuer des tâches ou prendre leurs propres décisions. Ils apprennent à partir des données, s'adaptent aux changements et gèrent des tâches complexes. Ils fonctionnent sans interruption et peuvent détecter instantanément des opportunités.

### Comment les agents IA fonctionnent avec les chaînes de blocs {#how-ai-agents-work-with-blockchains}

Dans la finance traditionnelle, les agents IA opèrent souvent dans des environnements centralisés avec des entrées de données limitées. Cela entrave leur capacité à apprendre ou à gérer des actifs de manière autonome.

En revanche, l'écosystème décentralisé d'Ethereum offre plusieurs avantages clés :

- <strong>Données transparentes :</strong> Accès aux informations de la chaîne de blocs en temps réel.
- <strong>Véritable propriété des actifs :</strong> Les actifs numériques sont entièrement détenus par les agents IA.
- <strong>Fonctionnalité onchain robuste :</strong> Permet aux agents IA d'exécuter des transactions, d'interagir avec des contrats intelligents, de fournir de la liquidité et de collaborer à travers différents protocoles.

Ces facteurs transforment les agents IA de simples bots en systèmes dynamiques et capables de s'améliorer d'eux-mêmes, offrant une valeur significative dans de multiples secteurs :

<Grid>
  <Card title="DeFi automatisée" emoji=":money_with_wings:" description="Les agents IA surveillent de près les tendances du marché, exécutent des transactions et gèrent les portefeuilles — rendant le monde complexe de la DeFi beaucoup plus accessible."/>
  <Card title="Nouvelle économie des agents IA" emoji="🌎" description="Les agents IA peuvent embaucher d'autres agents (ou des humains) avec des compétences différentes pour effectuer des tâches spécialisées pour eux." />
  <Card title="Gestion des risques" emoji="🛠️" description="En surveillant les activités transactionnelles, les agents IA peuvent aider à repérer les escroqueries et à protéger vos actifs numériques mieux et plus rapidement." />
</Grid>

## IA vérifiable {#verifiable-ai}

Les agents IA fonctionnant hors chaîne se comportent souvent comme des « boîtes noires » : leur raisonnement, leurs entrées et leurs sorties ne peuvent pas être vérifiés de manière indépendante. Ethereum change la donne. En ancrant le comportement des agents onchain, les développeurs peuvent créer des agents _sans confiance_ (trustless), _transparents_ et _économiquement autonomes_. Les actions de ces agents peuvent être auditées, restreintes et prouvées.

### Inférence vérifiable {#verifiable-inference}

L'inférence de l'IA se produit traditionnellement hors chaîne, où l'exécution est peu coûteuse mais l'exécution du modèle est opaque. Sur Ethereum, les développeurs peuvent associer des agents à des calculs vérifiables en utilisant plusieurs techniques :

- [**zkML (apprentissage automatique à divulgation nulle de connaissance)**](https://opengradient.medium.com/a-gentle-introduction-to-zkml-8049a0e10a04) permet aux agents de prouver qu'un modèle a été exécuté correctement sans révéler le modèle ou les entrées
- **Les [attestations TEE (environnement d'exécution de confiance)](https://en.wikipedia.org/wiki/Trusted_execution_environment)** permettent d'obtenir des preuves matérielles qu'un agent a exécuté un modèle ou un chemin de code spécifique
- **L'immuabilité onchain** garantit que ces preuves et attestations peuvent être référencées, rejouées et considérées comme fiables par n'importe quel contrat ou agent

## Paiements et commerce avec x402 {#x402}

Le [protocole x402](https://www.x402.org/), déployé sur Ethereum et les L2, offre aux agents un moyen natif de payer pour des ressources et d'interagir économiquement sans intervention humaine. Les agents peuvent :

- Payer pour le calcul, les données et les appels d'API en utilisant des stablecoins
- Demander ou vérifier des attestations auprès d'autres agents ou services
- Participer au commerce entre agents, en achetant et en vendant du calcul, des données ou des résultats de modèles

x402 transforme Ethereum en une couche économique programmable pour les agents autonomes, permettant des interactions payables à l'usage au lieu de comptes, d'abonnements ou de facturation centralisée.

### Sécurité de la finance agentique {#agentic-finance-security}

Les agents autonomes ont besoin de garde-fous. Ethereum les fournit au niveau du portefeuille et du contrat :

- Les [comptes intelligents (EIP-4337)](https://eips.ethereum.org/EIPS/eip-4337) permettent aux développeurs d'appliquer des limites de dépenses, des listes blanches, des clés de session et des autorisations granulaires
- Les contraintes programmées dans les contrats intelligents peuvent restreindre ce qu'un agent est autorisé à faire
- Les limites basées sur l'inférence (par exemple, exiger une preuve zkML avant d'exécuter une action à haut risque) ajoutent une autre couche de sécurité

Ces contrôles permettent le déploiement d'agents autonomes qui ne sont pas sans limites.

### Registres onchain : ERC-8004 {#erc-8004}

[ERC-8004](https://eips.ethereum.org/EIPS/eip-8004) définit des registres onchain pour l'identité, la réputation et la validation des agents. Co-écrit par des contributeurs de MetaMask, de la Fondation Ethereum, de Google et de Coinbase, il est déployé sur 16 réseaux, dont le réseau principal Ethereum, Base, Polygon, Arbitrum et d'autres.

Il fournit :

- Un **registre d'identités** pour des identifiants d'agents portables et résistants à la censure
- Un **registre de réputation** pour des signaux de retour d'information standardisés à travers les applications
- Un **registre de validation** pour demander une vérification indépendante (zkML, TEE, réexécution avec mise)

ERC-8004 permet aux agents de se découvrir, de se vérifier et de transiger plus facilement entre eux dans un environnement entièrement décentralisé.

## Agents IA sur Ethereum {#ai-agents-on-ethereum}

Nous commençons à explorer tout le potentiel des agents IA, et des projets tirent déjà parti de la synergie entre l'IA et la chaîne de blocs, en particulier en matière de transparence et de monétisation.

<AiAgentProductLists list="ai-agents" />

<strong>La première apparition de Luna en tant qu'invitée d'un podcast</strong>

<VideoWatch slug="ai-agents-interview-luna" />

## Portefeuilles contrôlés par des agents {#agent-controlled-wallets}

Des agents comme Luna ou AIXBT contrôlent leur propre portefeuille onchain ([portefeuille d'AIXBT](https://clusters.xyz/aixbt), [portefeuille de Luna](https://zapper.xyz/account/0x0d177181e3763b20d47dc3a72dd584368bd8bf43)), ce qui leur permet de donner des pourboires aux fans et de participer à des activités économiques.

Lors de la campagne sociale de Luna sur X, #LunaMuralChallenge, Luna a sélectionné et récompensé les gagnants via son portefeuille Base — marquant <strong>le premier cas d'une IA embauchant des humains pour une récompense crypto</strong>.

<Alert variant="warning">
<AlertEmoji text="💡"/>
<AlertContent>
<p className="mt-0"><strong>Bon à savoir</strong></strong>
<p className="mt-2">Les agents IA et les outils associés sont encore à un stade de développement précoce et très expérimentaux — à utiliser avec prudence.</p>
</AlertContent>
</Alert>

## Contrôlez votre portefeuille à l'aide de commandes de chat {#control-your-wallet-using-chat-commands}

Vous pouvez éviter les interfaces compliquées de la finance décentralisée (DeFi) et gérer votre crypto avec de simples commandes de chat.

Cette approche intuitive rend les transactions plus rapides, plus faciles et moins sujettes aux erreurs, comme l'envoi de fonds à la mauvaise adresse ou le paiement de frais excessifs.

<AiAgentProductLists list="chat" />

## Agents IA vs bots IA {#ai-agents-vs-ai-bots}

La distinction entre les agents IA et les bots IA peut parfois prêter à confusion, car les deux effectuent des actions automatisées en fonction des entrées.

- Les bots IA sont comme des assistants automatisés — Ils suivent des instructions spécifiques et préprogrammées pour effectuer des tâches de routine.
- Les agents IA ressemblent davantage à des compagnons intelligents — Ils apprennent de l'expérience, s'adaptent aux nouvelles informations et prennent des décisions par eux-mêmes.

|                     | Agents IA                                                              | Bots IA                                     |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------- |
| **Interactions**    | Complexes, adaptables, autonomes                                       | Simples, portée prédéfinie, codées en dur   |
| **Apprentissage**   | Apprend en continu, peut expérimenter et s'adapter à de nouvelles données en temps réel | Fonctionne sur des données pré-entraînées ou des règles fixes |
| **Accomplissement des tâches** | Vise à atteindre des objectifs plus larges                                     | Se concentre uniquement sur des tâches spécifiques              |

## Pour aller plus loin {#dive-deeper}

<AiAgentProductLists list="dive-deeper" />

## Vous pouvez créer votre propre agent IA {#you-can-build-your-own-ai-agent}

<BuildYourOwnAIAgent />