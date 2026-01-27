---
title: Jeton entegrasyonu kontrol listesi
description: Jetonlarla etkileşime girerken göz önünde bulundurulacak şeylerin listesi
author: "Trailofbits"
lang: tr
tags:
  [
    "katılık",
    "akıllı kontratlar",
    "güvenlik",
    "token'lar"
  ]
skill: intermediate
published: 13.08.2020
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Rastgele jetonlarla etkileşim kurarken bu kontrol listesini izleyin. Her bir öğeyle ilişkili riskleri anladığınızdan emin olun ve bu kurallardaki istisnaları gerekçelendirin.

Kolaylık sağlamak için tüm Slither [yardımcı programları](https://github.com/crytic/slither#tools), doğrudan bir jeton adresi üzerinde şu şekilde çalıştırılabilir:

[Slither Kullanım Öğreticisi](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Bu kontrol listesini takip etmek amacıyla jeton için Slither'dan bu çıktıyı almanız gerekir:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## Genel hususlar {#general-considerations}

- **Sözleşmenin bir güvenlik incelemesi var.** Güvenlik incelemesi olmayan sözleşmelerle etkileşimde bulunmaktan kaçının. Değerlendirmenin uzunluğunu ("çaba düzeyi" olarak da bilinir), güvenlik firmasının itibarını, bulguların sayısını ve ciddiyetini kontrol edin.
- **Geliştiricilerle iletişime geçtiniz.** Ekiplerini bir olay hakkında uyarmanız gerekebilir. Uygun kişileri [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) üzerinde arayın.
- **Kritik duyurular için bir güvenlik posta listeleri var.** Ekipleri kullanıcılara (sizin gibi!) bilgi vermelidir kritik sorunlar bulunduğunda veya yükseltmeler gerçekleştiğinde.

## ERC uygunluğu {#erc-conformity}

Slither, bir jetonun ilgili birçok ERC standardına uygunluğunu inceleyen [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance) adlı bir yardımcı program içerir. Şunları gözden geçirmek için slither-check-erc kullanın:

- **Transfer ve transferFrom bir boolean döndürür.** Birkaç jeton bu fonksiyonlarda bir boolean döndürmez. Sonuç olarak, sözleşmedeki çağrıları başarısız olabilir.
- **Ad, ondalık sayılar ve sembol fonksiyonları kullanılıyorsa mevcuttur.** Bu fonksiyonlar ERC20 standardında isteğe bağlıdır ve mevcut olmayabilir.
- **Decimals bir uint8 döndürür.** Birkaç jeton hatalı bir şekilde bir uint256 döndürür. Bu durumda, döndürülen değerin 255'in altında olduğundan emin olun.
- **Jeton, bilinen [ERC20 yarış koşulunu](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) hafifletir.** ERC20 standardı, saldırganların jetonları çalmasını önlemek için hafifletilmesi gereken bilinen bir ERC20 yarış koşuluna sahiptir.
- **Jeton bir ERC777 jetonu değildir ve transfer ile transferFrom'da harici fonksiyon çağrısı yoktur.** Aktarım fonksiyonlarındaki harici çağrılar yeniden girişlere yol açabilir.

Slither, birçok yaygın ERC kusurunu keşfedebilen birim testleri ve güvenlik özellikleri üreten [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)'u içerir. Şunu gözden geçirmek için slither-prop kullanın:

- **Sözleşme, slither-prop'tan gelen tüm birim testlerini ve güvenlik özelliklerini geçer.** Oluşturulan birim testlerini çalıştırın, ardından özellikleri [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) ile kontrol edin.

Son olarak, otomatik olarak tanımlanması zor olan belirli özellikler vardır. Bu koşulları elle gözden geçirin:

- **Transfer ve transferFrom ücret almamalıdır.** Deflasyonist jetonlar beklenmedik davranışlara yol açabilir.
- **Jetondan kazanılan potansiyel faiz dikkate alınır.** Bazı jetonlar, jeton sahiplerine faiz dağıtır. Bu faiz, dikkate alınmadığı takdirde sözleşmede sıkışıp kalabilir.

## Sözleşme bileşimi {#contract-composition}

- **Sözleşme gereksiz karmaşıklıktan kaçınır.** Jeton basit bir sözleşme olmalıdır; karmaşık koda sahip bir jeton daha yüksek bir inceleme standardı gerektirir. Karmaşık kodu tanımlamak için Slither’ın [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) özelliğini kullanın.
- **Sözleşme SafeMath kullanır.** SafeMath kullanmayan sözleşmeler daha yüksek bir inceleme standardı gerektirir. SafeMath kullanımı için sözleşmeyi elle inceleyin.
- **Sözleşmenin yalnızca jetonla ilgili olmayan birkaç fonksiyonu vardır.** Jetonla ilgili olmayan fonksiyonlar sözleşmede bir sorun çıkma olasılığını artırır. Sözleşmede kullanılan kodu genel hatlarıyla incelemek için Slither'ın [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) özelliğini kullanın.
- **Jetonun yalnızca bir adresi vardır.** Bakiye güncellemeleri için birden fazla giriş noktasına sahip jetonlar, adrese dayalı dahili muhasebeyi bozabilir (ör. `balances[token_address][msg.sender]` gerçek bakiyeyi yansıtmayabilir).

## Sahip ayrıcalıkları {#owner-privileges}

- **Jeton yükseltilemez.** Yükseltilebilir sözleşmeler zamanla kurallarını değiştirebilir. Sözleşmenin yükseltilebilir olup olmadığını belirlemek için Slither'ın [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) özelliğini kullanın.
- **Sahibin sınırlı basım yetenekleri vardır.** Kötü niyetli veya güvenliği ihlal edilmiş sahipler basım yeteneklerini kötüye kullanabilir. Basım yeteneklerini gözden geçirmek için Slither'ın [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) özelliğini kullanın ve kodu elle incelemeyi düşünün.
- **Jeton duraklatılamaz.** Kötü niyetli veya güvenliği ihlal edilmiş sahipler, duraklatılabilir jetonlara dayanan sözleşmeleri tuzağa düşürebilir. Duraklatılabilir kodu elle tanımlayın.
- **Sahip, sözleşmeyi kara listeye alamaz.** Kötü niyetli veya güvenliği ihlal edilmiş sahipler, kara listesi olan jetonlara dayanan sözleşmeleri tuzağa düşürebilir. Kara listeye alma özelliklerini elle tanımlayın.
- **Jetonun arkasındaki ekip biliniyor ve kötüye kullanımdan sorumlu tutulabilir.** Anonim geliştirme ekiplerine sahip veya yasal sığınaklarda bulunan sözleşmeler daha yüksek bir inceleme standardı gerektirmelidir.

## Jeton kıtlığı {#token-scarcity}

Jeton kıtlığı sorunlarına yönelik incelemeler, manuel inceleme gerektirir. Şu koşullar için kontrol edin:

- **Hiçbir kullanıcı arzın çoğuna sahip değildir.** Birkaç kullanıcı jetonların çoğuna sahipse, jetonun yeniden dağılımına bağlı olarak işlemleri etkileyebilirler.
- **Toplam arz yeterlidir.** Toplam arzı düşük olan jetonlar kolayca manipüle edilebilir.
- **Jetonlar birkaçtan fazla borsada bulunur.** Tüm jetonlar tek bir borsadaysa, borsanın güvenliğinin ihlal edilmesi, jetona dayanan sözleşmeyi tehlikeye atabilir.
- **Kullanıcılar, büyük fonlar veya flaş kredilerle ilişkili riskleri anlar.** Jeton bakiyesine dayanan sözleşmeler, büyük fonlara sahip saldırganları veya flaş krediler yoluyla yapılan saldırıları dikkatle değerlendirmelidir.
- **Jeton, flaş basıma izin vermez.** Flaş basım, bakiyede ve toplam arzda önemli dalgalanmalara yol açabilir, bu da jetonun işleyişinde katı ve kapsamlı taşma kontrollerini gerektirir.
