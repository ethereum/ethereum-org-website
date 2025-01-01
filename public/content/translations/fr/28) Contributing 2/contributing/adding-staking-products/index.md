---
title: Ajout de produits ou services de mise en jeu
description: Les conditions générales que nous appliquons pour ajouter des produits ou des services de mise en jeu sur ethereum.org
lang: fr
---

# Ajouter des produits ou services de mise en jeu {#adding-staking-products-or-services}

Nous souhaitons nous assurer de lister les meilleures ressources possibles tout en préservant la sécurité et la confiance des utilisateurs.

Toute personne est libre de suggérer l'ajout de produits ou de services mis en jeu sur ethereum.org. S'il en existe que nous avons manqué, **[merci de bien vouloir les suggérer](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml) !**

Nous listons actuellement les produits et services de mise en jeu sur les pages suivantes :

- [Mise en jeu en solo](/staking/solo/)
- [Mise en jeu en tant que service](/staking/saas/)
- [Les pools de mise en jeu](/staking/pools/)

La preuve d’enjeu sur la Chaîne phare est utilisée depuis le 1er décembre 2020. Bien que la mise en jeu soit encore relativement nouvelle, nous avons essayé de créer un cadre équitable et transparent pour être pris en compte sur ethereum.org cependant, les critères d’inscription changeront et évolueront au fil du temps et restent au final à la discrétion de l’équipe du site ethereum.org.

## Le cadre décisionnel {#the-decision-framework}

La décision de lister un produit sur ethereum.org ne dépend pas d'un seul facteur. Nous utilisons conjointement plusieurs critères de décision pour lister un produit ou un service. Les chances d'être listé sont fonction du nombre de critères satisfaits.

**Premièrement, de quelle catégorie de produit ou de service s'agit-il ?**

- Nœud ou outil client
- Gestionnaire de clés
- Mise en jeu en tant que service (SaaS)
- Pools de mise en jeu

Actuellement, nous répertorions uniquement des produits ou des services dans ces catégories.

### Critères d'inclusion {#criteria-for-inclusion}

Les soumissions de produits ou de services de mise en jeu seront évaluées selon les critères suivants :

**Quand le projet ou le service a-t-il été lancé ?**

- Existe-t-il des preuves du moment où le produit ou le service est devenu accessible au public ?
- Ceci est utilisé pour déterminer le score « battle tested » des produits.

**Le projet fait-il l'objet d'un suivi actif ?**

- Y a-t-il une équipe active qui développe le projet ? Qui est impliqué ?
- Seuls les produits activement suivis et mis à jour seront pris en considération.

**Le produit ou le service est-il exempt d'intermédiaires de confiance/humains ?**

- Quelles étapes dans le parcours des utilisateurs exigent que les humains de confiance détiennent les clés de leurs fonds, ou bien pour distribuer correctement les récompenses ?
- Ceci est utilisé pour déterminer le score de « confiance » du produit ou des services.

**Le projet fournit-il des informations précises et fiables ?**

- Il est essentiel que le site web du produit présente des informations à jour, précises et non trompeuses, en particulier s'il concerne le protocole Ethereum ou d'autres technologies associées.
- Les soumissions contenant des informations erronées, des détails obsolètes ou des déclarations potentiellement trompeuses sur Ethereum ou d'autres sujets pertinents ne seront pas répertoriées ou seront supprimées si elles sont déjà répertoriées.

**Quelles plateformes sont prises en charge ?**

- Par ex. Linux, macOS, Windows, iOS, Android

#### Logiciels et contrats intelligents {#software-and-smart-contracts}

Pour tout logiciel personnalisé ou contrat intelligent impliqué :

**Est-ce que tout est Open Source ?**

- Les projets Open Source doivent proposer un dépôt du code source disponible publiquement.
- Ceci est utilisé pour déterminer le score « open source » des produits.

**Le produit est-il issu du développement d'une version _bêta_ ?**

- Où se situe le produit dans son cycle de développement ?
- Les produits en phase bêta ne sont pas considérés comme pouvant être inclus sur ethereum.org

**Le logiciel a-t-il fait l'objet d'un audit de sécurité externe ?**

- Dans le cas contraire, y a-t-il des projets pour procéder à un audit externe ?
- Ceci est utilisé pour déterminer la note « d'audit » des produits.

**Est-ce que le projet a un programme de récompenses pour les bogues trouvés ?**

- Dans le cas contraire, est-il prévu de créer une prime au bogue de sécurité ?
- Ceci est utilisé pour déterminer le score « prime de bogue » des produits.

#### Nœud ou logiciel outil {#node-or-client-tooling}

Pour les produits logiciels liés à la configuration de nœuds ou de clients, la gestion ou la migration :

**Quels clients de la couche de consensus (c'est-à-dire  Lighthouse, Teku, Nimbus, Prysm, Grandine) sont pris en charge ?**

- Quels sont les clients pris en charge ? L'utilisateur peut-il choisir ?
- Ceci est utilisé pour déterminer le score « multi-client » des produits.

#### Mise en jeu en tant que service {#staking-as-a-service}

Pour les listes de [mise en jeu en tant que service](/staking/saas/) (c'est-à-dire les opérations de nœuds délégués) :

**Quels sont les frais associés à l'utilisation du service ?**

- Quelle est la structure des frais, par exemple y a-t-il des frais mensuels pour le service ?
- Des exigences supplémentaires pour la mise en jeu ?

**Les utilisateurs doivent-ils s'inscrire à un compte ?**

- Quelqu'un peut-il utiliser le service sans permission ou sans KYC (Connaissance du client) ?
- Ceci est utilisé pour déterminer le score « sans autorisation » des produits.

**Qui détient les clés de signature et les clés de retrait ?**

- À quelles clés l'utilisateur conserve-t-il l'accès ? Quelles sont les clés auxquelles le service a accès ?
- Ceci est utilisé pour déterminer le score de « confiance » des produits.

**Quelle est la diversité des clients des nœuds opérés ?**

- Quel pourcentage de clés de validateur exécute un client majoritaire de la couche de consensus (CL) ?
- Depuis la dernière modification, Prysm est le client de couche de consensus exécutée par une majorité d'opérateurs de nœuds, ce qui est dangereux pour le réseau. Si une couche de consensus client est actuellement utilisée par plus de 33 % du réseau, nous demandons des données relatives à son utilisation.
- Ceci est utilisé pour déterminer le score « diversité de clients » des produits.

#### Pools de mise en jeu {#staking-pool}

Pour les [services de mise en commun des mises en jeu](/staking/pools/) :

**Quel est le minimum d'ETH requis pour les mises en jeu ?**

- Par exemple : 0,01 ETH

**Quels sont les frais ou les exigences de mise en jeu ?**

- Quel pourcentage de récompenses est retiré sous la forme de frais ?
- Des exigences supplémentaires pour la mise en jeu ?

**Existe-t-il un jeton de liquidité ?**

- Quels sont les jetons concernés ? Comment fonctionnent-ils ? Quelles sont les adresses de contrat ?
- Ceci est utilisé pour déterminer le score « jeton de liquidité » des produits.

**Les utilisateurs peuvent-ils participer en tant qu'opérateur de nœud ?**

- Quels sont les prérequis pour pouvoir exécuter des clients validateurs en utilisant les groupements de fonds ?
- Cela exige-t-il une autorisation de la part d'une personne, d'une entreprise ou d'une DAO ?
- Ceci est utilisé pour déterminer le score « nœuds sans autorisation » des produits.

**Quelle est la diversité des clients des opérateurs de nœuds groupés ?**

- Quel pourcentage d'opérateurs de nœuds utilisent un client de couche de consensus (CL) majoritaire ?
- Depuis la dernière modification, Prysm est le client de couche de consensus exécutée par une majorité d'opérateurs de nœuds, ce qui est dangereux pour le réseau. Si une couche de consensus client est actuellement utilisée par plus de 33 % du réseau, nous demandons des données relatives à son utilisation.
- Ceci est utilisé pour déterminer le score « diversité de clients » des produits.

### Autres critères : c'est toujours un plus de les avoir {#other-criteria}

**Quelles sont les interfaces utilisateur prises en charge ?**

- Par ex. Application pour navigateur, application de bureau, application pour mobile, CLI

**Pour les outils de nœuds, le logiciel offre-t-il un moyen facile de basculer entre les clients ?**

- L'utilisateur peut-il changer facilement et en toute sécurité de clients à l'aide de l'outil ?

**Pour les SaaS, combien de validateurs sont actuellement opérationnels sur le service ?**

- Cela nous donne une idée de la portée de votre service à ce stade.

## Comment nous affichons les résultats {#product-ordering}

Les [critères d'inclusion](#criteria-for-inclusion) ci-dessus sont utilisés pour calculer un score cumulé pour chaque produit ou service. Ceci est utilisé comme un moyen de trier et de présenter des produits qui répondent à certains critères objectifs. Plus il y a de critères pour lesquels des preuves sont fournies, plus un produit sera listé haut, les ex æquo étant affichés aléatoirement au chargement.

La logique de code et les pondérations de ces critères sont actuellement contenus dans [ce composant JavaScript](https://github.com/ethereum/ethereum-org-website/blob/dev/src/components/Staking/StakingProductsCardGrid.js#L350) sur notre dépôt.

## Ajoutez votre produit ou service {#add-product}

Si vous souhaitez ajouter un produit ou un service de mise en jeu sur ethereum.org, il vous suffit de créer un ticket sur GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_staking_product.yaml">
  Créez un ticket
</ButtonLink>
