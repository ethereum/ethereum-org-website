---
title: Abstrakcja konta
description: Przegląd planów Ethereum mających zapewnić prostsze w użytkowaniu i bezpieczniejsze konta użytkowników
lang: pl
summaryPoints:
  - Abstrakcja kont znacząco ułatwia tworzenie portfeli inteligentnych kontraktów
  - Portfele inteligentnych kontraktów znacząco ułatwiają zarządzanie dostępem do kont Ethereum
  - Zgubione i ujawnione klucze można odzyskać przy użyciu wielu różnych kopii zapasowych
---

# Abstrakcja konta {#account-abstraction}

Użytkownicy wchodzą w interakcję z Ethereum przy użyciu **[kont zewnętrznych (EOA)](/glossary/#eoa)**. Jest to jedyny sposób na rozpoczęcie transakcji lub zawarcie inteligentnego kontraktu. Ogranicza to sposób, w jaki użytkownicy mogą wejść w interakcję z Ethereum. Na przykład utrudnia to wysyłanie zestawów transakcji i wymaga od użytkowników posiadania przez cały czas salda ETH do pokrycia kosztów gazu.

Abstrakcja kont jest sposobem rozwiązania tych problemów poprzez pozwalanie użytkownikom na elastyczne zaprogramowanie większego bezpieczeństwa i lepszych doświadczeń użytkownika na ich kontach. Można to osiągnąć dzięki [ulepszeniu kont EOA](https://eips.ethereum.org/EIPS/eip-3074) tak, aby mogły być kontrolowane przez inteligentne kontrakty, lub poprzez [ulepszenie inteligentnych kontraktów](https://eips.ethereum.org/EIPS/eip-2938) tak, aby mogły inicjować transakcje. Obydwie te opcje wymagają zmian w protokole Ethereum. Istnieje również trzecia możliwość polegająca na dodaniu [drugiego, oddzielnego systemu transakcyjnego](https://eips.ethereum.org/EIPS/eip-4337), który będzie działał równolegle do istniejącego protokołu. Niezależnie od wybranej drogi skutkiem jest dostęp do Ethereum za pomocą portfeli inteligentnych kontraktów, które są natywnie obsługiwane jako część istniejącego protokołu albo za pośrednictwem sieci transakcyjnej dodatków.

Portfele inteligentnych kontraktów odblokowują wiele korzyści dla użytkownika, w tym:

- definiowanie własnych elastycznych zasad bezpieczeństwa
- odzyskanie konta w przypadku utraty kluczy
- udostępnianie zabezpieczeń konta zaufanym urządzeniom lub osobom
- płacenie za cudzy gaz lub na odwrót
- łączenie transakcji w grupy (np. zatwierdzanie i wykonywanie wymiany za jednym razem)
- więcej możliwości dla twórców zdecentralizowanych aplikacji i portfeli w zakresie innowacji doświadczeń użytkownika

Korzyści te nie są obecnie natywnie obsługiwane, ponieważ tylko konta zewnętrzne ([EOA](/glossary/#eoa)) mogą rozpoczynać transakcje. EOA to po prostu pary kluczy publiczno-prywatnych. Działają w następujący sposób:

- jeśli masz klucz prywatny, możesz zrobić _wszystko_ w ramach regulaminu Maszyny Wirtualnej Ethereum (EVM)
- jeśli nie masz klucza prywatnego, nie możesz zrobić _nic_.

Jeśli stracisz swoje klucze, nie będzie można ich odzyskać, a skradzione klucze dają złodziejowi natychmiastowy dostęp do wszystkich środków na Twoim koncie.

Portfele inteligentnych kontraktów są rozwiązaniem tych problemów, ale obecnie trudno je zaprogramować, ponieważ ostatecznie każdą wdrażaną przez nie logikę należy przetłumaczyć na zestaw transakcji EOA, zanim będzie mogła ona zostać przetworzona przez Ethereum. Abstrakcja kont umożliwia inteligentnym kontraktom na samodzielne inicjowanie transakcji, dzięki czemu każda logika, którą użytkownik chce zaimplementować, może zostać zaprogramowana w samym portfelu inteligentnego kontraktu i wykonana na Ethereum.

W ostatecznym rozrachunku abstrakcja kont poprawia wsparcie dla portfeli inteligentnych kontraktów, dzięki czemu będą one łatwiejsze w tworzeniu i bezpieczniejsze w użyciu. Podsumowując, dzięki abstrakcji kont użytkownicy mogą cieszyć się wszystkimi korzyściami Ethereum nie znając podstawowej technologii ani nie przejmując się nią.

## Poza frazami seed {#beyond-seed-phrases}

Dzisiejsze konta są zabezpieczone kluczami prywatnymi, które są obliczane z fraz seed. Każda osoba, która ma dostęp do frazy ziarna może z łatwością poznać klucz prywatny ochraniający konto i zdobyć dostęp do wszystkich aktywów. Jeśli klucz prywatny i fraza seed zostaną zgubione, już nigdy nie będzie można ich odzyskać, a aktywa, które były pod ich kontrolą, zostaną zamrożone na zawsze. Ochrona tych fraz seed jest kłopotliwa nawet dla doświadczonych użytkowników, a wyłudzanie fraz seed jest jednym z najczęstszych sposobów oszukiwania użytkowników.

Abstrakcja kont rozwiązuje ten problem, używając inteligentnych kontraktów do przechowywania aktywów i autoryzowania transakcji. Te inteligentne kontrakty można następnie wzbogacić o niestandardową logikę, aby uczynić je tak bezpiecznymi i dostosowanymi do użytkownika, jak to tylko możliwe. Ostatecznie nadal używasz kluczy prywatnych do kontrolowania dostępu do swojego konta, ale z zabezpieczeniami, dzięki którym zarządzanie nimi jest łatwiejsze i bezpieczniejsze.

Na przykład, do portfela można dodać klucze zapasowe, dzięki czemu w przypadku utraty lub przypadkowego ujawnienia klucza głównego można go zastąpić nowym, bezpiecznym kluczem za zgodą kluczy zapasowych. Możesz zabezpieczyć każdy z tych kluczy w inny sposób lub podzielić je pomiędzy zaufanych strażników. To znacznie utrudnia złodziejowi uzyskanie pełnej kontroli nad Twoimi środkami. Podobnie możesz dodać reguły do portfela, aby zmniejszyć wpływ, jeśli klucz główny zostanie naruszony, na przykład możesz zezwolić na weryfikację transakcji o niskiej wartości za pomocą pojedynczego podpisu, podczas gdy transakcje o wyższej wartości będą wymagać zatwierdzenia przez wielu uwierzytelnionych podpisujących. Istnieją również inne sposoby, w jakie portfele inteligentnych kontraktów mogą pomóc w powstrzymaniu złodziei, na przykład lista zezwoleń może być używana do blokowania każdej transakcji, chyba że jest ona dokonywana na zaufany adres lub zweryfikowana przez kilka wstępnie zatwierdzonych kluczy.

### Przykłady logiki zabezpieczającej, które można wbudować w portfel inteligentnego kontraktu:

- **Autoryzacja wielopodpisowa**: możesz udostępniać dane autoryzujące wielu zaufanym osobom lub urządzeniom. Następnie kontrakt można skonfigurować tak, aby transakcje przekraczające pewną ustaloną wartość wymagały autoryzacji od określonej części (np. 3/5) zaufanych stron. Na przykład transakcje o wysokiej wartości mogą wymagać zatwierdzenia zarówno od urządzenia mobilnego, jak i portfela sprzętowego, lub podpisów z kont rozproszonych wśród zaufanych członków rodziny.
- **Zamrażanie konta**: jeśli urządzenie zostanie zgubione lub naruszone, konto może zostać zablokowane z innego autoryzowanego urządzenia, chroniąc aktywa użytkownika.
- **Odzyskiwanie konta**: zgubione urządzenie lub zapomniane hasło? W obecnym systemie oznacza to, że Twoje aktywa mogą zostać zamrożone na zawsze. Dzięki portfelowi inteligentnego kontraktu możesz ustawić listę dozwolonych kont, które mogą autoryzować nowe urządzenia i resetować dostęp.
- **Ustawianie limitu transakcji**: określ dzienne limity tego ile wartości można przesłać z konta w ciągu dnia/tygodnia/miesiąca. Oznacza to, że jeśli atakujący uzyska dostęp do twojego konta, nie będzie mógł zabrać wszystkiego na raz, a Ty masz możliwość zamrożenia i zresetowania dostępu.
- **Tworzenie list zezwoleń**: zezwalaj na transakcje tylko do określonych adresów, o których wiesz, że są bezpieczne. Oznacza to, że _nawet jeśli_ Twój klucz prywatny zostanie skradziony, atakujący będzie mógł tylko wysłać fundusze na docelowe konta znajdujące się na Twojej liście. Te listy zezwoleń wymagałyby wielu podpisów, aby je zmienić, więc atakujący nie mógłby być w stanie dodać własnego adresu do listy, chyba że miałby dostęp do kilku kluczy zapasowych.

## Lepsze doświadczenia użytkownika {#better-user-experience}

Abstrakcja kont pozwala na **lepsze ogólne wrażenia użytkownika**, a także **większe bezpieczeństwo**, ponieważ dodaje obsługę portfeli inteligentnych kontraktów na poziomie protokołu. Przede wszystkim zapewni to twórcom inteligentnych kontraktów, portfeli i aplikacji znacznie większą swobodę wprowadzania innowacji w zakresie doświadczeń użytkownika w sposób, którego możemy jeszcze nie być w stanie przewidzieć. Niektóre oczywiste ulepszenia, które pojawią się wraz z abstrakcją kont, obejmują łączenie transakcji w grupy w celu zwiększenia szybkości i wydajności. Na przykład prosta wymiana powinna być operacją wykonywaną jednym kliknięciem, ale obecnie wymaga ona podpisania wielu transakcji w celu zatwierdzenia wydania poszczególnych tokenów przed dokonaniem wymiany. Abstrakcja kont usuwa to utrudnienie, poprzez umożliwienie łączenia transakcji. Co więcej, łączona transakcja mogłaby zatwierdzić dokładnie odpowiednią wartość tokenów wymaganą dla każdej transakcji, a następnie cofnąć pozwolenia po zakończeniu transakcji, zapewniając dodatkowe bezpieczeństwo.

Zarządzanie gazem jest również znacznie ulepszone dzięki abstrakcji kont. Aplikacje mogą nie tylko oferować pokrycie opłat za gaz swoich użytkowników – opłaty za gaz mogą być także uiszczane w tokenach innych niż ETH, uwalniając użytkowników od konieczności posiadania salda ETH w celu finansowania transakcji. Miałoby to odbywać się poprzez zamianę tokenów użytkownika na ETH w ramach kontraktu, a następnie wykorzystanie ETH do zapłaty za gaz.

<ExpandableCard title="W jaki sposób abstrakcja kont może pomóc w odniesieniu do gazu?" eventCategory="/roadmap/account-abstraction" eventName="clicked how can account abstraction help with gas?">

Zarządzanie gazem jest jednym z głównych ograniczeń dla użytkowników Ethereum, głównie dlatego, że ETH jest jedynym aktywem, które można wykorzystać do płacenia za transakcje. Wyobraź sobie, że masz portfel z saldem USDC, ale bez żadnego ETH. Nie możesz przenieść ani zamienić tych tokenów USDC, ponieważ nie możesz zapłacić za gaz. Nie możesz również zamienić tych USDC na ETH, ponieważ to samo w sobie kosztuje gaz. Należałoby więc wysłać większą ilość ETH na swoje konto z giełdy lub innego adresu, aby rozwiązać problem. Dzięki portfelom inteligentnych kontraktów możesz po prostu płacić za gaz w USDC, odciążając swoje konto. Nie musisz już utrzymywać salda ETH na wszystkich swoich kontach.

Abstrakcja kont pozwala również twórcom zdecentralizowanych aplikacji na kreatywne zarządzanie gazem. Na przykład możesz zacząć uiszczać na rzecz swojej ulubionej zdecentralizowanej giełdy (DEX) stałą opłatę miesięczną za nieograniczoną liczbę transakcji. Zdecentralizowane aplikacje mogą również oferować uiszczanie wszystkich Twoich opłat za gaz za Ciebie w ramach nagrody za używanie ich platformy lub w ramach oferty wstępnej. Programistom będzie znacznie łatwiej wprowadzać innowacje w zakresie gazu, gdy portfele inteligentnych kontraktów będą obsługiwane na poziomie protokołu.

</ExpandableCard>

Zaufane sesje mogą również ewentualnie zmienić doświadczenia użytkowników, zwłaszcza w aplikacjach typu gry, w których duża liczba małych transakcji może wymagać zatwierdzenia w krótkim czasie. Indywidualne zatwierdzanie każdej transakcji pogorszyłoby wrażenia graczy, ale stałe zatwierdzanie jest niebezpieczne. Portfele inteligentnych kontraktów mogą zatwierdzać określone transakcje przez określony czas do określonej wartości lub tylko dla określonych adresów.

Warto też zastanowić się, jak zakupy mogą ulec zmianie wraz z abstrakcją kont. Obecnie każda transakcja musi zostać zatwierdzona i wykonana z portfela zasilonego wystarczającą ilością odpowiedniego tokena. Dzięki abstrakcji kont to doświadczenie mogłoby bardziej przypominać znane zakupy internetowe, w których użytkownik mógłby wypełnić „koszyk” przedmiotów i kliknąć raz, aby kupić wszystkie jednocześnie, przy czym cała wymagana logika byłaby obsługiwana przez kontrakt, a nie użytkownika.

To tylko kilka przykładów, jak doświadczenia użytkowników mogłyby ulec poprawie dzięki abstrakcji kont, ale będzie jeszcze dużo takich, których sobie na razie nie wyobrażamy. Abstrakcja kont uwalnia programistów od ograniczeń aktualnych kont EOA, pozwala im przenieść zalety web2 do web3 bez poświęcania pełnej kontroli użytkownika oraz kreatywnie tworzyć nowe doświadczenia użytkowników.

## W jaki sposób wdrożona zostanie abstrakcja kont? {#how-will-aa-be-implemented}

Obecnie istnieją portfele inteligentnych kontraktów, ale ich wdrożenie jest trudne, ponieważ EVM ich nie obsługuje. Polegają one raczej na zawijaniu stosunkowo złożonego kodu wokół standardowych transakcji Ethereum. Ethereum może to zmienić, umożliwiając inteligentnym kontraktom inicjowanie transakcji i obsługując niezbędną logikę w inteligentnych kontraktach na Ethereum, a nie poza łańcuchem. Umieszczenie logiki w inteligentnych kontraktach zwiększa również decentralizację Ethereum, ponieważ eliminuje potrzebę „przekaźników” uruchamianych przez twórców portfeli w celu przełożenia wiadomości podpisanych przez użytkownika na zwykłe transakcje Ethereum.

<ExpandableCard title="EIP-2771: abstrakcja kont przy użyciu meta-transakcji" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2771: account abstraction using meta-transactions">

EIP-2771 przedstawia koncepcję meta-transakcji, które pozwalają stronom trzecim opłacać koszty gazu użytkownika bez wprowadzania zmian w protokole Ethereum. Chodzi o to, aby transakcje podpisane przez użytkownika były przesyłane do kontraktu „spedytora”. Spedytor jest zaufanym podmiotem, który weryfikuje poprawność transakcji przed wysłaniem ich do przekaźnika gazu. Dzieje się to poza łańcuchem, co pozwala uniknąć konieczności zapłaty za gaz. Przekaźnik gazu przekazuje transakcję do kontraktu „odbiorcy”, dokonując wymaganej zapłaty za gaz w celu wykonania transakcji w Ethereum. Transakcja jest wykonywana, jeśli „spedytor” jest znany „odbiorcy” i cieszy się jego zaufaniem. Model ten ułatwia programistom wdrażanie transakcji niewymagających gazu dla użytkowników.

</ExpandableCard>

<ExpandableCard title="EIP-4337: abstrakcja kont bez zmieniania protokołu Ethereum" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-4337: account abstraction without changing the Ethereum protocol">

EIP-4337 to pierwszy krok w kierunku natywnej obsługi portfela inteligentnych kontraktów w zdecentralizowany sposób <em>bez konieczności wprowadzania zmian w protokole Ethereum</em>. Zamiast modyfikować warstwę konsensusu w celu obsługi portfeli inteligentnych kontraktów, nowy system jest dodawany oddzielnie do protokołu plotek w zwykłej transakcji. Ten system wyższego rzędu jest zbudowany wokół nowego obiektu o nazwie <code>UserOperation</code>, który grupuje działania użytkownika wraz z odpowiednimi podpisami. Te obiekty <code>UserOperation</code> są następnie transmitowane do dedykowanej puli pamięci (mempool), w której walidatory mogą zbierać je w „transakcję łączoną”. Łączona transakcja reprezentuje sekwencję wielu indywidualnych obiektów <code>UserOperation</code> i może być uwzględniana w blokach Ethereum tak jak zwykła transakcja oraz byłaby wybierana przez walidatory przy użyciu podobnego modelu wyboru maksymalizującego opłaty.

Sposób działania portfeli również uległby zmianie w ramach EIP-4337. Zamiast każdego portfela ponownie wdrażającego wspólną, ale złożoną logikę bezpieczeństwa, funkcje te byłyby zlecane na zewnątrz do globalnego kontraktu portfela znanego jako &quot;punkt wejścia&quot;. Obsługiwałoby to takie operacje, jak uiszczanie opłat i wykonywanie kodu EVM, dzięki czemu twórcy portfeli mogliby skupić się na zapewnianiu doskonałych wrażeń użytkownikom.

<strong>Uwaga</strong>: kontrakt punktu wejścia EIP 4337 został wdrożony w sieci głównej Ethereum 1 marca 2023 r. Kontrakt można zobaczyć na stronie <a href="https://etherscan.io/address/0x0576a174D229E3cFA37253523E645A78A0C91B57">Etherscan</a>.

</ExpandableCard>

<ExpandableCard title="EIP-2938: zmiana protokołu Ethereum w celu obsługi abstrakcji kont" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-2938: changing the Ethereum protocol to support account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-2938">EIP-2938</a> ma na celu aktualizację protokołu Ethereum poprzez wprowadzenie nowego rodzaju transakcji, <code>AA_TX_TYPE</code>, który zawiera trzy pola: <code>nonce</code>, <code>target</code> i <code>data</code>, gdzie <code>nonce</code> to licznik transakcji, <code>target</code> to adres kontraktu punktu wejścia, a <code>data</code> to kod bajtowy EVM. Aby wykonać te transakcje, należy dodać dwie nowe instrukcje (znane jako kody operacyjne) do EVM: <code>NONCE</code> i <code>PAYGAS</code>. Kod operacyjny <code>NONCE</code> śledzi kolejność transakcji, a <code>PAYGAS</code> oblicza i pobiera gaz wymagany do wykonania transakcji z salda kontraktu. Te nowe funkcje umożliwiają Ethereum natywną obsługę portfeli inteligentnych kontraktów, ponieważ niezbędna infrastruktura jest wbudowana w protokół Ethereum.

Należy zaznaczyć, że EIP-2938 nie jest obecnie aktywny. Społeczność preferuje obecnie EIP-4337, ponieważ nie wymaga on zmian w protokole.

</ExpandableCard>

<ExpandableCard title="EIP-3074: uaktualnianie kont zewnętrznych w celu abstrakcji kont" eventCategory="/roadmap/account-abstract" eventName="clicked EIP-3074: upgrading externally-owned accounts for account abstraction">

<a href="https://eips.ethereum.org/EIPS/eip-3074">EIP-3074</a> ma na celu aktualizację zewnętrznych kont Ethereum, umożliwiając im przekazywanie kontroli do inteligentnego kontraktu. Oznacza to, że logika inteligentnego kontraktu mogłaby zatwierdzać transakcje pochodzące z kont zewnętrznych (EOA). Umożliwiłoby to takie funkcje, jak sponsorowanie gazu i transakcje grupowe. Aby to zadziałało, do EVM należy dodać dwa nowe kody operacyjne: <code>AUTH</code> i <code>AUTHCALL</code>. Dzięki EIP-3074 korzyści portfela inteligentnego kontraktu są dostępne <em>bez konieczności posiadania kontraktu</em> — w zamian transakcje są obsługiwane przez określony rodzaj bezstanowego, niewymagającego zaufania, nieulepszalnego kontraktu znanego jako „wywoływacz”.

Należy zaznaczyć, że EIP-3074 nie jest obecnie aktywny. Społeczność preferuje obecnie EIP-4337, ponieważ nie wymaga on zmian w protokole.

</ExpandableCard>

## Aktualny postęp {#current-progress}

Portfele inteligentnych kontraktów są już dostępne, ale wymaganych jest więcej aktualizacji, aby stały się one w jak największym stopniu zdecentralizowane i pozbawione uprawnień. EIP-4337 to dopracowana propozycja, która nie wymaga żadnych zmian w protokole Ethereum, więc możliwe jest jej szybkie wdrożenie. Jednak uaktualnienia zmieniające protokół Ethereum nie są obecnie aktywnie rozwijane, więc ich wprowadzenie może potrwać znacznie dłużej. Możliwe jest również, że abstrakcja kont zostanie uzyskana przez EIP-4337 w takim stopniu, że żadne zmiany protokołu nigdy nie będą wymagane.

## Dalsza lektura {#further-reading}

- [erc4337.io](https://www.erc4337.io/)
- [Panel dyskusyjny o abstrakcji kont z Devcon Bogota](https://www.youtube.com/watch?app=desktop&v=WsZBymiyT-8)
- [„Dlaczego abstrakcja kont jest przełomem dla zdecentralizowanych aplikacji” z Devcon Bogota](https://www.youtube.com/watch?v=OwppworJGzs)
- [„Abstrakcja kont ELI5” z Devcon Bogota](https://www.youtube.com/watch?v=QuYZWJj65AY)
- [Uwagi Vitalika do „Drogi do abstrakcji kont”](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Wpis blogowy Vitalika o portfelach z odzyskiwaniem społecznościowym](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Uwagi EIP-2938](https://hackmd.io/@SamWilsn/ryhxoGp4D#What-is-EIP-2938)
- [Dokumentacja EIP-2938](https://eips.ethereum.org/EIPS/eip-2938)
- [Uwagi EIP-4337](https://medium.com/infinitism/erc-4337-account-abstraction-without-ethereum-protocol-changes-d75c9d94dc4a)
- [Dokumentacja EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Dokumentacja EIP-2771](https://eips.ethereum.org/EIPS/eip-2771)
- [„Podstawy abstrakcji kont” — Czym jest abstrakcja kont, część I](https://www.alchemy.com/blog/account-abstraction)
