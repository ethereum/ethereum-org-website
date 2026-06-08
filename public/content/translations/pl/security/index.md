---
title: Bezpieczeństwo w Ethereum i zapobieganie oszustwom
description: Jak zachować bezpieczeństwo w Ethereum
lang: pl
---

Rosnące zainteresowanie kryptowalutami niesie ze sobą rosnące ryzyko ze strony oszustów i hakerów. W tym artykule przedstawiono kilka najlepszych praktyk pozwalających zminimalizować to ryzyko.

**Pamiętaj: nikt z ethereum.org nigdy się z Tobą nie skontaktuje. Nie odpowiadaj na e-maile, których nadawcy twierdzą, że pochodzą z oficjalnego wsparcia Ethereum.**

<Divider />

## Podstawy bezpieczeństwa krypto {#crypto-security}

### Poszerz swoją wiedzę {#level-up-your-knowledge}

Niezrozumienie tego, jak działa krypto, może prowadzić do kosztownych błędów. Na przykład, jeśli ktoś udaje pracownika obsługi klienta, który może zwrócić utracone ETH w zamian za Twoje klucze prywatne, żeruje na osobach nierozumiejących, że [Ethereum](/) to zdecentralizowana sieć, która nie posiada takiej funkcjonalności. Edukacja na temat działania Ethereum to opłacalna inwestycja.

<DocLink href="/what-is-ethereum/">
  Czym jest Ethereum?
</DocLink>

<DocLink href="/what-is-ether/">
  Czym jest ether?
</DocLink>
<Divider />

## Bezpieczeństwo portfela {#wallet-security}

### Nigdy nie udostępniaj swojej frazy odzyskiwania {#protect-private-keys}

**Nigdy, pod żadnym pozorem, nie udostępniaj swojej frazy odzyskiwania ani kluczy prywatnych!**

Twoja fraza odzyskiwania (nazywana również tajną frazą odzyskiwania) to główny klucz do Twojego portfela. Każdy, kto ją posiada, może uzyskać dostęp do wszystkich Twoich kont i wyprowadzić z nich wszystkie aktywa. Klucze prywatne działają w ten sam sposób w przypadku pojedynczych kont. Żadna legalna usługa, pracownik wsparcia ani strona internetowa nigdy o nie nie poprosi.

<DocLink href="/wallets/">
  Czym jest portfel Ethereum?
</DocLink>

#### Nie rób zrzutów ekranu swoich fraz odzyskiwania/kluczy prywatnych {#screenshot-private-keys}

Zrobienie zrzutu ekranu frazy odzyskiwania lub kluczy prywatnych może spowodować ich synchronizację z dostawcą danych w chmurze, co może narazić je na dostęp hakerów. Pozyskiwanie kluczy prywatnych z chmury to powszechny wektor ataku hakerów.

### Używaj portfela sprzętowego {#use-hardware-wallet}

Portfel sprzętowy zapewnia przechowywanie kluczy prywatnych w trybie offline. Uważa się je za najbezpieczniejszą opcję portfela do przechowywania kluczy prywatnych: Twój klucz prywatny nigdy nie ma kontaktu z internetem i pozostaje całkowicie lokalnie na Twoim urządzeniu.

Przechowywanie kluczy prywatnych w trybie offline znacznie zmniejsza ryzyko zhakowania, nawet jeśli haker przejmie kontrolę nad Twoim komputerem.

#### Wypróbuj portfel sprzętowy: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Dokładnie sprawdzaj transakcje przed wysłaniem {#double-check-transactions}

Przypadkowe wysłanie krypto na zły adres portfela to powszechny błąd. **Transakcja wysłana w Ethereum jest nieodwracalna.** O ile nie znasz właściciela adresu i nie przekonasz go do odesłania środków, nie będziesz w stanie ich odzyskać.

Przed wysłaniem transakcji zawsze upewnij się, że adres, na który wysyłasz, dokładnie odpowiada adresowi docelowego odbiorcy.
Dobrą praktyką podczas interakcji z inteligentnym kontraktem jest przeczytanie wiadomości transakcji przed jej podpisaniem.

### Ustaw limity wydatków dla inteligentnych kontraktów {#spend-limits}

Podczas interakcji z inteligentnymi kontraktami nie zezwalaj na nielimitowane wydatki. Nielimitowane wydatki mogą umożliwić inteligentnemu kontraktowi opróżnienie Twojego portfela. Zamiast tego ustaw limity wydatków tylko na kwotę niezbędną do przeprowadzenia transakcji.

Wiele portfeli Ethereum oferuje ochronę limitów, aby zabezpieczyć konta przed opróżnieniem.

[Jak cofnąć dostęp inteligentnego kontraktu do Twoich środków krypto](/guides/how-to-revoke-token-access/)

<Divider />

## Powszechne oszustwa {#common-scams}

Całkowite powstrzymanie oszustów jest niemożliwe, ale możemy sprawić, że będą mniej skuteczni, będąc świadomymi ich najczęściej stosowanych technik. Istnieje wiele odmian tych oszustw, ale zazwyczaj podążają one za tymi samymi ogólnymi wzorcami. Jeśli nie zapamiętasz niczego innego, pamiętaj:

- zawsze bądź sceptyczny
- nikt nie da Ci darmowego ani przecenionego ETH
- nikt nie potrzebuje dostępu do Twoich kluczy prywatnych ani danych osobowych

### Phishing w reklamach na Twitterze {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Istnieje metoda fałszowania funkcji podglądu linków na Twitterze (znanym również jako X), która może potencjalnie oszukać użytkowników, sugerując im, że odwiedzają legalną stronę internetową. Technika ta wykorzystuje mechanizm Twittera do generowania podglądów adresów URL udostępnianych w tweetach i pokazuje na przykład _z ethereum.org_ (jak pokazano powyżej), podczas gdy w rzeczywistości użytkownicy są przekierowywani na złośliwą stronę.

Zawsze sprawdzaj, czy znajdujesz się w odpowiedniej domenie, zwłaszcza po kliknięciu linku.

[Więcej informacji znajdziesz tutaj](https://harrydenley.com/faking-twitter-unfurling).

### Oszustwa typu „giveaway” (rozdawnictwo) {#giveaway}

Jednym z najczęstszych oszustw w świecie kryptowalut jest oszustwo typu „giveaway” (rozdawnictwo). Może ono przybierać wiele form, ale ogólna zasada jest taka, że jeśli wyślesz ETH na podany adres portfela, otrzymasz z powrotem podwojoną kwotę ETH. *Z tego powodu jest to również znane jako oszustwo „2 za 1”.*

Oszustwa te zazwyczaj określają ograniczony czas na odebranie nagrody, aby stworzyć fałszywe poczucie pilności.

### Włamania do mediów społecznościowych {#social-media-hacks}

Głośna wersja tego oszustwa miała miejsce w lipcu 2020 r., kiedy to zhakowano konta na Twitterze znanych celebrytów i organizacji. Haker jednocześnie opublikował na zhakowanych kontach informację o rozdawnictwie Bitcoinów. Chociaż zwodnicze tweety zostały szybko zauważone i usunięte, hakerom i tak udało się uciec z 11 bitcoinami (czyli 500 000 USD według stanu na wrzesień 2021 r.).

![A scam on Twitter](./appleTwitterScam.png)

### Rozdawnictwo z udziałem celebrytów {#celebrity-giveaway}

Rozdawnictwo z udziałem celebrytów to kolejna powszechna forma oszustwa typu „giveaway”. Oszuści biorą nagrany wywiad wideo lub przemówienie na konferencji wygłoszone przez celebrytę i transmitują je na żywo na YouTube – sprawiając wrażenie, jakby celebryta udzielał wywiadu wideo na żywo, popierając rozdawnictwo kryptowalut.

Vitalik Buterin jest najczęściej wykorzystywany w tym oszustwie, ale wykorzystuje się również wiele innych znanych osób zaangażowanych w krypto (np. Elon Musk lub Charles Hoskinson). Włączenie znanej osoby nadaje transmisji na żywo oszustów pozory legalności (wygląda to podejrzanie, ale Vitalik jest w to zaangażowany, więc musi być w porządku!).

**Rozdawnictwa to zawsze oszustwa. Jeśli wyślesz swoje środki na te konta, stracisz je na zawsze.**

![A scam on YouTube](./youtubeScam.png)

### Oszustwa na wsparcie techniczne {#support-scams}

Kryptowaluty to stosunkowo młoda i niezrozumiana technologia. Powszechnym oszustwem, które to wykorzystuje, jest oszustwo na wsparcie techniczne, w którym oszuści podszywają się pod personel wsparcia popularnych portfeli, giełd lub łańcuchów bloków.

Duża część dyskusji na temat Ethereum odbywa się na Discordzie. Oszuści podszywający się pod wsparcie często znajdują swój cel, wyszukując pytania o pomoc na publicznych kanałach Discorda, a następnie wysyłając pytającemu prywatną wiadomość z ofertą wsparcia. Budując zaufanie, oszuści próbują nakłonić Cię do ujawnienia kluczy prywatnych lub wysłania środków na ich portfele.

![A support scam on Discord](./discordScam.png)

Zasadniczo personel nigdy nie będzie komunikował się z Tobą za pośrednictwem prywatnych, nieoficjalnych kanałów. Kilka prostych rzeczy, o których należy pamiętać podczas kontaktów ze wsparciem:

- Nigdy nie udostępniaj swoich kluczy prywatnych, fraz odzyskiwania ani haseł
- Nigdy nie pozwalaj nikomu na zdalny dostęp do Twojego komputera
- Nigdy nie komunikuj się poza wyznaczonymi kanałami organizacji

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Uwaga: chociaż oszustwa w stylu wsparcia technicznego często zdarzają się na Discordzie, mogą być również powszechne w dowolnych aplikacjach czatowych, w których toczą się dyskusje o krypto, w tym w wiadomościach e-mail.
</AlertDescription>
</AlertContent>
</Alert>

### Oszustwo na token „Eth2” {#eth2-token-scam}

W okresie poprzedzającym [The Merge](/roadmap/merge/) oszuści wykorzystali zamieszanie wokół terminu „Eth2”, próbując nakłonić użytkowników do wymiany ich ETH na token „ETH2”. Nie ma czegoś takiego jak „ETH2”, a wraz z The Merge nie wprowadzono żadnego innego legalnego tokena. ETH, które posiadałeś przed The Merge, to to samo ETH teraz. **Nie ma potrzeby podejmowania żadnych działań związanych z Twoim ETH w związku z przejściem z dowodu pracy (PoW) na dowód stawki (PoS)**.

Oszuści mogą pojawić się jako „wsparcie”, mówiąc Ci, że jeśli zdeponujesz swoje ETH, otrzymasz z powrotem „ETH2”. Nie ma [oficjalnego wsparcia Ethereum](/community/support/) i nie ma nowego tokena. Nigdy nikomu nie udostępniaj frazy odzyskiwania swojego portfela.

_Uwaga: Istnieją tokeny pochodne/tickery, które mogą reprezentować stakowane ETH (np. rETH z Rocket Pool, stETH z Lido, ETH2 z Coinbase), ale nie są to tokeny, do których musisz „migrować”._

### Oszustwa phishingowe {#phishing-scams}

Oszustwa phishingowe to kolejny, coraz powszechniejszy sposób, który oszuści wykorzystują do kradzieży środków z Twojego portfela.

Niektóre e-maile phishingowe proszą użytkowników o kliknięcie linków, które przekierują ich na fałszywe strony internetowe, prosząc o wprowadzenie frazy odzyskiwania, zresetowanie hasła lub wysłanie ETH. Inne mogą prosić o nieświadome zainstalowanie złośliwego oprogramowania w celu zainfekowania komputera i zapewnienia oszustom dostępu do plików na komputerze.

Jeśli otrzymasz e-mail od nieznanego nadawcy, pamiętaj:

- Nigdy nie otwieraj linków ani załączników z adresów e-mail, których nie rozpoznajesz
- Nigdy nikomu nie ujawniaj swoich danych osobowych ani haseł
- Usuwaj e-maile od nieznanych nadawców

[Więcej o unikaniu oszustw phishingowych](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Oszustwa na brokerów handlu krypto {#broker-scams}

Fałszywi brokerzy handlu krypto twierdzą, że są specjalistycznymi brokerami kryptowalutowymi, którzy zaoferują przyjęcie Twoich pieniędzy i zainwestowanie ich w Twoim imieniu. Po tym, jak oszust otrzyma Twoje środki, może Cię zwodzić, prosząc o wysłanie kolejnych środków, abyś nie przegapił dalszych zysków z inwestycji, lub może całkowicie zniknąć.

Ci oszuści często znajdują cele, używając fałszywych kont na YouTube do rozpoczynania pozornie naturalnych rozmów o „brokerze”. Rozmowy te są często wysoko oceniane, aby zwiększyć ich wiarygodność, ale wszystkie głosy pochodzą z kont botów.

**Nie ufaj nieznajomym z internetu, że zainwestują w Twoim imieniu. Stracisz swoje krypto.**

![A trading broker scam on YouTube](./brokerScam.png)

### Oszustwa na pule wydobywcze krypto {#mining-pool-scams}

Od września 2022 r. kopanie w Ethereum nie jest już możliwe. Jednak oszustwa na pule wydobywcze nadal istnieją. Oszustwa na pule wydobywcze polegają na tym, że ludzie kontaktują się z Tobą bez Twojej prośby i twierdzą, że możesz osiągnąć duże zyski, dołączając do puli wydobywczej Ethereum. Oszust będzie składał obietnice i pozostawał z Tobą w kontakcie tak długo, jak to konieczne. Zasadniczo oszust będzie próbował przekonać Cię, że po dołączeniu do puli wydobywczej Ethereum Twoja kryptowaluta zostanie wykorzystana do tworzenia ETH i że będziesz otrzymywać dywidendy w ETH. Następnie zobaczysz, że Twoja kryptowaluta przynosi niewielkie zyski. Ma to na celu jedynie zachęcenie Cię do zainwestowania większej kwoty. Ostatecznie wszystkie Twoje środki zostaną wysłane na nieznany adres, a oszust zniknie lub w niektórych przypadkach będzie nadal utrzymywał kontakt, jak miało to miejsce w niedawnym przypadku.

Podsumowując: uważaj na osoby, które kontaktują się z Tobą w mediach społecznościowych, prosząc o dołączenie do puli wydobywczej. Kiedy stracisz swoje krypto, przepadnie ono bezpowrotnie.

Kilka rzeczy, o których warto pamiętać:

- Uważaj na każdego, kto kontaktuje się z Tobą w sprawie sposobów zarabiania na Twoim krypto
- Zrób własny reaserch na temat stakingu, pul płynności lub innych sposobów inwestowania swojego krypto
- Rzadko, jeśli w ogóle, takie schematy są legalne. Gdyby były, prawdopodobnie byłyby powszechnie znane i na pewno byś o nich usłyszał.

[Mężczyzna traci 200 tys. dolarów w oszustwie na pulę wydobywczą](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Oszustwa na airdrop {#airdrop-scams}

Oszustwa na airdrop polegają na tym, że fałszywy projekt przesyła airdropem aktywo (NFT, token) do Twojego portfela i odsyła Cię na fałszywą stronę internetową, aby odebrać zrzucone aktywo. Podczas próby odbioru zostaniesz poproszony o zalogowanie się za pomocą portfela Ethereum i „zatwierdzenie” transakcji. Ta transakcja kompromituje Twoje konto, wysyłając Twoje klucze publiczne i prywatne do oszusta. Alternatywna forma tego oszustwa może polegać na potwierdzeniu transakcji, która wysyła środki na konto oszusta.

[Więcej o oszustwach na airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Podstawy bezpieczeństwa w sieci {#web-security}

### Używaj silnych haseł {#use-strong-passwords}

[Ponad 80% włamań na konta jest wynikiem słabych lub skradzionych haseł](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Długa kombinacja znaków, cyfr i symboli pomoże zapewnić bezpieczeństwo Twoich kont.

Częstym błędem jest używanie kombinacji kilku powszechnych, powiązanych ze sobą słów. Takie hasła są niebezpieczne, ponieważ są podatne na technikę hakerską zwaną atakiem słownikowym.

```md
Przykład słabego hasła: CuteFluffyKittens!

Przykład silnego hasła: ymv\*azu.EAC8eyp8umf
```

Innym częstym błędem jest używanie haseł, które można łatwo odgadnąć lub odkryć za pomocą [socjotechniki](<https://wikipedia.org/wiki/Social_engineering_(security)>). Umieszczenie w haśle nazwiska panieńskiego matki, imion dzieci lub zwierząt domowych albo dat urodzenia zwiększy ryzyko zhakowania.

#### Dobre praktyki dotyczące haseł: {#good-password-practices}

- Twórz hasła tak długie, jak pozwala na to generator haseł lub formularz, który wypełniasz
- Używaj mieszanki wielkich i małych liter, cyfr i symboli
- Nie używaj w haśle danych osobowych, takich jak nazwiska rodowe
- Unikaj pospolitych słów

[Więcej o tworzeniu silnych haseł](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Używaj unikalnych haseł do wszystkiego {#use-unique-passwords}

Silne hasło, które zostało ujawnione w wyniku wycieku danych, nie jest już silnym hasłem. Strona internetowa [Have I Been Pwned](https://haveibeenpwned.com) pozwala sprawdzić, czy Twoje konta brały udział w jakichkolwiek publicznych wyciekach danych. Jeśli tak, **natychmiast zmień te hasła**. Używanie unikalnych haseł do każdego konta zmniejsza ryzyko uzyskania przez hakerów dostępu do wszystkich Twoich kont w przypadku naruszenia jednego z haseł.

### Używaj menedżera haseł {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    Używanie menedżera haseł rozwiązuje problem tworzenia silnych, unikalnych haseł i ich zapamiętywania! <strong>Zdecydowanie</strong> zalecamy korzystanie z niego, a większość z nich jest darmowa!
</AlertDescription>
</AlertContent>
</Alert>

Zapamiętywanie silnych, unikalnych haseł do każdego posiadanego konta nie jest idealnym rozwiązaniem. Menedżer haseł oferuje bezpieczny, zaszyfrowany magazyn dla wszystkich Twoich haseł, do którego możesz uzyskać dostęp za pomocą jednego silnego hasła głównego. Sugerują one również silne hasła podczas rejestracji w nowej usłudze, więc nie musisz tworzyć własnych. Wiele menedżerów haseł poinformuje Cię również, czy brałeś udział w wycieku danych, umożliwiając zmianę haseł przed jakimikolwiek złośliwymi atakami.

![Example of using a password manager](./passwordManager.png)

#### Wypróbuj menedżera haseł: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Lub sprawdź inne [polecane menedżery haseł](https://www.privacytools.io/secure-password-manager)

### Używaj uwierzytelniania dwuskładnikowego {#two-factor-authentication}

Czasami możesz zostać poproszony o uwierzytelnienie swojej tożsamości za pomocą unikalnych dowodów. Są one znane jako **składniki**. Trzy główne składniki to:

- Coś, co wiesz (np. hasło lub pytanie zabezpieczające)
- Coś, czym jesteś (np. odcisk palca lub skaner tęczówki/twarzy)
- Coś, co posiadasz (klucz zabezpieczeń lub aplikacja uwierzytelniająca w telefonie)

Używanie **uwierzytelniania dwuskładnikowego (2FA)** zapewnia dodatkowy *składnik bezpieczeństwa* dla Twoich kont internetowych. 2FA gwarantuje, że samo posiadanie hasła nie wystarczy, aby uzyskać dostęp do konta. Najczęściej drugim składnikiem jest losowy 6-cyfrowy kod, znany jako **oparte na czasie hasło jednorazowe (TOTP)**, do którego można uzyskać dostęp za pośrednictwem aplikacji uwierzytelniającej, takiej jak Google Authenticator lub Authy. Działają one jako składnik „coś, co posiadasz”, ponieważ ziarno generujące kod czasowy jest przechowywane na Twoim urządzeniu.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Uwaga: Używanie 2FA opartego na SMS-ach jest podatne na <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">kradzież karty SIM (SIM jacking)</a> i nie jest bezpieczne. Aby uzyskać najlepsze bezpieczeństwo, użyj usługi takiej jak <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> lub <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Klucze zabezpieczeń {#security-keys}

Klucz zabezpieczeń to bardziej zaawansowany i bezpieczny rodzaj 2FA. Klucze zabezpieczeń to fizyczne sprzętowe urządzenia uwierzytelniające, które działają jak aplikacje uwierzytelniające. Używanie klucza zabezpieczeń to najbezpieczniejszy sposób na 2FA. Wiele z tych kluczy wykorzystuje standard FIDO Universal 2nd Factor (U2F). [Dowiedz się więcej o FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

Obejrzyj więcej o 2FA:

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Odinstaluj rozszerzenia przeglądarki {#uninstall-browser-extensions}

Rozszerzenia przeglądarki, takie jak rozszerzenia Chrome lub dodatki do przeglądarki Firefox, mogą poprawić funkcjonalność przeglądarki, ale wiążą się również z ryzykiem. Domyślnie większość rozszerzeń przeglądarki prosi o dostęp do „odczytu i zmiany danych witryny”, co pozwala im zrobić prawie wszystko z Twoimi danymi. Rozszerzenia Chrome są zawsze aktualizowane automatycznie, więc wcześniej bezpieczne rozszerzenie może zostać zaktualizowane później i zawierać złośliwy kod. Większość rozszerzeń przeglądarki nie próbuje ukraść Twoich danych, ale powinieneś mieć świadomość, że mogą to zrobić.

#### Zachowaj bezpieczeństwo poprzez: {#browser-extension-safety}

- Instalowanie rozszerzeń przeglądarki tylko z zaufanych źródeł
- Usuwanie nieużywanych rozszerzeń przeglądarki
- Lokalne instalowanie rozszerzeń Chrome w celu zatrzymania automatycznej aktualizacji (Zaawansowane)

[Więcej o ryzyku związanym z rozszerzeniami przeglądarki](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Dalsza lektura {#further-reading}

### Bezpieczeństwo w sieci {#reading-web-security}

- [Nawet 3 miliony urządzeń zainfekowanych przez dodatki do Chrome i Edge zawierające złośliwe oprogramowanie](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) – _Dan Goodin_
- [Jak stworzyć silne hasło — którego nie zapomnisz](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) – _AVG_
- [Czym jest klucz zabezpieczeń?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) – _Coinbase_

### Bezpieczeństwo krypto {#reading-crypto-security}

- [Ochrona siebie i swoich środków](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) – _MyCrypto_
- [Problemy z bezpieczeństwem w popularnym oprogramowaniu do komunikacji krypto](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) – _Salus_
- [Przewodnik po bezpieczeństwie dla opornych i bystrzaków](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) – _MyCrypto_
- [Bezpieczeństwo krypto: Hasła i uwierzytelnianie](https://www.youtube.com/watch?v=m8jlnZuV1i4) – _Andreas M. Antonopoulos_

### Edukacja o oszustwach {#reading-scam-education}

- [Przewodnik: Jak rozpoznać fałszywe tokeny](/guides/how-to-id-scam-tokens/)
- [Zachowanie bezpieczeństwa: Powszechne oszustwa](https://support.mycrypto.com/staying-safe/common-scams) – _MyCrypto_
- [Unikanie oszustw](https://bitcoin.org/en/scams) – _Bitcoin.org_
- [Wątek na Twitterze o powszechnych e-mailach i wiadomościach phishingowych w krypto](https://twitter.com/tayvano_/status/1516225457640787969) – _Taylor Monahan_

<QuizWidget quizKey="security" />