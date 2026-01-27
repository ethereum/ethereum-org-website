---
title: Gizli bir durum için sıfır bilgi kullanma
description: Zincir üstü oyunlar, herhangi bir gizli bilgi tutamadıkları için sınırlıdır. Bu öğreticiyi okuduktan sonra, bir okuyucu, gizli bir duruma sahip doğrulanabilir oyunlar oluşturmak için sıfır bilgi ispatlarını ve sunucu bileşenlerini bir zincir dışı bileşenle birleştirebilecektir. Bunu yapma tekniği, bir mayın tarlası oyunu oluşturularak gösterilecektir.
author: Ori Pomerantz
tags:
  [
    "sunucu",
    "zincir dışında",
    "merkezi",
    "sıfır bilgi",
    "zokrates",
    "mud"
  ]
skill: advanced
lang: tr
published: 2025-03-15
---

_Blokzincirde sır yoktur_. Blokzincire gönderilen her şey herkesin okumasına açıktır. Bu gereklidir çünkü blokzincir, herkesin onu doğrulayabilmesi esasına dayanır. Ancak, oyunlar genellikle gizli duruma dayanır. Örneğin, bir blokzincir gezginine gidip haritayı görebiliyorsanız [mayın tarlası](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) oyununun hiçbir anlamı kalmaz.

En basit çözüm, gizli durumu tutmak için bir [sunucu bileşeni](/developers/tutorials/server-components/) kullanmaktır. Ancak, blokzinciri kullanmamızın nedeni, oyun geliştiricisinin hile yapmasını önlemektir. Sunucu bileşeninin dürüstlüğünden emin olmalıyız. Sunucu, durumun bir karmasını sağlayabilir ve bir hamlenin sonucunu hesaplamak için kullanılan durumun doğru olduğunu kanıtlamak için [sıfır bilgi ispatlarını](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) kullanabilir.

Bu makaleyi okuduktan sonra, bu türde gizli durum tutan bir sunucuyu, durumu gösteren bir istemciyi ve ikisi arasındaki iletişim için bir zincir üstü bileşeni nasıl oluşturacağınızı bileceksiniz. Kullanacağımız ana araçlar şunlar olacaktır:

| Araç                                          | Amaç                                            |                        Doğrulanan sürüm |
| --------------------------------------------- | ----------------------------------------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | Sıfır bilgi ispatları ve bunların doğrulanması  |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | Hem sunucu hem de istemci için programlama dili |   5.4.2 |
| [Node](https://nodejs.org/en)                 | Sunucuyu çalıştırma                             | 20.18.2 |
| [Viem](https://viem.sh/)                      | Blokzincir ile İletişim                         |  2.9.20 |
| [MUD](https://mud.dev/)                       | Zincir üstü veri yönetimi                       |  2.0.12 |
| [React](https://react.dev/)                   | İstemci kullanıcı arayüzü                       |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | İstemci kodunu sunma                            |   4.2.1 |

## Mayın Tarlası örneği {#minesweeper}

[Mayın Tarlası](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)), mayınlı bir alana sahip gizli bir harita içeren bir oyundur. Oyuncu belirli bir konumda kazı yapmayı seçer. Eğer o konumda bir mayın varsa oyun biter. Aksi takdirde, oyuncu o konumu çevreleyen sekiz karedeki mayın sayısını alır.

Bu uygulama, verileri [anahtar-değer veritabanı](https://aws.amazon.com/nosql/key-value/) kullanarak zincir üstünde depolamamıza ve bu verileri zincir dışı bileşenlerle otomatik olarak senkronize etmemize olanak tanıyan bir çerçeve olan [MUD](https://mud.dev/) kullanılarak yazılmıştır. Senkronizasyona ek olarak MUD, erişim kontrolü sağlamayı ve diğer kullanıcıların uygulamamızı izinsiz olarak [genişletmesini](https://mud.dev/guides/extending-a-world) kolaylaştırır.

### Mayın Tarlası örneğini çalıştırma {#running-minesweeper-example}

Mayın Tarlası örneğini çalıştırmak için:

1. [Ön koşulları yüklediğinizden](https://mud.dev/quickstart#prerequisites) emin olun: [Node](https://mud.dev/quickstart#prerequisites), [Foundry](https://book.getfoundry.sh/getting-started/installation), [`git`](https://git-scm.com/downloads), [`pnpm`](https://git-scm.com/downloads) ve [`mprocs`](https://github.com/pvolok/mprocs).

2. Depoyu klonlayın.

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. Paketleri yükleyin.

   ```sh copy
   cd 20240901-secret-state/\npnpm install\nnpm install -g mprocs
   ```

   Foundry `pnpm install` komutunun bir parçası olarak yüklendiyse komut satırı kabuğunu yeniden başlatmanız gerekir.

4. Sözleşmeleri derleyin

    ```sh copy
    cd packages/contracts\nforge build\ncd ../..
    ```

5. Programı ([anvil](https://book.getfoundry.sh/anvil/) blokzinciri dahil) başlatın ve bekleyin.

   ```sh copy
   mprocs
   ```

   Başlatmanın uzun sürdüğünü unutmayın. İlerlemeyi görmek için önce aşağı ok tuşunu kullanarak _contracts_ sekmesine gidin ve MUD sözleşmelerinin dağıtıldığını görün. _Waiting for file changes…_ mesajını aldığınızda, sözleşmeler dağıtılmış demektir ve ilerlemenin devamı _server_ sekmesinde gerçekleşecektir. Orada, _Verifier address: 0x...._ mesajını alana kadar beklersiniz.

   Bu adım başarılı olursa `mprocs` ekranını görürsünüz; solda farklı işlemler ve sağda o anda seçili olan işlemin konsol çıktısı bulunur.

   ![mprocs ekranı](./mprocs.png)

   `mprocs` ile ilgili bir sorun varsa, dört işlemi manuel olarak, her birini kendi komut satırı penceresinde çalıştırabilirsiniz:

   - **Anvil**

     ```sh
     cd packages/contracts\nanvil --base-fee 0 --block-time 2
     ```

   - **Sözleşmeler**

     ```sh
     cd packages/contracts\npnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Sunucu**

     ```sh
     cd packages/server\npnpm start
     ```

   - **İstemci**

     ```sh
     cd packages/client\npnpm run dev
     ```

6. Şimdi [istemciye](http://localhost:3000) göz atabilir, **Yeni Oyun**'a tıklayabilir ve oynamaya başlayabilirsiniz.

### Tablolar {#tables}

Zincir üstünde [birkaç tabloya](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts) ihtiyacımız var.

- `Configuration`: Bu tablo bir tekildir, anahtarı yoktur ve tek bir kaydı vardır. Oyun yapılandırma bilgilerini tutmak için kullanılır:
  - `height`: Bir mayın tarlasının yüksekliği
  - `width`: Bir mayın tarlasının genişliği
  - `numberOfBombs`: Her mayın tarlasındaki bomba sayısı

- `VerifierAddress`: Bu tablo da bir tekildir. Yapılandırmanın bir parçasını, doğrulayıcı sözleşmenin adresini (`verifier`) tutmak için kullanılır. Bu bilgiyi `Configuration` tablosuna koyabilirdik, ancak sunucu olan farklı bir bileşen tarafından ayarlandığı için ayrı bir tabloya koymak daha kolaydır.

- `PlayerGame`: Anahtar, oyuncunun adresidir. Veri şudur:

  - `gameId`: Oyuncunun oynadığı haritanın karması olan 32 baytlık değer (oyun tanımlayıcısı).
  - `win`: oyuncunun oyunu kazanıp kazanmadığını belirten bir boole değeri.
  - `lose`: oyuncunun oyunu kaybedip kaybetmediğini belirten bir boole değeri.
  - `digNumber`: oyundaki başarılı kazıların sayısı.

- `GamePlayer`: Bu tablo, `gameId`'den oyuncu adresine ters eşlemeyi tutar.

- `Map`: Anahtar, üç değerden oluşan bir demettir:

  - `gameId`: Oyuncunun oynadığı haritanın karması olan 32 baytlık değer (oyun tanımlayıcısı).
  - `x` koordinatı
  - `y` koordinatı

  Değer tek bir sayıdır. Bir bomba tespit edilirse 255'tir. Aksi takdirde, o konumun etrafındaki bomba sayısının bir fazlasıdır. Sadece bomba sayısını kullanamayız, çünkü varsayılan olarak Ethereum Sanal Makinesi'ndeki tüm depolama ve MUD'daki tüm satır değerleri sıfırdır. "Oyuncu henüz burada kazı yapmadı" ile "oyuncu burada kazı yaptı ve etrafta sıfır bomba buldu" arasında ayrım yapmamız gerekiyor.

Ek olarak, istemci ve sunucu arasındaki iletişim, zincir üstü bileşen aracılığıyla gerçekleşir. Bu da tablolar kullanılarak uygulanır.

- `PendingGame`: Yeni bir oyun başlatmak için karşılanmamış istekler.
- `PendingDig`: Belirli bir oyunda belirli bir yerde kazı yapmak için karşılanmamış istekler. Bu bir [zincir dışı tablodur](https://mud.dev/store/tables#types-of-tables), yani EVM depolamasına yazılmaz, yalnızca zincir dışında olaylar kullanılarak okunabilir.

### Yürütme ve veri akışları {#execution-data-flows}

Bu akışlar istemci, zincir üstü bileşen ve sunucu arasındaki yürütmeyi koordine eder.

#### Başlatma {#initialization-flow}

`mprocs` komutunu çalıştırdığınızda şu adımlar gerçekleşir:

1. [`mprocs`](https://github.com/pvolok/mprocs) dört bileşen çalıştırır:

   - [Anvil](https://book.getfoundry.sh/anvil/), yerel bir blokzincir çalıştırır
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts), MUD için sözleşmeleri derler (gerekirse) ve dağıtır
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client), kullanıcı arayüzünü ve istemci kodunu web tarayıcılarına sunmak için [Vite](https://vitejs.dev/) çalıştırır.
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server), sunucu eylemlerini gerçekleştirir

2. `contracts` paketi, MUD sözleşmelerini dağıtır ve ardından [`PostDeploy.s.sol` betiğini](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol) çalıştırır. Bu betik yapılandırmayı ayarlar. GitHub'daki kod, [içinde sekiz mayın bulunan 10x5'lik bir mayın tarlası](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23) belirtir.

3. [Sunucu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts), [MUD'u ayarlayarak](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) başlar. Diğer şeylerin yanı sıra bu, veri senkronizasyonunu etkinleştirir, böylece ilgili tabloların bir kopyası sunucunun belleğinde bulunur.

4. Sunucu, [`Configuration` tablosu değiştiğinde](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23) yürütülecek bir fonksiyona abone olur. [Bu fonksiyon](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168), `PostDeploy.s.sol` yürütüldükten ve tabloyu değiştirdikten sonra çağrılır.

5. Sunucu başlatma fonksiyonu yapılandırmaya sahip olduğunda, sunucunun [sıfır bilgi bölümünü](#using-zokrates-from-typescript) başlatmak için [`zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) çağrısı yapar. Sıfır bilgi fonksiyonlarının mayın tarlasının genişliğini ve yüksekliğini sabit olarak alması gerektiğinden, yapılandırmayı alana kadar bu gerçekleşemez.

6. Sunucunun sıfır bilgi bölümü başlatıldıktan sonra, bir sonraki adım [sıfır bilgi doğrulama sözleşmesini blokzincire dağıtmak](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53) ve MUD'da doğrulayıcı adresini ayarlamaktır.

7. Son olarak, bir oyuncu [yeni bir oyun başlatmayı](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71) veya [mevcut bir oyunda kazı yapmayı](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108) talep ettiğinde görebilmek için güncellemelere abone oluruz.

#### Yeni oyun {#new-game-flow}

Oyuncu yeni bir oyun talep ettiğinde bunlar olur.

1. Bu oyuncu için devam eden bir oyun yoksa veya varsa ama gameId değeri sıfırsa, istemci bir [yeni oyun düğmesi](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175) görüntüler. Kullanıcı bu düğmeye bastığında, [React `newGame` fonksiyonunu çalıştırır](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96).

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) bir `System` çağrısıdır. MUD'da tüm çağrılar `World` sözleşmesi aracılığıyla yönlendirilir ve çoğu durumda `<ad alanı>__<fonksiyon adı>` çağrısı yaparsınız. Bu durumda, çağrı `app__newGame`'edir, MUD daha sonra bunu [`GameSystem` içindeki `newGame`'e](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22) yönlendirir.

3. Zincir üstü fonksiyon, oyuncunun devam eden bir oyunu olmadığını kontrol eder ve yoksa [isteği `PendingGame` tablosuna ekler](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21).

4. Sunucu, `PendingGame`'deki değişikliği algılar ve [abone olunan fonksiyonu çalıştırır](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71). Bu fonksiyon [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)'i çağırır, bu da [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)'i çağırır.

5. `createGame`'in yaptığı ilk şey [uygun sayıda mayınla rastgele bir harita oluşturmaktır](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135). Ardından, Zokrates için gerekli olan boş kenarlıklı bir harita oluşturmak için [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) çağrısı yapar. Son olarak, `createGame`, oyun kimliği olarak kullanılan haritanın karmasını almak için [`calculateMapHash`](#calculateMapHash)'i çağırır.

6. `newGame` fonksiyonu, yeni oyunu `gamesInProgress`'e ekler.

7. Sunucunun yaptığı son şey, zincir üstü olan [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)'u çağırmaktır. Bu fonksiyon, erişim kontrolünü etkinleştirmek için farklı bir `System`, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) içindedir. Erişim kontrolü, [MUD yapılandırma dosyasında](https://mud.dev/config), [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) tanımlanır.

   Erişim listesi, yalnızca tek bir adresin `System`'i çağırmasına izin verir. Bu, sunucu fonksiyonlarına erişimi tek bir adresle sınırlar, böylece kimse sunucuyu taklit edemez.

8. Zincir üstü bileşen ilgili tabloları günceller:

   - `PlayerGame` içinde oyunu oluşturun.
   - `GamePlayer` içinde ters eşlemeyi ayarlayın.
   - `PendingGame`'den isteği kaldırın.

9. Sunucu `PendingGame`'deki değişikliği tanımlar, ancak [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) false olduğu için hiçbir şey yapmaz.

10. İstemcide [`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148), oyuncunun adresi için `PlayerGame` girişine ayarlanır. `PlayerGame` değiştiğinde, `gameRecord` da değişir.

11. `gameRecord`'da bir değer varsa ve oyun kazanılmadıysa veya kaybedilmediyse, istemci [haritayı görüntüler](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190).

#### Kazı {#dig-flow}

1. Oyuncu [harita hücresinin düğmesine tıklar](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188), bu da [`dig` fonksiyonunu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36) çağırır. Bu fonksiyon, [zincir üstündeki `dig`'i](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32) çağırır.

2. Zincir üstü bileşen [bir dizi sağlık kontrolü gerçekleştirir](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30) ve başarılı olursa kazı isteğini [`PendingDig`'e ekler](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31).

3. Sunucu [`PendingDig`'deki değişikliği algılar](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73). [Eğer geçerliyse](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84), hem sonucu hem de geçerli olduğuna dair bir kanıt oluşturmak için [sıfır bilgi kodunu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95) (aşağıda açıklanmıştır) çağırır.

4. [Sunucu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107), zincir üstünde [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64) çağrısı yapar.

5. `digResponse` iki şey yapar. İlk olarak, [sıfır bilgi ispatını](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61) kontrol eder. Ardından, ispat kontrol edilirse sonucu gerçekten işlemek için [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) çağrısı yapar.

6. `processDigResult`, oyunun [kaybedilip](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78) [kazanılmadığını](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86) kontrol eder ve [zincir üstü harita olan `Map`'i günceller](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80).

7. İstemci güncellemeleri otomatik olarak alır ve [oyuncuya gösterilen haritayı günceller](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190) ve uygunsa oyuncuya kazanıp kaybettiğini söyler.

## Zokrates Kullanımı {#using-zokrates}

Yukarıda açıklanan akışlarda, sıfır bilgi kısımlarını bir kara kutu olarak ele alarak atladık. Şimdi onu açalım ve bu kodun nasıl yazıldığını görelim.

### Haritayı karıştırma {#hashing-map}

Kullandığımız Zokrates karma fonksiyonu olan [Poseidon](https://www.poseidon-hash.info)'u uygulamak için [bu JavaScript kodunu](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) kullanabiliriz. Ancak, bu daha hızlı olsa da, bunu yapmak için sadece Zokrates karma fonksiyonunu kullanmaktan daha karmaşık olurdu. Bu bir öğreticidir ve bu nedenle kod performans için değil, basitlik için optimize edilmiştir. Bu nedenle, iki farklı Zokrates programına ihtiyacımız var, biri sadece bir haritanın karmasını hesaplamak için (`hash`) ve diğeri haritadaki bir konumdaki kazının sonucunun sıfır bilgi ispatını oluşturmak için (`dig`).

### Karma fonksiyonu {#hash-function}

Bu, bir haritanın karmasını hesaplayan fonksiyondur. Bu kodu satır satır inceleyeceğiz.

```
import "hashes/poseidon/poseidon.zok" as poseidon;\nimport "utils/pack/bool/pack128.zok" as pack128;
```

Bu iki satır, [Zokrates standart kütüphanesinden](https://zokrates.github.io/toolbox/stdlib.html) iki fonksiyonu içe aktarır. [İlk fonksiyon](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok), bir [Poseidon karmasıdır](https://www.poseidon-hash.info/). Bir [`field` elemanları](https://zokrates.github.io/language/types.html#field) dizisi alır ve bir `field` döndürür.

Zokrates'teki alan elemanı tipik olarak 256 bitten daha kısadır, ancak çok da değil. Kodu basitleştirmek için, haritayı 512 bite kadar kısıtlıyoruz ve dört alandan oluşan bir diziyi karıştırıyoruz ve her alanda sadece 128 bit kullanıyoruz. [`pack128` fonksiyonu](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok), bu amaçla 128 bitlik bir diziyi bir `field`'a dönüştürür.

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

Bu satır bir fonksiyon tanımı başlatır. `hashMap`, `map` adında tek bir parametre, iki boyutlu bir `bool`(ean) dizisi alır. Haritanın boyutu, [aşağıda açıklanan nedenlerden dolayı](#why-map-border) `width+2`'ye `height+2`'dir.

Zokrates programları bu uygulamada [şablon dizeleri](https://www.w3schools.com/js/js_string_templates.asp) olarak saklandığı için `${width+2}` ve `${height+2}` kullanabiliriz. `${` ve `}` arasındaki kod JavaScript tarafından değerlendirilir ve bu şekilde program farklı harita boyutları için kullanılabilir. Harita parametresinin etrafında, içinde hiç bomba bulunmayan bir konum genişliğinde bir kenarlık bulunur, bu da genişlik ve yüksekliğe iki eklememizin nedenidir.

Dönüş değeri, karmayı içeren bir `field`'dır.

```
   bool[512] mut map1d = [false; 512];
```

Harita iki boyutludur. Ancak, `pack128` fonksiyonu iki boyutlu dizilerle çalışmaz. Bu yüzden önce `map1d` kullanarak haritayı 512 baytlık bir diziye düzleştiririz. Varsayılan olarak Zokrates değişkenleri sabittir, ancak bu diziye bir döngü içinde değerler atamamız gerekir, bu yüzden onu [`mut`](https://zokrates.github.io/language/variables.html#mutability) olarak tanımlarız.

Zokrates'in `undefined` özelliği olmadığı için diziyi başlatmamız gerekiyor. `[false; 512]` ifadesi [512 `false` değerinden oluşan bir dizi](https://zokrates.github.io/language/types.html#declaration-and-initialization) anlamına gelir.

```
   u32 mut counter = 0;
```

Ayrıca `map1d`'de zaten doldurduğumuz bitlerle doldurmadıklarımızı ayırt etmek için bir sayaca ihtiyacımız var.

```
   for u32 x in 0..${width+2} {
```

Zokrates'te bir [`for` döngüsü](https://zokrates.github.io/language/control_flow.html#for-loops) bu şekilde bildirilir. Bir Zokrates `for` döngüsünün sabit sınırları olmalıdır, çünkü bir döngü gibi görünse de, derleyici aslında onu "açar". `${width+2}` ifadesi, TypeScript kodu derleyiciyi çağırmadan önce `width` ayarlandığı için bir derleme zamanı sabitidir.

```
      for u32 y in 0..${height+2} {\n         map1d[counter] = map[x][y];\n         counter = counter+1;\n      }\n   }
```

Haritadaki her konum için bu değeri `map1d` dizisine koyun ve sayacı artırın.

```
    field[4] hashMe = [\n        pack128(map1d[0..128]),\n        pack128(map1d[128..256]),\n        pack128(map1d[256..384]),\n        pack128(map1d[384..512])\n    ];
```

`pack128`, `map1d`'den dört `field` değerinden oluşan bir dizi oluşturur. Zokrates'te `array[a..b]` dizinin `a`'da başlayıp `b-1`'de biten dilimi anlamına gelir.

```
    return poseidon(hashMe);\n}
```

Bu diziyi bir karmaya dönüştürmek için `poseidon` kullanın.

### Karma programı {#hash-program}

Sunucunun, oyun tanımlayıcıları oluşturmak için doğrudan `hashMap`'i çağırması gerekir. Ancak, Zokrates başlatmak için bir programda yalnızca `main` fonksiyonunu çağırabilir, bu nedenle karma fonksiyonunu çağıran bir `main` içeren bir program oluştururuz.

```
${hashFragment}\n\ndef main(bool[${width+2}][${height+2}] map) -> field {\n    return hashMap(map);\n}
```

### Kazı programı {#dig-program}

Bu, uygulamanın sıfır bilgi kısmının kalbidir, burada kazı sonuçlarını doğrulamak için kullanılan kanıtları üretiriz.

```
${hashFragment}\n\n// (x,y) konumundaki mayın sayısı\ndef map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {\n   return if map[x+1][y+1] { 1 } else { 0 };\n}
```

#### Neden harita sınırı {#why-map-border}

Sıfır bilgi ispatları, bir `if` ifadesinin kolay bir eşdeğerine sahip olmayan [aritmetik devreleri](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785) kullanır. Bunun yerine, [koşullu operatörün](https://en.wikipedia.org/wiki/Ternary_conditional_operator) eşdeğerini kullanırlar. `a` sıfır veya bir olabiliyorsa, `if a { b } else { c }` ifadesini `ab+(1-a)c` olarak hesaplayabilirsiniz.

Bu nedenle, bir Zokrates `if` ifadesi her zaman her iki dalı da değerlendirir. Örneğin, bu koda sahipseniz:

```
bool[5] arr = [false; 5];\nu32 index=10;\nreturn if index>4 { 0 } else { arr[index] }
```

`arr[10]`'u hesaplaması gerektiği için hata verir, bu değer daha sonra sıfırla çarpılacak olsa bile.

Haritanın etrafında bir konum genişliğinde bir sınıra ihtiyacımız olmasının nedeni budur. Bir konumun etrafındaki toplam mayın sayısını hesaplamamız gerekiyor ve bu, kazı yaptığımız konumun bir satır üstünde ve altında, solunda ve sağındaki konumu görmemiz gerektiği anlamına geliyor. Bu da bu konumların Zokrates'e sağlanan harita dizisinde mevcut olması gerektiği anlamına gelir.

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

Varsayılan olarak Zokrates kanıtları girdilerini içerir. Bir noktanın etrafında beş mayın olduğunu bilmek, aslında hangi nokta olduğunu bilmiyorsanız (ve sadece isteğinizle eşleştiremezsiniz, çünkü o zaman kanıtlayıcı farklı değerler kullanabilir ve size bu konuda bilgi vermeyebilir) bir işe yaramaz. Ancak, haritayı Zokrates'e sağlarken gizli tutmamız gerekiyor. Çözüm, kanıt tarafından _açıklanmayan_ bir `private` parametresi kullanmaktır.

Bu, başka bir kötüye kullanım yolunu açar. Kanıtlayıcı doğru koordinatları kullanabilir, ancak konumun etrafında ve muhtemelen konumun kendisinde herhangi bir sayıda mayın içeren bir harita oluşturabilir. Bu kötüye kullanımı önlemek için, sıfır bilgi ispatının oyun tanımlayıcısı olan haritanın karmasını içermesini sağlıyoruz.

```
   return (hashMap(map),
```

Buradaki dönüş değeri, harita karma dizisini ve kazı sonucunu içeren bir demettir.

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

Konumun kendisinde bir bomba olması durumunda özel bir değer olarak 255 kullanıyoruz.

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +\n            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +\n            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)\n         }\n   );\n}
```

Oyuncu bir mayına çarpmadıysa, konumun etrafındaki alan için mayın sayılarını ekleyin ve bunu döndürün.

### TypeScript'ten Zokrates Kullanımı {#using-zokrates-from-typescript}

Zokrates'in bir komut satırı arayüzü vardır, ancak bu programda onu [TypeScript kodunda](https://zokrates.github.io/toolbox/zokrates_js.html) kullanıyoruz.

Zokrates tanımlarını içeren kütüphaneye [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) denir.

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

[Zokrates JavaScript bağlamalarını](https://zokrates.github.io/toolbox/zokrates_js.html) içe aktarın. Tüm Zokrates tanımlarına çözümlenen bir söz döndürdüğü için yalnızca [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) fonksiyonuna ihtiyacımız var.

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

Zokrates'in kendisine benzer şekilde, biz de yalnızca [asenkron](https://www.w3schools.com/js/js_async.asp) olan tek bir fonksiyonu dışa aktarıyoruz. Sonunda döndüğünde, aşağıda göreceğimiz gibi birkaç fonksiyon sağlar.

```typescript
const zokrates = await zokratesInitialize()
```

Zokrates'i başlatın, kütüphaneden ihtiyacımız olan her şeyi alın.

```typescript
const hashFragment = `\n        import "utils/pack/bool/pack128.zok" as pack128;\n        import "hashes/poseidon/poseidon.zok" as poseidon;\n            .\n            .\n            .\n        }\n    `\n\nconst hashProgram = `\n        ${hashFragment}\n            .\n            .\n            .\n    `\n\nconst digProgram = `\n        ${hashFragment}\n            .\n            .\n            .\n    `
```

Ardından, yukarıda gördüğümüz karma fonksiyonu ve iki Zokrates programımız var.

```typescript
const digCompiled = zokrates.compile(digProgram)\nconst hashCompiled = zokrates.compile(hashProgram)
```

Burada bu programları derliyoruz.

```typescript
// Sıfır bilgi doğrulaması için anahtarları oluşturun.\n// Bir üretim sisteminde bir kurulum töreni kullanmak istersiniz.\n// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).\nconst keySetupResults = zokrates.setup(digCompiled.program, "")\nconst verifierKey = keySetupResults.vk\nconst proverKey = keySetupResults.pk
```

Bir üretim sisteminde daha karmaşık bir [kurulum töreni](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) kullanabiliriz, ancak bu bir gösterim için yeterince iyidir. Kullanıcıların kanıtlayıcı anahtarını bilmeleri bir sorun değildir - doğru olmadıkça yine de bir şeyleri kanıtlamak için kullanamazlar. Entropiyi (ikinci parametre, `""`) belirttiğimiz için, sonuçlar her zaman aynı olacaktır.

**Not:** Zokrates programlarının derlenmesi ve anahtar oluşturulması yavaş süreçlerdir. Bunları her seferinde tekrarlamaya gerek yoktur, sadece harita boyutu değiştiğinde. Bir üretim sisteminde bunları bir kez yaparsınız ve sonra çıktıyı saklarsınız. Bunu burada yapmamamın tek nedeni basitlik uğrunadır.

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {\n  return (\n    "0x" +\n    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))\n      .toString(16)\n      .padStart(64, "0")\n  )\n}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) fonksiyonu aslında Zokrates programını çalıştırır. İki alanlı bir yapı döndürür: `output`, programın çıktısı olan bir JSON dizesi ve `witness`, sonucun sıfır bilgi kanıtını oluşturmak için gereken bilgidir. Burada sadece çıktıya ihtiyacımız var.

Çıktı, `"31337"` biçiminde, tırnak işaretleri içinde yer alan bir ondalık sayı olan bir dizedir. Ancak `viem` için ihtiyacımız olan çıktı, `0x60A7` biçiminde bir onaltılık sayıdır. Bu yüzden tırnak işaretlerini kaldırmak için `.slice(1,-1)` ve ardından kalan dizeyi, ondalık bir sayı olan, bir [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)'e dönüştürmek için `BigInt` kullanırız. `.toString(16)`, bu `BigInt`'i bir onaltılık dizeye dönüştürür ve `"0x"+`, onaltılık sayılar için işaretleyiciyi ekler.

```typescript
// Kazın ve sonucun sıfır bilgi kanıtını döndürün\n// (sunucu tarafı kodu)
```

Sıfır bilgi ispatı, genel girdileri (`x` ve `y`) ve sonuçları (haritanın karması ve bomba sayısı) içerir.

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {\n        if (x<0 || x>=width || y<0 || y>=height)\n            throw new Error("Haritanın dışında kazmaya çalışıyorsunuz")
```

Zokrates'te bir dizinin sınırları dışında olup olmadığını kontrol etmek bir sorundur, bu yüzden bunu burada yapıyoruz.

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

Kazı programını çalıştırın.

```typescript
        const proof = zokrates.generateProof(\n            digCompiled.program,\n            runResults.witness,\n            proverKey)\n\n        return proof\n    }
```

[`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) kullanın ve ispatı döndürün.

```typescript
const solidityVerifier = `\n        // Harita boyutu: ${width} x ${height}\n        \n${zokrates.exportSolidityVerifier(verifierKey)}\n        `
```

Bir Solidity doğrulayıcısı, blokzincire dağıtabileceğimiz ve `digCompiled.program` tarafından oluşturulan kanıtları doğrulamak için kullanabileceğimiz bir akıllı sözleşme.

```typescript
    return {\n        zkDig,\n        calculateMapHash,\n        solidityVerifier,\n    }\n}
```

Son olarak, diğer kodun ihtiyaç duyabileceği her şeyi döndürün.

## Güvenlik testleri {#security-tests}

Güvenlik testleri önemlidir çünkü bir işlevsellik hatası eninde sonunda kendini belli edecektir. Ancak uygulama güvensizse, bu durum muhtemelen birinin hile yapıp başkalarına ait kaynaklarla kaçmasıyla ortaya çıkmadan önce uzun süre gizli kalacaktır.

### İzinler {#permissions}

Bu oyunda ayrıcalıklı bir varlık var, sunucu. [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) içindeki fonksiyonları çağırmasına izin verilen tek kullanıcı odur. İzinli fonksiyonlara yapılan çağrıların yalnızca sunucu hesabı olarak izin verildiğini doğrulamak için [`cast`](https://book.getfoundry.sh/cast/) kullanabiliriz.

[Sunucunun özel anahtarı `setupNetwork.ts`'dedir](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52).

1. `anvil`'i (blokzincir) çalıştıran bilgisayarda bu ortam değişkenlerini ayarlayın.

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b\nUNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a\nAUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. `cast` kullanarak doğrulayıcı adresini yetkisiz bir adres olarak ayarlamayı deneyin.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` yalnızca bir başarısızlık bildirmekle kalmaz, aynı zamanda tarayıcıdaki oyunda **MUD Geliştirici Araçları**'nı açabilir, **Tablolar**'a tıklayabilir ve **app\_\_VerifierAddress**'i seçebilirsiniz. Adresin sıfır olmadığını görün.

3. Doğrulayıcı adresini sunucunun adresi olarak ayarlayın.

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress**'deki adres artık sıfır olmalıdır.

Aynı `System`'deki tüm MUD fonksiyonları aynı erişim kontrolünden geçer, bu yüzden bu testi yeterli görüyorum. Eğer öyle düşünmüyorsanız, [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) içindeki diğer fonksiyonları kontrol edebilirsiniz.

### Sıfır bilgi kötüye kullanımları {#zero-knowledge-abuses}

Zokrates'i doğrulamak için gereken matematik bu öğreticinin (ve benim yeteneklerimin) kapsamı dışındadır. Ancak, sıfır bilgi kodunun doğru yapılmadığında başarısız olduğunu doğrulamak için çeşitli kontroller yapabiliriz. Tüm bu testler, [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) dosyasını değiştirmemizi ve tüm uygulamayı yeniden başlatmamızı gerektirecektir. Uygulamayı imkansız bir duruma soktuğu için (oyuncunun devam eden bir oyunu var, ancak oyun artık sunucu tarafından kullanılamıyor) sunucu işlemini yeniden başlatmak yeterli değildir.

#### Yanlış cevap {#wrong-answer}

En basit olasılık, sıfır bilgi ispatında yanlış cevap vermektir. Bunu yapmak için `zkDig` içine girip [91. satırı değiştiriyoruz](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91):

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

Bu, doğru cevaba bakılmaksızın her zaman bir bomba olduğunu iddia edeceğimiz anlamına gelir. Bu sürümle oynamayı deneyin ve `pnpm dev` ekranının **sunucu** sekmesinde şu hatayı göreceksiniz:

```
      cause: {\n        code: 3,\n        message: 'yürütme geri alındı: geri al: Sıfır bilgi doğrulaması başarısız',\n        data: '0x08c379a00000000000000000000000000000000000000000000000000000000000000002000000000000000\n000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6\ne206661696c'\n      },
```

Yani bu tür bir hile başarısız olur.

#### Yanlış ispat {#wrong-proof}

Doğru bilgiyi verirsek ama sadece yanlış ispat verimiz varsa ne olur? Şimdi, 91. satırı şununla değiştirin:

```ts
proof.proof = {\n  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n  b: [\n    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n  ],\n  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n}
```

Yine de başarısız oluyor, ancak şimdi doğrulayıcı çağrısı sırasında gerçekleştiği için bir neden olmadan başarısız oluyor.

### Bir kullanıcı sıfır güven kodunu nasıl doğrulayabilir? {#user-verify-zero-trust}

Akıllı sözleşmeleri doğrulamak nispeten kolaydır. Tipik olarak, geliştirici kaynak kodunu bir blok gezgininde yayınlar ve blok gezgini, kaynak kodunun [sözleşme dağıtım işlemindeki](/developers/docs/smart-contracts/deploying/) koda derlendiğini doğrular. MUD `System`'leri durumunda bu [biraz daha karmaşıktır](https://mud.dev/cli/verify), ancak çok değil.

Bu, sıfır bilgi ile daha zordur. Doğrulayıcı bazı sabitleri içerir ve onlar üzerinde bazı hesaplamalar yapar. Bu size neyin kanıtlandığını söylemez.

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {\n        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));\n        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

Çözüm, en azından blok gezginleri kullanıcı arayüzlerine Zokrates doğrulamasını ekleyene kadar, uygulama geliştiricilerinin Zokrates programlarını kullanıma sunması ve en azından bazı kullanıcıların bunları uygun doğrulama anahtarıyla kendilerinin derlemesidir.

Bunu yapmak için:

1. [Zokrates'i yükleyin](https://zokrates.github.io/gettingstarted.html).

2. Zokrates programıyla bir `dig.zok` dosyası oluşturun. Aşağıdaki kod, orijinal harita boyutu olan 10x5'i koruduğunuzu varsayar.

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;\n import "hashes/poseidon/poseidon.zok" as poseidon;\n\n def hashMap(bool[12][7] map) -> field {\n     bool[512] mut map1d = [false; 512];\n     u32 mut counter = 0;\n\n     for u32 x in 0..12 {\n         for u32 y in 0..7 {\n             map1d[counter] = map[x][y];\n             counter = counter+1;\n         }\n     }\n\n     field[4] hashMe = [\n         pack128(map1d[0..128]),\n         pack128(map1d[128..256]),\n         pack128(map1d[256..384]),\n         pack128(map1d[384..512])\n     ];\n\n     return poseidon(hashMe);\n }\n\n\n // (x,y) konumundaki mayınların sayısı\n def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {\n     return if map[x+1][y+1] { 1 } else { 0 };\n }\n\n def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {\n     return (hashMap(map) ,\n         if map2mineCount(map, x, y) > 0 { 0xFF } else {\n             map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +\n             map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +\n             map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)\n         }\n     );\n }
   ```

3. Zokrates kodunu derleyin ve doğrulama anahtarını oluşturun. Doğrulama anahtarı, orijinal sunucuda kullanılan aynı entropi ile oluşturulmalıdır, [bu durumda boş bir dizedir](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67).

   ```sh copy
   zokrates compile --input dig.zok\nzokrates setup -e ""
   ```

4. Solidity doğrulayıcısını kendi başınıza oluşturun ve blokzincirdekiyle işlevsel olarak aynı olduğunu doğrulayın (sunucu bir yorum ekler, ancak bu önemli değildir).

   ```sh copy
   zokrates export-verifier\ndiff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## Tasarım kararları {#design}

Yeterince karmaşık herhangi bir uygulamada, ödünler gerektiren rakip tasarım hedefleri vardır. Bazı ödünlere ve mevcut çözümün neden diğer seçeneklere tercih edilebilir olduğuna bakalım.

### Neden sıfır bilgi {#why-zero-knowledge}

Mayın tarlası için gerçekten sıfır bilgiye ihtiyacınız yok. Sunucu her zaman haritayı tutabilir ve ardından oyun bittiğinde hepsini ortaya çıkarabilir. Ardından, oyunun sonunda akıllı sözleşme harita karmasını hesaplayabilir, eşleştiğini doğrulayabilir ve eşleşmezse sunucuyu cezalandırabilir veya oyunu tamamen yok sayabilir.

Bu daha basit çözümü kullanmadım çünkü yalnızca iyi tanımlanmış bir son durumu olan kısa oyunlar için çalışıyor. Bir oyun potansiyel olarak sonsuz olduğunda ([otonom dünyalar](https://0xparc.org/blog/autonomous-worlds) durumunda olduğu gibi), durumu _açığa çıkarmadan_ kanıtlayan bir çözüme ihtiyacınız vardır.

Bir öğretici olarak bu makale, anlaşılması kolay kısa bir oyuna ihtiyaç duyuyordu, ancak bu teknik daha uzun oyunlar için en kullanışlıdır.

### Neden Zokrates? {#why-zokrates}

[Zokrates](https://zokrates.github.io/) mevcut tek sıfır bilgi kütüphanesi değildir, ancak normal, [zorunlu](https://en.wikipedia.org/wiki/Imperative_programming) bir programlama diline benzer ve boole değişkenlerini destekler.

Uygulamanız için, farklı gereksinimlerle, [Circum](https://docs.circom.io/getting-started/installation/) veya [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)'yu kullanmayı tercih edebilirsiniz.

### Zokrates ne zaman derlenmeli {#when-compile-zokrates}

Bu programda, Zokrates programlarını [sunucu her başladığında](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61) derliyoruz. Bu açıkça bir kaynak israfıdır, ancak bu bir öğreticidir, basitlik için optimize edilmiştir.

Eğer bir üretim seviyesinde uygulama yazıyor olsaydım, bu mayın tarlası boyutunda derlenmiş Zokrates programları içeren bir dosyam olup olmadığını kontrol eder ve varsa onu kullanırdım. Aynı şey, zincir üstünde bir doğrulayıcı sözleşmesi dağıtmak için de geçerlidir.

### Doğrulayıcı ve kanıtlayıcı anahtarları oluşturma {#key-creation}

[Anahtar oluşturma](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69), belirli bir mayın tarlası boyutu için bir kereden fazla yapılması gerekmeyen başka bir saf hesaplamadır. Yine, yalnızca basitlik uğruna bir kez yapılır.

Ek olarak, [bir kurulum töreni](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony) kullanabiliriz. Bir kurulum töreninin avantajı, sıfır bilgi ispatında hile yapmak için her katılımcıdan ya entropiye ya da bir ara sonuca ihtiyacınız olmasıdır. En az bir tören katılımcısı dürüstse ve bu bilgiyi silerse, sıfır bilgi ispatları belirli saldırılardan güvende olur. Ancak, bilginin her yerden silindiğini doğrulamak için _hiçbir mekanizma_ yoktur. Sıfır bilgi ispatları kritik derecede önemliyse, kurulum törenine katılmak istersiniz.

Burada, düzinelerce katılımcısı olan [sürekli tau güçlerine](https://github.com/privacy-scaling-explorations/perpetualpowersoftau) güveniyoruz. Muhtemelen yeterince güvenlidir ve çok daha basittir. Ayrıca, kullanıcıların [sıfır bilgi yapılandırmasını doğrulamalarını](#user-verify-zero-trust) kolaylaştıran anahtar oluşturma sırasında entropi eklemiyoruz.

### Nerede doğrulanmalı {#where-verification}

Sıfır bilgi ispatlarını ya zincir üstünde (gaz maliyeti olan) ya da istemcide ([`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof) kullanarak) doğrulayabiliriz. İlkini seçtim, çünkü bu, [doğrulayıcıyı bir kez doğrulamanıza](#user-verify-zero-trust) ve sonra sözleşme adresi aynı kaldığı sürece değişmediğine güvenmenize olanak tanır. Doğrulama istemcide yapılsaydı, istemciyi her indirdiğinizde aldığınız kodu doğrulamanız gerekirdi.

Ayrıca, bu oyun tek oyunculu olsa da, birçok blokzincir oyunu çok oyunculudur. zincir üstü doğrulama, sıfır bilgi ispatını yalnızca bir kez doğrulamanız anlamına gelir. Bunu istemcide yapmak, her istemcinin bağımsız olarak doğrulamasını gerektirirdi.

### Haritayı TypeScript'te mi yoksa Zokrates'te mi düzleştirmeli? {#where-flatten}

Genel olarak, işleme TypeScript veya Zokrates'te yapılabildiğinde, çok daha hızlı olan ve sıfır bilgi ispatları gerektirmeyen TypeScript'te yapmak daha iyidir. Örneğin, Zokrates'e karmayı sağlayıp doğru olduğunu doğrulamasını yaptırmamamızın nedeni budur. Karma işlemi Zokrates içinde yapılmalıdır, ancak döndürülen karma ile zincir üstündeki karma arasındaki eşleşme onun dışında gerçekleşebilir.

Ancak, TypeScript'te yapabilecekken haritayı [Zokrates'te düzleştiriyoruz](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20). Nedeni, diğer seçeneklerin bence daha kötü olmasıdır.

- Zokrates koduna tek boyutlu bir boole dizisi sağlayın ve iki boyutlu haritayı elde etmek için `x*(height+2)\n+y` gibi bir ifade kullanın. Bu, [kodu](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47) biraz daha karmaşık hale getirirdi, bu yüzden performans kazancının bir öğretici için değmeyeceğine karar verdim.

- Zokrates'e hem tek boyutlu diziyi hem de iki boyutlu diziyi gönderin. Ancak, bu çözüm bize hiçbir şey kazandırmaz. Zokrates kodu, sağlanan tek boyutlu dizinin gerçekten iki boyutlu dizinin doğru temsili olduğunu doğrulamak zorunda kalırdı. Yani herhangi bir performans kazancı olmazdı.

- Zokrates'te iki boyutlu diziyi düzleştirin. Bu en basit seçenektir, bu yüzden onu seçtim.

### Haritalar nerede saklanmalı {#where-store-maps}

Bu uygulamada [`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) bellekte basit bir değişkendir. Bu, sunucunuz ölürse ve yeniden başlatılması gerekirse, sakladığı tüm bilgilerin kaybolacağı anlamına gelir. Oyuncular sadece oyunlarına devam edememekle kalmaz, zincir üstü bileşen hala devam eden bir oyunları olduğunu düşündüğü için yeni bir oyun bile başlatamazlar.

Bu, bu bilgiyi bir veritabanında saklayacağınız bir üretim sistemi için açıkça kötü bir tasarımdır. Burada bir değişken kullanmamın tek nedeni, bunun bir öğretici olması ve basitliğin ana husus olmasıdır.

## Sonuç: Bu tekniğin uygun olduğu koşullar nelerdir? {#conclusion}

Artık, zincir üstünde olmaması gereken gizli durumu saklayan bir sunucu ile bir oyun yazmayı biliyorsunuz. Ama hangi durumlarda yapmalısınız? İki ana husus vardır.

- _Uzun süren oyun_: [Yukarıda belirtildiği gibi](#why-zero-knowledge), kısa bir oyunda oyun bittiğinde durumu yayınlayabilir ve her şeyin o zaman doğrulanmasını sağlayabilirsiniz. Ancak oyun uzun veya belirsiz bir süre aldığında ve durumun gizli kalması gerektiğinde bu bir seçenek değildir.

- _Bazı merkezileştirme kabul edilebilir_: Sıfır bilgi ispatları, bir varlığın sonuçları taklit etmediği bütünlüğü doğrulayabilir. Yapamadıkları şey, varlığın hala kullanılabilir olacağını ve mesajlara cevap vereceğini sağlamaktır. Kullanılabilirliğin de merkeziyetsiz olması gereken durumlarda, sıfır bilgi ispatları yeterli bir çözüm değildir ve [çok taraflı hesaplamaya](https://en.wikipedia.org/wiki/Secure_multi-party_computation) ihtiyacınız vardır.

[Çalışmalarımdan daha fazlası için buraya bakın](https://cryptodocguy.pro/).

### Teşekkürler {#acknowledgements}

- Alvaro Alonso bu makalenin bir taslağını okudu ve Zokrates hakkındaki bazı yanlış anlamalarımı giderdi.

Kalan hatalar benim sorumluluğumdadır.
