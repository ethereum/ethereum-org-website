---
title: Często zadawane pytania
description: Częste pytania dotyczące Ethereum, portfeli, transakcji, stakingu i nie tylko.
lang: pl
---

## Wysłałem krypto na zły adres {#wrong-wallet}

Transakcja wysłana w sieci Ethereum jest nieodwracalna. Niestety, jeśli wysłałeś ETH lub tokeny na zły portfel, nie ma możliwości cofnięcia transakcji.

**Co możesz zrobić:**

- **Jeśli znasz właściciela adresu**, skontaktuj się z nim bezpośrednio i poproś o zwrot środków
- **Jeśli adres należy do giełdy lub znanej usługi**, skontaktuj się z ich zespołem wsparcia, ponieważ mogą być w stanie pomóc
- **Jeśli wysłałeś tokeny na adres kontraktu**, sprawdź, czy kontrakt ma funkcję wypłaty lub odzyskiwania (zdarza się to rzadko)

W większości przypadków nie ma możliwości odzyskania środków. Żadna centralna organizacja, podmiot ani osoba nie jest właścicielem Ethereum, co oznacza, że nikt nie może cofać transakcji. Zawsze dokładnie sprawdzaj adres odbiorcy przed potwierdzeniem.

## Straciłem dostęp do mojego portfela {#lost-wallet-access}

Twoje opcje odzyskiwania zależą od rodzaju portfela, którego używasz.

### Jeśli masz swoją frazę odzyskiwania {#if-you-have-your-seed-phrase-recovery-phrase}

Możesz przywrócić swój portfel w dowolnej kompatybilnej aplikacji portfela, używając swojej frazy odzyskiwania. Dlatego tak ważne jest, aby bezpiecznie przechowywać frazę odzyskiwania w trybie offline. Sprawdź dokumentację dostawcy portfela, aby uzyskać instrukcje dotyczące przywracania.

### Jeśli zgubiłeś swoją frazę odzyskiwania {#if-you-have-lost-your-seed-phrase}

Bez frazy odzyskiwania lub kluczy prywatnych Twoje środki nie mogą zostać odzyskane. Nikt, w tym ethereum.org, nie może zresetować Twojego hasła ani przywrócić dostępu do portfela z samodzielnym przechowywaniem.

### Jeśli Twoje konto znajduje się na giełdzie {#if-your-account-is-on-an-exchange}

Jeśli Twoje konto znajduje się na scentralizowanej giełdzie, takiej jak Coinbase, Binance lub Kraken, skontaktuj się bezpośrednio z zespołem wsparcia giełdy. Kontrolują oni konta na swojej platformie i mogą pomóc w zresetowaniu hasła lub odzyskaniu konta.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Nigdy nie udostępniaj swojej frazy odzyskiwania nikomu**, kto twierdzi, że pomoże Ci odzyskać portfel. Jest to jedna z najczęstszych taktyk oszustów. Żadna legalna usługa nigdy nie poprosi Cię o Twoją frazę odzyskiwania.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Jak korzystać z portfela
</DocLink>

## Moja transakcja utknęła lub jest oczekująca {#stuck-transaction}

Transakcje w sieci Ethereum mogą utknąć, gdy ustawiona przez Ciebie opłata za gaz była niższa niż ta, której obecnie wymaga sieć. Większość portfeli pozwala to naprawić:

- **Przyspiesz:** Prześlij ponownie tę samą transakcję z wyższą opłatą za gaz
- **Anuluj:** Wyślij transakcję o wartości 0 ETH na swój własny adres, używając tego samego nonce, co oczekująca transakcja

### Przydatne przewodniki {#helpful-guides}

- [Jak przyspieszyć lub anulować oczekującą transakcję w MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Jak anulować oczekujące transakcje Ethereum](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Jak mogę odebrać moje darmowe Ethereum z rozdawnictwa? {#giveaway-scam}

Rozdawnictwa (giveaways) Ethereum to oszustwa mające na celu kradzież Twojego ETH. Nie daj się skusić ofertom, które wydają się zbyt piękne, aby mogły być prawdziwe. Jeśli wyślesz ETH na adres rozdawnictwa, nie otrzymasz żadnych darmowych środków i nie będziesz w stanie odzyskać swoich funduszy.

[Więcej o zapobieganiu oszustwom](/security/#common-scams)

## Jak stakować ETH? {#how-to-stake}

Aby zostać walidatorem, musisz stakować 32 ETH w kontrakcie depozytowym Ethereum i skonfigurować węzeł walidatora. Możesz również uczestniczyć z mniejszą ilością ETH za pośrednictwem pul stakingowych.

Więcej informacji jest dostępnych na naszych [stronach o stakingu](/staking/) oraz na [platformie startowej stakingu](https://launchpad.ethereum.org/).

## Jak kopać Ethereum? {#mining-ethereum}

Kopanie Ethereum nie jest już możliwe. Kopanie zostało wyłączone, gdy Ethereum przeszło z [dowodu pracy (PoW)](/glossary/#pow) na [dowód stawki (PoS)](/glossary/#pos) podczas [The Merge](/roadmap/merge/) we wrześniu 2022 roku. Teraz, zamiast górników, Ethereum ma walidatorów. Każdy może [stakować](/glossary/#staking) ETH i otrzymywać nagrody za staking za uruchomienie oprogramowania walidatora w celu zabezpieczenia sieci.