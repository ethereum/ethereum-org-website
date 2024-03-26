---
title: "Analiza contractului ERC-20"
description: Ce conține contractul OpenZeppelin ERC-20 și de ce există?
author: Ori Pomerantz
lang: ro
tags:
  - "solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## Introducere {#introduction}

Ca mod de utilizare a lui Ethereum dintre cele mai frecvente, un grup creează un token de tranzacționare, care este într-un fel propria lui monedă. Aceste tokenuri respectă de obicei un standard, [ERC-20](/developers/docs/standards/tokens/erc-20/). Acest standard face posibilă scrierea de instrumente, cum ar fi grupurile de lichidități și portofelele, care funcționează cu toate tokenurile ERC-20. Acest articol va analiza [implementarea OpenZeppelin Solidity ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol), cât și [definirea interfeței](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol).

Este vorba de un cod sursă adnotat. Dacă doriți să implementați ERC-20, [citiți acest tutorial](https://docs.openzeppelin.com/contracts/2.x/erc20-supply).

## Interfața {#the-interface}

Obiectivul unui standard cum este ERC-20 este să permită implementarea mai multor tokenuri interoperabile între aplicații, precum portofelele și schimburile descentralizate. Pentru a realiza aceasta, am creat o [interfață](https://www.geeksforgeeks.org/solidity-basics-of-interface/). Orice cod care trebuie să utilizeze contractul de token poate folosi aceleași definiții din interfață și poate fi compatibil cu toate contractele de token care îl folosesc, fie că este vorba de un portofel precum MetaMask, o aplicaţie dapp cum ar fi etherscan.io sau un contract diferit, cum ar fi un fond de lichidități.

![Ilustrare a interfeței ERC-20](erc20_interface.png)

Dacă sunteți un programator experimentat, probabil vă amintiți că ați văzut construcții similare în [Java](https://www.w3schools.com/java/java_interface.asp) sau chiar în [anteturile fișierelor C](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html).

Aceasta este o definiție a interfeței [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) din OpenZeppelin. Este traducerea [standardului lizibil de către om](https://eips.ethereum.org/EIPS/eip-20) în codul Solidity. Bineînțeles că interfața în sine nu definește modul _cum_ se face ceva. Aceasta este explicată în codul sursă al contractului de mai jos.

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Fișierele Solidity ar trebui să includă un identificator de licență. [Puteți vedea lista de licențe aici](https://spdx.org/licenses/). În cazul în care aveți nevoie de o altă licență, e suficient să explicați în comentarii.

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Limbajul Solidity continuă să evolueze rapid și probabil că noile versiuni nu vor fi compatibile cu codul vechi. ([vedeți aici](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)). De aceea este bine să specificați nu numai o versiune minimă a limbajului, ci și versiunea maximă, cea mai recentă cu care ați testat codul.

&nbsp;

```solidity
/**
 * @dev Interface al standardului ERC20, așa cum este definit în EIP.
 */
```

`@dev` din comentariu face parte din [formatul NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html) utilizat pentru a produce documentația din codul sursă.

&nbsp;

```solidity
interface IERC20 {
```

Conform convenției, numele interfeței încep cu `I`.

&nbsp;

```solidity
    /**
     * @dev dă ca rezultat numărul de tokenuri existente.
     */
    function totalSupply() external view returns (uint256);
```

Această funcție este `externă`, adică [nu poate fi apelată decât din afara contractului](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2). Aceasta răspunde prin numărul total de tokenuri din contract. Valoarea aceasta rezultă folosind cel mai frecvent tip din Ethereum, nesemnat pe 256 de biți (256 de biți este dimensiunea cuvântului nativ din EVM). Această funcție este şi un `view`, ceea ce înseamnă că nu schimbă starea, așadar poate fi executată pe un singur nod în loc să fie executată de fiecare nod din blockchain. Acest tip de funcție nu generează o tranzacție și nu costă [gaz](/developers/docs/gas/).

**Observaţie:** Teoretic, creatorul contractului ar putea să pară că trișează răspunzând printr-o sumă totală mai mică decât valoarea reală, ceea ce ar face ca tokenul să pară mai valoros decât este în realitate. Dar dacă ne temem de acest lucru, înseamnă că nu ținem cont de adevărata natură a blockchain-ului. Tot ceea ce se întâmplă pe blockchain poate fi verificat de fiecare nod. Pentru a realiza acest lucru, fiecare cod de limbaj mașină al fiecărui contract și stocarea acestuia sunt disponibile pe fiecare nod. Deși nu sunteți obligat să publicați codul Solidity al contractului dvs., nimeni nu vă va lua în serios dacă nu publicați codul sursă și versiunea de Solidity cu care l-ați compilat, pentru a putea fi verificat în raport cu codul de limbaj mașină pe care l-ați furnizat. De exemplu, vedeți [acest contract](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code).

&nbsp;

```solidity
    /**
     * @dev răspunde prin numărul de tokenuri deținute de „account”.
     */
    function balanceOf(address account) external view returns (uint256);
```

Așa cum indică și numele, `balanceOf` returnează soldul unui cont. Conturile Ethereum sunt identificate în Solidity cu ajutorul tipului `address`, care conține 160 de biți. Este de asemenea `external` și `view`.

&nbsp;

```solidity
    /**
     * @dev mută tokenurile „amount” din contul apelantului în „recipient”.
     *
     * Răspunde printr-o valoare booleană, indicând dacă operațiunea a reușit.
     *
     * Emite un eveniment {Transfer}.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

Funcția `transfer` transferă un token de la apelant la o altă adresă. Pentru că aceasta implică o schimbare de stare, nu este un `view`. La apelarea acestei funcții de către un utilizator, se creează o tranzacție și un cost de gaz. Totodată, se emite un eveniment `Transfer` pentru a-i informa pe toți din blockchain despre eveniment.

Funcția produce două tipuri de rezultate pentru două tipuri diferite de apelanți:

- Utilizatorii care apelează funcția direct dintr-o interfață utilizator. De obicei, utilizatorul trimite o tranzacție și nu așteaptă răspunsul, care ar putea să dureze o perioadă nedeterminată. Utilizatorul poate să vadă ce s-a întâmplat căutând chitanța tranzacției (identificată prin hash-ul tranzacției) sau evenimentul `Transfer`.
- Alte contracte, care apelează funcția în cadrul unei tranzacții globale. Aceste contracte obțin rezultatul imediat, deoarece se execută în aceeași tranzacție, deci pot utiliza valoarea de răspouns a funcției.

Același tip de rezultat este produs de celelalte funcții care modifică starea contractului.

&nbsp;

Alocațiile („Allowances”) permit unui cont să cheltuiască anumite tokenuri care aparțin unui alt proprietar. Această opțiune este utilă, de exemplu, pentru contractele care acționează ca vânzători. Contractele nu pot monitoriza evenimente, deci dacă un cumpărător transferă tokenuri direct către contractul vânzătorului, acesta nu ar ști că i s-a plătit. În schimb, cumpărătorul permite contractului de vânzare să cheltuiască o anumită sumă, iar vânzătorul transferă suma respectivă. Aceasta se realizează prin intermediul unei funcții apelate de contractul vânzătorului, deci acesta știe dacă operațiunea a reușit.

```solidity
    /**
     * @dev Răspunde prin numărul de tokenuri pe care „spender”-ul mai are voie
     * să le cheltuiască în numele „owner”-ului prin {transferFrom}. Acesta este implicit
     * zero.
     *
     * Această valoare se modifică când se apelează {approve} sau {transferFrom}.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

Prin funcția `allowance`, oricine poate interoga ce alocație permite o adresă (`owner`) a fi cheltuită de către o altă adresă (`spender`).

&nbsp;

```solidity
    /**
     * @dev Stabilește „amount” ca fiind alocația lui „spender” în raport cu tokenurile „owner”-ului.
     *
     * Răspunde printr-o valoare booleană, indicând dacă operațiunea a reușit.
     *
     * IMPORTANT: Atenţie la faptul că schimbarea unei alocaţii prin această metodă implică riscul
     * ca cineva să poată folosi atât alocaţia veche, cât şi pe cea nouă, ordonând
     * greşit tranzacţiile. O posibilă soluție pentru a atenua acest risc
     * este de a reduce întâi la 0 alocația celui care cheltuiește și de a seta
     * valoarea dorită după aceea:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emite un eveniment {Approval}.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

Funcția `approve` creează o alocație. Nu uitați să citiți mesajul despre cum se poate abuza de aceasta. În Ethereum vă controlați ordinea propriilor tranzacții, dar nu puteți controla ordinea în care vor fi executate tranzacțiile altora decât dacă nu vă trimiteți propria tranzacție până când nu vedeți că a avut loc tranzacția celeilalte părți.

&nbsp;

```solidity
    /**
     * @dev Mută tokenurile „amount” din „expeditor” în „recipient” folosind mecanismul
     * de alocare. „amount” este apoi dedusă din
     * alocația apelantului.
     *
     * Răspunde printr-o valoare booleană, indicând dacă operațiunea a reușit.
     *
     * Emite un eveniment {Transfer}.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

În sfârșit, `transferFrom` este folosită de cel care cheltuiește pentru a cheltui efectiv alocația.

&nbsp;

```solidity

    /**
     * @dev Este emis când tokenurile „value” sunt mutate dintr-un („from”) cont în
     * („to”) altul.
     *
     * Țineți cont că „value” poate fi zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. „value” este noua alocație.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

Aceste evenimente sunt emise în momentul în care se schimbă starea contractului ERC-20.

## Contractul propriu-zis {#the-actual-contract}

Acesta este contractul efectiv care implementează standardul ERC-20, [preluat de aici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol). Nu este destinat a fi utilizat ca atare, dar puteți [moșteni](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm) din el pentru a-l transforma în ceva utilizabil.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### Declarații de import {#import-statements}

Pe lângă definițiile interfețelor de mai sus, definiția contractului importă alte două fișiere:

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` sunt definițiile necesare pentru a utiliza [OpenGSN](https://www.opengsn.org/), un sistem care permite utilizatorilor fără ether să utilizeze blockchain-ul. De reținut că aceasta este o versiune veche; dacă doriți să o integrați cu OpenGSN, [utilizați acest tutorial](https://docs.opengsn.org/javascript-client/tutorial.html).
- [Biblioteca SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/), folosită pentru a efectua adunări și scăderi fără depășirea întregului. Acest lucru este necesar pentru că altfel o persoană ar putea, având un token, să facă în așa fel încât să cheltuiască două şi să deţină apoi 2^256-1 tokenuri.

&nbsp;

Acest comentariu explică scopul contractului.

```solidity
/**
 * @dev Implementarea interfeței {IERC20}.
 *
 * Această implementare este agnostică privind modul în care sunt create tokenurile. Aceasta înseamnă
* că trebuie adăugat un mecanism de furnizare într-un contract derivat care utilizează {_mint}.
 * Pentru a vedea un mecanism generic, consultaţi {ERC20PresetMinterPauser}.
 *
 * RECOMANDARE: Pentru o scriere detaliată, consultați ghidul nostru
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[Cum
 * se implementează mecanismele de furnizare].
 *
 * Am urmat îndrumările generale ale OpenZeppelin: funcţiile se inversează în schimb
 * să răspundă prin mesaj de „fals” în caz de eşec. Totuși, acest comportament este convențional
 * și nu intră în conflict cu ce preconizează aplicațiile ERC20.
 *
 * În plus, este emis un eveniment {Approval} la apelurile către {transferFrom}.
 * Acest lucru permite aplicațiilor să reconstruiască alocația pentru toate conturile doar
 * ascultând evenimentele menționate. Alte implementări ale EIP-ului pot să nu emită
 * aceste evenimente, deoarece specificația nu impune acest lucru.
 *
 * În sfârşit, funcţiile non-standard {decreaseAllowance} şi {increaseAllowance}
 * au fost adăugate pentru a atenua problemele binecunoscute legate de setarea
 * alocațiilor. Vedeți {IERC20-approve}.
 */

```

### Definiția contractului {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

This line specifies the inheritance, in this case from `IERC20` from above and `Context`, for OpenGSN.

&nbsp;

```solidity

    using SafeMath for uint256;

```

Această linie atașează biblioteca `SafeMath` la tipul `uint256`. Puteți găsi această bibliotecă [aici](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol).

### Definițiile variabilelor {#variable-definitions}

Aceste definiții specifică variabilele de stare ale contractului. Aceste variabile sunt declarate `private`, dar aceasta înseamnă doar că alte contracte de pe blockchain nu le pot citi. _Nu există secrete pe blockchain_, software-ul fiecărui nod are starea fiecărui contract la fiecare bloc. În mod convențional, variabilele de stare se numesc `_<something>`.

Primele două variabile sunt [mappings](https://www.tutorialspoint.com/solidity/solidity_mappings.htm), care înseamnă că se comportă aproximativ ca [matricele asociative](https://wikipedia.org/wiki/Associative_array), mai puțin faptul că aceste chei sunt valori numerice. Spațiul de stocare este alocat numai datelor introduse care au valori diferite de valoarea implicită (zero).

```solidity
    mapping (address => uint256) private _balances;
```

Prima variabilă de mapare este `_balances` și reprezintă adresele și soldurile respective ale acestui token. Pentru a accesa soldul, utilizați această sintaxă: `_balances[<address>]`.

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

Această variabilă, `_allowances`, stochează alocațiile explicate anterior. Primul index este proprietarul tokenurilor, iar al doilea este contractul cu alocația. Pentru accesarea sumei pe care adresa A o poate cheltui din contul adresei B, utilizați `_allowances[B][A]`.

&nbsp;

```solidity
    uint256 private _totalSupply;
```

Așa cum sugerează și numele, această variabilă ține evidența stocului total de tokenuri.

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

Aceste trei variabile sunt utilizate pentru îmbunătățirea lizibilității. Primele două se explică de la sine, dar `_decimals` nu.

Pe de-o parte, Ethereum nu are variabile în virgulă mobilă sau fracționare. Pe de altă parte, oamenilor le place să poată împărți tokenurile. Un motiv pentru care oamenii au ales aurul ca monedă a fost pentru că era greu de făcut rost de mărunţiş când cineva voia să cumpere o raţă, dar avea numai valoarea pentru o vacă.

Soluția este de a ține evidența valorilor întregi, dar la numărătoare, în loc de a lua în considerare tokenul real, să considerăm un token fracționar, care aproape că nu are valoare. În cazul ether-ului, tokenul fracționar se numește wei, iar 10^18 wei sunt echivalenţi cu un ETH. În momentul scrierii, 10.000.000.000.000.000.000 de wei echivalau cu circa un cent american sau un eurocent.

Este necesar ca aplicațiile să știe cum să afișeze soldul tokenurilor. Dacă un utilizator are 3,141,000,000,000,000,000,000,000,000 wei, aceasta înseamnă 3,14 ETH? 31,41 ETH? 3.141 ETH? În cazul ether-ului, un ETH se definește ca 10^18 wei, dar pentru tokenul dvs. puteți selecta o valoare diferită. Dacă nu are sens să împărţim tokenul, puteți folosi o valoare cu `_decimals` de zero. Dacă doriți să utilizați același standard ca ETH, utilizați valoarea **18**.

### Constructorul {#the-constructor}

```solidity
    /**
     * @dev setează valorile pentru {name} și {symbol}, inițializează {decimals} cu
     * o valoare implicită de 18.
     *
     * Pentru a selecta o altă valoare pentru {decimals}, utilizați {_setupDecimals}.
     *
     * Toate cele trei valori sunt imuabile: ele pot fi setate o singură dată în timpul
     * construcției.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

Constructorul este apelat la crearea pentru prima dată a contractului. În mod convențional, variabilele de stare se numesc `_<something>_`.

### Funcțiile interfeţei cu utilizatorul {#user-interface-functions}

```solidity
    /**
     * @dev răspunde prin numele tokenului.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * De exemplu, dacă `decimals` este egal cu `2`, un sold de `505` tokenuri ar trebui
     * să fie afișat unui utilizator ca `5,05` (`505 / 10 ** 2`).
     *
     * Tokenurile optează de obicei pentru o valoare de 18, imitând relația dintre
     * ether și wei. Aceasta este valoarea utilizată de {ERC20}, doar dacă nu este
     * apelată {_setupDecimals}.
     *
     * OBSERVAŢIE: Această informaţie este folosită doar pentru _display_ purposes:
     * nu afectează sub nici o formă aritmetica contractului, inclusiv
     * {IERC20-balanceOf} și {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

Aceste funcții, `name`, `symbol` și `decimals`, ajută interfețele cu utilizatorul să știe despre contractul dvs. în așa fel încât să-l poată afișa corect.

Tipul de răspuns este `string memory`, ceea ce înseamnă că răspunde printr-un șir care este stocat în memorie. Variabile, cum ar fi șirurile de caractere, pot fi stocate în trei locații:

|          | Durată de viață   | Acces la contract | Costul gazului                                                             |
| -------- | ----------------- | ----------------- | -------------------------------------------------------------------------- |
| Memorie  | Apel funcție      | Citire/Scriere    | Zeci sau sute (mai mare pe adrese de memorie mai înalte)                   |
| Calldata | Apel funcție      | Doar citire       | Inutilizabilă ca tip de răspuns, este doar un tip de parametru al funcției |
| Stocare  | Până la schimbare | Citire/Scriere    | Ridicat (800 pentru citire, 20k pentru scriere)                            |

În acest caz, `memoria` este cea mai bună alegere.

### Citirea informațiilor tokenului {#read-token-information}

Acestea sunt funcții care furnizează informații despre token, fie că este vorba de cantitatea totală, fie de soldul unui cont.

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

Funcția `totalSupply` răspunde prin cantitatea totală de tokenuri.

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

Citirea soldului unui cont. Rețineți că oricine are permisiunea de a obține soldul contului altcuiva. Nu are nici un sens să ascundeți această informație, pentru că ea este oricum disponibilă pe fiecare nod. _Nu există secrete pe blockchain._

### Transferul de tokenuri {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Cerințe:
     *
     * - „recipient” nu poate să fie adresa zero.
     * - apelantul trebuie să aibă un sold de cel puţin `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

Funcția `transfer` este apelată pentru a transfera tokenuri din contul expeditorului către un alt cont. Rețineți că, deși valoarea de răspuns este o valoare de tip boolean, aceasta este întotdeauna **adevărată**. Dacă transferul eșuează, contractul returnează apelul.

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

Funcția `_transfer` este cea care efectuează cu adevărat munca. Este o funcție privată care nu poate fi apelată decât de alte funcții de contract. Prin convenție, funcțiile private se numesc `_<something>`, ca și variabilele de stare.

În mod normal, în Solidity folosim `msg.sender` pentru expeditorul mesajului. Totuși, acest lucru întrerupe [OpenGSN](http://opengsn.org/). Dacă vrem să permitem tranzacții fără ether cu tokenul nostru, trebuie să folosim `_msgSender(`). Acesta răspunde cu `msg.sender` pentru tranzacțiile normale, însă pentru cele fără ether răspunde cu semnatarul original, și nu cu contractul care a transmis mesajul.

### Funcțiile de alocație {#allowance-functions}

Acestea sunt funcțiile care implementează funcționalitatea alocației: `allowance`, `approve`, `transferFrom` și `_approve`. În plus, implementarea OpenZeppelin depășește standardul de bază prin includerea unor functionalităţi care îmbunătățesc securitatea: `increaseAllowance` și `decreaseAllowance`.

#### Funcția „allowance” {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

Funcția `allowance` permite tuturor să verifice orice alocație.

#### Funcția „approve” {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Cerințe:
     *
     * - „spender" nu poate să fie adresa zero.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

Această funcție este apelată pentru a crea o alocație. Este similară cu funcția `transfer` de mai sus:

- Funcția nu face decât să apeleze o funcție internă (în acest caz, `_approve`) care face adevărata muncă.
- Funcția răspunde prin `true` (în caz de succes) sau revine (în caz de eșec).

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

Folosim funcții interne pentru a minimiza numărul de locuri unde au loc schimbări de stare. _Orice_ funcție care schimbă starea reprezintă un risc potențial și trebuie auditată pe motive de securitate. În acest fel minimizăm șansele de a greşi.

#### Funcția „transferFrom” {#transferFrom}

Aceasta este funcția pe care spenderul o apelează pentru a cheltui o alocație. Aceasta necesită două operațiuni: transferul sumei care se cheltuiește și reducerea alocației cu aceeași sumă.

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emite un eveniment de {Approval}, indicând alocaţia actualizată. Aceasta nu este
     * o cerinţă pentru EIP. A se vedea observaţia de la începutul {ERC20}.
     *
     * Cerințe:
     *
     * - „sender” şi „recipient” nu pot fi adresa zero.
     * - `apelantul trebuie să aibă un sold de cel puţin `amount`.
     * - apelantul trebuie să aibă alocaţia pentru tokenurile `sender``-ului, de cel puţin
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

Funcția de apel `a.sub(b, "message")` face două lucruri. În primul rând, calculează `a-b`, care este noua alocație. În al doilea rând, verifică dacă rezultatul găsit nu este negativ. Dacă este negativ, apelul este returnat cu mesajul furnizat. Rețineți că atunci când un apel este returnat, orice procesare efectuată anterior pe durata apelului este ignorată, deci nu este nevoie să anulăm `_transfer`.

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### Suplimente de siguranță OpenZeppelin {#openzeppelin-safety-additions}

Este periculos să setați o valoare diferită de zero la o altă valoare diferită de zero, deoarece nu controlați decât ordinea propriilor tranzacții, și nu pe cea a celorlalți. Să ne imaginăm că avem doi utilizatori, Alice, care este naivă, și Bill, care este necinstit. Alice vrea ca Bill să-i facă un serviciu despre care crede că valorează cinci tokenuri - de aceea îi dă lui Bill o alocație de cinci tokenuri.

În acel moment intervine ceva și prețul cerut de Bill crește la zece tokenuri. Alice, care vrea serviciul chiar și la acest preț, îi trimite o tranzacție care stabilește alocația lui Bill la zece. Imediat ce Bill vede noua tranzacție în fondul de tranzacții, trimite o tranzacție care cheltuiește cele cinci tokenuri ale lui Alice la un preț mai mare de gaz, pentru a fi minată mai repede. Astfel, Bill poate să cheltuiască primele cinci jetoane, iar odată ce noua alocație a lui Alice este minată, cheltuiește alte zece, pentru un preţ total de cincisprezece jtokenuri, mai mult decât era intenţia lui Alice să autorizeze. This technique is called [front-running](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running)

| Tranzacția lui Alice | Nonce-ul lui Alice | Tranzacția lui Bill           | Nonce-ul lui Bill | Alocația lui Bill | Venitul total a lui Bill de la Alice |
| -------------------- | ------------------ | ----------------------------- | ----------------- | ----------------- | ------------------------------------ |
| approve(Bill, 5)     | 10                 |                               |                   | 5                 | 0                                    |
|                      |                    | transferFrom(Alice, Bill, 5)  | 10,123            | 0                 | 5                                    |
| approve(Bill, 10)    | 11                 |                               |                   | 10                | 5                                    |
|                      |                    | transferFrom(Alice, Bill, 10) | 10,124            | 0                 | 15                                   |

Pentru a evita această problemă, aceste două funcții (`increaseAllowance` și `decreaseAllowance`) vă permit să modificați alocația cu o anumită valoare. Deci dacă Bill a cheltuit deja cinci tokenuri, el va putea să cheltuiască numai încă alte cinci. Depending on the timing, there are two ways this can work, both of which end with Bill only getting ten tokens:

A:

| Tranzacția lui Alice       | Nonce-ul lui Alice | Tranzacția lui Bill          | Nonce-ul lui Bill | Alocația lui Bill | Venitul total al lui Bill de la Alice |
| -------------------------- | -----------------: | ---------------------------- | ----------------: | ----------------: | ------------------------------------- |
| approve(Bill, 5)           |                 10 |                              |                   |                 5 | 0                                     |
|                            |                    | transferFrom(Alice, Bill, 5) |            10,123 |                 0 | 5                                     |
| increaseAllowance(Bill, 5) |                 11 |                              |                   |           0+5 = 5 | 5                                     |
|                            |                    | transferFrom(Alice, Bill, 5) |            10,124 |                 0 | 10                                    |

B:

| Tranzacția lui Alice       | Nonce-ul lui Alice | Tranzacția lui Bill           | Nonce-ul lui Bill | Alocația lui Bill | Venitul total al lui Bill de la Alice |
| -------------------------- | -----------------: | ----------------------------- | ----------------: | ----------------: | ------------------------------------: |
| approve(Bill, 5)           |                 10 |                               |                   |                 5 |                                     0 |
| increaseAllowance(Bill, 5) |                 11 |                               |                   |          5+5 = 10 |                                     0 |
|                            |                    | transferFrom(Alice, Bill, 10) |            10,124 |                 0 |                                    10 |

```solidity
    /**
     * @dev Creşte în mod atomic alocaţia acordată pentru `spender` de către apelant.
     *
     * Aceasta este o alternativă la {approve} care poate fi utilizată ca atenuare pentru
     * probleme descrise în {IERC20-approve}.
     *
     * Emite un eveniment de {Approval}, indicând alocaţia actualizată.
     *
     * Cerințe:
     *
     * - „spender" nu poate să fie adresa zero.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

Funcția `a.add(b)` este o adunare sigură („safe add”). În cazul improbabil că `a`+`b`>=`2^256`, nu va executa o buclă, așa cum face o adunare normală.

```solidity

    /**
     * @dev Creşte în mod atomic alocaţia acordată pentru `spender` de către apelant.
     *
     * Aceasta este o alternativă la {approve} care poate fi utilizată ca atenuare pentru
     * probleme descrise în {IERC20-approve}.
     *
     * Emite un eveniment de {Approval}, indicând alocaţia actualizată.
     *
     * Cerințe:
     *
     * - „spender" nu poate să fie adresa zero.
     * - `spender` trebuie să aibă o alocaţie pentru apelant de cel puţin
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### Funcții care modifică informațiile despre tokenuri {#functions-that-modify-token-information}

Există patru funcții care efeectuează cu adevărat munca: `_transfer`, `_mint`, `_burn`, și `_approve`.

#### Funcția \_transfer {#\_transfer}

```solidity
    /**
     * @dev Mută tokenurile `amount` de la `expeditor` la `recipient`.
     *
     * Această funcție internă este echivalentă cu {transfer}, și poate fi utilizată,
     * de exemplu, pentru a stabili alocații automate, pentru anumite subsisteme etc.
     *
     * Emite un eveniment {Transfer}.
     *
     * Cerințe:
     *
     * - „sender" nu poate să fie adresa zero.
     * - „recipient” nu poate să fie adresa zero.
     * - `sender` trebuie să aibă un sold de cel puţin `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

Această funcție, `_transfer`, transferă tokenuri dintr-un cont în altul. Este apelată atât de funcția `transfer` (pentru transferuri din contul propriu al expeditorului), cât și de funcția `transferFrom` (pentru utilizarea alocațiilor la efectuarea de transferuri din contul altcuiva).

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

Nimeni nu posedă de fapt adresa zero în Ethereum ( adică nimeni nu cunoaște o cheie privată a cărei cheie publică asociată se transformă în adresa zero). Atunci când cineva folosește această adresă este un bug de software - deci tranzacția eșuează dacă folosim adresa zero ca expeditor sau destinatar.

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

Există două moduri de folosire a acestui contract:

1. Să fie folosit ca model pentru propriul dvs. cod
1. [Să moșteniți din el](https://www.bitdegree.org/learn/solidity-inheritance) și să schimbați numai acele funcții pe care trebuie să le modificați

A doua metodă este mult mai bună, întrucât codul OpenZeppelin ERC-20 a fost deja auditat și s-a dovedit a fi sigur. Când utilizați moștenirea, este clar care sunt funcțiile de modificat și pentru a avea încredere în contractul dvs., persoanele care se ocupă trebuie să auditeze numai aceste funcții.

Este adesea util să executați o funcție de fiecare dată când se schimbă proprietarul tokenurilor. Totuși,`_transfer` este o funcție foarte importantă și este posibil să fie redactată în mod nesecurizat (a se vedea mai jos), de aceea este mai bine să nu o suprascrieţi. Soluția este `_beforeTokenTransfer`, o [funcție „hook”](https://wikipedia.org/wiki/Hooking). Puteți suprascrie această funcție, dar ea va fi apelată la fiecare transfer.

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

Acestea sunt liniile care execută practic transferul. Observați că nu există **nimic** între ele și că scădem valoarea transferată de la expeditor înainte de a o adăuga la destinatar. Acest lucru este important, deoarece dacă ar fi existat între aceştia un apel la un alt contract, putea fi folosit pentru a frauda acest contract. Astfel, transferul este atomic, nimic nu se poate întâmpla în timp ce se petrece.

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

În cele din urmă, va emite evenimentul `Transfer`. Evenimentele nu sunt accesibile contractelor inteligente, dar codul care rulează în afara blockchain-ului poate să detecteze prin ascultare evenimente și să reacționeze la ele. De exemplu, un portofel poate monitoriza când proprietarul obține mai multe tokenuri.

#### Funcțiile \_mint și \_burn {#\_mint-and-\_burn}

Cele două funcții (`_mint` și `_burn`) modifică numărul total de tokenuri furnizate. Deoarece acestea sunt interne, nu există nicio funcție care să le apeleze în acest contract, iar ele sunt utile numai dacă moșteniți din contract și adăugați propria logică prin care să decideți în ce condiții să emiteţi noi tokenuri sau să le ardeți pe cele existente.

**NOTĂ:** Fiecare jeton ERC-20 are propria sa logică de activitate, care dictează gestionarea tokenului. De exemplu, un contract ce furnizează un număr fix ar putea apela `_mint`(emiterea) numai în constructor și nu ar putea niciodată apela `_burn`(arderea). Un contract care vinde tokenuri va apela `_mint`(emiterea) când este plătit și probabil va apela `_burn`(arderea) la un moment dat pentru a evita inflația.

```solidity
    /** @dev Creează tokenuri în valoare de `amount` și le atribuie în `account`, crescând
     * cantitatea totală furnizată.
     *
     * Emite un eveniment {Transfer} cu `from` setat la adresa zero.
     *
     * Cerințe:
     *
     * - „to” nu poate să fie adresa zero.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Aveţi grijă să actualizați `_totalSupply` atunci când se modifică numărul de tokenuri.

&nbsp;

```
    /**
     * @dev Distruge `amount` de tokenuri din `account`, reducând
     * cantitatea totală furnizată.
     *
     * Emite un eveniment {Transfer} cu `to` setat la adresa zero.
     *
     * Cerințe:
     *
     * - „account” nu poate să fie adresa zero.
     * - `cont` trebuie să aibă cel puţin tokenuri în valoare de `amount`.
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

Funcția `_burn` este identică aproape cu `_mint`, cu excepția faptului că funcționează în sens invers.

#### Funcția \_approve {#\_approve}

Aceasta este funcția care specifică de fapt alocațiile. Rețineți că permite unui proprietar să specifice o alocație mai mare decât soldul curent al proprietarului. Acest lucru este în regulă, deoarece soldul este verificat în momentul transferului, când ar putea fi diferit de cel de la momentul în care a fost creată alocația.

```solidity
    /**
     * @dev Stabilește „amount” ca fiind alocația lui „spender” în raport cu tokenurile „owner”-ului.
     *
     * Această funcție internă este echivalentă cu „approve” și poate fi utilizată,
     * de exemplu, pentru a stabili alocații automate pentru anumite subsisteme etc.
     *
     * Emite un eveniment {Approval}.
     *
     * Cerințe:
     *
     * - „owner” nu poate să fie adresa zero.
     * - „spender” nu poate să fie adresa zero.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

Emite un eveniment `Approval`. În funcție de felul cum este scrisă aplicația, contractul spenderului poate să fie anunţat despre aprobare fie de către proprietar, fie de serverul care ascultă aceste evenimente.

```solidity
        emit Approval(owner, spender, amount);
    }

```

### Modificarea variabilei „decimals” {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Definește {decimals} la o altă valoare decât cea implicită de 18.
     *
     * AVERTISMENT: Această funcție trebuie apelată numai din constructor. Majoritatea
     * aplicațiilor care interacționează cu contractele tokenului nu se vor aștepta ca
     * {decimals} să se schimbe vreodată și ar putea să funcționeze incorect dacă s-ar întâmpla acest lucru.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

Această funcție modifică variabila `_decimals`, care este utilizată pentru a indica interfeței cu utilizatorul cum să interpreteze valorile. Ar trebui să o apelați din constructor. Ar fi necinstit să fie apelată în orice moment ulterior, iar aplicațiile nu sunt concepute să o gestioneze.

### Hook-uri {#hooks}

```solidity

    /**
     * @dev Hook care este apelat înaintea oricărui transfer de tokenuri. Aceasta include
     * emiterea și arderea.
     *
     * Condiţii de apelare:
     *
     * - când `from` şi `to` sunt amândouă diferite de zero, `amount` din token-urile `from`
     * vor fi transferate la `to`.
     * - când `from` este zero, vor fi emise tokenuri în valoare de `amount` pentru `to`.
     * - când `to` este zero, se va arde un `amount` din tokenurile `from`.
     * - `from` şi `to` nu sunt niciodată ambele zero.
     *
     * Pentru a afla mai multe despre hook-uri, consultaţi xref:ROOT:extending-contracts.adoc#using-hooks[Folosind Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

Aceasta este funcția „hook” care va fi apelată în timpul transferurilor. It is empty here, but if you need it to do something you just override it.

# Concluzie {#conclusion}

În recapitulare, iată câteva dintre cele mai importante idei din acest contract (după părerea mea - părerea dvs. ar putea să fie diferită):

- _Nu există secrete pe blockchain_. Orice informație pe care o poate accesa un contract inteligent este disponibilă tuturor.
- Puteți controla ordinea propriilor tranzacții, dar nu și momentul în care au loc tranzacțiile altora. Acesta este motivul pentru care schimbarea unei alocații poate fi periculoasă, deoarece permite spenderului să cheltuiască ambele alocații.
- Valorile de tip `uint256` formează bucle. Cu alte cuvinte, _0-1=2^256-1_. Dacă acesta nu este comportamentul dorit, trebuie să verificați acest lucru (sau să folosiți bibliotecile SafeMath care o vor face pentru dvs.). De reținut că aceasta s-a schimbat în [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html).
- Efectuați toate schimbările de stare de un anumit tip într-un anumit loc, deoarece facilitează auditul. Acesta este motivul pentru care avem, de exemplu, `_approve`, care este apelată de `approve`, `transferFrom`, `increaseAllowance`, și `decreaseAllowance`
- Schimbările de stare ar trebui să fie atomice, fără nicio intervenție în timp ce au loc (așa cum se poate vedea în` _transfer`). Aceasta deoarece în timpul unei schimbări de stare, aveți o stare instabilă. De exemplu, între momentul în care deduceți din soldul expeditorului și cel în care adăugați în soldul destinatarului, există mai puține tokenuri decât ar trebui să existe. Se poate abuza de această situație dacă ar exista operații între aceste momente, în special apeluri către un alt contract.

Iar acum, odată ce ați văzut cum este scris un contract OpenZeppelin ERC-20 și mai ales cum este securizat, porniţi să vă scrieţi propriile contracte și aplicații securizate.
