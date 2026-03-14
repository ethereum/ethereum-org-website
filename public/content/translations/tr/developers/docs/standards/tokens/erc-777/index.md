---
title: "ERC-777 Token Standardı"
description: "Güvenlik nedeniyle ERC-20 önerilse de, kancalara sahip geliştirilmiş bir değiştirilebilir jeton standardı olan ERC-777 hakkında bilgi edinin."
lang: tr
---

## Uyarı {#warning}

**ERC-777'nin, [farklı saldırı biçimlerine karşı savunmasızlığı](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620) nedeniyle düzgün bir şekilde uygulanması zordur. Bunun yerine [ERC-20](/developers/docs/standards/tokens/erc-20/) kullanılması önerilir.** Bu sayfa, tarihsel bir arşiv olarak kalır.

## Giriş {#introduction}

ERC-777, mevcut [ERC-20](/developers/docs/standards/tokens/erc-20/) standardını geliştiren bir değiştirilebilir jeton standardıdır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [ERC-20](/developers/docs/standards/tokens/erc-20/) hakkında bilgi edinmenizi öneririz.

## ERC-777, ERC-20'nin üzerine ne tür iyileştirmeler önerir? {#-erc-777-vs-erc-20}

ERC-777, ERC-20'nin üzerine aşağıdaki iyileştirmeleri sağlar.

### Kancalar {#hooks}

Kancalar, bir akıllı sözleşmenin kodunda açıklanan bir fonksiyondur. Kancalar, jetonlar sözleşme aracılığıyla gönderildiğinde veya alındığında çağrılır. Bu, bir akıllı sözleşmenin gelen veya giden jetonlara tepki vermesini sağlar.

Kancalar, [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) standardı kullanılarak kaydedilir ve keşfedilir.

#### Kancalar neden kullanışlıdır? {#why-are-hooks-great}

1. Kancalar, bir sözleşmeye jeton göndermeyi ve sözleşmeyi tek bir işlemde bilgilendirmeyi sağlar; bunun aksine [ERC-20](https://eips.ethereum.org/EIPS/eip-20) ise bunu başarmak için çift çağrı (`approve`/`transferFrom`) gerektirir.
2. Kayıtlı kancalara sahip olmayan sözleşmeler ERC-777 ile uyumsuzlardır. Gönderen sözleşme, alıcı sözleşme bir kanca kaydetmediyse işlemi iptal eder. Bu, ERC-777 dışındaki akıllı sözleşmelere yanlışlıkla transfer yapılmasını önler.
3. Kancalar işlemleri reddedebilirler.

### Ondalıklar {#decimals}

Standart ayrıca ERC-20'de `decimals` kaynaklı kafa karışıklığını da çözer. Bu netlik, geliştirici deneyimini geliştirir.

### ERC-20 ile geriye dönük uyumluluk {#backwards-compatibility-with-erc-20}

ERC-777 sözleşmeleri ile sanki ERC-20 sözleşmeleriymiş gibi etkileşime geçilebilir.

## Ek Okumalar {#further-reading}

[EIP-777: Jeton Standardı](https://eips.ethereum.org/EIPS/eip-777)
