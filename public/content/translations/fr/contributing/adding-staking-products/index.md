---
title: Ajouter des produits ou services de staking
description: La politique que nous utilisons lors de l'ajout de produits ou services de staking sur ethereum.org
lang: fr
---

Nous voulons nous assurer de répertorier les meilleures ressources possibles tout en garantissant la sécurité et la confiance des utilisateurs.

Tout le monde est libre de suggérer l'ajout d'un produit ou service de staking sur ethereum.org. S'il y en a un que nous avons manqué, **[n'hésitez pas à le suggérer](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml) !**

Nous répertorions actuellement les produits et services de staking sur les pages suivantes :

- [Staking en solo](/staking/solo/)
- [Staking en tant que service](/staking/saas/)
- [Pools de staking](/staking/pools/)

La preuve d'enjeu (PoS) sur la chaîne balise est en ligne depuis le 1er décembre 2020. Bien que le staking soit encore relativement nouveau, nous avons essayé de créer un cadre juste et transparent pour l'évaluation sur ethereum.org, mais les critères de référencement changeront et évolueront avec le temps, et sont en fin de compte à la discrétion de l'équipe du site web ethereum.org.

## Le cadre de décision {#the-decision-framework}

La décision de répertorier un produit sur ethereum.org ne dépend pas d'un seul facteur. Plusieurs critères sont pris en compte ensemble lors de la décision de répertorier un produit ou un service. Plus ces critères sont remplis, plus il est probable qu'il soit répertorié.

**Tout d'abord, de quelle catégorie de produit ou de service s'agit-il ?**

- Outils de nœud ou de client
- Gestion des clés
- Staking en tant que service (SaaS)
- Pool de staking

Actuellement, nous ne répertorions que les produits ou services de ces catégories.

### Critères d'inclusion {#criteria-for-inclusion}

Les soumissions de produits ou services de staking seront évaluées selon les critères suivants :

**Quand le projet ou le service a-t-il été lancé ?**

- Y a-t-il des preuves de la date à laquelle le produit ou le service est devenu accessible au public ?
- Cela est utilisé pour déterminer le score « éprouvé » (battle tested) du produit.

**Le projet est-il activement maintenu ?**

- Y a-t-il une équipe active qui développe le projet ? Qui est impliqué ?
- Seuls les produits activement maintenus seront pris en considération.

**Le produit ou service est-il sans tiers de confiance / intermédiaires humains ?**

- Quelles étapes du parcours utilisateur nécessitent de faire confiance à des humains pour détenir les clés de leurs fonds, ou pour distribuer correctement les récompenses ?
- Cela est utilisé pour déterminer le score « sans tiers de confiance » du produit ou service.

**Le projet fournit-il des informations précises et fiables ?**

- Il est crucial que le site web du produit présente des informations à jour, précises et non trompeuses, en particulier si elles concernent le protocole Ethereum ou d'autres technologies connexes.
- Les soumissions contenant des informations erronées, des détails obsolètes ou des déclarations potentiellement trompeuses sur Ethereum ou d'autres sujets pertinents ne seront pas répertoriées ou seront supprimées si elles le sont déjà.

**Quelles plateformes sont prises en charge ?**

- c.-à-d., Linux, macOS, Windows, iOS, Android

#### Logiciels et contrats intelligents {#software-and-smart-contracts}

Pour tout logiciel personnalisé ou contrat intelligent impliqué :

**Tout est-il open source ?**

- Les projets open source doivent avoir un dépôt de code source accessible au public.
- Cela est utilisé pour déterminer le score « open source » du produit.

**Le produit est-il sorti de la phase de développement _bêta_ ?**

- Où en est le produit dans son cycle de développement ?
- Les produits en phase bêta ne sont pas pris en compte pour une inclusion sur ethereum.org.

**Le logiciel a-t-il fait l'objet d'un audit de sécurité externe ?**

- Si ce n'est pas le cas, est-il prévu de réaliser un audit externe ?
- Cela est utilisé pour déterminer le score « audité » du produit.

**Le projet a-t-il un programme de primes aux bugs (bug bounty) ?**

- Si ce n'est pas le cas, est-il prévu de créer une prime aux bugs de sécurité ?
- Cela est utilisé pour déterminer le score « bug bounty » du produit.

#### Outils de nœud ou de client {#node-or-client-tooling}

Pour les produits logiciels liés à la configuration, la gestion ou la migration de nœuds ou de clients :

**Quels clients de la couche de consensus (c.-à-d., Lighthouse, Teku, Nimbus, Prysm, Grandine) sont pris en charge ?**

- Quels clients sont pris en charge ? L'utilisateur peut-il choisir ?
- Cela est utilisé pour déterminer le score « multi-clients » du produit.

#### Staking en tant que service {#staking-as-a-service}

Pour les [référencements de staking en tant que service](/staking/saas/) (c.-à-d., l'opération de nœud déléguée) :

**Quels sont les frais associés à l'utilisation du service ?**

- Quelle est la structure des frais, par exemple, y a-t-il des frais mensuels pour le service ?
- Y a-t-il des exigences de staking supplémentaires ?

**Les utilisateurs doivent-il s'inscrire pour créer un compte ?**

- Quelqu'un peut-il utiliser le service sans permission ou KYC ?
- Cela est utilisé pour déterminer le score « sans permission » du produit.

**Qui détient les clés de signature et les clés de retrait ?**

- À quelles clés l'utilisateur conserve-t-il l'accès ? À quelles clés le service a-t-il accès ?
- Cela est utilisé pour déterminer le score « sans tiers de confiance » du produit.

**Quelle est la diversité des clients des nœuds exploités ?**

- Quel pourcentage de clés de validateur est exécuté par un client majoritaire de la couche de consensus (CL) ?
- Lors de la dernière modification, Prysm est le client de la couche de consensus exécuté par une majorité d'opérateurs de nœuds, ce qui est dangereux pour le réseau. Si un client CL est actuellement utilisé par plus de 33 % du réseau, nous demandons des données relatives à son utilisation.
- Cela est utilisé pour déterminer le score « diversité des clients » du produit.

#### Pool de staking {#staking-pool}

Pour les [services de staking mutualisé](/staking/pools/) :

**Quel est le minimum d'ETH requis pour staker ?**

- par ex., 0,01 ETH

**Quels sont les frais ou les exigences de staking impliqués ?**

- Quel pourcentage des récompenses est prélevé sous forme de frais ?
- Y a-t-il des exigences de staking supplémentaires ?

**Y a-t-il un jeton de liquidité ?**

- Quels sont les jetons impliqués ? Comment fonctionnent-ils ? Quelles sont les adresses des contrats ?
- Cela est utilisé pour déterminer le score « jeton de liquidité » du produit.

**Les utilisateurs peuvent-ils participer en tant qu'opérateur de nœud ?**

- Qu'est-ce qui est requis pour exécuter des clients de validateur en utilisant les fonds mutualisés ?
- Cela nécessite-t-il la permission d'un individu, d'une entreprise ou d'une DAO ?
- Cela est utilisé pour déterminer le score « nœuds sans permission » du produit.

**Quelle est la diversité des clients des opérateurs de nœuds du pool ?**

- Quel pourcentage d'opérateurs de nœuds exécute un client majoritaire de la couche de consensus (CL) ?
- Lors de la dernière modification, Prysm est le client de la couche de consensus exécuté par une majorité d'opérateurs de nœuds, ce qui est dangereux pour le réseau. Si un client CL est actuellement utilisé par plus de 33 % du réseau, nous demandons des données relatives à son utilisation.
- Cela est utilisé pour déterminer le score « diversité des clients » du produit.

### Autres critères : les petits plus (nice-to-haves) {#other-criteria}

**Quelles interfaces utilisateur sont prises en charge ?**

- c.-à-d., application par navigateur, application de bureau, application mobile, CLI

**Pour les outils de nœud, le logiciel offre-t-il un moyen facile de basculer entre les clients ?**

- L'utilisateur peut-il changer de client facilement et en toute sécurité à l'aide de l'outil ?

**Pour le SaaS, combien de validateurs sont actuellement exploités par le service ?**

- Cela nous donne une idée de la portée de votre service jusqu'à présent.

## Comment nous affichons les résultats {#product-ordering}

Les [critères d'inclusion](#criteria-for-inclusion) ci-dessus sont utilisés pour calculer un score cumulatif pour chaque produit ou service. Cela sert de moyen pour trier et mettre en valeur les produits qui répondent à certains critères objectifs. Plus il y a de preuves fournies pour les critères, plus un produit sera classé haut, les égalités étant départagées aléatoirement lors du chargement.

La logique du code et les pondérations de ces critères sont actuellement contenues dans [ce composant JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid/index.tsx#L350) dans notre dépôt.

## Ajoutez votre produit ou service {#add-product}

Si vous souhaitez ajouter un produit ou service de staking sur ethereum.org, créez un ticket (issue) sur GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Créer un ticket
</ButtonLink>