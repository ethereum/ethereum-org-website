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

Les utilisateurs interagissent sur Ethereum en utilisant des **[ comptes détenus en externe (EOA)](/glossary/#eoa)**. C'est la seule façon de démarrer une transaction ou d'exécuter un contrat intelligent. Ce qui restreint la façon dont les utilisateurs peuvent interagir sur Ethereum. Par exemple, il est difficile d'exécuter des lots de transactions si les utilisateurs ne disposent pas d'un solde d'ETH suffisant pour couvrir les frais de gaz.

L'abstraction de compte est un moyen de résoudre ces problèmes car elle offre aux utilisateurs plus de flexibilité et donc plus de sécurité pour une meilleure expérience avec leur compte. Cela peut se produire en [mettant à niveau les EOA](https://eips.ethereum.org/EIPS/eip-3074) afin qu'ils puissent être contrôlés par des contrats intelligents, ou en [ mettant à niveau les contrats intelligents](https://eips.ethereum.org/EIPS/eip-2938) pour qu'ils puissent initier des transactions. Ces deux options nécessitent des modifications du protocole Ethereum. Il existe également une troisième voie qui consiste à ajouter un [second système de transaction distinct](https://eips.ethereum.org/EIPS/eip-4337) fonctionnant parallèlement au protocole existant. Indépendamment du procédé, le résultat est l'accès à Ethereum via des portefeuilles de contrats intelligents, soit nativement pris en charge par le protocole existant, soit par l'intermédiaire d'un réseau de transactions complémentaires.

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

Finalement, l'abstraction de compte améliore le support des portefeuilles de contrats intelligents, les rendant plus faciles à développer et plus sûrs à utiliser. En fin de compte, avec l'abstraction de compte, les utilisateurs peuvent profiter de tous les avantages d'Ethereum sans avoir besoin de connaître ou de se soucier de la technologie sous-jacente.

## En finir avec les phrases de récupération {#beyond-seed-phrases}

Les comptes d'aujourd'hui sont sécurisés en utilisant des clés privées calculées à partir de phrases de récupération. Toute personne ayant accès à une phrase de récupération peut facilement découvrir la clé privée protégeant un compte et gagner l'accès à tous les actifs qu'il contient. Si une clé privée et une phrase de récupération sont perdues, elles ne pourront jamais être récupérées et les actifs qu'elles contrôlent seront figés à jamais. La sécurisation de ces phrases de récupération est compliquée, même pour les utilisateurs expérimentés, et l'hameçonnage de phrases de récupération est l'une des méthodes les plus courantes utilisées pour arnaquer les utilisateurs.

L'abstraction de compte résoudra ce problème en utilisant un contrat intelligent pour détenir les actifs et autoriser les transactions. Ces contrats intelligents peuvent ensuite être agrémentés de logiques personnalisées pour les rendre aussi sécurisés et adaptés à l'utilisateur que possible. Au bout du compte, vous utiliserez toujours des clés privées pour contrôler l'accès à votre compte, mais avec des filets de sécurité qui les rendront plus faciles et plus sûres à gérer.

Par exemple, des clés de secours peuvent être ajoutées à un portefeuille afin que si vous perdiez ou exposiez accidentellement votre clé principale, elle puisse être remplacée par une nouvelle clé sécurisée de secours. Vous pourriez sécuriser chacune de ces clés différemment ou les répartir entre des gardiens de confiance. Cela rend beaucoup plus difficile pour un voleur de prendre le contrôle total de vos fonds. De même, vous pouvez ajouter des règles au portefeuille pour réduire l'impact en cas de compromission de votre clé principale, par exemple vous pourriez autoriser les transactions de faible valeur à être vérifiées par une seule signature, tandis que les transactions de plus grande valeur nécessitent l'approbation de plusieurs signataires authentifiés. Il existe d'autres moyens par lesquels les portefeuilles de contrats intelligents peuvent vous aider à déjouer les voleurs, par exemple, une liste de confiance peut être utilisée pour bloquer toutes les transactions à moins qu'elles ne soient destinées à une adresse de confiance ou vérifiées par plusieurs de vos clés pré-approuvées.

### Exemples de logiques de sécurité pouvant être intégrées dans un portefeuille de contrat intelligent :

- **Autorisation multi-signatures**: vous pouvez partager les identifiants d'autorisation entre plusieurs personnes ou appareils de confiance. Alors, le contrat peut être configuré de telle sorte que les transactions d'une valeur supérieure à une certaine valeur prédéfinie nécessitent l'autorisation d'une certaine proportion (par exemple 3/5) des parties de confiance. Par exemple, les transactions de valeur élevée pourraient nécessiter l'approbation à la fois d'un appareil mobile et d'un portefeuille matériel, ou les signatures de comptes distribués à des membres de la famille de confiance.
- **Gel de compte** : si un appareil est perdu ou compromis, le compte peut être verrouillé depuis un autre appareil autorisé, protégeant ainsi les actifs de l'utilisateur.
- **Récupération de compte** : vous avez perdu un appareil ou oublié un mot de passe ? Dans le paradigme actuel, cela signifie que vos actifs pourraient être gelés à jamais. Avec un portefeuille de contrats intelligents, vous pouvez mettre en place une liste de confiance des comptes pouvant autoriser de nouveaux appareils ou réinitialiser les accès.
- **Définir des limites de transaction**: Spécifiez des seuils quotidiens pour la valeur maximale pouvant être transférée depuis le compte par jour/semaine/mois. Cela signifie que si un attaquant prend le contrôle de votre compte, il ne pourra pas tout vider d'un coup, et vous aurez l'occasion de geler et de réinitialiser l'accès.
- **Créer une liste de confiance** : N'autoriser les transactions qu'à une liste restreinte d'adresses que vous savez sûres. Cela signifie que _même si_ votre clé privée était volée, l'attaquant ne pourrait envoyer des fonds qu'à des comptes de destination faisant partie de votre liste. Ces listes des adresses autorisées nécessiteraient plusieurs signatures pour être modifiées, de sorte qu'un attaquant ne pourrait pas ajouter sa propre adresse à la liste à moins d'avoir accès à plusieurs de vos clés de sauvegarde.

## Meilleure expérience utilisateur {#better-user-experience}

L'abstraction de compte permet une **meilleure expérience utilisateur globale** ainsi qu'une **sécurité améliorée** car elle ajoute la prise en charge des portefeuilles de contrats intelligents. au niveau du protocole. La raison la plus importante est que cela offrira aux développeurs de contrats intelligents, de portefeuilles et d’applications beaucoup plus de liberté pour innover en matière d’expérience utilisateur d’une manière que nous ne pouvons peut-être pas encore anticiper. Quelques améliorations évidentes qui accompagneront l'abstraction de compte incluent le regroupement des transactions pour plus de rapidité et d'efficacité. Par exemple, un simple échange devrait être une opération en un clic, mais aujourd'hui, il faut signer plusieurs transactions pour approuver les dépenses de chaque jeton individuellement avant que l'échange ne soit exécuté. L'abstraction de compte élimine cette friction en autorisant le regroupement des transactions. De plus, la transaction groupée pourrait approuver précisément la bonne valeur de jetons requise pour chaque transaction, puis révoquer les approbations après la finalisation de la transaction, offrant ainsi une sécurité supplémentaire.

La gestion du gaz est également nettement améliorée grâce à l'abstraction de comptes. Non seulement les applications peuvent proposer de payer les frais de gaz de leurs utilisateurs, mais les frais de gaz peuvent être payés en jetons autres que l'ETH, ce qui évite aux utilisateurs d'avoir à maintenir un solde d'ETH pour financer les transactions. Cela fonctionnerait en échangeant les jetons de l'utilisateur contre de l'ETH à l'intérieur du contrat, puis en utilisant l'ETH pour payer le gaz.

<ExpandableCard title="Comment l'abstraction de comptes peut-elle être utile pour le gaz ?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

La gestion du gaz est l'une des principales frictions pour les utilisateurs d'Ethereum, principalement parce que l'ETH est le seul actif qui peut être utilisé pour payer les transactions. Imaginez que vous ayez un portefeuille avec un solde d'USDC, mais pas d'ETH. Vous ne pouvez pas déplacer ou échanger ces jetons USDC parce que vous ne pouvez pas payer le gaz. Vous ne pouvez pas non plus échanger l'USDC contre de l'ETH, car cela coûte du gaz. Pour résoudre le problème, vous devez envoyer plus d'ETH sur votre compte à partir d'un échange ou d'une autre adresse. Avec les portefeuilles de contrats intelligents, vous pouvez simplement payer le gaz en USDC à la place, libérant ainsi votre compte. Vous n'avez plus besoin de conserver un solde d'ETH sur tous vos comptes.

L'abstraction de comptes permet également aux développeurs de DApp de faire preuve de créativité en matière de gestion du gaz. Par exemple, vous pourriez commencer à payer à votre DEX préféré un montant fixe chaque mois pour un nombre illimité de transactions. Les DApps peuvent vous proposer de payer tous vos frais de gaz en votre nom en guise de récompense pour l'utilisation de leur plateforme, ou en tant qu'offre de démarrage. Il sera beaucoup plus facile pour les développeurs d'innover dans le domaine du gaz lorsque les portefeuilles de contrats intelligents seront pris en charge au niveau du protocole.

</ExpandableCard>

Les sessions de confiance sont aussi susceptibles de transformer l'expérience utilisateur, en particulier pour des applications comme les jeux, où un grand nombre de petites transactions doivent être approuvées dans un court laps de temps. L'approbation individuelle de chaque transaction perturberait l'expérience du jeu, mais l'approbation permanente n'est pas sécurisée. Un portefeuille de contrats intelligents, pourrait approuver certaines transactions lors d'un temps fixe jusqu'à une certaine valeur spécifique, ou seulement vers certaines adresses.

Il est également intéressant de réfléchir à la manière, dont les achats pourraient évoluer avec l’abstraction du compte. Aujourd'hui, chaque transaction doit être approuvée et exécutée depuis un portefeuille préfinancé avec une quantité suffisante du bon jeton. Grâce à l'abstraction des comptes, l'expérience pourrait ressembler davantage aux achats en ligne habituels, où l'utilisateur remplit un « panier » d'articles et clique une seule fois pour les acheter en même temps, avec toute la logique requise étant assurée par le contrat, non par l'utilisateur.

Ce ne sont là que quelques exemples, de la manière dont l’expérience utilisateur pourrait être améliorée grâce à l’abstraction des comptes, mais il y en a bien d’autres que nous n’avons pas encore imaginés. L'abstraction de compte libère les développeurs des contraintes des EOA actuels, leur permet d'intégrer les bons aspects du web2 dans le web3 sans sacrifier leur propre sécurité, et pirater de manière créative de nouvelles expériences utilisateur inventives.

## Comment l'abstraction des comptes sera-t-elle mise en œuvre ? {#how-will-aa-be-implemented}

Aujourd'hui, les portefeuilles de contrats intelligents existent mais sont difficiles à mettre en œuvre car l'EVM ne les prend pas en charge. À la place, ils s’appuient sur un code relativement complexe autour des transactions standard d'Ethereum. Ethereum peut changer cela en permettant aux contrats intelligents d'initier des transactions, adoptant une logique nécessaire dans les contrats intelligents d'Ethereum plutôt que hors chaîne. L'addition de logique dans les contrats intelligents augmente également la décentralisation d'Ethereum, car elle élimine le besoin de « relais » gérés par les développeurs de portefeuilles, pour traduire les messages signés par l'utilisateur lors des transactions régulières Ethereum.

<ExpandableCard title="EIP-2771 : abstraction de comptes à l'aide de méta-transactions" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

L'EIP-2771 introduit le concept de méta-transactions qui permettent à des tiers de payer les frais de gaz d'un utilisateur sans modifier le protocole Ethereum. L'idée est que les transactions signées par un utilisateur sont envoyées à un contrat "Forwarder". Le forwarder est une entité de confiance qui vérifie que les transactions sont valides avant de les transmettre à un relais de gaz. C'est fait hors chaîne, ce qui évite d'avoir à payer du gaz. Le relais de gaz transmet la transaction à un contrat « Destinataire », qui paie le gaz nécessaire pour que la transaction puisse être exécutée sur Ethereum. La transaction est exécutée si le « Forwarder » est connu du « Destinataire » et lui fait confiance. Ce modèle facilite la mise en œuvre par les développeurs de transactions sans gaz pour les utilisateurs.

</ExpandableCard>

<ExpandableCard title="EIP-4337 : abstraction de compte sans changer le protocole Ethereum" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

L'EIP-4337 est la première étape vers la prise en charge native des portefeuilles de contrats intelligents de manière décentralisée <em>sans nécessiter de modifications du protocole Ethereum</em>. Au lieu de modifier la couche de consensus pour prendre en charge les portefeuilles de contrats intelligents, un nouveau système est ajouté séparément à la transaction normale du « gossip protocol ». Ce système de haut niveau s'articule autour d'un nouvel objet appelé <code>UserOperation</code> qui regroupe les actions d'un utilisateur et les signatures correspondantes. Ces <code>UserOperation</code> soulèvent une objection puis sont diffusés dans un pool de mémoire dédié, où les validateurs peuvent les collecter dans une « transaction groupée ». La transaction groupée représente une séquence de nombreuses <code>UserOperations</code> individuelles, et peut être incluse dans les blocs d'Ethereum tout comme une transaction normale, et serait récupérée par les validateurs en utilisant un modèle de sélection similaire maximisant les frais.

Le fonctionnement des portefeuilles changerait également avec l'EIP-4337. Au lieu que chaque portefeuille réimplémente une logique de sécurité commune mais complexe, ces fonctions seraient externalisées vers un contrat de portefeuille global, plus connu sous le nom de &quot;point d'entrée&quot;. Cela permettrait de gérer des opérations telles que le paiement des frais et l'exécution du code EVM, afin que les développeurs de portefeuilles puissent se concentrer sur la fourniture d'excellentes expériences utilisateurs.

<strong>Il est à noter</strong> que le contrat de point d'entrée EIP 4337, a été déployé sur le réseau principal Ethereum le 1er mars 2023. Vous pouvez voir le contrat sur<a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938 : modification du protocole Ethereum pour soutenir l'abstraction de comptes" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> vise à mettre à jour le protocole Ethereum en introduisant un nouveau type de transaction : <code>AA_TX_TYPE</code> qui comprend trois champs : <code>nonce</code>, <code>cible</code> et <code>data</code>, où <code>nonce</code> est un compteur de transactions, <code>cible</code> est l'adresse du contrat du point d'entrée et <code>données</code> est le bytecode EVM. Pour exécuter ces transactions, deux nouvelles instructions (appelées opcodes) doivent être ajoutées à l'EVM : <code>NONCE</code> et <code>PAYGAS</code>. L'opcode <code>NONCE</code> suit la séquence de transaction et <code>PAYGAS</code> calcule puis retire le gaz nécessaire à l'exécution de la transaction du &#39;s solde du contrat. Ces nouvelles fonctionnalités permettent à Ethereum de prendre en charge les portefeuilles de contrats intelligents de manière native, car l’infrastructure nécessaire est intégrée au protocole Ethereum.&#39;.

Notez qu'EIP-2938 n'est actuellement pas actif. La communauté favorise actuellement EIP-4337 car il ne nécessite pas de modification du protocole.

</ExpandableCard>

<ExpandableCard title="EIP-3074 : mise à niveau des comptes EOA pour l'abstraction de comptes" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

L'<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> vise à mettre à jour les comptes externes d'Ethereum&#39;s en leur permettant de déléguer le contrôle à un contrat intelligent. Cela signifie que la logique des contrats intelligents pourrait approuver les transactions provenant d’un EOA. Cela permettrait des fonctionnalités telles que le parrainage du gaz et les transactions groupées. Pour que cela fonctionne, deux nouveaux opcodes doivent être ajoutés à l'EVM : <code>AUTH</code> et <code>AUTHCALL</code>. Avec EIP-3074, les avantages d'un portefeuille de contrats intelligents sont rendus disponibles <em>sans avoir besoin de contrat</em> - à la place, un type spécifique de contrat sans état, dénué de confiance et non-évolutif, aussi connu sous le nom « d'appelant », gère les transactions.

Notez qu'EIP-3074 n'est pas actif actuellement. La communauté favorise actuellement EIP-4337 car il ne nécessite pas de modification du protocole.

</ExpandableCard>

## Progrès actuels {#current-progress}

Des portefeuilles de contrats intelligents sont déjà disponibles, mais d'autres améliorations sont nécessaires pour les rendre aussi décentralisés et sans autorisation que possible. L'EIP-4337 est une proposition mûre qui ne nécessite aucune modification du protocole Ethereum, il est donc possible qu'elle soit mise en œuvre rapidement. Toutefois, les mises à jour qui modifient le protocole d'Ethereum ne sont actuellement pas en cours de développement actif, de sorte que ces changements peuvent prendre beaucoup plus de temps à être déployés. Il est également possible que l'abstraction des comptes soit suffisamment bien réalisée par l'EIP-4337 pour qu'aucun changement de protocole ne soit jamais nécessaire.

## Complément d'information {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Débat sur l'abstraction des comptes à Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- ["Pourquoi l'abstraction de compte est une innovation majeure pour les dapps" - Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- [« L'abstraction de compte, ELI5 » - Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Les notes de Vitalik sur la « Route vers l'abstraction de comptes »](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Article de blog de Vitalik sur les portefeuilles à récupération sociale](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Notes EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Documentation EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Notes EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Documentation EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentation EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- [« Les bases de l'abstraction de comptes » -- Qu'est-ce que l'abstraction de comptes ? Partie 1](https://www.alchemy.com/blog/account-abstraction)
