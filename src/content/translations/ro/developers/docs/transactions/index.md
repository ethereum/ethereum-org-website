---
title: Tranzacții
description: O prezentare generală a tranzacțiilor Ethereum – cum funcționează, structura datelor și cum să le trimiți printr-o aplicație.
lang: ro
sidebar: true
isOutdated: true
---

Tranzacțiile sunt instrucțiuni semnate criptografic din conturi. Un cont va iniția o tranzacție pentru a actualiza starea rețelei Ethereum. Cea mai simplă tranzacție este transferarea de ETH dintr-un cont în altul.

## Condiții prealabile {#prerequisites}

Pentru a te ajuta să înțelegi mai bine această pagină, îți recomandăm să citești mai întâi [Conturi](/developers/docs/accounts/) și [introducerea noastră în Ethereum](/developers/docs/intro-to-ethereum/).

## Ce este o tranzacție? {#whats-a-transaction}

O tranzacție Ethereum se referă la o acțiune inițiată de un cont deținut din exterior, cu alte cuvinte un cont gestionat de o persoană, nu de un contract. De exemplu, dacă Bob trimite lui Alice 1 ETH, contul lui Bob, trebuie debitat, iar cel al lui Alice trebuie creditat. Această acțiune care schimbă starea, are loc în cadrul unei tranzacții.

![Diagramă care arată o tranzacție care cauzează modificarea stării](../../../../../developers/docs/nodes-and-clients/tx.png) _Diagrama adaptată din [EVM Ethereum ilustrată](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Tranzacțiile, care schimbă starea EVM, trebuie difuzate către întreaga rețea. Orice nod poate difuza o cerere, pentru ca o tranzacție să fie executată pe EVM; după aceasta, un miner va executa tranzacția și va propaga modificarea stării rezultate către restul rețelei.

Tranzacțiile trebuie să fie taxate și trebuie minate pentru a deveni valabile. Pentru a simplifica această prezentare generală, vom acoperi taxele pe gaz și exploatarea în altă parte.

O tranzacție trimisă include următoarele informații:

- `recipient` – adresa de primire (dacă este un cont deținut extern, tranzacția va transfera valoarea. Dacă este un cont de contract, tranzacția va executa codul contractului)
- `signature` – identificatorul expeditorului. Aceasta se generează atunci când cheia privată a expeditorului semnează tranzacția și confirmă că expeditorul a autorizat această tranzacție
- `value` – cantitatea de ETH de transferat de la expeditor la destinatar (în WEI, o denominație a ETH)
- `data` – câmp opțional pentru a include date arbitrare
- `gasLimit` – cantitatea maximă de unități de gaz care pot fi consumate de tranzacție. Unitățile de gaz reprezintă pași de calcul
- `gasPrice` – taxa pe care expeditorul o plătește pe unitatea de gaz

Gazul este o referință la calculul necesar procesării tranzacției de către un miner. Utilizatorii trebuie să plătească o taxă pentru acest calcul. `gasLimit` și `gasPrice` determină taxa maximă de tranzacție plătită minerului. [Mai multe despre gaz](/developers/docs/gas/).

Obiectul tranzacției va arăta astfel:

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

Dar un obiect de tranzacție trebuie să fie semnat, folosind cheia privată a expeditorului. Acest lucru demonstrează că tranzacția ar fi putut proveni doar de la expeditor și nu a fost trimisă în mod fraudulos.

Un client Ethereum precum Geth se va ocupa de acest proces de semnare.

Exemplu de apel [JSON-RPC](https://eth.wiki/json-rpc/API):

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

Exemplu de răspuns:

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

- `raw` este tranzacția semnată în formă codificată cu Prefix de lungime recursivă (RLP)
- `tx` este tranzacția semnată în formă JSON

Cu hash-ul semnăturii, tranzacția poate fi dovedită criptografic că a venit de la expeditor și a fost trimisă rețelei.

### Despre gaz {#on-gas}

După cum s-a menționat, tranzacțiile costă [gaz](/developers/docs/gas/) pentru a fi executate. Tranzacțiile de transfer simple necesită 21.000 de unități de Gaz.

Deci, pentru ca Bob să îi trimită lui Alice 1 ETH la un `gasPrice` de 200 Gwei, el va trebui să plătească următoarea taxă:

```
200*21.000 = 4.200.000 GWEI
--sau--
0,0042 ETH
```

Contul lui Bob va fi debitat ** – 1,0042 ETH**

Contul lui Alice va fi creditat ** + 1,0 ETH**

Minerul care procesează tranzacția va primi ** + 0,0042 ETH**

Gazul este necesar și pentru orice interacțiune cu contractul inteligent.

![Diagramă care arată modul în care este rambursat gazul neutilizat](../../../../../developers/docs/transactions/gas-tx.png) _Diagramă adaptată din [EVM Ethereum ilustrat ](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Orice gaz neutilizat într-o tranzacție este rambursat în contul utilizatorului.

## Ciclul de viață al tranzacției {#transaction-lifecycle}

Odată ce tranzacția a fost trimisă, se întâmplă următoarele:

1. Odată ce trimiți o tranzacție, criptografia generează un hash de tranzacție: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. Tranzacția este apoi transmisă în rețea și inclusă într-un grup (temporar) cu ​​multe alte tranzacții.
3. Un miner trebuie să aleagă tranzacția ta și să o includă într-un bloc pentru a o verifica și a o considera „reușită”.
   - S-ar putea să aștepți în această etapă dacă rețeaua este ocupată și minerii nu sunt în măsură să țină pasul. Minerii vor acorda întotdeauna prioritate tranzacțiilor cu `GASPRICE` mai mare, deoarece vor păstra taxele.
4. Tranzacția ta va primi, de asemenea, un număr de confirmare a blocului. Acesta este numărul de blocuri create de la blocul în care a fost inclusă tranzacția. Cu cât numărul este mai mare, cu atât este mai mare certitudinea, că tranzacția a fost procesată și recunoscută de rețea. Acest lucru se datorează faptului că uneori este posibil ca blocul în care a fost inclusă tranzacția ta să nu fi intrat în lanț.
   - Cu cât numărul de confirmare a blocului este mai mare, cu atât tranzacția este mai imuabilă. Deci, pentru tranzacțiile cu valoare mai mare, pot fi dorite mai multe confirmări de bloc.

## O demonstrație vizuală {#a-visual-demo}

Privește cum Austin te ghidează prin tranzacții, gaz și minerit.

<YouTube id="er-0ihqFQB0" />

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Conturi](/developers/docs/accounts/)
- [Mașină virtuală Ethereum (EVM)](/developers/docs/evm/)
- [Gaz](/developers/docs/gas/)
- [Minarea](/developers/docs/consensus-mechanisms/pow/mining/)
