---
title: Token entegrasyon kontrol listesi
description: Token'larla etkileşime girerken göz önünde bulundurulacak şeylerin listesi
author: "Trailofbits"
lang: tr
tags:
  - "solidity"
  - "akıllı kontratlar"
  - "güvenlik"
  - "jetonlar"
skill: beginner
published: 2020-08-13
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Rastgele token'larla etkileşim kurarken bu kontrol listesini izleyin. Her bir öğeyle ilişkili riskleri anladığınızdan emin olun ve bu kurallardaki istisnaları gerekçelendirin.

Kolaylık sağlamak için, tüm Slither [yardımcı programları](https://github.com/crytic/slither#tools) doğrudan aşağıdaki gibi bir token adresinde çalıştırılabilir:

[Slither öğreticisi kullanılarak](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Bu kontrol listesini takip etmek amacıyla token için Slither'den bu çıktıyı almanız gerekir:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## Genel hususlar {#general-considerations}

- **Sözleşmede bir güvenlik incelemesi var.** Güvenlik incelemesi olmayan sözleşmelerle etkileşimde bulunmaktan kaçının. Değerlendirmenin uzunluğunu ("çaba düzeyi" olarak da bilinir), güvenlik firmasının itibarını, bulguların sayısını ve ciddiyetini kontrol edin.
- **Geliştiricilerle iletişime geçtiniz.** Ekiplerini bir olay hakkında uyarmanız gerekebilir. Uygun sözleşmeleri [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) üzerinde arayın.
- **Kritik duyurular için bir güvenlik posta listeleri var.** Ekipleri, kritik sorunlar bulunduğunda veya yükseltmeler gerçekleştiğinde kullanıcılara (sizin gibi!) bilgi vermelidir.

## ERC uygunluğu {#erc-conformity}

Slither bir token'ın diğer birçok ERC standardına uyumluğunu gözden geçiren faydalı bir araç olan [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)'yi bulundurur. Şunları gözden geçirmek için slither-check-erc kullanın:

- **Transfer ve transferFrom bir boolean döndürür.** Birkaç token bu fonksiyonlarda bir boolean döndürmez. Sonuç olarak, sözleşmedeki çağrıları başarısız olabilir.
- **Ad, ondalık sayılar ve sembol fonksiyonları kullanılıyorsa mevcuttur.** Bu fonksiyonlar ERC20 standardında isteğe bağlıdır ve mevcut olmayabilir.
- **Ondalık sayılar bir uint8 döndürür.** Birkaç token hatalı bir şekilde bir uint256 döndürür. Bu durumda, döndürülen değerin 255'in altında olduğundan emin olun.
- **Token, bilinen [ERC20 yarış koşulunu](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) hafifletir.** ERC20 standardı, saldırganların token'ları çalmasını önlemek için hafifletilmesi gereken bilinen bir ERC20 yarış koşuluna sahiptir.
- **Token bir ERC777 token'ı değil ve transfer ve transferFrom'da harici fonksiyon çağrısına sahip değil.** Aktarım işlevlerindeki harici çağrılar yeniden girişlere yol açabilir.

Slither, birçok yaygın ERC kusurunu keşfedebilen birim testleri ve güvenlik özellikleri üreten bir yardımcı program olan [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)'u içerir. Şunu gözden geçirmek için slither-prop kullanın:

- **Sözleşme, slither-prop'tan tüm birim testlerini ve güvenlik özelliklerini geçer.** Oluşturulan birim testlerini çalıştırın, ardından [Echidna](https://github.com/crytic/echidna) ve [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) ile özellikleri kontrol edin.

Son olarak, otomatik olarak tanımlanması zor olan belirli özellikler vardır. Bu koşulları elle gözden geçirin:

- **Transfer and transferFrom bir ücret almamalıdır.** Deflasyonist token'lar beklenmedik davranışlara yol açabilir.
- **Token'dan kazanılan potansiyel faiz dikkate alınır.** Bazı token'lar, token sahiplerine faiz dağıtır. Bu faiz, dikkate alınmadığı takdirde sözleşmede sıkışıp kalabilir.

## Sözleşme kompozisyonu {#contract-composition}

- **Sözleşme, gereksiz karmaşıklığı önler.** Token basit bir sözleşme olmalıdır; karmaşık kodlu bir token, daha yüksek bir inceleme standardı gerektirir. Karmaşık kodu tanımlamak için Slither'ın [insan-özet yazıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) kullanın.
- **Sözleşme, SafeMath kullanır.** SafeMath kullanmayan sözleşmeler, daha yüksek bir inceleme standardı gerektirir. SafeMath kullanımı için sözleşmeyi elle inceleyin.
- **Sözleşmenin yalnızca birkaç token ile ilgili olmayan fonksiyonu vardır.** Token ile ilgili olmayan fonksiyonlar, sözleşmede sorun çıkma olasılığını artırır. Sözleşmede kullanılan kodu geniş olarak gözden geçirmek için Slither'ın [sözleşme-özet yazıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) kullanın.
- **Token'ın yalnızca bir adresi vardır.** Bakiye güncellemeleri için birden fazla giriş noktasına sahip tokenler, adrese göre dahili muhasebeyi bozabilir (örn. `balances[token_address][msg.sender]` gerçek bakiyeyi yansıtmayabilir).

## Sahip ayrıcalıkları {#owner-privileges}

- **Token yükseltilemez.** Yükseltilebilir sözleşmeler zamanla kurallarını değiştirebilir. Sözleşmenin yükseltilebilir olup olmadığını belirlemek için Slither'ın [insan-özet yazıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) kullanın.
- **Sahip, sınırlı basım kabiliyetine sahiptir.** Kötü niyetli veya saldırıya uğramış sahipler basım kabiliyetlerini istismar edebilir. Basım kabiliyetlerini gözden geçirmek için Slither'ın [insan-özet yazıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) kullanın ve kodu elle incelemeyi düşünün.
- **Token duraklatılamaz.** Kötü niyetli veya güvenliği ihlal eden sahipler, duraklatılabilir token'lara dayanarak sözleşmeleri tuzağa düşürebilir. Durdurulabilir kodu elle tanımlayın.
- **Sahip, sözleşmeyi kara listeye alamaz.** Kötü niyetli veya güvenliği ihlal eden sahipler, token'lara dayanan sözleşmeleri bir kara listeyle tuzağa düşürebilir. Kara listeye alma özelliklerini elle tanımlayın.
- **Token'ın arkasındaki ekip biliniyor ve kötüye kullanımdan sorumlu tutulabilir.** İsimsiz geliştirme ekipleriyle yapılan veya yasal sığınma alanlarında bulunan sözleşmeler, daha yüksek bir inceleme standardı gerektirmelidir.

## Token nadirliği {#token-scarcity}

Token kıtlığı sorunlarına yönelik incelemeler, manuel inceleme gerektirir. Şu koşullar için kontrol edin:

- **Hiçbir kullanıcı kaynağın çoğuna sahip değildir.** Token'ların çoğuna birkaç kullanıcı sahipse, token'ın yeniden bölünmesine dayalı olarak işlemleri etkileyebilirler.
- **Toplam arz yeterlidir.** Toplam arzı düşük olan token'lar kolayca manipüle edilebilir.
- **Token'lar birkaç borsadan daha fazlasında bulunur.** Tüm token'lar tek bir borsadaysa, borsanın güvenliğinin ihlal edilmesi token'a dayanan sözleşmeyi tehlikeye atabilir.
- **Kullanıcılar, büyük fonlar veya hızlı kredilerle (flash credit) ilgili riskleri anlar.** Token bakiyesine dayanan sözleşmeler, büyük fonlara sahip saldırganları veya hızlı krediler yoluyla saldırıları dikkatle değerlendirmelidir.
- **Token, hızlı basıma (flash mint) izin vermez**. Hızlı basım, token'ın işleyişinde sıkı ve kapsamlı taşma kontrolleri gerektiren bakiyede ve toplam arzda önemli dalgalanmalara yol açabilir.
