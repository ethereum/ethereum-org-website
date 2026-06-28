---
title: Dagger-Hashimoto
description: "Dagger-Hashimoto algoritmasına detaylı bir bakış."
lang: tr
---

Dagger-Hashimoto, Ethereum'un madencilik algoritması için orijinal araştırma uygulaması ve spesifikasyonuydu. Dagger-Hashimoto'nun yerini [Ethash](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash) aldı. Madencilik, 15 Eylül 2022'de [Birleşme](/roadmap/merge/) ile tamamen kapatıldı. O zamandan beri Ethereum, bunun yerine bir [Hisse Kanıtı (PoS)](/developers/docs/consensus-mechanisms/pos) mekanizması kullanılarak güvence altına alınmaktadır. Bu sayfa tarihi ilgi amaçlıdır - buradaki bilgiler Birleşme sonrası Ethereum için artık geçerli değildir.

## Ön koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için öncelikle [İş Kanıtı (PoW) mutabakatı](/developers/docs/consensus-mechanisms/pow), [madencilik](/developers/docs/consensus-mechanisms/pow/mining) ve [madencilik algoritmaları](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) hakkında okuma yapmanızı öneririz.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto iki hedefi karşılamayı amaçlar:

1.  **ASIC direnci**: algoritma için özel donanım oluşturmanın faydası mümkün olduğunca küçük olmalıdır
2.  **Hafif istemci doğrulanabilirliği**: bir blok, bir hafif istemci tarafından verimli bir şekilde doğrulanabilmelidir.

Ek bir değişiklikle, istenirse üçüncü bir hedefin nasıl yerine getirileceğini de belirtiyoruz, ancak bu ek karmaşıklık pahasına olur:

**Tam zincir depolama**: madencilik, tüm blokzincir durumunun depolanmasını gerektirmelidir (Ethereum durum ağacının düzensiz yapısı nedeniyle, özellikle sık kullanılan bazı sözleşmelerde bir miktar budamanın mümkün olacağını öngörüyoruz, ancak bunu en aza indirmek istiyoruz).

## DAG Üretimi {#dag-generation}

Algoritmanın kodu aşağıda Python'da tanımlanacaktır. İlk olarak, belirtilen hassasiyetteki işaretsiz tam sayıları (unsigned ints) dizelere (strings) dönüştürmek için `encode_int` veriyoruz. Bunun tersi de verilmiştir:

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Daha sonra `sha3` fonksiyonunun bir tam sayı alıp bir tam sayı çıkaran bir fonksiyon olduğunu ve `dbl_sha3` fonksiyonunun bir double-sha3 fonksiyonu olduğunu varsayıyoruz; bu referans kodunu bir uygulamaya dönüştürüyorsanız şunu kullanın:

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### Parametreler {#parameters}

Algoritma için kullanılan parametreler şunlardır:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512'den küçük En Büyük Güvenli Asal Sayı

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Veri setinin boyutu (4 Gigabayt); 65536'NIN KATI OLMALIDIR
      "n_inc": 65536,                   # Her periyotta n değerindeki artış; 65536'NIN KATI OLMALIDIR
                                        # epochtime=20000 ile yılda 882 MB büyüme sağlar
      "cache_size": 2500,               # Hafif istemcinin önbellek boyutu (hafif
                                        # istemci tarafından seçilebilir; algoritma spesifikasyonunun bir parçası değildir)
      "diff": 2**14,                    # Zorluk (blok değerlendirmesi sırasında ayarlanır)
      "epochtime": 100000,              # Bloklar halinde bir dönemin uzunluğu (veri setinin ne sıklıkla güncellendiği)
      "k": 1,                           # Bir Düğümün ebeveyn sayısı
      "w": w,                          # Modüler üs alma hashlemesi için kullanılır
      "accesses": 200,                  # Hashimoto sırasında veri setine erişim sayısı
      "P": SAFE_PRIME_512               # Hashleme ve rastgele sayı üretimi için Güvenli Asal Sayı
}
```

Bu durumda `P`, `log₂(P)` değerinin 512'den biraz daha az olacağı şekilde seçilmiş bir asal sayıdır; bu da sayılarımızı temsil etmek için kullandığımız 512 bite karşılık gelir. DAG'ın yalnızca ikinci yarısının gerçekten depolanması gerektiğine dikkat edin, bu nedenle fiili RAM gereksinimi 1 GB'tan başlar ve yılda 441 MB artar.

### Dagger grafiği oluşturma {#dagger-graph-building}

Dagger grafiği oluşturma ilkeli şu şekilde tanımlanır:

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

Temel olarak, bir grafiği tek bir düğüm olan `sha3(seed)` olarak başlatır ve oradan rastgele önceki düğümlere dayalı olarak diğer düğümleri sırayla eklemeye başlar. Yeni bir düğüm oluşturulduğunda, `i` değerinden küçük bazı endeksleri rastgele seçmek için çekirdeğin modüler bir kuvveti hesaplanır (yukarıdaki `x % i` kullanılarak) ve bu endekslerdeki düğümlerin değerleri, `x` için yeni bir değer üretmek üzere bir hesaplamada kullanılır; bu değer daha sonra nihayetinde `i` endeksindeki grafiğin değerini üretmek için küçük bir iş kanıtı fonksiyonuna (XOR tabanlı) beslenir. Bu özel tasarımın arkasındaki mantık, DAG'a sıralı erişimi zorlamaktır; DAG'ın erişilecek bir sonraki değeri, mevcut değer bilinene kadar belirlenemez. Son olarak, modüler üs alma işlemi sonucu daha da hashler.

Bu algoritma, sayı teorisinden birkaç sonuca dayanmaktadır. Bir tartışma için aşağıdaki eke bakın.

## Hafif istemci değerlendirmesi {#light-client-evaluation}

Yukarıdaki grafik yapısı, grafikteki her bir düğümün yalnızca az sayıda düğümden oluşan bir alt ağaç hesaplanarak ve yalnızca az miktarda yardımcı bellek gerektirerek yeniden oluşturulmasına izin vermeyi amaçlamaktadır. k=1 olduğunda, alt ağacın yalnızca DAG'daki ilk elemana kadar giden bir değerler zinciri olduğuna dikkat edin.

DAG için hafif istemci hesaplama fonksiyonu şu şekilde çalışır:

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

Temel olarak, tüm DAG için değerleri hesaplama döngüsünü kaldıran ve önceki düğüm aramasını özyinelemeli bir çağrı veya bir önbellek aramasıyla değiştiren yukarıdaki algoritmanın basitçe yeniden yazılmış halidir. `k=1` için önbelleğin gereksiz olduğuna dikkat edin, ancak daha ileri bir optimizasyon aslında DAG'ın ilk birkaç bin değerini önceden hesaplar ve bunu hesaplamalar için statik bir önbellek olarak tutar; bunun bir kod uygulaması için eke bakın.

## DAG'ların çift tamponu {#double-buffer}

Tam bir istemcide, yukarıdaki formül tarafından üretilen 2 DAG'lık bir [_çift tampon_](https://wikipedia.org/wiki/Multiple_buffering) kullanılır. Buradaki fikir, DAG'ların yukarıdaki parametrelere göre her `epochtime` blok sayısında bir üretilmesidir. İstemci üretilen en son DAG'ı kullanmak yerine bir öncekini kullanır. Bunun faydası, madencilerin aniden tüm verileri yeniden hesaplaması gereken bir adımı dahil etmeye gerek kalmadan DAG'ların zaman içinde değiştirilmesine olanak sağlamasıdır. Aksi takdirde, düzenli aralıklarla zincir işlemede ani ve geçici bir yavaşlama ve merkezileşmenin önemli ölçüde artması potansiyeli vardır. Bu nedenle, tüm veriler yeniden hesaplanmadan önceki o birkaç dakika içinde %51 saldırısı riskleri oluşur.

Bir blok için işi hesaplamak üzere kullanılan DAG kümesini oluşturmak için kullanılan algoritma şöyledir:

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # Arka tampon mümkün değil, sadece ön tampon yapın
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Orijinal Hashimoto'nun arkasındaki fikir, blokzinciri bir veri kümesi olarak kullanmak, blokzincirden N endeks seçen bir hesaplama yapmak, bu endekslerdeki işlemleri toplamak, bu verilerin bir XOR'unu gerçekleştirmek ve sonucun hash'ini döndürmektir. Thaddeus Dryja'nın tutarlılık için Python'a çevrilen orijinal algoritması şöyledir:

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

Ne yazık ki, Hashimoto RAM açısından zor (RAM hard) olarak kabul edilse de, önemli bir hesaplama yüküne sahip olan 256 bitlik aritmetiğe dayanır. Ancak Dagger-Hashimoto, bu sorunu çözmek için veri kümesini endekslerken yalnızca en az anlamlı (least significant) 64 biti kullanır.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Çift SHA3 kullanımı, yalnızca doğru bir ara değerin sağlandığını doğrulayan, sıfır verili, neredeyse anında bir ön doğrulama biçimine olanak tanır. İş kanıtının bu dış katmanı son derece ASIC dostudur ve oldukça zayıftır, ancak hemen reddedilmeyecek bir blok üretmek için bu küçük miktardaki işin yapılması gerektiğinden DDoS'u daha da zorlaştırmak için mevcuttur. İşte hafif istemci sürümü:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Madencilik ve doğrulama {#mining-and-verifying}

Şimdi, hepsini madencilik algoritmasında bir araya getirelim:

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

İşte doğrulama algoritması:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Hafif istemci dostu doğrulama:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Ayrıca, Dagger-Hashimoto'nun blok başlığına ek gereksinimler getirdiğini unutmayın:

- İki katmanlı doğrulamanın çalışması için, bir blok başlığının hem nonce değerine hem de sha3 öncesi orta değere sahip olması gerekir
- Bir blok başlığı, mevcut çekirdek kümesinin (seedset) sha3'ünü bir yerde depolamalıdır

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## Ek {#appendix}

Yukarıda belirtildiği gibi, DAG üretimi için kullanılan RNG (Rastgele Sayı Üretici), sayı teorisinden bazı sonuçlara dayanır. İlk olarak, `picker` değişkeninin temeli olan Lehmer RNG'nin geniş bir periyoda sahip olduğuna dair güvence sağlıyoruz. İkinci olarak, başlangıç için `x ∈ [2,P-2]` sağlandığında `pow(x,3,P)` fonksiyonunun `x` değerini `1` veya `P-1` değerine eşlemeyeceğini gösteriyoruz. Son olarak, bir hash fonksiyonu olarak ele alındığında `pow(x,3,P)` fonksiyonunun düşük bir çarpışma oranına sahip olduğunu gösteriyoruz.

### Lehmer rastgele sayı üreticisi {#lehmer-random-number}

`produce_dag` fonksiyonunun tarafsız rastgele sayılar üretmesi gerekmese de, potansiyel bir tehdit `seed**i % P` fonksiyonunun yalnızca bir avuç değer almasıdır. Bu, deseni tanıyan madencilere tanımayanlara karşı bir avantaj sağlayabilir.

Bunu önlemek için sayı teorisinden bir sonuca başvurulur. Bir [_Güvenli Asal_](https://en.wikipedia.org/wiki/Safe_prime) (Safe Prime), `(P-1)/2` değerinin de asal olduğu bir `P` asalı olarak tanımlanır. [Çarpımsal grubun](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) (`ℤ/nℤ`) bir üyesi olan `x` değerinin _mertebesi_ (order), <pre>xᵐ mod P ≡ 1</pre> olacak şekildeki en küçük `m` olarak tanımlanır.
Bu tanımlar ışığında şunlara sahibiz:

> Gözlem 1. `x`, güvenli bir `P` asalı için `ℤ/Pℤ` çarpımsal grubunun bir üyesi olsun. Eğer `x mod P ≠ 1 mod P` ve `x mod P ≠ P-1 mod P` ise, o zaman `x` değerinin mertebesi ya `P-1` ya da `(P-1)/2` olur.

_Kanıt_. `P` güvenli bir asal olduğundan, [Lagrange Teoremi][lagrange] uyarınca `x` değerinin mertebesi `1`, `2`, `(P-1)/2` veya `P-1` olur.

`x` değerinin mertebesi `1` olamaz, çünkü Fermat'nın Küçük Teoremi'ne göre şuna sahibiz:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Bu nedenle `x`, `ℤ/nℤ` grubunun benzersiz olan çarpımsal birimi olmalıdır. Varsayım gereği `x ≠ 1` olduğunu kabul ettiğimizden, bu mümkün değildir.

`x = P-1` olmadığı sürece `x` değerinin mertebesi `2` olamaz, çünkü bu `P` değerinin asal olmasını ihlal eder.

Yukarıdaki önermeden, `(picker * init) % P` yinelemesinin en az `(P-1)/2` döngü uzunluğuna sahip olacağını anlayabiliriz. Bunun nedeni, `P` değerini yaklaşık olarak ikinin daha yüksek bir kuvvetine eşit güvenli bir asal olarak seçmemiz ve `init` değerinin `[2,2**256+1]` aralığında olmasıdır. `P` değerinin büyüklüğü göz önüne alındığında, modüler üs alma işleminden asla bir döngü beklememeliyiz.

DAG'daki ilk hücreyi (`init` etiketli değişken) atarken `pow(sha3(seed) + 2, 3, P)` hesaplarız. İlk bakışta bu, sonucun ne `1` ne de `P-1` olacağını garanti etmez. Ancak, `P-1` güvenli bir asal olduğundan, Gözlem 1'in bir sonucu olan aşağıdaki ek güvenceye sahibiz:

> Gözlem 2. `x`, güvenli bir `P` asalı için `ℤ/Pℤ` çarpımsal grubunun bir üyesi olsun ve `w` bir doğal sayı olsun. Eğer `x mod P ≠ 1 mod P` ve `x mod P ≠ P-1 mod P` ise ve ayrıca `w mod P ≠ P-1 mod P` ve `w mod P ≠ 0 mod P` ise, o zaman `xʷ mod P ≠ 1 mod P` ve `xʷ mod P ≠ P-1 mod P` olur.

### Bir hash fonksiyonu olarak modüler üs alma {#modular-exponentiation}

`P` ve `w` değerlerinin belirli durumları için `pow(x, w, P)` fonksiyonu birçok çarpışmaya sahip olabilir. Örneğin, `pow(x,9,19)` yalnızca `{1,18}` değerlerini alır.

`P` değerinin asal olduğu göz önüne alındığında, modüler üs alma hash fonksiyonu için uygun bir `w`, aşağıdaki sonuç kullanılarak seçilebilir:

> Gözlem 3. `P` bir asal sayı olsun; `w` ve `P-1` ancak ve ancak `ℤ/Pℤ` içindeki tüm `a` ve `b` değerleri için aralarında asaldır:<center>`aʷ mod P ≡ bʷ mod P` ancak ve ancak `a mod P ≡ b mod P` ise</center>

Böylece, `P` değerinin asal olduğu ve `w` değerinin `P-1` ile aralarında asal olduğu göz önüne alındığında, `|{pow(x, w, P) : x ∈ ℤ}| = P` elde ederiz; bu da hash fonksiyonunun mümkün olan en düşük çarpışma oranına sahip olduğu anlamına gelir.

Seçtiğimiz gibi `P` değerinin güvenli bir asal olduğu özel durumda, `P-1` yalnızca 1, 2, `(P-1)/2` ve `P-1` çarpanlarına sahiptir. `P` > 7 olduğundan, 3'ün `P-1` ile aralarında asal olduğunu biliyoruz, bu nedenle `w=3` yukarıdaki önermeyi sağlar.

## Daha verimli önbellek tabanlı değerlendirme algoritması {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```