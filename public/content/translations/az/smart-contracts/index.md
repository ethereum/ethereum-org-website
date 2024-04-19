---
title: Ağıllı müqavilələr
description: Ağıllı müqavilələrə texniki olmayan giriş
lang: az
---

# Introduction to smart contracts {#introduction-to-smart-contracts}

Ağıllı müqavilələr Ethereum-un tətbiqat təbəqəsinin əsas qurğularıdır. Bunlar blokçeynində saxlanılan kompüter proqramlarıdır və "əgər bu belədirsə" məntiqinə uyğun olub kod ilə müəyyən edilmiş qaydalara uyğun yerinə yetirilməsinə zəmanət verilir və yaradıldıqdan sonra dəyişdirilə bilmir.

Nick Szabo "ağıllı müqavilə" termininin yaradıcısıdır. 1994-cü ildə o, [konseptin təqdimatını](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) yazıb 1996-cı ildə [ağıllı müqavilələrin nə edə biləcəyini tədqiq etmişdi](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo, güvənilir vasitəçilər olmadan əməliyyatların və biznes funksiyalarının həyata keçirilməsinə imkan verən avtomatik, kriptoqrafik təhlükəsiz proseslərin olduğu bir rəqəmsal bazarına inanırdı. Ethereum-da ağıllı müqavilələr bu vizyonu həyata keçirir.

## Ənənəvi müqavilələrdə etimad {#trust-and-contracts}

Ənənəvi bir müqavilənin ən böyük problemlərindən biri, etibarlı şəxslərin müqavilənin nəticələrini izləməsi ehtiyacıdır.

Buna bir nümunə:

Alice və Bob bir velosiped yarışındadırlar. Deyək ki Alice, yarışda qalib gələcəyinə dair Bob'la 10 dollarlıq mərcə girir. Bob qalib olacağına əmindir və mərcə razılaşır. Sonunda, Alice yarışı Bob-dan öncə bitirir və qalib olur. Lakin Bob, Alice-in hiylə etdiyini iddia edərək mərcdən imtina edir.

Bu nümunə ağıllı olmayan bütün müqavilələrin problemini göstərir. Müqavilənin şərtləri yerinə yetirilsə də (yəni siz yarışın qalibi olsanız da), siz yenə də müqaviləni yerinə yetirmək üçün başqa şəxsə etibar etməlisiniz (yəni mərc ödənişi üçün).

## A digital vending machine {#vending-machine}

Ağıllı müqavilə üçün sadə metafora, ağıllı müqaviləyə bənzəyən avtomatdır - xüsusi girişlər əvvəlcədən müəyyən edilmiş nəticələrə zəmanət verir.

- Siz məhsul seçirsiniz
- Avtomat qiyməti göstərir
- Qiymətini ödəyirsən
- Avtomat düzgün məbləği ödədiyinizi yoxlayır
- Avtomat sizə məhsulu verir

Avtomat yalnız bütün tələblər yerinə yetirildikdən sonra istədiyiniz məhsulu verəcəkdir. Əgər siz məhsul seçməsəniz və ya kifayət qədər pul daxil etməsəniz, satış avtomatı məhsulunuzu verməyəcək.

## Avtomatik icra {#automation}

Ağıllı müqavilənin əsas üstünlüyü ondan ibarətdir ki, o, müəyyən şərtlər yerinə yetirildikdə birmənalı kodu deterministik şəkildə icra edir. Ağıllı müqavilənin əsas üstünlüyü ondan sonra ki, o, əsasında qurulmuş birmənalı kodu deterministik şəkildə icra edir. Bu, etibarlı vasitəçilərə ehtiyacı aradan qaldırır.

Məsələn, bir uşaq üçün əmanətdə vəsait saxlayan, müəyyən bir tarixdən sonra vəsaiti çıxarmağa imkan verən ağıllı müqavilə yaza bilərsiniz. Həmin tarixdən əvvəl geri çəkilməyə cəhd etsələr, ağıllı müqavilə yerinə yetirilməyəcək. Yaxud dilerə ödəniş etdiyiniz zaman avtomatik olaraq avtomobilin adının rəqəmsal versiyasını verən müqavilə yaza bilərsiniz.

## Proqnozlaşdırıla bilən nəticələr {#predictability}

Ənənəvi müqavilələr birmənalı deyil, çünki onları şərh etmək və həyata keçirmək üçün insanlara etibar edirlər. Məsələn, iki hakim müqaviləni fərqli şərh edə bilər ki, bu da uyğun olmayan qərarlara və qeyri-bərabər nəticələrə səbəb ola bilər. Ağıllı müqavilələr bu ehtimalı aradan qaldırır. Bunun əvəzinə ağıllı müqavilələr müqavilənin kodunda yazılmış şərtlər əsasında dəqiq şəkildə icra olunur. Bu dəqiqlik o deməkdir ki, eyni şəraitdə ağıllı müqavilə eyni nəticəni verəcək.

## İctimai qeyd {#public-record}

Ağıllı müqavilələr audit və izləmə üçün faydalıdır. Ethereum smart müqavilələri ictimai blokçeyndə olduğundan, hər kəs aktiv köçürmələrini və digər əlaqəli məlumatları dərhal izləyə bilər. Məsələn, kiminsə ünvanınıza pul göndərdiyini yoxlaya bilərsiniz.

## Məxfiliyin qorunması {#privacy-protection}

Ağıllı müqavilələr həm də məxfiliyinizi qoruyur. Ethereum təxəllüslü şəbəkə olduğundan (sövdələşmələriniz kimliyinizlə deyil, unikal kriptoqrafik ünvana açıq şəkildə bağlıdır), siz məxfiliyinizi müşahidəçilərdən qoruya bilərsiniz.

## Görünən şərtlər {#visible-terms}

Nəhayət, ənənəvi müqavilələr kimi, onu imzalamadan (və ya başqa şəkildə onunla qarşılıqlı əlaqədə olmaqdan) əvvəl ağıllı müqavilədə nə olduğunu yoxlaya bilərsiniz. Ağıllı müqavilənin şəffaflığı hər kəsin onu diqqətlə yoxlaya biləcəyinə zəmanət verir.

## Ağıllı müqavilədən istifadə halları {#use-cases}

Ağıllı müqavilələr kompüter proqramlarının edə biləcəyi hər şeyi edə bilər.

Onlar hesablamalar həyata keçirə, valyuta yarada, məlumatları saxlaya, NFT-ləri çap edə, rabitə göndərə və hətta qrafik yarada bilərlər. Bəzi populyar, real nümunələr bunlardır:

- [Stabil koinlər](/stablecoins/)
- [Unikal rəqəmsal aktivlərin yaradılması və yayılması](/nft/)
- [Avtomatik, açıq valyuta mübadiləsi](/get-eth/#dex)
- [Mərkəzləşdirilməmiş oyun](/dapps/?category=gaming)
- [Avtomatik ödəniş edən sığorta siyasəti](https://etherisc.com/)
- [İnsanlara fərdiləşdirilmiş, qarşılıqlı işləyə bilən valyutalar yaratmağa imkan verən standart](/developers/docs/standards/tokens/)

## More of a visual learner? {#visual-learner}

Finematics ağıllı müqavilələri izah edir:

<YouTube id="pWGLtjG-F5c" />

## Further reading {#further-reading}

- [Ağıllı Müqavilələr Dünyanı Necə Dəyişdirəcək](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Ağıllı Müqavilələr: Hüquqşünasları əvəz edəcək Blokçeyn Texnologiyası](https://blockgeeks.com/guides/smart-contracts/)
- [Tərtibatçılar üçün ağıllı müqavilələr](/developers/docs/smart-contracts/)
- [Ağıllı müqavilələr yazmağı öyrənin](/developers/learning-tools/)
- [Ethereumun mənimsənilməsi - Ağıllı Müqavilə nədir?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
