---
title: "Tokenler katman 2'ye nasıl köprülenir"
description: "Bir köprü kullanarak tokenleri Ethereum'dan katman 2'ye nasıl taşıyacağınızı açıklayan bir rehber."
lang: tr
---

Ethereum'da çok fazla trafik varsa, pahalı hale gelebilir. Buna bir çözüm, yeni "katmanlar" oluşturmaktır: yani, Ethereum'un kendisine benzer şekillerde çalışan farklı ağlar. Katman 2 (L2) olarak adlandırılan bu ağlar, çok daha fazla işlemi daha düşük ücretlerle işleyerek ve bunların sonucunu yalnızca ara sıra Ethereum'da depolayarak Ethereum'daki tıkanıklığı ve maliyeti azaltmaya yardımcı olur. Bu nedenle, bu katman 2'ler artan hız ve azalan maliyetlerle işlem yapmamızı sağlar. Birçok popüler kripto projesi bu avantajlar nedeniyle katman 2'lere geçiyor. Tokenleri Ethereum'dan katman 2'ye taşımanın en basit yolu bir köprü kullanmaktır.

**Ön koşul:** 

- bir kripto cüzdanına sahip olmak—eğer yoksa, [bir Ethereum hesabı oluşturmak](/guides/how-to-create-an-ethereum-account/) için bu rehberi izleyin
- cüzdanınıza fon eklemek

## 1. Hangi katman 2 ağını kullanmak istediğinizi belirleyin {#1-determine-which-layer-2-network-you-want-to-use}

Farklı projeler ve önemli bağlantılar hakkında daha fazla bilgiyi [katman 2 sayfamızda](/layer-2/) bulabilirsiniz.

## 2. Seçilen köprüye gidin {#2-go-to-the-selected-bridge}

Bazı popüler katman 2'ler şunlardır:

- [Arbitrum köprüsü](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Optimism köprüsü](https://app.optimism.io/bridge/deposit)
- [Boba ağı köprüsü](https://hub.boba.network/)

## 3. Cüzdanınızla köprüye bağlanın {#3-connect-to-the-bridge-with-your-wallet}

Cüzdanınızın Ethereum Ana Ağı'na bağlı olduğundan emin olun. Eğer bağlı değilse, web sitesi sizden otomatik olarak ağ değiştirmenizi isteyecektir.

![Common interface for bridging tokens](./bridge1.png)

## 4. Miktarı belirleyin ve fonları taşıyın {#4-specify-the-amount-and-move-the-funds}

Hoş olmayan sürprizlerden kaçınmak için katman 2 ağında karşılığında alacağınız miktarı ve ücretleri gözden geçirin.

![Common interface for bridging tokens](./bridge2.png)

## 5. Cüzdanınızdaki işlemi onaylayın {#5-confirm-the-transaction-in-your-wallet}

İşlemin gerçekleştirilmesi için ETH cinsinden bir ücret ([gaz](/glossary/#gas) olarak adlandırılır) ödemeniz gerekecektir.

![Common interface for bridging tokens](./bridge3.png)

## 6. Fonlarınızın taşınmasını bekleyin {#6-wait-for-your-funds-to-be-moved}

Bu işlem 10 dakikadan fazla sürmemelidir.

## 7. Seçilen katman 2 ağını cüzdanınıza ekleyin (isteğe bağlı) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

Ağın RPC ayrıntılarını bulmak için [chainlist.org](https://chainlist.org) adresini kullanabilirsiniz. Ağ eklendikten ve işlem bittikten sonra, tokenleri cüzdanınızda görmelisiniz.
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Daha fazlasını öğrenmek ister misiniz?</div>
  <ButtonLink href="/guides/">
    Diğer rehberlerimize göz atın
  </ButtonLink>
</AlertContent>
</Alert>

## Sıkça sorulan sorular {#frequently-asked-questions}

### Ya bir borsada fonlarım varsa? {#what-if-i-have-funds-on-an-exchange}

Bir borsadan doğrudan bazı katman 2'lere para çekebilirsiniz. Daha fazla bilgi için [Katman 2 sayfamızın](/layer-2/) "Katman 2'ye taşı" bölümüne göz atın.

### Tokenlerimi L2'ye köprüledikten sonra Ethereum ana ağına geri dönebilir miyim? {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

Evet, aynı köprüyü kullanarak fonlarınızı her zaman ana ağa geri taşıyabilirsiniz.
