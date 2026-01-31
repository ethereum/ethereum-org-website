---
title: "Gizliliği koruyan uygulamaya özel bir plazma yazın"
description: "Bu öğreticide, para yatırma işlemleri için yarı gizli bir banka oluşturuyoruz. Banka merkezi bir bileşendir; her kullanıcının bakiyesini bilir. Ancak bu bilgi zincir üstünde saklanmaz. Bunun yerine, banka durumun bir karmasını yayınlar. Bir işlem her gerçekleştiğinde, banka yeni karmayı, karma durumunu yeni duruma değiştiren imzalı bir işleme sahip olduğuna dair bir sıfır bilgi ispatı ile birlikte yayınlar. Bu öğreticiyi okuduktan sonra, sadece sıfır bilgi ispatlarının nasıl kullanılacağını değil, aynı zamanda neden kullanıldığını ve bunun nasıl güvenli bir şekilde yapılacağını da anlayacaksınız."
author: Ori Pomerantz
tags: [ "sıfır bilgi", "sunucu", "zincir dışında", "gizlilik" ]
skill: advanced
lang: tr
published: 2025-10-15
---

## Giriş {#introduction}

[Rollup'ların](/developers/docs/scaling/zk-rollups/) aksine, [plazmalar](/developers/docs/scaling/plasma) bütünlük için Ethereum ana ağını kullanır, ancak kullanılabilirlik için kullanmaz. Bu makalede, Ethereum'un bütünlüğü (yetkisiz değişiklikler olmaması) garanti ettiği ancak kullanılabilirliği (merkezi bir bileşen çökebilir ve tüm sistemi devre dışı bırakabilir) garanti etmediği, plazma gibi davranan bir uygulama yazıyoruz.

Burada yazdığımız uygulama, gizliliği koruyan bir bankadır. Farklı adreslerin bakiyeli hesapları vardır ve diğer hesaplara para (ETH) gönderebilirler. Banka, durumun (hesaplar ve bakiyeleri) ve işlemlerin karmalarını yayınlar, ancak gerçek bakiyeleri gizli kalabilecekleri zincir dışında tutar.

## Tasarım {#design}

Bu, üretime hazır bir sistem değil, bir öğretim aracıdır. Bu nedenle, birkaç basitleştirici varsayımla yazılmıştır.

- Sabit hesap havuzu. Belirli sayıda hesap vardır ve her hesap önceden belirlenmiş bir adrese aittir. Bu, çok daha basit bir sistem oluşturur çünkü sıfır bilgi ispatlarında değişken boyutlu veri yapılarını işlemek zordur. Üretime hazır bir sistem için, durum karması olarak [Merkle kökünü](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) kullanabilir ve gerekli bakiyeler için Merkle ispatları sağlayabiliriz.

- Bellek depolama. Bir üretim sisteminde, yeniden başlatma durumunda korumak için tüm hesap bakiyelerini diske yazmamız gerekir. Burada, bilginin basitçe kaybolması sorun değildir.

- Sadece transferler. Bir üretim sistemi, bankaya varlık yatırmak ve bunları çekmek için bir yol gerektirir. Ancak buradaki amaç sadece konsepti göstermektir, bu nedenle bu banka transferlerle sınırlıdır.

### Sıfır bilgi ispatları {#zero-knowledge-proofs}

Temel düzeyde, bir sıfır bilgi ispatı, kanıtlayıcının bazı _Data<sub>private</sub>_ verilerini bildiğini gösterir; öyle ki, bazı herkese açık veriler, _Data<sub>public</sub>_ ile _Data<sub>private</sub>_ arasında bir _Relationship_ ilişkisi vardır. Doğrulayıcı, _Relationship_ ve _Data<sub>public</sub>_ bilir.

Gizliliği korumak için, durumların ve işlemlerin gizli olması gerekir. Ancak bütünlüğü sağlamak için durumların [kriptografik karmasının](https://en.wikipedia.org/wiki/Cryptographic_hash_function) herkese açık olması gerekir. İşlem gönderen kişilere bu işlemlerin gerçekten gerçekleştiğini kanıtlamak için, işlem karmalarını da yayınlamamız gerekir.

Çoğu durumda, _Data<sub>private</sub>_, sıfır bilgi ispatı programının girdisi ve _Data<sub>public</sub>_ ise çıktısıdır.

_Data<sub>private</sub>_ içindeki bu alanlar:

- _State<sub>n</sub>_, eski durum
- _State<sub>n+1</sub>_, yeni durum
- _İşlem_, eski durumdan yeni duruma geçen bir işlem. Bu işlem şu alanları içermelidir:
  - Transferi alan _Hedef adres_
  - Transfer edilen _Tutar_
  - Her işlemin yalnızca bir kez işlenebilmesini sağlamak için _Nonce_.
    Kaynak adresin işlemde olması gerekmez, çünkü imzadan kurtarılabilir.
- _İmza_, işlemi gerçekleştirmeye yetkili bir imza. Bizim durumumuzda, bir işlemi gerçekleştirmeye yetkili tek adres kaynak adrestir. Sıfır bilgi sistemimiz bu şekilde çalıştığı için, Ethereum imzasına ek olarak hesabın açık anahtarına da ihtiyacımız var.

_Data<sub>public</sub>_ içindeki alanlar şunlardır:

- _Karma(Durum<sub>n</sub>)_ eski durumun karması
- _Karma(Durum<sub>n+1</sub>)_ yeni durumun karması
- _Karma(İşlem)_ durumu _Durum<sub>n</sub>_ konumundan _Durum<sub>n+1</sub>_ konumuna değiştiren işlemin karması.

İlişki birkaç koşulu kontrol eder:

- Herkese açık karmalar gerçekten de özel alanlar için doğru karmalardır.
- İşlem, eski duruma uygulandığında yeni durumla sonuçlanır.
- İmza, işlemin kaynak adresinden gelir.

Kriptografik karma işlevlerinin özellikleri nedeniyle, bu koşulları kanıtlamak bütünlüğü sağlamak için yeterlidir.

### Veri yapıları {#data-structures}

Birincil veri yapısı, sunucu tarafından tutulan durumdur. Her hesap için sunucu, [tekrarlama saldırılarını](https://en.wikipedia.org/wiki/Replay_attack) önlemek için kullanılan hesap bakiyesini ve bir [nonce'ı](https://en.wikipedia.org/wiki/Cryptographic_nonce) takip eder.

### Bileşenler {#components}

Bu sistem iki bileşen gerektirir:

- İşlemleri alan, bunları işleyen ve sıfır bilgi ispatlarıyla birlikte zincire karmaları gönderen _sunucu_.
- Durum geçişlerinin meşru olduğundan emin olmak için karmaları depolayan ve sıfır bilgi ispatlarını doğrulayan bir _akıllı sözleşme_.

### Veri ve kontrol akışı {#flows}

Bunlar, çeşitli bileşenlerin bir hesaptan diğerine transfer için iletişim kurma yollarıdır.

1. Bir web tarayıcısı, imzalayanın hesabından farklı bir hesaba transfer talebinde bulunan imzalı bir işlem gönderir.

2. Sunucu, işlemin geçerli olduğunu doğrular:

   - İmzalayanın bankada yeterli bakiyeye sahip bir hesabı vardır.
   - Alıcının bankada bir hesabı vardır.

3. Sunucu, transfer edilen tutarı imzalayanın bakiyesinden çıkarıp alıcının bakiyesine ekleyerek yeni durumu hesaplar.

4. Sunucu, durum değişikliğinin geçerli olduğuna dair bir sıfır bilgi ispatı hesaplar.

5. Sunucu, Ethereum'a şunları içeren bir işlem gönderir:

   - Yeni durum karması
   - İşlem karması (böylece işlem göndericisi işlendiğini bilebilir)
   - Yeni duruma geçişin geçerli olduğunu kanıtlayan sıfır bilgi ispatı

6. Akıllı sözleşme, sıfır bilgi ispatını doğrular.

7. Sıfır bilgi ispatı kontrol edilirse, akıllı sözleşme şu eylemleri gerçekleştirir:
   - Mevcut durum karmasını yeni durum karmasına güncelle
   - Yeni durum karması ve işlem karması ile bir günlük girdisi yayınla

### Araçlar {#tools}

İstemci tarafı kodu için [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) ve [Wagmi](https://wagmi.sh/) kullanacağız. Bunlar endüstri standardı araçlardır; onlara aşina değilseniz [bu öğreticiyi](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) kullanabilirsiniz.

Sunucunun büyük bir kısmı [Node](https://nodejs.org/en) kullanılarak JavaScript ile yazılmıştır. Sıfır bilgi kısmı [Noir](https://noir-lang.org/) dilinde yazılmıştır. `1.0.0-beta.10` sürümüne ihtiyacımız var, bu yüzden [Noir'ı talimatlara göre yükledikten](https://noir-lang.org/docs/getting_started/quick_start) sonra şunu çalıştırın:

```
noirup -v 1.0.0-beta.10
```

Kullandığımız blokzincir, [Foundry](https://getfoundry.sh/introduction/installation)nin bir parçası olan yerel bir test blokzinciri olan `anvil`'dir.

## Uygulama {#implementation}

Bu karmaşık bir sistem olduğu için, onu aşamalar halinde uygulayacağız.

### Aşama 1 - Manuel sıfır bilgi {#stage-1}

İlk aşama için, tarayıcıda bir işlemi imzalayacak ve ardından bilgiyi manuel olarak sıfır bilgi ispatına sağlayacağız. Sıfır bilgi kodu, bu bilgiyi `server/noir/Prover.toml` dosyasında almayı bekler ([burada](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1) belgelenmiştir).

Çalışırken görmek için:

1. [Node](https://nodejs.org/en/download) ve [Noir](https://noir-lang.org/install) uygulamasının yüklü olduğundan emin olun. Tercihen, bunları macOS, Linux veya [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) gibi bir UNIX sistemine yükleyin.

2. Aşama 1 kodunu indirin ve istemci kodunu sunmak için web sunucusunu başlatın.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   Burada bir web sunucusuna ihtiyacınız olmasının nedeni, belirli dolandırıcılık türlerini önlemek için birçok cüzdanın (MetaMask gibi) doğrudan diskten sunulan dosyaları kabul etmemesidir

3. Cüzdanı olan bir tarayıcı açın.

4. Cüzdanda yeni bir parola girin. Bunun mevcut parolanızı sileceğini unutmayın, bu yüzden _bir yedeğiniz olduğundan emin olun_.

   Parola, anvil için varsayılan test parolası olan `test test test test test test test test test test test junk`'tır.

5. [İstemci tarafı koduna](http://localhost:5173/) göz atın.

6. Cüzdana bağlanın ve hedef hesabınızı ve tutarınızı seçin.

7. **İmzala**'ya tıklayın ve işlemi imzalayın.

8. **Prover.toml** başlığı altında metin bulacaksınız. `server/noir/Prover.toml` dosyasını bu metinle değiştirin.

9. Sıfır bilgi ispatını yürütün.

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

10. Mesajın doğru bir şekilde karıştırılıp karıştırılmadığını görmek için son iki değeri web tarayıcısında gördüğünüz karma ile karşılaştırın.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml), Noir tarafından beklenen bilgi biçimini gösterir.

```toml
mesaj="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Mesaj, kullanıcının anlamasını (imzalama sırasında gereklidir) ve Noir kodunun ayrıştırmasını kolaylaştıran metin biçimindedir. Tutar, bir yandan kesirli transferlere olanak sağlamak, diğer yandan kolayca okunabilir olmak için finney cinsinden belirtilmiştir. Son sayı [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)'tır.

Dize 100 karakter uzunluğundadır. Sıfır bilgi ispatları değişken boyutlu verileri iyi işlemez, bu yüzden genellikle verileri doldurmak gerekir.

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

Bu, bir yapı dizisini belirtmenin yoludur. Her giriş için adresi, bakiyeyi (milliETH yani [finney](https://cryptovalleyjournal.com/glossary/finney/)) ve bir sonraki nonce değerini belirtiriz.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) istemci tarafı işlemeyi uygular ve `server/noir/Prover.toml` dosyasını (sıfır bilgi parametrelerini içeren) oluşturur.

İşte daha ilginç kısımların açıklaması.

```tsx
export default attrs =>  {
```

Bu işlev, diğer dosyaların içe aktarabileceği `Transfer` React bileşenini oluşturur.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Bunlar hesap adresleridir, `test ...` tarafından oluşturulan adreslerdir. test junk` parolası. Kendi adreslerinizi kullanmak istiyorsanız, sadece bu tanımı değiştirin.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Bu [Wagmi kancaları](https://wagmi.sh/react/api/hooks) [viem](https://viem.sh/) kütüphanesine ve cüzdana erişmemizi sağlar.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

Bu, boşluklarla doldurulmuş mesajdır. [`useState`](https://react.dev/reference/react/useState) değişkenlerinden biri her değiştiğinde, bileşen yeniden çizilir ve `message` güncellenir.

```tsx
  const sign = async () => {
```

Bu işlev, kullanıcı **İmzala** düğmesine tıkladığında çağrılır. Mesaj otomatik olarak güncellenir, ancak imza cüzdanda kullanıcı onayı gerektirir ve gerekmedikçe bunu istemeyiz.

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

Mesaj karmasını alın. Kullanıcıya (Noir kodunun) hata ayıklaması için sağlamak yararlıdır.

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Açık anahtarı alın](https://viem.sh/docs/utilities/recoverPublicKey). Bu, [Noir `ecrecover`](https://github.com/colinnielsen/ecrecover-noir) işlevi için gereklidir.

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Durum değişkenlerini ayarlayın. Bunu yapmak, bileşeni yeniden çizer (`sign` işlevi çıktıktan sonra) ve kullanıcıya güncellenmiş değerleri gösterir.

```tsx
    let proverToml = `
```

`Prover.toml` için metin.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem bize açık anahtarı 65 baytlık bir onaltılık dize olarak sağlar. İlk bayt `0x04`, bir sürüm işaretçisidir. Bunu, açık anahtarın `x` değeri için 32 bayt ve ardından açık anahtarın `y` değeri için 32 bayt takip eder.

Ancak Noir, bu bilgiyi biri `x` için ve diğeri `y` için olmak üzere iki baytlık diziler olarak almayı bekler. Bunu sıfır bilgi ispatının bir parçası olarak ayrıştırmak yerine burada istemcide ayrıştırmak daha kolaydır.

Bunun genel olarak sıfır bilgi alanında iyi bir uygulama olduğunu unutmayın. Sıfır bilgi ispatı içindeki kod pahalıdır, bu nedenle sıfır bilgi ispatı dışında yapılabilecek herhangi bir işleme sıfır bilgi ispatı _dışında_ yapılmalıdır.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

İmza ayrıca 65 baytlık bir onaltılık dize olarak da sağlanır. Ancak, son bayt yalnızca açık anahtarı kurtarmak için gereklidir. Açık anahtar zaten Noir koduna sağlanacağından, imzayı doğrulamak için ona ihtiyacımız yoktur ve Noir kodu bunu gerektirmez.

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

Bu, bileşenin HTML (daha doğrusu, [JSX](https://react.dev/learn/writing-markup-with-jsx)) biçimidir.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) gerçek sıfır bilgi kodudur.

```
use std::hash::pedersen_hash;
```

[Pedersen karması](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/), [Noir standart kütüphanesi](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash) ile sağlanır. Sıfır bilgi ispatları genellikle bu karma işlevini kullanır. [Aritmetik devrelerde](https://rareskills.io/post/arithmetic-circuit) hesaplamak, standart karma işlevlerine kıyasla çok daha kolaydır.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Bu iki işlev, [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml) dosyasında tanımlanan harici kütüphanelerdir. Bunlar tam olarak adlandırıldıkları şeydir, [keccak256 karmasını](https://emn178.github.io/online-tools/keccak_256.html) hesaplayan bir işlev ve Ethereum imzalarını doğrulayan ve imzalayanın Ethereum adresini kurtaran bir işlev.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir, [Rust](https://www.rust-lang.org/) dilinden esinlenmiştir. Değişkenler varsayılan olarak sabittir. Genel yapılandırma sabitlerini bu şekilde tanımlarız. Özellikle, `ACCOUNT_NUMBER` sakladığımız hesap sayısıdır.

`u<sayı>` adlı veri türleri, o sayıdaki bitsiz, işaretsizdir. Desteklenen tek türler `u8`, `u16`, `u32`, `u64` ve `u128`'dir.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Bu değişken, aşağıda açıklandığı gibi, hesapların Pedersen karması için kullanılır.

```
global MESSAGE_LENGTH : u32 = 100;
```

Yukarıda açıklandığı gibi, mesaj uzunluğu sabittir. Burada belirtilmiştir.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

[EIP-191 imzaları](https://eips.ethereum.org/EIPS/eip-191), 26 baytlık bir önek, ardından ASCII cinsinden mesaj uzunluğu ve son olarak mesajın kendisiyle birlikte bir arabellek gerektirir.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Bir hesap hakkında sakladığımız bilgiler. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields), sıfır bilgi ispatını uygulayan [aritmetik devrede](https://rareskills.io/post/arithmetic-circuit) doğrudan kullanılabilen, tipik olarak 253 bite kadar olan bir sayıdır. Burada, 160 bitlik bir Ethereum adresini depolamak için `Field` kullanıyoruz.

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

Bir işlev tanımı. Parametre `Account` bilgisidir. Sonuç, uzunluğu `FLAT_ACCOUNT_FIELDS` olan bir `Field` değişkenleri dizisidir

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

Dizideki ilk değer hesap adresidir. İkincisi hem bakiyeyi hem de nonce'u içerir. `.into()` çağrıları bir sayıyı olması gereken veri türüne değiştirir. `account.nonce`, bir `u32` değeridir, ancak onu bir `u128` değeri olan `account.balance « 32`'ye eklemek için bir `u128` olması gerekir. Bu ilk `.into()`'dur. İkincisi, `u128` sonucunu diziye sığacak şekilde bir `Field`'e dönüştürür.

```
    flat
}
```

Noir'da, işlevler yalnızca sonda bir değer döndürebilir (erken dönüş yoktur). Dönüş değerini belirtmek için, onu işlevin kapanış parantezinden hemen önce değerlendirirsiniz.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Bu işlev, hesaplar dizisini bir Petersen Karması'nın girdisi olarak kullanılabilecek bir `Field` dizisine dönüştürür.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

Bu, bir sabit _olmayan_, yani değişken bir değişkeni belirtmenin yoludur. Noir'daki değişkenlerin her zaman bir değeri olmalıdır, bu nedenle bu değişkeni tümü sıfır olarak başlatırız.

```
    for i in 0..ACCOUNT_NUMBER {
```

Bu bir `for` döngüsüdür. Sınırların sabit olduğunu unutmayın. Noir döngülerinin sınırlarının derleme zamanında bilinmesi gerekir. Bunun nedeni, aritmetik devrelerin akış kontrolünü desteklememesidir. Bir `for` döngüsünü işlerken, derleyici içindeki kodu, her yineleme için bir tane olmak üzere, birden çok kez koyar.

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

Sonunda, hesaplar dizisini karma haline getiren işleve ulaştık.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }

```

Bu işlev, belirli bir adrese sahip hesabı bulur. Bu işlev standart kodda çok verimsiz olurdu çünkü adresi bulduktan sonra bile tüm hesaplar üzerinde yinelenir.

Ancak sıfır bilgi ispatlarında akış kontrolü yoktur. Bir koşulu kontrol etmemiz gerekirse, her seferinde kontrol etmemiz gerekir.

`if` ifadeleriyle benzer bir şey olur. Yukarıdaki döngüdeki `if` ifadesi bu matematiksel ifadelere çevrilir.

_koşul<sub>sonuç</sub> = hesaplar[i].adres == adres_ // eşitlerse bir, değilse sıfır

_hesap<sub>yeni</sub> = koşul<sub>sonuç</sub>\*i + (1-koşul<sub>sonuç</sub>)\*hesap<sub>eski</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} does not have an account");

    account
}
```

[`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) işlevi, iddia yanlışsa sıfır bilgi ispatının çökmesine neden olur. Bu durumda, ilgili adrese sahip bir hesap bulamazsak. Adresi bildirmek için bir [biçim dizesi](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings) kullanırız.

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Bu işlev bir transfer işlemi uygular ve yeni hesaplar dizisini döndürür.

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

Bunlar bir işlemi geçersiz kılabilen iki koşuldur.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Yeni hesaplar dizisini oluşturun ve sonra onu döndürün.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Bu işlev, adresi mesajdan okur.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

Adres her zaman 20 bayt (yani 40 onaltılık basamak) uzunluğundadır ve 7. karakterde başlar.

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

Tutar ve nonce'u mesajdan okuyun.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Mesajda, adresten sonraki ilk sayı transfer edilecek finney (yani ETH'nin binde biri) miktarıdır. İkinci sayı nonce'dır. Aralarındaki metinler dikkate alınmaz.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // We just found it
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

Bir [demet](https://noir-lang.org/docs/noir/concepts/data_types/tuples) döndürmek, Noir'ın bir işlevden birden çok değer döndürme yoludur.

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

Bu işlev, mesajı baytlara dönüştürür, ardından tutarları bir `TransferTxn`'e dönüştürür.

```rust
// The equivalent to Viem's hashMessage
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Hesaplar için Pedersen Karması'nı kullanabildik çünkü bunlar yalnızca sıfır bilgi ispatı içinde karmalanır. Ancak, bu kodda tarayıcı tarafından oluşturulan mesajın imzasını kontrol etmemiz gerekiyor. Bunun için, [EIP 191](https://eips.ethereum.org/EIPS/eip-191)'deki Ethereum imzalama biçimini izlememiz gerekir. Bu, standart bir önek, ASCII cinsinden mesaj uzunluğu ve mesajın kendisiyle birleşik bir arabellek oluşturmamız ve onu karmalamak için Ethereum standardı olan keccak256'yı kullanmamız gerektiği anlamına gelir.

```rust
    // ASCII prefix
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

Bir uygulamanın kullanıcıdan bir işlem olarak veya başka bir amaçla kullanılabilecek bir mesajı imzalamasını istediği durumları önlemek için, EIP 191, tüm imzalı mesajların 0x19 karakteri (geçerli bir ASCII karakteri değil) ve ardından `Ethereum Signed Message:` ve bir yeni satır ile başlamasını belirtir.

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

999'a kadar olan mesaj uzunluklarını ele alın ve daha büyükse başarısız olun. Mesaj uzunluğu sabit olmasına rağmen bu kodu ekledim, çünkü değiştirmeyi kolaylaştırıyor. Bir üretim sisteminde, muhtemelen daha iyi performans için `MESSAGE_LENGTH`'in değişmediğini varsayarsınız.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
```

Ethereum standardı `keccak256` işlevini kullanın.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // address, first 16 bytes of hash, last 16 bytes of hash        
{
```

Bu işlev, mesaj karmasını gerektiren imzayı doğrular. Daha sonra bize imzalayan adresi ve mesaj karmasını sağlar. Mesaj karması, programın geri kalanında bayt dizisinden daha kolay kullanılabildiği için iki `Field` değeri olarak verilir.

İki `Alan` değeri kullanmamız gerekiyor çünkü alan hesaplamaları büyük bir sayıya [modulo](https://en.wikipedia.org/wiki/Modulo) yapılarak yapılır, ancak bu sayı genellikle 256 bitten azdır (aksi takdirde bu hesaplamaları EVM'de yapmak zor olurdu).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

`hash1` ve `hash2`'yi değiştirilebilir değişkenler olarak belirtin ve karmayı bayt bayt bunlara yazın.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Bu, [Solidity'nin `ecrecover`](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions) işlevine benzer, ancak iki önemli farkı vardır:

- İmza geçerli değilse, çağrı bir `assert`'i başarısız kılar ve program iptal edilir.
- Açık anahtar, imzadan ve karmadan kurtarılabilse de, bu harici olarak yapılabilecek bir işlemdir ve bu nedenle sıfır bilgi ispatı içinde yapmaya değmez. Biri bizi burada aldatmaya çalışırsa, imza doğrulaması başarısız olur.

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
        Field,  // Hash of old accounts array
        Field,  // Hash of new accounts array
        Field,  // First 16 bytes of message hash
        Field,  // Last 16 bytes of message hash
    )
```

Sonunda `main` işlevine ulaştık. Hesapların karmasını eski değerden yeni değere geçerli bir şekilde değiştiren bir işlemimiz olduğunu kanıtlamamız gerekiyor. Ayrıca, gönderen kişinin işleminin işlendiğini bilmesi için bu belirli işlem karmasına sahip olduğunu kanıtlamamız gerekir.

```rust
{
    let mut txn = readTransferTxn(message);
```

`txn`'in değiştirilebilir olması gerekir çünkü gönderen adresini mesajdan değil, imzadan okuyoruz.

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

### Aşama 2 - Bir sunucu ekleme {#stage-2}

İkinci aşamada, tarayıcıdan transfer işlemlerini alan ve uygulayan bir sunucu ekliyoruz.

Çalışırken görmek için:

1. Çalışıyorsa Vite'i durdurun.

2. Sunucuyu içeren dalı indirin ve gerekli tüm modüllere sahip olduğunuzdan emin olun.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Noir kodunu derlemeye gerek yok, aşama 1 için kullandığınız kodla aynı.

3. Sunucuyu başlatın.

   ```sh
   npm run start
   ```

4. Ayrı bir komut satırı penceresinde, tarayıcı kodunu sunmak için Vite'i çalıştırın.

   ```sh
   cd client
   npm run dev
   ```

5. [http://localhost:5173](http://localhost:5173) adresindeki istemci koduna göz atın

6. Bir işlem yapmadan önce, gönderebileceğiniz tutarın yanı sıra nonce'u da bilmeniz gerekir. Bu bilgiyi almak için **Hesap verilerini güncelle**'ye tıklayın ve mesajı imzalayın.

   Burada bir ikilemimiz var. Bir yandan, yeniden kullanılabilecek bir mesajı imzalamak istemiyoruz (bir [tekrarlama saldırısı](https://en.wikipedia.org/wiki/Replay_attack)), bu yüzden ilk etapta bir nonce istiyoruz. Ancak, henüz bir nonce'umuz yok. Çözüm, yalnızca bir kez kullanılabilecek ve her iki tarafta da zaten sahip olduğumuz bir nonce seçmektir, örneğin geçerli zaman.

   Bu çözümün sorunu, zamanın mükemmel bir şekilde senkronize olmayabileceğidir. Bu yüzden, her dakika değişen bir değer imzalıyoruz. Bu, tekrarlama saldırılarına karşı güvenlik açığı penceremizin en fazla bir dakika olduğu anlamına gelir. Üretimde imzalanan isteğin TLS tarafından korunacağı ve tünelin diğer tarafının - sunucunun - zaten bakiyeyi ve nonce'u ifşa edebileceği (çalışmak için bunları bilmesi gerekir) göz önüne alındığında, bu kabul edilebilir bir risktir.

7. Tarayıcı bakiye ve nonce'u geri aldığında, transfer formunu gösterir. Hedef adresi ve tutarı seçin ve **Transfer**'e tıklayın. Bu isteği imzalayın.

8. Transferi görmek için ya **Hesap verilerini güncelle**'yi kullanın ya da sunucuyu çalıştırdığınız pencereye bakın. Sunucu, her değiştiğinde durumu günlüğe kaydeder.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Listening on port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 işlendi
    Yeni durum:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 64000 (1) var
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 100000 (0) var
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC 100000 (0) var
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 136000 (0) var
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 100000 (0) var
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 işlendi
    Yeni durum:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 56800 (2) var
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 107200 (0) var
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC 100000 (0) var
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 136000 (0) var
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 100000 (0) var
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 işlendi
    Yeni durum:
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 53800 (3) var
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 107200 (0) var
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC 100000 (0) var
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 139000 (0) var
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 100000 (0) var
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Bu dosya](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) sunucu sürecini içerir ve [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr) adresindeki Noir kodu ile etkileşime girer. İşte ilginç kısımların açıklaması.

```js
import { Noir } from '@noir-lang/noir_js'
```

[noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) kütüphanesi JavaScript kodu ile Noir kodu arasında arayüz oluşturur.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Aritmetik devreyi - önceki aşamada oluşturduğumuz derlenmiş Noir programını - yükleyin ve yürütmeye hazırlanın.

```js
// We only provide account information in return to a signed request
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Hesap bilgilerini sağlamak için sadece imzaya ihtiyacımız var. Bunun nedeni, mesajın ne olacağını ve dolayısıyla mesaj karmasını zaten biliyor olmamızdır.

```js
const processMessage = async (message, signature) => {
```

Bir mesajı işleyin ve kodladığı işlemi yürütün.

```js
    // Get the public key
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Artık sunucuda JavaScript çalıştırdığımıza göre, açık anahtarı istemci yerine orada alabiliriz.

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

`noir.execute` Noir programını çalıştırır. Parametreler [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) dosyasında sağlananlara eşdeğerdir. Uzun değerlerin, Viem'in yaptığı gibi tek bir onaltılık değer (`0x60A7`) olarak değil, onaltılık dizelerden oluşan bir dizi (`["0x60", "0xA7"]`) olarak sağlandığını unutmayın.

```js
    } catch (err) {
        console.log(`Noir error: ${err}`)
        throw Error("Invalid transaction, not processed")
    }
```

Bir hata varsa, onu yakalayın ve ardından basitleştirilmiş bir sürümünü istemciye iletin.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

İşlemi uygulayın. Bunu zaten Noir kodunda yaptık, ancak sonucu oradan çıkarmak yerine burada tekrar yapmak daha kolay.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

Başlangıçtaki `Hesaplar` yapısı.

### Aşama 3 - Ethereum akıllı sözleşmeleri {#stage-3}

1. Sunucu ve istemci süreçlerini durdurun.

2. Akıllı sözleşmeleri içeren dalı indirin ve gerekli tüm modüllere sahip olduğunuzdan emin olun.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. `anvil`'i ayrı bir komut satırı penceresinde çalıştırın.

4. Doğrulama anahtarını ve solidity doğrulayıcısını oluşturun, ardından doğrulayıcı kodunu Solidity projesine kopyalayın.

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

6. `Verifier.sol`'u dağıtın ve adresi bir ortam değişkeninde saklayın.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. `ZkBank` sözleşmesini dağıtın.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   `0x199..67b` değeri, `Hesaplar`ın başlangıç durumunun Pederson karmasıdır. Bu başlangıç durumunu `server/index.mjs`'de değiştirirseniz, sıfır bilgi ispatı tarafından bildirilen başlangıç karmasını görmek için bir işlem çalıştırabilirsiniz.

8. Sunucuyu çalıştırın.

   ```sh
   cd ../server
   npm run start
   ```

9. İstemciyi farklı bir komut satırı penceresinde çalıştırın.

   ```sh
   cd client
   npm run dev
   ```

10. Bazı işlemler çalıştırın.

11. Durumun zincir üzerinde değiştiğini doğrulamak için sunucu sürecini yeniden başlatın. `ZkBank`'in artık işlemleri kabul etmediğini görün, çünkü işlemlerdeki orijinal karma değeri, zincir üzerinde saklanan karma değerinden farklıdır.

    Bu beklenen hata türüdür.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Listening on port 3000
    Doğrulama hatası: ContractFunctionExecutionError: The contract function "processTransaction" reverted with the following reason:
    Yanlış eski durum karması

    Contract Call:
        adres:   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        işlev:  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args:                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Bu dosyadaki değişiklikler çoğunlukla gerçek kanıtı oluşturmak ve zincir üstünde göndermekle ilgilidir.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Zincir üstünde gönderilecek gerçek kanıtı oluşturmak için [Barretenberg paketini](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) kullanmamız gerekiyor. Bu paketi komut satırı arayüzünü (`bb`) çalıştırarak veya [JavaScript kütüphanesi olan `bb.js`](https://www.npmjs.com/package/@aztec/bb.js) kullanarak kullanabiliriz. JavaScript kütüphanesi, kodu yerel olarak çalıştırmaktan çok daha yavaştır, bu yüzden burada komut satırını kullanmak için [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) kullanıyoruz.

`bb.js` kullanmaya karar verirseniz, kullandığınız Noir sürümüyle uyumlu bir sürüm kullanmanız gerektiğini unutmayın. Bu yazının yazıldığı sırada, mevcut Noir sürümü (1.0.0-beta.11) `bb.js` sürüm 0.87'yi kullanıyor.

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

Bu özel anahtar, `anvil`'deki varsayılan önceden finanse edilmiş hesaplardan biridir.

```js
const generateProof = async (witness, fileID) => {
```

`bb` yürütülebilir dosyasını kullanarak bir kanıt oluşturun.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Tanığı bir dosyaya yazın.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Aslında kanıtı yaratın. Bu adım aynı zamanda genel değişkenleri içeren bir dosya oluşturur, ancak buna ihtiyacımız yok. Bu değişkenleri zaten `noir.execute`'den aldık.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

Kanıt, her biri onaltılık bir değer olarak temsil edilen `Alan` değerlerinden oluşan bir JSON dizisidir. Ancak, bunu işlemde tek bir `bayt` değeri olarak göndermemiz gerekiyor, bu da Viem'in büyük bir onaltılık dize ile temsil ettiği bir şey. Burada, tüm değerleri birleştirerek, tüm `0x`'leri kaldırarak ve ardından sonunda bir tane ekleyerek biçimi değiştiriyoruz.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Temizleyin ve kanıtı geri döndürün.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Genel alanların 32 baytlık değerlerden oluşan bir dizi olması gerekir. Ancak, işlem karmasını iki `Alan` değeri arasında bölmemiz gerektiği için, 16 baytlık bir değer olarak görünür. Burada Viem'in aslında 32 bayt olduğunu anlaması için sıfırlar ekliyoruz.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Her adres her nonce'u yalnızca bir kez kullanır, böylece `fromAddress` ve `nonce` kombinasyonunu tanık dosyası ve çıktı dizini için benzersiz bir tanımlayıcı olarak kullanabiliriz.

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

Bu, işlemi alan zincir üstü koddur.

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

Zincir üstü kodun iki değişkeni takip etmesi gerekir: doğrulayıcı (`nargo` tarafından oluşturulan ayrı bir sözleşme) ve mevcut durum karması.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Durum her değiştiğinde, bir `TransactionProcessed` olayı yayınlarız.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Bu işlev işlemleri işler. Kanıtı (`bayt` olarak) ve genel girdileri (`bayt32` dizisi olarak), doğrulayıcının gerektirdiği biçimde alır (zincir üstü işlemeyi ve dolayısıyla gaz maliyetlerini en aza indirmek için).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Wrong old state hash");
```

Sıfır bilgi ispatının, işlemin mevcut karmamızdan yeni bir karma değerine değişmesi olması gerekir.

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

Her şey yolundaysa, durum karmasını yeni değere güncelleyin ve bir `TransactionProcessed` olayı yayınlayın.

## Merkezi bileşen tarafından yapılan suistimaller {#abuses}

Bilgi güvenliği üç özellikten oluşur:

- _Gizlilik_, kullanıcılar okumaya yetkili olmadıkları bilgileri okuyamazlar.
- _Bütünlük_, bilgi yalnızca yetkili kullanıcılar tarafından yetkili bir şekilde değiştirilebilir.
- _Kullanılabilirlik_, yetkili kullanıcılar sistemi kullanabilir.

Bu sistemde bütünlük, sıfır bilgi ispatları aracılığıyla sağlanır. Kullanılabilirliği garanti etmek çok daha zordur ve gizlilik imkansızdır, çünkü bankanın her hesabın bakiyesini ve tüm işlemleri bilmesi gerekir. Bilgi sahibi bir varlığın bu bilgiyi paylaşmasını engellemenin bir yolu yoktur.

[Gizli adresler](https://vitalik.eth.limo/general/2023/01/20/stealth.html) kullanarak gerçekten gizli bir banka oluşturmak mümkün olabilir, ancak bu bu makalenin kapsamı dışındadır.

### Yanlış bilgi {#false-info}

Sunucunun bütünlüğü ihlal etmesinin bir yolu, [veri istendiğinde](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291) yanlış bilgi sağlamaktır.

Bunu çözmek için, hesapları özel bir girdi olarak ve bilgi istenen adresi genel bir girdi olarak alan ikinci bir Noir programı yazabiliriz. Çıktı, o adresin bakiyesi ve nonce'u ile hesapların karmasıdır.

Elbette, bu kanıt zincir üstünde doğrulanamaz, çünkü nonce'ları ve bakiyeleri zincir üstünde yayınlamak istemiyoruz. Ancak, tarayıcıda çalışan istemci kodu tarafından doğrulanabilir.

### Zorunlu işlemler {#forced-txns}

L2'lerde kullanılabilirliği sağlamak ve sansürü önlemek için kullanılan normal mekanizma [zorunlu işlemlerdir](https://docs.optimism.io/stack/transactions/forced-transaction). Ancak zorunlu işlemler sıfır bilgi ispatlarıyla birleştirilmez. Sunucu, işlemleri doğrulayabilen tek varlıktır.

`smart-contracts/src/ZkBank.sol` dosyasını, zorunlu işlemleri kabul edecek ve sunucunun işlenene kadar durumu değiştirmesini önleyecek şekilde değiştirebiliriz. Ancak bu, bizi basit bir hizmet reddi saldırısına açık hale getirir. Zorunlu bir işlem geçersizse ve bu nedenle işlenmesi imkansızsa ne olur?

Çözüm, zorunlu bir işlemin geçersiz olduğuna dair bir sıfır bilgi ispatına sahip olmaktır. Bu, sunucuya üç seçenek sunar:

- Zorunlu işlemi işleyin, işlendiğine dair bir sıfır bilgi ispatı ve yeni durum karmasını sağlayın.
- Zorunlu işlemi reddedin ve sözleşmeye işlemin geçersiz olduğuna (bilinmeyen adres, kötü nonce veya yetersiz bakiye) dair bir sıfır bilgi ispatı sağlayın.
- Zorunlu işlemi yoksayın. Sunucuyu işlemi gerçekten işlemeye zorlamanın bir yolu yoktur, ancak bu tüm sistemin kullanılamaz olduğu anlamına gelir.

#### Kullanılabilirlik tahvilleri {#avail-bonds}

Gerçek hayattaki bir uygulamada, muhtemelen sunucuyu çalışır durumda tutmak için bir tür kar amacı güdüsü olurdu. Sunucunun, zorunlu bir işlemin belirli bir süre içinde işlenmemesi durumunda herkesin yakabileceği bir kullanılabilirlik tahvili göndermesini sağlayarak bu teşviki güçlendirebiliriz.

### Kötü Noir kodu {#bad-noir-code}

Normalde, insanların bir akıllı sözleşmeye güvenmesini sağlamak için kaynak kodunu bir [blok gezginine](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract) yükleriz. Ancak, sıfır bilgi ispatları durumunda bu yetersizdir.

`Verifier.sol`, Noir programının bir işlevi olan doğrulama anahtarını içerir. Ancak bu anahtar bize Noir programının ne olduğunu söylemez. Gerçekten güvenilir bir çözüme sahip olmak için, Noir programını (ve onu oluşturan sürümü) yüklemeniz gerekir. Aksi takdirde, sıfır bilgi ispatları farklı bir programı, arka kapısı olan bir programı yansıtabilir.

Blok gezginleri Noir programlarını yüklememize ve doğrulamamıza izin vermeye başlayana kadar, bunu kendiniz yapmalısınız (tercihen [IPFS](/developers/tutorials/ipfs-decentralized-ui/)'e). Daha sonra gelişmiş kullanıcılar kaynak kodunu indirebilecek, kendileri derleyebilecek, `Verifier.sol` dosyasını oluşturabilecek ve zincir üzerindekiyle aynı olduğunu doğrulayabilecekler.

## Sonuç {#conclusion}

Plazma tipi uygulamalar, bilgi depolama olarak merkezi bir bileşen gerektirir. Bu, potansiyel güvenlik açıklarını ortaya çıkarır, ancak karşılığında blokzincirinin kendisinde bulunmayan şekillerde gizliliği korumamıza olanak tanır. Sıfır bilgi ispatlarıyla bütünlüğü sağlayabilir ve merkezi bileşeni çalıştıran kişinin kullanılabilirliği sürdürmesini ekonomik olarak avantajlı hale getirebiliriz.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).

## Teşekkürler {#acknowledgements}

- Josh Crites bu makalenin bir taslağını okudu ve bana çetrefilli bir Noir konusunda yardım etti.

Kalan hatalar benim sorumluluğumdadır.
