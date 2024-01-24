---
title: Tokeny niezamienne (NFT)
description: Przedstawienie NFT na Ethereum
lang: pl
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Logo Ethereum wyświetlane jako hologram.
summaryPoint1: Sposób reprezentowania czegoś wyjątkowego jako aktywu na blockchainie Ethereum.
summaryPoint2: NFT dają ich twórcom możliwości, których nigdy wcześniej nie mieli.
summaryPoint3: Wspierane przez inteligentne kontrakty na blockchainie Ethereum.
---

## Czym są NFT? {#what-are-nfts}

NFT to tokeny, które są unikalne. Każdy NFT ma inne właściwości (niezamienne) i można udowodnić, że jest rzadki. Różni się to od tokenów takich jak ERC-20, gdzie każdy token w zestawie jest identyczny i ma te same właściwości („zamienne”). Nie obchodzi cię, który konkretnie banknot masz w portfelu, ponieważ wszystkie są identyczne i warte tyle samo. Jednakże _ma_ znaczenie, który konkretnie NFT posiadasz, ponieważ wszystkie mają indywidualne właściwości, które odróżniają je od innych („niezamienne”).

Unikalność każdego NFT umożliwia tokenizację rzeczy takich jak dzieła artystyczne, przedmioty kolekcjonerskie, a nawet nieruchomości, gdzie jeden konkretny unikalny NFT reprezentuje konkretny unikalny prawdziwy lub cyfrowy przedmiot. Własność aktywa zabezpieczona jest przez blockchain Ethereum — nikt nie może zmodyfikować rejestrów własności ani skopiować/wkleić nowego NFT.

<YouTube id="Xdkkux6OxfM" />

## Internet rzeczy {#internet-of-assets}

NFT i Ethereum rozwiązują niektóre z problemów występujących w dzisiejszym internecie. Ponieważ wszystko staje się coraz bardziej cyfrowe, istnieje potrzeba odtworzenia właściwości przedmiotów fizycznych, takich jak rzadkość, unikalność i dowód własności w sposób, który nie jest kontrolowany przez centralną organizację. Na przykład, dzięki NFT możesz posiadać muzykę mp3, która nie jest specyficzna dla konkretnej aplikacji muzycznej jednej firmy, lub możesz mieć nazwę konta w mediach społecznościowych, którą możesz sprzedać lub wymienić, ale nie może ona zostać samowolnie odebrana przez dostawcę platformy.

Oto jak wygląda porównanie Internetu NFT z Internetem, z którego korzysta większość z nas...

### Porównanie {#nft-comparison}

| Internet NFT                                                                                                                                        | Internet dzisiaj                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ty jesteś właścicielem swoich aktywów! Tylko Ty możesz je sprzedać lub wymienić.                                                                    | Wynajmujesz aktywa od jakiejś organizacji.                                                                                                                                            |
| NFT są cyfrowo unikalne, nie istnieją dwa takie same NFT.                                                                                           | Kopia jakiejś jednostki często nie może być odróżniona od oryginału.                                                                                                                  |
| Własność NFT jest przechowywana w blockchainie tak, aby każdy mógł ją zweryfikować.                                                                 | Rejestry własności przedmiotów cyfrowych są przechowywane na serwerach kontrolowanych przez instytucje — musisz im wierzyć na słowo.                                                  |
| NFT to inteligentne kontrakty na Ethereum. Oznacza to, że można je łatwo wykorzystać w innych inteligentnych kontraktach i aplikacjach na Ethereum! | Firmy posiadające elementy cyfrowe zazwyczaj wymagają własnej infrastruktury typu „ogrodzony ogród” („walled garden”).                                                                |
| Twórcy mogą sprzedawać swoje prace w dowolnym miejscu i mają dostęp do globalnego rynku.                                                            | Twórcy opierają się na infrastrukturze i systemie dystrybucji platform, z których korzystają. Są one często objęte określonymi warunkami użytkowania i ograniczeniami geograficznymi. |
| Twórcy NFT mogą zachować prawa własności do własnej pracy i zaprogramować tantiemy bezpośrednio w kontrakcie NFT.                                   | Platformy, takie jak serwisy streamingu muzyki, zachowują większość zysków ze sprzedaży.                                                                                              |

## Jak działają NFT? {#how-nfts-work}

Podobnie jak każdy token wydany na Ethereum, NFT są wydawane przez inteligentny kontrakt. Inteligentny kontrakt jest zgodny z jednym z kilku standardów NFT (najczęściej ERC-721 lub ERC-1155), które określają funkcje, jakie posiada kontrakt. Kontrakt może tworzyć („wybijać”) NFT i przypisywać je do określonego właściciela. Własność jest określona w kontrakcie poprzez mapowanie określonych NFT na określone adresy. NFT ma ID i zazwyczaj powiązane z nim metadane, które sprawiają, że konkretny token jest unikalny.

Kiedy ktoś tworzy lub wybija NFT, tak naprawdę wykonuje funkcję w inteligentnym kontrakcie, która przypisuje określony NFT do jego adresu. Informacja ta jest przechowywana w pamięci kontraktu, która jest częścią blochainu. Twórca kontraktu może zapisać w niej dodatkową logikę, na przykład ograniczając całkowitą ilość lub określając tantiemę, która ma być wypłacana twórcy za każdym razem, gdy token zostanie przeniesiony.

## W jakim celu używa się NFT? {#nft-use-cases}

NFT są używane do wielu rzeczy, w tym:

- do udowadniania udziału w wydarzeniu
- do zaświadczania o ukończeniu kursu
- jako posiadalne przedmioty dla graczy
- cyfrowa sztuka
- tokenizacja prawdziwych aktywów
- do potwierdzania tożsamości w sieci
- do ograniczania dostępu do treści
- do wystawiania biletów
- zdecentralizowane nazwy domen internetowych
- jako zabezpieczenie w DeFi

Być może jesteś artystą, który chce udostępniać swoje prace za pomocą NFT, bez utraty kontroli i poświęcania zysków na rzecz pośredników. Możesz utworzyć nowy kontrakt i określić liczbę NFT, ich właściwości oraz link do określonego dzieła sztuki. Jako artysta możesz zaprogramować w inteligentnym kontrakcie tantiemy, które powinny zostać Ci zapłacone (np. przekazać 5% ceny sprzedaży właścicielowi kontraktu za każdym razem, gdy NFT zostanie przeniesione). Zawsze możesz również udowodnić, że NFT został stworzony przez Ciebie, ponieważ jesteś właścicielem portfela, który wdrożył kontrakt. Kupujący mogą łatwo udowodnić, że posiadają autentyczny NFT z Twojej kolekcji, ponieważ ich adres portfela jest powiązany z tokenem w Twoim inteligentnym kontrakcie. Mogą go używać w całym ekosystemie Ethereum, mając pewność co do jego autentyczności.

To tak jak bilet na wydarzenie sportowe. Podobnie jak organizator wydarzenia może wybrać, ile biletów chce sprzedać, twórca NFT może zdecydować, ile istnieje replik. Czasami są to dokładne repliki, takie jak 5000 takich samych biletów wstępu. Czasami wybijanych jest kilka bardzo podobnych, ale każdy z nich nieco się różni, np. bilet z przypisanym miejscem. Można je kupować i sprzedawać peer-to-peer bez płacenia osobie obsługującej bilety, a kupujący zawsze ma pewność co do autentyczności biletu, sprawdzając adres kontraktu.

Na ethereum.org NFT są używane do pokazania, że ludzie wnieśli swój wkład do naszego repozytorium GitHub lub uczestniczyli w rozmowach, a nawet mamy własną nazwę domeny NFT. Jeśli przyczynisz się do rozwoju ethereum.org, możesz otrzymać NFT w formie POAPu. Niektóre spotkania kryptowalutowe wykorzystywały tokeny POAP jako bilety. [Więcej na temat przyczyniania się do rozwoju Ethereum](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Ta strona ma alternatywną domenę obsługiwaną przez NFT, **ethereum.eth**. Nasz adres `.org` jest zarządzany centralnie przez DNS, podczas gdy ethereum`.eth` jest zarejestrowany na Ethereum za pośrednictwem Ethereum Name Service (ENS). Jest ona naszą własnością i jest zarządzana przez nas. [Sprawdź nasz wpis do ENS](https://app.ens.domains/name/ethereum.eth)

[Więcej o ENS](https://app.ens.domains)

<Divider />

### Bezpieczeństwo NFT {#nft-security}

Bezpieczeństwo Ethereum wynika z algorytmu proof-of-stake. System został zaprojektowany w celu ekonomicznego zniechęcenia do złośliwych działań, dzięki czemu Ethereum jest odporne na manipulacje. To właśnie umożliwia działanie NFT. Gdy blok zawierający Twoją transakcję NFT zostanie sfinalizowany, zmiana go kosztowałaby atakującego miliony ETH. Każdy, kto korzysta z oprogramowania Ethereum, byłby w stanie natychmiast wykryć nieuczciwe manipulacje w NFT, a przestępca zostałby ekonomicznie ukarany i wyrzucony.

Kwestie bezpieczeństwa związane z NFT są najczęściej związane z oszustwami typu phishing, lukami w inteligentnych kontraktach lub błędami użytkownika (takimi jak nieumyślne ujawnienie kluczy prywatnych), co sprawia, że dbanie o bezpieczeństwo portfela ma kluczowe znaczenie dla właścicieli NFT.

<ButtonLink to="/security/">
  Więcej o bezpieczeństwie
</ButtonLink>

## Dalsza lektura {#further-reading}

- [Przewodnik po NFT dla początkujących](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) — _Linda Xie, styczeń 2020 r._
- [Moduł śledzący EtherscanNFT](https://etherscan.io/nft-top-contracts)
- [Standard tokenów ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Standard tokenów ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
