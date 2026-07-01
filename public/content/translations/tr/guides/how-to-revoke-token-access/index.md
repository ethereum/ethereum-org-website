---
title: "Kripto fonlarınıza olan akıllı sözleşme erişimi nasıl iptal edilir"
description: "Kötü niyetli akıllı sözleşme token erişimini iptal etme üzerine bir nasıl yapılır rehberi"
lang: tr
---

Bu rehber, fonlarınıza erişim izni verdiğiniz tüm [akıllı sözleşmelerin](/glossary/#smart-contract) bir listesini nasıl görüntüleyeceğinizi ve bunları nasıl iptal edeceğinizi öğretecektir.

Bazen kötü niyetli geliştiriciler, akıllı sözleşmelerle etkileşime giren habersiz kullanıcıların fonlarına erişim sağlayan arka kapılar inşa ederler. Sıklıkla olan şey, bu tür platformların gelecekte küçük miktarlarda [gaz](/glossary/#gas) tasarrufu yapmak amacıyla kullanıcıdan **sınırsız sayıda token** harcama izni istemesidir, ancak bu artan bir riskle birlikte gelir.

Bir platform [cüzdanınızdaki](/glossary/#wallet) bir token üzerinde sınırsız erişim hakkına sahip olduğunda, fonlarınızı onların platformundan cüzdanınıza çekmiş olsanız bile tüm bu token'ları harcayabilirler. Kötü niyetli aktörler fonlarınıza erişmeye devam edebilir ve sizin için hiçbir kurtarma seçeneği bırakmadan bunları kendi cüzdanlarına çekebilirler.

Tek koruma yöntemi, test edilmemiş yeni projeleri kullanmaktan kaçınmak, yalnızca ihtiyacınız olanı onaylamak veya erişimi düzenli olarak iptal etmektir. Peki, bunu nasıl yaparsınız?

## 1. Adım: Erişim iptal etme araçlarını kullanın {#step-1-use-revoke-access-tools}

Çeşitli web siteleri, adresinize bağlı akıllı sözleşmeleri görüntülemenize ve iptal etmenize olanak tanır. Web sitesini ziyaret edin ve cüzdanınızı bağlayın:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (birden fazla ağ)
- [Unrekt](https://app.unrekt.net/) (birden fazla ağ)
- [EverRevoke](https://everrise.com/everrevoke/) (birden fazla ağ)

## 2. Adım: Cüzdanınızı bağlayın {#step-2-connect-your-wallet}

Web sitesine girdikten sonra "Cüzdanı bağla" (Connect wallet) seçeneğine tıklayın. Web sitesi cüzdanınızı bağlamanızı isteyecektir.

Cüzdanınızda ve web sitesinde aynı ağı kullandığınızdan emin olun. Yalnızca seçilen ağla ilgili akıllı sözleşmeleri göreceksiniz. Örneğin, Ethereum Ana Ağı'na bağlanırsanız, Polygon gibi diğer zincirlerdeki sözleşmeleri değil, yalnızca Ethereum sözleşmelerini görürsünüz.

## 3. Adım: İptal etmek istediğiniz bir akıllı sözleşmeyi seçin {#step-3-select-a-smart-contract-you-wish-to-revoke}

Token'larınıza erişim izni verilen tüm sözleşmeleri ve bunların harcama limitlerini görmelisiniz. Sonlandırmak istediğinizi bulun.

Hangi sözleşmeyi seçeceğinizi bilmiyorsanız, hepsini iptal edebilirsiniz. Bu sizin için herhangi bir sorun yaratmayacaktır, ancak bu sözleşmelerden herhangi biriyle bir sonraki etkileşiminizde yeni bir izin seti vermeniz gerekecektir.

## 4. Adım: Fonlarınıza erişimi iptal edin {#step-4-revoke-access-to-your-funds}

İptal et (revoke) seçeneğine tıkladığınızda, cüzdanınızda yeni bir işlem önerisi görmelisiniz. Bu beklenen bir durumdur. İptal işleminin başarılı olması için ücreti ödemeniz gerekecektir. Ağa bağlı olarak bunun işlenmesi bir dakikadan birkaç dakikaya kadar sürebilir.

İptal edilen sözleşmenin listeden kaybolup kaybolmadığını iki kez kontrol etmek için birkaç dakika sonra iptal aracını yenilemenizi ve cüzdanınızı tekrar bağlamanızı tavsiye ederiz.

<mark>Projelere token'larınıza sınırsız erişim izni vermemenizi ve tüm token harcama izni erişimlerini düzenli olarak iptal etmenizi öneririz. Token erişimini iptal etmek, özellikle yukarıda listelenen araçları kullanıyorsanız, asla fon kaybıyla sonuçlanmamalıdır.</mark>

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

### Token erişimini iptal etmek staking, havuzlama, borç verme vb. işlemleri de sonlandırır mı? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Hayır, [merkeziyetsiz finans (DeFi)](/glossary/#defi) stratejilerinizin hiçbirini etkilemeyecektir. Pozisyonlarınızda kalmaya ve ödüller vb. almaya devam edeceksiniz.

### Bir cüzdanın projeyle bağlantısını kesmek, fonlarımı kullanma iznini kaldırmakla aynı şey midir? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Hayır, cüzdanınızın projeyle bağlantısını kesseniz bile token harcama izni verdiyseniz, bu token'ları kullanmaya devam edebilirler. Bu erişimi iptal etmeniz gerekir.

### Sözleşme izninin süresi ne zaman dolacak? {#when-will-the-contract-permission-expire}

Sözleşme izinlerinde son kullanma tarihi yoktur. Sözleşme izinleri verirseniz, verildikten yıllar sonra bile kullanılabilirler.

### Projeler neden sınırsız token harcama izni belirliyor? {#why-do-projects-set-unlimited-token-allowance}

Projeler bunu genellikle gereken istek sayısını en aza indirmek için yapar, yani kullanıcının yalnızca bir kez onaylaması ve işlem ücretini yalnızca bir kez ödemesi gerekir. Kullanışlı olsa da, zamanla kanıtlanmamış veya denetlenmemiş sitelerde kullanıcıların dikkatsizce onaylaması tehlikeli olabilir. Bazı cüzdanlar, riskinizi sınırlamak için onaylanan token miktarını manuel olarak kısıtlamanıza olanak tanır. Daha fazla bilgi için cüzdan sağlayıcınıza danışın.
