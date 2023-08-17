---
title: Liste des contrôles pour l'intégration de jetons
description: Une liste des contrôles à réaliser lors d’interactions avec des jetons
author: "Trailofbits"
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "sécurité"
  - "jetons"
skill: intermediate
published: 2020-08-13
source: Créer des contrats sécurisés
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Suivez cette liste de contrôle lorsque vous interagissez avec des jetons arbitraires. Assurez-vous de comprendre les risques associés à chaque élément et d'être capable de justifier toutes exceptions à ces règles.

Pour plus de commodité, tous les [services Slither](https://github.com/crytic/slither#tools) peuvent être directement exécutés sur une adresse de jeton, tel que :

[Utilisation du tutoriel Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Pour suivre cette liste de vérification, vous voudrez avoir cette sortie de Slither pour le jeton :

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## Considérations générales {#general-considerations}

- **Le contrat fait l'objet d'un contrôle de sécurité.** Évitez d'interagir avec des contrats qui ne font pas l'objet d'un quelconque contrôle de sécurité. Vérifiez la durée de l'évaluation (c'est-à-dire le « niveau d'effort »), la réputation de la société de sécurité, le nombre et la gravité des découvertes.
- **Vous avez contacté les développeurs**. Vous devrez peut-être avertir leur équipe d'un incident. Recherchez des contacts appropriés sur[ blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Ils ont une liste de diffusions de sécurité pour les annonces critiques.** Leur équipe devrait informer les utilisateurs (comme vous !) lorsque des problèmes critiques sont trouvés ou lorsque des mises à jour se produisent.

## Conformité ERC {#erc-conformity}

Slither inclut un utilitaire, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), qui vérifie la conformité d'un token à de nombreuses normes ERC connexes. Utilisez slither-check-erc pour vérifier ceci:

- **Transfer et transferFrom renvoient un booléen** Plusieurs token ne retournent pas un booléen sur ces fonctions. En conséquence, leurs appels au contrat pourraient échouer.
- **Le nom, les décimales et les fonctions symbole sont présents si utilisés**. Ces fonctions sont optionnelles dans le standard ERC20 et pourraient ne pas être présentes.
- **Les décimales retournent un uint8**. Plusieurs tokens retournent incorrectement un uint256. Si c'est le cas, assurez-vous que la valeur retournée est inférieure à 255.
- **Le jeton atténue les risques connus [Problèmes de concurrence ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** Le standard ERC20 a un problème de concurrence bien connu qui doit être atténué pour empêcher les attaquants de voler des jetons.
- **Le jeton n'est pas un jeton ERC777 et n'a pas d'appel de fonction externe dans le transfert et le transferFrom.** Les appels externes dans les fonctions de transfert peuvent conduire à des réentrances.

Slither inclut un utilitaire, [slither-popo](https://github.com/crytic/slither/wiki/Property-generation), qui génère des tests unitaires et des propriétés de sécurité qui peuvent découvrir de nombreuses failles ERC courantes. Utilisez slither-pop pour vérifier ceci :

- **Le contrat passe tous les tests unitaires et propriétés de sécurités de slither-prop.** Exécutez ces tests unitaires générés puis vérifiez les propriétés avec [Echidna](https://github.com/crytic/echidna) et [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Enfin, il y a certaines caractéristiques qui sont difficiles à détecter automatiquement. Vérifiez ces conditions manuellement :

- **Transfer et transferFrom ne doivent pas prendre de frais.** Les tokens déflationnistes peuvent conduire à des comportements inattendus.
- **L'intérêt potentiel gagné à partir d'un token est pris en compte.** Certains tokens distribuent des intérêts aux détenteurs de jetons. Cet intérêt pourrait être pris au piège dans un contrat s'il n'est pas pris en compte.

## Composition de contrat {#contract-composition}

- **Le contrat évite la complexité inutile.** Le jeton devrait être un simple contrat ; un jeton avec un code compliqué nécessite un niveau de contrôle accru. Utilisez [l'imprimante human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) de Slither pour identifier les codes complexes.
- **Le contrat utilise SafeMath.** Les contrats qui n'utilisent pas SafeMath nécessitent un examen approfondi. Inspectez le contrat manuellement pour l'utilisation de SafeMath.
- **Le contrat ne possède que quelques fonctions non liées au jeton.** Les fonctions non relatives au jeton augmentent la probabilité d'un problème dans le contrat. Utilisez [l'afficheur contract-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither pour revoir largement le code utilisé dans le contrat.
- **Le jeton n'a qu'une seule adresse.** Les jetons avec plusieurs points d'entrée pour les mises à jour de solde peuvent casser la comptabilité interne basée sur l'adresse (ex. `balances[token_address][msg.sender]` pourrait ne pas refléter le solde réel).

## Privilèges du propriétaire {#owner-privileges}

- **Le jeton ne peut pas être mis à niveau.** Les contrats modifiables peuvent changer leurs règles au fil du temps. Utilisez l'imprimante [l'imprimante human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither pour déterminer si une mise à niveau du contrat est possible.
- **Le propriétaire a des capacités de frappe limitées.** Les propriétaires malveillants ou compromis peuvent abuser des capacités de frappe. Utilisez [l'imprimante human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither pour examiner les capacités de frappe et envisagez de revoir le code manuellement .
- **Le jeton ne peut pas être mis en pause.** Les propriétaires malveillants ou compromis peuvent piéger des contrats en mettant les jetons en pause. Identifiez manuellement le code en pause.
- **Le propriétaire ne peut pas mettre sur liste noire le contrat.** Les propriétaires malveillants ou compromis peuvent piéger des contrats en s'appuyant sur des jetons avec une liste noire. Identifiez manuellement les fonctionnalités de la liste noire.
- **L'équipe derrière le jeton est connue et peut être tenue responsable d'abus.** Les contrats ayant des équipes de développement anonymes, ou qui résident dans des juridictions douteuses nécessitent un niveau d'examen plus rigoureux.

## Rareté des jetons {#token-scarcity}

Rechercher des problèmes liés à la rareté des jetons nécessite un examen manuel. Vérifiez les conditions suivantes :

- **Personne ne possède la plupart de l'approvisionnement.** Si quelques utilisateurs possèdent la plupart des jetons, ils peuvent influencer les opérations basées sur la répartition du jeton.
- **L'approvisionnement total est suffisant.** Les jetons avec un faible volume total peuvent être facilement manipulés.
- **Les jetons sont disponibles sur de nombreuses plateformes d'échanges.** Si tous les jetons sont sur une seule plateforme, sa compromission peut affecter le contrat s'appuyant sur le jeton.
- **Les utilisateurs comprennent les risques associés aux grands volumes de fonds ou aux prêts éclair.** Les contrats s'appuyant sur le solde de jetons doivent être soigneusement analysés notamment au regard des attaquants avec des fonds importants ou des attaques par le biais de prêts éclair .
- **Le jeton n'autorise pas la frappe éclair**. Les frappes éclair peuvent entraîner des fluctuations substantielles du solde et de l'approvisionnement total, ce qui exige des contrôles stricts et complets sur les risques de débordement dans le fonctionnement du jeton.
