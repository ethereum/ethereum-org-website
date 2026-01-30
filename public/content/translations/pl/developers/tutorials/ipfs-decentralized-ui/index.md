---
title: IPFS dla zdecentralizowanych interfejsów użytkownika
description: Ten samouczek uczy czytelnika, jak używać IPFS do przechowywania interfejsu użytkownika dla dapki. Chociaż dane i logika biznesowa aplikacji są zdecentralizowane, bez odpornego na cenzurę interfejsu użytkownika użytkownicy i tak mogą stracić do niej dostęp.
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: beginner
lang: pl
published: 2024-06-29
---

Udało Ci się stworzyć niesamowitą nową dapką. Udało Ci się nawet napisać dla niej [interfejs użytkownika](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Ale teraz obawiasz się, że ktoś spróbuje ją ocenzurować, wyłączając Twój interfejs użytkownika, który jest tylko jednym serwerem w chmurze. W tym samouczku dowiesz się, jak uniknąć cenzury, umieszczając swój interfejs użytkownika w **[międzyplanetarnym systemie plików (IPFS)](https://ipfs.tech/developers/)**, dzięki czemu każda zainteresowana osoba będzie mogła go przypiąć na serwerze w celu przyszłego dostępu.

Możesz użyć usługi strony trzeciej, takiej jak [Fleek](https://resources.fleek.xyz/docs/), aby wykonać całą pracę. Ten samouczek jest dla osób, które chcą zrobić wystarczająco dużo, aby zrozumieć, co robią, nawet jeśli wymaga to więcej pracy.

## Rozpoczęcie pracy lokalnie {#getting-started-locally}

Istnieje wielu [zewnętrznych dostawców IPFS](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), ale najlepiej zacząć od uruchomienia IPFS lokalnie w celach testowych.

1. Zainstaluj [interfejs użytkownika IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Utwórz katalog z Twoją stroną internetową. Jeśli używasz [Vite](https://vite.dev/), użyj tego polecenia:

   ```sh
   pnpm vite build
   ```

3. W IPFS Desktop kliknij **Importuj > Folder** i wybierz katalog utworzony w poprzednim kroku.

4. Wybierz właśnie przesłany folder i kliknij **Zmień nazwę**. Nadaj mu bardziej znaczącą nazwę.

5. Wybierz go ponownie i kliknij **Udostępnij link**. Skopiuj adres URL do schowka. Link będzie podobny do `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Kliknij **Status**. Rozwiń zakładkę **Zaawansowane**, aby zobaczyć adres bramki. Na przykład, w moim systemie adres to `http://127.0.0.1:8080`.

7. Połącz ścieżkę z kroku z linkiem z adresem bramki, aby znaleźć swój adres. Na przykład dla powyższego przykładu adres URL to `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Otwórz ten adres URL w przeglądarce, aby zobaczyć swoją stronę.

## Przesyłanie {#uploading}

Teraz możesz używać IPFS do serwowania plików lokalnie, co nie jest zbyt ekscytujące. Następnym krokiem jest udostępnienie ich światu, gdy jesteś offline.

Istnieje wiele dobrze znanych [usług przypinania](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Wybierz jedną z nich. Niezależnie od tego, z której usługi korzystasz, musisz utworzyć konto i podać **identyfikator treści (CID)** w Twoim IPFS desktop.

Osobiście uważam, że [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) jest najłatwiejszy w użyciu. Oto wskazówki:

1. Przejdź do [pulpitu nawigacyjnego](https://dashboard.4everland.org/overview) i zaloguj się za pomocą swojego portfela.

2. W lewym panelu bocznym kliknij **Przechowywanie > 4EVER Pin**.

3. Kliknij **Prześlij > Wybrany CID**. Nazwij swoją zawartość i podaj CID z IPFS desktop. Obecnie CID to ciąg znaków, który zaczyna się od `Qm`, po którym następują 44 litery i cyfry reprezentujące [zakodowany w base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524) hasz, taki jak `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, ale [prawdopodobnie to się zmieni](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Początkowy status to **W kolejce**. Odświeżaj, aż zmieni się na **Przypięty**.

5. Kliknij swój CID, aby uzyskać link. Moją aplikację możesz zobaczyć [tutaj](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im/).

6. Może być konieczne aktywowanie konta, aby było ono przypięte dłużej niż przez miesiąc. Aktywacja konta kosztuje około 1 USD. Jeśli to zamkniesz, wyloguj się i zaloguj ponownie, aby ponownie zostać poproszonym o aktywację.

## Używanie z IPFS {#using-from-ipfs}

W tym momencie masz link do scentralizowanej bramki, która serwuje Twoją zawartość IPFS. Krótko mówiąc, Twój interfejs użytkownika może być nieco bezpieczniejszy, ale wciąż nie jest odporny na cenzurę. Dla prawdziwej odporności na cenzurę użytkownicy muszą korzystać z IPFS [bezpośrednio z przeglądarki](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Gdy już to zainstalujesz (i gdy IPFS desktop działa), możesz przejść do [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) na dowolnej stronie i otrzymasz tę zawartość, serwowaną w sposób zdecentralizowany.

## Wady {#drawbacks}

Nie można niezawodnie usuwać plików IPFS, więc dopóki modyfikujesz swój interfejs użytkownika, prawdopodobnie najlepiej jest albo pozostawić go scentralizowanym, albo użyć [międzyplanetarnego systemu nazw (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), systemu, który zapewnia zmienność na bazie IPFS. Oczywiście wszystko, co jest zmienne, może być cenzurowane, w przypadku IPNS poprzez wywieranie presji na osobę posiadającą klucz prywatny, któremu on odpowiada.

Dodatkowo, niektóre pakiety mają problem z IPFS, więc jeśli Twoja strona internetowa jest bardzo skomplikowana, to może nie być to dobre rozwiązanie. I oczywiście nic, co opiera się na integracji z serwerem, nie może zostać zdecentralizowane tylko przez umieszczenie strony klienta w IPFS.

## Wnioski {#conclusion}

Tak jak Ethereum pozwala zdecentralizować bazę danych i aspekty logiki biznesowej Twojej dapki, tak IPFS pozwala zdecentralizować interfejs użytkownika. To pozwala wyeliminować kolejny wektor ataku przeciwko Twojej dapce.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
