---
title: Conturi Ethereum
description: O explicație a conturilor Ethereum – structurile lor de date și relația lor cu criptografia perechii de chei.
lang: ro
sidebar: true
---

Un cont Ethereum este o entitate cu un sold de eter (ETH) care poate trimite tranzacții pe Ethereum. Conturile pot fi controlate de utilizator sau implementate sub formă de contracte inteligente.

## Condiții prealabile {#prerequisites}

Conturile sunt un subiect foarte potrivit pentru începători. Dar pentru a înțelege mai bine această pagină, îți recomandăm să citești mai întâi [introducerea în Ethereum](/en/developers/docs/intro-to-ethereum/).

## Tipuri de conturi {#types-of-account}

Ethereum are două tipuri de conturi:

- Deținute extern – controlate de oricine are o cheie privată
- Contractuale – contracte inteligente implementate în rețea, controlate prin cod. Informații despre [contractele inteligente](/en/developers/docs/smart-contracts/)

Ambele tipuri de conturi au capacitatea de a:

- Primi, menține și trimite ETH și tokenuri
- Interacționa cu contracte inteligente implementate

### Diferențe cheie {#key-differences}

**Cele deținute extern**

- Crearea unui cont nu costă nimic
- Pot iniția tranzacții
- Tranzacțiile între conturile deținute extern nu pot fi decât transferuri de ETH

**Cele contractuale**

- Crearea unui cont are un cost, deoarece utilizezi stocarea în rețea
- Pot trimite tranzacții numai ca răspuns la primirea unei tranzacții
- Tranzacțiile dintr-un cont deținut extern într-un cont contractual pot declanșa coduri care pot executa mai multe acțiuni diferite, cum ar fi transferul de tokenuri sau chiar crearea unui nou contract

## Analizarea unui acont {#an-account-examined}

Conturile Ethereum au patru câmpuri:

- `nonce` – un contor care indică numărul de tranzacții trimise din cont. Acest lucru asigură că tranzacțiile sunt procesate o singură dată. În cazul în care contul este un cont contractual, nonce este numărul de contracte create de cont
- `sold` – numărul de Wei deținut de această adresă. Wei este cea mai mică unitate de ETH și există 1e+18 Wei per ETH.
- `codeHash` – Toate aceste fragmente de cod sunt conținute în baza de date de stare sub hash-urile corespunzătoare pentru recuperarea ulterioară. Pentru conturile contractuale, acesta este codul care este hash-at și stocat precum codeHash. Pentru conturile deținute extern, câmpul codeHash este hash-ul șirului gol.
<!--this hash refers to the code of this account on the Ethereum virtual machine (EVM). This EVM code gets executed if the account gets a message call. It cannot be changed unlike the other account fields.  -->
- `storageRoot` – Uneori cunoscut sub numele de hash de stocare. Un hash de 256 biți al nodului rădăcină al unui arbore Merkle Patricia, care codează conținutul stocării contului (o mapare între valori întregi de 256 biți). Acesta schimbă formatul hash al cheilor de codificare din trie de la Keccat la RLP (Recursive Length Prefix), ambele 256 biți valori întregi. Acest arbore codifică hash-ul conținutului stocării acestui cont și este gol în mod implicit.

![O diagramă care arată structura unui cont](../../../../../developers/docs/accounts/accounts.png) _Diagramă adaptată din [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Conturi deținute extern și perechi de chei {#externally-owned-accounts-and-key-pairs}

Un cont este format dintr-o pereche de chei criptografice: publice și private. Acestea ajută la demonstrarea faptului că o tranzacție a fost semnată de expeditor și previne falsurile. Cheia privată este cea pe care o folosești la semnarea tranzacțiilor, deci îți acordă custodia fondurilor asociate contului tău. Nu deții niciodată criptomonede, deții chei private – fondurile sunt întotdeauna în registrul Ethereum.

Acest lucru împiedică actorii rău intenționați să transmită tranzacții false, deoarece poți verifica întotdeauna expeditorul unei tranzacții.

Dacă Alice dorește să trimită eter din propriul cont în contul lui Bob, Alice trebuie să creeze o cerere de tranzacție și să o trimită în rețea pentru verificare. Utilizarea de către Ethereum a criptografiei cu cheie publică asigură că Alice poate dovedi că ea este cea care a inițiat cererea de tranzacție. Fără mecanisme criptografice, Eva, un adversar rău intenționat, ar putea transmite public o cerere care ar arată astfel „trimiteți 5 ETH din contul lui Alice în contul Evei” și nimeni nu ar putea verifica dacă a venit sau nu de la Alice.

## Crearea unui cont {#account-creation}

Când dorești să creezi un cont, majoritatea bibliotecilor îți vor genera o cheie privată aleatorie.

O cheie privată este formată din 64 de caractere hexadecimale și poate fi criptată cu o parolă.

Exemplu:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Cheia publică este generată din cheia privată utilizând Algoritmul de Semnătura Digitală cu Curbă Eliptică (ECSDA). Obții o adresă publică pentru contul tău luând ultimii 20 de octeți ai cheii publice și adăugând `0x` la început.

Iată un exemplu de creare a unui cont în consolă, utilizând codul GETH `personal_newAccount`

```go
> personal.newAccount()
Fraza-parolă:
Repetă fraza-parolă:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[Documentația GETH](https://geth.ethereum.org/docs)

Poți obține chei publice noi dintr-o cheie privată, dar nu poți obține o cheie privată din chei publice. De aceea este vital să-ți păstrezi cheia privată în siguranță și, așa cum sugerează și numele, **PRIVATĂ**.

Ai nevoie de o cheie privată pentru a semna mesaje și tranzacții care emit o semnătură. Alții pot lua apoi semnătura pentru a obține cheia ta publică, dovedind că ești autorul mesajului. În aplicația tale, poți utiliza o bibliotecă JavaScript pentru a trimite tranzacții către rețea.

<!-- **WEB3JS example**

```jsx
web3.eth.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
> "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
```

[Web3js documentation](https://web3js.readthedocs.io/)

[code for creating an account in JS?] + links to how to do it in other languages maybe?

`$ geth account new` -->

## Conturi contractuale {#contract-accounts}

Conturile contractuale au, de asemenea, o adresă hexadecimală de 42 de caractere:

Exemplu:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Adresa contractului este de obicei dată când un contract este implementat în Blockchain-ul Ethereum. Adresa provine de la adresa creatorului și de la numărul de tranzacții trimise de la acea adresă or contracte create de cont („nonce”).

<!-- @Sam Richards is there a line of code you can use to return your contract's address – in the same way that we have personal.newAccount() above? – Don't know if what I found below is helpful?

```jsx
ethers.utils.getContractAddress( transaction ) ⇒ string< Address >
```

TODO: add a contract address example-->

<!-- ## Managing an account

Most users will want to interact with their account via a wallet. Note that an account is not a wallet. A wallet is the keypair associated with a user-owned account, which allow a user to make transactions from or manage the account

For dapp development, you'll want access to dummy accounts with test ETH so you can experiment. When you create a local chain, you'll get test accounts wth fake ETH which you can then import using MetaMask and use on your dapp's frontend. -->

## O notă despre portofele {#a-note-on-wallets}

Un cont nu este un portofel. Un portofel este perechea de chei asociată unui cont deținut de utilizator, care îi permite utilizatorului să efectueze tranzacții sau să gestioneze contul.

## Referințe suplimentare {#further-reading}

_Cunoști o resursă comunitară care te-a ajutat? Editează această pagină și adaug-o!_

## Subiecte corelate {#related-topics}

- [Contracte inteligente](/en/developers/docs/smart-contracts/)
- [Tranzacții](/en/developers/docs/transactions/)
