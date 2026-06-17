---
title: ERC-777 Token Standardı
description: Güvenlik nedeniyle ERC-20 önerilse de, kancalara (hooks) sahip geliştirilmiş bir misli token standardı olan ERC-777 hakkında bilgi edinin.
lang: tr
---

## Uyarı {#warning}

**ERC-777'nin [farklı saldırı türlerine karşı duyarlılığı](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620) nedeniyle doğru bir şekilde uygulanması zordur. Bunun yerine [ERC-20](/developers/docs/standards/tokens/erc-20/) kullanılması önerilir.** Bu sayfa tarihi bir arşiv olarak kalmaktadır.

## Giriş? {#introduction}

ERC-777, mevcut [ERC-20](/developers/docs/standards/tokens/erc-20/) standardını geliştiren bir misli token standardıdır.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [ERC-20](/developers/docs/standards/tokens/erc-20/) hakkında okumanızı öneririz.

## ERC-777, ERC-20'ye göre hangi iyileştirmeleri sunar? {#-erc-777-vs-erc-20}

ERC-777, ERC-20'ye göre aşağıdaki iyileştirmeleri sağlar.

### Kancalar {#hooks}

Kancalar, bir akıllı sözleşme kodunda tanımlanan bir işlevdir. Kancalar, sözleşme aracılığıyla Token gönderildiğinde veya alındığında çağrılır. Bu, bir akıllı sözleşmenin gelen veya giden Token'lara tepki vermesini sağlar.

Kancalar, [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) standardı kullanılarak kaydedilir ve keşfedilir.

#### Kancalar neden harikadır? {#why-are-hooks-great}

1. Kancalar, bunu başarmak için çift çağrı (`approve`/`transferFrom`) gerektiren [ERC-20](https://eips.ethereum.org/EIPS/eip-20)'nin aksine, tek bir işlemde bir sözleşmeye Token göndermeye ve sözleşmeyi bilgilendirmeye olanak tanır.
2. Kanca kaydetmemiş sözleşmeler ERC-777 ile uyumsuzdur. Alıcı sözleşme bir kanca kaydetmediğinde, gönderen sözleşme işlemi iptal edecektir. Bu, ERC-777 olmayan akıllı sözleşmelere yanlışlıkla yapılan transferleri önler.
3. Kancalar işlemleri reddedebilir.

### Ondalıklar {#decimals}

Standart ayrıca ERC-20'de `decimals` etrafında oluşan kafa karışıklığını da çözer. Bu netlik, geliştirici deneyimini iyileştirir.

### ERC-20 ile geriye dönük uyumluluk {#backwards-compatibility-with-erc-20}

ERC-777 sözleşmeleriyle, sanki ERC-20 sözleşmeleriymiş gibi etkileşime girilebilir.

## Daha Fazla Okuma {#further-reading}

[EIP-777: Token Standardı](https://eips.ethereum.org/EIPS/eip-777)