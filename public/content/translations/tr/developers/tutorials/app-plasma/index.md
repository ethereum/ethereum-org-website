---
title: "Gizliliği koruyan uygulamaya özel bir Plasma yazın"
description: "Bu eğitimde, mevduatlar için yarı gizli bir banka inşa ediyoruz. Banka merkezi bir bileşendir; her kullanıcının bakiyesini bilir. Ancak bu bilgi zincir içi saklanmaz. Bunun yerine, banka durumun bir hash'ini yayınlar. Her işlem gerçekleştiğinde banka, hash durumunu yeni durumla değiştiren imzalı bir işleme sahip olduğuna dair bir sıfır bilgi ispatı ile birlikte yeni hash'i yayınlar. Bu eğitimi okuduktan sonra sadece sıfır bilgi ispatlarını nasıl kullanacağınızı değil, aynı zamanda onları neden kullandığınızı ve bunu nasıl güvenli bir şekilde yapacağınızı da anlayacaksınız."
author: Ori Pomerantz
tags: ["sıfır bilgi", "sunucu", "zincir dışı", "gizlilik"]
skill: advanced
breadcrumb: "Uygulamaya Özel Plasma"
lang: tr
published: 2025-10-15
---

## Giriş {#introduction}

[Toplamaların (rollups)](/developers/docs/scaling/zk-rollups/) aksine, [Plasma'lar](/developers/docs/scaling/plasma) kullanılabilirlik için değil, bütünlük için Ethereum Ana Ağı'nı kullanır. Bu makalede, Ethereum'un bütünlüğü garanti ettiği (yetkisiz değişiklikler yapılamaz) ancak kullanılabilirliği garanti etmediği (merkezi bir bileşen çökebilir ve tüm sistemi devre dışı bırakabilir) bir Plasma gibi davranan bir uygulama yazıyoruz.

Burada yazdığımız uygulama, gizliliği koruyan bir bankadır. Farklı adreslerin bakiyeleri olan hesapları vardır ve diğer hesaplara para (ETH) transfer edebilirler. Banka, durumun (hesaplar ve bakiyeleri) ve işlemlerin hash'lerini yayınlar, ancak asıl bakiyeleri gizli kalabilecekleri zincir dışı bir ortamda tutar.

## Tasarım {#design}

Bu, üretime hazır bir sistem değil, bir öğretim aracıdır. Bu nedenle, çeşitli basitleştirici varsayımlarla yazılmıştır.

- Sabit hesap havuzu. Belirli sayıda hesap vardır ve her hesap önceden belirlenmiş bir adrese aittir. Sıfır bilgi ispatlarında değişken boyutlu veri yapılarını işlemek zor olduğu için bu, çok daha basit bir sistem sağlar. Üretime hazır bir sistem için, durum hash'i olarak [Merkle kökünü](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) kullanabilir ve gerekli bakiyeler için Merkle ispatları sağlayabiliriz.

- Bellek depolama. Üretim sisteminde, yeniden başlatma durumunda korunabilmeleri için tüm hesap bakiyelerini diske yazmamız gerekir. Burada, bilginin basitçe kaybolması sorun değildir.

- Yalnızca transferler. Bir üretim sistemi, bankaya varlık yatırmanın ve bankadan çekmenin bir yolunu gerektirir. Ancak buradaki amaç sadece konsepti göstermektir, bu yüzden bu banka transferlerle sınırlıdır.

### Sıfır bilgi ispatları {#zero-knowledge-proofs}

Temel düzeyde, bir sıfır bilgi ispatı, kanıtlayıcının bazı genel veriler (_Veri<sub>genel</sub>_) ile _Veri<sub>özel</sub>_ arasında bir ilişki (_İlişki_) olacak şekilde bazı verileri (_Veri<sub>özel</sub>_) bildiğini gösterir. Doğrulayıcı, _İlişki_'yi ve _Veri<sub>genel</sub>_'i bilir.

Gizliliği korumak için durumların ve işlemlerin gizli olması gerekir. Ancak bütünlüğü sağlamak için, durumların [kriptografik hash'inin](https://en.wikipedia.org/wiki/Cryptographic_hash_function) herkese açık olması gerekir. İşlem gönderen kişilere bu işlemlerin gerçekten gerçekleştiğini kanıtlamak için, işlem hash'lerini de yayınlamamız gerekir.

Çoğu durumda, _Veri<sub>özel</sub>_, sıfır bilgi ispatı programının girdisi ve _Veri<sub>genel</sub>_ de çıktısıdır.

_Veri<sub>özel</sub>_ içindeki bu alanlar şunlardır:

- _Durum<sub>n</sub>_, eski durum
- _Durum<sub>n+1</sub>_, yeni durum
- _İşlem_, eski durumdan yeni duruma geçişi sağlayan bir işlem. Bu işlemin şu alanları içermesi gerekir:
  - Transferi alan _Hedef adres_
  - Transfer edilen _Miktar_
  - Her işlemin yalnızca bir kez işlenebilmesini sağlamak için _Nonce_.
    İmzadan elde edilebileceği için kaynak adresinin işlemde bulunmasına gerek yoktur.
- _İmza_, işlemi gerçekleştirmeye yetkili bir imza. Bizim durumumuzda, bir işlemi gerçekleştirmeye yetkili tek adres kaynak adresidir. Sıfır bilgi sistemimiz çalışma şekli gereği, Ethereum imzasına ek olarak hesabın açık anahtarına da ihtiyacımız vardır.

_Veri<sub>genel</sub>_ içindeki alanlar şunlardır:

- _Hash(Durum<sub>n</sub>)_, eski durumun hash'i
- _Hash(Durum<sub>n+1</sub>)_, yeni durumun hash'i
- _Hash(İşlem)_, durumu _Durum<sub>n</sub>_'den _Durum<sub>n+1</sub>_'e değiştiren işlemin hash'i.

İlişki çeşitli koşulları kontrol eder:

- Herkese açık hash'ler, özel alanlar için gerçekten doğru hash'lerdir.
- İşlem, eski duruma uygulandığında yeni durumla sonuçlanır.
- İmza, işlemin kaynak adresinden gelir.

Kriptografik hash fonksiyonlarının özellikleri nedeniyle, bu koşulları kanıtlamak bütünlüğü sağlamak için yeterlidir.

### Veri yapıları {#data-structures}

Birincil veri yapısı, sunucu tarafından tutulan durumdur. Sunucu her hesap için, [tekrarlama saldırılarını (replay attacks)](https://en.wikipedia.org/wiki/Replay_attack) önlemek amacıyla kullanılan bir [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) ve hesap bakiyesini takip eder.

### Bileşenler {#components}

Bu sistem iki bileşen gerektirir:

- İşlemleri alan, bunları işleyen ve sıfır bilgi ispatları ile birlikte hash'leri zincire gönderen _sunucu_.
- Hash'leri saklayan ve durum geçişlerinin meşru olmasını sağlamak için sıfır bilgi ispatlarını doğrulayan bir _akıllı sözleşme_.

### Veri ve kontrol akışı {#flows}

Çeşitli bileşenlerin bir hesaptan diğerine transfer işlemi gerçekleştirmek için iletişim kurma yolları şunlardır:

1. Bir web tarayıcısı, imzalayanın hesabından farklı bir hesaba transfer talebinde bulunan imzalı bir işlem gönderir.

2. Sunucu, işlemin geçerli olduğunu doğrular:

   - İmzalayanın bankada yeterli bakiyesi olan bir hesabı var.
   - Alıcının bankada bir hesabı var.

3. Sunucu, transfer edilen tutarı imzalayanın bakiyesinden çıkararak ve alıcının bakiyesine ekleyerek yeni durumu hesaplar.

4. Sunucu, durum değişikliğinin geçerli olduğuna dair bir sıfır bilgi ispatı hesaplar.

5. Sunucu Ethereum'a aşağıdakileri içeren bir işlem gönderir:

   - Yeni durum hash'i
   - İşlem hash'i (böylece işlemi gönderen kişi işlendiğini öğrenebilir)
   - Yeni duruma geçişin geçerli olduğunu kanıtlayan sıfır bilgi ispatı

6. Akıllı sözleşme, sıfır bilgi ispatını doğrular.

7. Sıfır bilgi ispatı doğrulanırsa, akıllı sözleşme şu eylemleri gerçekleştirir:
   - Mevcut durum hash'ini yeni durum hash'i ile günceller
   - Yeni durum hash'i ve işlem hash'i ile bir günlük girdisi yayar

### Araçlar {#tools}

İstemci tarafı kodu için [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) ve [Wagmi](https://wagmi.sh/) kullanacağız. Bunlar endüstri standardı araçlardır; eğer bunlara aşina değilseniz, [bu öğreticiyi](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kullanabilirsiniz.

Sunucunun büyük bir kısmı [Node](https://nodejs.org/en) kullanılarak JavaScript ile yazılmıştır. Sıfır bilgi kısmı [Noir](https://noir-lang.org/) ile yazılmıştır. `1.0.0-beta.10` sürümüne ihtiyacımız var, bu yüzden [Noir'ı talimatlara göre kurduktan](https://noir-lang.org/docs/getting_started/quick_start) sonra şunu çalıştırın:

```sh
noirup -v 1.0.0-beta.10
```

Zincir içi doğrulanabilen ispatlar oluşturmak için (aşama 3'te) ayrıca bu Noir sürümüyle eşleşen ispat arka ucu olan [Barretenberg](https://barretenberg.aztec.network/docs/getting_started) (`bb`) aracına da ihtiyacımız var. Barretenberg yükleyicisi olan `bbup`'i kurun ve ardından bunu kullanarak `bb` sürüm `0.87.0`'i kurun (eğer `bbup` bulunamazsa, güncellenmiş `PATH`'in etkili olması için yeni bir terminal açın):

```sh
curl -L https://raw.githubusercontent.com/AztecProtocol/aztec-packages/refs/heads/next/barretenberg/bbup/install | bash
bbup -v 0.87.0
```

Bu öğretici `nargo` 1.0.0-beta.10, `bb` 0.87.0 ve (sunucuda) `@noir-lang/noir_js` 1.0.0-beta.11 ile test edilmiştir. Daha yeni sürümleri kullanmayın: Noir kodu mevcut 1.0 sürüm adaylarıyla derlenmez ve `bb`'in mevcut sürümleri `nargo` 1.0.0-beta.10 tarafından derlenen devreleri okuyamaz ve artık `--oracle_hash` bayrağını kabul etmez.

Kullandığımız blokzincir, [Foundry](https://getfoundry.sh/introduction/installation)'nin bir parçası olan yerel bir test blokzinciri olan `anvil`'dir.

## Uygulama {#implementation}

Bu karmaşık bir sistem olduğundan, aşamalı olarak uygulayacağız.

### 1. Aşama - Manuel sıfır bilgi {#stage-1}

İlk aşama için, tarayıcıda bir işlemi imzalayacağız ve ardından bilgileri sıfır bilgi ispatına manuel olarak sağlayacağız. Sıfır bilgi kodunun bu bilgileri `server/noir/Prover.toml` içinde alması beklenir (belgelendirmesi [burada](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) bulunabilir).

Çalışırken görmek için:

1. [Node](https://nodejs.org/en/download) ve [Noir](https://noir-lang.org/docs/installation) kurulu olduğundan emin olun. Tercihen, bunları macOS, Linux veya [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) gibi bir UNIX sistemine kurun.

2. 1. aşama kodunu indirin ve istemci kodunu sunmak için web sunucusunu başlatın.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Burada bir web sunucusuna ihtiyaç duymanızın nedeni, belirli dolandırıcılık türlerini önlemek için birçok cüzdanın (örneğin MetaMask) doğrudan diskten sunulan dosyaları kabul etmemesidir.

3. Cüzdanı olan bir tarayıcı açın.

4. Cüzdanda yeni bir parola cümlesi (passphrase) girin. Bunun mevcut parolanızı sileceğini unutmayın, bu yüzden _yedeğiniz olduğundan emin olun_.

   Parola cümlesi, anvil için varsayılan test parolası olan `test test test test test test test test test test test junk`'dir.

5. [İstemci tarafı koduna](http://localhost:5173/) gidin.

6. Cüzdana bağlanın, hedef hesabınızı ve miktarı seçin.

7. **İmzala** (Sign) seçeneğine tıklayın ve işlemi imzalayın.

8. **Prover.toml** başlığı altında metin bulacaksınız. `server/noir/Prover.toml` dosyasını o metinle değiştirin.

9. Sıfır bilgi ispatını çalıştırın.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   Çıktı şuna benzer olmalıdır:

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Circuit witness successfully solved
   [zkBank] Witness saved to target/zkBank.gz
   [zkBank] Circuit output: (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Mesajın doğru bir şekilde hash'lenip hash'lenmediğini görmek için son iki değeri web tarayıcısında gördüğünüz hash ile karşılaştırın.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml), Noir tarafından beklenen bilgi biçimini gösterir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Mesajın metin formatında olması, kullanıcının anlamasını (ki bu imzalama sırasında gereklidir) ve Noir kodunun ayrıştırmasını kolaylaştırır. Bir yandan kesirli transferleri mümkün kılmak, diğer yandan kolayca okunabilmesini sağlamak için miktar finney cinsinden belirtilir. Son numara [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)'dur.

Dize 100 karakter uzunluğundadır. Sıfır bilgi ispatları değişken boyutlu verileri iyi işlemez, bu nedenle genellikle verileri doldurmak (pad) gerekir.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Bu üç parametre, sabit boyutlu bayt dizileridir.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

Bu, bir yapı dizisini belirtmenin yoludur. Her bir girdi için adres, (milliETH, yani [finney](https://cryptovalleyjournal.com/glossary/finney/) cinsinden) bakiye ve bir sonraki nonce değerini belirtiriz.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx), istemci tarafı işlemeyi uygular ve (sıfır bilgi parametrelerini içeren) `server/noir/Prover.toml` dosyasını üretir.

İşte daha ilginç kısımların açıklaması.

```tsx
export default attrs =>  {
```

Bu fonksiyon, diğer dosyaların içe aktarabileceği `Transfer` React bileşenini oluşturur.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Bunlar hesap adresleridir; `test ... test junk` parola cümlesi (passphrase) ile oluşturulmuş adreslerdir. Kendi adreslerinizi kullanmak istiyorsanız, bu tanımı değiştirmeniz yeterlidir.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Bu [Wagmi hook'ları](https://wagmi.sh/react/api/hooks), [viem](https://viem.sh/) kütüphanesine ve cüzdana erişmemizi sağlar.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Bu, boşluklarla doldurulmuş mesajdır. [`useState`](https://react.dev/reference/react/useState) değişkenlerinden biri her değiştiğinde, bileşen yeniden çizilir ve `message` güncellenir.

```tsx
  const sign = async () => {
```

Bu fonksiyon, kullanıcı **İmzala** (Sign) butonuna tıkladığında çağrılır. Mesaj otomatik olarak güncellenir, ancak imza işlemi cüzdanda kullanıcı onayı gerektirir ve gerekmedikçe bunu istemeyiz.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Cüzdandan [mesajı imzalamasını](https://viem.sh/docs/accounts/local/signMessage) isteyin. 

```tsx
    const hash = hashMessage(message)
```

Mesaj hash'ini alın. Bunu, (Noir kodunun) hata ayıklaması için kullanıcıya sağlamak faydalıdır. 

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Açık anahtarı alın](https://viem.sh/docs/utilities/recoverPublicKey). Bu, [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) fonksiyonu için gereklidir.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Durum değişkenlerini ayarlayın. Bunu yapmak (`sign` fonksiyonundan çıktıktan sonra) bileşeni yeniden çizer ve kullanıcıya güncellenmiş değerleri gösterir.

```tsx
    let proverToml = `
```

`Prover.toml` için metin.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem bize açık anahtarı 65 baytlık onaltılı (hexadecimal) bir dize olarak sağlar. İlk bayt bir sürüm işareti olan `0x04`'dür. Bunu açık anahtarın `x` kısmı için 32 bayt ve açık anahtarın `y` kısmı için 32 bayt takip eder.

Ancak Noir, bu bilgiyi biri `x` diğeri de `y` için olmak üzere iki baytlık diziler olarak almayı bekler. Bunu sıfır bilgi ispatının bir parçası olarak yapmak yerine burada istemcide ayrıştırmak daha kolaydır.

Genel olarak sıfır bilgi uygulamalarında bunun iyi bir pratik olduğunu unutmayın. Bir sıfır bilgi ispatı içindeki kod masraflıdır, bu nedenle sıfır bilgi ispatının dışında yapılabilecek her türlü işleme, sıfır bilgi ispatının dışında _yapılmalıdır_.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

İmza da aynı şekilde 65 baytlık onaltılı bir dize olarak sağlanır. Ancak son bayt yalnızca açık anahtarı kurtarmak için gereklidir. Açık anahtar zaten Noir koduna sağlanacağı için, imzayı doğrulamak adına ona ihtiyacımız yoktur ve Noir kodu da bunu gerektirmez.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Hesapları sağlayın.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Bu, bileşenin HTML (daha doğrusu [JSX](https://react.dev/learn/writing-markup-with-jsx)) biçimidir.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) asıl sıfır bilgi kodudur.

```
use std::hash::pedersen_hash;
```

[Pedersen hash](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/), [Noir standart kütüphanesi](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) ile birlikte sağlanır. Sıfır bilgi ispatları genellikle bu hash fonksiyonunu kullanır. Standart hash fonksiyonlarına kıyasla [aritmetik devreler](https://rareskills.io/post/arithmetic-circuit) içinde hesaplanması çok daha kolaydır.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Bu iki fonksiyon, [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) içinde tanımlanan harici kütüphanelerdir. Tam olarak adlandırıldıkları işi yaparlar; biri [keccak256 hash'ini](https://emn178.github.io/online-tools/keccak_256.html) hesaplayan bir fonksiyon, diğeri ise Ethereum imzalarını doğrulayan ve imzalayanın Ethereum adresini kurtaran bir fonksiyondur.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir, [Rust](https://www.rust-lang.org/)'tan ilham almıştır. Değişkenler varsayılan olarak sabittir. Küresel yapılandırma sabitlerini bu şekilde tanımlarız. Özellikle, `ACCOUNT_NUMBER` sakladığımız hesap sayısıdır.

`u<number>` olarak adlandırılan veri türleri, o sayıda bit içeren işaretsiz (unsigned) türlerdir. Desteklenen tek türler `u8`, `u16`, `u32`, `u64` ve `u128`'dir.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Bu değişken, aşağıda açıklandığı gibi hesapların Pedersen hash'i için kullanılır.

```
global MESSAGE_LENGTH : u32 = 100;
```

Yukarıda açıklandığı gibi, mesaj uzunluğu sabittir. Burada belirtilmiştir.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 imzaları](https://eips.ethereum.org/EIPS/eip-191), 26 baytlık bir önek, ardından ASCII formatında mesaj uzunluğu ve son olarak mesajın kendisini içeren bir arabellek gerektirir.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Bir hesap hakkında sakladığımız bilgiler. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields), sıfır bilgi ispatını uygulayan [aritmetik devrede](https://rareskills.io/post/arithmetic-circuit) doğrudan kullanılabilen, genellikle 253 bite kadar olan bir sayıdır. Burada 160 bitlik bir Ethereum adresini saklamak için `Field` kullanıyoruz.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Bir transfer işlemi için sakladığımız bilgiler.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Bir fonksiyon tanımı. Parametre `Account` bilgisidir. Sonuç, uzunluğu `FLAT_ACCOUNT_FIELDS` olan bir `Field` değişkenleri dizisidir.

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Dizideki ilk değer hesap adresidir. İkincisi hem bakiyeyi hem de nonce'u içerir. `.into()` çağrıları, bir sayıyı olması gereken veri türüne dönüştürür. `account.nonce` bir `u32` değeridir, ancak onu bir `u128` değeri olan `account.balance << 32`'ye eklemek için bir `u128` olması gerekir. Bu ilk `.into()`'dir. İkincisi, `u128` sonucunu diziye sığması için bir `Field`'e dönüştürür.

```
    flat
}
```

Noir'da fonksiyonlar yalnızca sonunda bir değer döndürebilir (erken dönüş yoktur). Dönüş değerini belirtmek için, onu fonksiyonun kapanış parantezinden hemen önce değerlendirirsiniz.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Bu fonksiyon, hesaplar dizisini bir Pedersen hash'ine girdi olarak kullanılabilecek bir `Field` dizisine dönüştürür.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Değiştirilebilir (mutable), yani sabit _olmayan_ bir değişkeni bu şekilde belirtirsiniz. Noir'daki değişkenlerin her zaman bir değeri olmalıdır, bu yüzden bu değişkeni tamamen sıfırlarla başlatıyoruz.

```
    for i in 0..ACCOUNT_NUMBER {
```

Bu bir `for` döngüsüdür. Sınırların sabit olduğuna dikkat edin. Noir döngülerinin sınırlarının derleme zamanında bilinmesi gerekir. Bunun nedeni, aritmetik devrelerin akış kontrolünü desteklememesidir. Bir `for` döngüsünü işlerken, derleyici içindeki kodu her yineleme için bir kez olmak üzere birden çok kez yerleştirir.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Son olarak, hesaplar dizisini hash'leyen fonksiyona geldik.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Bu fonksiyon, belirli bir adrese sahip hesabı bulur. Bu fonksiyon standart kodda son derece verimsiz olurdu çünkü adresi bulduktan sonra bile tüm hesaplar üzerinde yinelenir.

Ancak sıfır bilgi ispatlarında akış kontrolü yoktur. Eğer bir koşulu kontrol etmemiz gerekirse, bunu her seferinde kontrol etmeliyiz.

Benzer bir durum `if` ifadelerinde de yaşanır. Yukarıdaki döngüdeki `if` ifadesi şu matematiksel ifadelere çevrilir:

_koşul<sub>sonucu</sub> = hesaplar[i].adres == adres_ // eşitlerse bir, aksi takdirde sıfır

_hesap<sub>yeni</sub> = koşul<sub>sonucu</sub>\*i + (1-koşul<sub>sonucu</sub>)\*hesap<sub>eski</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/language/assert) fonksiyonu, iddia (assertion) yanlışsa sıfır bilgi ispatının çökmesine neden olur. Bu durumda, ilgili adrese sahip bir hesap bulamazsak. Adresi bildirmek için bir [biçim dizesi (format string)](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) kullanırız.

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Bu fonksiyon bir transfer işlemi uygular ve yeni hesaplar dizisini döndürür.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Noir'da bir biçim dizesi içindeki yapı elemanlarına erişemeyiz, bu yüzden kullanılabilir bir kopya oluştururuz.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} does not have {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"Transaction has nonce {txnNonce}, but the account is expected to use {accountNonce}");
```

Bunlar, bir işlemi geçersiz kılabilecek iki koşuldur.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Yeni hesaplar dizisini oluşturun ve ardından onu döndürün.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Bu fonksiyon adresi mesajdan okur.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Adres her zaman 20 bayt (diğer adıyla 40 onaltılı basamak) uzunluğundadır ve 7. karakterden başlar.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Miktarı ve nonce'u mesajdan okuyun.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Mesajda, adresten sonraki ilk sayı transfer edilecek finney (diğer adıyla ETH'nin binde biri) miktarıdır. İkinci sayı nonce'dur. Aralarındaki herhangi bir metin yok sayılır.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // Az önce bulduk
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Bir [demet (tuple)](https://noir-lang.org/docs/noir/concepts/data_types/tuples) döndürmek, Noir'da bir fonksiyondan birden fazla değer döndürmenin yoludur.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Bu fonksiyon mesajı baytlara dönüştürür, ardından miktarları bir `TransferTxn`'e dönüştürür.

```rust
// Viem'in hashMessage eşdeğeri
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Hesaplar için Pedersen Hash kullanabildik çünkü bunlar yalnızca sıfır bilgi ispatı içinde hash'lenir. Ancak bu kodda, tarayıcı tarafından oluşturulan mesajın imzasını kontrol etmemiz gerekiyor. Bunun için [EIP-191](https://eips.ethereum.org/EIPS/eip-191)'deki Ethereum imzalama formatını izlememiz gerekir. Bu, standart bir önek, ASCII formatında mesaj uzunluğu ve mesajın kendisini içeren birleşik bir arabellek oluşturmamız ve bunu hash'lemek için Ethereum standardı keccak256'yı kullanmamız gerektiği anlamına gelir.

```rust
    // ASCII öneki
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Bir uygulamanın kullanıcıdan bir işlem veya başka bir amaç için kullanılabilecek bir mesajı imzalamasını istediği durumlardan kaçınmak için EIP-191, imzalanan tüm mesajların 0x19 karakteriyle (geçerli bir ASCII karakteri değil) başlamasını, ardından `Ethereum Signed Message:` ve bir yeni satır gelmesini belirtir.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Messages whose length is over three digits are not supported");
```

999'a kadar olan mesaj uzunluklarını işleyin ve daha büyükse başarısız olun. Mesaj uzunluğu sabit olmasına rağmen bu kodu ekledim çünkü değiştirmeyi kolaylaştırıyor. Bir üretim sisteminde, daha iyi performans adına muhtemelen `MESSAGE_LENGTH`'un değişmediğini varsayarsınız.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Ethereum standardı `keccak256` fonksiyonunu kullanın.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // Adres, hash'in ilk 16 baytı, hash'in son 16 baytı        
{
```

Bu fonksiyon, mesaj hash'ini gerektiren imzayı doğrular. Daha sonra bize onu imzalayan adresi ve mesaj hash'ini sağlar. Mesaj hash'i iki `Field` değeri olarak sağlanır çünkü bunların programın geri kalanında kullanımı bir bayt dizisinden daha kolaydır.

İki `Field` değeri kullanmamız gerekiyor çünkü alan hesaplamaları büyük bir sayının [modülüne (modulo)](https://en.wikipedia.org/wiki/Modulo) göre yapılır, ancak bu sayı genellikle 256 bitten küçüktür (aksi takdirde bu hesaplamaları EVM'de yapmak zor olurdu).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` ve `hash2`'i değiştirilebilir değişkenler olarak belirtin ve hash'i bayt bayt içlerine yazın.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```
    
Bu, [Solidity'nin `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) fonksiyonuna benzer, ancak iki önemli farkı vardır:

- İmza geçerli değilse, çağrı bir `assert` ile başarısız olur ve program iptal edilir.
- Açık anahtar imza ve hash'ten kurtarılabilse de, bu harici olarak yapılabilecek bir işlemdir ve bu nedenle sıfır bilgi ispatı içinde yapmaya değmez. Eğer birisi burada bizi kandırmaya çalışırsa, imza doğrulaması başarısız olacaktır.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Eski hesaplar dizisinin hash'i
        Field,  // Yeni hesaplar dizisinin hash'i
        Field,  // Mesaj hash'inin ilk 16 baytı
        Field,  // Mesaj hash'inin son 16 baytı
    )
```

Son olarak `main` fonksiyonuna ulaşıyoruz. Hesapların hash'ini eski değerden yeni değere geçerli bir şekilde değiştiren bir işlemimiz olduğunu kanıtlamamız gerekiyor. Ayrıca, gönderen kişinin işleminin işlendiğini bilmesi için bu belirli işlem hash'ine sahip olduğunu da kanıtlamamız gerekiyor.

```rust
{
    let mut txn = readTransferTxn(message);
```

`txn`'un değiştirilebilir olmasına ihtiyacımız var çünkü gönderen adresini mesajdan okumuyoruz, imzadan okuyoruz.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### 2. Aşama - Sunucu Ekleme {#stage-2}

İkinci aşamada, tarayıcıdan gelen transfer işlemlerini alan ve uygulayan bir sunucu ekliyoruz.

Bunu çalışırken görmek için:

1. Çalışıyorsa Vite'ı durdurun.

2. Sunucuyu içeren dalı indirin ve gerekli tüm modüllere sahip olduğunuzdan emin olun.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir kodunu derlemeye gerek yoktur, aşama 1 için kullandığınız kodla aynıdır.

3. Sunucuyu başlatın.

   ```sh
   npm run start
   ```

4. Ayrı bir komut satırı penceresinde, depo kökünden başlayarak tarayıcı kodunu sunmak için Vite'ı çalıştırın.

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) adresindeki istemci koduna göz atın.

6. Bir işlem başlatmadan önce, gönderebileceğiniz miktarın yanı sıra nonce'u da bilmeniz gerekir. Bu bilgiyi almak için **Hesap verilerini güncelle** (Update account data) seçeneğine tıklayın ve mesajı imzalayın.

   Burada bir ikilemimiz var. Bir yandan, yeniden kullanılabilecek bir mesajı imzalamak istemiyoruz (bir [tekrarlama saldırısı (replay attack)](https://en.wikipedia.org/wiki/Replay_attack)), bu yüzden en başta bir nonce istiyoruz. Ancak henüz bir nonce'umuz yok. Çözüm, yalnızca bir kez kullanılabilecek ve her iki tarafta da zaten sahip olduğumuz, örneğin geçerli zaman gibi bir nonce seçmektir.

   Bu çözümle ilgili sorun, zamanın mükemmel bir şekilde senkronize olmaması ihtimalidir. Bu yüzden bunun yerine, her dakika değişen bir değeri imzalıyoruz. Bu, tekrarlama saldırılarına karşı güvenlik açığı penceremizin en fazla bir dakika olduğu anlamına gelir. Üretimde imzalı isteğin TLS ile korunacağı ve tünelin diğer tarafının (sunucunun) bakiye ve nonce'u zaten ifşa edebileceği (çalışması için bunları bilmesi gerekir) göz önüne alındığında, bu kabul edilebilir bir risktir.

7. Tarayıcı bakiye ve nonce'u geri aldığında, transfer formunu gösterir. Hedef adresi ve miktarı seçin ve **Transfer**'e tıklayın. Bu isteği imzalayın.

8. Transferi görmek için ya **Hesap verilerini güncelle** (Update account data) seçeneğine tıklayın ya da sunucuyu çalıştırdığınız pencereye bakın. Sunucu, her değiştiğinde durumu günlüğe kaydeder.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 processed
    New state:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 has 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC has 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 has 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 has 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs), sunucu sürecini barındırır ve [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) adresindeki Noir koduyla etkileşime girer. İlginç kısımların bir açıklaması aşağıdadır.

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) kütüphanesi, JavaScript kodu ile Noir kodu arasında arayüz oluşturur.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Önceki aşamada oluşturduğumuz derlenmiş Noir programı olan aritmetik devreyi yükleyin ve çalıştırmaya hazırlanın.

```js
// Hesap bilgisini yalnızca imzalı bir isteğe yanıt olarak sağlarız
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Hesap bilgisini sağlamak için yalnızca imzaya ihtiyacımız var. Nedeni, mesajın ne olacağını ve dolayısıyla mesaj hash'ini zaten biliyor olmamızdır.

```js
const processMessage = async (message, signature) => {
```

Bir mesajı işleyin ve kodladığı işlemi yürütün.

```js
    // Açık anahtarı al
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Artık sunucuda JavaScript çalıştırdığımıza göre, açık anahtarı istemci yerine oradan alabiliriz.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` Noir programını çalıştırır. Parametreler, [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) içinde sağlananlara eşdeğerdir. Uzun değerlerin, Viem'in yaptığı gibi tek bir onaltılı değer (`0x60A7`) yerine bir onaltılı dize dizisi (`["0x60", "0xA7"]`) olarak sağlandığını unutmayın.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Bir hata varsa onu yakalayın ve ardından istemciye basitleştirilmiş bir sürümünü aktarın.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

İşlemi uygulayın. Bunu Noir kodunda zaten yapmıştık, ancak sonucu oradan çıkarmak yerine burada tekrar yapmak daha kolaydır.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Başlangıçtaki `Accounts` yapısı.

### 3. Aşama - Ethereum akıllı sözleşmeleri {#stage-3}

1. Sunucu ve istemci süreçlerini durdurun.

2. Akıllı sözleşmeleri içeren dalı indirin ve gerekli tüm modüllere sahip olduğunuzdan emin olun.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Ayrı bir komut satırı penceresinde `anvil` çalıştırın.

4. Doğrulama anahtarını ve Solidity doğrulayıcısını oluşturun, ardından doğrulayıcı kodunu Solidity projesine kopyalayın.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Akıllı sözleşmelere gidin ve `anvil` blokzincirini kullanmak için ortam değişkenlerini ayarlayın.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. `Verifier.sol`'i dağıtın ve adresi bir ortam değişkeninde saklayın.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` sözleşmesini dağıtın.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` değeri, `Accounts`'in başlangıç durumunun Pedersen hash'idir. Bu başlangıç durumunu `server/index.mjs` içinde değiştirirseniz, sıfır bilgi ispatı tarafından bildirilen başlangıç hash'ini görmek için bir işlem çalıştırabilirsiniz.

8. Sunucuyu çalıştırın.

   ```sh
   cd ../server
   npm run start
   ```

9. İstemciyi, depo kökünden başlayarak farklı bir komut satırı penceresinde çalıştırın.

   ```sh
   cd client
   npm run dev
   ```

10. Bazı işlemler çalıştırın.

11. Durumun zincir içi değiştiğini doğrulamak için sunucu sürecini yeniden başlatın. İşlemlerdeki orijinal hash değeri zincir içi saklanan hash değerinden farklı olduğu için `ZkBank`'in artık işlemleri kabul etmediğini görün.

    Bu beklenen türde bir hatadır.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Verification error: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Wrong old state hash

    Contract Call:
        address:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        function:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Bu dosyadaki değişiklikler çoğunlukla asıl ispatı oluşturmak ve onu zincir içi göndermekle ilgilidir.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Zincir içi gönderilecek asıl ispatı oluşturmak için [Barretenberg paketini](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) kullanmamız gerekiyor. Bu paketi ya komut satırı arayüzünü (`bb`) çalıştırarak ya da [JavaScript kütüphanesi olan `bb.js`'i](https://www.npmjs.com/package/@aztec/bb.js) kullanarak kullanabiliriz. JavaScript kütüphanesi, kodu yerel olarak çalıştırmaktan çok daha yavaştır, bu yüzden komut satırını kullanmak için burada [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) kullanıyoruz.

Eğer `bb.js` kullanmaya karar verirseniz, kullandığınız Noir sürümüyle uyumlu bir sürüm kullanmanız gerektiğini unutmayın. Örneğin, Noir 1.0.0-beta.10 ve 1.0.0-beta.11'in her ikisi de `bb` ve `bb.js` sürüm 0.87 ile uyumludur.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

Buradaki adres, temiz bir `anvil` ile başlayıp yukarıdaki yönergeleri izlediğinizde elde ettiğiniz adrestir.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Bu özel anahtar, `anvil` içindeki varsayılan önceden fonlanmış hesaplardan biridir.

```js
const generateProof = async (witness, fileID) => {
```

`bb` yürütülebilir dosyasını kullanarak bir ispat oluşturun.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Tanığı bir dosyaya yazın.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Asıl ispatı oluşturun. Bu adım ayrıca genel değişkenleri içeren bir dosya da oluşturur, ancak buna ihtiyacımız yok. Bu değişkenleri zaten `noir.execute`'dan aldık.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

İspat, her biri onaltılı bir değer olarak temsil edilen `Field` değerlerinden oluşan bir JSON dizisidir. Ancak, bunu işlemde Viem'in büyük bir onaltılı dize ile temsil ettiği tek bir `bytes` değeri olarak göndermemiz gerekiyor. Burada tüm değerleri birleştirerek, tüm `0x`'leri kaldırarak ve ardından sonuna bir tane ekleyerek formatı değiştiriyoruz.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Temizleyin ve ispatı döndürün.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Genel alanların 32 baytlık değerlerden oluşan bir dizi olması gerekir. Ancak, işlem hash'ini iki `Field` değeri arasında bölmemiz gerektiğinden, 16 baytlık bir değer olarak görünür. Burada Viem'in bunun aslında 32 bayt olduğunu anlaması için sıfırlar ekliyoruz.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Her adres her nonce'u yalnızca bir kez kullanır, böylece tanık dosyası ve çıktı dizini için benzersiz bir tanımlayıcı olarak `fromAddress` ve `nonce` kombinasyonunu kullanabiliriz.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Verification error: ${err}`)
        throw Error("Can't verify the transaction onchain")
    }
    .
    .
    .
}
```

İşlemi zincire gönderin.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Bu, işlemi alan zincir içi koddur.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Zincir içi kodun iki değişkeni takip etmesi gerekir: doğrulayıcı (Barretenberg'in `bb write_solidity_verifier` komutu tarafından oluşturulan ayrı bir sözleşme) ve mevcut durum hash'i.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Durum her değiştiğinde, bir `TransactionProcessed` olayı yayarız.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Bu fonksiyon işlemleri işler. İspatı (`bytes` olarak) ve genel girdileri (bir `bytes32` dizisi olarak), doğrulayıcının gerektirdiği formatta (zincir içi işlemeyi ve dolayısıyla gaz maliyetlerini en aza indirmek için) alır.

```solidity
        require(_publicFields[0] == currentStateHash,
            "Wrong old state hash");
```

Sıfır bilgi ispatının, işlemin mevcut hash'imizden yeni bir hash'e değiştiğini göstermesi gerekir.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Sıfır bilgi ispatını doğrulamak için doğrulayıcı sözleşmesini çağırın. Bu adım, sıfır bilgi ispatı yanlışsa işlemi geri alır.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Eğer her şey yolundaysa, durum hash'ini yeni değere güncelleyin ve bir `TransactionProcessed` olayı yayın.

## Merkezi bileşen tarafından yapılan kötüye kullanımlar {#abuses}

Bilgi güvenliği üç nitelikten oluşur:

- _Gizlilik_, kullanıcıların okumaya yetkili olmadıkları bilgileri okuyamaması.
- _Bütünlük_, bilgilerin yetkili kullanıcılar tarafından yetkili bir şekilde değiştirilmesi dışında değiştirilememesi.
- _Kullanılabilirlik_, yetkili kullanıcıların sistemi kullanabilmesi.

Bu sistemde bütünlük, sıfır bilgi ispatları aracılığıyla sağlanır. Banka, her hesabın bakiyesini ve tüm işlemleri bilmek zorunda olduğundan kullanılabilirliği garanti etmek çok daha zordur ve gizlilik imkansızdır. Bilgiye sahip olan bir kuruluşun bu bilgiyi paylaşmasını engellemenin hiçbir yolu yoktur.

[Gizli adresler (stealth addresses)](https://vitalik.eth.limo/general/2023/01/20/stealth.html) kullanarak gerçekten gizli bir banka oluşturmak mümkün olabilir, ancak bu makalenin kapsamı dışındadır.

### Yanlış bilgi {#false-info}

Sunucunun bütünlüğü ihlal etmesinin bir yolu, [veri talep edildiğinde](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) yanlış bilgi sağlamaktır.

Bunu çözmek için, hesapları özel bir girdi olarak ve bilginin istendiği adresi genel bir girdi olarak alan ikinci bir Noir programı yazabiliriz. Çıktı, o adresin bakiyesi ile nonce'u ve hesapların hash'idir.

Elbette bu ispat zincir içi doğrulanamaz, çünkü nonce'ları ve bakiyeleri zincir içi yayınlamak istemiyoruz. Ancak tarayıcıda çalışan istemci koduyla doğrulanabilir.

### Zorunlu işlemler {#forced-txns}

L2'lerde kullanılabilirliği sağlamanın ve sansürü önlemenin olağan mekanizması [zorunlu işlemlerdir](https://docs.optimism.io/stack/transactions/forced-transaction). Ancak zorunlu işlemler sıfır bilgi ispatlarıyla birleşmez. Sunucu, işlemleri doğrulayabilen tek kuruluştur.

`smart-contracts/src/ZkBank.sol` sözleşmesini zorunlu işlemleri kabul edecek şekilde değiştirebilir ve bunlar işlenene kadar sunucunun durumu değiştirmesini önleyebiliriz. Ancak bu bizi basit bir hizmet reddi (denial-of-service) saldırısına açık hale getirir. Ya zorunlu bir işlem geçersizse ve bu nedenle işlenmesi imkansızsa?

Çözüm, zorunlu bir işlemin geçersiz olduğuna dair bir sıfır bilgi ispatına sahip olmaktır. Bu sunucuya üç seçenek sunar:

- İşlendiğine dair bir sıfır bilgi ispatı ve yeni durum hash'i sağlayarak zorunlu işlemi işlemek.
- Zorunlu işlemi reddetmek ve işlemin geçersiz olduğuna (bilinmeyen adres, hatalı nonce veya yetersiz bakiye) dair sözleşmeye bir sıfır bilgi ispatı sağlamak.
- Zorunlu işlemi görmezden gelmek. Sunucuyu işlemi fiilen işlemeye zorlamanın bir yolu yoktur, ancak bu, tüm sistemin kullanılamaz olduğu anlamına gelir.

#### Kullanılabilirlik teminatları {#avail-bonds}

Gerçek hayattaki bir uygulamada, muhtemelen sunucunun çalışmasını sağlamak için bir çeşit kâr amacı güdülürdü. Zorunlu bir işlemin belirli bir süre içinde işlenmemesi durumunda herkesin yakabileceği (burn) bir kullanılabilirlik teminatı göndererek bu teşviki güçlendirebiliriz.

### Kötü Noir kodu {#bad-noir-code}

Normalde, insanların bir akıllı sözleşmeye güvenmesini sağlamak için kaynak kodunu bir [blok gezginine](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) yükleriz. Ancak sıfır bilgi ispatları söz konusu olduğunda bu yetersizdir.

`Verifier.sol`, Noir programının bir fonksiyonu olan doğrulama anahtarını içerir. Ancak bu anahtar bize Noir programının ne olduğunu söylemez. Gerçekten güvenilir bir çözüme sahip olmak için Noir programını (ve onu oluşturan sürümü) yüklemeniz gerekir. Aksi takdirde, sıfır bilgi ispatları arka kapısı olan farklı bir programı yansıtabilir.

Blok gezginleri Noir programlarını yüklememize ve doğrulamamıza izin vermeye başlayana kadar, bunu kendiniz yapmalısınız (tercihen [IPFS](/developers/tutorials/ipfs-decentralized-ui/)'e). O zaman gelişmiş kullanıcılar kaynak kodunu indirebilecek, kendileri derleyebilecek, `Verifier.sol` oluşturabilecek ve bunun zincir içi olanla aynı olduğunu doğrulayabileceklerdir.

## Sonuç {#conclusion}

Plasma tipi uygulamalar, bilgi depolamak için merkezi bir bileşen gerektirir. Bu durum potansiyel güvenlik açıklarına yol açar, ancak karşılığında blokzincirin kendisinde bulunmayan yollarla gizliliği korumamıza olanak tanır. Sıfır bilgi ispatları ile bütünlüğü sağlayabilir ve merkezi bileşeni çalıştıran kişinin kullanılabilirliği sürdürmesini ekonomik açıdan avantajlı hale getirebiliriz.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).

## Teşekkürler {#acknowledgements}

- Josh Crites bu makalenin bir taslağını okudu ve zorlu bir Noir sorununda bana yardımcı oldu.

Geriye kalan tüm hatalar benim sorumluluğumdadır.
