---
title: Abstraction de comptes
description: Un aperçu des plans d'Ethereum pour simplifier et sécuriser les comptes utilisateurs
lang: fr
summaryPoints:
  - L'abstraction du compte facilite de manière significative la création de portefeuilles de contrats intelligents
  - Les portefeuilles de contrats intelligents facilitent la gestion de l'accès aux comptes Ethereum
  - Les clés perdues ou exposées peuvent être récupérées en faisant plusieurs sauvegardes
---

# Abstraction de comptes {#account-abstraction}

La plupart des utilisateurs interagissent sur Ethereum en utilisant des **[ comptes détenus en externe (EOA)](/glossary/#eoa)**. Cela limite la façon dont les utilisateurs peuvent interagir avec Ethereum. Par exemple, cela rend difficile l’exécution de lots de transactions et oblige les utilisateurs à toujours conserver un solde ETH pour payer les frais de transaction.

L'abstraction de compte est un moyen de résoudre ces problèmes car elle offre aux utilisateurs plus de flexibilité et donc plus de sécurité pour une meilleure expérience avec leur compte. Cela peut se faire en [mettant à niveau les EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) afin qu’ils puissent être contrôlés par des contrats intelligents. Il existe également une autre voie qui consiste à ajouter un [second système de transaction distinct](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) fonctionnant parallèlement au protocole existant. Quel que soit le chemin emprunté, le résultat est un accès à Ethereum via des portefeuilles de contrats intelligents, soit pris en charge nativement dans le cadre du protocole existant, soit via un réseau de transactions complémentaire.

Les portefeuilles de contrats intelligents offrent de nombreux avantages à l'utilisateur, notamment :

- définir ses propres règles de sécurité flexibles
- restaurer son compte en cas de perte des clés
- partager la sécurité de son compte sur des appareils ou avec des personnes de confiance
- payer les frais de gaz pour quelqu'un d'autre, ou faire payer les vôtres par quelqu'un d'autre
- faire des lots de transaction (par exemple, approuver et exécuter un swap en une seule fois)
- plus de possibilités pour les dApps et les développeurs de portefeuilles d'innover en matière d'expérience utilisateur

Ces avantages ne sont pas pris en charge de manière native aujourd'hui, car seuls les comptes externes ([EOA](/glossary/#eoa)) peuvent initier des transactions. Les EOA sont simplement des paires de clés publiques-privées. Ils fonctionnent comme ceci :

- si vous avez la clé privée, vous pouvez faire _tout ce que vous voulez_ dans le respect des règles de la Machine virtuelle Ethereum (EVM)
- si vous n'avez pas la clé privée, vous ne pouvez _rien_ faire.

Si vous perdez vos clés, il sera impossible de les récupérer. Par ailleurs, les clés volées permettent aux voleurs d'accéder instantanément à tous les fonds disponibles sur un compte.

Les portefeuilles de contrats intelligents sont la solution à ces problèmes, mais ils sont aujourd'hui difficiles à programmer car, en fin de compte, toute logique qu'ils implémentent doit être traduite en un ensemble de transactions EOA avant de pouvoir être traitée par Ethereum. L'abstraction de compte permet aux contrats intelligents d'initier eux-mêmes des transactions, de sorte que toute logique que l'utilisateur souhaite mettre en œuvre peut être codée dans le portefeuille du contrat intelligent lui-même et exécutée sur Ethereum.

Finalement, l'abstraction de compte améliore le support des portefeuilles de contrats intelligents, les rendant plus faciles à développer et plus sûrs à utiliser. Avec l'abstraction de compte, les utilisateurs peuvent profiter de tous les avantages d'Ethereum sans avoir besoin de comprendre la technologie sous-jacente.

## En finir avec les phrases de récupération {#beyond-seed-phrases}

Les comptes d'aujourd'hui sont sécurisés en utilisant des clés privées calculées à partir de phrases de récupération. Toute personne ayant accès à une phrase de récupération peut facilement découvrir la clé privée protégeant un compte et obtenir l'accès à tous les actifs qu'il contient. Si une clé privée et une phrase de récupération sont perdues, les actifs deviennent définitivement inaccessibles. La sécurisation de ces phrases de récupération est compliquée, même pour les utilisateurs expérimentés, et l'hameçonnage de phrases de récupération est l'une des méthodes les plus courantes d'arnaque.

L'abstraction de compte résout cela en utilisant un contrat intelligent pour détenir les actifs et autoriser les transactions. Les contrats intelligents peuvent inclure une logique personnalisée conçue pour une sécurité et une convivialité optimales. Les utilisateurs utilisent toujours des clés privées pour contrôler l’accès, mais avec des mesures de sécurité renforcées.

Par exemple, des clés de secours peuvent être ajoutées à un portefeuille, permettant de remplacer la clé principale en cas de compromission. Chaque clé peut être sécurisée différemment ou répartie entre des personnes de confiance, augmentant ainsi considérablement la sécurité. Des règles supplémentaires du portefeuille peuvent limiter les dégâts en cas d’exposition d’une clé, comme l’exigence de plusieurs signatures pour les transactions de grande valeur ou la restriction des transactions à des adresses de confiance.

## Meilleure expérience utilisateur {#better-user-experience}

L’abstraction de compte améliore considérablement l’expérience utilisateur et la sécurité en prenant en charge les portefeuilles de contrats intelligents au niveau du protocole. Les développeurs peuvent innover librement, en améliorant le regroupement des transactions pour plus de rapidité et d’efficacité. Les échanges simples peuvent devenir des opérations en un clic, ce qui améliore considérablement la facilité d’utilisation.

La gestion du gas s’améliore considérablement. Les applications peuvent payer les frais de gaz des utilisateurs ou autoriser le paiement en tokens autres que l’ETH, éliminant ainsi le besoin de maintenir un solde en ETH.

## Comment l'abstraction des comptes sera-t-elle mise en œuvre ? {#how-will-aa-be-implemented}

Actuellement, les portefeuilles de contrats intelligents sont difficiles à mettre en œuvre car ils reposent sur du code complexe qui enveloppe les transactions standard. Ethereum peut changer cela en permettant aux contrats intelligents d’initier directement des transactions, en intégrant la logique dans les contrats intelligents Ethereum plutôt qu’en s’appuyant sur des relais externes.

### EIP-4337 : Abstraction de compte sans modification du protocole

L’EIP-4337 permet la prise en charge native des portefeuilles de contrats intelligents sans modifier le protocole central d’Ethereum. Il introduit des objets `UserOperation` regroupés en lots de transactions par les validateurs, ce qui simplifie le développement de portefeuilles. Le contrat EntryPoint de l’EIP-4337 a été déployé sur le réseau principal d’Ethereum le 1er mars 2023 et a permis la création de plus de 26 millions de portefeuilles intelligents et 170 millions de UserOperations.

## Progrès actuels {#current-progress}

Dans le cadre de la mise à niveau Pectra d’Ethereum, l’EIP-7702 est prévu pour le 7 mai 2025. L’EIP-4337 a été largement adopté, [avec plus de 26 millions de comptes intelligents déployés et plus de 170 millions de UserOperations traitées](https://www.bundlebear.com/overview/all).

## Complément d'information {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Documentation EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentation EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Tableau de bord d’adoption d’ERC-4337](https://www.bundlebear.com/overview/all)
- [« Route vers l'abstraction de comptes » de Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog de Vitalik sur les portefeuilles de récupération sociale](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Incroyable Abstraction de Comptes](https://github.com/4337Mafia/awesome-account-abstraction)
