---
title: "Liste de contrôle pour l'intégration de jetons"
description: "Une liste de contrôle des éléments à prendre en compte lors de l'interaction avec des jetons"
author: "Trailofbits"
lang: fr
tags: ["Solidity", "contrats intelligents", "sécurité", "jetons"]
skill: intermediate
breadcrumb: "Intégration de jetons"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Suivez cette liste de contrôle lors de l'interaction avec des jetons arbitraires. Assurez-vous de comprendre les risques associés à chaque élément et justifiez toute exception à ces règles.

Pour plus de commodité, tous les [utilitaires](https://github.com/crytic/slither#tools) Slither peuvent être exécutés directement sur l'adresse d'un jeton, par exemple :

[Tutoriel d'utilisation de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Pour suivre cette liste de contrôle, vous aurez besoin de cette sortie de Slither pour le jeton :

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # nécessite une configuration, et l'utilisation d'Echidna et de Manticore
```

## Considérations générales {#general-considerations}

- **Le contrat a fait l'objet d'un audit de sécurité.** Évitez d'interagir avec des contrats qui n'ont pas été audités. Vérifiez la durée de l'évaluation (également appelée « niveau d'effort »), la réputation de l'entreprise de sécurité, ainsi que le nombre et la gravité des vulnérabilités découvertes.
- **Vous avez contacté les développeurs.** Vous pourriez avoir besoin d'alerter leur équipe en cas d'incident. Recherchez les contacts appropriés sur [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Ils disposent d'une liste de diffusion de sécurité pour les annonces critiques.** Leur équipe devrait informer les utilisateurs (comme vous !) lorsque des problèmes critiques sont découverts ou lors de mises à niveau.

## Conformité ERC {#erc-conformity}

Slither inclut un utilitaire, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), qui vérifie la conformité d'un jeton à de nombreuses normes ERC associées. Utilisez slither-check-erc pour vérifier que :

- **Transfer et transferFrom renvoient un booléen.** Plusieurs jetons ne renvoient pas de booléen sur ces fonctions. Par conséquent, leurs appels dans le contrat pourraient échouer.
- **Les fonctions name, decimals et symbol sont présentes si elles sont utilisées.** Ces fonctions sont facultatives dans la norme ERC-20 et pourraient ne pas être présentes.
- **Decimals renvoie un uint8.** Plusieurs jetons renvoient incorrectement un uint256. Si c'est le cas, assurez-vous que la valeur renvoyée est inférieure à 255.
- **Le jeton atténue la [condition de concurrence ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) connue.** La norme ERC-20 présente une condition de concurrence ERC-20 connue qui doit être atténuée pour empêcher les attaquants de voler des jetons.
- **Le jeton n'est pas un jeton ERC-777 et n'a pas d'appel de fonction externe dans transfer et transferFrom.** Les appels externes dans les fonctions de transfert peuvent entraîner des réentrances.

Slither inclut un utilitaire, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), qui génère des tests unitaires et des propriétés de sécurité capables de découvrir de nombreuses failles ERC courantes. Utilisez slither-prop pour vérifier que :

- **Le contrat réussit tous les tests unitaires et les propriétés de sécurité de slither-prop.** Exécutez les tests unitaires générés, puis vérifiez les propriétés avec [Echidna](https://github.com/crytic/echidna) et [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Enfin, certaines caractéristiques sont difficiles à identifier automatiquement. Vérifiez manuellement ces conditions :

- **Transfer et transferFrom ne doivent pas prélever de frais.** Les jetons déflationnistes peuvent entraîner un comportement inattendu.
- **Les intérêts potentiels gagnés grâce au jeton sont pris en compte.** Certains jetons distribuent des intérêts aux détenteurs de jetons. Ces intérêts pourraient être bloqués dans le contrat s'ils ne sont pas pris en compte.

## Composition du contrat {#contract-composition}

- **Le contrat évite toute complexité inutile.** Le jeton doit être un contrat simple ; un jeton avec un code complexe nécessite un niveau d'examen plus élevé. Utilisez l'[outil d'affichage human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) de Slither pour identifier le code complexe.
- **Le contrat utilise SafeMath.** Les contrats qui n'utilisent pas SafeMath nécessitent un niveau d'examen plus élevé. Inspectez manuellement le contrat pour vérifier l'utilisation de SafeMath.
- **Le contrat ne comporte que quelques fonctions non liées au jeton.** Les fonctions non liées au jeton augmentent la probabilité d'un problème dans le contrat. Utilisez l'[outil d'affichage contract-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither pour examiner globalement le code utilisé dans le contrat.
- **Le jeton n'a qu'une seule adresse.** Les jetons avec plusieurs points d'entrée pour les mises à jour de solde peuvent perturber la comptabilité interne basée sur l'adresse (par exemple, `balances[token_address][msg.sender]` pourrait ne pas refléter le solde réel).

## Privilèges du propriétaire {#owner-privileges}

- **Le jeton n'est pas évolutif (upgradeable).** Les contrats évolutifs peuvent modifier leurs règles au fil du temps. Utilisez l'[outil d'affichage human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither pour déterminer si le contrat est évolutif.
- **Le propriétaire a des capacités de frappe limitées.** Des propriétaires malveillants ou compromis peuvent abuser des capacités de frappe. Utilisez l'[outil d'affichage human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither pour examiner les capacités de frappe, et envisagez de vérifier manuellement le code.
- **Le jeton ne peut pas être mis en pause.** Des propriétaires malveillants ou compromis peuvent piéger les contrats s'appuyant sur des jetons pouvant être mis en pause. Identifiez manuellement le code permettant la mise en pause.
- **Le propriétaire ne peut pas mettre le contrat sur liste noire.** Des propriétaires malveillants ou compromis peuvent piéger les contrats s'appuyant sur des jetons dotés d'une liste noire. Identifiez manuellement les fonctionnalités de mise sur liste noire.
- **L'équipe derrière le jeton est connue et peut être tenue responsable en cas d'abus.** Les contrats dont les équipes de développement sont anonymes, ou qui résident dans des paradis fiscaux/juridiques, devraient nécessiter un niveau d'examen plus élevé.

## Rareté du jeton {#token-scarcity}

L'examen des problèmes liés à la rareté du jeton nécessite une vérification manuelle. Vérifiez les conditions suivantes :

- **Aucun utilisateur ne possède la majorité de l'offre.** Si quelques utilisateurs possèdent la plupart des jetons, ils peuvent influencer les opérations en fonction de la répartition du jeton.
- **L'offre totale est suffisante.** Les jetons avec une faible offre totale peuvent être facilement manipulés.
- **Les jetons sont répartis sur plusieurs plateformes d'échange.** Si tous les jetons se trouvent sur une seule plateforme d'échange, une compromission de cette plateforme peut compromettre le contrat s'appuyant sur le jeton.
- **Les utilisateurs comprennent les risques associés aux fonds importants ou aux prêts éclair (flash loans).** Les contrats s'appuyant sur le solde de jetons doivent prendre soigneusement en considération les attaquants disposant de fonds importants ou les attaques via des prêts éclair.
- **Le jeton n'autorise pas la frappe éclair (flash minting).** La frappe éclair peut entraîner des variations substantielles du solde et de l'offre totale, ce qui nécessite des vérifications strictes et exhaustives des dépassements de capacité dans le fonctionnement du jeton.