---
title: Securitatea și prevenirea fraudelor pe Ethereum
description: Cum să vă păstrați securitatea pe Ethereum
lang: ro
---

# Securitatea și prevenirea fraudelor pe Ethereum {#introduction}

Având în vedere interesul crescând pentru criptomonede, aflarea celor mai bune practici de utilizare a criptomonedelor este esențială. Cripto poate fi distractiv și entuziasmant, dar prezintă și riscuri serioase. Dacă depuneți puțin efort la început, puteți reduce aceste riscuri.

<Divider />

## Securitatea pe Web 101 {#web-security}

### Folosiți parole puternice {#use-strong-passwords}

[Peste 80% din piratările de conturi se datorează unor parole slabe sau furate](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). O combinație lungă de caractere, numere și simboluri, este metoda optimă pentru a vă păstra conturile în siguranță.

O greșeală frecventă pe care o face lumea este folosirea unei combinații de două până la trei cuvinte din dicționar, des întâlnite și corelate. Astfel de parole sunt nesigure, deoarece sunt predispuse la o tehnică simplă de piratare, cunoscută sub numele de [atac prin dicționar](https://wikipedia.org/wiki/Dictionary_attack).

```md
Exemplu de parolă slabă: CuteFluffyKittens!

Exemplu de parolă puternică: ymv\*azu.EAC8eyp8umf
```

O altă greșeală frecventă este folosirea unor parole care pot fi ușor de ghicit sau de aflat prin [inginerie socială](<https://wikipedia.org/wiki/Social_engineering_(security)>). Dacă includeți numele de fată al mamei dvs., numele copiilor sau al animalelor de companie sau datele de naștere în parolele dvs., nu sunteți în siguranță și aceasta crește riscul ca parolele să fie piratate.

#### Bune practici de folosire a parolelor: {#good-password-practices}

- Creați-vă parole atât de lungi cât vă permite fie generatorul de parole, fie formularul pe care îl completați
- Folosiți o combinație de majuscule și minuscule, numere și simboluri
- Nu folosiți în parola dvs. detalii personale, cum ar fi numele de familie
- Evitați cuvintele frecvente din dicționar

[Mai multe despre crearea unor parole puternice](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Folosiți parole unice peste tot {#use-unique-passwords}

O parolă puternică nu oferă la fel de multă protecție dacă parola este dezvăluită într-o breșă de securitate a datelor. Site-ul [Have I Been Pwned](https://haveibeenpwned.com) vă permite să verificați dacă nu cumva conturile dvs. au fost implicate în vreo breșă de securitate a datelor stocate în baza lor de date. Dacă au fost, **ar trebui să schimbați imediat parolele compromise**. Folosirea unor parole unice pentru fiecare cont reduce riscul ca hackerii să aibă acces la toate conturile dvs. atunci când una dintre parolele dvs. este compromisă.

### Folosiți un gestionar de parole {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Folosirea unui gestionar de parole vă asigură că acesta se va ocupa de crearea de parole puternice, unice și de memorarea acestora! Vă recomandăm <strong>insistent</strong> să folosiți unul, iar majoritatea acestora sunt gratuite!
  </div>
</InfoBanner>

Memorarea parolelor puternice și unice pentru fiecare cont nu este o situație ideală. Un gestionar de parole, oferă o stocare sigură și criptată pentru toate parolele dvs., pe care le puteți accesa printr-o singură parolă principală unică. De asemenea, acestea sugerează parole puternice atunci când vă înscrieți la un nou serviciu, deci nu trebuie să vă creați propriile parole. Mulți gestionari de parole vă vor spune și dacă ați fost implicat într-o breșă de securitate a datelor, permițându-vă să vă schimbați parolele înainte de orice atac rău intenționat.

![Exemplu de utilizare a unui gestionar de parole](./passwordManager.png)

#### Testați un gestionar de parole: {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [LastPass](https://www.lastpass.com/)
- [1Password](https://1password.com/)

### Folosiți autentificarea cu doi factori {#two-factor-authentication}

Pentru a dovedi că sunteți cu adevărat dvs., există diferite dovezi unice care pot fi utilizate pentru autentificare. Acestea sunt cunoscute sub numele de **factori**, iar cei trei factori principali sunt:

- Ceva ce știți (cum ar fi o parolă sau o întrebare de securitate)
- Ceva ce sunteți (cum ar fi o amprentă digitală sau un scaner de iris/facial)
- Ceva ce dețineți (cum ar fi o cheie de securitate sau o aplicație de autentificare pe telefon)

Utilizarea **Autentificării cu doi factori (2FA)**  oferă un *factor de securitate* suplimentar pentru conturile dvs. online, în așa fel încât numai cunoașterea parolei (ceva ce știți) nu este suficientă pentru a accesa un cont. Cel mai frecvent, al doilea factor este un cod de cifre aleatoriu, cunoscut sub numele de **parolă unică temporară (TOTP)**, care poate fi accesat cu ajutorul unei aplicații de autentificare cum ar fi Google Authenticator sau Authy. Acesta funcționează ca un factor de tipul „ceva ce dețineți”, deoarece fraza de securitate („seed”) care generează codul temporar este stocată pe dispozitivul dvs.

<InfoBanner emoji=":lock:">
  <div>
    Observaţie: Utilizarea 2FA bazată pe SMS este vulnerabilă la 
    <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">
     piratarea SIM (SIM jacking)
    </a>
     și nu este securizată. Pentru cea mai bună securitate, utilizați un serviciu precum{" "}
    <a href="https://mashable.com/article/how-to-set-up-google-authenticator">
      Google Authenticator
    </a>
     sau <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Cheile de securitate {#security-keys}

Cei care doresc să facă următorul pas în 2FA ar trebui să se gândească să folosească o cheie de securitate. Cheile de securitate sunt dispozitive hardware fizice de autentificare ce funcționează ca și aplicațiile de autentificare. Folosirea unei chei de securitate este cea mai securizată cale pentru 2FA. Multe astfel de chei se bazează pe standardul FIDO Universal al 2-lea Factor (U2F). [Aflați mai multe despre FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

Aflați mai multe despre 2FA:

<YouTube id="m8jlnZuV1i4" start="3479" />

### Dezinstalați extensiile de browser {#uninstall-browser-extensions}

Extensiile de browser, cum ar fi extensiile Chrome sau programele de completare Firefox, pot crește funcționalitatea utilă a browser-ului și pot îmbunătăți experiența utilizatorului, dar implică riscuri. În mod implicit, marea majoritate a extensiilor de browser solicită acces pentru „citirea și modificarea datelor site-ului”, permițându-le să facă aproape orice cu datele dvs. Extensiile Chrome sunt întotdeauna actualizate automat, deci o extensie care anterior era securizată se poate actualiza ulterior incluzând un cod rău intenționat. În majoritatea cazurilor, extensiile de browser nu încearcă să vă fure datele, dar trebuie să fiți conștienți că pot face acest lucru.

#### Menţineţi-vă securitatea prin: {#browser-extension-safety}

- instalarea unor extensii de browser numai din surse de încredere
- eliminarea extensiilor de browser nefolosite
- instalarea locală a extensiilor Chrome pentru a opri actualizarea automată (Avansat)

[Mai multe despre riscurile extensiilor de browser](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Securitatea cripto 101 {#crypto-security}

### Ridicați-vă nivelul de cunoștințe {#level-up-your-knowledge}

Unul dintre motivele principale pentru care oamenii sunt înșelați cu cripto este în general lipsa de înțelegere. De exemplu, dacă nu înțelegeți că rețeaua Ethereum este descentralizată și că nu este deținută de nimeni, atunci este ușor să cădeți pradă cuiva care pretinde a fi un agent de servicii pentru clienți care promite să vă returneze ETH-ul pierdut în schimbul cheilor dvs. private. Informați-vă espre modul cum funcționează Ethereum, merită să vă investiţi.

<DocLink href="/what-is-ethereum/">
  Ce este Ethereum?
</DocLink>

<DocLink href="/eth/">
  Ce este ether-ul?
</DocLink>
<Divider />

## Securitatea portofelului {#wallet-security}

### Nu vă dezvăluiți niciodată cheile private {#protect-private-keys}

**Niciodată, indiferent de motiv, nu vă partajați cheile private!**

Cheia privată a portofelului dvs. acționează ca parolă pentru portofelul Ethereum. Acesta este singurul lucru care oprește pe cineva care știe adresa portofelului dvs. să vă golească toate activele din cont!

<DocLink href="/wallets/">
  Ce este un portofel Ethereum?
</DocLink>

#### Nu faceți capturi de ecran cu frazele seed/cheile private {#screenshot-private-keys}

Dacă faceți capturi de ecran ale frazelor seed sau ale cheilor private, riscați să le sincronizați în cloud și să le faceți accesibile hackerilor. Obținerea de chei private din cloud este un vector de atac comun pentru hackeri.

### Utilizați un portofel hardware {#use-hardware-wallet}

Un portofel hardware oferă stocarea off-line a cheilor private. Sunt considerate a fi cea mai sigură opțiune de portofel pentru stocarea cheilor private.

Păstrarea cheilor private off-line permite reducerea riscurilor de piratare, chiar dacă un hacker preia controlul computerului dumneavoastră.

#### Testați un portofel hardware: {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Verificați tranzacțiile de două ori înainte de a le trimite {#double-check-transactions}

Trimiterea accidentală de cripto la o adresă greșită este o greșeală comună. **O tranzacție trimisă pe Ethereum este ireversibilă.** Cu excepția cazului în care cunoașteți proprietarul adresei și îl puteți convinge să vă returneze fondurile, nu veți avea nicio modalitate de a vă recupera fondurile.

Înainte de a trimite o tranzacție, asigurați-vă întotdeauna că adresa la care trimiteți corespunde exact cu cea a destinatarului dorit. De asemenea, atunci când interacționați cu un contract inteligent, se recomandă să citiți mesajul tranzacției înainte de a semna.

### Setați limite de cheltuieli pentru contractele inteligente {#spend-limits}

Atunci când interacționați cu contractele inteligente, nu permiteți limite de cheltuieli nelimitate. Lipsa limitelor de cheltuieli ar putea permite contractului inteligent să vă golească portofelul. În schimb, stabiliți limite de cheltuieli doar la suma necesară pentru tranzacție.

Multe portofele Ethereum oferă „protecție a limitelor” pentru a vă apăra împotriva golirii conturilor.

<Divider />

## Escrocherii comune {#common-scams}

Escrocii caută întotdeauna metode de a vă sustrage fondurile. Este imposibil să-i oprim complet, dar le putem scădea eficiența dacă suntem la curent cu metodele pe care le utilizează. Există multe variante ale acestor escrocherii, dar ele urmează în general aceleași tipare în ansamblu. Înainte de toate, nu uitați:

- fiți întotdeauna sceptici
- nimeni nu vă va oferi ETH gratuit sau la preț redus!
- nimeni nu are nevoie de acces la cheile dvs. private sau la informațiile dvs. private

### Escrocheria Giveaway {#giveaway}

Una din cele mai comune escrocherii cu criptomonedele este „escrocheria giveaway”. „Escrocheria giveaway” poate lua mai multe forme, dar premisa generală este că, dacă trimiteți ETH la adresa de portofel furnizată, veți primi ETH-ul înapoi dublat. *Din acest motiv, este cunoscută și sub numele de „escrocheria 2-pentru-1”.*

Aceste escrocherii stipulează de obicei o perioadă limitată de timp a oportunității de a revendica premiul, pentru a încuraja luarea unor decizii nefondate și pentru a crea o senzație de falsă urgență.

#### Piratări pe rețelele sociale {#social-media-hacks}

O manifestare de profil înalt a acestui fenomen a avut loc în iulie 2020, când au fost piratate conturile Twitter ale unor celebrități și organizații de seamă. Hackerul a postat simultan un giveaway Bitcoin pe conturile piratate. Deși tweet-urile înșelătoare au fost rapid detectate și șterse, hackerii au reușit să scape cu 11 bitcoin-uri (sau 500.000 de dolari în septembrie 2021)

![O escrocherie pe Twitter](./appleTwitterScam.png)

#### Giveaway de la celebrități {#celebrity-giveaway}

Cadoul de la celebrități este o altă formă comună de „escrocherie giveaway”. Escrocii vor lua un interviu video înregistrat sau o conferință susținută de o celebritate și îl vor transmite în direct pe YouTube - făcându-l să pară că celebritatea dădea un interviu video în direct în sprijinul unui giveaway de criptomonede.

Vitalik Buterin este folosit cel mai des în această escrocherie, dar sunt folosite și multe alte personalități implicate în criptomonede (de exemplu, Elon Musk sau Charles Hoskinson). Includerea unei personalități conferă un sens de legitimitate a transmisiunilor în direct ale escrocilor (acest lucru pare dubios, dar dacă este implicat Vitalik, trebuie să fie în regulă!).

**Giveaway-urile sunt întotdeauna escrocherii. Dacă trimiteți fonduri în aceste conturi, le veți pierde pentru totdeauna.**

![O înșelătorie pe YouTube](./youtubeScam.png)

### Înșelătorii prin pretinsă asistență {#support-scams}

Criptomoneda este o tehnologie relativ tânără și greșit înțeleasă. O înșelătorie obișnuită care profită de acest lucru este înșelătoria prin pretinsă asistență, în care escrocii se dau drept personal de asistență pentru portofele populare, schimburi sau blockchain-uri.

O mare parte din discuțiile despre Ethereum se desfășoară pe Discord. Escrocii prin pretinsă asistență își găsesc de obicei victima căutând întrebări de asistență în canalele publice Discord, iar apoi trimiţând solicitantului un mesaj privat ca să îi ofere asistenţă. Stimulându-vă încrederea, escrocii prin pretinsă asistență încearcă să vă păcălească să vă dezvăluiți cheile private sau să vă trimiteți fondurile în portofelele lor.

![O înșelătorie prin pretinsă asistență pe Discord](./discordScam.png)

Ca regulă generală, personalul nu va comunica niciodată cu dvs. prin canale private sau neoficiale. Iată câteva lucruri simple de care trebuie să țineți cont atunci când aveți de-a face cu acordarea de asistenţă:

- nu vă partajați niciodată cheile private, frazele „seed” sau parolele
- nu permiteți niciodată nimănui accesul de la distanță la computerul dvs.
- nu comunicați niciodată cu nimeni din afara canalelor oficiale autorizate de organizație

<InfoBanner emoji=":lock:">
  <div>
    Atenție: deși escrocheriile prin pretinsă asistență au loc pe Discord, acestea pot predomina şi pe orice aplicație de chat pe care au loc discuții despre cripto, inclusiv pe e-mail.
  </div>
</InfoBanner>

### Înșelătorii prin phishing {#phishing-scams}

Înşelătoriile prin phishing reprezintă un alt mod de abordare din ce în ce mai des întâlnită pe care o folosesc escrocii pentru a încerca să vă fure fondurile din portofel.

Unele e-mailuri de phishing le cer utilizatorilor să dea clic pe linkuri care îi vor direcționa către imitaţii de site-uri web, care le cer să introducă fraza lor „seed”, să își reseteze parola sau să trimită ETH. Alții vă pot cere să instalați programe malware fără să știți, pentru a vă infecta computerul și a le oferi escrocilor acces la computerul dumneavoastră.

Dacă primiți un e-mail de la un expeditor necunoscut, nu uitați:

- nu deschideți niciodată un link sau un fişier ataşat de la adrese de e-mail pe care nu le recunoașteți
- nu dezvăluiți niciodată nimănui informațiile personale sau parolele dvs.
- ştergeți e-mailurile de la expeditorii necunoscuți

[Mai multe despre evitarea înșelăciunilor prin phishing](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Înșelătorii de broker comecial cripto {#broker-scams}

Escrocii de tip broker comercial cripto pretind că sunt brokeri specializați în criptomonede care se oferă să vă ia banii și să îi investească în numele dvs. Această ofertă este de obicei însoţită de promisiuni de câştiguri nerealiste. După ce escrocul primește fondurile, vă poate convinge să mai trimiteți și alte fonduri, astfel încât să nu pierdeți alte câștiguri din investiții, sau poate dispărea complet.

Acești brokeri frauduloși își găsesc victimele folosind conturi false pe YouTube pentru a începe conversații aparent firești despre broker. Aceste conversații sunt adesea foarte bine votate pentru a crește legitimitatea, dar voturile pozitive provin toate de la conturi robot.

**Nu vă încredeți în necunoscuții de pe internet pentru a investi în numele dumneavoastră. Vă veți pierde cripto.**

![O escrocherie a unui broker fraudulos pe YouTube](./brokerScam.png)

### Escrocherii de fond miner cripto {#mining-pool-scams}

Escrocheriile cu fonduri de minare implică persoane care vă contactează nesolicitat și pretind că puteți obține profituri foarte mari dacă vă alăturați unui fond miner cripto. Escrocul va face afirmații frauduloase și va rămâne în contact cu dvs. cât timp este nevoie. Practic, escrocul va încerca să vă convingă că, atunci când vă alăturați unui fond miner, criptomoneda dvs. va fi folosită pentru a crea ETH, și că vi se vor plăti dividente sub formă de ETH. Ceea ce se va întâmpla în cele din urmă este că veți observa un randament mic al criptomonedelor dumneavoastră. Aceasta este pur și simplu pentru a vă momi să investiți mai mult. În cele din urmă, toate fondurile dvs. vor fi trimise la o adresă necunoscută, iar escrocul fie va dispărea, fie, în unele cazuri, va continua să păstreze legătura, așa cum s-a întâmplat într-un caz recent.

În concluzie, fiți atent la persoanele care vă contactează pe rețelele sociale și care vă cer să faceți parte dintr-un fond miner. Odată ce vă pierdeți cripto, aceasta dispare.

Câteva lucruri de reținut:

- Feriți-vă de oricine care vă contactează pentru a vă oferi modalități de a face bani din propriul cripto
- Faceți cercetări despre mizare, fonduri de lichidități sau alte modalități de a vă investi propriul cripto
- Rareori sunt legitime astfel de scheme, dacă nu chiar niciodată. Dacă ar fi fost, probabil că ar fi fost dominante și ați fi auzit de ele.

[Un om a pierdut 200.000 USD printr-o escrocherie cu fondul miner](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Escrocheria cu tokenuri „Eth2” {#eth2-token-scam}

Odată cu [fuziunea](/roadmap/merge/) care va avea loc în 2022, escrocii au profitat de confuzia legată de termenul „Eth2”, încercând să convingă utilizatorii să își răscumpere ETH-ul pe un token „ETH2”. Nu se introduce niciun alt „ETH2” sau alt nou token odată cu fuziunea. ETH-ul pe care îl dețineți astăzi va continua să fie același ETH și după fuziune și nu este nevoie de niciun schimb de ETH pentru fuziune.

Escrocii se pot prezenta drept „asistență”, spunându-vă că dacă depuneți ETH veți primi înapoi „ETH2”. Nu există nicio [asistență oficială pentru Ethereum](/community/support/) și nu există niciun nou token. Nu partajați niciodată fraza de securitate („seed”) a portofelului dvs. cu nimeni.

### Escrocheriile Airdrop {#airdrop-scams}

Escrocherile Airdrop implică un proiect de escrocherie care lansează un activ (NFT, token) în portofelul dvs. și vă trimite pe un site web fraudulos pentru a vă revendica activul lansat. Vi se va solicita să vă conectați cu portofelul Ethereum și să „aprobați” o tranzacție atunci când încercați să revendicați. Această tranzacție vă compromite contul prin trimiterea cheilor dvs. publice și private către escroc. O formă alternativă a acestei escrocherii poate să vă facă să confirmați o tranzacție care trimite fonduri în contul escrocului.

[Mai multe despre escrocheriile „airdrop”](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Referințe suplimentare {#further-reading}

### Securitatea pe Web {#reading-web-security}

- [Acesta este motivul pentru care nu ar trebui să folosiți texte pentru autentificarea cu doi factori](https://www.theverge.com/2017/9/18/16328172/sms-two-factor-authentication-hack-password-bitcoin) - _The Verge_
- [Până la 3 milioane de dispozitive infectate de add-on-uri Chrome și Edge pline de malware](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Cum să creați o parolă puternică — pe care nu o veți uita](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Ce este o cheie de securitate?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Securitatea cripto {#reading-crypto-security}

- [Protejarea dvs. și a fondurilor dvs.](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [4 moduri de a rămâne în siguranță în cripto](https://www.coindesk.com/tech/2021/04/20/4-ways-to-stay-safe-in-crypto/) - _CoinDesk_
- [Ghidul de securitate pentru începători și pentru oamenii inteligenți](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Securitate cripto: Parole și autentificare](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Instruire contra escrocheriilor {#reading-scam-education}

- [Păstrați-vă securitatea: escrocherii obișnuite](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Evitarea escrocheriilor](https://bitcoin.org/en/scams) _Bitcoin.org_
