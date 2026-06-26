---
title: Abstraction de compte
description: Un aperçu des projets d'Ethereum visant à rendre les comptes d'utilisateurs plus simples et plus sûrs
lang: fr
summaryPoints:
  - L'abstraction de compte facilite grandement la création de portefeuilles de contrats intelligents
  - Les portefeuilles de contrats intelligents facilitent grandement la gestion de l'accès aux comptes Ethereum
  - Les clés perdues et exposées peuvent être récupérées à l'aide de multiples sauvegardes
---

La plupart des utilisateurs actuels interagissent avec [Ethereum](/) en utilisant des **[comptes détenus en externe (EOA)](/glossary/#eoa)**. Cela limite la façon dont les utilisateurs peuvent interagir avec Ethereum. Par exemple, cela rend difficile l'exécution de lots de transactions et oblige les utilisateurs à toujours conserver un solde en ETH pour payer les frais de transaction.

L'abstraction de compte est un moyen de résoudre ces problèmes en permettant aux utilisateurs de programmer de manière flexible plus de sécurité et de meilleures expériences utilisateur dans leurs comptes. Cela peut se faire en [mettant à niveau les EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) afin qu'ils puissent être contrôlés par des contrats intelligents. Il existe également une autre voie consistant à ajouter un [second système de transaction distinct](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) pour fonctionner en parallèle au protocole existant. Quelle que soit la voie choisie, le résultat est l'accès à Ethereum via des portefeuilles de contrats intelligents, soit pris en charge nativement dans le cadre du protocole existant, soit via un réseau de transaction complémentaire.

Les portefeuilles de contrats intelligents débloquent de nombreux avantages pour l'utilisateur, notamment :

- définir vos propres règles de sécurité flexibles
- récupérer votre compte si vous perdez les clés
- partager la sécurité de votre compte entre des appareils ou des personnes de confiance
- payer le gaz de quelqu'un d'autre, ou laisser quelqu'un d'autre payer le vôtre
- regrouper des transactions (par exemple, approuver et exécuter un échange en une seule fois)
- plus d'opportunités pour les développeurs d'applications décentralisées (dapps) et de portefeuilles d'innover en matière d'expériences utilisateur

Ces avantages ne sont pas pris en charge nativement aujourd'hui car seuls les comptes détenus en externe ([EOA](/glossary/#eoa)) peuvent initier des transactions. Les EOA sont simplement des paires de clés publiques-privées. Ils fonctionnent de la manière suivante :

- si vous possédez la clé privée, vous pouvez _tout_ faire dans le respect des règles de la Machine Virtuelle Ethereum (EVM)
- si vous ne possédez pas la clé privée, vous ne pouvez _rien_ faire.

Si vous perdez vos clés, elles ne peuvent pas être récupérées, et les clés volées donnent aux voleurs un accès instantané à tous les fonds d'un compte.

Les portefeuilles de contrats intelligents sont la solution à ces problèmes, mais aujourd'hui, ils sont difficiles à programmer car, en fin de compte, toute logique qu'ils implémentent doit être traduite en un ensemble de transactions EOA avant de pouvoir être traitée par Ethereum. L'abstraction de compte permet aux contrats intelligents d'initier eux-mêmes des transactions, de sorte que toute logique que l'utilisateur souhaite implémenter puisse être codée dans le portefeuille de contrat intelligent lui-même et exécutée sur Ethereum.

En fin de compte, l'abstraction de compte améliore la prise en charge des portefeuilles de contrats intelligents, les rendant plus faciles à créer et plus sûrs à utiliser. Avec l'abstraction de compte, les utilisateurs peuvent profiter de tous les avantages d'Ethereum sans avoir besoin de comprendre la technologie sous-jacente.

## Au-delà des phrases secrètes {#beyond-seed-phrases}

Les comptes d'aujourd'hui sont sécurisés à l'aide de clés privées qui sont calculées à partir de phrases secrètes. Toute personne ayant accès à une phrase secrète peut facilement découvrir la clé privée protégeant un compte et accéder à tous les actifs qu'elle protège. Si une clé privée et une phrase secrète sont perdues, les actifs sont définitivement inaccessibles. Sécuriser ces phrases secrètes est délicat, même pour les utilisateurs experts, et l'hameçonnage de phrases secrètes est l'une des escroqueries les plus courantes.

L'abstraction de compte résout ce problème en utilisant un contrat intelligent pour détenir les actifs et autoriser les transactions. Les contrats intelligents peuvent inclure une logique personnalisée adaptée pour une sécurité et une convivialité maximales. Les utilisateurs utilisent toujours des clés privées pour contrôler l'accès, mais avec des mesures de sécurité renforcées.

Par exemple, des clés de sauvegarde peuvent être ajoutées à un portefeuille, permettant le remplacement de la clé si la clé principale est compromise. Chaque clé peut être sécurisée différemment ou distribuée entre des personnes de confiance, augmentant considérablement la sécurité. Des règles de portefeuille supplémentaires peuvent atténuer les dommages causés par l'exposition des clés, comme exiger plusieurs signatures pour les transactions de grande valeur ou restreindre les transactions à des adresses de confiance.

## Une meilleure expérience utilisateur {#better-user-experience}

L'abstraction de compte améliore grandement l'expérience utilisateur et la sécurité en prenant en charge les portefeuilles de contrats intelligents au niveau du protocole. Les développeurs peuvent innover librement, améliorant le regroupement des transactions pour plus de rapidité et d'efficacité. De simples échanges peuvent devenir des opérations en un clic, améliorant considérablement la facilité d'utilisation.

La gestion du gaz s'améliore considérablement. Les applications peuvent payer les frais de gaz des utilisateurs ou permettre le paiement avec des jetons autres que l'ETH, éliminant ainsi le besoin de maintenir un solde en ETH.

## Comment l'abstraction de compte sera-t-elle mise en œuvre ? {#how-will-aa-be-implemented}

Actuellement, les portefeuilles de contrats intelligents sont difficiles à mettre en œuvre car ils reposent sur un code complexe enveloppant les transactions standard. Ethereum peut changer cela en permettant aux contrats intelligents d'initier directement des transactions, en intégrant la logique dans les contrats intelligents Ethereum plutôt que de s'appuyer sur des relais externes.

### EIP-4337 : Abstraction de compte sans modification du protocole {#eip-4337-account-abstraction-without-protocol-changes}

L'EIP-4337 permet la prise en charge native des portefeuilles de contrats intelligents sans modifier le protocole de base d'Ethereum. Il introduit des objets `UserOperation` rassemblés dans des lots de transactions par les validateurs, simplifiant ainsi le développement de portefeuilles. Le contrat EntryPoint de l'EIP-4337 a été déployé sur le réseau principal Ethereum le 1er mars 2023 et a facilité la création de plus de 26 millions de portefeuilles intelligents et de 170 millions d'UserOperations.

## Progrès actuels {#current-progress}

Dans le cadre de la mise à jour Pectra d'Ethereum, l'EIP-7702 est prévu pour le 7 mai 2025. L'EIP-4337 a été largement adopté, [avec plus de 26 millions de comptes intelligents déployés et plus de 170 millions d'UserOperations traitées](https://www.bundlebear.com/erc4337-overview/all).

## Complément d'information {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Documentation de l'EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentation de l'EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Tableau de bord de l'adoption de l'ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- [« Road to Account Abstraction » par Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog de Vitalik sur les portefeuilles à récupération sociale](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)