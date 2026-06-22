---
title: Jak cofnąć dostęp inteligentnych kontraktów do twoich środków krypto
description: Przewodnik krok po kroku, jak cofnąć dostęp do tokenów dla nieuczciwych inteligentnych kontraktów
lang: pl
---

Ten przewodnik nauczy cię, jak wyświetlić listę wszystkich [inteligentnych kontraktów](/glossary/#smart-contract), którym przyznano dostęp do twoich środków, oraz jak go anulować.

Czasami złośliwi programiści tworzą luki (backdoory) w inteligentnych kontraktach, które pozwalają na dostęp do środków nieświadomych użytkowników wchodzących w interakcję z inteligentnym kontraktem. Często zdarza się, że takie platformy proszą użytkownika o pozwolenie na wydanie **nieograniczonej liczby tokenów** w celu zaoszczędzenia niewielkich ilości [gazu](/glossary/#gas) w przyszłości, ale wiąże się to ze zwiększonym ryzykiem.

Gdy platforma uzyska nieograniczone prawa dostępu do tokena w twoim [portfelu](/glossary/#wallet), może wydać wszystkie te tokeny, nawet jeśli wypłacisz swoje środki z ich platformy do swojego portfela. Złośliwi aktorzy nadal mogą uzyskać dostęp do twoich środków i wypłacić je do swoich portfeli, nie pozostawiając ci żadnej opcji ich odzyskania.

Jedyną ochroną jest powstrzymanie się od korzystania z niesprawdzonych nowych projektów, zatwierdzanie tylko tego, czego potrzebujesz, lub regularne cofanie dostępu. Jak więc to zrobić?

## Krok 1: Użyj narzędzi do cofania dostępu {#step-1-use-revoke-access-tools}

Kilka stron internetowych pozwala na przeglądanie i cofanie dostępu inteligentnych kontraktów połączonych z twoim adresem. Odwiedź stronę i podłącz swój portfel:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (wiele sieci)
- [Unrekt](https://app.unrekt.net/) (wiele sieci)
- [EverRevoke](https://everrise.com/everrevoke/) (wiele sieci)

## Krok 2: Podłącz swój portfel {#step-2-connect-your-wallet}

Gdy znajdziesz się na stronie, kliknij „Connect wallet” (Podłącz portfel). Strona powinna poprosić cię o podłączenie portfela.

Upewnij się, że używasz tej samej sieci w swoim portfelu i na stronie internetowej. Zobaczysz tylko inteligentne kontrakty powiązane z wybraną siecią. Na przykład, jeśli połączysz się z siecią główną Ethereum, zobaczysz tylko kontrakty Ethereum, a nie kontrakty z innych łańcuchów, takich jak Polygon.

## Krok 3: Wybierz inteligentny kontrakt, który chcesz cofnąć {#step-3-select-a-smart-contract-you-wish-to-revoke}

Powinieneś zobaczyć wszystkie kontrakty, które mają dostęp do twoich tokenów, oraz ich limit wydatków. Znajdź ten, który chcesz zakończyć.

Jeśli nie wiesz, który kontrakt wybrać, możesz cofnąć wszystkie. Nie sprawi ci to żadnych problemów, ale będziesz musiał przyznać nowy zestaw uprawnień przy następnej interakcji z którymkolwiek z tych kontraktów.

## Krok 4: Cofnij dostęp do swoich środków {#step-4-revoke-access-to-your-funds}

Po kliknięciu przycisku cofania (revoke), powinieneś zobaczyć nową propozycję transakcji w swoim portfelu. Jest to całkowicie normalne. Będziesz musiał zapłacić opłatę, aby anulowanie zakończyło się sukcesem. W zależności od sieci, przetwarzanie może potrwać od minuty do kilku minut.

Zalecamy odświeżenie narzędzia do cofania po kilku minutach i ponowne podłączenie portfela, aby upewnić się, że cofnięty kontrakt zniknął z listy.

<mark>Zalecamy, aby nigdy nie pozwalać projektom na nieograniczony dostęp do twoich tokenów i regularnie cofać wszystkie limity wydatków tokenów. Cofnięcie dostępu do tokenów nigdy nie powinno skutkować utratą środków, zwłaszcza jeśli korzystasz z narzędzi wymienionych powyżej.</mark>

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

### Czy cofnięcie dostępu do tokenów kończy również staking, pule płynności, pożyczanie itp.? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Nie, nie wpłynie to na żadne z twoich strategii [zdecentralizowanych finansów (DeFi)](/glossary/#defi). Pozostaniesz na swoich pozycjach i nadal będziesz otrzymywać nagrody itp.

### Czy odłączenie portfela od projektu to to samo, co usunięcie pozwolenia na korzystanie z moich środków? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Nie, jeśli odłączysz swój portfel od projektu, ale przyznałeś limity wydatków tokenów, nadal mogą oni korzystać z tych tokenów. Musisz cofnąć ten dostęp.

### Kiedy wygasa pozwolenie dla kontraktu? {#when-will-the-contract-permission-expire}

Pozwolenia dla kontraktów nie mają daty ważności. Jeśli przyznasz pozwolenia kontraktowi, mogą one zostać użyte nawet wiele lat po ich przyznaniu.

### Dlaczego projekty ustawiają nieograniczony limit wydatków tokenów? {#why-do-projects-set-unlimited-token-allowance}

Projekty często robią to, aby zminimalizować liczbę wymaganych żądań, co oznacza, że użytkownik musi zatwierdzić je tylko raz i zapłacić opłatę transakcyjną tylko raz. Choć jest to wygodne, nieostrożne zatwierdzanie może być niebezpieczne dla użytkowników na stronach, które nie zostały sprawdzone z upływem czasu lub nie przeszły audytu. Niektóre portfele pozwalają na ręczne ograniczenie ilości zatwierdzanych tokenów w celu ograniczenia ryzyka. Skontaktuj się z dostawcą swojego portfela, aby uzyskać więcej informacji.
