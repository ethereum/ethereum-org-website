---
title: "Jetonlar katman 2'ye nasıl köprülenir?"
description: "Bir köprü kullanarak Ethereum üzerinden katman 2'ye token hareket ettirmeyi açıklayan rehber."
lang: tr
---

# Jetonlar katman 2'ye nasıl köprülenir?

Ethereum üzerinde çok trafik varsa, pahalılaşabilir. Buna bir çözüm, yeni "katmanlar" oluşturmaktır: yani, Ethereum'un kendisine benzer şekilde çalışan farklı ağlar. Bu Katman 2'ler daha birçok işlemi daha düşük ücretlerde alarak ve bu işlemlerin sonuçlarını arada sırada Ethereum üzerinde depolayarak Ethereum üzerinde tıkanmayı çnlemeye ve ücretleri azaltmaya katkı sağlar. Yani, bu katman 2'ler artmış hız ve düşmüş ücretler ile işlem yapmamızı sağlar. Birçok popüler kripto projesi bu faydalar sebebiyle katman 2'lere geçiş yapmaktadır. Token'ları Ethereum'dan katman 2'lere hareket ettirmenin en kolay yolu köprü kullanmaktır.

**Ön koşullar:**

- bir kripto cüzdanınız olsun—eğer yoksa, [bir Ethereum hesabı oluşturmak](/guides/how-to-create-an-ethereum-account/) için bu kılavuzu takip edin
- cüzdanınıza fon ekleme

## 1. Hangi katman 2 ağını kullanmak istediğinizi belirleyin

Farklı projeler ve önemli bağlantılar hakkında daha fazla bilgiyi [Katman 2 sayfamızdan](/layer-2/) edinebilirsiniz.

## 2. Seçili köprüye gidin

Bazı popüler katman 2'ler:

- [Arbitrum köprüsü](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Optimism köprüsü](https://app.optimism.io/bridge/deposit)
- [Boba network köprüsü](https://hub.boba.network/)

## 3. Cüzdanınızla köprüye bağlanın

Cüzdanınızın Ethereum Ana Ağı'na bağlandığından emin olun. Eğer değilse, web sitesi otomatik olarak sizi ağ değiştirmeye yönlendirecektir.

![Jeton köprüleme için ortak arayüz](./bridge1.png)

## 4. Miktarı belirtin ve fonları aktarın

Tatsız sürprizler yaşamamak için katman 2 ağında alacağınız miktarı ve ücretleri gözden geçirin.

![Jeton köprüleme için ortak arayüz](./bridge2.png)

## 5. Cüzdanınızda işlemi doğrulayın

İşlemin işlenmesi için ETH cinsinden, ([gaz](/glossary/#gas) olarak adlandırılan) bir ücret ödemeniz gerekecek.

![Jeton köprüleme için ortak arayüz](./bridge3.png)

## 6. Fonlarınızın hareket etmesini bekleyin

Süreç 10 dakikadan fazla sürmemelidir.

## 7. Seçili katman 2 ağını cüzdanınıza ekleyin (opsiyonel)

Ağın RPC ayrıntılarını bulmak için [chainlist.org](http://chainlist.org) adresini kullanabilirsiniz. Ağ eklendiğinde ve işlem sonlandığında, token'ları cüzdanınızda görmelisiniz. <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Daha fazlasını mı öğrenmek istiyorsunuz?</div>
  <ButtonLink href="/guides/">
    Diğer rehberlerimizi inceleyin
  </ButtonLink>
</AlertContent>
</Alert>

## Sıkça sorulan sorular

### Peki bir borsada fonlarım varsa?

Bir borsa üzerinden bazı katman 2'lere doğrudan para çekebilirsiniz. Daha fazla bilgi için [Katman 2 sayfamızın](/layer-2/) “Katman 2'ye aktar” bölümünü inceleyin.

### Token'larımı L2'ye köprüledikten sonra Ethereum ana ağına geri dönebilir miyim?

Evet, aynı köprüyü kullanarak her zaman fonlarınızı ana ağa geri aktarabilirsiniz.
