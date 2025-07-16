---
title: Bezpieczeństwo Ethereum i zapobieganie oszustwom
description: Bądź bezpieczny na Ethereum
lang: pl
---

# Bezpieczeństwo Ethereum i zapobieganie oszustwom {#introduction}

Zwiększające się zainteresowanie kryptowalutami niesie ze sobą rosnące ryzyko ze strony oszustów i hakerów. Ten artykuł przedstawia kilka najlepszych praktyk w celu ograniczenia tego ryzyka.

<Divider />

## Bezpieczeństwo kryptograficzne 101 {#crypto-security}

### Podnieś poziom swojej wiedzy {#level-up-your-knowledge}

Nieporozumienia co do tego, jak działają kryptowaluty, mogą prowadzić do kosztownych błędów. Na przykład, jeśli ktoś udaje agenta obsługi klienta, który może zwrócić utracone ETH w zamian za Twoje klucze prywatne, to po prostu żeruje na ludziach, którzy nie rozumieją, że Ethereum jest zdecentralizowaną siecią pozbawioną tego rodzaju funkcji. Edukowanie się na temat działania Ethereum jest opłacalną inwestycją.

<DocLink href="/what-is-ethereum/">
  Co to jest Ethereum?
</DocLink>

<DocLink href="/eth/">
  Czym jest eter?
</DocLink>
<Divider />

## Bezpieczeństwo portfela {#wallet-security}

### Nie udostępniaj swoich kluczy prywatnych {#protect-private-keys}

**Nigdy, z żadnego powodu, nie udostępniaj swoich kluczy prywatnych!**

Klucz prywatny do portfela to hasło do Twojego portfela Ethereum. Jest to jedyna rzecz, która powstrzymuje kogoś, kto zna adres Twojego portfela, przed opróżnieniem Twojego konta ze wszystkich jego aktywów!

<DocLink href="/wallets/">
  Czym jest portfel Ethereum?
</DocLink>

#### Nie rób zrzutów ekranu swojej frazy ziarna ani kluczy prywatnych {#screenshot-private-keys}

Robiąc zrzut ekranu swojej frazy ziarna lub kluczy prywatnych, ryzykujesz synchronizacją ich z chmurą i potencjalnym udostępnieniem ich hakerom. Uzyskanie kluczy prywatnych z chmury jest częstym celem ataku hakerów.

### Używaj portfela sprzętowego {#use-hardware-wallet}

Portfel sprzętowy zapewnia przechowywanie kluczy prywatnych offline. Są one uważane za najbezpieczniejszą opcję portfela do przechowywania kluczy prywatnych: klucz prywatny nigdy nie styka się z Internetem i pozostaje całkowicie lokalnie na urządzeniu.

Przechowywanie kluczy prywatnych bez dostępu do Internetu znacznie zmniejsza ryzyko włamania, nawet jeśli haker przejmie kontrolę nad Twoim komputerem.

#### Wypróbuj portfel sprzętowy: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Sprawdź podwójnie transakcje przed wysłaniem środków {#double-check-transactions}

Przypadkowe wysłanie kryptowalut na niewłaściwy adres portfela jest częstym błędem. **Transakcja wysłana na Ethereum jest nieodwracalna.**Twoje środki będą możliwe do odzyskania tylko wtedy, gdy znasz właściciela i zdołasz go przekonać, aby wysłał Twoje środki do ciebie.

Przed wysłaniem transakcji zawsze upewniaj się, że adres, na który wysyłasz, dokładnie odpowiada adresowi żądanego odbiorcy. Podczas interakcji z inteligentnym kontraktem warto przeczytać wiadomość transakcji przed złożeniem podpisu.

### Ustaw limit wydatków inteligentnego kontraktu {#spend-limits}

Mając do czynienia z inteligentnymi kontraktami, nie zezwalaj na nieograniczone limity wydatków. Nieograniczone wydatki mogą umożliwić inteligentnemu kontraktowi opróżnienie portfela. Zamiast tego ustaw limity wydatków tylko do kwoty niezbędnej do przeprowadzenia transakcji.

Wiele portfeli Ethereum oferuje ochronę limitów, aby zabezpieczyć się przed opróżnianiem kont.

[Jak unieważnić dostęp inteligentnych kontraktów do środków kryptowaluty](/guides/how-to-revoke-token-access/)

<Divider />

## Powszechne oszustwa {#common-scams}

Całkowite zatrzymanie oszustów jest niemożliwe, ale możemy zmniejszyć ich skuteczność będąc świadomymi najczęściej stosowanych przez nich technik. Istnieje wiele odmian tych oszustw, ale najczęściej opierają się one na tych samych schematach. Jeśli nie, pamiętaj:

- zawsze bądź sceptyczny
- nikt nie da Ci darmowego lub przecenionego ETH
- nikt nie potrzebuje dostępu do Twoich kluczy prywatnych ani danych osobowych

### Wyłudzające reklamy na Twitterze/X {#ad-phishing}

![Wyłudzający link na Twitterze/X](./twitterPhishingScam.png)

Istnieje metoda fałszowania funkcji podglądu linków Twittera (znanego również jako X), aby potencjalnie oszukać użytkowników, aby myśleli, że odwiedzają oficjalną stronę internetową. Technika ta wykorzystuje mechanizm Twittera do generowania podglądów adresów URL udostępnianych w tweetach i pokazuje na przykład _od ethereum.org_ (patrz wyżej), podczas gdy w rzeczywistości użytkownik zostaje przekierowany do fałszywej strony.

Zawsze sprawdzaj, czy jesteś na właściwej stronie internetowej, zwłaszcza po kliknięciu linku.

[Więcej informacji tutaj](https://harrydenley.com/faking-twitter-unfurling).

### Oszustwa na konkurs {#giveaway}

Jednym z najczęstszych oszustw w kryptowalutach jest oszustwo na konkurs. Oszustwa na konkurs mogą przybierać różne formy, ale ogólne założenie jest takie, że jeśli wyślesz ETH na podany adres portfela, otrzymasz swoje ETH z powrotem, ale podwojone. *Z tego powodu jest również znane jako oszustwo 2 za 1.*

Autorzy takich oszustw zwykle wyznaczają ograniczony czas na odebranie nagrody, aby stworzyć fałszywe poczucie pilności.

### Włamania na konta w mediach społecznościowych {#social-media-hacks}

Głośna wersja tej sytuacji miała miejsce w lipcu 2020 r., kiedy to konta na Twitterze znanych celebrytów i organizacji zostały zhakowane. Haker jednocześnie opublikowywał konkursy na Bitcoiny na zhakowanych kontach. Chociaż fałszywe tweety zostały szybko zauważone i usunięte, hakerom nadal udało się uciec z 11 bitcoinami (lub 500000 USD na wrzesień 2021 r.).

![Oszustwo na Twitterze](./appleTwitterScam.png)

### Konkursy celebrytów {#celebrity-giveaway}

Konkursy celebrytów to kolejna popularna forma oszustwa związanego z konkursami. Oszuści biorą nagrany wywiad wideo lub rozmowę konferencyjną z celebrytą i transmitują ją na żywo na YouTubie — sprawiając, że wygląda to tak, jakby celebryta udzielał właśnie wywiadu wideo na żywo, w którym promuje giveaway na kryptowaluty.

Vitalik Buterin jest najczęściej wykorzystywaną osobą w tym oszustwie, ale wiele innych znanych osób zaangażowanych w kryptowaluty jest również wykorzystywanych (np. Elon Musk lub Charles Hoskinson). Umieszczenie w transmisji na żywo znanej osoby daje oszustom poczucie wiarygodności (wygląda to podejrzanie, ale zaangażowany jest Vitalik, więc musi być w porządku!).

**Konkursy są zawsze oszustwami. Jeśli wyślesz swoje środki na te konta, stracisz je na zawsze.**

![Oszustwo na YouTubie](./youtubeScam.png)

### Fałszywa pomoc {#support-scams}

Kryptowaluty to stosunkowo nowa i niezrozumiana technologia. Powszechnym oszustwem, które to wykorzystuje, jest oszustwo z pomocą techniczną, w którym oszuści podszywają się pod personel pomocy technicznej popularnych portfeli, giełd lub blockchainów.

Duża część dyskusji o Ethereum odbywa się na Discordzie. Oszuści pomocy technicznej zazwyczaj znajdują swój cel, wyszukując pytania dotyczące pomocy technicznej na publicznych kanałach Discord, a następnie wysyłając pytającemu prywatną wiadomość, proponując pomoc. Wzbudzając zaufanie, oszuści próbują nakłonić użytkownika do ujawnienia kluczy prywatnych lub przesłania środków do swoich portfeli.

![Oszustwo pomocy technicznej na Discordzie](./discordScam.png)

Zasadniczo pracownicy nigdy nie będą komunikować się z użytkownikiem za pośrednictwem prywatnych, nieoficjalnych kanałów. Kilka prostych rzeczy, o których należy pamiętać podczas korzystania z pomocy technicznej:

- Nigdy nie udostępniaj swoich kluczy prywatnych, frazy ziarna ani haseł
- Nigdy nie zezwalaj nikomu na zdalny dostęp do Twojego komputera
- Nigdy nie komunikuj się poza określonymi kanałami organizacji

<InfoBanner emoji=":lock:">
  <div>
    Uwaga: chociaż oszustwa w stylu wsparcia technicznego często zdarzają się na Discordzie, mogą one również występować w innych aplikacjach komunikacyjnych, w których odbywają się dyskusje na temat kryptowalut, w tym w wiadomościach e-mail.
  </div>
</InfoBanner>

### Oszustwo na token „Eth2” {#eth2-token-scam}

W okresie przed [Połączeniem](/roadmap/merge/) oszuści wykorzystali zamieszanie wokół terminu „Eth2”, aby nakłonić użytkowników do wymiany ETH na token „ETH2”. Nie ma „ETH2” i żaden inny prawowity token nie został wprowadzony wraz z Połączeniem. ETH, które posiadałeś przed Połączeniem, jest teraz tym samym ETH. Nie ma **żadnej potrzeby podejmowania jakichkolwiek działań związanych z ETH na Twoim koncie w związku z przejściem z proof-of-work na proof-of-stake**.

Oszuści mogą przedstawiać się jako „wsparcie”, informując, że jeśli zdeponujesz ETH, otrzymasz z powrotem „ETH2”. Nie ma [oficjalnego wsparcia Ethereum](/community/support/) i nie ma nowego tokena. Nigdy nie udostępniaj nikomu frazy ziarna swojego portfela.

_Uwaga: Istnieją pochodne tokeny/skróty, które mogą reprezentować zestakowane ETH (tj. rETH z Rocket Pool, stETH z Lido, ETH2 z Coinbase), ale nie są one czymś, do czego trzeba „migrować”._

### Oszustwa phishingowe {#phishing-scams}

Oszustwa phishingowe to kolejny coraz bardziej powszechny sposób, w jaki oszuści próbują ukraść Twoje środki z portfela.

Niektóre e-maile phishingowe proszą użytkowników o kliknięcie linków, które przekierują ich na fałszywe strony internetowe, prosząc o wprowadzenie frazy ziarna, zresetowanie hasła lub wysłanie ETH. Inni mogą prosić o nieświadome zainstalowanie złośliwego oprogramowania w celu zainfekowania komputera i umożliwienia oszustom dostępu do plików komputera.

Jeśli otrzymasz wiadomość e-mail od nieznanego nadawcy, pamiętaj:

- Nigdy nie otwieraj linków ani załączników z adresów e-mail, których nie rozpoznajesz
- Nigdy nie ujawniaj nikomu swoich danych osobowych ani haseł
- Usuwaj wiadomości e-mail od nieznanych nadawców

[Więcej o unikaniu oszustw phishingowych](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Oszustwo pośredników handlu kryptowalutami {#broker-scams}

Fałszywi pośrednicy handlu kryptowalutami podają się za wyspecjalizowanych pośredników kryptowalutowych, którzy oferują przejęcie Twoich pieniędzy i zainwestowanie ich w Twoim imieniu. Po tym, jak oszust otrzyma Twoje środki, może Cię zachęcić do przesłania większej ilości środków, abyś nie przegapił dalszych potencjalnych zysków w przyszłości, lub może całkowicie zniknąć.

Tacy oszuści często znajdują swoje cele, wykorzystując fałszywe konta na YouTube, aby rozpocząć pozornie naturalne rozmowy na temat „pośredników”. Konwersacje te są często wysoce oceniane, aby zwiększyć ich wiarygodność, ale wszystkie te oceny pochodzą z kont botów.

**Nie ufaj nieznajomym z Internetu, że zainwestują w Twoim imieniu. Stracisz swoje kryptowaluty.**

![Oszustwo pośrednika handlowego na YouTubie](./brokerScam.png)

### Oszustwa pul wydobywania kryptowalut {#mining-pool-scams}

Od września 2022 r. wydobywanie Ethereum nie jest już możliwe. Jednak oszustwa związane z pulami wydobywczymi nadal istnieją. Oszustwa pul wydobywczych polegają na tym, że ludzie kontaktują się z tobą bez zaproszenia i twierdzą, że możesz osiągnąć duże zyski, dołączając do puli wydobywczej Ethereum. Oszust będzie przedstawiał swoje argumenty i pozostawał z tobą w kontakcie tak długo, jak będzie to konieczne. Zasadniczo oszust będzie próbował przekonać Cię, że kiedy dołączysz do puli wydobywczej Ethereum, Twoja kryptowaluta zostanie wykorzystana do stworzenia ETH i że otrzymasz wynagrodzenie w postaci ETH. Zobaczysz wtedy, że Twoja kryptowaluta generuje niewielkie zyski. Ma to na celu skłonienie użytkownika do zainwestowania większej kwoty. Ostatecznie wszystkie Twoje środki zostaną wysłane na nieznany adres, a oszust albo zniknie, albo w niektórych przypadkach będzie nadal w kontakcie, jak miało to miejsce w niedawnym przypadku.

Podsumowując: należy uważać na osoby, które kontaktują się z nami w mediach społecznościowych, prosząc Cię o udział w puli wydobywczej. Gdy stracisz kryptowalutę, to już po niej.

Kilka rzeczy do zapamiętania:

- Uważaj na każdego, kto kontaktuje się z tobą w sprawie sposobów zarabiania na twoich kryptowalutach
- Przeprowadź swoje własne badania na temat stakingu, pul płynności lub innych sposobów inwestowania w kryptowaluty
- Rzadko, jeśli w ogóle, takie schematy są prawdziwe. Gdyby tak było, prawdopodobnie byłyby powszechne i na pewno byś o nich słyszał.

[Mężczyzna traci 200 tys. dolarów w wyniku oszustwa z pulą wydobywczą](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Oszustwa airdrop {#airdrop-scams}

Oszustwa airdrop polegają na tym, że oszust zrzuca zasób (NFT, token) do portfela użytkownika i wysyła użytkownikowi fałszywą stronę w celu odebrania zrzuconego zasobu. Podczas próby odebrania zasobu zostaniesz poproszony o zalogowanie się do portfela Ethereum i „zatwierdzenie” transakcji. Transakcja ta stanowi zagrożenie dla konta użytkownika, wysyłając klucze publiczne i prywatne do oszusta. Alternatywna forma tego oszustwa może wymagać potwierdzenia transakcji, która wysyła środki na konto oszusta.

[Więcej o oszustwach airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Bezpieczeństwo sieci 101 {#web-security}

### Używaj silnych haseł {#use-strong-passwords}

[Ponad 80% włamań na konta jest wynikiem słabych lub skradzionych haseł](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Długie kombinacje znaków, liczb i symboli pomagają zapewnić bezpieczeństwo kont.

Częstym błędem jest używanie kombinacji kilku powszechnych, powiązanych ze sobą słów. Takie hasła są niebezpieczne, ponieważ są podatne na technikę hakerską znaną jako atak słownikowy.

```md
Przykład słabego hasła: CuteFluffyKittens!

Przykład silnego hasła: ymv\*azu.EAC8eyp8umf
```

Innym częstym błędem jest używanie haseł, które można łatwo odgadnąć lub poznać za sprawą [inżynierii społecznej](https://wikipedia.org/wiki/Social_engineering_(security)). Umieszczanie w haśle nazwiska panieńskiego matki, imion dzieci lub zwierząt domowych lub dat urodzenia zwiększa ryzyko złamania go.

#### Dobre praktyki haseł: {#good-password-practices}

- Zrób hasła tak długie, jak jest to tylko możliwe przez generator haseł lub wypełniany formularz
- Użyj mieszaniny dużych liter, małych liter, liczb i symboli
- Nie używaj danych osobowych, takich jak imiona i nazwiska, w swoim haśle
- Unikaj popularnych wyrazów

[Więcej na temat tworzenia silnych haseł](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Używaj unikalnych haseł do wszystkiego {#use-unique-passwords}

Silne hasło, które zostało ujawnione w wycieku danych nie jest już silnym hasłem. Strona internetowa [Have I Been Pwned](https://haveibeenpwned.com) pozwala sprawdzić, czy Twoje konta znalazły się w jakichkolwiek publicznych wyciekach danych. Jeśli tak się stało, **natychmiast zmień te hasła**. Używanie unikalnych haseł dla każdego konta zmniejsza ryzyko uzyskania przez hakerów dostępu do wszystkich Twoich kont, jeśli jedno z Twoich haseł zostanie ujawnione.

### Używaj menedżera haseł {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Korzystanie z menedżera haseł umożliwia tworzenie silnych, unikalnych haseł i ich zapamiętywanie! <strong>Zdecydowanie zalecamy</strong> korzystać z jednego z nich, a większość z nich jest bezpłatna!
  </div>
</InfoBanner>

Zapamiętywanie silnych, unikalnych haseł do każdego posiadanego konta nie jest idealnym rozwiązaniem. Menedżer haseł oferuje bezpieczny, zaszyfrowany magazyn dla wszystkich Twoich haseł, do którego można uzyskać dostęp za pomocą jednego silnego hasła głównego. Sugerują również silne hasła podczas rejestracji w nowym serwisie, aby nie trzeba było tworzyć własnych. Wiele menedżerów haseł poinformuje cię również, gdy Twoje dane znajdą się w wycieku danych, umożliwiając zmianę haseł, zanim dojdzie do jakichkolwiek złośliwych ataków.

![Przykład korzystania z menedżera haseł](./passwordManager.png)

#### Wypróbuj menedżera haseł: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Lub sprawdź inne [polecane menedżery haseł](https://www.privacytools.io/secure-password-manager)

### Używaj uwierzytelniania dwuskładnikowego {#two-factor-authentication}

Czasami możemy zostać poproszeni o uwierzytelnienie swojej tożsamości za pomocą specjalnych dowodów. Są one znane jako **czynniki**. Trzy główne czynniki to:

- Coś, co znasz (np. hasło lub pytanie zabezpieczające)
- Coś, czym jesteś (np. odcisk palca lub skaner tęczówki/twarzy)
- Coś, co posiadasz (klucz bezpieczeństwa lub aplikacja uwierzytelniająca w telefonie)

Stosowanie **uwierzytelnienia dwuskładnikowego (2FA)** wprowadza dodatkowy *czynnik bezpieczeństwa*  dla Twoich kont online. 2FA gwarantuje, że samo posiadanie hasła nie wystarczy, aby uzyskać dostęp do konta. Najczęściej drugim czynnikiem jest losowy 6-cyfrowy kod, znany jako **jednorazowe hasło czasowe (TOTP)**, do którego można uzyskać dostęp za pośrednictwem aplikacji uwierzytelniającej, takiej jak Google Authenticator lub Authy. Działają one jako „coś, co posiadasz”, ponieważ ziarno, które generuje kod czasowy, jest przechowywane na twoim urządzeniu.

<InfoBanner emoji=":lock:">
  <div>
    Uwaga: korzystanie z 2FA opartego na wiadomościach SMS jest podatne na tzw. <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> i nie jest bezpieczne. Dla najlepszej ochrony korzystaj z takich usług, jak <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> lub <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Klucze bezpieczeństwa {#security-keys}

Klucz bezpieczeństwa to bardziej zaawansowany i bezpieczny rodzaj 2FA. Klucze bezpieczeństwa to urządzenia do uwierzytelniania sprzętu fizycznego, które działają tak samo, jak aplikacje uwierzytelniające. Stosowanie klucza bezpieczeństwa jest najbezpieczniejszym sposobem korzystania z 2FA. Wiele z tych kluczy wykorzystuje standard FIDO Universal 2nd Factor (U2F). [Dowiedz się więcej o U2F od FIDO](https://www.yubico.com/authentication-standards/fido-u2f/).

Więcej na temat 2FA tutaj:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Odinstaluj rozszerzenia przeglądarki {#uninstall-browser-extensions}

Rozszerzenia przeglądarki, takie jak rozszerzenia Chrome lub dodatki do Firefoksa, mogą ulepszyć funkcjonalności przeglądarki, ale wiążą się z ryzykiem. Domyślnie większość rozszerzeń przeglądarki prosi o dostęp do „odczytu i zmiany danych witryny”, co pozwala im robić prawie wszystko z danymi użytkownika. Rozszerzenia Chrome są zawsze automatycznie aktualizowane, więc wcześniej bezpieczne rozszerzenie może zostać później zaktualizowane i zawierać złośliwy kod. Większość rozszerzeń przeglądarki nie próbuje wykraść Twoich danych, ale użytkownik powinien być świadomy, że mogą to zrobić.

#### Bądź bezpieczny: {#browser-extension-safety}

- Instaluj rozszerzenia przeglądarki tylko z zaufanych źródeł
- Usuwaj nieużywane rozszerzenia przeglądarki
- Instaluj rozszerzenia Chrome lokalnie, aby zatrzymać ich automatyczne aktualizacje (zaawansowane)

[Więcej o zagrożeniach związanych z rozszerzeniami przeglądarki](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Dalsza lektura {#further-reading}

### Bezpieczeństwo sieci {#reading-web-security}

- [Nawet 3 miliony urządzeń zainfekowanych złośliwym oprogramowaniem w dodatkach do Chrome i Edge](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) — _Dan Goodin_
- [Jak stworzyć silne hasło, którego nie zapomnisz](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) — _AVG_
- [Czym jest klucz bezpieczeństwa?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) — _Coinbase_

### Bezpieczeństwo kryptograficzne {#reading-crypto-security}

- [Ochranianie siebie i swoich funduszy](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) — _MyCrypto_
- [Kwestie bezpieczeństwa w popularnym oprogramowaniu do komunikacji kryptograficznej](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) — _Salus_
- [Przewodnik bezpieczeństwa dla ludzi opornych i inteligentnych](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) — _MyCrypto_
- [Bezpieczeństwo kryptograficzne: hasła i uwierzytelnianie](https://www.youtube.com/watch?v=m8jlnZuV1i4) — _Andreas M. Antonopoulos_

### Edukacja o oszustwach {#reading-scam-education}

- [Przewodnik: Jak zidentyfikować fałszywe tokeny](/guides/how-to-id-scam-tokens/)
- [Bądź bezpieczny: Najczęstsze oszustwa](https://support.mycrypto.com/staying-safe/common-scams) — _MyCrypto_
- [Unikanie oszustw](https://bitcoin.org/en/scams) — _Bitcoin.org_
- [Wątek na Twitterze o powszechnych wiadomościach phishingowych dotyczących kryptowalut](https://twitter.com/tayvano_/status/1516225457640787969) — _Taylor Monahan_

<QuizWidget quizKey="security" />
