---
title: "Gizli bir durum için sıfır bilgi kullanımı"
description: "Zincir içi oyunlar, hiçbir gizli bilgiyi tutamadıkları için sınırlıdır. Bu öğreticiyi okuduktan sonra, okuyucu sıfır bilgi ispatlarını ve sunucu bileşenlerini birleştirerek gizli bir duruma sahip, zincir dışı bir bileşenle doğrulanabilir oyunlar oluşturabilecektir. Bunu yapma tekniği bir mayın tarlası oyunu oluşturularak gösterilecektir."
author: Ori Pomerantz
tags:
  - sunucu
  - zincir dışı
  - merkezi
  - sıfır bilgi
  - zokrates
  - mud
  - gizlilik
skill: advanced
breadcrumb: ZK gizli durum
lang: tr
published: 2025-03-15
---

_Blokzincirde sır yoktur_. Blokzincirde yayınlanan her şey herkesin okumasına açıktır. Bu gereklidir, çünkü Blokzincir herkesin onu doğrulayabilmesine dayanır. Ancak, oyunlar genellikle gizli duruma dayanır. Örneğin, bir blok gezginine gidip haritayı görebiliyorsanız [mayın tarlası](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) oyununun hiçbir anlamı kalmaz.

En basit çözüm, gizli durumu tutmak için bir [sunucu bileşeni](/developers/tutorials/server-components/) kullanmaktır. Ancak, Blokzincir kullanmamızın nedeni oyun geliştiricisinin hile yapmasını önlemektir. Sunucu bileşeninin dürüstlüğünden emin olmalıyız. Sunucu, durumun bir hash'ini sağlayabilir ve bir hamlenin sonucunu hesaplamak için kullanılan durumun doğru olduğunu kanıtlamak için [sıfır bilgi ispatları](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) kullanabilir.

Bu makaleyi okuduktan sonra, bu tür gizli durum tutan bir sunucu, durumu göstermek için bir istemci ve ikisi arasındaki iletişim için zincir içi bir bileşen oluşturmayı öğreneceksiniz. Kullanacağımız ana araçlar şunlar olacaktır:

| Araç                                          | Amaç                                                 | Doğrulanan sürüm |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | Sıfır bilgi ispatları ve bunların doğrulanması            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | Hem sunucu hem de istemci için programlama dili |               5.4.2 |
| [Node](https://nodejs.org/en)                 | Sunucuyu çalıştırma                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | Blokzincir ile iletişim                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | Zincir içi veri yönetimi                                 |              2.0.12 |
| [React](https://react.dev/)                   | İstemci kullanıcı arayüzü                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | İstemci kodunu sunma                                 |               4.2.1 |

## Mayın Tarlası örneği {#minesweeper}

[Mayın Tarlası](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>), mayın tarlası içeren gizli bir haritaya sahip bir oyundur. Oyuncu belirli bir konumu kazmayı seçer. Eğer o konumda bir mayın varsa, oyun biter. Aksi takdirde, oyuncu o konumu çevreleyen sekiz karedeki mayın sayısını elde eder.

Bu uygulama, verileri bir [anahtar-değer veritabanı](https://aws.amazon.com/nosql/key-value/) kullanarak zincir içi depolamamızı ve bu verileri zincir dışı bileşenlerle otomatik olarak senkronize etmemizi sağlayan bir çerçeve olan [MUD](https://mud.dev/) kullanılarak yazılmıştır. Senkronizasyona ek olarak MUD, erişim kontrolü sağlamayı ve diğer kullanıcıların uygulamamızı izinsiz bir şekilde [genişletmesini](https://mud.dev/guides/extending-a-world) kolaylaştırır.

### Mayın tarlası örneğini çalıştırma {#running-minesweeper-example}

Mayın tarlası örneğini çalıştırmak için:

1. [Ön koşulların kurulu olduğundan](https://mud.dev/quickstart#prerequisites) emin olun: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) ve [`mprocs`](https://github.com/pvolok/mprocs).

2. Depoyu klonlayın.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Paketleri kurun.

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   Eğer Foundry, `pnpm install`'nin bir parçası olarak kurulduysa, komut satırı kabuğunu yeniden başlatmanız gerekir.

4. Sözleşmeleri derleyin

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. Programı başlatın (bir [anvil](https://book.getfoundry.sh/anvil/) blokzinciri dahil) ve bekleyin.

   ```sh copy
   mprocs
   ```

   Başlatmanın uzun sürdüğünü unutmayın. İlerlemeyi görmek için, dağıtılan MUD sözleşmelerini görmek üzere aşağı oku kullanarak _contracts_ sekmesine kaydırın. _Waiting for file changes…_ mesajını aldığınızda, sözleşmeler dağıtılmış demektir ve daha fazla ilerleme _server_ sekmesinde gerçekleşecektir. Orada, _Verifier address: 0x...._ mesajını alana kadar beklersiniz.

   Bu adım başarılı olursa, solda farklı süreçlerin ve sağda o an seçili sürecin konsol çıktısının bulunduğu `mprocs` ekranını göreceksiniz.

   ![The mprocs screen](./mprocs.png)

   `mprocs` ile ilgili bir sorun varsa, dört süreci her biri kendi komut satırı penceresinde olacak şekilde manuel olarak çalıştırabilirsiniz:

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Sözleşmeler** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Sunucu**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **İstemci**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. Artık [istemciye](http://localhost:3000) göz atabilir, **New Game** (Yeni Oyun) düğmesine tıklayabilir ve oynamaya başlayabilirsiniz.

### Tablolar {#tables}

Zincir içi [birkaç tabloya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) ihtiyacımız var.

- `Configuration`: Bu tablo bir singleton'dır, anahtarı yoktur ve tek bir kaydı vardır. Oyun yapılandırma bilgilerini tutmak için kullanılır:
  - `height`: Bir mayın tarlasının yüksekliği
  - `width`: Bir mayın tarlasının genişliği
  - `numberOfBombs`: Her mayın tarlasındaki bomba sayısı
- `VerifierAddress`: Bu tablo da bir singleton'dır. Yapılandırmanın bir parçasını, doğrulayıcı sözleşmesinin adresini (`verifier`) tutmak için kullanılır. Bu bilgiyi `Configuration` tablosuna koyabilirdik, ancak farklı bir bileşen olan sunucu tarafından ayarlandığı için ayrı bir tabloya koymak daha kolaydır.

- `PlayerGame`: Anahtar, oyuncunun adresidir. Veriler şunlardır:

  - `gameId`: Oyuncunun üzerinde oynadığı haritanın hash'i olan 32 baytlık değer (oyun tanımlayıcısı).
  - `win`: oyuncunun oyunu kazanıp kazanmadığını belirten bir boolean.
  - `lose`: oyuncunun oyunu kaybedip kaybetmediğini belirten bir boolean.
  - `digNumber`: oyundaki başarılı kazı sayısı.

- `GamePlayer`: Bu tablo, `gameId` değerinden oyuncu adresine olan ters eşlemeyi tutar.

- `Map`: Anahtar, üç değerden oluşan bir demettir (tuple):

  - `gameId`: Oyuncunun üzerinde oynadığı haritanın hash'i olan 32 baytlık değer (oyun tanımlayıcısı).
  - `x` koordinatı
  - `y` koordinatı

  Değer tek bir sayıdır. Eğer bir bomba tespit edildiyse 255'tir. Aksi takdirde, o konumun etrafındaki bomba sayısı artı birdir. Sadece bomba sayısını kullanamayız, çünkü varsayılan olarak EVM'deki tüm depolama ve MUD'daki tüm satır değerleri sıfırdır. "Oyuncu henüz burayı kazmadı" ile "oyuncu burayı kazdı ve etrafta sıfır bomba olduğunu buldu" durumlarını birbirinden ayırmamız gerekir.

Buna ek olarak, istemci ve sunucu arasındaki iletişim zincir içi bileşen üzerinden gerçekleşir. Bu da tablolar kullanılarak uygulanır.

- `PendingGame`: Yeni bir oyun başlatmak için hizmet verilmeyen talepler.
- `PendingDig`: Belirli bir oyunda belirli bir yeri kazmak için hizmet verilmeyen talepler. Bu bir [zincir dışı tablodur](https://mud.dev/store/tables#types-of-tables), yani EVM depolamasına yazılmaz, yalnızca olaylar kullanılarak zincir dışı okunabilir.

### Yürütme ve veri akışları {#execution-data-flows}

Bu akışlar istemci, zincir içi bileşen ve sunucu arasındaki yürütmeyi koordine eder.

#### Başlatma {#initialization-flow}

`mprocs` çalıştırdığınızda şu adımlar gerçekleşir:

1. [`mprocs`](https://github.com/pvolok/mprocs) dört bileşen çalıştırır:

   - Yerel bir blokzinciri çalıştıran [Anvil](https://book.getfoundry.sh/anvil/)
   - MUD için sözleşmeleri derleyen (gerekirse) ve dağıtan [Sözleşmeler](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)
   - Kullanıcı arayüzünü ve istemci kodunu web tarayıcılarına sunmak için [Vite](https://vitejs.dev/) çalıştıran [İstemci](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client).
   - Sunucu eylemlerini gerçekleştiren [Sunucu](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)

2. `contracts` paketi MUD sözleşmelerini dağıtır ve ardından [`PostDeploy.s.sol` betiğini](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) çalıştırır. Bu betik yapılandırmayı ayarlar. GitHub'daki kod, [içinde sekiz mayın bulunan 10x5'lik bir mayın tarlası](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) belirtir.

3. [Sunucu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts), [MUD'u kurarak](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) başlar. Diğer şeylerin yanı sıra bu, veri senkronizasyonunu etkinleştirir, böylece ilgili tabloların bir kopyası sunucunun belleğinde bulunur.

4. Sunucu, [`Configuration` tablosu değiştiğinde](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) yürütülecek bir fonksiyona abone olur. [Bu fonksiyon](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168), `PostDeploy.s.sol` yürütülüp tabloyu değiştirdikten sonra çağrılır.

5. Sunucu başlatma fonksiyonu yapılandırmayı aldığında, [sunucunun sıfır bilgi kısmını](#using-zokrates-from-typescript) başlatmak için [`zkFunctions` çağrısı yapar](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35). Bu, yapılandırmayı alana kadar gerçekleşemez çünkü sıfır bilgi fonksiyonlarının mayın tarlasının genişliğini ve yüksekliğini sabit olarak alması gerekir.

6. Sunucunun sıfır bilgi kısmı başlatıldıktan sonraki adım, [sıfır bilgi doğrulama sözleşmesini blokzincirine dağıtmak](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) ve MUD'da doğrulayıcı adresi ayarlamaktır.

7. Son olarak, bir oyuncunun [yeni bir oyun başlatmayı](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) veya [mevcut bir oyunda kazı yapmayı](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) ne zaman talep ettiğini görmek için güncellemelere abone oluruz.

#### Yeni oyun {#new-game-flow}

Oyuncu yeni bir oyun talep ettiğinde şunlar olur.

1. Bu oyuncu için devam eden bir oyun yoksa veya gameId'si sıfır olan bir oyun varsa, istemci bir [yeni oyun düğmesi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) görüntüler. Kullanıcı bu düğmeye bastığında, [React `newGame` fonksiyonunu çalıştırır](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) bir `System` çağrısıdır. MUD'da tüm çağrılar `World` sözleşmesi üzerinden yönlendirilir ve çoğu durumda `<namespace>__<function name>` çağrısı yaparsınız. Bu durumda çağrı `app__newGame`'edir ve MUD bunu daha sonra [`GameSystem` içindeki `newGame`'a](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) yönlendirir.

3. Zincir içi fonksiyon, oyuncunun devam eden bir oyunu olmadığını kontrol eder ve eğer yoksa [talebi `PendingGame` tablosuna ekler](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Sunucu `PendingGame` içindeki değişikliği algılar ve [abone olunan fonksiyonu çalıştırır](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Bu fonksiyon [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114) çağrısı yapar, o da sırasıyla [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144) çağrısı yapar.

5. `createGame`'nin yaptığı ilk şey [uygun sayıda mayın içeren rastgele bir harita oluşturmaktır](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Ardından, Zokrates için gerekli olan boş kenarlıklı bir harita oluşturmak üzere [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) çağrısı yapar. Son olarak, `createGame`, oyun kimliği olarak kullanılan haritanın hash'ini almak için [`calculateMapHash`](#calculatemaphash) çağrısı yapar.

6. `newGame` fonksiyonu yeni oyunu `gamesInProgress`'e ekler.

7. Sunucunun yaptığı son şey, zincir içi olan [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43) çağrısı yapmaktır. Bu fonksiyon, erişim kontrolünü sağlamak için farklı bir `System` olan [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) içindedir. Erişim kontrolü, [MUD yapılandırma dosyasında](https://mud.dev/config) ([`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72)) tanımlanmıştır.

   Erişim listesi yalnızca tek bir adresin `System` çağrısı yapmasına izin verir. Bu, sunucu fonksiyonlarına erişimi tek bir adresle sınırlar, böylece hiç kimse sunucuyu taklit edemez.

8. Zincir içi bileşen ilgili tabloları günceller:

   - Oyunu `PlayerGame` içinde oluşturur.
   - Ters eşlemeyi `GamePlayer` içinde ayarlar.
   - Talebi `PendingGame` içinden kaldırır.

9. Sunucu `PendingGame` içindeki değişikliği tanımlar, ancak [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) yanlış (false) olduğu için hiçbir şey yapmaz.

10. İstemcide [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148), oyuncunun adresi için `PlayerGame` girdisine ayarlanır. `PlayerGame` değiştiğinde, `gameRecord` de değişir.

11. Eğer `gameRecord` içinde bir değer varsa ve oyun kazanılmamış veya kaybedilmemişse, istemci [haritayı görüntüler](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Kazı {#dig-flow}

1. Oyuncu [harita hücresinin düğmesine tıklar](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), bu da [`dig` fonksiyonunu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) çağırır. Bu fonksiyon zincir içi [`dig` çağrısı yapar](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32).

2. Zincir içi bileşen [bir dizi mantık kontrolü gerçekleştirir](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) ve başarılı olursa kazı talebini [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) içine ekler.

3. Sunucu [`PendingDig` içindeki değişikliği algılar](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Eğer geçerliyse](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), hem sonucu hem de geçerli olduğuna dair bir ispat oluşturmak için [sıfır bilgi kodunu çağırır](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (aşağıda açıklanmıştır).

4. [Sunucu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) zincir içi [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) çağrısı yapar.

5. `digResponse` iki şey yapar. İlk olarak, [sıfır bilgi ispatını](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) kontrol eder. Ardından, ispat doğrulanırsa, sonucu fiilen işlemek için [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) çağrısı yapar.

6. `processDigResult`, oyunun [kaybedilip](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) kaybedilmediğini veya [kazanılıp](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) kazanılmadığını kontrol eder ve [zincir içi harita olan `Map`'yi günceller](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. İstemci güncellemeleri otomatik olarak alır ve [oyuncuya gösterilen haritayı günceller](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190) ve eğer geçerliyse oyuncuya kazanıp kazanmadığını veya kaybedip kaybetmediğini söyler.

## Zokrates Kullanımı {#using-zokrates}

Yukarıda açıklanan akışlarda sıfır bilgi kısımlarını atlayarak onları bir kara kutu gibi ele aldık. Şimdi onu açalım ve bu kodun nasıl yazıldığına bakalım.

### Haritayı hashleme {#hashing-map}

Kullandığımız Zokrates hash fonksiyonu olan [Poseidon](https://www.poseidon-hash.info)'u uygulamak için [bu JavaScript kodunu](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) kullanabiliriz. Ancak bu daha hızlı olsa da, bunu yapmak için sadece Zokrates hash fonksiyonunu kullanmaktan daha karmaşık olacaktır. Bu bir eğitimdir ve bu nedenle kod performans için değil, basitlik için optimize edilmiştir. Bu nedenle, iki farklı Zokrates programına ihtiyacımız var; biri sadece bir haritanın hash'ini hesaplamak için (`hash`) ve diğeri haritadaki bir konumdaki kazı sonucunun sıfır bilgi ispatını fiilen oluşturmak için (`dig`).

### Hash fonksiyonu {#hash-function}

Bu, bir haritanın hash'ini hesaplayan fonksiyondur. Bu kodun üzerinden satır satır geçeceğiz.

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

Bu iki satır, [Zokrates standart kütüphanesinden](https://zokrates.github.io/toolbox/stdlib.html) iki fonksiyonu içe aktarır. [İlk fonksiyon](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) bir [Poseidon hash'idir](https://www.poseidon-hash.info/). Bir [`field` elemanları](https://zokrates.github.io/language/types.html#field) dizisi alır ve bir `field` döndürür.

Zokrates'teki alan (field) elemanı tipik olarak 256 bitten daha kısadır, ancak çok da kısa değildir. Kodu basitleştirmek için haritayı 512 bite kadar sınırlandırıyoruz ve dört alandan oluşan bir diziyi hashliyoruz ve her alanda yalnızca 128 bit kullanıyoruz. [`pack128` fonksiyonu](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) bu amaçla 128 bitlik bir diziyi bir `field` değerine dönüştürür.

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Bu satır bir fonksiyon tanımını başlatır. `hashMap`, iki boyutlu bir `bool`(ean) dizisi olan `map` adında tek bir parametre alır. Haritanın boyutu, [aşağıda açıklanan](#why-map-border) nedenlerden dolayı `width+2`'e `height+2`'dir.

Zokrates programları bu uygulamada [şablon dizeleri (template strings)](https://www.w3schools.com/js/js_string_templates.asp) olarak saklandığı için `${width+2}` ve `${height+2}` kullanabiliriz. `${` ve `}` arasındaki kod JavaScript tarafından değerlendirilir ve bu şekilde program farklı harita boyutları için kullanılabilir. Harita parametresinin etrafında hiç bomba bulunmayan bir konum genişliğinde bir sınır vardır, bu da genişliğe ve yüksekliğe iki eklememiz gerekmesinin nedenidir.

Dönüş değeri, hash'i içeren bir `field` değeridir.

```
bool[512] mut map1d = [false; 512];
```

Harita iki boyutludur. Ancak, `pack128` fonksiyonu iki boyutlu dizilerle çalışmaz. Bu yüzden önce `map1d` kullanarak haritayı 512 baytlık bir diziye düzleştiriyoruz. Varsayılan olarak Zokrates değişkenleri sabittir, ancak bir döngü içinde bu diziye değerler atamamız gerekir, bu yüzden onu [`mut`](https://zokrates.github.io/language/variables.html#mutability) olarak tanımlarız.

Zokrates'te `undefined` olmadığı için diziyi başlatmamız gerekir. `[false; 512]` ifadesi, [512 adet `false` değerinden oluşan bir dizi](https://zokrates.github.io/language/types.html#declaration-and-initialization) anlamına gelir.

```
u32 mut counter = 0;
```

Ayrıca `map1d` içinde zaten doldurduğumuz bitler ile doldurmadıklarımızı ayırt etmek için bir sayaca ihtiyacımız var.

```
for u32 x in 0..${width+2} {
```

Zokrates'te bir [`for` döngüsü](https://zokrates.github.io/language/control_flow.html#for-loops) bu şekilde bildirilir. Bir Zokrates `for` döngüsünün sabit sınırları olmalıdır, çünkü bir döngü gibi görünse de derleyici aslında onu "açar" (unroll). `${width+2}` ifadesi bir derleme zamanı sabitidir çünkü `width`, derleyiciyi çağırmadan önce TypeScript kodu tarafından ayarlanır.

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

Haritadaki her konum için, o değeri `map1d` dizisine koyun ve sayacı artırın.

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`map1d`'den dört `field` değerinden oluşan bir dizi oluşturmak için `pack128` kullanılır. Zokrates'te `array[a..b]`, dizinin `a`'da başlayan ve `b-1`'de biten dilimi anlamına gelir.

```
return poseidon(hashMe);
}
```

Bu diziyi bir hash'e dönüştürmek için `poseidon` kullanın.

### Hash programı {#hash-program}

Sunucunun oyun tanımlayıcıları oluşturmak için doğrudan `hashMap`'ı çağırması gerekir. Ancak Zokrates, başlamak için bir programda yalnızca `main` fonksiyonunu çağırabilir, bu nedenle hash fonksiyonunu çağıran bir `main`'e sahip bir program oluşturuyoruz.

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### Kazı programı {#dig-program}

Bu, uygulamanın sıfır bilgi kısmının kalbidir; burada kazı sonuçlarını doğrulamak için kullanılan ispatları üretiriz.

```
${hashFragment}

// (x,y) konumundaki mayın sayısı
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### Neden harita sınırı {#why-map-border}

Sıfır bilgi ispatları, bir `if` ifadesinin kolay bir eşdeğerine sahip olmayan [aritmetik devreler](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) kullanır. Bunun yerine, [koşullu operatörün](https://en.wikipedia.org/wiki/Ternary_conditional_operator) eşdeğerini kullanırlar. Eğer `a` sıfır veya bir olabiliyorsa, `if a { b } else { c }`'yi `ab+(1-a)c` olarak hesaplayabilirsiniz.

Bu nedenle, bir Zokrates `if` ifadesi her zaman her iki dalı da değerlendirir. Örneğin, şu koda sahipseniz:

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

Hata verecektir, çünkü bu değer daha sonra sıfırla çarpılacak olsa bile `arr[10]`'u hesaplaması gerekir.

Haritanın etrafında bir konum genişliğinde bir sınıra ihtiyaç duymamızın nedeni budur. Bir konumun etrafındaki toplam mayın sayısını hesaplamamız gerekir ve bu, kazdığımız konumun bir satır üstündeki ve altındaki, solundaki ve sağındaki konumu görmemiz gerektiği anlamına gelir. Bu da, bu konumların Zokrates'e sağlanan harita dizisinde var olması gerektiği anlamına gelir.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Varsayılan olarak Zokrates ispatları girdilerini içerir. Hangi nokta olduğunu gerçekten bilmediğiniz sürece bir noktanın etrafında beş mayın olduğunu bilmenin bir faydası yoktur (ve bunu sadece isteğinizle eşleştiremezsiniz, çünkü o zaman kanıtlayıcı farklı değerler kullanabilir ve size bundan bahsetmeyebilir). Ancak, haritayı Zokrates'e sağlarken bir sır olarak saklamamız gerekir. Çözüm, ispat tarafından açığa _çıkarılmayan_ bir `private` parametresi kullanmaktır.

Bu, suistimal için başka bir yol açar. Kanıtlayıcı doğru koordinatları kullanabilir, ancak konumun etrafında ve muhtemelen konumun kendisinde herhangi bir sayıda mayın içeren bir harita oluşturabilir. Bu suistimali önlemek için, sıfır bilgi ispatının oyun tanımlayıcısı olan haritanın hash'ini içermesini sağlıyoruz.

```
return (hashMap(map),
```

Buradaki dönüş değeri, harita hash dizisinin yanı sıra kazı sonucunu da içeren bir demettir (tuple).

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Konumun kendisinde bir bomba olması durumunda özel bir değer olarak 255 kullanıyoruz.

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

Eğer oyuncu bir mayına çarpmadıysa, konumun etrafındaki alan için mayın sayılarını ekleyin ve bunu döndürün.

### TypeScript'ten Zokrates Kullanımı {#using-zokrates-from-typescript}

Zokrates'in bir komut satırı arayüzü vardır, ancak bu programda onu [TypeScript kodunda](https://zokrates.github.io/toolbox/zokrates_js.html) kullanıyoruz.

Zokrates tanımlarını içeren kütüphane [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) olarak adlandırılır.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript bağlamalarını](https://zokrates.github.io/toolbox/zokrates_js.html) içe aktarın. Yalnızca [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) fonksiyonuna ihtiyacımız var çünkü tüm Zokrates tanımlarına çözümlenen bir söz (promise) döndürür.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates'in kendisine benzer şekilde, biz de yalnızca bir fonksiyon dışa aktarıyoruz ve bu da [asenkrondur](https://www.w3schools.com/js/js_async.asp). Sonunda döndüğünde, aşağıda göreceğimiz gibi birkaç fonksiyon sağlar.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates'i başlatın, kütüphaneden ihtiyacımız olan her şeyi alın.

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

Sırada yukarıda gördüğümüz hash fonksiyonu ve iki Zokrates programı var.

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

Burada bu programları derliyoruz.

```typescript
// Sıfır bilgi doğrulaması için anahtarları oluşturun.
// Bir üretim sisteminde kurulum seremonisi kullanmak istersiniz.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

Bir üretim sisteminde daha karmaşık bir [kurulum seremonisi](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) kullanabiliriz, ancak bu bir gösterim için yeterince iyidir. Kullanıcıların kanıtlayıcı anahtarını (prover key) bilmesi bir sorun değildir - doğru olmadıkları sürece bir şeyleri kanıtlamak için onu yine de kullanamazlar. Entropiyi (ikinci parametre, `""`) belirttiğimiz için sonuçlar her zaman aynı olacaktır.

**Not:** Zokrates programlarının derlenmesi ve anahtar oluşturma yavaş süreçlerdir. Bunları her seferinde tekrarlamaya gerek yoktur, sadece harita boyutu değiştiğinde tekrarlanmalıdır. Bir üretim sisteminde bunları bir kez yapar ve ardından çıktıyı saklarsınız. Burada bunu yapmamamın tek nedeni basitliktir.

#### `calculateMapHash` {#calculatemaphash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) fonksiyonu aslında Zokrates programını çalıştırır. İki alana sahip bir yapı döndürür: programın JSON dizesi olarak çıktısı olan `output` ve sonucun sıfır bilgi ispatını oluşturmak için gereken bilgi olan `witness`. Burada sadece çıktıya ihtiyacımız var.

Çıktı, tırnak işaretleri içine alınmış ondalık bir sayı olan `"31337"` biçiminde bir dizedir. Ancak `viem` için ihtiyacımız olan çıktı, `0x60A7` biçiminde onaltılık (hexadecimal) bir sayıdır. Bu yüzden tırnak işaretlerini kaldırmak için `.slice(1,-1)` kullanıyoruz ve ardından ondalık bir sayı olan kalan dizeyi bir [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) değerine dönüştürmek için `BigInt` kullanıyoruz. `.toString(16)` bu `BigInt` değerini onaltılık bir dizeye dönüştürür ve `"0x"+` onaltılık sayılar için işareti ekler.

```typescript
// Kazın ve sonucun bir sıfır bilgi ispatını döndürün
// (sunucu tarafı kodu)
```

Sıfır bilgi ispatı, genel girdileri (`x` ve `y`) ve sonuçları (haritanın hash'i ve bomba sayısı) içerir.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

Zokrates'te bir endeksin sınırların dışında olup olmadığını kontrol etmek bir sorundur, bu yüzden bunu burada yapıyoruz.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Kazı programını çalıştırın.

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) kullanın ve ispatı döndürün.

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

Bir Solidity doğrulayıcı, blokzincire dağıtabileceğimiz ve `digCompiled.program` tarafından oluşturulan ispatları doğrulamak için kullanabileceğimiz bir akıllı sözleşme.

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

Son olarak, diğer kodların ihtiyaç duyabileceği her şeyi döndürün.

## Güvenlik testleri {#security-tests}

Güvenlik testleri önemlidir çünkü işlevsel bir hata eninde sonunda kendini belli edecektir. Ancak uygulama güvensizse, bu durum muhtemelen birisi hile yapıp başkalarına ait kaynakları ele geçirene kadar uzun süre gizli kalacaktır.

### İzinler {#permissions}

Bu oyunda ayrıcalıklı tek bir varlık vardır, o da sunucudur. [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) içindeki fonksiyonları çağırmasına izin verilen tek kullanıcıdır. İzinli fonksiyonlara yapılan çağrıların yalnızca sunucu hesabı olarak yapılmasına izin verildiğini doğrulamak için [`cast`](https://book.getfoundry.sh/cast/) kullanabiliriz.

[Sunucunun özel anahtarı `setupNetwork.ts` içindedir](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil` (blokzincir) çalıştıran bilgisayarda bu ortam değişkenlerini ayarlayın.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. Doğrulayıcı adresini yetkisiz bir adres olarak ayarlamayı denemek için `cast` kullanın.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` sadece bir hata bildirmekle kalmaz, aynı zamanda tarayıcıdaki oyunda **MUD Dev Tools**'u açabilir, **Tables**'a tıklayabilir ve **app\_\_VerifierAddress**'i seçebilirsiniz. Adresin sıfır olmadığını görün.

3. Doğrulayıcı adresini sunucunun adresi olarak ayarlayın.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** içindeki adres artık sıfır olmalıdır.

Aynı `System` içindeki tüm MUD fonksiyonları aynı erişim kontrolünden geçer, bu yüzden bu testi yeterli buluyorum. Yeterli bulmuyorsanız, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) içindeki diğer fonksiyonları kontrol edebilirsiniz.

### Sıfır bilgi suistimalleri {#zero-knowledge-abuses}

Zokrates'i doğrulamak için gereken matematik bu eğitimin (ve benim yeteneklerimin) kapsamı dışındadır. Ancak, doğru yapılmadığında başarısız olduğunu doğrulamak için sıfır bilgi kodu üzerinde çeşitli kontroller çalıştırabiliriz. Bu testlerin tümü [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) dosyasını değiştirmemizi ve tüm uygulamayı yeniden başlatmamızı gerektirecektir. Sunucu sürecini yeniden başlatmak yeterli değildir, çünkü bu uygulamayı imkansız bir duruma sokar (oyuncunun devam eden bir oyunu vardır, ancak oyun artık sunucu için mevcut değildir).

#### Yanlış cevap {#wrong-answer}

En basit olasılık, sıfır bilgi ispatında yanlış cevap vermektir. Bunu yapmak için `zkDig` içine giriyoruz ve [91. satırı değiştiriyoruz](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Bu, doğru cevap ne olursa olsun her zaman bir bomba olduğunu talep edeceğimiz anlamına gelir. Bu sürümle oynamayı deneyin ve `pnpm dev` ekranının **server** sekmesinde şu hatayı göreceksiniz:

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

Yani bu tür bir hile başarısız olur.

#### Yanlış ispat {#wrong-proof}

Doğru bilgiyi sağlarsak ancak sadece yanlış ispat verisine sahip olursak ne olur? Şimdi, 91. satırı şununla değiştirin:

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

Yine başarısız olur, ancak doğrulayıcı çağrısı sırasında gerçekleştiği için artık sebepsiz yere başarısız olur.

### Bir kullanıcı sıfır güven kodunu nasıl doğrulayabilir? {#user-verify-zero-trust}

Akıllı sözleşmeleri doğrulamak nispeten kolaydır. Genellikle, geliştirici kaynak kodunu bir blok gezgininde yayınlar ve blok gezgini, kaynak kodunun [sözleşme dağıtım işlemindeki](/developers/docs/smart-contracts/deploying/) koda derlendiğini doğrular. MUD `System`'leri söz konusu olduğunda bu [biraz daha karmaşıktır](https://mud.dev/cli/verify), ancak çok da değil.

Bu, sıfır bilgi ile daha zordur. Doğrulayıcı bazı sabitler içerir ve bunlar üzerinde bazı hesaplamalar yapar. Bu size neyin ispatlandığını söylemez.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Çözüm, en azından blok gezginleri kullanıcı arayüzlerine Zokrates doğrulamasını ekleyene kadar, uygulama geliştiricilerinin Zokrates programlarını erişilebilir kılması ve en azından bazı kullanıcıların bunları uygun doğrulama anahtarıyla kendilerinin derlemesidir.

Bunu yapmak için:

1. [Zokrates'i kurun](https://zokrates.github.io/gettingstarted.html).
2. Zokrates programıyla birlikte bir `dig.zok` dosyası oluşturun. Aşağıdaki kod, orijinal harita boyutunu (10x5) koruduğunuzu varsayar.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // (x,y) konumundaki mayın sayısı
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. Zokrates kodunu derleyin ve doğrulama anahtarını oluşturun. Doğrulama anahtarı, orijinal sunucuda kullanılan aynı entropi ile oluşturulmalıdır, [bu durumda boş bir dize](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. Solidity doğrulayıcısını kendi başınıza oluşturun ve blokzincirdeki ile işlevsel olarak aynı olduğunu doğrulayın (sunucu bir yorum ekler, ancak bu önemli değildir).

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Tasarım kararları {#design}

Yeterince karmaşık olan herhangi bir uygulamada, ödünleşimler gerektiren rekabet halindeki tasarım hedefleri vardır. Gelin bazı ödünleşimlere ve mevcut çözümün neden diğer seçeneklere tercih edildiğine bakalım.

### Neden sıfır bilgi {#why-zero-knowledge}

Mayın tarlası için aslında sıfır bilgiye ihtiyacınız yoktur. Sunucu haritayı her zaman tutabilir ve oyun bittiğinde tamamını ortaya çıkarabilir. Ardından, oyunun sonunda akıllı sözleşme harita hash'ini hesaplayabilir, eşleştiğini doğrulayabilir ve eşleşmiyorsa sunucuyu cezalandırabilir veya oyunu tamamen yok sayabilir.

Bu daha basit çözümü kullanmadım çünkü yalnızca iyi tanımlanmış bir bitiş durumuna sahip kısa oyunlar için işe yarıyor. Bir oyun potansiyel olarak sonsuz olduğunda ([otonom dünyalar](https://0xparc.org/blog/autonomous-worlds) durumunda olduğu gibi), durumu açığa _çıkarmadan_ kanıtlayan bir çözüme ihtiyacınız vardır.

Bir eğitim olarak bu makalenin anlaşılması kolay kısa bir oyuna ihtiyacı vardı, ancak bu teknik en çok daha uzun oyunlar için kullanışlıdır.

### Neden Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) mevcut tek sıfır bilgi kütüphanesi değildir, ancak normal, [emirsel](https://en.wikipedia.org/wiki/Imperative_programming) bir programlama diline benzer ve boolean değişkenleri destekler.

Farklı gereksinimlere sahip uygulamanız için [Circum](https://docs.circom.io/getting-started/installation/) veya [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/) kullanmayı tercih edebilirsiniz.

### Zokrates ne zaman derlenmeli {#when-compile-zokrates}

Bu programda Zokrates programlarını [sunucu her başladığında](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) derliyoruz. Bu açıkça bir kaynak israfıdır, ancak bu basitlik için optimize edilmiş bir eğitimdir.

Üretim düzeyinde bir uygulama yazıyor olsaydım, bu mayın tarlası boyutunda derlenmiş Zokrates programlarını içeren bir dosyam olup olmadığını kontrol eder ve varsa onu kullanırdım. Aynı şey zincir içi bir doğrulayıcı sözleşmesi dağıtmak için de geçerlidir.

### Doğrulayıcı ve kanıtlayıcı anahtarlarını oluşturma {#key-creation}

[Anahtar oluşturma](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69), belirli bir mayın tarlası boyutu için birden fazla kez yapılması gerekmeyen başka bir saf hesaplamadır. Yine, basitlik adına yalnızca bir kez yapılır.

Ek olarak, [bir kurulum seremonisi](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) kullanabilirdik. Bir kurulum seremonisinin avantajı, sıfır bilgi ispatında hile yapmak için her katılımcıdan entropiye veya bazı ara sonuçlara ihtiyaç duymanızdır. En az bir seremoni katılımcısı dürüstse ve bu bilgiyi silerse, sıfır bilgi ispatları belirli saldırılara karşı güvende olur. Ancak, bilginin her yerden silindiğini doğrulamak için _hiçbir mekanizma_ yoktur. Sıfır bilgi ispatları kritik derecede önemliyse, kurulum seremonisine katılmak istersiniz.

Burada, düzinelerce katılımcısı olan [sürekli tau güçlerine (perpetual powers of tau)](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) güveniyoruz. Muhtemelen yeterince güvenli ve çok daha basittir. Ayrıca anahtar oluşturma sırasında entropi eklemiyoruz, bu da kullanıcıların [sıfır bilgi yapılandırmasını doğrulamasını](#user-verify-zero-trust) kolaylaştırır.

### Nerede doğrulanmalı {#where-verification}

Sıfır bilgi ispatlarını zincir içi (gaz maliyeti vardır) veya istemcide ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) kullanarak) doğrulayabiliriz. Ben ilkini seçtim, çünkü bu, [doğrulayıcıyı doğrulamanıza](#user-verify-zero-trust) ve ardından sözleşme adresi aynı kaldığı sürece değişmeyeceğine güvenmenize olanak tanır. Doğrulama istemcide yapılsaydı, istemciyi her indirdiğinizde aldığınız kodu doğrulamanız gerekirdi.

Ayrıca, bu oyun tek oyunculu olsa da, birçok blokzincir oyunu çok oyunculudur. Zincir içi doğrulama, sıfır bilgi ispatını yalnızca bir kez doğruladığınız anlamına gelir. Bunu istemcide yapmak, her istemcinin bağımsız olarak doğrulamasını gerektirir.

### Harita TypeScript'te mi yoksa Zokrates'te mi düzleştirilmeli? {#where-flatten}

Genel olarak, işleme TypeScript veya Zokrates'te yapılabildiğinde, bunu çok daha hızlı olan ve sıfır bilgi ispatları gerektirmeyen TypeScript'te yapmak daha iyidir. Örneğin, Zokrates'e hash'i sağlamamamızın ve doğru olduğunu doğrulatmamasının nedeni budur. Hashleme Zokrates içinde yapılmalıdır, ancak döndürülen hash ile zincir içi hash arasındaki eşleşme onun dışında gerçekleşebilir.

Ancak, bunu TypeScript'te yapabilecekken yine de [haritayı Zokrates'te düzleştiriyoruz](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20). Bunun nedeni, diğer seçeneklerin bence daha kötü olmasıdır.

- Zokrates koduna tek boyutlu bir boolean dizisi sağlayın ve iki boyutlu haritayı elde etmek için `x*(height+2)
+y` gibi bir ifade kullanın. Bu, [kodu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) biraz daha karmaşık hale getirecekti, bu yüzden performans kazancının bir eğitim için buna değmeyeceğine karar verdim.

- Zokrates'e hem tek boyutlu diziyi hem de iki boyutlu diziyi gönderin. Ancak bu çözüm bize hiçbir şey kazandırmaz. Zokrates kodunun, sağlanan tek boyutlu dizinin gerçekten iki boyutlu dizinin doğru temsili olduğunu doğrulaması gerekecektir. Yani herhangi bir performans kazancı olmayacaktır.

- İki boyutlu diziyi Zokrates'te düzleştirin. Bu en basit seçenektir, bu yüzden onu seçtim.

### Haritalar nerede saklanmalı {#where-store-maps}

Bu uygulamada [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) bellekteki basit bir değişkendir. Bu, sunucunuz çökerse ve yeniden başlatılması gerekirse, depoladığı tüm bilgilerin kaybolacağı anlamına gelir. Oyuncular sadece oyunlarına devam edememekle kalmaz, aynı zamanda zincir içi bileşen hala devam eden bir oyunları olduğunu düşündüğü için yeni bir oyuna bile başlayamazlar.

Bu bilgiyi bir veritabanında saklayacağınız bir üretim sistemi için bu açıkça kötü bir tasarımdır. Burada bir değişken kullanmamın tek nedeni bunun bir eğitim olması ve basitliğin ana husus olmasıdır.

## Sonuç: Bu teknik hangi koşullar altında uygundur? {#conclusion}

Artık zincir içi olmaması gereken gizli durumu depolayan bir sunucuyla nasıl oyun yazacağınızı biliyorsunuz. Peki bunu hangi durumlarda yapmalısınız? İki ana husus vardır.

- _Uzun süren oyun_: [Yukarıda bahsedildiği gibi](#why-zero-knowledge), kısa bir oyunda oyun bittikten sonra durumu yayınlayabilir ve her şeyin o zaman doğrulanmasını sağlayabilirsiniz. Ancak oyun uzun veya belirsiz bir süre sürdüğünde ve durumun gizli kalması gerektiğinde bu bir seçenek değildir.

- _Biraz merkeziyetçilik kabul edilebilir_: Sıfır bilgi ispatları bütünlüğü, yani bir varlığın sonuçları taklit etmediğini doğrulayabilir. Yapamayacakları şey, varlığın hala erişilebilir olmasını ve mesajları yanıtlamasını sağlamaktır. Erişilebilirliğin de merkeziyetsiz olması gereken durumlarda, sıfır bilgi ispatları yeterli bir çözüm değildir ve [çok partili hesaplamaya](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ihtiyacınız vardır.

[Çalışmalarımın daha fazlası için buraya bakın](https://cryptodocguy.pro/).

### Teşekkürler {#acknowledgements}

- Alvaro Alonso bu makalenin bir taslağını okudu ve Zokrates hakkındaki bazı yanlış anlamalarımı giderdi.

Kalan tüm hatalar benim sorumluluğumdadır.