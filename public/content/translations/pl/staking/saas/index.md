---
title: "Staking jako usługa"
description: "Dowiedz się o stakingu jako usłudze"
lang: pl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "Nosorożec Leslie unoszący się w chmurach."
sidebarDepth: 2
summaryPoints:
  - Działanie Twojego walidatora zapewniają zewnętrzni operatorzy węzłów
  - Świetna opcja dla każdego, kto ma 32 ETH i nie czuje się komfortowo mając do czynienia z techniczną złożonością uruchamiania węzła
  - Zredukuj zakres koniecznego zaufania i zachowaj kontrolę nad swoimi kluczami
---

## Czym są usługi stakingowe? {#what-is-staking-as-a-service}

Usługi stakingowe („SaaS”) reprezentują kategorię usług stakingowych, w których użytkownik deponuje własne 32 ETH dla walidatora, ale deleguje operacje węzła do zewnętrznego operatora. Proces ten zwykle wymaga bycia przeprowadzonym przez początkową konfigurację, w tym generowanie kluczy i depozyt, a następnie przesłanie kluczy podpisujących do operatora. Dzięki temu usługa może obsługiwać Twój walidator w Twoim imieniu, zwykle za miesięczną opłatą.

## Dlaczego warto postawić na usługę? Dlaczego stakować za pośrednictwem usługi? {#why-stake-with-a-service}

Protokół Ethereum nie wspiera natywnie delegowania stawek, więc stworzone zostały te usługi, aby zaspokoić zapotrzebowanie. Jeśli masz dostępne na poczet stakingu 32 ETH, ale nie czujesz się komfortowo z obsługą sprzętu, usługi SaaS pozwalają Ci na zdelegowanie tych czynności, podczas gdy Ty nadal możesz uzyskiwać natywne nagrody za blok.

<Grid>
  <Card title="Twój własny walidator" emoji=":desktop_computer:" description="Wpłać własne 32 ETH, aby aktywować swój zestaw kluczy do podpisywania, które wezmą udział w konsensusie Ethereum. Monitoruj swoje postępy na dashboardach i obserwuj, jak gromadzą się nagrody w ETH." />
  <Card title="Łatwy start" emoji="🏁" description="Zapomnij o specyfikacji sprzętu, konfiguracji, utrzymaniu węzła i aktualizacjach. Dostawcy SaaS pozwalają zlecić trudniejszą część: wystarczy, że prześlesz swoje poświadczenia do podpisywania, a oni za niewielką opłatą uruchomią walidatora w Twoim imieniu." />
  <Card title="Ogranicz swoje ryzyko" emoji=":shield:" description="W wielu przypadkach użytkownicy nie muszą rezygnować z dostępu do kluczy, które umożliwiają wypłatę lub transfer stakowanych środków. Różnią się one od kluczy do podpisywania i mogą być przechowywane osobno, aby ograniczyć (ale nie wyeliminować) ryzyko jako stakera." />
</Grid>

<StakingComparison page="saas" />

## Co należy wziąć pod uwagę {#what-to-consider}

Powstaje coraz więcej dostawców SaaS, którzy pomogą Ci stakować Twoje ETH, ale każdy z nich ma swoje własne korzyści i ryzyka. Wszystkie opcje SaaS wymagają dodatkowych założeń dotyczących zaufania w porównaniu do domowego stakingu. Opcje SaaS mogą zawierać dodatkowy kod opakowujący klienta Ethereum, który nie będzie otwarty lub skontrolowany. SaaS ma również niekorzystny wpływ na decentralizację sieci. W zależności od konfiguracji możesz nie mieć możliwości kontrolowania swojego walidatora — operator może działać nieuczciwie, używając twojego ETH.

Wskaźniki atrybutów są użyte poniżej, aby zasygnalizować godne uwagi mocne lub słabe strony, jakie może mieć wymieniony dostawca SaaS. Użyj tej sekcji jako odniesienia do sposobu definiowania tych atrybutów podczas wybierania usługi, która pomoże Ci w Twojej przygodzie ze stakingiem.

<StakingConsiderations page="saas" />

## Poznaj dostawców usług stakingowych {#saas-providers}

Poniżej znajduje się kilku dostępnych dostawców SaaS. Skorzystaj z powyższych wskaźników, które oprowadzą cię z tymi usługami

<ProductDisclaimer />

### Dostawcy SaaS

<StakingProductsCardGrid category="saas" />

Należy pamiętać o znaczeniu wspierania [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza ryzyko. Usługi, które mają dowody na ograniczanie korzystania z większości klientów, są oznaczone <em style={{ textTransform: "uppercase" }}>„różnorodność klientów wykonawczych”</em> i <em style={{ textTransform: "uppercase" }}>„różnorodność klientów konsensusu.”</em>

### Generatory kluczy

<StakingProductsCardGrid category="keyGen" />

Masz sugestię dostawcy usług stakingowych, którego pominęliśmy? Zapoznaj się z naszymi [zasadami umieszczania produktów na liście](/contributing/adding-staking-products/), aby sprawdzić, czy Twój produkt będzie pasował, i przesłać go do recenzji.

## Często zadawane pytania {#faq}

<ExpandableCard title="Kto przechowuje moje klucze?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Rozwiązania będą się różnić w zależności od dostawcy, ale zazwyczaj zostaniesz poprowadzony przez konfigurację wszystkich potrzebnych kluczy podpisywania (jeden na 32 ETH) i przesłanie ich do dostawcy, aby umożliwić mu walidację w Twoim imieniu. Same klucze podpisywania nie dają żadnej możliwości wypłaty, transferu ani wydawania środków. Zapewniają jednak możliwość oddawania głosów w celu osiągnięcia konsensusu, co w przypadku niewłaściwego wykonania może skutkować karami offline lub cięciem.
</ExpandableCard>

<ExpandableCard title="Czyli są dwa zestawy kluczy?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Tak. Każde konto składa się zarówno z kluczy <em>podpisujących</em> BLS, jak i kluczy <em>wypłat</em> BLS. Aby walidator mógł poświadczyć stan łańcucha, uczestniczyć w komitetach synchronizacji i proponować bloki, klucze podpisujące muszą być łatwo dostępne dla klienta walidatora. Muszą one być połączone z Internetem w jakiś sposób, a zatem są z natury uważane za klucze „gorące”. Jest to wymagane, aby walidator mógł poświadczyć, a zatem klucze używane do przesyłania lub wypłacania środków są oddzielone ze względów bezpieczeństwa.

Klucze wypłaty BLS są używane do podpisywania jednorazowej wiadomości, która deklaruje, na które konto warstwy wykonawczej powinny trafić nagrody za stakowanie i wycofane środki. Po nadaniu tej wiadomości klucze <em>wypłat BLS </em> nie są już potrzebne. Zamiast tego kontrola nad wypłaconymi środkami jest na stałe przekazywana na podany adres. Umożliwia to ustawienie adresu wypłaty zabezpieczonego za pomocą własnych zimnych danych, minimalizując ryzyko środków walidatora, nawet jeśli ktoś inny kontroluje klucze podpisywania walidatora.

Aktualizowanie danych uwierzytelniających wypłaty jest wymagane, aby umożliwić wypłaty\*. Proces ten obejmuje generowanie kluczy wypłat przy użyciu mnemonicznej frazy odzyskiwania.

<strong>Pamiętaj, aby bezpiecznie utworzyć kopię zapasową tej frazy seed, w przeciwnym razie nie będziesz w stanie wygenerować kluczy do wypłaty, gdy nadejdzie taka potrzeba.</strong>

\*Stakerzy, którzy podali adres do wypłat przy pierwszej wpłacie, nie muszą tego ustawiać. Skontaktuj się ze swoim dostawcą SaaS, aby uzyskać pomoc dotyczącą przygotowania walidatora.
</ExpandableCard>

<ExpandableCard title="Kiedy mogę wypłacić?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Stakerzy muszą podać adres do wypłaty (jeśli nie podano go przy pierwszej wpłacie), a wypłaty nagród zaczną być wypłacane automatycznie co kilka dni.

Walidatorzy mogą również w pełni wyjść jako walidator, co odblokuje ich pozostałe saldo ETH do wypłaty. Konta, które podały adres wypłaty i zakończyły proces wyjścia, otrzymają całe saldo na adres wypłaty podany podczas następnego przeglądu walidatora.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Co się stanie, jeśli spotka mnie cięcie?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Korzystając z usług dostawcy SaaS, powierzasz obsługę swojego węzła komuś innemu. Wiąże się to z ryzykiem niskiej wydajności węzła, na którą nie masz wpływu. W przypadku, gdy Twój walidator zostanie odcięty, saldo walidatora zostanie ukarane i przymusowo usunięte z puli walidatorów.

Po zakończeniu procesu cięcia/wyjścia środki te zostaną przelane na adres wypłaty przypisany do walidatora. Wymaga to podania adresu wypłaty w celu włączenia. Mogło to zostać dostarczone przy pierwszej wpłacie. Jeśli nie, klucze wypłaty walidatora będą musiały zostać użyte do podpisania wiadomości deklarującej adres wypłaty. Jeśli nie podano adresu wypłaty, środki pozostaną zablokowane do czasu jego podania.

Skontaktuj się z indywidualnym dostawcą SaaS, aby uzyskać więcej informacji na temat wszelkich gwarancji lub opcji ubezpieczenia, a także instrukcjami dotyczącymi sposobu podania adresu wypłaty. Jeśli wolisz mieć pełną kontrolę nad konfiguracją swojego walidatora, [dowiedz się więcej o solo stakingu ETH](/staking/solo/).
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Katalog stakingu Ethereum](https://www.staking.directory/) - _Eridian i Spacesider_
- [Ocena usług stakingowych](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_
