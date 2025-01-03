---
title: Jak używać portfela
description: Przewodnik wyjaśniający, jak wysyłać, odbierać tokeny i łączyć się z projektami web3.
lang: pl
---

# Jak używać portfela

Dowiedz się, jak obsługiwać wszystkie podstawowe funkcje portfela. Jeśli jeszcze go nie posiadasz, sprawdź nasz przewodnik: [Jak stworzyć konto Ethereum](/guides/how-to-create-an-ethereum-account/).

## Otwórz swój portfel

Powinieneś zobaczyć panel, który prawdopodobnie pokaże Twoje saldo i będzie zawierał przyciski do wysyłania i przyjmowania tokenów.

## Otrzymuj kryptowaluty

Czy chcesz otrzymywać kryptowaluty na swój portfel?

Każde konto Ethereum ma swój własny adres odbiorczy, który jest unikalną sekwencją liczb i liter. Adres działa jak numer konta bankowego. Adresy Ethereum zawsze zaczynają się od „0x”. Możesz udostępnić ten adres każdemu: jest to bezpieczne.

Twój adres jest jak twój adres domowy: musisz powiedzieć ludziom, jaki on jest, aby mogli Cię znaleźć. Jest to bezpieczne, ponieważ nadal możesz zablokować swoje drzwi za pomocą innego klucza, który tylko Ty kontrolujesz, aby nikt nie mógł dostać się, nawet jeśli wiedzą, gdzie mieszkasz.

Musisz podać swój adres publiczny każdemu, kto chce wysłać Ci pieniądze. Wiele aplikacji portfela pozwala skopiować swój adres lub wyświetlić kod QR do skanowania w celu łatwiejszego użycia. Unikaj ręcznego wpisywania jakiegokolwiek adresu Ethereum. Może to z łatwością prowadzić do błędów pisarskich i utraty środków.

Różne aplikacje mogą się różnić lub używać innego języka, ale powinny przeprowadzić Cię przez podobny proces, jeśli próbujesz przelewać środki.

1. Otwórz swój portfel.
2. Kliknij „Odbierz” (lub podobnie sformułowaną opcję).
3. Skopiuj swój adres Ethereum do schowka.
4. Podaj nadawcy swój adres Ethereum.

## Wyślij kryptowaluty

Chcesz wysłać ETH na inny portfel?

1. Otwórz swój portfel.
2. Uzyskaj adres odbiorczy i upewnij się, że jesteś podłączony do tej samej sieci co odbiorca.
3. Wprowadź adres odbiorczy lub zeskanuj kod QR za pomocą aparatu, aby nie wpisywać adresu ręcznie.
4. Kliknij przycisk „Wyślij” w swoim portfelu (lub podobnie sformułowaną opcję).

![Pole wysyłania dla adresu kryptowalutowego](./send.png)
<br/>

5. Wiele aktywów, takich jak DAI czy USDC, istnieje w wielu sieciach. Przy przesyłaniu tokenów kryptowalut, upewnij się, że odbiorca używa tej samej sieci co Ty, ponieważ nie są one zamienne.
6. Upewnij się, że Twój portfel ma wystarczającą ilość ETH, aby pokryć opłatę transakcyjną, która różni się w zależności od warunków sieciowych. Większość portfeli automatycznie doda sugerowaną opłatę do transakcji, którą możesz następnie potwierdzić.
7. Gdy Twoja transakcja zostanie przetworzona, odpowiednia kwota kryptowaluty pojawi się na koncie odbiorcy. Może to potrwać od kilku sekund do kilku minut, w zależności od obciążenia sieci.

## Łączenie z projektami

Twój adres będzie taki sam we wszystkich projektach Ethereum. Nie musisz rejestrować się indywidualnie w jakimkolwiek projekcie. Gdy posiadasz portfel, możesz połączyć się z dowolnym projektem Ethereum bez dodatkowych informacji. Nie są potrzebne żadne e-maile ani żadne inne dane osobowe.

1. Odwiedź stronę internetową dowolnego projektu.
2. Jeśli strona docelowa projektu jest tylko statycznym opisem projektu, powinieneś mieć możliwość kliknięcia przycisku „Otwórz aplikację” w menu, który przeniesie Cię do rzeczywistej aplikacji internetowej.
3. Gdy będziesz w aplikacji, kliknij „Połącz”.

![Przycisk pozwalający użytkownikowi połączyć się ze stroną internetową za pomocą portfela](./connect1.png)

4. Wybierz swój portfel z listy dostępnych opcji. Jeśli nie widzisz swojego portfela, może być on ukryty w opcji „WalletConnect”.

![Wybór z listy portfeli, z którymi chcesz się połączyć](./connect2.png)

5. Potwierdź prośbę o podpis w portfelu, aby ustanowić połączenie. **Podpisywanie tej wiadomości nie powinno wymagać wydawania żadnych ETH**.
6. Gotowe! Zacznij używać aplikacji. Możesz znaleźć kilka interesujących projektów na naszej [stronie zdecentralizowanych aplikacji](/dapps/#explore). <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Chcesz dowiedzieć się więcej?</div>
  <ButtonLink href="/guides/">
    Zobacz nasze inne przewodniki
  </ButtonLink>
</InfoBanner>

## Często zadawane pytania

### Jeśli posiadam adres ETH, czy posiadam również ten sam adres w innych blockchainach?

Możesz użyć tego samego adresu we wszystkich blockchainach kompatybilnych z EVM (jeśli posiadasz typ portfela z frazą odzyskiwania). Ta [lista](https://chainlist.org/) pokaże ci, których blockchainów możesz użyć z tym samym adresem. Niektóre blockchainy, takie jak Bitcoin, zaimplementowały całkowicie oddzielny zestaw reguł sieciowych i będziesz potrzebował innego adresu o innym formacie. Jeśli posiadasz portfel z inteligentnym kontraktem (Smart Contract), powinieneś sprawdzić jego stronę internetową, aby uzyskać więcej informacji o tym, na których blockchainach są wspierane.

### Czy mogę użyć tego samego adresu na wielu urządzeniach?

Tak, można używać tego samego adresu na wielu urządzeniach. Portfele zasadniczo są tylko interfejsem do wyświetlania salda i dokonywania transakcji, Twoje konto nie jest przechowywane w portfelu, ale w blockchainie.

### Nie otrzymałem kryptowalut, gdzie mogę sprawdzić status transakcji?

Możesz użyć [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/), aby zobaczyć status każdej transakcji w czasie rzeczywistym. Wszystko, co musisz zrobić, to wyszukać swój adres portfela lub identyfikator transakcji.

### Czy mogę anulować lub zwrócić transakcje?

Nie, gdy transakcja zostanie potwierdzona, nie możesz anulować transakcji.
