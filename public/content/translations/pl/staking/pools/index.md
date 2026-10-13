---
title: Płynny staking i staking grupowy
description: Przegląd płynnego stakingu i stakingu grupowego na Ethereum
lang: pl
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Stakuj i zdobywaj nagrody z dowolną ilością ETH, łącząc siły z innymi
  - Pomiń trudną część i powierz obsługę walidatora stronie trzeciej
  - Przechowuj tokeny płynnego stakingu we własnym portfelu
---

## Czym są pule stakingowe? {#what-are-staking-pools}

Pule stakingowe to oparte na współpracy podejście, które pozwala wielu osobom z mniejszymi ilościami ETH na zebranie minimum 32 ETH wymaganego do aktywacji walidatora w sieci [Ethereum](/). Funkcjonalność łączenia w pule nie jest natywnie obsługiwana w ramach protokołu, dlatego rozwiązania te zostały zbudowane oddzielnie, aby zaspokoić potrzebę uczestnictwa z mniejszymi kwotami.

Niektóre pule stakingowe działają przy użyciu inteligentnych kontraktów, w których środki są deponowane w kontrakcie, który zarządza i śledzi Twoją stawkę, a także wydaje Ci token pokwitowania (token płynnego stakingu), który reprezentuje tę wartość. Inne pule mogą nie wykorzystywać inteligentnych kontraktów i zamiast tego są pośredniczone w sposób pozałańcuchowy.

Opcje grupowe różnią się ogromnie pod względem tego, ile można o nich zweryfikować. Przejrzyste, zarządzane przez protokół pule to inteligentne kontrakty open-source na Ethereum, które przechowują depozyty, publikują swoje zestawy operatorów węzłów i wydają token podlegający wymianie; wszystko, co zabezpiecza Twoją pozycję, jest widoczne onchain. Nieprzejrzyste produkty grupowe, takie jak niektóre programy dochodowe scentralizowanych giełd, przejmują Twoje ETH w depozyt i nie możesz niezależnie zweryfikować, co jest stakowane w Twoim imieniu, o ile w ogóle cokolwiek jest. Większość tej strony dotyczy pierwszego rodzaju; zobacz [nieprzejrzyste produkty grupowe](#opaque-pooled-products), aby dowiedzieć się, jak je odróżnić.

Każda opcja grupowa rozwiązuje rzeczywisty problem dostępu do stakingu z mniej niż 32 ETH lub bez uruchamiania sprzętu. Ale każda z nich stawia również pośrednika między stakującym a głównym protokołem Ethereum. Tylko [staking solo](/staking/solo/) daje Ci bezpośrednią, niepośredniczoną relację z Ethereum.

## Dlaczego warto stakować w puli? {#why-stake-with-a-pool}

Oprócz korzyści płynących z [uczestnictwa w stakingu](/staking/), stakowanie w puli wiąże się z wieloma unikalnymi korzyściami.

<Grid>
  <Card title="Niska bariera wejścia" icon={<Fish />} description="Nie jesteś wielorybem? Żaden problem. Większość pul stakingowych pozwala na stakowanie praktycznie dowolnej ilości ETH poprzez połączenie sił z innymi stakującymi, w przeciwieństwie do stakingu solo, który wymaga 32 ETH." />
  <Card title="Stakuj już dziś" icon={<Clock />} description="Stakowanie w puli jest tak proste, jak wymiana tokenów. Nie musisz martwić się o konfigurację sprzętu i utrzymanie węzła. Pule pozwalają na zdeponowanie ETH, co umożliwia operatorom węzłów uruchamianie walidatorów. Nagrody są następnie rozdzielane między współtwórców po odliczeniu opłaty za operacje węzła." />
  <Card title="Tokeny płynnego stakingu" icon={<Droplets />} description="Wiele pul stakingowych zapewnia token, który reprezentuje roszczenie do Twojego stakowanego ETH i generowanych przez nie nagród. Pozwala to na wykorzystanie stakowanego ETH, np. jako zabezpieczenie w aplikacjach DeFi." />
</Grid>

## Porównanie opcji stakingu {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Tokeny płynnego stakingu {#liquid-staking-tokens}

Większość przejrzystych pul stakingowych emituje **token płynnego stakingu (LST)**, token ERC-20, który reprezentuje roszczenie do stakowanego ETH i nagród, które zarabia. Kiedy deponujesz ETH, protokół stakuje je u swoich operatorów węzłów i wybija token pokwitowania (LST) do Twojego portfela. Możesz samodzielnie przechowywać token lub powierzyć go zewnętrznemu dostawcy, a także w dowolnym momencie dokonać transferu lub sprzedać token. Bazowe ETH pozostaje stakowane w warstwie konsensusu. Protokoły płynnego stakingu odpowiadają za około jedną trzecią całego stakowanego ETH, co czyni LST jednym z najczęstszych sposobów stakowania w dzisiejszych czasach.

### Jak nagrody pojawiają się w tokenie {#how-rewards-show-up-in-the-token}

LST odzwierciedlają nagrody za staking na jeden z dwóch sposobów:

- **Tokeny z mechanizmem rebase** (takie jak stETH od Lido): saldo Twoich tokenów rośnie w miarę naliczania nagród, więc jeden token pozostaje w przybliżeniu równy wartości jednego ETH.
- **Tokeny oparte na kursie wymiany** (takie jak rETH od Rocket Pool): saldo Twoich tokenów pozostaje takie samo, ale z czasem każdy token można wymienić na rosnącą ilość ETH.

Oba projekty dostarczają nagrody pomniejszone o opłatę protokołu stakingowego. Żaden z nich nie jest z natury lepszy, ale zachowują się inaczej w portfelach i aplikacjach zdecentralizowanych finansów (DeFi) i są różnie traktowane do celów podatkowych w niektórych jurysdykcjach. Tokeny z mechanizmem rebase często mają „opakowane” (wrapped) wersje bez tego mechanizmu w celu zapewnienia kompatybilności z aplikacjami [DeFi](/glossary/#defi).

### Wymiana i handel {#redeeming-and-trading}

Istnieją dwa sposoby na wyjście z pozycji LST:

- **Wymiana przez protokół** na bazowe ETH. Wymiana zależy od dostępności płynności w protokole, czyli bufora niestakowanego ETH lub walidatorów wychodzących przez kolejkę wyjścia warstwy konsensusu, co może zająć trochę czasu.
- **Sprzedaż na rynkach wtórnych** w dowolnym momencie. Ponieważ token jest przedmiotem swobodnego obrotu, jego cena rynkowa może odbiegać od wartości zabezpieczającego go ETH, szczególnie w okresach napięć rynkowych.

Od czasu aktualizacji Pectra, [wypłaty wyzwalane z warstwy wykonawczej (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) pozwalają na wyzwalanie wyjść walidatorów bezpośrednio z warstwy wykonawczej przez posiadacza adresu wypłaty. Protokoły stakingowe mogą korzystać z tej funkcji, aby upewnić się, że ich walidatory mogą wyjść bez polegania na współpracy operatorów węzłów, więc wymiany w mniejszym stopniu opierają się na zaufaniu do operatorów węzłów niż miało to miejsce w przeszłości.

### Posiadanie LST to nie to samo co staking {#holding-an-lst-is-not-the-same-as-staking}

Protokół Ethereum wypłaca nagrody walidatorom; nie wie, że Twój token istnieje. Kiedy posiadasz LST, z punktu widzenia protokołu nie jesteś stakującym. Zamiast tego posiadasz roszczenie do usługi lub inteligentnego kontraktu, który stakuje w Twoim imieniu. Działa to dobrze w normalnych warunkach, ale wiąże się z dodatkowymi zależnościami opartymi na zaufaniu. Twoje stakowane ETH zależy od prawidłowego działania kontraktów puli, zarządzania i operatorów, a nie tylko od samego Ethereum.

## Ryzyka związane z tokenami płynnego stakingu {#risks-of-liquid-staking-tokens}

LST dziedziczą podstawowe ryzyka związane ze stakingiem (takie jak cięcie i kary za przestoje walidatorów puli) i dodają własne warstwy:

- **Ryzyko inteligentnych kontraktów** - Twoje ETH jest przechowywane przez kontrakty, które mogą zawierać błędy lub zostać wykorzystane przez hakerów. Preferuj protokoły z otwartym kodem źródłowym (open-source), audytowanym i sprawdzonym w boju kodem.
- **Ryzyko rynkowe i płynności** - cena tokena na rynku wtórnym może spaść poniżej wartości zabezpieczającego go ETH („depegging”). Jeśli wymiany w protokole są powolne lub przeciążone, gdy chcesz wyjść, sprzedaż ze zniżką może być Twoim jedynym szybkim wyjściem.
- **Ryzyko zarządzania i aktualizacji** - opłaty, zestawy operatorów węzłów, a nawet sposób działania tokena mogą zostać zmienione poprzez zarządzanie protokołem i aktualizacje kontraktów. Jako posiadacz tokena zazwyczaj nie masz głosu w tym zarządzaniu.
- **Centralizacja zestawu operatorów** - niektóre pule koncentrują stawkę u wybranych przez siebie operatorów węzłów. Duże ilości stakowanego ETH pod kontrolą kilku organizacji stwarzają warunki do cenzury, ekstrakcji wartości i pojedynczych punktów awarii. Preferuj pule z niewymagającymi pozwoleń, rozproszonymi zestawami operatorów.
- **Przenoszenie cięć** - jeśli walidatory puli zostaną poddane cięciu lub ukarane, strata jest zazwyczaj uspołeczniana wśród wszystkich posiadaczy tokenów zgodnie z zasadami protokołu.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Wiele pul zmniejsza ryzyko operatora, korzystając z **technologii rozproszonych walidatorów (DVT)**, oprogramowania pośredniczącego, które dzieli klucz walidatora na wiele maszyn i operatorów, dzięki czemu żadna pojedyncza awaria lub naruszenie bezpieczeństwa nie powoduje wyłączenia walidatora. [Więcej o technologii rozproszonych walidatorów](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Nieprzejrzyste produkty grupowe {#opaque-pooled-products}

Nie wszystko, co jest reklamowane jako „staking”, jest stakingiem w protokole. Programy „zarabiania” lub „nagród” na scentralizowanych giełdach, a także niektóre produkty dochodowe zbudowane na tokenach stakingowych, łączą ETH klientów w pule w sposób, którego nie można zweryfikować:

- **Powiernicze (Custodial)** - dostawca przechowuje klucze wypłaty i ETH.
- **Warunki mogą ulec zmianie** - stawki, blokady i kwalifikowalność są ustalane przez politykę firmy i mogą zostać zmienione w dowolnym momencie, w przeciwieństwie do zasad egzekwowanych przez kontrakty onchain.
- **Może to w ogóle nie być staking** - pod maską zysk może pochodzić z pożyczania, handlu lub innych działań, a nie z walidatorów. Zazwyczaj nie masz możliwości tego zweryfikować.
- **Ryzyko kontrahenta** - jeśli dostawca stanie się niewypłacalny lub zamrozi wypłaty, nie ma nic onchain, co mógłbyś wymienić.

Aby odróżnić przejrzystą pulę od nieprzejrzystego produktu, zapytaj:

1. Czy możesz zweryfikować onchain, dokąd trafia Twoje ETH, w audytowanych kontraktach open-source?
2. Czy zestaw operatorów węzłów jest opublikowany?
3. Czy otrzymujesz token przechowywany we własnym portfelu, który można wymienić na bazowe ETH?
4. Czy zasady są egzekwowane przez inteligentne kontrakty i publiczne zarządzanie, czy przez warunki świadczenia usług firmy?

Im na więcej z tych pytań dostawca może odpowiedzieć tylko „zaufaj nam”, tym bardziej nieprzejrzysty jest produkt.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Niektóre produkty reklamują „zwiększony” lub „wzmocniony” zysk poprzez połączenie stakingu z **restakingiem**, przypadkiem użycia dla LST, który angażuje stakowane ETH do zabezpieczenia dodatkowych protokołów na dodatkowych warunkach cięcia. Restaking to oddzielna kategoria ryzyka i nowatorska aplikacja zbudowana na LST, a nie forma bezpośredniego uczestnictwa w stakingu. Jeśli wskaźnik zysku jest znacznie wyższy niż stopa stakingu w głównej sieci, powinieneś zapytać, skąd dokładnie pochodzi dodatkowy zysk. [Czym jest restaking?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Uruchom węzeł dla puli {#run-a-node-for-a-pool}

Zostanie operatorem węzła z kaucją dla puli stakingowej to droga pośrednia między posiadaniem tokena a stakingiem solo. Niektóre protokoły stakingowe pozwalają osobom fizycznym na uruchamianie walidatorów przy użyciu zgrupowanego ETH od innych użytkowników. Wpłacasz kaucję z własnego ETH jako zabezpieczenie, obsługujesz sprzęt i klucze oraz zarabiasz prowizję od dopasowanej do Ciebie stawki.

Na przykład walidatory megapool w Rocket Pool wymagają kaucji w wysokości 4 ETH na walidator, a moduł Community Staking Module od Lido wymaga około 2,4 ETH za pierwszy klucz walidatora (1,5 ETH dla zidentyfikowanych stakujących społeczności). Daje to osobom posiadającym mniej niż 32 ETH możliwość uruchomienia własnego sprzętu i wzmocnienia zestawu operatorów sieci, przy jednoczesnym zaakceptowaniu zasad puli, wymagań dotyczących wydajności i warunków kar.

## Co wziąć pod uwagę {#what-to-consider}

Każda pula oraz narzędzia lub inteligentne kontrakty, z których korzystają, zostały zbudowane przez różne zespoły, a każda z nich wiąże się z korzyściami i ryzykiem. Staking grupowy lub delegowany nie jest natywnie obsługiwany przez protokół Ethereum, a złotym standardem dla stakingu zawsze powinny być osoby uruchamające walidatory na własnym sprzęcie, gdy tylko jest to możliwe.

Poniżej użyto wskaźników atrybutów, aby zasygnalizować godne uwagi mocne lub słabe strony wymienionej puli stakingowej. Użyj tej sekcji jako odniesienia do tego, jak definiujemy te atrybuty podczas wyboru puli, do której chcesz dołączyć.

<StakingConsiderations page="pools" />

## Przeglądaj pule stakingowe {#explore-staking-pools}

Dostępnych jest wiele opcji, które pomogą Ci w konfiguracji. Użyj powyższych wskaźników, aby pomogły Ci poruszać się po poniższych narzędziach.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Należy pamiętać o znaczeniu wyboru usługi, która poważnie traktuje [różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza Twoje ryzyko. Usługi, które mają dowody na ograniczanie korzystania z klienta większościowego, są oznaczone jako <em style={{ textTransform: "uppercase" }}>„różnorodność klientów warstwy wykonawczej”</em> i <em style={{ textTransform: "uppercase" }}>„różnorodność klientów konsensusu”.</em>

Masz sugestię dotyczącą narzędzia do stakingu, które pominęliśmy? Sprawdź naszą [politykę dodawania produktów](/contributing/adding-staking-products/), aby sprawdzić, czy będzie ono odpowiednie, i prześlij je do weryfikacji.

<StakingCommunityCallout className="my-16" />

## Często zadawane pytania {#faq}

<ExpandableCard title="Jak mogę zdobywać nagrody?">
Zazwyczaj tokeny płynnego stakingu ERC-20 są wydawane stakującym i reprezentują wartość ich stakowanego ETH plus nagrody. Nagrody docierają do Ciebie na jeden z dwóch sposobów, w zależności od projektu tokena: tokeny z mechanizmem rebase zwiększają saldo Twoich tokenów w miarę naliczania nagród, podczas gdy tokeny oparte na kursie wymiany utrzymują stałe saldo i z czasem można je wymienić na więcej ETH. W obu przypadkach nagrody są rozdzielane po odliczeniu opłaty puli.
</ExpandableCard>

<ExpandableCard title="Kiedy mogę wypłacić swoją stawkę?">
Wypłaty ze stakingu zostały włączone od czasu aktualizacji Szanghaj/Capella w kwietniu 2023 r. Konta walidatorów, które wspierają pule stakingowe, mogą wyjść i wypłacić ETH na wyznaczony adres wypłaty, co pozwala na wymianę Twojej części stawki na bazowe ETH. Szybkość wymiany zależy od dostępnej płynności Twojej puli i kolejki wyjścia warstwy konsensusu. Skontaktuj się ze swoim dostawcą, aby dowiedzieć się, jak obsługuje tę funkcjonalność.

Od czasu aktualizacji Pectra, pule mogą również korzystać z wypłat wyzwalanych z warstwy wykonawczej (EIP-7002), aby wyjść z walidatorów bezpośrednio z adresu wypłaty, bez polegania na kluczach podpisywania operatorów węzłów, co zmniejsza zaufanie wymagane do honorowania wymian.

Alternatywnie, pule wykorzystujące token płynnego stakingu ERC-20 pozwalają użytkownikom na handel tym tokenem na otwartym rynku, umożliwiając sprzedaż pozycji stakingowej, skutecznie „wypłacając” bez faktycznego usuwania ETH z kontraktu stakingowego. Należy pamiętać, że cena rynkowa może różnić się od wartości wymiany tokena.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Czy to różni się od stakingu na mojej giełdzie?">
Istnieje wiele podobieństw między tymi opcjami stakingu grupowego a scentralizowanymi giełdami, takimi jak możliwość stakowania małych ilości ETH i łączenia ich w pule w celu aktywacji walidatorów.

W przeciwieństwie do scentralizowanych giełd, wiele innych opcji stakingu grupowego wykorzystuje inteligentne kontrakty i/lub tokeny płynnego stakingu, które zazwyczaj są tokenami ERC-20, które można przechowywać we własnym portfelu oraz kupować lub sprzedawać jak każdy inny token. Oferuje to warstwę suwerenności i bezpieczeństwa, dając Ci kontrolę nad Twoimi tokenami, ale nadal nie daje Ci bezpośredniej kontroli nad klientem walidatora poświadczającym w Twoim imieniu w tle.

Giełdowe programy „zarabiania” są również powiernicze i podlegają warunkom firmy, a nie zasadom onchain, a ich zysk może w ogóle nie pochodzić ze stakingu w protokole. Zobacz [nieprzejrzyste produkty grupowe](#opaque-pooled-products), aby dowiedzieć się, jak je odróżnić.

Niektóre opcje łączenia w pule są bardziej zdecentralizowane niż inne, jeśli chodzi o węzły, które je wspierają. Aby promować zdrowie i decentralizację sieci, stakujący są zawsze zachęcani do wyboru usługi łączenia w pule, która umożliwia niewymagający pozwoleń, zdecentralizowany zestaw operatorów węzłów.
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Katalog stakingu Ethereum](https://www.staking.directory/) – _Eridian i Spacesider_
- [Ryzyka związane z instrumentami pochodnymi płynnego stakingu](https://notes.ethereum.org/@djrtwo/risks-of-lsd) – _Danny Ryan_
- [Czym jest płynny staking?](https://chain.link/education-hub/liquid-staking) – _Chainlink_
- [EIP-7002: Wypłaty wyzwalane z warstwy wykonawczej](https://eips.ethereum.org/EIPS/eip-7002) – _Propozycje ulepszeń Ethereum_
- [Oceny pul stakingowych Ethereum](https://explorer.rated.network/) – _Rated Network Explorer_
- [Jaka jest różnica między tokenem płynnego restakingu (LRT) a tokenem płynnego stakingu (LST)?](https://liquidcollective.io/lst-vs-lrt/) – _Liquid Collective_