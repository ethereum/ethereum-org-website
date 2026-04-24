---
title: "Gaz ücretlerine sponsor olmak: Kullanıcılarınızın işlem maliyetlerini nasıl karşılayabilirsiniz"
description: "Bir özel anahtar ve adres oluşturmak kolaydır; bu sadece doğru yazılımı çalıştırma meselesidir. Ancak dünyada işlem göndermek için ETH almanın çok daha zor olduğu birçok yer var. Bu eğitimde, akıllı sözleşmenizde kullanıcı tarafından imzalanmış, zincirdışı yapılandırılmış verileri yürütmek için zinciriçi gaz maliyetlerini nasıl karşılayacağınızı öğreneceksiniz. Kullanıcıya işlem bilgilerini içeren bir yapıyı imzalatırsınız ve ardından zincirdışı kodunuz bunu blokzincire bir işlem olarak gönderir."
author: Ori Pomerantz
tags: ["gazsız", "Solidity", "EIP-712", "meta işlemler"]
skill: intermediate
breadcrumb: "Gaz sponsorluğu"
lang: tr
published: 2026-02-27
---

## Giriş {#introduction}

Ethereum'un [bir milyar insana daha](https://blog.ethereum.org/category/next-billion) hizmet etmesini istiyorsak, sürtünmeyi ortadan kaldırmalı ve kullanımını olabildiğince kolaylaştırmalıyız. Bu sürtünmenin bir kaynağı, gaz ücretlerini ödemek için ETH'ye duyulan ihtiyaçtır.

Kullanıcılardan para kazanan bir merkeziyetsiz uygulamanız (dapp) varsa, kullanıcıların sunucunuz üzerinden işlem göndermesine izin vermek ve işlem ücretlerini kendiniz ödemek mantıklı olabilir. Kullanıcılar cüzdanlarında hala bir [EIP-712 yetkilendirme mesajı](https://eips.ethereum.org/EIPS/eip-712) imzaladıkları için Ethereum'un bütünlük garantilerini korurlar. Kullanılabilirlik, işlemleri ileten sunucuya bağlıdır, bu nedenle daha sınırlıdır. Ancak, kullanıcıların akıllı sözleşmeye doğrudan erişebilmeleri (eğer ETH alırlarsa) ve işlemlere sponsor olmak isteyen başkalarının kendi sunucularını kurabilmeleri için her şeyi ayarlayabilirsiniz.

Bu eğitimdeki teknik yalnızca akıllı sözleşmeyi siz kontrol ettiğinizde işe yarar. Gelecekteki bir eğitimde ele almayı umduğum, diğer akıllı sözleşmelere yönelik işlemlere sponsor olmanızı sağlayan [hesap soyutlama](https://eips.ethereum.org/EIPS/eip-4337) da dahil olmak üzere başka teknikler de vardır.

Not: Bu, üretim düzeyinde bir kod _değildir_. Önemli saldırılara karşı savunmasızdır ve temel özelliklerden yoksundur. Bu kılavuzun [güvenlik açıkları bölümünde](#vulnerabilities) daha fazla bilgi edinebilirsiniz.

### Ön koşullar {#prerequisites}

Bu eğitimi anlamak için şunlara zaten aşina olmanız gerekir:

- Solidity
- JavaScript
- React ve WAGMI. Bu kullanıcı arayüzü araçlarına aşina değilseniz, [bunun için bir eğitimimiz var](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## Örnek uygulama {#sample-app}

Buradaki örnek uygulama, Hardhat'in `Greeter` sözleşmesinin bir varyantıdır. Bunu [GitHub'da](https://github.com/qbzzt/260301-gasless) görebilirsiniz. Akıllı sözleşme halihazırda [Sepolia](https://sepolia.dev/) üzerinde, [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA) adresinde dağıtılmıştır.

Bunu çalışırken görmek için şu adımları izleyin.

1. Depoyu klonlayın ve gerekli yazılımı yükleyin.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. `PRIVATE_KEY` değerini Sepolia'da ETH'si olan bir cüzdana ayarlamak için `.env` dosyasını düzenleyin. Sepolia ETH'ye ihtiyacınız varsa, [bir musluk kullanın](/developers/docs/networks/#sepolia). İdeal olarak, bu özel anahtar tarayıcı cüzdanınızdakinden farklı olmalıdır.

3. Sunucuyu başlatın.

   ```sh
   npm run dev
   ```

4. [`http://localhost:5173`](http://localhost:5173) URL'sindeki uygulamaya gidin.

5. Bir cüzdana bağlanmak için **Connect with Injected** seçeneğine tıklayın. Cüzdanda onaylayın ve gerekirse Sepolia'ya geçişi onaylayın.

6. Yeni bir selamlama yazın ve **Update greeting via sponsor** seçeneğine tıklayın.

7. Mesajı imzalayın.

8. Yaklaşık 12 saniye (Sepolia'daki blok süresi) bekleyin. Beklerken işlemi görmek için sunucu konsolundaki URL'ye bakabilirsiniz.

9. Selamlamanın değiştiğini ve son güncelleyen adres değerinin artık tarayıcı cüzdanınızın adresi olduğunu görün.

Bunun nasıl çalıştığını anlamak için mesajın kullanıcı arayüzünde nasıl oluşturulduğuna, sunucu tarafından nasıl iletildiğine ve akıllı sözleşmenin onu nasıl işlediğine bakmamız gerekir.

### Kullanıcı arayüzü {#ui-changes}

Kullanıcı arayüzü [WAGMI](https://wagmi.sh/) tabanlıdır; bunun hakkında [bu eğitimde](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) okuyabilirsiniz.

Mesajı şu şekilde imzalıyoruz:

```js
const signGreeting = useCallback(
```

React kancası (hook) [`useCallback`](https://react.dev/reference/react/useCallback), bileşen yeniden çizildiğinde aynı işlevi yeniden kullanarak performansı artırmamızı sağlar.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

Eğer bir hesap yoksa, bir hata oluşturun. Bu asla gerçekleşmemelidir çünkü `signGreeting` işlevini çağıran süreci başlatan kullanıcı arayüzü düğmesi bu durumda devre dışı bırakılır. Ancak, gelecekteki programcılar bu korumayı kaldırabilir, bu nedenle bu koşulu burada da kontrol etmek iyi bir fikirdir.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

[Etki alanı ayırıcısı (domain separator)](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) için parametreler. Bu değer sabittir, bu nedenle daha iyi optimize edilmiş bir uygulamada, işlev her çağrıldığında yeniden hesaplamak yerine bir kez hesaplayabiliriz.

- `name`, imzalar ürettiğimiz merkeziyetsiz uygulamanın (dapp) adı gibi kullanıcı tarafından okunabilir bir addır.
- `version` sürümdür. Farklı sürümler uyumlu değildir.
- `chainId`, [WAGMI tarafından](https://wagmi.sh/react/api/hooks/useChainId) sağlandığı şekliyle kullandığımız zincirdir.
- `verifyingContract`, bu imzayı doğrulayacak sözleşme adresidir. Birden fazla `Greeter` sözleşmesi olması ve bunların farklı selamlamalara sahip olmasını istememiz durumunda, aynı imzanın birden fazla sözleşmeye uygulanmasını istemeyiz.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

İmzaladığımız veri türü. Burada tek bir parametremiz var, `greeting`, ancak gerçek hayattaki sistemler genellikle daha fazlasına sahiptir.

```js
        const message = { greeting }
```

İmzalamak ve göndermek istediğimiz asıl mesaj. `greeting` hem alan adıdır hem de onu dolduran değişkenin adıdır.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

İmzayı gerçekten alın. Bu işlev asenkrondur çünkü kullanıcıların verileri imzalaması (bir bilgisayarın bakış açısından) uzun zaman alır.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

İşlev tek bir onaltılık (hexadecimal) değer döndürür. Burada onu alanlara ayırıyoruz.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Bu değişkenlerden herhangi biri değişirse, işlevin yeni bir örneğini oluşturun. `account` ve `chainId` parametreleri kullanıcı tarafından cüzdanda değiştirilebilir. `contractAddr`, zincir kimliğinin (chain Id) bir işlevidir. `signTypedDataAsync` değişmemelidir, ancak onu [bir kancadan (hook)](https://wagmi.sh/react/api/hooks/useSignTypedData) içe aktarıyoruz, bu yüzden emin olamayız ve onu buraya eklemek en iyisidir.

Artık yeni selamlama imzalandığına göre, onu sunucuya göndermemiz gerekiyor.

```js
  const sponsoredGreeting = async () => {
    try {
```

Bu işlev bir imza alır ve onu sunucuya gönderir.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Geldiğimiz sunucudaki `/server/sponsor` yoluna gönderin.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Bilgileri JSON kodlu olarak göndermek için `POST` kullanın.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Yanıtın çıktısını alın. Bir üretim sisteminde yanıtı kullanıcıya da gösterirdik.

### Sunucu {#server}

Ön uç (front-end) olarak [Vite](https://vite.dev/) kullanmayı seviyorum. React kütüphanelerini otomatik olarak sunar ve ön uç kodu değiştiğinde tarayıcıyı günceller. Ancak Vite, arka uç (backend) araçlarını içermez.

Çözüm [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js) içindedir.

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Geri kalan her şeyi Vite halletsin
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

Önce kendi işlediğimiz istekler için bir işleyici kaydederiz (`/server/sponsor` yoluna `POST`). Ardından diğer tüm URL'leri işlemek için bir Vite sunucusu oluşturur ve kullanırız.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Bu sadece standart bir [viem](https://viem.sh/) blokzincir çağrısıdır.

### Akıllı sözleşme {#smart-contract}

Son olarak, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) dosyasının imzayı doğrulaması gerekir.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Kurucu (constructor), yukarıdaki kullanıcı arayüzü koduna benzer şekilde [etki alanı ayırıcısını](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) oluşturur. Blokzincir yürütmesi çok daha pahalıdır, bu yüzden onu yalnızca bir kez hesaplarız.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

İmzalanan yapı budur. Burada sadece bir alanımız var.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Bu, [yapı tanımlayıcısıdır](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Kullanıcı arayüzünde her seferinde hesaplanır.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Bu işlev imzalı bir istek alır ve selamlamayı günceller.

```solidity
        // EIP-712 özetini hesapla
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Özeti (digest) [EIP 712](https://eips.ethereum.org/EIPS/eip-712)'ye uygun olarak oluşturun.

```solidity
        // İmzalayanı kurtar
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

İmzalayanın adresini almak için [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) kullanın. Kötü bir imzanın yine de geçerli bir adresle, sadece rastgele bir adresle sonuçlanabileceğini unutmayın.

```solidity
        // Selamlamayı sanki imzalayan çağırmış gibi uygula
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Selamlamayı güncelleyin.

## Güvenlik açıkları {#vulnerabilities}

Bu, üretim düzeyinde bir kod _değildir_. Önemli saldırılara karşı savunmasızdır ve temel özelliklerden yoksundur. İşte bazıları ve bunların nasıl çözüleceği.

Bu saldırılardan bazılarını görmek için _Attacks_ başlığı altındaki düğmelere tıklayın ve ne olduğunu görün. **Invalid signature** düğmesi için, işlem yanıtını görmek üzere sunucu konsolunu kontrol edin.

### Sunucuda hizmet reddi (Denial of service) {#dos-on-server}

En kolay saldırı, sunucuya yönelik bir [hizmet reddi (denial-of-service)](https://en.wikipedia.org/wiki/Denial-of-service_attack) saldırısıdır. Sunucu, İnternet'in herhangi bir yerinden istekler alır ve bu isteklere dayanarak işlemler gönderir. Bir saldırganın geçerli veya geçersiz bir dizi imza yayınlamasını engelleyen hiçbir şey yoktur. Her biri bir işleme neden olacaktır. Sonunda sunucunun gaz ödemek için ETH'si tükenecektir.

Bu sorunun bir çözümü, oranı blok başına bir işlemle sınırlamaktır. Amaç [harici olarak sahip olunan hesaplara (externally owned accounts)](/developers/docs/accounts/#key-differences) selamlamalar göstermekse, bloğun ortasındaki selamlamanın ne olduğunun zaten bir önemi yoktur.

Başka bir çözüm de adresleri takip etmek ve yalnızca geçerli müşterilerden gelen imzalara izin vermektir.

### Yanlış selamlama imzaları {#wrong-greeting-sigs}

**Signature for wrong greeting** seçeneğine tıkladığınızda, belirli bir adres (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) ve selamlama (`Hello`) için geçerli bir imza gönderirsiniz. Ancak bunu farklı bir selamlama ile gönderir. Bu, selamlamayı değiştiren ancak yanlış adrese sahip olan `ecrecover` işlevinin kafasını karıştırır.

Bu sorunu çözmek için adresi [imzalı yapıya](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124) ekleyin. Bu şekilde, `ecrecover` rastgele adresi imzadaki adresle eşleşmeyecek ve akıllı sözleşme mesajı reddedecektir.

### Tekrar (Replay) saldırıları {#replay-attack}

**Replay attack** seçeneğine tıkladığınızda, aynı "Ben 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e'yim ve selamlamanın `Hello` olmasını istiyorum" imzasını, ancak doğru selamlama ile gönderirsiniz. Sonuç olarak, akıllı sözleşme (size ait olmayan) adresin selamlamayı tekrar `Hello` olarak değiştirdiğine inanır. Bunu yapmak için gereken bilgiler [işlem bilgilerinde](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1) herkese açıktır.

Eğer bu bir sorunsa, çözümlerden biri bir [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) eklemektir. Adresler ve sayılar arasında bir [eşleme (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types) oluşturun ve imzaya bir nonce alanı ekleyin. Nonce alanı adresin eşlemesiyle eşleşirse, imzayı kabul edin ve bir sonraki sefer için eşlemeyi artırın. Eşleşmezse, işlemi reddedin.

Başka bir çözüm de imzalanan veriye bir zaman damgası eklemek ve imzayı yalnızca o zaman damgasından sonraki birkaç saniye için geçerli kabul etmektir. Bu daha basit ve daha ucuzdur, ancak zaman penceresi içinde tekrar saldırıları riskiyle ve zaman penceresi aşılırsa meşru işlemlerin başarısız olmasıyla karşı karşıya kalırız.

## Eksik olan diğer özellikler {#other-missing-features}

Bir üretim ortamında ekleyeceğimiz başka özellikler de vardır.

### Diğer sunuculardan erişim {#other-servers}

Şu anda, herhangi bir adresin bir `sponsorSetGreeting` göndermesine izin veriyoruz. Merkeziyetsizlik adına tam olarak istediğimiz şey bu olabilir. Ya da sponsorlu işlemlerin _bizim_ sunucumuzdan geçmesini sağlamak isteyebiliriz, bu durumda akıllı sözleşmede `msg.sender` kontrolü yapardık.

Her iki durumda da bu, sadece konu hakkında düşünmemenin bir sonucu değil, bilinçli bir tasarım kararı olmalıdır.

### Hata yönetimi {#error-handling}

Bir kullanıcı bir selamlama gönderir. Belki bir sonraki blokta güncellenir. Belki de güncellenmez. Hatalar görünmezdir. Bir üretim sisteminde, kullanıcı bu durumları birbirinden ayırabilmelidir:

- Yeni selamlama henüz gönderilmedi
- Yeni selamlama gönderildi ve işlemde
- Yeni selamlama reddedildi

## Sonuç {#conclusion}

Bu noktada, bir miktar merkezileşme pahasına, merkeziyetsiz uygulama (dapp) kullanıcılarınız için gazsız bir deneyim yaratabilmelisiniz.

Ancak bu yalnızca ERC-712'yi destekleyen akıllı sözleşmelerle çalışır. Örneğin bir ERC-20 Token transfer etmek için, sadece bir mesajın değil, işlemin sahibi tarafından imzalanması gerekir. Çözüm [hesap soyutlama (ERC-4337)](https://docs.erc4337.io/index.html)'dır. Gelecekte bunun hakkında bir eğitim yazmayı umuyorum.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).