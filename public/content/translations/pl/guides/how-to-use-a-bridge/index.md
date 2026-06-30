---
title: Jak przenieść tokeny przez most do warstwy 2
description: Przewodnik wyjaśniający, jak przenieść tokeny z Ethereum do warstwy 2 za pomocą mostu.
lang: pl
---

Jeśli w sieci Ethereum jest duży ruch, może ona stać się droga. Jednym z rozwiązań tego problemu jest tworzenie nowych „warstw”: tj. różnych sieci, które działają w sposób podobny do samego Ethereum. Te tak zwane warstwy 2 (L2) pomagają zmniejszyć zatory i koszty w Ethereum, przetwarzając znacznie więcej transakcji przy niższych opłatach i tylko co jakiś czas przechowując ich wyniki w Ethereum. W związku z tym te warstwy 2 umożliwiają nam przeprowadzanie transakcji ze zwiększoną szybkością i niższymi kosztami. Wiele popularnych projektów krypto przenosi się do warstw 2 ze względu na te korzyści. Najprostszym sposobem na przeniesienie tokenów z Ethereum do warstwy 2 jest użycie mostu.

**Wymagania wstępne:** 

- posiadanie portfela krypto — jeśli go nie masz, postępuj zgodnie z tym przewodnikiem, aby [utworzyć konto Ethereum](/guides/how-to-create-an-ethereum-account/)
- dodanie środków do portfela

## 1. Określ, której sieci warstwy 2 chcesz użyć {#1-determine-which-layer-2-network-you-want-to-use}

Możesz dowiedzieć się więcej o różnych projektach i ważnych linkach na naszej [stronie o warstwie 2](/layer-2/).

## 2. Przejdź do wybranego mostu {#2-go-to-the-selected-bridge}

Niektóre popularne warstwy 2 to:

- [Most Arbitrum](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Most Optimism](https://app.optimism.io/bridge/deposit)
- [Most sieci Boba](https://hub.boba.network/)

## 3. Połącz się z mostem za pomocą swojego portfela {#3-connect-to-the-bridge-with-your-wallet}

Upewnij się, że Twój portfel jest połączony z siecią główną Ethereum. Jeśli tak nie jest, strona internetowa automatycznie poprosi Cię o zmianę sieci.

![Common interface for bridging tokens](./bridge1.png)

## 4. Określ kwotę i przenieś środki {#4-specify-the-amount-and-move-the-funds}

Sprawdź kwotę, którą otrzymasz w zamian w sieci warstwy 2, oraz opłaty, aby uniknąć nieprzyjemnych niespodzianek.

![Common interface for bridging tokens](./bridge2.png)

## 5. Potwierdź transakcję w swoim portfelu {#5-confirm-the-transaction-in-your-wallet}

Będziesz musiał zapłacić opłatę (zwaną [gazem](/glossary/#gas)) w postaci ETH za przetworzenie transakcji.

![Common interface for bridging tokens](./bridge3.png)

## 6. Poczekaj na przeniesienie środków {#6-wait-for-your-funds-to-be-moved}

Ten proces nie powinien zająć więcej niż 10 minut.

## 7. Dodaj wybraną sieć warstwy 2 do swojego portfela (opcjonalnie) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

Możesz użyć [chainlist.org](https://chainlist.org), aby znaleźć szczegóły RPC sieci. Po dodaniu sieci i zakończeniu transakcji powinieneś zobaczyć tokeny w swoim portfelu.
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

### Co jeśli mam środki na giełdzie? {#what-if-i-have-funds-on-an-exchange}

Możesz mieć możliwość wypłaty do niektórych warstw 2 bezpośrednio z giełdy. Sprawdź sekcję „Przejdź do warstwy 2” na naszej [stronie o warstwie 2](/layer-2/), aby uzyskać więcej informacji.

### Czy mogę wrócić do sieci głównej Ethereum po przeniesieniu moich tokenów przez most do L2? {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

Tak, zawsze możesz przenieść swoje środki z powrotem do sieci głównej za pomocą tego samego mostu.
