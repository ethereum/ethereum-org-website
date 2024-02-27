---
title: Conturile Ethereum
description: O explicație a conturilor Ethereum – structurile lor de date și relația lor cu criptografia perechii de chei.
lang: ro
---

Un cont Ethereum este o entitate cu un sold de ether (ETH) care poate trimite tranzacții pe Ethereum. Conturile pot fi controlate de utilizator sau implementate sub formă de contracte inteligente.

## Condiții prealabile {#prerequisites}

Conturile sunt un subiect foarte potrivit pentru începători. Dar pentru a vă ajuta să înțelegeți mai bine această pagină, vă recomandăm să citiți mai întâi [introducerea noastră despre Ethereum](/developers/docs/intro-to-ethereum/).

## Tipuri de conturi {#types-of-account}

Ethereum are două tipuri de conturi:

- Deținute extern – controlate de oricine are o cheie privată
- Contractuale – contracte inteligente implementate în rețea, controlate prin cod. Aflați mai multe despre [contractele inteligente](/developers/docs/smart-contracts/)

Ambele tipuri de conturi au capacitatea de a:

- primi, deţine și trimite ETH și tokenuri
- interacționa cu contractele inteligente implementate

### Diferențe cheie {#key-differences}

**Cele deținute extern**

- Crearea unui cont nu costă nimic
- Pot iniția tranzacții
- Tranzacțiile între conturile deținute extern pot fi doar transferuri de ETH/tokenuri

**Cele contractuale**

- Crearea unui contract costă, deoarece se utilizează stocarea în rețea
- Se pot trimite tranzacții numai ca răspuns la primirea unei tranzacții
- Tranzacțiile dintr-un cont extern către un cont contractual pot declanșa un cod care poate să execute mai multe acțiuni diferite, cum ar fi transferul de tokenuri sau chiar crearea unui nou contract

## Analiza unui cont {#an-account-examined}

Conturile Ethereum au patru câmpuri:

- `nonce` – un contor care indică numărul de tranzacții trimise din cont. Acest lucru garantează că tranzacțiile sunt procesate o singură dată. Într-un cont contractual, acest număr reprezintă numărul contractelor create de cont.
- `balance` – numărul de wei deținute de această adresă. Wei este o denominație a ETH și există 1e+18 wei pentru fiecare ETH.
- `codeHash` – Acest hash se referă la _codul_ unui cont pe mașina virtuală Ethereum (EVM). Conturile contractuale conțin fragmente de cod programate care pot efectua diferite operații. Acest cod EVM este executat atunci când contul primește un apel de mesaj. Nu poate fi modificat, spre deosebire de celelalte câmpuri ale contului. Toate fragmentele de cod de acest tip sunt conținute în baza de date de stare sub hash-urile lor corespunzătoare pentru a fi recuperate ulterior. Această valoare hash este cunoscută sub numele de codeHash. În cazul conturilor deținute extern, câmpul codeHash este hash–ul unui șir gol.
- `storageRoot` – Uneori cunoscut sub numele de hash de stocare. Un hash pe 256 de biți al nodului rădăcină al unui trie Merkle Patricia care criptează conținutul de stocare al contului (o mapare între valori întregi pe 256 de biți), codificat în trie ca o mapare de la hash-ul Keccak pe 256 de biți al cheilor întregi pe 256 de biți la valorile întregi pe 256 de biți criptate în RLP. Acest trie criptează hash-ul conținutului de stocare al acestui cont și este în mod implicit gol.

![O diagramă care prezintă structura unui cont](./accounts.png) _Diagramă adaptată din [Ethereum EVM ilustrat](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Conturi deținute extern și perechi de chei {#externally-owned-accounts-and-key-pairs}

Un cont este format dintr-o pereche de chei criptografice: publică și privată. Acestea ajută la demonstrarea faptului că o tranzacție a fost semnată de expeditor și previn falsurile. Cheia privată este cea pe care o folosiți la semnarea tranzacțiilor, deci vă acordă custodia fondurilor asociate contului dvs. Nu dețineți niciodată criptomonede, ci dețineți chei private – fondurile sunt întotdeauna în registrul Ethereum.

Acest lucru împiedică actorii rău intenționați să transmită tranzacții false, deoarece puteți verifica întotdeauna expeditorul unei tranzacții.

Dacă Alice dorește să trimită ether din propriul cont în contul lui Bob, Alice trebuie să creeze o cerere de tranzacție și să o trimită în rețea pentru verificare. Utilizarea în Ethereum a criptografiei cu cheie publică garantează că Alice poate dovedi că ea este cea care a inițiat cererea de tranzacție. Dacă nu ar exista mecanismele criptografice, Eva, un adversar rău intenționat, ar putea transmite public o cerere care ar arată astfel „trimiteți 5 ETH din contul lui Alice în contul Evei” și nimeni nu ar putea verifica dacă a venit sau nu de la Alice.

## Crearea unui cont {#account-creation}

Când dorițisă creați un cont, majoritatea bibliotecilor vă vor genera o cheie privată aleatorie.

O cheie privată este formată din 64 de caractere hexadecimale și poate fi criptată cu o parolă.

Exemplu:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

Cheia publică este generată din cheia privată folosind [Algoritmul de semnătură digitală cu curbă eliptică](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Pentru a obține adresa publică a contului dvs., luați ultimii 20 de octeți din hash-ul Keccak-256 al cheii publice și adăugați `0x` la început.

Iată un exemplu de creare a unui cont în consolă utilizând codul GETH `personal_newAccount`

```go
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[Documentația GETH](https://geth.ethereum.org/docs)

Puteți obține chei publice noi dintr-o cheie privată, dar nu puteți obține o cheie privată din chei publice. De aceea este vital să vă păstrați cheia privată în siguranță și, așa cum sugerează și numele, **CONFIDENȚIALĂ**.

Aveți nevoie de o cheie privată pentru a semna mesaje și tranzacții care necesită o semnătură. Ceilalți pot lua atunci semnătura pentru a obține cheia dvs. publică, dovedind că sunteți autorul mesajului. În aplicația dvs. puteți utiliza o bibliotecă JavaScript pentru a trimite tranzacții către rețea.

## Conturi contractuale {#contract-accounts}

Conturile contractuale au de asemenea o adresă hexadecimală de 42 de caractere:

Exemplu:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

Adresa contractului este de obicei furnizată când un contract este implementat în Blockchain-ul Ethereum. Adresa provine de la adresa creatorului și de la numărul de tranzacții trimise de la acea adresă („nonce”).

## Observație despre portofele {#a-note-on-wallets}

Un cont nu este un portofel. Un cont este perechea de chei pentru un cont Ethereum deținut de un utilizator. Un portofel este o interfață sau o aplicație care vă permite să interacționați cu contul dvs. Ethereum.

## O demonstrație vizuală {#a-visual-demo}

Urmăriți-l pe Austin cum vă ghidează pas cu pas prin funcțiile hash și perechile de chei.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Referințe suplimentare {#further-reading}

_Cunoașteți o resursă a comunității care v-a ajutat? Editați această pagină și adăugați-o!_

## Subiecte corelate {#related-topics}

- [Contracte inteligente](/developers/docs/smart-contracts/)
- [Tranzacții](/developers/docs/transactions/)
