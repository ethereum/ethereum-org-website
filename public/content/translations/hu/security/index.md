---
title: Ethereum-biztonság és átverés elleni védelem
description: Biztonságban az Ethereumon
lang: hu
---

# Ethereum-biztonság és átverés elleni védelem {#introduction}

A kriptopénzek iránti növekvő érdeklődés egyre nagyobb kockázatot jelent a csalók és a hackerek részéről. Ez a cikk néhány bevált gyakorlatot mutat be e kockázatok mérséklésére.

**Ne feledje: Az ethereum.org sosem lép Önnel kapcsolatba. Ne válaszoljon azokra az e-mailekre, amelyek azt állítják, hogy az Ethereum hivatalos támogatói csapatától érkeznek.**

<Divider />

## Kriptobiztonság 101 {#crypto-security}

### Növelje tudását {#level-up-your-knowledge}

A kriptográfia működésével kapcsolatos félreértések költséges hibákhoz vezethetnek. Ha például valaki ügyfélszolgálati ügynöknek adja ki magát, aki a privát kulcsokért cserébe vissza tudja adni az elveszett ETH-t, akkor kihasználja azokat az embereket, akik nem értik, hogy az Ethereum egy decentralizált hálózat, amelyből hiányzik ez a fajta funkció. Az Ethereum működésének megértése megéri a befektetést.

<DocLink href="/what-is-ethereum/">
  Mi az Ethereum?
</DocLink>

<DocLink href="/eth/">
  Mi az ether?
</DocLink>
<Divider />

## Tárcabiztonság {#wallet-security}

### Sose ossza meg privát kulcsait {#protect-private-keys}

**Soha, semmilyen okból se ossza meg a privát kulcsait!**

A tárca privát kulcsa az Ethereum-tárca jelszava. Ez az egyetlen dolog, aminek a hiányában valaki nem viszi el az összes eszközt a tárcájából, ha ismeri annak a címét!

<DocLink href="/wallets/">
  Mi az az Ethereum tárca?
</DocLink>

#### Sose készítsen képernyőképet a kulcsmondatról/privát kulcsokról {#screenshot-private-keys}

A képernyőkép készítésével azt kockáztatja, hogy az szinkronizálódik a felhőbe és így elérhetővé válik a támadók számára. A privát kulcsok megszerzése a felhőből egy tipikus támadási forma.

### Használjon hardveres tárcát {#use-hardware-wallet}

A hardveres tárca offline módon tárolja a privát kulcsokat. Ez a legbiztonságosabb tárca a privát kulcsok tárolására: a kulcs sosem kapcsolódik az internethez és teljesen helyben marad az eszközén.

A privát kulcsok offline tartása komoly szinten csökkenti a támadás kockázatát, még ha egy támadó hozzá is fér a számítógépéhez.

#### Próbálja ki a hardveres tárcát: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Ellenőrizze kétszer a tranzakciókat küldés előtt {#double-check-transactions}

A rossz tárcába küldött kripto egy tipikus hiba. **Az Ethereumon küldött tranzakció visszafordíthatatlan.** Hacsak nem ismeri a cím tulajdonosát és nem tudja meggyőzni arról, hogy visszaküldje, különben nem tudja visszaszerezni azt.

Mindig győződjön meg arról, hogy cím pontosan egyezik a kívánt címmel, mielőtt elküldi a tranzakciót. Az okosszerződésekkel való interakciónál is mindig olvassa el a tranzakcióüzenetet, mielőtt aláírja azt.

### Állítson be költségkeretet az okosszerződéshez {#spend-limits}

Az okosszerződéseknél ne engedjen korlátlan költési keretet. A korlátlan költés megengedi az okosszerződésnek, hogy kiürítse az Ön tárcáját. Ehelyett állítsa be pontosan azt az összeget, ami a tranzakcióhoz szükséges.

Számos Ethereum-tárca kínál védelmet keretek beállításával, hogy ne lehessen kiüríteni a tárcát.

[Hogyan vonható vissza, hogy az okosszerződés hozzáférjen a kriptoeszközeihez](/guides/how-to-revoke-token-access/)

<Divider />

## Gyakori csalások {#common-scams}

Nem lehet őket teljesen megállítani, de elérhetjük, hogy kevésbé hassanak ránk, ha ismerjük a legjellemzőbb fogásaikat. Ezeknek a csalásoknak számos variációja van, de általánosságban egy mintát követnek. Emlékezzen rá:

- mindig legyen szkeptikus
- senki sem ad Önnek ETH-t ingyen vagy olcsón
- senkinek se adja meg a privát kulcsait vagy a személyes információit

### Twitter-hirdetéses adathalászat {#ad-phishing}

![Twitter-hivatkozásos adathalászat](./twitterPhishingScam.png)

Van egy módszer a Twitter (vagyis X) hivatkozás előnézeti funkciójának (kibontása) meghamisítására, amellyel potenciálisan megtéveszthetik a felhasználókat, hogy azt higgyék, egy legitim webhelyet látogatnak meg. Ez a technika a Twitter mechanizmusát használja ki a tweetekben megosztott URL-ek előnézetének létrehozására, és például azt mutathatja, hogy az az _ethereum.org_-tól származik (ahogy a fenti képen), miközben egy rosszindulatú webhelyre irányítja át.

Mindig ellenőrizze, hogy a megfelelő oldalon van-e, különösen egy hivatkozásra kattintás után.

[További információk itt](https://harrydenley.com/faking-twitter-unfurling).

### Ajándékozási csalás {#giveaway}

Az egyik legtipikusabb csalás a kriptovalutákkal az ajándékozás. Számos formában előfordulhat, de a lényege az, hogy ha Ön ETH-t küld a megadott tárcacímre, akkor duplán kapja vissza az ETH-t. *Emiatt 2-t 1-ért csalásnak is nevezik.*

Ez az ajánlat csak limitált időre szól, hogy a sürgetés érzését keltse.

### Közösségimédia-csalások {#social-media-hacks}

Ennek nagy horderejű esete például 2020. júliusában volt, amikor híres emberek és szervezetek Twitterjét támadták meg. A támadó bitcoin-ajándékozást hirdetett ezeken a számlákon. Habár a megtévesztő üzeneteket gyorsan észrevették és törölték, a támadók még így is szereztek 11 bitcoint (ami 500 000 USD-nek felel meg a 2021. szeptemberi árfolyamon).

![Csalás a Twitteren](./appleTwitterScam.png)

### Hírességek ajándékoznak {#celebrity-giveaway}

A hírességek által kommunikált ajándékozás is tipikus. A csalók egy videóinterjút vagy konferenciabeszélgetést úgy tesznek fel a YouTube-ra, mintha élőben menne, és ennek részeként a híresség egy kriptovaluta-ajándékozást hirdet meg.

Vitalik Buterint és a kriptóban érintett más személyeket (pl. Elon Musk vagy Charles Hoskinson) gyakran használnak így. Ez adja a csalás valódiságának látszatát (furcsa, de ha Vitalik mondja, akkor biztos úgy van!).

**Az ajándékozások mindig csalások. Ha bármilyen pénzt küld ezekre a felhívásokra, azt elveszíti.**

![Csalás a YouTube-on](./youtubeScam.png)

### Támogatási csalások {#support-scams}

A kriptovaluta egy viszonylag fiatal és félreértett technológia. Ezt használja ki az a csalás, amikor ügyfélszolgálatosnak adják ki magukat a népszerű tárcák, tőzsdék vagy blokkláncok kapcsán.

Az interakciók többsége Discordon történik. A támogatást színlelő csalók ezeken a csatornákon keresik azokat, akiknek kérdésük van, majd privát üzenetet küldenek nekik, hogy felajánlják segítségüket. Ráveszik a felhasználót, hogy bízzon meg bennük, majd megszerzik a privát kulcsaikat vagy pénzt küldenek a saját tárcájukba.

![Támogatást ajánló csalás a Discordon](./discordScam.png)

Általános szabály, hogy senki sem kommunikál Önnel privát, nem hivatalos csatornákon. Ezeket tartsa észben, ha támogatásról van szó:

- Sose adja meg a privát kulcsait, kulcsmondatát vagy jelszavait
- Sose engedje, hogy bárki távolról hozzáférjen a gépéhez
- Sose kommunikáljon senkivel a szervezet dedikált csatornáin kívül

<InfoBanner emoji=":lock:">
  <div>
    Legyen tudatában: hogy a támogatást ajánló csalók gyakran a Discordon jelennek meg, de bármilyen kommunikációs formában ott lehetnek, legyen az chat vagy email.
  </div>
</InfoBanner>

### „ETH2” hamis token {#eth2-token-scam}

[Az egyesítés (The Merge)](/roadmap/merge/) közeledtével a csalók kihasználták a zavart az „ETH2” kifejezés körül és próbálták rávenni a felhasználókat, hogy váltsák át az ETH-t „ETH2”-re. Nem létezik ETH2, és a Merge sem vezetett be semmilyen tokent. A Merge előtt és után pontosan ugyanaz az ETH létezik. **Az ETH-val kapcsolatban semmit se kellett tenni a felhasználóknak, amikor a rendszer proof-of-work helyett proof-of-stake mechanizmusra állt át**.

A csalók ügyfélszolgálatosként jelennek meg, hogy rávegyék Önt, adja át az ETH-t és „ETH2”-t kap helyette. Nincs [hivatalos Ethereum-ügyfélszolgálat](/community/support/), és nincs új token. Sose ossza meg a tárcához kapcsolódó kulcsmondatot senkivel.

_Megjegyzés: Vannak olyan származékos tokenek, amelyek letétbe helyezett ETH-t képviselnek (pl. rETH a Rocket Pooltól, stETH a Lidotól, ETH2 a Coinbase-től), de ezekre nem kell átállnia._

### Adathalász csalások {#phishing-scams}

Az adathalász csalások is egyre gyakoribbak, hogy a csalók ellopják a tárcák tartalmát.

Néhány ilyen e-mail arra kéri a felhasználót, hogy bizonyos hivatkozásra kattintva lépjen egy weboldalra, adja meg a kulcsmondatát, kérjen új jelszót vagy küldjön ETH-t. Mások olyan rosszindulatú programokat telepítenek a gépére, amivel a csalók hozzáférnek a fájljaihoz.

Ha egy ismeretlen küldőtől kap üzenetet, akkor:

- Sose nyisson meg hivatkozást vagy csatolmányt ismeretlen feladótól
- Sose árulja el személyes adatait vagy jelszavait senkinek
- Törölje az ismeretlen feladóktól érkező e-maileket

[Bővebben az adathalász csalások elkerüléséről](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Kriptobrókeres csalás {#broker-scams}

A kriptobrókeres csalók szakembereknek adják ki magukat, akik elkérik az Ön pénzét, hogy befektessék az Ön nevében. Miután megkapták az összeget, lehetséges, hogy még többet kérnek valamilyen különleges lehetőségre, vagy akár el is tűnnek azonnal.

Ezek a csalók hamis profilokat használnak a YouTube-on, ahol látszólag semleges beszélgetéseket folytatnak. Ezek a beszélgetések nagyon jó értékeléssel rendelkeznek, de ezt mind programok (bot) szavazzák meg nekik, hogy így hitelesebbnek tűnjenek.

**Sose bízzon meg idegeneket az interneten, hogy befektessék a pénzét. El fogja veszíteni a kriptóját.**

![Brókeres csalás a YouTube-on](./brokerScam.png)

### Kriptobányászati csalások {#mining-pool-scams}

2022. szeptembere óta nincs az Ethereumon bányászás. A csalások mégis tovább folytatódnak. A kriptobányászási csalásoknál arra próbálják rávenni az embereket, hogy csatlakozzanak az Ethereum-bányászathoz, ami nagy jövedelmeket hoz. A csaló kapcsolatban marad Önnel egész végig. Valójában meggyőzi Önt arról, hogy ha csatlakozik a bányászáshoz, akkor az ETH egyenlege még több ETH-t hoz létre. Ezután látni fogja, hogy a kriptovalutája kis hozamot termel. De ez csak azért van, hogy még többet fektessen be. Végül az összes pénzeszközét egy ismeretlen címre küldik, és a csaló eltűnik, vagy akár kapcsolatban is maradhat áldozatával.

Tartózkodjon azoktól, akik a közösségi médiában be akarják Önt vonni a bányászatba. Ha elveszíti a kriptóját, az többé nem kerül vissza.

Ne feledje:

- Legyen óvatos, ha bárki még több pénzt akar csinálni a kriptójából
- Nézze meg a lehetőségeket a letétbe helyezés, likviditási alapok és más befektetések kapcsán
- Az ilyen ajánlatok szinte sose valósak. Ha azok lennének, akkor mindenki ezt követné és ezért már hallott volna róla.

[Egy ember 200 000 USD-t vesztett egy kriptobányászási csalásban](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Tokenkiosztási (airdrop) csalások {#airdrop-scams}

A tokenkiosztási (airdrop) csalások során egy hamis projekt eszközt (NFT, token) dob az Ön tárcájába és egy hamis weboldalra küldi, hogy kérvényezze azokat. Így be kell jelentkeznie az Ethereum-tárcájába és jóváhagynia a tranzakciót. Ez a tranzakció veszélybe sodorja a számláját, mivel a nyilvános és privát kulcsait átadja a csalónak. Az is lehet, hogy egy olyan tranzakciót ír alá, ami a csalónak küldi az Ön pénzeszközeit.

[Bővebben a tokenkiosztási (airdrop) csalásokról](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Webbiztonság 101 {#web-security}

### Használjon erős jelszavakat {#use-strong-passwords}

[A számlatámadások 80%-a a gyenge vagy ellopott jelszavakból ered](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Egy hosszú, betűkből, számokból és szimbólumokból álló sorozat segíthet abban, hogy a számlája biztonságban legyen.

Gyakori hiba, hogy néhány gyakori, összefüggő szó kombinációját használjuk. Az ehhez hasonló jelszavak nem biztonságosak, mert hajlamosak egy hackelési technikára, amelyet szótáralapú támadásnak hívnak.

```md
Gyenge jelszó például: AranyosBolyhosCicák!

Erős jelszó például: ymv\*azu.EAC8eyp8umf
```

A másik általános hiba az, amikor a [közösségi média alapján kitalálható](https://wikipedia.org/wiki/Social_engineering_(security)) jelszót találnak ki. Az édesanyja leánykori neve, a gyerekek vagy háziállatok nevei, a születési időpontok használata növeli a támadás kockázatát.

#### A jó jelszóhoz: {#good-password-practices}

- Olyan hosszú jelszót válasszon, amit jelszógenerátor készít vagy megenged az adott rendszer
- Használjon nagybetűt, kisbetűt, számokat és jeleket
- Ne használjon személyes adatokat, mint családi nevek
- Kerülje a gyakori, általános szavakat

[Bővebben az erős jelszó létrehozásáról](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Használjon egyedi jelszót mindenre {#use-unique-passwords}

Egy erős jelszó, amely egy adatvédelmi incidens során nyilvánossá vált, már nem számít erős jelszónak. A [Have I Been Pwned](https://haveibeenpwned.com) weblap megmutatja, hogy a számláját érintette-e bármilyen nyilvános adatvédelmi incidens. Ha igen, akkor **azonnal cserélje le a jelszavait**. Az egyedi jelszavak használata csökkenti annak kockázatát, hogy a támadó mindenhez hozzáfér, ha egy jelszót feltör.

### Használjon jelszókezelőt {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    A jelszókezelő erős, egyedi jelszavakat hoz létre és meg is jegyzi azokat! <strong>Erősen</strong> ajánljuk, hogy használjon ilyet, és a legtöbb ingyen van!
  </div>
</InfoBanner>

Az erős, egyedi jelszavakat nem túl ideális megjegyezni az összes számlához. A jelszókezelő egy biztonságos, titkosított tárhelyet biztosít az összes jelszónak, amit egy erős mesterjelszóval tud elérni. Az új szolgáltatásokra való bejelentkezéseknél is erős jelszavakat ajánl, így Önnek nem kell kitalálnia azt. Számos jelszókezelő azt is megmondja, hogy Ön érintett-e adatszivárgásban, így lecserélheti a jelszavait, mielőtt támadás érné.

![Példa a jelszókezelő használatára](./passwordManager.png)

#### Próbáljon ki egy jelszókezelőt: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Emellett más [javasolt jelszókezelőket](https://www.privacytools.io/secure-password-manager) is megtekinthet

### Használjon kéttényezős azonosítást {#two-factor-authentication}

Előfordulhat, hogy arra kérik Önt, hogy egyedi igazolásokkal hitelesítse személyazonosságát. Ezeket nevezzük **tényezőknek**. A három fő tényező a következő:

- Valami, amit tud (mint egy jelszó vagy biztonsági kérdés)
- Valami, ami Öntől származik (mint egy ujjlenyomat vagy írisz-/arcszkenner)
- Valami, ami az Ön birtokában van (biztonsági kulcs vagy azonosítási alkalmazás a telefonján)

A **kétfaktoros hitelesítés (2FA)** használata további *biztonsági tényezőt* biztosít online számlái számára. A 2FA biztosítja, hogy a számlához való hozzáféréshez nem elegendő pusztán a jelszó megléte. Általában a második tényező egy véletlenszerű hatjegyű kód, ami egy **időzített egyszeri jelszó (TOTP)**, amit egy azonosítási alkalmazással ér el, mint a Google Authenticator vagy Authy. Ez az a tényező, ami az Ön birtokában van, mert a kódot adó mag az Ön eszközén található.

<InfoBanner emoji=":lock:">
  <div>
    Megjegyzés: az SMS-alapú 2FA azonosítás ki van téve a <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> támadásnak, ezért nem biztonságos. A legmagasabb fokú biztonság érdekében használjon olyan szolgáltatást, mint a <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator </a>vagy az <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Biztonsági kulcsok {#security-keys}

A biztonsági kulcs a 2FA egy fejlettebb és biztonságosabb típusa. A biztonsági kulcsok fizikai, hardveralapú hitelesítési eszközök, melyek az azonosítási alkalmazásokként működnek. A biztonsági kulcs használata a legbiztonságosabb mód a 2FA eléréséhez. A kulcsok nagyrésze a FIDO egyetemes második tényező (U2F) szabványt használja. [Ismerje meg a FIDO U2F-t](https://www.yubico.com/authentication-standards/fido-u2f/).

Tudjon meg többet a 2FA-ról:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Böngészőbővítmények eltávolítása {#uninstall-browser-extensions}

A böngészőbővítmények (mint a Chrome-bővítmények vagy Firefox kiegészítő modulok) hasznos funkciókkal egészítik ki a böngészőket, de kockázattal is járnak. A legtöbb ilyen bővítmény kéri, hogy beolvashassa és megváltoztathassa az adatokat, így bármit meg tudnak tenni az eszközön. A Chrome bővítményei automatikusan frissülnek, ezért a korábban ártalmatlan kód később talán rosszindulatú részeket is tartalmazhat. A legtöbb böngészőbővítmény nem próbál meg adatot lopni, de attól még képes rá.

#### Maradjon biztonságban: {#browser-extension-safety}

- Csak megbízható forrásból telepítsen bővítményeket
- Szedje le azokat, amelyeket nem használja
- Telepítse a bővítményt lokálisan, így nem fog magától frissülni

[Bővebben a böngészőbővítmények kockázatáról](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## További olvasnivaló {#further-reading}

### Webbiztonság {#reading-web-security}

- [3 millió eszközt érintenek a rosszindulatú Chrome- és Edge-bővítmények](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) – _Dan Goodin_
- [Hogyan hozzon létre erős jelszót – amit nem felejt el](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) – _AVG_
- [Mi az a biztonsági kulcs?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) – _Coinbase_

### Kriptobiztonság {#reading-crypto-security}

- [Védje magát és a pénzeszközeit](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) – _MyCrypto_
- [Biztonsági problémák az általános kriptokommunikációs szoftverben](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) – _Salus_
- [Biztonsági útmutató kezdőknek és haladóknak](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) – _MyCrypto_
- [Kriptobiztonság: jelszavak és azonosítás](https://www.youtube.com/watch?v=m8jlnZuV1i4) – _Andreas M. Antonopoulos_

### Csalásfelismerés {#reading-scam-education}

- [Útmutató: hogyan azonosítsa be a hamis tokeneket](/guides/how-to-id-scam-tokens/)
- [Maradjon biztonságban: általános csalások](https://support.mycrypto.com/staying-safe/common-scams) – _MyCrypto_
- [A csalások elkerülése](https://bitcoin.org/en/scams) – _Bitcoin.org_
- [Twitter-beszélgetés a tipikus kripto-adathalász e-mailekről és üzenetekről](https://twitter.com/tayvano_/status/1516225457640787969) – _Taylor Monahan_

<QuizWidget quizKey="security" />
