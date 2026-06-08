---
title: Zostałem oszukany lub straciłem środki
metaTitle: Pomoc i zgłaszanie oszustw
description: Co zrobić, jeśli padłeś ofiarą oszustwa, jak zabezpieczyć pozostałe aktywa i gdzie zgłosić przestępstwo.
lang: pl
---

Oszustwa związane z kryptowalutami dotykają ludzi na wszystkich poziomach doświadczenia, w tym profesjonalistów z branży finansowej i technologicznej. Nie jesteś sam, a to, że tu jesteś, to właściwy pierwszy krok.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Nikt nie może cofnąć transakcji na blockchainie.** Jeśli ktoś kontaktuje się z Tobą, twierdząc, że może odzyskać Twoje środki za opłatą, jest to prawie na pewno kolejne oszustwo. Zobacz [oszustwa na odzyskiwanie środków](#scam-types) poniżej.

</AlertDescription>
</AlertContent>
</Alert>

## Zabezpiecz swoje pozostałe aktywa {#secure-assets}

Jeśli wszedłeś w interakcję z oszustem lub podejrzewasz, że Twój portfel został przejęty, natychmiast podejmij następujące kroki:

1. **Przenieś pozostałe środki** do nowego, bezpiecznego portfela, do którego oszust nie ma dostępu
2. **Cofnij zatwierdzenia tokenów.** Oszuści często podstępem nakłaniają do zatwierdzenia nieograniczonego wydawania tokenów. Cofnięcie tych uprawnień zapobiega dalszemu opróżnianiu Twojego portfela
3. **Zmień hasła** na wszelkich powiązanych kontach giełdowych
4. **Włącz uwierzytelnianie dwuskładnikowe (2FA)** na wszystkich kontach związanych z krypto

### Jak cofnąć zatwierdzenia tokenów {#revoke-approvals}

Kiedy wchodzisz w interakcję ze zdecentralizowaną aplikacją (dapp) lub inteligentnym kontraktem, mogłeś udzielić im pozwolenia na wydawanie Twoich tokenów. Jeśli oszust podstępem nakłonił Cię do zatwierdzenia złośliwego kontraktu, może on nadal opróżniać Twoje tokeny nawet po początkowym oszustwie.

Użyj tych narzędzi, aby sprawdzić i cofnąć zatwierdzenia:

- [Revoke.cash](https://revoke.cash/): podłącz swój portfel, aby zobaczyć wszystkie aktywne zatwierdzenia i je cofnąć
- [Revokescout](https://revoke.blockscout.com/): sprawdź i cofnij zatwierdzenia za pomocą Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): sprawdź i cofnij zatwierdzenia za pomocą Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Przewodnik krok po kroku: Jak cofnąć dostęp do tokenów
</DocLink>

## Zgłaszaj adresy i strony internetowe oszustów {#report}

Zgłaszanie pomaga ostrzec innych użytkowników i może pomóc w dochodzeniach organów ścigania. Dokumentuj wszystko: hashe transakcji, adresy portfeli, zrzuty ekranu i wszelką komunikację z oszustem.

### Zgłoś adres oszusta {#report-address}

- [Chainabuse](https://www.chainabuse.com/): napędzana przez społeczność baza danych do zgłaszania oszustw i wyłudzeń. Przesyłaj zgłoszenia i wyszukuj znane adresy oszustów
- [Zgłoszenie Etherscan](https://info.etherscan.com/report-address/): oflaguj adres w najczęściej używanym eksploratorze bloków Ethereum
- [CryptoScamDB](https://cryptoscamdb.org/): baza danych open-source śledząca oszustwa związane z kryptowalutami

### Zgłoś fałszywą stronę internetową lub konto w mediach społecznościowych {#report-website}

- [PhishTank](https://phishtank.org/): przesyłaj i weryfikuj adresy URL służące do phishingu
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): zgłaszaj strony phishingowe do Google, aby zostały zablokowane w Chrome i innych przeglądarkach
- [Netcraft](https://report.netcraft.com/report/mistake): zgłaszaj złośliwe i fałszywe strony internetowe
- Zgłoś bezpośrednio na platformie mediów społecznościowych, na której doszło do oszustwa (Twitter/X, Discord, Telegram – wszystkie mają funkcje zgłaszania)

### Zgłoś organom ścigania {#report-law-enforcement}

- **Stany Zjednoczone:** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Wielka Brytania:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Unia Europejska:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Inne kraje:** złóż zawiadomienie na lokalnym posterunku policji. Oszustwa związane z kryptowalutami są przestępstwem w większości jurysdykcji

## Przeanalizuj, co się stało {#analyze}

Zrozumienie, gdzie trafiły Twoje środki, może pomóc w zgłoszeniach i wesprzeć próby ich odzyskania, jeśli trafią one na scentralizowaną giełdę.

- [Blockscout](https://eth.blockscout.com/): eksplorator bloków open-source do wyszukiwania dowolnego hasha transakcji lub adresu portfela, aby zobaczyć, gdzie zostały wysłane środki
- [Etherscan](https://etherscan.io/): wyszukaj dowolny hash transakcji lub adres portfela, aby zobaczyć, gdzie zostały wysłane środki
- [Wyszukiwarka Chainabuse](https://www.chainabuse.com/): sprawdź, czy adres został już zgłoszony przez inne ofiary
- [MetaSleuth](https://metasleuth.io/) od BlockSec: wizualne narzędzie do śledzenia transakcji, które mapuje przepływy środków

**Jeśli środki zostały wysłane na scentralizowaną giełdę** (taką jak Coinbase, Binance, Kraken), natychmiast skontaktuj się z ich zespołem wsparcia, podając szczegóły transakcji. Giełdy mogą czasami zamrozić konta oflagowane z powodu oszustwa.

## Bolesna prawda {#hard-truth}

Ponieważ Ethereum jest zdecentralizowane, żaden centralny organ nie może cofnąć transakcji ani odzyskać skradzionych środków. Gdy transakcja zostanie potwierdzona na blockchainie, jest ostateczna.

Zgłaszanie jest nadal cenne. Zgłoszenia pomagają organom ścigania śledzić zorganizowane grupy przestępcze, a flagowanie adresów w Chainabuse i Etherscan ostrzega przyszłe potencjalne ofiary.

## Rodzaje oszustw, na które należy uważać {#scam-types}

<ExpandableCard
title="Giveaway and airdrop scams"
contentPreview="No one is giving away free ETH. These offers are always scams."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Oszuści tworzą fałszywe rozdawnictwa (giveaways), obiecując pomnożenie Twojego ETH lub darmowe tokeny. Często podszywają się pod znane postacie, takie jak Vitalik Buterin. Jeśli wyślesz ETH na adres „rozdawnictwa”, nie otrzymasz nic w zamian.

**Pamiętaj:** Vitalik i inne wybitne postacie nigdy nie poproszą Cię o wysłanie im ETH.

[Więcej o powszechnych oszustwach](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Impersonation and fake support"
contentPreview="No one from Ethereum or ethereum.org will ever contact you first."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Oszuści podszywają się pod członków zespołu Ethereum, moderatorów lub agentów wsparcia na Discordzie, Telegramie i w mediach społecznościowych. Mogą wysyłać Ci bezpośrednie wiadomości, oferując pomoc lub twierdząc, że wystąpił problem z Twoim kontem.

**Pamiętaj:**

- Nie ma czegoś takiego jak „zespół wsparcia Ethereum”
- Prawdziwi moderatorzy nigdy nie wyślą Ci wiadomości prywatnej jako pierwsi
- Nigdy, pod żadnym pozorem, nie udostępniaj nikomu swojej frazy odzyskiwania ani kluczy prywatnych
- Nigdy nie klikaj linków wysyłanych w niechcianych wiadomościach

</ExpandableCard>

<ExpandableCard
title="Recovery scams"
contentPreview="After being scammed, watch out for fake 'crypto recovery experts.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Oszustwa na odzyskiwanie środków są wymierzone w osoby, które już straciły swoje fundusze. Oszuści monitorują media społecznościowe w poszukiwaniu osób mówiących o tym, że zostały oszukane, a następnie kontaktują się z nimi, podając się za „śledczych blockchain” lub „ekspertów od odzyskiwania krypto”.

Obiecują wyśledzić i odzyskać Twoje skradzione krypto za opłatą z góry. Po zapłaceniu znikają.

**Żadna legalna usługa nie może cofnąć transakcji na blockchainie.** Każdy, kto to obiecuje, kłamie. Jest to jedno z najczęstszych oszustw wtórnych.

</ExpandableCard>

<ExpandableCard
title="Phishing websites and fake apps"
contentPreview="Scam sites mimic real wallets and exchanges to steal your credentials."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Strony phishingowe wyglądają identycznie jak prawdziwe aplikacje portfeli, giełdy lub platformy zdecentralizowanych finansów (DeFi). Podstępem nakłaniają Cię do wprowadzenia frazy odzyskiwania lub podłączenia portfela, a następnie opróżniają Twoje środki.

**Chroń siebie:**

- Zawsze weryfikuj adres URL przed podłączeniem portfela
- Dodaj do zakładek oficjalne strony, z których regularnie korzystasz
- Nigdy nie wprowadzaj swojej frazy odzyskiwania na żadnej stronie internetowej. Legalne aplikacje nigdy o to nie proszą
- Użyj [PhishTank](https://phishtank.org/), aby sprawdzić podejrzane adresy URL

<DocLink href="/guides/how-to-id-scam-tokens/">
  Jak rozpoznać fałszywe tokeny
</DocLink>

</DocLink>

<DocLink href="/security/">
  Pełny przewodnik po bezpieczeństwie Ethereum i zapobieganiu oszustwom
</DocLink>