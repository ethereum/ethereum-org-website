---
title: Jak korzystać z portfela
metaTitle: Jak korzystać z portfeli Ethereum | Krok po kroku
description: Przewodnik wyjaśniający, jak wysyłać i odbierać tokeny oraz łączyć się z projektami web3.
lang: pl
---

Dowiedz się, jak obsługiwać wszystkie podstawowe funkcje portfela. Jeśli jeszcze go nie masz, sprawdź nasz przewodnik [Jak utworzyć konto Ethereum](/guides/how-to-create-an-ethereum-account/).

## Otwórz swój portfel {#open-your-wallet}

Powinien pojawić się pulpit nawigacyjny, który prawdopodobnie pokaże Twoje saldo i będzie zawierał przyciski do wysyłania i odbierania tokenów.

## Odbieranie kryptowaluty {#receive-cryptocurrency}

Chcesz odebrać krypto na swój portfel?

Każde konto Ethereum ma swój własny adres odbiorczy, który jest unikalną sekwencją cyfr i liter. Adres działa jak numer konta bankowego. Adresy Ethereum zawsze zaczynają się od „0x”. Możesz udostępnić ten adres każdemu: jest to bezpieczne.

Twój adres jest jak adres domowy: musisz powiedzieć ludziom, jaki on jest, aby mogli Cię znaleźć. Jest to bezpieczne, ponieważ nadal możesz zamknąć drzwi wejściowe innym kluczem, który tylko Ty kontrolujesz, tak aby nikt nie mógł wejść, nawet jeśli wie, gdzie mieszkasz.

Musisz podać swój adres publiczny każdemu, kto chce wysłać Ci pieniądze. Wiele aplikacji portfeli pozwala skopiować adres lub wyświetlić kod QR do zeskanowania w celu ułatwienia obsługi. Unikaj ręcznego wpisywania jakiegokolwiek adresu Ethereum. Może to łatwo doprowadzić do błędów przy przepisywaniu i utraty środków.

Różne aplikacje mogą się różnić lub używać innego języka, ale powinny przeprowadzić Cię przez podobny proces, jeśli próbujesz wykonać transfer środków.

1. Otwórz aplikację swojego portfela.
2. Kliknij „Odbierz” (lub podobnie brzmiącą opcję).
3. Skopiuj swój adres Ethereum do schowka.
4. Podaj nadawcy swój adres odbiorczy Ethereum.

## Wysyłanie kryptowaluty {#send-cryptocurrency}

Chcesz wysłać ETH na inny portfel?

1. Otwórz aplikację swojego portfela.
2. Zdobądź adres odbiorczy i upewnij się, że jesteś połączony z tą samą siecią co odbiorca.
3. Wprowadź adres odbiorczy lub zeskanuj kod QR za pomocą aparatu, aby nie musieć wpisywać adresu ręcznie.
4. Kliknij przycisk „Wyślij” w swoim portfelu (lub podobnie brzmiącą alternatywę).

![Send field for crypto address](./send.png)
<br/>

5. Wiele aktywów, takich jak DAI lub USDC, istnieje w wielu sieciach. Podczas transferu tokenów krypto upewnij się, że odbiorca korzysta z tej samej sieci co Ty, ponieważ nie są one zamienne.
6. Upewnij się, że Twój portfel ma wystarczająco dużo ETH na pokrycie opłaty transakcyjnej, która różni się w zależności od warunków w sieci. Większość portfeli automatycznie doda sugerowaną opłatę do transakcji, którą możesz następnie potwierdzić.
7. Po przetworzeniu Twojej transakcji odpowiednia kwota krypto pojawi się na koncie odbiorcy. Może to potrwać od kilku sekund do kilku minut, w zależności od tego, jak bardzo sieć jest obecnie obciążona.

## Łączenie z projektami {#connecting-to-projects}

Twój adres będzie taki sam we wszystkich projektach Ethereum. Nie musisz rejestrować się indywidualnie w żadnym projekcie. Gdy masz już portfel, możesz połączyć się z dowolnym projektem Ethereum bez żadnych dodatkowych informacji. Nie są potrzebne żadne e-maile ani inne dane osobowe.

1. Odwiedź stronę internetową dowolnego projektu.
2. Jeśli strona docelowa projektu jest tylko statycznym opisem projektu, powinieneś móc kliknąć przycisk „Otwórz aplikację” w menu, który przeniesie Cię do właściwej aplikacji internetowej.
3. Będąc w aplikacji, kliknij „Połącz”.

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. Wybierz swój portfel z podanej listy opcji. Jeśli nie widzisz swojego portfela, może on być ukryty pod opcją „WalletConnect”.

![Selecting from a list of wallets to connect with](./connect2.png)

5. Potwierdź żądanie podpisu w swoim portfelu, aby nawiązać połączenie. **Podpisywanie tej wiadomości nie powinno wymagać wydawania żadnego ETH**.
6. To wszystko! Zacznij korzystać z aplikacji. Możesz znaleźć kilka interesujących projektów na naszej [stronie ze zdecentralizowanymi aplikacjami (dapps)](/apps/#explore).
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Chcesz dowiedzieć się więcej?</div>
  <ButtonLink href="/guides/">
    Zobacz nasze inne przewodniki
  </ButtonLink>
</AlertContent>
</Alert>

## Często zadawane pytania {#frequently-asked-questions}

### Czy jeśli posiadam adres ETH, to posiadam ten sam adres na innych blockchainach? {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

Możesz używać tego samego adresu na wszystkich blockchainach kompatybilnych z EVM (jeśli masz typ portfela z frazą odzyskiwania). Ta [lista](https://chainlist.org/) pokaże Ci, których blockchainów możesz używać z tym samym adresem. Niektóre blockchainy, takie jak Bitcoin, wdrażają całkowicie oddzielny zestaw reguł sieci i będziesz potrzebować innego adresu w innym formacie. Jeśli masz portfel oparty na inteligentnym kontrakcie, powinieneś sprawdzić stronę internetową jego produktu, aby uzyskać więcej informacji o tym, które blockchainy są obsługiwane.

### Czy mogę używać tego samego adresu na wielu urządzeniach? {#can-i-use-the-same-address-on-multiple-devices}

Tak, możesz używać tego samego adresu na wielu urządzeniach. Portfele są technicznie tylko interfejsem pokazującym Twoje saldo i umożliwiającym dokonywanie transakcji; Twoje konto nie jest przechowywane wewnątrz portfela, ale na blockchainie.

### Nie otrzymałem krypto, gdzie mogę sprawdzić status transakcji? {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

Możesz użyć [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/), aby zobaczyć status dowolnej transakcji w czasie rzeczywistym. Wszystko, co musisz zrobić, to wyszukać adres swojego portfela lub identyfikator transakcji.

### Czy mogę anulować lub cofnąć transakcje? {#can-i-cancel-or-return-transactions}

Nie, po potwierdzeniu transakcji nie można jej anulować.