---
title: Biblioteci de contracte inteligente
description:
lang: ro
---

Nu este nevoie să scrieţi începând de la zero fiecare contract inteligent din proiect. Există multe biblioteci de contracte inteligente open source disponibile, care oferă elemente de construcție reutilizabile pentru proiectul dvs., care vă pot scuti de a reinventa roata.

## Condiții prealabile {#prerequisites}

Înainte de a folosi bibliotecile cu contracte inteligente, este o idee bună să înţelegeţi bine structura unui contract inteligent. Treceţi în revistă [anatomia contractelor inteligente](/developers/docs/smart-contracts/anatomy/) dacă nu aţi făcut-o deja.

## Ce conține o bibliotecă {#whats-in-a-library}

De obicei puteţi găsi două tipuri de elemente de bază în bibliotecile de contracte inteligente: comportamente reutilizabile pe care le puteţi adăuga la contractele dvs. și implementări ale diferitelor standarde.

### Comportamente {#behaviors}

Atunci când scrieţi contracte inteligente, este foarte probabil să vă pomeniţi că scrieţi din nou şi din nou modele similare, cum ar fi atribuirea unei adrese de _administrator_ pentru a efectua operațiuni protejate într-un contract sau adăugarea unui buton de _pauză_ de urgență în cazul apariţiei unei probleme neașteptate.

Bibliotecile de contracte inteligente oferă de obicei implementări reutilizabile ale acestor comportamente sub formă de [biblioteci](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) sau prin [moștenire](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) în Solidity.

Ca exemplu, se prezintă în continuare o versiune simplificată a contractului [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) din [biblioteca de contracte OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), care creează o adresă „address” ca proprietar al unui contract și oferă un modificator pentru restricționarea accesului la o metodă numai al proprietarului respectiv.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Pentru a utiliza un element de bază ca acesta în contractul dvs., ar trebui mai întâi să îl importaţi, apoi să îl extindeţi în propriile contracte. Acest lucru vă va permite să utilizaţi modificatorul furnizat de contractul de bază `Ownable` pentru a vă asigura propriile funcții.

```solidity
import ".../Ownable.sol"; // Calea către biblioteca importată

contract MyContract is Ownable {
    // Următoarea funcție poate fi apelată numai de către proprietar
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Un alt exemplu popular este [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) sau [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Acestea sunt biblioteci (spre deosebire de contractele de bază), care oferă funcții aritmetice cu verificări de depășire a numărului întreg, care nu sunt furnizate de limbaj. Este bine să vă obişnuiţi să utilizaţi oricare dintre aceste biblioteci în locul operațiilor aritmetice native pentru a vă proteja contractul împotriva valorilor numerice peste maximul permis, care pot avea consecințe dezastruoase!

### Standarde {#standards}

Pentru a facilita [combinabilitatea și interoperabilitatea](/developers/docs/smart-contracts/composability/), comunitatea Ethereum a definit mai multe standarde sub formă de **ERC**-uri. Puteţi citi mai multe despre acestea în secțiunea [standarde](/developers/docs/standards/).

Atunci când includeţi un ERC în contractele dvs., este bine să căutaţi implementări standard, mai degrabă decât să încercaţi să le lansaţi pe cele proprii. Multe biblioteci de contracte inteligente cuprind implementări pentru cele mai populare ERC-uri. De exemplu, omniprezentul [token fungibil standard ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) poate fi găsit în [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) și [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). În plus, unele ERC-uri oferă şi implementări canonice ca făcând parte din ERC-ul însuși.

Merită menționat faptul că unele ERC-uri nu sunt independente, ci sunt completări la alte ERC-uri. De exemplu, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) adaugă o extensie la ERC20 pentru a-i îmbunătății posibilitatea de întrebuințare.

## Cum se adaugă o bibliotecă {#how-to}

Consultaţi întotdeauna documentația bibliotecii pe care o includeţi pentru a afla instrucțiunile specifice privind modul de a o introduce în proiectul dvs. Sunt ambalate mai multe biblioteci de contracte Solidity folosind `npm`, astfel încât să le puteţi instala numai cu comanda `npm install`. Majoritatea instrumentelor pentru [compilarea](/developers/docs/smart-contracts/compiling/) contractelor vor căuta în `node_modules` bibliotecile de contracte inteligente, deci puteţi acţiona precum urmează:

```solidity
// Aceasta va încărca @openzeppelin/contracts library din node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Indiferent de metoda pe care o utilizaţi atunci când includeţi o bibliotecă, uitaţi-vă întotdeauna care este versiunea [limbajului](/developers/docs/smart-contracts/languages/). De exemplu, nu puteţi utiliza o bibliotecă pentru Solidity 0.6 dacă scrieţi contractele în Solidity 0.5.

## Când se folosește {#when-to-use}

Utilizarea unei biblioteci de contracte inteligente pentru proiectul dvs. are mai multe avantaje. În primul rând, faceţi economie de timp, întrucât vă furnizează elemente de construcție gata de utilizat pe care le puteţi include în sistem, mai degrabă decât să le programaţi singur.

Un alt avantaj major este securitatea. Bibliotecile de contracte inteligente open source sunt de asemenea supuse deseori unui control riguros. Având în vedere că multe proiecte depind de ele, există un stimulent puternic din partea comunității de a le revizui în mod constant. Este mult mai obişnuit să găsiţi erori în codul aplicației decât în ​​bibliotecile de contracte reutilizabile. Unele biblioteci sunt supuse şi [auditurilor externe](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audit) pentru mai multă securitate.

Totuși, folosirea bibliotecilor de contracte inteligente prezintă riscul includerii în proiect a unor coduri cu care nu sunteţi familiarizat. Este tentant să importaţi un contract și să îl includeţi direct în proiect, dar fără a înţelege bine ce face acel contract este posibil să introduceţi din greșeală o problemă în sistem, din cauza unui comportament neașteptat. Aveţi întotdeauna grijă să citiţi documentația codului pe care îl importaţi, apoi să reexaminaţi codul însuși înainte de a-l integra proiectul dvs.!

În ultimul rând, atunci când decideţi să includeţi o bibliotecă, ţineţi cont de gradul de utilizare a acesteia în ansamblu. O bibliotecă adoptată pe scară largă are avantajele unei mai mari comunităţi, deci sunt mai mulți ochi care caută probleme. Securitatea ar trebui să fie preocuparea dvs. principală atunci când construiţi aplicații cu contractele inteligente!

## Instrumente corelate {#related-tools}

**Contractele OpenZeppelin -** **_Cea mai populară bibliotecă pentru dezvoltarea de contracte inteligente securizate._**

- [Documentație](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forumul comunității](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Elemente de construcție sigure, simple, flexibile pentru contracte inteligente._**

- [Documentație](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Un proiect Solidity cu contracte, biblioteci și exemple pentru a vă ajuta să construiţi aplicații distribuite complet funcționale pentru lumea reală._**

- [GitHub](https://github.com/HQ20/contracts)

## Tutoriale corelate {#related-tutorials}

- [Considerații de securitate pentru dezvoltatorii Ethereum](/developers/docs/smart-contracts/security/) _– Un tutorial privind considerațiile de securitate la construirea contractelor inteligente, inclusiv gradul de utilizare a bibliotecilor._
- [Înțelegerea contractului inteligent token ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Tutorial privind standardul ERC20, oferit de mai multe biblioteci._

## Referințe suplimentare {#further-reading}

_Cunoaşteţi o resursă comunitară care v-a ajutat? Editaţi această pagină și adăugaţi-o!_
