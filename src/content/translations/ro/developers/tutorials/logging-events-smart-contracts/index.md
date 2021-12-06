---
title: Înregistrarea datelor din contractele inteligente cu evenimente
description: O introducere în evenimente de contracte inteligente și cum să le utilizezi pentru a înregistra date
author: "jdourlens"
tags: ["contracte inteligente", "remix", "solidity", "evenimente"]
skill: intermediar
lang: ro
sidebar: true
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

În Solidity, [evenimentele](/developers/docs/smart-contracts/anatomy/#events-and-logs) sunt semnalele expediate pe care contractele inteligente le pot declanșa. Aplicațiile dapp sau orice conectat la Ethereum JSON-RPC API, pot asculta aceste evenimente și pot acționa în consecință. De asemenea, evenimentul poate fi indexat, pentru ca istoricul evenimentelor să poată fi căutat mai târziu.

## Evenimente {#events}

Cel mai comun eveniment pe Ethereum blockchain la momentul scrierii acestui articol este evenimentul de transfer, care este emis de tokenuri ERC20 atunci când cineva transferă tokenuri.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Semnătura evenimentului este declarată în interiorul codului contractului și poate fi emisă cu ajutorul cuvântului cheie „emit”. De exemplu, jurnalele de evenimente de transfer care au trimis transferul de la (_from_), la cine (_to_) și câte tokenuri au fost transferate (_value_).

Dacă revenim la contractul nostru inteligent Counter și decidem să ne conectăm de fiecare dată când valoarea este modificată. Deoarece acest contract nu este destinat să fie implementat, ci servește drept bază pentru construirea unui alt contract prin extinderea acestuia: se numește contract abstract. În cazul exemplului nostru de contor, acesta ar arăta astfel:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Variabilă privată de tip int nesemnat pentru a păstra numărul de contorizări
    uint256 private count = 0;

    // Funcție care incrementează contorul nostru
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter pentru a obține valoarea contorizării
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Observă că:

- **linia 5**: Declarăm evenimentul nostru și ce conține, vechea valoare și noua valoare.

- **linia 13**: Când incrementăm variabila noastră „count”, „emit”-em evenimentul.

Dacă implementăm acum contractul și apelăm funcția increment, vom vedea că Remix îl va afișa automat când faci clic pe noua tranzacție din interiorul unei matrice numite „logs".

![Captură ecran Remix](../../../../../developers/tutorials/logging-events-smart-contracts/remix-screenshot.png)

Jurnalele sunt foarte utile pentru depanarea contractelor inteligente, dar sunt, de asemenea, importante atunci când construiești aplicații utilizate de diferite persoane și faci mai ușoară analiza pentru a urmări și a înțelege modul în care este utilizat contractul inteligent. Jurnalele generate de tranzacții sunt afișate în exploratoarele de bloc populare și, de asemenea, le poți utiliza, de exemplu, pentru a crea scripturi off-chain pentru a asculta evenimente specifice și de a lua măsuri atunci când acestea apar.
