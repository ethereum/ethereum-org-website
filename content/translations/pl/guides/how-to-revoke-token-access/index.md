---
title: Jak unieważnić dostęp inteligentnych kontraktów do środków kryptowaluty
description: Przewodnik na temat unieważnienia dostępu do tokenów inteligentnym kontraktom
lang: pl
---

# Jak unieważnić dostęp inteligentnych kontraktów do środków kryptowaluty

W tym przewodniku dowiesz się, jak wyświetlić listę wszystkich [inteligentnych kontraktów](/glossary/#smart-contract) mających za Twoją zgodą dostęp do Twoich środków i jak je anulować.

Czasami złośliwi programiści tworzą backdoory w inteligentnych kontraktach, które umożliwiają dostęp do funduszy nieświadomych użytkowników, którzy wchodzą w interakcję z inteligentnym kontraktem. Często zdarza się, że takie platformy proszą użytkownika o zgodę na wydanie **nieograniczonej liczby tokenów** w celu zaoszczędzenia niewielkich ilości [gazu](/glossary/#gas) w przyszłości, ale wiąże się to ze zwiększonym ryzykiem.

Gdy platforma ma nieograniczone prawa dostępu do tokena w [portfelu](/glossary/#wallet) użytkownika, może wydać wszystkie te tokeny, nawet jeśli użytkownik wycofał swoje środki z ich platformy do portfela. Złośliwi użytkownicy mogą nadal uzyskiwać dostęp do twoich środków i wypłacać je do swoich portfeli bez możliwości ich odzyskania.

Jedynym zabezpieczeniem jest powstrzymanie się od korzystania z niesprawdzonych nowych projektów, zatwierdzanie tylko tych, które są potrzebne, lub regularne cofanie dostępu. Jak więc to zrobić?

## Krok 1: Użyj narzędzi do cofania dostępu

Istnieje kilka stron umożliwiających przeglądanie i unieważnianie inteligentnych kontraktów powiązanych z adresem użytkownika. Odwiedź stronę i podłącz swój portfel:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (wiele sieci)
- [Revoke](https://revoke.cash/) (wiele sieci)
- [Unrekt](https://app.unrekt.net/) (wiele sieci)
- [EverRevoke](https://everrise.com/everrevoke/) (wiele sieci)

## Krok 2: Połącz swój portfel

Po wejściu na stronę kliknij "Połącz portfel". Strona powinna wyświetlić komunikat o podłączeniu portfela.

Upewnij się, że korzystasz z tej samej sieci w portfelu i na stronie internetowej. Wyświetlone zostaną tylko inteligentne kontrakty powiązane z wybraną siecią. Na przykład, jeśli połączysz się z siecią główną Ethereum (Mainnet), zobaczysz tylko kontrakty Ethereum, a nie kontrakty z innych łańcuchów, takich jak Polygon.

## Krok 3: Wybierz inteligenty kontrakt, który chcesz unieważnić

Powinieneś zobaczyć wszystkie kontrakty, które mają dostęp do twoich tokenów i ich limit wydatków. Znajdź ten, który chcesz unieważnić.

Jeśli nie wiesz, który kontrakt wybrać, możesz unieważnić wszystkie. Nie spowoduje to żadnych problemów, ale będziesz musiał przyznać nowy zestaw uprawnień przy następnej interakcji z którymkolwiek z tych kontraktów.

## Krok 4: Unieważnienie dostępu do środków

Po kliknięciu przycisku unieważnienia, w portfelu powinna pojawić się sugestia nowej transakcji. Należy się tego spodziewać. Aby anulowanie było skuteczne, należy uiścić opłatę. W zależności od sieci może to zająć od minuty do kilku minut.

Zalecamy odświeżenie narzędzia do unieważniania po kilku minutach i ponowne podłączenie portfela, aby dwukrotnie sprawdzić, czy unieważniony kontrakt zniknął z listy.

<mark>Zalecamy, aby nigdy nie zezwalać projektom na nieograniczony dostęp do tokenów i regularnie unieważniać wszystkie uprawnienia do tokenów. Unieważnienie dostępu do tokenów nigdy nie powinno skutkować utratą środków, zwłaszcza jeśli korzystasz z narzędzi wymienionych powyżej.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Chcesz dowiedzieć się więcej?</div>
  <ButtonLink href="/guides/">
    Zobacz nasze inne przewodniki
  </ButtonLink>
</InfoBanner>

## Często zadawane pytania

### Czy unieważnienie dostępu do tokenów powoduje również zakończenie stakowania, poolingu, pożyczek itp?

Nie, nie wpłynie to na żadną z Twoich strategii [DeFi](/glossary/#defi). Twoje pozycje pozostają niezmienione i nadal będziesz otrzymywać nagrody itp.

### Czy odłączenie portfela od projektu jest równoznaczne z usunięciem uprawnień na korzystanie z moich środków?

Nie, jeśli odłączysz swój portfel od projektu, ale przyznałeś uprawnienia do tokenów, nadal mogą one korzystać z tych tokenów. Musisz usunąć ten dostęp.

### Kiedy wygasną uprawnienia kontraktu?

Nie ma dat wygaśnięcia uprawnień kontraktu. Jeśli udzielisz uprawnień kontraktowi, mogą one zostać wykorzystane nawet wiele lat po ich udzieleniu.

### Dlaczego projekty ustawiają nieograniczony limit tokenów?

Projekty często robią to, aby zminimalizować liczbę wymaganych żądań, co oznacza, że użytkownik musi zatwierdzić tylko raz i zapłacić opłatę transakcyjną tylko raz. Chociaż jest to wygodne, może być niebezpieczne dla użytkowników, którzy zatwierdzają nieostrożnie, na stronach, które nie zostały sprawdzone w czasie lub poddane audytowi. Niektóre portfele umożliwiają ręczne ograniczenie ilości zatwierdzanych tokenów w celu ograniczenia ryzyka. Więcej informacji można uzyskać u dostawcy portfela.
