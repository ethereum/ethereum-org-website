---
title: Token entegrasyon kontrol listesi
description: "Token'larla etkileşime girerken dikkate alınması gerekenlerin bir kontrol listesi"
author: "Trailofbits"
lang: tr
tags: ["Solidity", "akıllı sözleşmeler", "güvenlik", "token'lar"]
skill: intermediate
breadcrumb: Token entegrasyonu
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Herhangi bir Token ile etkileşime girerken bu kontrol listesini izleyin. Her bir maddeyle ilişkili riskleri anladığınızdan emin olun ve bu kuralların istisnalarını gerekçelendirin.

Kolaylık sağlamak için, tüm Slither [araçları](https://github.com/crytic/slither#tools) doğrudan bir Token adresi üzerinde çalıştırılabilir, örneğin:

[Slither kullanımı eğitimi](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Etherscan'den doğrulanmış kaynak kodunu getirmek bir [Etherscan API anahtarı](https://docs.etherscan.io/set-up-your-api-key) gerektirir (ücretsiz bir anahtar işe yarar). Bunu `--etherscan-apikey` ile geçirin veya Slither'ın da okuduğu `ETHERSCAN_API_KEY` ortam değişkenini ayarlayın:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Bir anahtar olmadan, komut bir `Invalid etherscan API Key` hatasıyla başarısız olur.

Bu kontrol listesini takip etmek için, Token için Slither'dan şu çıktıyı almak isteyeceksiniz:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # yapılandırma ve Echidna kullanımını gerektirir
```

## Genel hususlar {#general-considerations}

- **Sözleşmenin bir güvenlik incelemesi vardır.** Güvenlik incelemesi olmayan sözleşmelerle etkileşime girmekten kaçının. Değerlendirmenin süresini (diğer adıyla "çaba düzeyi"), güvenlik firmasının itibarını ve bulguların sayısını ve ciddiyetini kontrol edin.
- **Geliştiricilerle iletişime geçtiniz.** Ekiplerini bir olay hakkında uyarmanız gerekebilir. [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) üzerinden uygun kişileri arayın.
- **Kritik duyurular için bir güvenlik e-posta listeleri vardır.** Ekipleri, kritik sorunlar bulunduğunda veya yükseltmeler gerçekleştiğinde kullanıcıları (sizin gibi!) bilgilendirmelidir.

## ERC uyumluluğu {#erc-conformity}

Slither, bir Token'ın ilgili birçok ERC standardına uyumluluğunu inceleyen [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance) adlı bir araç içerir. Şunları incelemek için slither-check-erc kullanın:

- **Transfer ve transferFrom bir boolean döndürür.** Birçok Token bu işlevlerde bir boolean döndürmez. Sonuç olarak, sözleşmedeki çağrıları başarısız olabilir.
- **Kullanılıyorsa name, decimals ve symbol işlevleri mevcuttur.** Bu işlevler ERC-20 standardında isteğe bağlıdır ve mevcut olmayabilir.
- **Decimals bir uint8 döndürür.** Birçok Token yanlışlıkla bir uint256 döndürür. Durum buysa, döndürülen değerin 255'in altında olduğundan emin olun.
- **Token, bilinen [ERC-20 yarış durumunu (race condition)](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) hafifletir.** ERC-20 standardı, saldırganların Token'ları çalmasını önlemek için hafifletilmesi gereken bilinen bir ERC-20 yarış durumuna sahiptir.
- **Token bir ERC-777 Token'ı değildir ve transfer ile transferFrom içinde harici bir işlev çağrısı yoktur.** Transfer işlevlerindeki harici çağrılar yeniden girişlere (reentrancy) yol açabilir.

Slither, birçok yaygın ERC kusurunu keşfedebilen birim testleri ve güvenlik özellikleri üreten [slither-prop](https://github.com/crytic/slither/wiki/Property-generation) adlı bir araç içerir. Şunları incelemek için slither-prop kullanın:

- **Sözleşme, slither-prop'tan gelen tüm birim testlerini ve güvenlik özelliklerini geçer.** Oluşturulan birim testlerini çalıştırın, ardından özellikleri [Echidna](https://github.com/crytic/echidna) ile kontrol edin.

Son olarak, otomatik olarak tanımlanması zor olan belirli özellikler vardır. Bu koşulları manuel olarak inceleyin:

- **Transfer ve transferFrom bir ücret almamalıdır.** Deflasyonist Token'lar beklenmedik davranışlara yol açabilir.
- **Token'dan kazanılan potansiyel faiz dikkate alınır.** Bazı Token'lar Token sahiplerine faiz dağıtır. Dikkate alınmazsa bu faiz sözleşmede sıkışıp kalabilir.

## Sözleşme bileşimi {#contract-composition}

- **Sözleşme gereksiz karmaşıklıktan kaçınır.** Token basit bir sözleşme olmalıdır; karmaşık koda sahip bir Token daha yüksek bir inceleme standardı gerektirir. Karmaşık kodu belirlemek için Slither'ın [human-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) kullanın.
- **Sözleşme denetimli aritmetik kullanır.** Solidity 0.8 ve sonrası varsayılan olarak taşma (overflow) ve yetersiz taşma (underflow) durumlarında geri alır (revert); daha eski sözleşmeler aynı koruma için SafeMath'e ihtiyaç duyar. SafeMath olmadan daha eski sürümlerle derlenen veya `unchecked` blokları kullanan sözleşmeler daha yüksek bir inceleme standardı gerektirir. Özellikle `unchecked` blokları ve satır içi assembly (inline assembly) içindeki aritmetiği manuel olarak inceleyin.
- **Sözleşmenin Token ile ilgili olmayan yalnızca birkaç işlevi vardır.** Token ile ilgili olmayan işlevler, sözleşmede bir sorun çıkma olasılığını artırır. Sözleşmede kullanılan kodu geniş çapta incelemek için Slither'ın [contract-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) kullanın.
- **Token'ın yalnızca bir adresi vardır.** Bakiye güncellemeleri için birden fazla giriş noktası olan Token'lar, adrese dayalı dahili defter tutmayı bozabilir (örneğin, `balances[token_address][msg.sender]` gerçek bakiyeyi yansıtmayabilir).

## Sahip ayrıcalıkları {#owner-privileges}

- **Token yükseltilebilir değildir.** Yükseltilebilir sözleşmeler zamanla kurallarını değiştirebilir. Sözleşmenin yükseltilebilir olup olmadığını belirlemek için Slither'ın [human-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) kullanın.
- **Sahibinin sınırlı basım yetenekleri vardır.** Kötü niyetli veya ele geçirilmiş sahipler basım yeteneklerini kötüye kullanabilir. Basım yeteneklerini incelemek için Slither'ın [human-summary yazdırıcısını](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) kullanın ve kodu manuel olarak incelemeyi düşünün.
- **Token duraklatılabilir değildir.** Kötü niyetli veya ele geçirilmiş sahipler, duraklatılabilir token'lara dayanan sözleşmeleri tuzağa düşürebilir. Duraklatılabilir kodu manuel olarak belirleyin.
- **Sahip, sözleşmeyi kara listeye alamaz.** Kötü niyetli veya ele geçirilmiş sahipler, kara listesi olan token'lara dayanan sözleşmeleri tuzağa düşürebilir. Kara listeye alma özelliklerini manuel olarak belirleyin.
- **Token'ın arkasındaki ekip bilinmektedir ve kötüye kullanımdan sorumlu tutulabilir.** Anonim geliştirme ekiplerine sahip olan veya yasal sığınaklarda bulunan sözleşmeler daha yüksek bir inceleme standardı gerektirmelidir.

## Token kıtlığı {#token-scarcity}

Token kıtlığı sorunlarına yönelik incelemeler manuel inceleme gerektirir. Şu koşulları kontrol edin:

- **Hiçbir kullanıcı arzın çoğuna sahip değildir.** Birkaç kullanıcı Token'ların çoğuna sahipse, Token'ın dağılımına dayalı olarak işlemleri etkileyebilirler.
- **Toplam arz yeterlidir.** Düşük toplam arza sahip Token'lar kolayca manipüle edilebilir.
- **Token'lar birkaç borsadan fazlasında bulunur.** Tüm Token'lar tek bir borsadaysa, borsanın ele geçirilmesi Token'a dayanan sözleşmeyi tehlikeye atabilir.
- **Kullanıcılar büyük fonların veya flaş kredilerin (flash loan) ilişkili risklerini anlar.** Token bakiyesine dayanan sözleşmeler, büyük fonlara sahip saldırganları veya flaş krediler aracılığıyla yapılan saldırıları dikkatlice dikkate almalıdır.
- **Token flaş basıma (flash minting) izin vermez**. Flaş basım, bakiye ve toplam arzda önemli dalgalanmalara yol açabilir, bu da Token'ın işleyişinde katı ve kapsamlı taşma kontrollerini gerektirir.
## Bilinen standart dışı ERC-20 Token'ları {#known-non-standard-erc20-tokens}

Herhangi bir Token ile entegrasyona izin veren protokoller, iyi bilinen bazı standart dışı ERC-20 Token'larını düzgün bir şekilde ele almaya özen göstermelidir. Ek riskler taşıyan iyi bilinen Token'lar için [standart dışı Token'lar listesine](https://secure-contracts.com/development-guidelines/non-standard-tokens.html) başvurun.

## ERC-721 Token'ları {#erc721-tokens}

### ERC-721 uyumluluk kontrolleri {#erc721-conformity-checks}

Belirli sözleşmelerin davranışı orijinal ERC spesifikasyonundan farklı olabilir. Aşağıdaki koşulları manuel olarak inceleyin:

- **0x0 adresine yapılan Token transferleri geri alınır.** Bazı Token'lar 0x0'a transferlere izin verir ve bu adrese gönderilen Token'ların yakıldığını (burn) varsayar; ancak ERC-721 standardı bu tür transferlerin geri alınmasını gerektirir.
- **`safeTransferFrom` işlevleri doğru imza ile uygulanır.** Bazı Token sözleşmeleri bu işlevleri uygulamaz. NFT'leri bu sözleşmelerden birine transfer etmek varlık kaybına neden olabilir.
- **Kullanılıyorsa `name`, `decimals` ve `symbol` işlevleri mevcuttur.** Bu işlevler ERC-721 standardında isteğe bağlıdır ve mevcut olmayabilir.
- **Kullanılıyorsa, `decimals` bir `uint8(0)` döndürür.** Diğer değerler geçersizdir.
- **`name` ve `symbol` işlevleri boş bir dize döndürebilir.** Bu davranışa standart tarafından izin verilir.
- **`tokenId` geçersizse veya zaten yakılmış bir Token'ı ifade ediyorsa `ownerOf` işlevi geri alınır.** İşlev 0x0 döndüremez. Bu davranış standart tarafından gereklidir ancak her zaman doğru şekilde uygulanmayabilir.
- **Bir NFT'nin transferi onaylarını temizler.** Bu, standart tarafından gereklidir.
- **Bir NFT'nin Token kimliği (ID) ömrü boyunca değiştirilemez.** Bu, standart tarafından gereklidir.

### ERC-721 standardının yaygın riskleri {#common-risks-of-the-erc721-standard}

Aşağıdaki koşulların manuel incelemesini yaparak ERC-721 sözleşmeleriyle ilişkili riskleri hafifletin:

- **`onERC721Received` geri çağrısı (callback) dikkate alınır.** Transfer işlevlerindeki harici çağrılar, özellikle geri çağrı açık olmadığında (örneğin, [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code) çağrılarında) yeniden girişlere (reentrancy) yol açabilir.
- **Bir NFT basıldığında, güvenli bir şekilde bir akıllı sözleşmeye transfer edilir.** Bir basım işlevi varsa, `safeTransferFrom` işlevine benzer şekilde davranmalı ve yeni Token'ların bir akıllı sözleşmeye basımını düzgün bir şekilde ele alarak varlık kaybını önlemelidir.
- **Bir Token'ın yakımı onaylarını temizler.** Bir yakım işlevi varsa, Token'ın önceki onaylarını temizlemelidir.
