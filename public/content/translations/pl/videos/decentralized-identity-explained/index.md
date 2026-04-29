---
title: "Zdecentralizowana tożsamość – wyjaśnienie"
description: "Wyjaśnienie, w jaki sposób zdecentralizowana tożsamość daje użytkownikom większą kontrolę nad ich cyfrową tożsamością i zapewnia większe bezpieczeństwo danych osobowych w internecie dzięki poświadczeniom opartym na blockchainie."
lang: pl
youtubeId: "Ew-_F-OtDFI"
uploadDate: 2022-04-12
duration: "0:05:22"
educationLevel: beginner
topic:
  - "identity"
format: explainer
author: Microsoft Security
breadcrumb: "Zdecentralizowana tożsamość"
---

Wyjaśnienie przygotowane przez **Microsoft Security** na temat tego, jak zdecentralizowana tożsamość daje użytkownikom większą kontrolę nad ich cyfrowymi poświadczeniami, omawiające problemy z obecnymi identyfikatorami cyfrowymi, sposób działania weryfikowalnych poświadczeń (Verifiable Credentials) i zdecentralizowanych identyfikatorów (Decentralized Identifiers) oraz to, co oznacza to dla prywatności w internecie.

*Ten transkrypt jest dostępną kopią [oryginalnego transkryptu wideo](https://www.youtube.com/watch?v=Ew-_F-OtDFI) opublikowanego przez Microsoft Security. Został on lekko zredagowany w celu poprawy czytelności.*

#### Problem z cyfrowymi poświadczeniami (0:02) {#the-problem-with-digital-credentials-002}

Każdego dnia nosimy portfele pełne kart. Jednak tylko nieliczne z nich — takie jak dowody tożsamości wydawane przez rząd i karty kredytowe — są powszechnie akceptowane. Nasze społeczeństwo ustanowiło globalne normy dotyczące sposobu prezentowania i weryfikowania poświadczeń, które reprezentują te fizyczne karty. Nie ma jednak prawdziwego odpowiednika dla poświadczeń cyfrowych.

Dlaczego nie? Po pierwsze, nie ma standardowego mechanizmu wydawania kart cyfrowych. Aby wydawać powszechnie akceptowane karty cyfrowe lub poświadczenia, potrzebujemy cyfrowych identyfikatorów, które mogą być własnością osób fizycznych niezależnie od jakiegokolwiek podmiotu, organizacji czy instytucji. Obecnie używamy adresów e-mail i numerów telefonów jako identyfikatorów umożliwiających dostęp do stron internetowych i aplikacji. Jednak nasz dostęp do tych identyfikatorów, a także do naszych danych osobowych, jest zdany na łaskę dostawców usług, którzy mogą je w każdej chwili unieważnić.

Po drugie, nie ma powszechnie akceptowanych standardów wyrażania, wymiany i weryfikacji cyfrowych poświadczeń ponad granicami organizacyjnymi.

#### Jak działa zdecentralizowana tożsamość (1:03) {#how-decentralized-identity-works-103}

Wszystko to wkrótce ulegnie zmianie. Nowa forma cyfrowej tożsamości, oparta na powstających standardach, takich jak weryfikowalne poświadczenia (Verifiable Credentials) i zdecentralizowane identyfikatory (Decentralized Identifiers), może sprawić, że cyfrowe poświadczenia będą działać wszędzie, będą bardziej godne zaufania i będą szanować prywatność.

Oto jak to działa. Poznajcie Alice. Jej nowy portfel cyfrowy daje jej możliwość posiadania i kontrolowania poświadczeń. Ponieważ nie jest on powiązany z żadną konkretną organizacją, autorytatywne źródła mogą z pełnym przekonaniem wydawać Alice poświadczenia oparte na standardach. Kiedy Alice przedstawia te poświadczenia, strony internetowe i aplikacje mogą sprawdzić ich ważność — na przykład potwierdzając na uniwersytecie, że jest tam studentką — a następnie odpowiednio przyznać jej dostęp.

#### Zaufanie kryptograficzne (1:51) {#cryptographic-trust-151}

Choć proces ten może być łatwiejszy, skąd wiemy, że jest godny zaufania? Zdecentralizowane identyfikatory wykorzystują sprawdzone systemy kryptograficzne. Kiedy Alice przedstawia swoje poświadczenia, jej portfel cyfrowy generuje unikalny identyfikator i podpisuje go za pomocą klucza prywatnego zabezpieczonego dowodem biometrycznym lub kodem PIN, który zna tylko ona. Unikalnie sparowany klucz publiczny jest publikowany w rozproszonym rejestrze.

Alice może przedstawić swoją cyfrową legitymację studencką w księgarni, a księgarnia przed przyznaniem zniżki może potwierdzić, że uniwersytet wydał tę kartę Alice.

#### Prywatność i kontrola (2:27) {#privacy-and-control-227}

To doświadczenie naśladuje to, co Alice robi dzisiaj. Może ona cyfrowo zaprezentować i uwierzytelnić zestaw weryfikowalnych poświadczeń, tak samo jak przedstawiłaby fizyczną kartę. Może je również unieważnić jednym kliknięciem, tak samo jak schowałaby kartę z powrotem do portfela.

Co najlepsze, te cyfrowe karty są prywatne. Daje to Alice wyłączną kontrolę nad jej cyfrową tożsamością — to ona podejmuje dotyczące jej decyzje. Weryfikowalne poświadczenia ułatwią zachowanie kontroli i pomogą odblokować bardziej godny zaufania internet, który szanuje prywatność nas wszystkich.