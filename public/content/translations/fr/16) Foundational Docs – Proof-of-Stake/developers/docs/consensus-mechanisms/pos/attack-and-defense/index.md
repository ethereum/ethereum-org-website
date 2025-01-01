---
title: Attaque et défense de preuve d'enjeu Ethereum
description: Découvrez les vecteurs d'attaques connus sur la preuve d'enjeu Ethereum et comment ils sont défendus.
lang: fr
---

Les voleurs et les saboteurs sont constamment à la recherche d'opportunités pour attaquer le logiciel client d'Ethereum. Cette page met en lumière les vecteurs d'attaques connus sur la couche de consensus d'Ethereum. Elle montre aussi comment ces attaques peuvent être défendues.

## Les prérequis {#prerequisites}

##  {#what-is-pos}

Une idée erronée courante est qu'un attaquant couronné de succès peut générer de nouveaux éthers ou absorber des éthers depuis des comptes arbitraires. Ni l'une, ni l'autre situation n'est possible car toutes les transactions sont exécutées par tous les clients d'exécution sur le réseau. Elles doivent satisfaire à des conditions élémentaires de validité (par exemple, les transactions sont signées par la clé privée de l'expéditeur, l'expéditeur dispose d'un solde suffisant, etc.) sinon elles sont simplement annulées. Il y a trois types de résultats qu'un attaquant pourrait viser : les reorgs, la double finalité ou le délai de finalité.

##  {#validators}

Un **"reorg"** est un mélange de blocs dans un nouvel ordre, avec éventuellement une addition ou soustraction de blocs dans la chaîne canonique. Une reorg malveillante pourrait garantir que des blocs spécifiques soient inclus ou exclus, permettant une double dépense ou une extraction de valeur en anticipant ou retardant les transactions (MEV). Les re-orgs pourraient également être utilisés pour empêcher certaines transactions d'être incluses dans la chaîne canonique - une forme de censure. La forme la plus extrême de reorg est la « réversion de finalité » qui supprime ou remplace les blocs qui ont été précédemment finalisés. Cela n'est possible que si plus d'un tiers de l'ether total mis en jeu est détruit par l'attaquant - cette garantie est connue sous le nom de « finalité économique » - nous y reviendrons plus tard.

**La double finalité** est la situation peu probable mais grave où deux fourches sont capables de finaliser simultanément, créant un schisme permanent dans la chaîne. Cela est théoriquement possible pour un attaquant prêt à risquer 34 % de l'éther total mis en jeu. La communauté serait alors forcée de coordonner hors chaîne et de se mettre d'accord sur la chaîne à suivre, ce qui nécessiterait une solidité dans la couche sociale.

##  {#transaction-execution-ethereum-pos}

1.
2.
3.
4.
5.
6.

Une attaque sur la couche sociale pourrait chercher à saper la confiance du public en Ethereum, dévaluer l'éther, réduire l'adoption ou affaiblir la communauté Ethereum pour rendre la coordination hors bande plus difficile.

##  {#finality}

Premièrement, les individus qui ne participent pas activement à Ethereum (en exécutant le logiciel client) peuvent attaquer en ciblant la couche sociale (Couche 0). La couche 0 est la fondation sur laquelle repose l'Ethereum, et, en tant que telle, représente une potentielle surface pour les attaques avec des conséquences se répercutant sur le reste de la pile. Voici quelques exemples :

##  {#crypto-economic-security}

Ce qui rend ces attaques particulièrement dangereuses, c'est que dans de nombreux cas, très peu de capital ou de savoir-faire technique est nécessaire. Une attaque de la couche 0 pourrait multiplier les effets d'une attaque crypto-économique. Par exemple, si une censure ou une réversion de finalité était réalisée par un actionnaire majoritaire malveillant, miner la couche sociale pourrait rendre plus difficile la coordination d'une réponse de la communauté hors ligne.

Défendre les attaques sur la couche 0 n'est probablement pas simple, mais quelques principes basiques peuvent être établis. L'un d'eux est de maintenir un rapport signal/bruit élevé pour l'information publique sur Ethereum, créée et diffusée par des membres honnêtes de la communauté via des blogs, des serveurs discord, des spécifications annotées, des livres, des podcasts et Youtube. Ici, sur ethereum.org, nous nous efforçons de maintenir des informations précises et de les traduire dans le plus grand nombre de langues possible. Inonder un espace avec des informations de haute qualité et des mèmes est une défense efficace contre la désinformation.

##  {#fork-choice}

Une autre fortification importante contre les attaques de la couche sociale est une déclaration de mission claire et un protocole de gouvernance. Ethereum s'est positionné comme le champion de la décentralisation et de la sécurité parmi les blockchains de contrats intelligents en couche 1, tout en valorisant fortement la scalabilité et la durabilité. Quels que soient les désaccords au sein de la communauté Ethereum, ces principes fondamentaux sont compromis au minimum. Évaluer un récit par rapport à ces principes fondamentaux, et les examiner à travers des tours successifs d'examen dans le processus EIP (Ethereum Improvement Proposal), pourrait aider la communauté à distinguer les bons acteurs des mauvais et limite la portée pour les acteurs malveillants d'influencer la direction future d'Ethereum.

##  {#pos-and-security}

Enfin, il est essentiel que la communauté Ethereum reste ouverte et accueillante pour tous les participants. Une communauté où règnent des gardiens et l'exclusivité est particulièrement vulnérable aux attaques sociales, car il est facile de créer des récits de type « nous et eux ». Le tribalisme et le maximalisme toxique blessent la communauté et érodent la sécurité de la Couche 1. Les Ethéréens ayant un intérêt direct dans la sécurité du réseau devraient considérer leur comportement en ligne et dans le monde réel comme une contribution directe à la sécurité de la couche 0 d'Ethereum.

-
-
-
- Infiltration dans la communauté de développeurs d'acteurs bien informés mais malveillants dont l'objectif est de ralentir les progrès en court-circuitant les discussions, en retardant les décisions clés, en créant des spams, etc.

##  {#pros-and-cons}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#comparison-to-proof-of-work}

Plusieurs documents ont expliqué des attaques sur Ethereum qui réalisent des reorgs ou des retards de finalité avec seulement une petite proportion de l'ether total mis en jeu. Ces attaques reposent généralement sur le fait que l'attaquant dissimule certaines informations aux autres validateurs, puis les divulgue d'une manière subtile et/ou à un moment opportun.

-
-
-
-
-
-

##  {#further-reading}

-
-
-
-
-
- []()
-
- []()

##  {#related-topics}

- []()
- []()
