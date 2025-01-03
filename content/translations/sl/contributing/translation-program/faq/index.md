---
title: Vodnik za prevajanje ethereum.org
lang: sl
description: Kako pomagati pri prevajanju ethereum.org
---

# Vodnik za prevajanje ethereum.org {#translating-ethereum-guide}

Če ste novi v prevajalskem programu in se še obotavljate, so tukaj FAQ - pogosto zastavljena vprašanja, ki vam lahko pomagajo pri začetku. Uporabite ta vodnik, da najdete odgovore do najpogostejših poizvedb.

## Kako prevedem te nize z `<HTML tags>`? {#tags}

Ni vsak niz napisan v čisti besedni obliki. Obstajajo nekateri nizi, ki so sestavljeni iz mešanih skript, kot so HTML tagi (`<0>`, `</0>`). Te se po navadi uporabljajo za hiperpovezave ali alternativno oblikovanje v sredini stavka.

- Prevedite besedilo znotraj tagov, ampak ne samih tagov. Karkoli v `<` in `>` ne sme biti prevedeno ali odstranjeno.
- Da ohranite niz varen, priporočamo, da kliknete "Copy Source" gumb spodaj levo. To bo kopiralo izvorni niz in ga prilepilo v besedilno polje. To vam omogoči razjasniti, kje so tagi in vam pomaga pri izogibanju napakam.

![Crowdin vmesnik z izpostavljenim gumbom kopiraj vir](./html-tag-strings.png)

Lahko premaknete položaj tagov znotraj niza, da bo bolje zvenel v vašem jeziku – le prepričajte se, da ste premaknili celoten tag.

## Kje živijo nizi? {#strings}

Pogosto le izvorni niz morda ne bo dovolj, da bi lahko zagotovili natančen prevod.

- Oglejte si posnetke zaslona in kontekst za več informacij. V sekciji izvornega niza boste našli pripet posnetek zaslona, ki vam bo pokazal kako niz uporabljamo v kontekstu.
- Če še vedno niste prepričani postavite vprašanje v sekciji za komentarje. [Niste prepričani kako podati komentar?](#comment)

![Prikaz načina zagotovitve konteksta za niz s posnetkom zaslona](./source-string.png)

![Primer posnetka zaslona za kontekst](./source-string-2.png)

## Kako lahko podam komentar ali postavim vprašanje? Rad bi označil težavo ali napako... {#comment}

Če želite označiti določen niz, ki potrebuje pregled, lahko oddate komentar.

- Kliknite drugi gumb v vrstici desno zgoraj. Skrit zavihek se bo pojavil na vaši desni. Podajte nov komentar in kliknite okence "težava" na dnu. Vrsto težave lahko opredelite z izbiro ene od možnosti iz spustnega menija.
- Ko je komentar podan, bo sporočen naši ekipi. Odpravili bomo težavo in vas obvestili z odgovorom na vaš komentar in zaprtjem težave.

![Prikaz, kako ustvariti komentarje in označiti težave](./comment-issue.png)

## Kaj je pomnilnik prevodov (TM)? {#translation-memory}

Pomnilnik prevodov (TM) je funkcija orodja Crowdin, ki shrani vse predhodne prevedene nize na strani [ethereum.org](http://ethereum.org/). Ko je niz preveden, se samodejno shrani v TM našega projekta. To je lahko uporabno orodje, ki vam pomaga prihraniti vaš čas!

- Oglejte si sekcijo "TM in MT predlogi" in lahko boste videli, kako so drugi prevajalci prevedli enak ali podoben niz. Če najdete predlog z visokim razmerjem ujemanja, ga s klikom brez težav uporabite za prevod.
- Če na seznamu ni ničesar, lahko iščete po TM za predhodne prevode in jih ponovno uporabite za ohranjanje konsistentnosti.

![Posnetek zaslona pomnilnika prevodov](./translation-memory.png)

## Kako uporabljam Crowdin slovar? {#glossary}

Ethereum terminologija je naslednji ključni del našega prevajalskega dela, saj novi tehnološki izrazi pogosto še ne bodo lokalizirani v veliko jezikov. Prav tako obstajajo izrazi, ki imajo različne pomene v različnih kontekstih. [Več o prevajanju Ethereum terminologije](#terminology)

Crowdin slovar je najboljše mesto za razjasnitev izrazov in definicij. Obstajata dva načina napotitve na slovar.

- Prvič, ko najdete podčrtan izraz v izvornem nizu, se lahko z miško postavite nanj in tako razkrijete njegovo definicijo.

![Primer definicije iz slovarja](./glossary-definition.png)

- Drugič, če najdete pojem, ki ga ne poznate, vendar ni podčrtan, lahko iščete po zavihku slovarja (tretji gumb desnega stolpca). Našli boste razlage specifičnih izrazov in tistih pogosto uporabljenih v projektu.

![Posnetek zaslona, ki prikazuje, kje najti zavihek slovarja v Crowdinu](./glossary-tab.png)

- Če ga še vedno ne najdete, je to vaša priložnost, da dodate nov izraz! Spodbujamo vas, da ga poiščete v iskalniku in v slovar dodate opis. Bilo bo v veliko pomoč drugim prevajalcem, da bodo izraz lažje razumeli.

![Posnetek zaslona, ki prikazuje kako dodati izraz v slovar v Crowdinu](./add-glossary-term.png)

### Politika prevajanja terminologije {#terminology}

_Za imena (znamk, podjetij, ljudi) in nove tehnološke izraze (Eth2, oddajniška veriga, itd.)_

Ethereum predstavlja veliko novih izrazov, ki so bili skovani pred kratkim. Nekateri izrazi se od prevajalca do prevajalca razlikujejo, saj uraden prevod v njihovem jeziku ne obstaja. Takšne neskladnosti lahko povzročijo nesporazume in poslabšajo berljivost.

Zaradi jezikovne raznolikosti in različnih standardizacij v vsakem jeziku je bilo praktično nemogoče vzpostaviti poenoteno politiko prevajanja terminologije, ki se lahko prilagodi v vseh podprtih jezikih.

Po tehtnem premisleku smo dosegli odločitev, da najpogosteje uporabljano terminologijo prepustimo vam prevajalcem.

Tukaj so naši predlogi za primere, ko najdete izraz, ki vam ni poznan:

- Glejte [Slovar izrazov](#glossary), tam boste morda našli predhodne prevode drugih prevajalcev. Če se vam zdi, da predhodno preveden izraz ni primeren, lahko vaš prevod obnovite, tako da v Crowdin slovar dodate nov izraz.
- Če takšen predhoden prevod v slovarju ne obstaja, vas spodbujamo, da ga poiščete prek iskalnika ali članka, ki prikazuje, kako se izraz dejansko uporablja v vaši skupnosti.
- Če ne najdete prav nobene reference, zaupajte svoji intuiciji in predlagajte nov prevod v vaš jezik!
- Če se ne čutite dovolj samozavestne, pustite izraz nepreveden. Včasih so angleški izrazi več kot ustrezni za podajo natančne definicije.

Priporočamo, da pustite imena znamk, podjetij in osebja neprevedene, saj bi prevod lahko povzročil nepotrebno zmedo in SEO težave.

## Kontaktirajte nas {#contact}

Hvala, da ste vse to prebrali. Upamo, da vam je v pomoč pri uvajanju v naš program. Pridružite se našemu [Discord prevajalskemu kanalu](https://discord.gg/TkJFaewsaM) za kakršnakoli vprašanja in sodelovanje z ostalimi prevajalci!
