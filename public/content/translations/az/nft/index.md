---
title: Dəyişilə bilməyən tokenlər (NFT)
description: Ethereum-da NFT-lərə ümumi baxış
lang: az
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Holoqram ilə görüntülənən bir Eth loqosu.
summaryPoint1: Ethereum əsaslı aktiv kimi bənzərsiz hər şeyi təsvir etmək üçün bir yol.
summaryPoint2: NFT-lər məzmun yaradıcılarına əvvəlkindən daha çox güc verir.
summaryPoint3: Ethereum blokçeynində ağıllı müqavilələr ilə dəstəklənmişdir.
---

## What are NFTs? {#what-are-nfts}

NFT-lər individual olaraq unikal olan tokenlərdir. Hər bir NFT fərqli xüsusiyyətlərə malikdir (dəyişilə bilməyən) və sübut edilə bilən səviyyədə, azdır. Bu, bir dəstdəki hər bir tokenin eyni olduğu və eyni xassələrə malik olduğu ERC-20 kimi tokenlərdən fərqlidir ("dəyişilə bilən"). Pulqabınızda hansı xüsusi dollar əskinasın olması sizin üçün əhəmiyyəti yoxdur, çünki onların hamısı eynidir və eyni dəyərdədir. Bununla belə, siz hansı NFT-yə sahib olduğunuza əhəmiyyət _verirsiniz_, çünki onların hamısı onları digərlərindən fərqləndirən fərdi xüsusiyyətlərə malikdir (“dəyişilə bilməyən”).

Hər bir NFT-nin unikallığı incəsənət, kolleksiya əşyaları və ya hətta daşınmaz əmlak kimi əşyaların tokenləşdirilməsinə imkan verir, burada bir xüsusi unikal NFT hansısa xüsusi unikal real dünya və ya rəqəmsal əşyanı təmsil edir. Aktivin mülkiyyəti Ethereum blokçeyni ilə təmin edilir – heç kim sahiblik qeydini dəyişdirə və ya yeni NFT-ni kopyalaya/yapışdıra bilməz.

<YouTube id="Xdkkux6OxfM" />

## Aktivlərin interneti {#internet-of-assets}

NFT-lər və Ethereum bu gün internetdə mövcud olan bəzi problemləri həll edir. Hər şey daha rəqəmsallaşdıqca, fiziki elementlərin çatışmazlıq, unikallıq və mülkiyyət sübutu kimi xüsusiyyətlərini təkrarlamağa ehtiyac var. və bir mərkəzi təşkilat tərəfindən idarə olunmayan şəkildə. Məsələn, NFT-lər ilə siz bir şirkətin xüsusi musiqi tətbiqinə xas olmayan bir musiqi mp3-ə sahib ola bilərsiniz və ya sata və ya dəyişdirə biləcəyiniz, lakin bir platforma tərəfindən özbaşına olaraq sizdən alına bilməyən sosial media dəstəyinə sahib ola bilərsiniz.

Bu gün çoxumuzun istifadə etdiyi internetlə müqayisədə NFT internetinin fərqləri bunlardır...

### Müqayisə {#nft-comparison}

| NFT interneti                                                                                                                                              | Bugünkü internet                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aktivlərinizin sahibisiniz! Onları yalnız siz sata və ya dəyişdirə bilərsiniz.                                                                             | Siz hansısa təşkilatdan aktiv icarəyə götürürsünüz.                                                                                                                        |
| NFT-lər rəqəmsal olaraq unikaldır, heç bir iki NFT eyni deyil.                                                                                             | Bi müəssisənin surətini çox vaxt orijinaldan ayırmaq olmur.                                                                                                                |
| NFT-yə sahiblik, hər kəsin doğrulaması üçün blokçeyndə saxlanılır.                                                                                         | Rəqəmsal əşyaların mülkiyyət qeydləri qurumlar tərəfindən idarə olunan serverlərdə saxlanılır – yeganə seçiminiz onlara etibar etməkdir.                                   |
| NFT-lər Ethereum-da ağıllı müqavilələrdir. Bu o deməkdir ki, onlar Ethereum-dakı digər ağıllı müqavilələrdə və tətbiqlərdə asanlıqla istifadə edilə bilər! | Rəqəmsal əşyaları olan şirkətlər adətən öz “divarlı bağ” infrastrukturunu tələb edirlər.                                                                                   |
| Məzmun yaradıcıları işlərini hər yerdə sata və qlobal bazara çıxa bilərlər.                                                                                | Yaradıcılar istifadə etdikləri platformaların infrastrukturuna və paylanmasına etibar edirlər. Bunlar çox vaxt istifadə şərtlərinə və coğrafi məhdudiyyətlərə məruz qalır. |
| NFT yaradıcıları öz işləri üzərində mülkiyyət hüquqlarını saxlaya bilərlər və qonorarları birbaşa NFT müqaviləsinə proqramlaşdıra bilərlər.                | Musiqi axını xidmətləri kimi platformalar satışdan əldə edilən gəlirin böyük hissəsini özlərinə saxlayır.                                                                  |

## NFT-lər necə işləyir? {#how-nfts-work}

Ethereum-da verilən hər hansı bir token kimi, NFT-lər də ağıllı müqavilə ilə verilir. Ağıllı müqavilə müqavilənin hansı funksiyalara malik olduğunu müəyyən edən bir neçə NFT standartından birinə (ümumiyyətlə ERC-721 və ya ERC-1155) uyğun gəlir. Müqavilə NFT-lər yarada ('zərb edə') və onları müəyyən bir sahibə təyin edə bilər. Mülkiyyət, müqavilədə xüsusi NFT-ləri xüsusi ünvanlara uyğunlaşdırmaqla müəyyən edilir. NFT-nin identifikatoru və adətən onunla əlaqəli metadatası var ki, bu da xüsusi tokeni unikal edir.

Kimsə NFT yaratdıqda və ya zərb edəndə, həqiqətən də ağıllı müqavilədə ünvanına müəyyən bir NFT təyin edən bir funksiyanı yerinə yetirir. Bu məlumat blokçeynin bir hissəsi olan müqavilənin anbarında saxlanılır. Müqaviləni yaradan, müqaviləyə əlavə məntiq yaza bilər, məsələn, ümumi tədarükün məhdudlaşdırılması və ya token hər dəfə ötürüldükdə yaradıcıya ödəniləcək qonorarın müəyyən edilməsi.

## NFT-lər nə üçün istifadə olunur? {#nft-use-cases}

NFT-lər bir çox şeylər üçün istifadə olunur, o cümlədən:

- bir tədbirdə iştirak etdiyinizi sübut etmək
- bir kursu bitirdiyinizi təsdiq etmək
- oyunlar üçün sahib oluna bilən əşyalar
- rəqəmsal sənət
- real aktivlərinin tokenləşdirilməsi
- onlayn şəxsiyyətinizi sübut etmək
- məzmuna giriş imkanı eldə etmək
- bilet almaq
- mərkəzləşdirilməmiş internet domen adları
- DeFi-də girov

Bəlkə siz NFT-lərdən istifadə edərək, nəzarəti itirmədən və qazancınızı vasitəçilərə qurban vermədən işlərini paylaşmaq istəyən bir sənətkarsınız. Siz yeni müqavilə yarada və NFT-lərin sayını, onların xassələrini və bəzi xüsusi sənət əsərlərinə aid linki təyin edə bilərsiniz. Sənətçi olaraq, sizə ödənilməli olan qonorarları ağıllı müqavilədə proqramlaşdıra bilərsiniz (məsələn, hər dəfə NFT köçürüldükdə satış qiymətinin 5%-ni müqavilə sahibinə köçürün). Həmçinin müqaviləni yerləşdirən pulqabının sahibi olduğunuz üçün NFT-ləri yaratdığınızı həmişə sübut edə bilərsiniz. Alıcılarınız kolleksiyanızdan orijinal NFT-yə sahib olduqlarını asanlıqla sübut edə bilərlər, çünki onların pulqabının ünvanı ağıllı müqavilənizdəki token ilə əlaqələndirilir. Onlar orijinallığına arxayın olaraq onu Ethereum ekosistemində istifadə edə bilərlər.

Və ya bir idman tədbirinə bileti düşünün. Bir tədbirin təşkilatçısı neçə bilet satacağını seçə bildiyi kimi, NFT-nin yaradıcısı da neçə replikanın mövcudluğuna qərar verə bilər. Bəzən bunlar 5000 Ümumi Qəbul biletləri kimi dəqiq replikalardır. Bəzən çox oxşar, lakin hər biri bir qədər fərqli olan bir neçəsi zərb edilir, məsələn, təyin edilmiş oturacaqlı bilet. Bunları, bilet idarəçilərinə pul ödəmədən və alıcı həmişə müqavilə ünvanını yoxlayaraq biletin həqiqiliyinə əmin olaraq, almaq və satmaq olar.

Ethereum.org saytında NFT-lər insanların GitHub repozitoriyamıza töhfə verdiyini və ya zənglərə cavab verdiyini nümayiş etdirmək üçün istifadə olunur və bizim hətta öz NFT domen adımız var. Ethereum.org-a töhfə versəniz, POAP NFT-ni tələb edə bilərsiniz. Bəzi kriptovalyuta görüşləri bilet kimi POAP-lardan istifadə etmişdir. [Töhfə haqqında daha çox məlumat](/contributing/#poap).

![ethereum.org POAP](./poap.png)

Bu veb-saytın NFT-lər tərəfindən dəstəklənən alternativ domen adı da var, **ethereum.eth**. Bizim `.org` ünvanımız mərkəzləşdirilmiş şəkildə domen adı sistemi (DNS) provayderi tərəfindən idarə olunur, halbuki ethereum`.eth` Ethereum Ad Xidməti (ENS) vasitəsilə Ethereum-da qeydiyyatdan keçib. Və bizə məxsusdur və tərəfimizdən idarə olunur. [ENS qeydimizi yoxlayın](https://app.ens.domains/name/ethereum.eth)

[ENS haqqında daha çox məlumat](https://app.ens.domains)

<Divider />

### NFT təhlükəsizliyi {#nft-security}

Ethereum-un təhlükəsizliyi hissə sübutundan gəlir. Sistem, zərərli hərəkətləri iqtisadi cəhətdən dayandırmaq üçün dizayn edilmişdir və bu, Ethereum-u müdaxiləyə davamlı edir. NFT-ləri mümkün edən budur. NFT əməliyyatınızı ehtiva edən blok tamamlandıqdan sonra onu dəyişdirmək təcavüzkar üçün milyonlarla ETH-yə başa gələcək. Ethereum proqramını işlədən hər kəs dərhal NFT-yə qeyri-qanuni müdaxiləni aşkar edə biləcək və pis aktyor iqtisadi cəhətdən cəzalandırılacaq və çıxarılacaq.

NFT-lərlə bağlı təhlükəsizlik məsələləri çox vaxt fişinq fırıldaqları, ağıllı müqavilə zəiflikləri və ya istifadəçi səhvləri (məsələn, şəxsi açarların təsadüfən ifşa edilməsi kimi) ilə əlaqədardır ki, bu da pulqabının uyğun səviyyədə təhlükəsizliyini NFT sahibləri üçün kritik edir.

<ButtonLink to="/security/">
  Təhlükəsizlik haqqında daha çox məlumat
</ButtonLink>

## Further reading {#further-reading}

- [NFT-lər haqqında yeni başlayanlar üçün bələdçi](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, yanvar 2020_
- [EtherscanNFT izləyicisi](https://etherscan.io/nft-top-contracts)
- [ERC-721 token standartı](/developers/docs/standards/tokens/erc-721/)
- [ERC-1155 token standartı](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
