---
title: ERC-777 Token Standardı
description:
lang: tr
---

## Giriş {#introduction}

ERC-777, mevcut [ERC-20](/developers/docs/standards/tokens/erc-20/) standardını geliştiren bir değiştirilebilir token standardıdır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamanız için, ilk olarak [ERC-20](/developers/docs/standards/tokens/erc-20/) hakkında okuma yapmanızı öneririz.

## ERC-777, ERC-20 üzerine ne tür gelişmeler önerir? {#-erc-777-vs-erc-20}

ERC-777, ERC-20 üzerine aşağıdaki gelişmeleri sağlar.

### Kancalar {#hooks}

Kancalar, bir akıllı sözleşmenin kodunda açıklanan bir fonksiyondur. Kancalar, token'lar sözleşme aracılığıyla gönderildiğinde veya alındığında çağrılır. Bu, bir akıllı sözleşmenin gelen veya giden token'lara tepki vermesini sağlar.

Kancalar, [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) standardı kullanılarak kaydedilir ve keşfedilir.

#### Kancalar neden kullanışlıdır? {#why-are-hooks-great}

1. Kancalar, bir sözleşmeye token göndermeyi ve sözleşmeyi tek bir işlemde bilgilendirmeyi sağlar, bunun aksine [ERC-20](https://eips.ethereum.org/EIPS/eip-20) ise bunu başarmak için çift çağrı (`approve`/`transferFrom`) gerektirir.
2. Kayıtlı kancalara sahip olmayan sözleşmeler ERC-777 ile uyumsuzlardır. Gönderen sözleşme, alıcı sözleşme bir kanca kaydetmediyse işlemi iptal eder. Bu, ERC-777 dışındaki akıllı sözleşmelere yanlışlıkla transfer yapılmasını önler.
3. Kancalar işlemleri reddedebilirler.

### Ondalıklar {#decimals}

Standart ayrıca ERC-20'de oluşan `decimals` hakkındaki kafa karışıklığını çözer. Bu netlik, geliştirici deneyimini geliştirir.

### ERC-20 ile geriye doğru uyumluluk {#backwards-compatibility-with-erc-20}

ERC-777 sözleşmeleri ile sanki ERC-20 sözleşmeleriymiş gibi etkileşime geçilebilir.

## Daha fazla bilgi {#further-reading}

[EIP-777: Token Standardı](https://eips.ethereum.org/EIPS/eip-777)
