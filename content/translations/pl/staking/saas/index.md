---
title: Usługi stakingowe
description: Przegląd tego, jak rozpocząć korzystanie ze stakowania ETH w puli
lang: pl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Nosorożec Leslie unoszący się w chmurach.
sidebarDepth: 2
summaryPoints:
  - Działanie Twojego walidatora zapewniają zewnętrzni operatorzy węzłów
  - Świetna opcja dla każdego, kto ma 32 ETH i nie czuje się komfortowo mając do czynienia z techniczną złożonością uruchamiania węzła
  - Zredukuj zakres koniecznego zaufania i zachowaj kontrolę nad swoimi kluczami
---

## Czym są usługi stakingowe? {#what-is-staking-as-a-service}

Usługi stakingowe („SaaS”) reprezentują kategorię usług stakingowych, w których użytkownik deponuje własne 32 ETH dla walidatora, ale deleguje operacje węzła do zewnętrznego operatora. Proces ten zwykle wymaga bycia przeprowadzonym przez początkową konfigurację, w tym generowanie kluczy i depozyt, a następnie przesłanie kluczy podpisujących do operatora. Dzięki temu usługa może obsługiwać Twój walidator w Twoim imieniu, zwykle za miesięczną opłatą.

## Dlaczego warto postawić na usługę? {#why-stake-with-a-service}

Protokół Ethereum nie wspiera natywnie delegowania stawek, więc stworzone zostały te usługi, aby zaspokoić zapotrzebowanie. Jeśli masz dostępne na poczet stakingu 32 ETH, ale nie czujesz się komfortowo z obsługą sprzętu, usługi SaaS pozwalają Ci na zdelegowanie tych czynności, podczas gdy Ty nadal możesz uzyskiwać natywne nagrody za blok.

<CardGrid>
  <Card title="Twój własny walidator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Łatwy start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Ogranicz swoje ryzyko" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## Co wziąć pod uwagę {#what-to-consider}

Powstaje coraz więcej dostawców SaaS, którzy pomogą Ci stakować Twoje ETH, ale każdy z nich ma swoje własne korzyści i ryzyka. Wszystkie opcje SaaS wymagają dodatkowych założeń dotyczących zaufania w porównaniu do domowego stakingu. Opcje SaaS mogą zawierać dodatkowy kod opakowujący klienta Ethereum, który nie będzie otwarty lub skontrolowany. SaaS ma również niekorzystny wpływ na decentralizację sieci. W zależności od konfiguracji możesz nie mieć możliwości kontrolowania swojego walidatora — operator może działać nieuczciwie, używając twojego ETH.

Wskaźniki atrybutów są użyte poniżej, aby zasygnalizować godne uwagi mocne lub słabe strony, jakie może mieć wymieniony dostawca SaaS. Użyj tej sekcji jako odniesienia do sposobu definiowania tych atrybutów podczas wybierania usługi, która pomoże Ci w Twojej przygodzie ze stakingiem.

<StakingConsiderations page="saas" />

## Poznaj dostawców usług stakingowych {#saas-providers}

Poniżej znajduje się kilku dostępnych dostawców SaaS. Skorzystaj z powyższych wskaźników, które oprowadzą cię z tymi usługami

<ProductDisclaimer />

### Dostawcy SaaS

<StakingProductsCardGrid category="saas" />

Należy pamiętać o znaczeniu wspierania [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza ryzyko. Usługi, które mają dowody na ograniczanie korzystania z większości klientów, są oznaczone jako <em style={{ textTransform: "uppercase" }}>„różnorodność klientów wykonawczych”</em> i <em style={{ textTransform: "uppercase" }}>„różnorodność klientów konsensusu”.</em>

### Generatory kluczy

<StakingProductsCardGrid category="keyGen" />

Masz sugestię dostawcy usług stakingowych, którego pominęliśmy? Zapoznaj się z naszymi [zasadami umieszczania produktów na liście](/contributing/adding-staking-products/), aby sprawdzić, czy są one odpowiednie i przesłać je do recenzji.

## Często zadawane pytania {#faq}

<ExpandableCard title="Kto posiada moje klucze?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Rozwiązania będą się różnić w zależności od dostawcy, ale zazwyczaj zostaniesz poprowadzony przez konfigurację wszystkich potrzebnych kluczy podpisywania (jeden na 32 ETH) i przesłanie ich do dostawcy, aby umożliwić mu walidację w Twoim imieniu. Same klucze podpisywania nie dają żadnej możliwości wypłaty, transferu ani wydawania środków. Zapewniają jednak możliwość oddawania głosów w celu osiągnięcia konsensusu, co w przypadku niewłaściwego wykonania może skutkować karami offline lub cięciem.
</ExpandableCard>

<ExpandableCard title="Więc istnieją dwa zestawy kluczy?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Tak. Każde konto składa się zarówno z kluczy <em>podpisujących</em> BLS, jak i kluczy <em>wypłat</em> BLS. Aby walidator mógł poświadczyć stan łańcucha, uczestniczyć w komitetach synchronizacji i proponować bloki, klucze podpisujące muszą być łatwo dostępne dla klienta walidatora. Muszą one być połączone z Internetem w jakiś sposób, a zatem są z natury uważane za klucze „gorące”. Jest to wymagane, aby walidator mógł poświadczyć, a zatem klucze używane do przesyłania lub wypłacania środków są oddzielone ze względów bezpieczeństwa.

Klucze wypłaty BLS są używane do podpisywania jednorazowej wiadomości, która deklaruje, na które konto warstwy wykonawczej powinny trafić nagrody za stakowanie i wycofane środki. Po nadaniu tej wiadomości klucze <em>wypłat BLS </em> nie są już potrzebne. Zamiast tego kontrola nad wypłaconymi środkami jest na stałe przekazywana na podany adres. Umożliwia to ustawienie adresu wypłaty zabezpieczonego za pomocą własnych zimnych danych, minimalizując ryzyko środków walidatora, nawet jeśli ktoś inny kontroluje klucze podpisywania walidatora.

Aktualizowanie danych uwierzytelniających wypłaty jest wymagane, aby umożliwić wypłaty\*. Proces ten obejmuje generowanie kluczy wypłat przy użyciu mnemonicznej frazy odzyskiwania.

<strong>Upewnij się, że bezpiecznie zapisałeś tę frazę odzyskiwania, w przeciwnym razie nie będziesz w stanie wygenerować kluczy wypłaty, gdy nadejdzie czas.</strong>

\*Stakerzy, którzy podali adres wypłaty przy pierwszej wpłacie, nie muszą tego ustawiać. Skontaktuj się ze swoim dostawcą SaaS, aby uzyskać pomoc dotyczącą przygotowania walidatora.
</ExpandableCard>

<ExpandableCard title="Kiedy mogę wypłacić pieniądze?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
W kwietniu 2023 r. w ramach aktualizacji Shanghai/Capella wprowadzono wypłaty ze stakingu. Stakerzy muszą podać adres do wypłaty (jeśli nie podano go przy pierwszej wpłacie), a wypłaty nagród zaczną być wypłacane automatycznie co kilka dni.

Walidatorzy mogą również w pełni wyjść jako walidator, co odblokuje ich pozostałe saldo ETH do wypłaty. Konta, które podały adres wypłaty i zakończyły proces wyjścia, otrzymają całe saldo na adres wypłaty podany podczas następnego przeglądu walidatora.

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ExpandableCard>

<ExpandableCard title="Co się stanie, jeśli zostanę odcięty?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Korzystając z usług dostawcy SaaS, powierzasz obsługę swojego węzła komuś innemu. Wiąże się to z ryzykiem niskiej wydajności węzła, na którą nie masz wpływu. W przypadku, gdy Twój walidator zostanie odcięty, saldo walidatora zostanie ukarane i przymusowo usunięte z puli walidatorów.

Po zakończeniu procesu cięcia/wyjścia środki te zostaną przelane na adres wypłaty przypisany do walidatora. Wymaga to podania adresu wypłaty w celu włączenia. Mogło to zostać dostarczone przy pierwszej wpłacie. Jeśli nie, klucze wypłaty walidatora będą musiały zostać użyte do podpisania wiadomości deklarującej adres wypłaty. Jeśli nie podano adresu wypłaty, środki pozostaną zablokowane do czasu jego podania.

Skontaktuj się z indywidualnym dostawcą SaaS, aby uzyskać więcej informacji na temat wszelkich gwarancji lub opcji ubezpieczenia, a także instrukcjami dotyczącymi sposobu podania adresu wypłaty. Jeśli wolisz mieć pełną kontrolę nad konfiguracją walidatora, <a href="/staking/solo/">dowiedz się więcej o solo stakingu ETH</a>.
</ExpandableCard>

## Dodatkowo przeczytaj {#further-reading}

- [Katalog stakingu Ethereum](https://www.staking.directory/) — _Eridian i Spacesider_
- [Ocena usług stakingu](https://www.attestant.io/posts/evaluating-staking-services/) — _Jim McDonald 2020 r._
