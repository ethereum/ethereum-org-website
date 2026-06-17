---
title: "Staking jako usługa"
description: "Dowiedz się więcej o stakingu jako usłudze"
lang: pl
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "Nosorożec Leslie unoszący się w chmurach."
sidebarDepth: 2
summaryPoints:
  - Zewnętrzni operatorzy węzłów zajmują się obsługą Twojego klienta walidatora
  - Świetna opcja dla każdego, kto posiada 32 ETH, ale nie czuje się na siłach, aby radzić sobie ze złożonością techniczną prowadzenia węzła
  - Zmniejsz potrzebę zaufania i zachowaj kontrolę nad swoimi kluczami wypłaty
---

## Czym jest staking jako usługa? {#what-is-staking-as-a-service}

Staking jako usługa (ang. staking as a service – SaaS) to kategoria usług stakingowych, w których deponujesz własne 32 ETH dla walidatora, ale delegujesz operacje węzła zewnętrznemu operatorowi. Proces ten zazwyczaj obejmuje przeprowadzenie przez początkową konfigurację, w tym generowanie kluczy i depozyt, a następnie przesłanie kluczy podpisywania do operatora. Pozwala to usłudze na obsługę walidatora w Twoim imieniu, zazwyczaj za miesięczną opłatą.

## Dlaczego warto stakować za pomocą usługi? {#why-stake-with-a-service}

Protokół [Ethereum](/) nie obsługuje natywnie delegowania stawki, dlatego usługi te zostały stworzone, aby zaspokoić to zapotrzebowanie. Jeśli masz 32 ETH do stakowania, ale nie czujesz się komfortowo w pracy ze sprzętem, usługi SaaS pozwalają na delegowanie trudniejszej części, podczas gdy Ty zdobywasz natywne nagrody za bloki.

<Grid>
  <Card title="Your own validator" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="Easy to start" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="Limit your risk" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</Grid>

<StakingComparison page="saas" />

## Co należy wziąć pod uwagę {#what-to-consider}

Istnieje rosnąca liczba dostawców SaaS, którzy pomogą Ci stakować Twoje ETH, ale wszyscy mają swoje własne korzyści i ryzyka. Wszystkie opcje SaaS wymagają dodatkowych założeń dotyczących zaufania w porównaniu do stakingu domowego. Opcje SaaS mogą posiadać dodatkowy kod otaczający klienty Ethereum, który nie jest otwarty ani możliwy do audytu. SaaS ma również szkodliwy wpływ na decentralizację sieci. W zależności od konfiguracji, możesz nie kontrolować swojego walidatora – operator może działać nieuczciwie, wykorzystując Twoje ETH.

Poniżej użyto wskaźników atrybutów, aby zasygnalizować znaczące mocne lub słabe strony, jakie może mieć wymieniony dostawca SaaS. Użyj tej sekcji jako odniesienia do tego, jak definiujemy te atrybuty podczas wyboru usługi, która pomoże Ci w Twojej przygodzie ze stakingiem.

<StakingConsiderations page="saas" />

## Poznaj dostawców usług stakingowych {#saas-providers}

Poniżej znajduje się kilku dostępnych dostawców SaaS. Użyj powyższych wskaźników, aby pomóc sobie w nawigacji po tych usługach.

<ProductDisclaimer />

### Dostawcy SaaS {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

Należy pamiętać o znaczeniu wspierania [różnorodności klientów](/developers/docs/nodes-and-clients/client-diversity/), ponieważ poprawia to bezpieczeństwo sieci i ogranicza Twoje ryzyko. Usługi, w przypadku których istnieją dowody na ograniczanie korzystania z klientów większościowych, są oznaczone jako <em style={{ textTransform: "uppercase" }}>„różnorodność klientów warstwy wykonawczej”</em> oraz <em style={{ textTransform: "uppercase" }}>„różnorodność klientów konsensusu”.</em>

### Generatory kluczy {#key-generators}

<StakingProductsCardGrid category="keyGen" />

Masz propozycję dostawcy stakingu jako usługi, którego pominęliśmy? Zapoznaj się z naszą [polityką dodawania produktów](/contributing/adding-staking-products/), aby sprawdzić, czy będzie on odpowiedni, i prześlij go do weryfikacji.

## Często zadawane pytania {#faq}

<ExpandableCard title="Kto przechowuje moje klucze?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
Ustalenia będą się różnić w zależności od dostawcy, ale zazwyczaj zostaniesz przeprowadzony przez proces konfiguracji wszelkich potrzebnych kluczy podpisywania (jeden na 32 ETH) i przesłania ich do dostawcy, aby umożliwić mu walidację w Twoim imieniu. Same klucze podpisywania nie dają możliwości wypłaty, transferu ani wydawania Twoich środków. Zapewniają one jednak możliwość oddawania głosów w celu osiągnięcia konsensusu, co w przypadku nieprawidłowego wykonania może skutkować karami za bycie offline lub cięciem.
</ExpandableCard>

<ExpandableCard title="Czyli są dwa zestawy kluczy?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
Tak. Każde konto składa się zarówno z kluczy <em>podpisywania</em> BLS, jak i kluczy <em>wypłaty</em> BLS. Aby walidator mógł poświadczać stan łańcucha, uczestniczyć w komitetach synchronizacji i proponować bloki, klucze podpisywania muszą być łatwo dostępne dla klienta walidatora. Muszą one być w jakiejś formie podłączone do internetu, a zatem z natury są uważane za „gorące” klucze. Jest to wymóg, aby Twój walidator mógł poświadczać, dlatego klucze używane do transferu lub wypłaty środków są oddzielone ze względów bezpieczeństwa.

Klucze wypłaty BLS służą do podpisania jednorazowej wiadomości, która deklaruje, na które konto warstwy wykonawczej powinny trafić nagrody za staking i wycofane środki. Po rozgłoszeniu tej wiadomości klucze <em>wypłaty BLS</em> nie są już potrzebne. Zamiast tego kontrola nad wypłaconymi środkami jest na stałe delegowana na podany przez Ciebie adres. Pozwala to na ustawienie adresu wypłaty zabezpieczonego za pomocą własnego zimnego portfela (cold storage), minimalizując ryzyko dla środków walidatora, nawet jeśli ktoś inny kontroluje Twoje klucze podpisywania walidatora.

Aktualizacja danych uwierzytelniających wypłaty jest wymaganym krokiem, aby umożliwić wypłaty\*. Proces ten obejmuje wygenerowanie kluczy wypłaty przy użyciu Twojej mnemonicznej frazy odzyskiwania.

<strong>Upewnij się, że bezpiecznie utworzyłeś kopię zapasową tej frazy odzyskiwania, w przeciwnym razie nie będziesz w stanie wygenerować kluczy wypłaty, gdy nadejdzie na to czas.</strong>

\*Osoby stakujące, które podały adres wypłaty przy początkowym depozycie, nie muszą tego ustawiać. Skontaktuj się ze swoim dostawcą SaaS, aby uzyskać wsparcie dotyczące przygotowania walidatora.
</ExpandableCard>

<ExpandableCard title="Kiedy mogę dokonać wypłaty?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
Osoby stakujące muszą podać adres wypłaty (jeśli nie został podany przy początkowym depozycie), a wypłaty nagród zaczną być dystrybuowane automatycznie, okresowo co kilka dni.

Walidatorzy mogą również całkowicie wyjść jako walidator, co odblokuje ich pozostałe saldo ETH do wypłaty. Konta, które podały adres wypłaty w warstwie wykonawczej i zakończyły proces wyjścia, otrzymają całe swoje saldo na podany adres wypłaty podczas następnego cyklu sprawdzania walidatorów (validator sweep).

<ButtonLink href="/staking/withdrawals/">Więcej o wypłatach ze stakingu</ButtonLink>
</ButtonLink>

<ExpandableCard title="Co się stanie, jeśli zostanę ukarany cięciem?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
Korzystając z usług dostawcy SaaS, powierzasz obsługę swojego węzła komuś innemu. Wiąże się to z ryzykiem słabej wydajności węzła, nad którą nie masz kontroli. W przypadku cięcia Twojego walidatora, saldo walidatora zostanie ukarane i przymusowo usunięte z puli walidatorów.

Po zakończeniu procesu cięcia/wyjścia środki te zostaną przetransferowane na adres wypłaty przypisany do walidatora. Wymaga to podania adresu wypłaty, aby było to możliwe. Mógł on zostać podany przy początkowym depozycie. Jeśli nie, klucze wypłaty walidatora będą musiały zostać użyte do podpisania wiadomości deklarującej adres wypłaty. Jeśli nie podano adresu wypłaty, środki pozostaną zablokowane do momentu jego podania.

Skontaktuj się z poszczególnymi dostawcami SaaS, aby uzyskać więcej szczegółów na temat wszelkich gwarancji lub opcji ubezpieczenia, a także instrukcji, jak podać adres wypłaty. Jeśli wolisz mieć pełną kontrolę nad konfiguracją swojego walidatora, [dowiedz się więcej o tym, jak samodzielnie stakować swoje ETH](/staking/solo/).
</ExpandableCard>

## Dalsza lektura {#further-reading}

- [Katalog stakingu Ethereum](https://www.staking.directory/) – _Eridian i Spacesider_
- [Ocena usług stakingowych](https://www.attestant.io/posts/evaluating-staking-services/) – _Jim McDonald 2020_