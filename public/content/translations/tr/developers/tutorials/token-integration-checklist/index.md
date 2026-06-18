---
title: Token entegrasyon kontrol listesi
description: Token'larla etkileşime girerken dikkate alınması gerekenlerin bir kontrol listesi
author: "Trailofbits"
lang: tr
tags: ["solidity", "akıllı sözleşmeler", "güvenlik", "token'lar"]
skill: intermediate
breadcrumb: Token entegrasyonu
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Rastgele token'larla etkileşime girerken bu kontrol listesini izleyin. Her bir maddeyle ilişkili riskleri anladığınızdan emin olun ve bu kuralların istisnalarını gerekçelendirin.

Kolaylık sağlamak adına, tüm Slither [araçları](https://github.com/crytic/slither#tools) doğrudan bir token adresi üzerinde çalıştırılabilir, örneğin:

[Slither kullanımı eğitimi](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Bu kontrol listesini takip etmek için, token için Slither'dan şu çıktıyı almak isteyeceksiniz:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # yapılandırma ve Echidna ile Manticore kullanımını gerektirir
```

## Genel hususlar {#general-considerations}

- **Sözleşmenin bir güvenlik incelemesi vardır.** Güvenlik incelemesi olmayan sözleşmelerle etkileşime girmekten kaçının. Değerlendirmenin süresini (diğer adıyla "çaba düzeyi"), güvenlik firmasının itibarını ve bulguların sayısını ve ciddiyetini kontrol edin.
- **Geliştiricilerle iletişime geçtiniz.** Ekiplerini bir olay hakkında uyarmanız gerekebilir. [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) üzerinden uygun kişileri arayın.
- **Kritik duyurular için bir güvenlik e-posta listeleri vardır.** Ekipleri, kritik sorunlar bulunduğunda veya yükseltmeler gerçekleştiğinde kullanıcıları (sizin gibi!) bilgilendirmelidir.

## ERC uyumluluğu {#erc-conformity}

Slither, bir token'ın ilgili birçok ERC standardına uygunluğunu inceleyen [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance) adlı bir araç içerir. Şunları incelemek için slither-check-erc kullanın:

- **Transfer ve transferFrom bir boolean döndürür.** Birçok token bu işlevlerde bir boolean döndürmez. Sonuç olarak, sözleşmedeki çağrıları başarısız olabilir.
- **Kullanılıyorsa name, decimals ve symbol işlevleri mevcuttur.** Bu işlevler ERC-20 standardında isteğe bağlıdır ve mevcut olmayabilir.
- **Decimals bir uint8 döndürür.** Birçok token yanlışlıkla bir uint256 döndürür. Durum buysa, döndürülen değerin 255'in altında olduğundan emin olun.
- **Token, bilinen [ERC-20 yarış durumunu (race condition)](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) hafifletir.** ERC-20 standardında, saldırganların token'ları çalmasını önlemek için hafifletilmesi gereken bilinen bir ERC-20 yarış durumu vardır.
- **Token bir ERC-777 token'ı değildir ve transfer ile transferFrom içinde harici bir işlev çağrısı yoktur.** Transfer işlevlerindeki harici çağrılar, yeniden girişlere (reentrancy) yol açabilir.

Slither, birçok yaygın ERC kusurunu keşfedebilen birim testleri ve güvenlik özellikleri üreten [slither-prop](https://github.com/crytic/slither/wiki/Property-generation) adlı bir araç içerir. Şunları incelemek için slither-prop kullanın:

- **Sözleşme, slither-prop'tan gelen tüm birim testlerini ve güvenlik özelliklerini geçer.** Oluşturulan birim testlerini çalıştırın, ardından özellikleri [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) ile kontrol edin.

Son olarak, otomatik olarak tanımlanması zor olan bazı özellikler vardır. Bu koşulları manuel olarak inceleyin:

- **Transfer ve transferFrom bir ücret almamalıdır.** Deflasyonist token'lar beklenmedik davranışlara yol açabilir.
- **Token'dan kazanılan potansiyel faiz dikkate alınır.** Bazı token'lar token sahiplerine faiz dağıtır. Dikkate alınmazsa bu faiz sözleşmede sıkışıp kalabilir.

## Sözleşme yapısı {#contract-composition}

- **Sözleşme gereksiz karmaşıklıktan kaçınır.** Token basit bir sözleşme olmalıdır; karmaşık koda sahip bir token daha yüksek bir inceleme standardı gerektirir. Karmaşık kodu belirlemek için Slither'ın [human-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) kullanın.
- **Sözleşme SafeMath kullanır.** SafeMath kullanmayan sözleşmeler daha yüksek bir inceleme standardı gerektirir. SafeMath kullanımı için sözleşmeyi manuel olarak inceleyin.
- **Sözleşmenin token ile ilgili olmayan yalnızca birkaç işlevi vardır.** Token ile ilgili olmayan işlevler, sözleşmede bir sorun çıkma olasılığını artırır. Sözleşmede kullanılan kodu genel olarak incelemek için Slither'ın [contract-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) kullanın.
- **Token'ın yalnızca bir adresi vardır.** Bakiye güncellemeleri için birden fazla giriş noktası olan token'lar, adrese dayalı dahili kayıt tutmayı bozabilir (örneğin, `balances[token_address][msg.sender]` gerçek bakiyeyi yansıtmayabilir).

## Sahip ayrıcalıkları {#owner-privileges}

- **Token yükseltilebilir değildir.** Yükseltilebilir sözleşmeler zamanla kurallarını değiştirebilir. Sözleşmenin yükseltilebilir olup olmadığını belirlemek için Slither'ın [human-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) kullanın.
- **Sahibinin sınırlı basım yetenekleri vardır.** Kötü niyetli veya ele geçirilmiş sahipler basım yeteneklerini kötüye kullanabilir. Basım yeteneklerini incelemek için Slither'ın [human-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) kullanın ve kodu manuel olarak incelemeyi düşünün.
- **Token duraklatılabilir değildir.** Kötü niyetli veya ele geçirilmiş sahipler, duraklatılabilir token'lara dayanan sözleşmeleri tuzağa düşürebilir. Duraklatılabilir kodu manuel olarak belirleyin.
- **Sahip, sözleşmeyi kara listeye alamaz.** Kötü niyetli veya ele geçirilmiş sahipler, kara listesi olan token'lara dayanan sözleşmeleri tuzağa düşürebilir. Kara listeye alma özelliklerini manuel olarak belirleyin.
- **Token'ın arkasındaki ekip bilinmektedir ve kötüye kullanımdan sorumlu tutulabilir.** Anonim geliştirme ekiplerine sahip olan veya yasal sığınaklarda bulunan sözleşmeler daha yüksek bir inceleme standardı gerektirmelidir.

## Token kıtlığı {#token-scarcity}

Token kıtlığı sorunlarına yönelik incelemeler manuel inceleme gerektirir. Şu koşulları kontrol edin:

- **Hiçbir kullanıcı arzın çoğuna sahip değildir.** Birkaç kullanıcı token'ların çoğuna sahipse, token'ın dağılımına dayalı olarak işlemleri etkileyebilirler.
- **Toplam arz yeterlidir.** Düşük toplam arza sahip token'lar kolayca manipüle edilebilir.
- **Token'lar birkaç borsadan fazlasında bulunur.** Tüm token'lar tek bir borsadaysa, borsanın ele geçirilmesi token'a dayanan sözleşmeyi de tehlikeye atabilir.
- **Kullanıcılar büyük fonların veya flaş kredilerin (flash loans) ilişkili risklerini anlar.** Token bakiyesine dayanan sözleşmeler, büyük fonlara sahip saldırganları veya flaş krediler aracılığıyla yapılan saldırıları dikkatlice göz önünde bulundurmalıdır.
- **Token flaş basıma (flash minting) izin vermez**. Flaş basım, bakiye ve toplam arzda önemli dalgalanmalara yol açabilir; bu da token'ın işleyişinde katı ve kapsamlı taşma kontrollerini zorunlu kılar.