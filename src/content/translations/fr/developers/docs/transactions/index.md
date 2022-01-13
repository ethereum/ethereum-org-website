---
title: Transactions
description: "Présentation des transactions Ethereum : leur fonctionnement, leur structure de données et comment les envoyer via une application."
lang: fr
sidebar: true
isOutdated: true
---

Les transactions sont des instructions signées cryptographiquement depuis des comptes. Un compte va initier une transaction pour mettre à jour l'état du réseau Ethereum. La transaction la plus simple consiste à transférer de l'ETH d'un compte à un autre.

## Prérequis {#prerequisites}

Pour vous aider à mieux comprendre cet article, nous vous recommandons de commencer par lire les pages [Comptes](/developers/docs/accounts/) et [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce qu'une transaction ? {#whats-a-transaction}

Une transaction Ethereum est une action initiée par un compte externe, c'est-à-dire un compte géré par un être humain et non par un contrat. Par exemple, si Marc envoie 1 ETH à Alice, le compte de Marc doit être débité et celui d'Alice doit être crédité. Cette action, qui modifie l'état, se produit dans le cadre d'une transaction.

![Diagramme montrant un changement d'état de cause de la transaction](../../../../../developers/docs/transactions/tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Les transactions, qui modifient l'état de l'EVM, doivent être diffusées sur l'ensemble du réseau. N'importe quel nœud peut diffuser une demande pour qu'une transaction soit exécutée sur l'EVM. Un mineur exécutera ensuite la transaction et propagera au reste du réseau le changement d'état qui en résultera.

Les transactions génèrent des frais et doivent être minées pour devenir valides. Pour simplifier cette présentation, nous couvrirons les frais de carburant et le minage dans un autre article.

Une transaction soumise comprend les informations suivantes :

- `recipient` : Adresse de réception (S'il s'agit d'un compte externe, la transaction va transférer la valeur. S'il s'agit d'un compte de contrat, la transaction exécutera le code du contrat.)
- `signature` : Identifiant de l'expéditeur. Cette signature est générée lorsque la clé privée de l'expéditeur signe la transaction, et confirme que l'expéditeur a autorisé cette transaction.
- `value` : Quantité d'ETH à transférer de l'expéditeur au destinataire (en WEI, une dénomination de l'ETH).
- `data` : Champ facultatif pour inclure des données arbitraires.
- `gasLimit` : Quantité maximum d’unités de carburant pouvant être consommée par la transaction. Les unités de carburant représentent les étapes de calcul.
- `gasPrice` : Les frais que l’expéditeur paye par unité de carburant

Le carburant est une référence au calcul nécessaire au traitement de la transaction par un mineur. Les utilisateurs doivent payer des frais pour ce calcul. Les paramètres `gasLimit` et `gasPrice` déterminent les frais de transaction maximum payés au mineur. [Plus d'infos sur le carburant](/developers/docs/gas/)

L'objet de transaction ressemblera un peu à ceci :

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  gasPrice: "200",
  nonce: "0",
  value: "10000000000",
}
```

Un objet de transaction doit être signé avec la clé privée de l'expéditeur. Cela prouve que la transaction ne pouvait venir que de l'expéditeur et n'a pas été envoyée de façon frauduleuse.

Un client Ethereum comme Geth gérera ce processus de signature.

Exemple d'appel [JSON-RPC](https://eth.wiki/json-rpc/API) :

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "gasPrice": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Exemple de réponse :

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "gasPrice": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` est la transaction signée sous forme de préfixe de longueur récursive (RLP)
- `tx` est la transaction signée sous la forme JSON

Grâce au hachage de la signature, il est possible de prouver de façon cryptographique que la transaction provient de l'expéditeur et qu'elle a été soumise au réseau.

### À propos du carburant {#on-gas}

Comme mentionné, les transactions ont un coût en [carburant](/developers/docs/gas/) pour être exécutées. Les transactions de transfert simples requièrent 21 000 unités de carburant.

Pour que Marc envoie 1 ETH à Alice à un `gasPrice` de 200 GWEI, il devra payer les frais suivants :

```
200*21 000 = 4 200 000 GWEI
--ou--
0,0042 ETH
```

Le compte de Marc sera débité de **-1,0042 ETH**.

Celui d'Alice sera crédité de **+1,0 ETH**.

Le mineur traitant la transaction recevra **+0,0042 ETH**.

Du carburant est également requis pour toute interaction avec un contrat intelligent.

![Diagramme montrant comment le carburant inutilisé est remboursé](../../../../../developers/docs/transactions/gas-tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Tout carburant non utilisé dans une transaction est remboursé sur le compte de l'utilisateur.

## Cycle de vie des transactions {#transaction-lifecycle}

Voici ce qui se passe une fois qu'une transaction a été soumise :

1. Quand vous envoyez une transaction, la cryptographie génère un hash de transaction : `0x97d99bc77292111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. La transaction est ensuite diffusée sur le réseau et incluse dans un groupe comportant de nombreuses autres transactions.
3. Un mineur doit sélectionner votre transaction et l'inclure dans un bloc pour la vérifier et la considérer comme "réussie".
   - Il peut exister un délai d'attente à ce stade quand le réseau est occupé et que les mineurs ne sont pas en mesure de suivre. Les mineurs donnent toujours la priorité aux transactions dont le `GASPRICE` est élevé, car ils gardent le montant des frais.
4. Votre transaction recevra également un numéro de confirmation de bloc. Il s'agit du nombre de blocs créés depuis le bloc dans lequel votre transaction a été incluse. Plus le nombre est élevé, plus la certitude que la transaction a été traitée et reconnue par le réseau est grande. En effet, il arrive que le bloc dans lequel votre transaction était incluse n'ait pas été intégré à la chaîne.
   - Plus le numéro de confirmation de bloc est grand, plus la transaction est immuable. Ainsi, pour les transactions de grande valeur, un plus grand nombre de confirmations de blocs peut être souhaité.

## Démonstration visuelle {#a-visual-demo}

Regardez Austin vous guider à travers les transactions, le carburant et le minage.

<YouTube id="er-0ihqFQB0" />

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Comptes](/developers/docs/accounts/)
- [Machine virtuelle Ethereum (EVM)](/developers/docs/evm/)
- [Carburant](/developers/docs/gas/)
- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
