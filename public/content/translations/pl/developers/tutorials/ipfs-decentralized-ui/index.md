---
title: "IPFS dla zdecentralizowanych interfejsów użytkownika"
description: "Ten samouczek uczy czytelnika, jak używać IPFS do przechowywania interfejsu użytkownika dla zdecentralizowanej aplikacji (dapp). Chociaż dane i logika biznesowa aplikacji są zdecentralizowane, bez interfejsu użytkownika odpornego na cenzurę użytkownicy i tak mogą stracić do niej dostęp."
author: Ori Pomerantz
tags:
  - ipfs
  - dapps
  - frontend
skill: beginner
breadcrumb: "IPFS dla interfejsów użytkownika dapp"
lang: pl
published: 2024-06-29
---

Napisałeś niesamowitą nową zdecentralizowaną aplikację (dapp). Napisałeś dla niej nawet [interfejs użytkownika](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Ale teraz obawiasz się, że ktoś spróbuje ją ocenzurować, wyłączając Twój interfejs użytkownika, który znajduje się na pojedynczym serwerze w chmurze. W tym samouczku dowiesz się, jak uniknąć cenzury, umieszczając swój interfejs użytkownika w **[międzyplanetarnym systemie plików (IPFS)](https://ipfs.tech/developers/)**, dzięki czemu każdy zainteresowany będzie mógł przypiąć go do serwera w celu uzyskania dostępu w przyszłości.

Mógłbyś użyć usługi innej firmy, takiej jak [Fleek](https://resources.fleek.xyz/docs/), aby wykonała całą pracę. Ten samouczek jest dla osób, które chcą zrobić wystarczająco dużo, aby zrozumieć, co robią, nawet jeśli wymaga to więcej pracy.

## Rozpoczęcie pracy lokalnie {#getting-started-locally}

Istnieje wielu [zewnętrznych dostawców IPFS](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), ale najlepiej zacząć od uruchomienia IPFS lokalnie w celach testowych.

1. Zainstaluj [interfejs użytkownika IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Utwórz katalog ze swoją stroną internetową. Jeśli używasz [Vite](https://vite.dev/), użyj tego polecenia:

   ```sh
   pnpm vite build
   ```

3. W IPFS Desktop kliknij **Import > Folder** i wybierz katalog utworzony w poprzednim kroku.

4. Wybierz właśnie przesłany folder i kliknij **Rename** (Zmień nazwę). Nadaj mu bardziej znaczącą nazwę.

5. Wybierz go ponownie i kliknij **Share link** (Udostępnij link). Skopiuj adres URL do schowka. Link będzie podobny do `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Kliknij **Status**. Rozwiń kartę **Advanced** (Zaawansowane), aby zobaczyć adres bramy. Na przykład w moim systemie adres to `http://127.0.0.1:8080`.

7. Połącz ścieżkę z kroku z linkiem z adresem bramy, aby znaleźć swój adres. Na przykład dla powyższego przykładu adres URL to `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Otwórz ten adres URL w przeglądarce, aby zobaczyć swoją stronę.

## Przesyłanie {#uploading}

Teraz możesz używać IPFS do serwowania plików lokalnie, co nie jest zbyt ekscytujące. Następnym krokiem jest udostępnienie ich światu, gdy jesteś offline.

Istnieje wiele dobrze znanych [usług przypinania (pinning services)](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Wybierz jedną z nich. Niezależnie od tego, z jakiej usługi korzystasz, musisz utworzyć konto i podać jej **identyfikator treści (CID)** ze swojego IPFS Desktop.

Osobiście uważam, że [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) jest najłatwiejszy w użyciu. Oto instrukcje dla niego:

1. Przejdź do [pulpitu nawigacyjnego](https://dashboard.4everland.org/overview) i zaloguj się za pomocą swojego portfela.

2. Na lewym pasku bocznym kliknij **Storage > 4EVER Pin**.

3. Kliknij **Upload > Selected CID**. Nadaj swojej treści nazwę i podaj CID z IPFS Desktop. Obecnie CID to ciąg znaków zaczynający się od `Qm`, po którym następują 44 litery i cyfry reprezentujące hash [zakodowany w base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), taki jak `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, ale [to prawdopodobnie ulegnie zmianie](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Początkowy status to **Queued** (W kolejce). Odświeżaj, aż zmieni się na **Pinned** (Przypięto).

5. Kliknij swój CID, aby uzyskać link. Możesz zobaczyć moją aplikację [tutaj](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Być może będziesz musiał aktywować swoje konto, aby było przypięte na dłużej niż miesiąc. Aktywacja konta kosztuje około 1 dolara. Jeśli je zamknąłeś, wyloguj się i zaloguj ponownie, aby ponownie poproszono Cię o aktywację.

## Korzystanie z IPFS {#using-from-ipfs}

W tym momencie masz link do scentralizowanej bramy, która serwuje Twoją treść IPFS. Krótko mówiąc, Twój interfejs użytkownika może być nieco bezpieczniejszy, ale nadal nie jest odporny na cenzurę. Aby uzyskać prawdziwą odporność na cenzurę, użytkownicy muszą korzystać z IPFS [bezpośrednio z przeglądarki](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Po zainstalowaniu tego (i uruchomieniu IPFS Desktop), możesz przejść do [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) na dowolnej stronie, a otrzymasz tę treść, serwowaną w sposób zdecentralizowany.

## Wady {#drawbacks}

Nie można w niezawodny sposób usuwać plików IPFS, więc dopóki modyfikujesz swój interfejs użytkownika, prawdopodobnie najlepiej jest pozostawić go scentralizowanym lub użyć [międzyplanetarnego systemu nazw (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), systemu, który zapewnia zmienność na wierzchu IPFS. Oczywiście wszystko, co jest zmienne, może zostać ocenzurowane, w przypadku IPNS poprzez wywieranie presji na osobę posiadającą klucz prywatny, któremu on odpowiada.

Dodatkowo, niektóre pakiety mają problem z IPFS, więc jeśli Twoja strona internetowa jest bardzo skomplikowana, może to nie być dobre rozwiązanie. I oczywiście nic, co opiera się na integracji z serwerem, nie może zostać zdecentralizowane tylko poprzez umieszczenie strony klienta w IPFS.

## Odkrywalność poprzez ENS {#discoverability}

Jeśli wskażesz nazwę ENS (np. vitalik.eth) na swoją stronę internetową, zostanie ona uznana za w pełni zdecentralizowaną stronę internetową i zostanie automatycznie przypięta przez usługę [dweb3.wtf](https://dweb3.wtf), a także udostępniona do wyszukiwania za pośrednictwem wyszukiwarki [web3compass.net](https://web3compass.net), podobnie jak robią to DuckDuckGo, Brave Search lub Google dla tradycyjnej sieci.

## Wnioski {#conclusion}

Podobnie jak Ethereum pozwala na decentralizację bazy danych i logiki biznesowej Twojej zdecentralizowanej aplikacji (dapp), IPFS pozwala na decentralizację interfejsu użytkownika. Pozwala to na wyeliminowanie jeszcze jednego wektora ataku na Twoją aplikację dapp.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).