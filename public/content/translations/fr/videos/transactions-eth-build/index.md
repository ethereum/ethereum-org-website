---
title: "Transactions — ETH.BUILD"
description: "Une démonstration du fonctionnement des transactions Ethereum à l'aide de l'outil éducatif ETH.BUILD. Découvrez comment les transactions sont construites, signées et envoyées sur le réseau Ethereum."
lang: fr
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transactions"
format: tutorial
author: Austin Griffith
breadcrumb: "Transactions (ETH.BUILD)"
---

Un tutoriel d'**Austin Griffith** démontrant comment fonctionnent les transactions Ethereum à l'aide de l'outil de programmation visuelle ETH.BUILD — couvrant la structure des transactions, les prix du gaz, la signature, la diffusion et le pool de transactions.

*Cette transcription est une copie accessible de la [transcription vidéo originale](https://www.youtube.com/watch?v=er-0ihqFQB0) publiée par Austin Griffith. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Frais de transaction et incitations pour les mineurs (0:00) {#transaction-fees-and-miner-incentives-000}

Aujourd'hui, sur ETH.BUILD, nous allons parler des transactions. Jusqu'à présent, nous avons vu ces transactions être minées dans des blocs, empaquetées dans des blocs et minées dans une chaîne. Nous voulons parler de ce qui incite le mineur — outre la récompense de bloc — à retirer notre transaction du pool et à la placer dans un bloc pour la miner sur la chaîne, par rapport aux autres personnes dans le pool. Il pourrait y avoir des milliers de personnes dans le pool qui font toutes une sorte d'enchère, et cette enchère se fait avec ces frais.

Je pourrais avoir des frais dans ma transaction qui disent « Je suis Alice et j'envoie cinq à Bob, et mon nonce est un pour la protection contre le rejeu. » De plus, quiconque mine cela peut conserver les frais pour lui-même. En gros, Alice envoie cinq à Bob, mais paie également une petite pièce au mineur pour l'ajouter à la chaîne.

#### Anatomie d'une transaction Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

À quoi ressemble une transaction sur Ethereum ? Nous n'aurons plus « Bob » et « Alice » — nous aurons des adresses. La valeur sera en Wei, et non en ETH. Et les frais seront également en Wei.

Plongeons-nous dedans et regardons cette transaction. J'ai un compte avec une phrase mnémonique insérée, et je suis connecté au réseau principal Ethereum. J'exécute également un module pour obtenir des données de prix depuis CoinMarketCap, ce qui me permet de voir que zéro virgule un et quelques ETH correspondent à environ vingt-trois dollars.

#### Configuration de la transaction (2:25) {#setting-up-the-transaction-225}

Ce que je vais faire, c'est créer une transaction et inciter le mineur à la récupérer et à la mettre onchain. J'ai deux personnages — Alice et Bob. Alice va envoyer avec sa clé privée une certaine valeur à Bob. Il n'y a pas de champ d'adresse « from » (de) ici car — rappelez-vous — nous signons et récupérons avec notre paire de clés. La transaction est empaquetée, signée, puis envoyée sur le réseau. Personne ne peut la falsifier, et de l'autre côté, quelqu'un peut la récupérer et découvrir que c'est bien nous qui l'avons signée. L'adresse « from » est dérivée.

#### Stratégie de prix du gaz (4:20) {#gas-price-strategy-420}

Le prix du gaz est défini à environ 4,1 gwei par défaut — soit 4,1 milliards de Wei. Mais nous voulons être plus stratégiques à ce sujet et voir ce qui se passe onchain en ce moment. Nous pouvons voir que le dernier bloc contenait 78 transactions, et que le prix du gaz variait d'environ 5 jusqu'à un certain minimum. En gros, nous devrions être au-dessus de 5 pour être minés dans ce bloc. Fixons donc le prix du gaz à 5,001 — juste un petit peu plus.

#### Conversion en Wei (5:20) {#converting-to-wei-520}

Nous devons faire une conversion en Wei. Sur Ethereum, vous traitez principalement avec deux dénominations : l'ETH, dont les gens parlent normalement, et le Wei, qui est comme une très petite fraction d'ETH. Un gwei — ce que nous utilisons pour les prix du gaz — se situe entre les deux. La raison en est similaire à la raison pour laquelle nous ne nous promenons pas en parlant en fractions de centimes.

Alice a 0,18 ETH, et nous allons envoyer 0,05 ETH à Bob. Nous avons mis un prix du gaz de 5 gwei.

#### Signature et diffusion (7:02) {#signing-and-broadcasting-702}

Lorsqu'Alice choisit de signer la transaction, elle est émise sous forme de transaction signée qui peut traverser le réseau. Personne ne peut la modifier — de l'autre côté, quelqu'un peut déduire que c'est Alice qui l'a signée, et elle contient toutes les informations sur le destinataire et le gaz qui revient au mineur.

Nous prenons cette transaction signée et l'insérons dans la fonction d'envoi du module de la chaîne de blocs. Quand je clique sur envoyer, cela nous donne un hash — le hachage de transaction. En gros, je l'ai envoyée au réseau distribué et ils m'ont renvoyé un hachage de transaction. Elle part sur le réseau, et ensuite il y a ce pool de transactions — des gens qui enchérissent tous pour faire passer leur transaction.

#### Vérification du bloc (8:41) {#checking-the-block-841}

Nous pouvons interroger la chaîne de blocs pour notre transaction. Effectivement, elle a déjà été minée. Nous pouvons regarder le bloc, trier par prix du gaz, et nous trouver. Voici notre transaction au prix du gaz de 5,001 — Alice envoyant à Bob, sans données supplémentaires. Nous y sommes, à environ quatre ou cinq positions du bas.

#### Envoi de données avec une transaction (9:54) {#sending-data-with-a-transaction-954}

Nous sommes capables d'envoyer de la valeur et d'enchérir pour que notre transaction soit reconnue onchain. Mais regardons encore une chose — le champ de données. Nous pouvons envoyer des éléments avec notre transaction. Ce sera en hexadécimal. Alice va envoyer six dollars de plus à Bob, et nous allons joindre un message : « hey Bob ». Nous pouvons voir « hey Bob » converti en hexadécimal.

Nous signons cette transaction, l'envoyons à un mineur, elle part sur le réseau, et nous recevons un hash en retour. Nous attendons qu'elle soit minée, et c'est le cas. Lorsque nous vérifions ce bloc, nous pouvons voir notre transaction avec les données jointes.

#### Pool de transactions et augmentation du gaz (12:43) {#transaction-pool-and-gas-bumping-1243}

Pour une dernière démonstration, j'ai placé une transaction dans le pool avec un prix du gaz très bas — environ 1,001 gwei. Elle reste là, non minée, car nous n'incitons pas suffisamment les mineurs. Nous pouvons voir que la transaction est en attente dans le pool de transactions. Le pool compte entre cent et trois cents transactions, mais les derniers blocs minés montrent que le plus petit prix du gaz est d'environ 5.

Nous devons donc soumettre à nouveau cette transaction — augmentons-la à 10. C'est bien plus que nécessaire, mais nous allons resoumettre la même transaction avec le même nonce, mais un prix du gaz plus élevé. Le réseau se dit « même personne, même transaction, prête à payer plus ». Elle est récupérée et minée dans le bloc suivant.

#### Résumé (14:52) {#summary-1452}

Nous avons envoyé une transaction, nous avons payé du gaz pour inciter le mineur à la mettre dans la chaîne de blocs. Nous avons également envoyé des données avec une transaction — il y a toutes sortes de choses vraiment cool que nous pouvons faire maintenant que nous avons ces données d'appel qui l'accompagnent, et nous aborderons les contrats intelligents et beaucoup de choses amusantes plus tard.