---
title: Ethereum'da Kimlik Doğrulama
description: Ethereum uygulamalarında kullanıcı kimlik doğrulamasının nasıl çalıştığını öğrenin; parola yok, sadece cüzdanlar ve imzalar var.
lang: tr
---

Geleneksel web geliştirmeden geliyorsanız, kullanıcı adı/parola ile giriş yapmaya, OAuth akışlarına ve oturum çerezlerine alışkınsınızdır. Ethereum'da kimlik doğrulama farklı ve birçok yönden daha basit bir şekilde çalışır.

Ethereum'da bir kullanıcı, **cüzdanı ile bir mesaj imzalayarak** kimliğini kanıtlar. Saklanacak bir parola yoktur. Sızdırılacak bir kimlik bilgisi veritabanı yoktur. Sadece kriptografi vardır.

## Web2'den farkı nedir? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Kullanıcı adı + parola               | Cüzdan adresi + imza                       |
| Sunucu kimlik bilgilerini saklar         | Kullanıcı özel anahtarı tutar                           |
| Oturumlar çerezler / JWT ile yönetilir | Oturumlar zincir dışı bir cüzdan imzası ile başlar |
| "Google ile giriş yap"             | "Ethereum ile giriş yap"                          |
| Parola sıfırlama akışları              | Kurtarma ifadesi ile geri yükleme                             |

Temel değişim şudur: Web2'de merkezi bir sunucu kimliğinizi doğrular. Ethereum'da ise belirli bir adresi kontrol ettiğinizi kanıtlayarak **kendi kimliğinizi kendiniz doğrularsınız** ve herkes bunu bağımsız olarak doğrulayabilir.

## Ön Koşullar {#prerequisites}

Şunları anladığınızdan emin olun:

- [Ethereum hesapları ve nasıl çalıştıkları](/developers/docs/accounts/)
- [Cüzdanın ne olduğu ve nasıl bağlanacağı](/wallets/)
- [Açık-özel anahtar kriptografisinin temelleri](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Cüzdan tabanlı kimlik doğrulama nasıl çalışır {#how-wallet-auth-works}

Temel akış basittir:

1. **Merkeziyetsiz uygulamanız (dapp) kullanıcıdan cüzdanını bağlamasını ister** (MetaMask, Rainbow, WalletConnect vb. aracılığıyla)
2. **Cüzdan, kullanıcının Ethereum adresini paylaşır** - bu onların açık tanımlayıcısıdır
3. **Dapp'iniz benzersiz bir mesaj oluşturur** (bir nonce veya meydan okuma)
4. **Kullanıcı mesajı özel anahtarı ile imzalar** (bu işlem cüzdanın içinde gerçekleşir)
5. **Arka ucunuz (backend), imzayı** iddia edilen adrese karşı **doğrular**
6. **Geçerliyse, kullanıcının kimliği doğrulanır**

Hiçbir parola yazılmamış, saklanmamış veya iletilmemiştir.

## Ethereum ile Giriş Yap (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361), genellikle **SIWE** (Sign-In with Ethereum) olarak adlandırılan, Ethereum ile giriş yapmak için standart bir mesaj formatı tanımlar. Özel (ad-hoc) mesaj imzalamanın yerini yapılandırılmış, güvenli bir standartla değiştirir.

Bir SIWE mesajı şuna benzer:

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

SIWE'nin temel özellikleri:

- **Alan adı bağlama** - mesaj alan adını içerir, kimlik avını (phishing) önler
- **Zincir Kimliği (Chain ID)** - imzanın hangi ağ için geçerli olduğunu belirtir
- **Nonce** - tekrar oynatma (replay) saldırılarını önler
- **Süre sonu** - geçerlilik penceresini sınırlayan isteğe bağlı zaman damgası
- **Kaynaklar** - kapsamlı erişim için isteğe bağlı URI'ler

### SIWE kütüphaneleri {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Spruce tarafından geliştirilen resmi TypeScript uygulaması
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Rust uygulaması
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Go uygulaması

### Örnek: siwe ile istemci tarafı giriş {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Arka ucunuzdan bir nonce alın
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. SIWE mesajını oluşturun ve imzalayın
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. Doğrulama için arka uca gönderin
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Örnek: sunucu tarafı doğrulama (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Bir nonce oluşturun ve /verify'ın daha sonra kontrol edebilmesi için oturumda saklayın
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address, doğrulanmış Ethereum Adresidir
      // Kullanıcı için bir oturum veya JWT oluşturun
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Cüzdan bağlantı kütüphaneleri {#wallet-connection-libraries}

Kimlik doğrulamadan önce, kullanıcının cüzdanını bağlaması gerekir. Bu kütüphaneler işi kolaylaştırır:

- **[RainbowKit](https://www.rainbowkit.com/)** - Güzel bir kullanıcı arayüzüne sahip kullanıma hazır React bileşeni
- **[ConnectKit](https://docs.family.co/connectkit)** - Kolayca entegre edilebilen cüzdan bağlantı penceresi (modal)
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Yerleşik SIWE ile çoklu zincir cüzdan bağlantısı
- **[wagmi](https://wagmi.sh)** - `useAccount` ve `useConnect` içeren React Hooks kütüphanesi

## İmzaları manuel olarak doğrulama {#verifying-manually}

SIWE kullanmamayı tercih ederseniz, imzaları doğrudan doğrulayabilirsiniz:

```ts
import { verifyMessage } from 'ethers'

// Kullanıcının imzaladığı mesaj
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// İmzadan imzalayanın Adresini kurtarın
const recoveredAddress = verifyMessage(message, signature)

// İddia edilen Adres ile karşılaştırın
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Kimlik doğrulama başarılı
}
```

### Önemli güvenlik notları {#security-notes}

- **Her zaman bir nonce kullanın** - eski bir imzanın yeniden kullanıldığı tekrar oynatma (replay) saldırılarını önler
- **Alan adını dahil edin** - imzaların farklı sitelerde geçerli olmasını önler
- **Süre sonunu kontrol edin** - imzaların sınırlı bir geçerlilik penceresi olmalıdır
- **Mümkün olduğunda SIWE (EIP-4361) kullanın** - yukarıdakilerin tümünü sizin için halleder
- **Özel anahtarları asla ifşa etmeyin** - imzalama işlemi cüzdanın içinde gerçekleşir; uygulamanız yalnızca sonucu görür

## Oturum yönetimi {#session-management}

Kimlik doğrulandıktan sonra, tıpkı Web2'de olduğu gibi hala oturumlara ihtiyacınız vardır. Yaygın kalıplar:

- **JWT token'ları** - imzayı doğruladıktan sonra bir JWT verin, API istekleri için kullanın
- **Sunucu tarafı oturumlar** - doğrulanmış adresi bir oturum çerezinde saklayın
- **Kaynaklarla SIWE** - belirli URI'lere bağlı kapsamlı erişim token'ları tanımlayın

Web2'den temel farkı: Kullanıcının Ethereum adresi onun kalıcı kimliğidir. Yeni bir hesap oluşturmadan herhangi bir dapp genelinde kullanabilirler.

## Merkeziyetsiz kimlik {#decentralized-identity}

Ethereum kimlik doğrulaması, **kendi kendine egemen kimliğe (self-sovereign identity)** doğru daha geniş bir hareketin parçasıdır. Bu alandaki standartlar ve projeler şunları içerir:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Adreslere çözümlenen insan tarafından okunabilir isimler (örn. `vitalik.eth`)
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Kimlik ve kimlik bilgileri hakkında zincir içi onaylar
- **[W3C Merkeziyetsiz Kimlik Tanımlayıcıları (DID'ler)](https://www.w3.org/TR/did-core/)** - Doğrulanabilir merkeziyetsiz kimlik (DID) için küresel standart
- **[Ceramic Network](https://ceramic.network/)** - Bir DID'ye bağlı merkeziyetsiz veri akışları

## Daha fazla bilgi {#further-reading}

- [EIP-4361: Ethereum ile Giriş Yap](https://eips.ethereum.org/EIPS/eip-4361)
- [SIWE belgeleri](https://docs.login.xyz/)
- [Auth0 Üzerinde Ethereum ile Giriş Yap](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Reown AppKit kimlik doğrulama belgeleri](https://docs.reown.com/appkit/authentication)
- [ENS belgeleri](https://docs.ens.domains/)

## İlgili konular {#related-topics}

- [Ethereum hesapları](/developers/docs/accounts/)
- [JavaScript API kütüphaneleri](/developers/docs/apis/javascript/)
- [Arka uç API kütüphaneleri](/developers/docs/apis/backend/)
- [Cüzdanlar](/wallets/)