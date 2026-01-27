---
title: Dagger-Hashimoto
description: Dagger-Hashimoto algoritmasına detaylı bir bakış.
lang: tr
---

Dagger-Hashimoto, Ethereum'un madencilik algoritması için orijinal araştırma uygulaması ve şartnamesiydi. Dagger-Hashimoto'nun yerini [Ethash](#ethash) almıştır. 15 Eylül 2022'deki [Birleşim](/roadmap/merge/) ile madencilik tamamen durduruldu. O zamandan beri Ethereum, bunun yerine bir [hisse ispatı](/developers/docs/consensus-mechanisms/pos) mekanizması kullanılarak güvence altına alınmıştır. Bu sayfa sadece bilgilendirme içindir - burdaki bilgi Birleşim sonrası Ethereum için geçerli değildir.

## Ön Koşullar {#prerequisites}

Bu sayfayı daha iyi anlamak için önce [iş ispatı mutabakatı](/developers/docs/consensus-mechanisms/pow), [madencilik](/developers/docs/consensus-mechanisms/pow/mining) ve [madencilik algoritmaları](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) hakkında bilgi edinmenizi öneririz.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto iki hedefi gerçekleştirmeyi amaçlar:

1. **ASIC direnci**: algoritma için özel donanım oluşturmanın faydası mümkün olduğunca az olmalıdır
2. **Hafif istemci doğrulanabilirliği**: bir blok, hafif bir istemci tarafından verimli bir şekilde doğrulanabilir olmalıdır.

Ek bir değişiklikle, istenirse, ancak ek karmaşıklık pahasına üçüncü bir hedefin nasıl yerine getirileceğini de belirtiyoruz:

**Tam zincir depolama**: madencilik, tüm blokzincir durumunun depolanmasını gerektirmelidir (Ethereum durum ağacının düzensiz yapısı nedeniyle, özellikle sık kullanılan bazı sözleşmelerde bir miktar budamanın mümkün olacağını tahmin ediyoruz, ancak bunu en aza indirmek istiyoruz).

## DAG Üretimi {#dag-generation}

Algoritmanın kodu aşağıdaki Python'da tanımlanacaktır. İlk olarak, belirtilen hassasiyetteki işaretsiz tam sayıları dizelere sıralamak için `encode_int` veriyoruz. Tersi de aşağıda verilmiştir:

```python
NUM_BITS = 512

def encode_int(x):
    "Bir tamsayı x'i büyük endian şeması kullanarak 64 karakterlik bir dize olarak kodlayın"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Büyük endian şeması kullanarak bir dizeden bir x tamsayısının kodunu çözün"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Ardından, `sha3`'ün bir tam sayı alıp bir tam sayı çıktısı veren bir işlev ve `dbl_sha3`'ün bir çift sha3 işlevi olduğunu varsayıyoruz; bu referans kodu bir uygulamaya dönüştürüyorsanız, şunu kullanın:

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
SAFE_PRIME_512 = 2**512 - 38117 # En Büyük Güvenli Prime 2**512'den küçük

parametreler = {
      "n": 4000055296 * 8 // NUM_BITS, # Veri kümesinin boyutu (4 Gigabayt); 65536'NIN KATINDA OLMALIDIR
      "n_inc": 65536, # Dönem başına n değerinde artış; 65536'NIN KATINDA OLMALIDIR
                                        # epochtime ile=20000, yılda 882 MB büyüme sağlar
      "cache_size": 2500, # Light istemcinin önbelleğinin boyutu (light ile seçilebilir
                                        # istemci; algo spesifikasyonunun bir parçası değil)
      "diff": 2**14, # Zorluk (blok değerlendirmesi sırasında ayarlanır)
      "epochtime": 100000, # Bir dönemin blok cinsinden uzunluğu (veri kümesinin ne sıklıkta güncellendiği)
      "k": 1, # Bir düğümün ebeveyn sayısı
      "w": w, # Modüler üslü karma için kullanılır
      "erişim": 200, # Hashimoto sırasında veri kümesi erişimlerinin sayısı
      "P": SAFE_PRIME_512 # Karma ve rastgele sayı üretimi için Safe Prime
}
```

Bu durumda `P`, `log₂(P)`'nin 512'den biraz daha küçük olacak şekilde seçilmiş bir asal sayıdır, bu da sayılarımızı temsil etmek için kullandığımız 512 bite karşılık gelir. DAG'nin yalnızca ikinci yarısının gerçekten depolanması gerektiğini unutmayın, bu nedenle RAM gereksinimi 1 GB'den başlar ve yılda 441 MB büyür.

### Dagger grafiği oluşturma {#dagger-graph-building}

Dagger grafiği oluşturma ilkesi şu şekilde tanımlanır:

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

Esasen, bir grafiği tek bir düğüm olan `sha3(seed)` olarak başlatır ve oradan rastgele önceki düğümlere dayalı olarak diğer düğümleri sırayla eklemeye başlar. Yeni bir düğüm oluşturulduğunda, `i`'den küçük bazı dizinleri rastgele seçmek için tohumun modüler bir gücü hesaplanır (yukarıdaki `x % i` kullanılarak) ve bu dizinlerdeki düğümlerin değerleri, `x` için yeni bir değer oluşturmak üzere bir hesaplamada kullanılır, bu da nihai olarak `i` dizinindeki grafiğin değerini oluşturmak için küçük bir iş ispatı fonksiyonuna (XOR tabanlı) beslenir. Bu özel tasarımın arkasındaki mantık, DAG'nin sıralı erişimini zorlamak; DAG'ın erişilecek bir sonraki değeri, mevcut değer bilinene kadar belirlenemez. Son olarak, modüler üs alma sonucu daha da özetler.

Bu algoritma, sayı teorisinden elde edilen çeşitli sonuçlara dayanır. Bir tartışma için ek bölümü aşağıda görebilirsiniz.

## Hafif istemci değerlendirmesi {#light-client-evaluation}

Yukarıdaki grafik yapısı, grafikteki her bir düğümün, yalnızca az sayıda düğümden oluşan bir alt ağaç hesaplanarak ve yalnızca az miktarda yardımcı bellek gerektirerek yeniden oluşturulmasına izin vermeyi amaçlamaktadır. K=1 ile alt ağacın yalnızca DAG'deki ilk öğeye kadar giden bir değerler zinciri olduğuna dikkat edin.

DAG için hafif istemci hesaplama işlevi aşağıdaki gibi çalışır:

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

Esasen, tüm DAG için değerleri hesaplama döngüsünü ortadan kaldıran ve önceki düğüm aramasını özyinelemeli bir çağrı veya bir önbellek aramasıyla değiştiren, yukarıdaki algoritmanın basitçe yeniden yazılmasıdır. `k=1` için önbelleğin gereksiz olduğunu, ancak daha ileri bir optimizasyonun aslında DAG'nin ilk birkaç bin değerini önceden hesapladığını ve bunu hesaplamalar için statik bir önbellek olarak tuttuğunu unutmayın; bunun bir kod uygulaması için eke bakın.

## DAG'lerin çift arabelleği {#double-buffer}

Tam bir istemcide, yukarıdaki formülle üretilen 2 DAG'den oluşan bir [_çift arabellek_](https://wikipedia.org/wiki/Multiple_buffering) kullanılır. Buradaki fikir, DAG'lerin yukarıdaki parametrelere göre her `epochtime` blok sayısında üretilmesidir. Üretilen en son DAG'ı kullanan istemci yerine, öncekini kullanır. Bunun yararı, madencilerin tüm verileri aniden yeniden hesaplaması gereken bir adımın dahil edilmesine gerek kalmadan, DAG'lerin zaman içinde değiştirilmesine izin vermesidir. Aksi takdirde, düzenli aralıklarla zincir işlemede ani bir geçici yavaşlama ve merkezileşmeyi önemli ölçüde artırma potansiyeli vardır. Bu nedenle, tüm veriler yeniden hesaplanmadan önceki birkaç dakika içinde %51 saldırı riski vardır.

Bir blok için çalışmayı hesaplamak için kullanılan DAG setini oluşturmak için kullanılan algoritma aşağıdaki gibidir:

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
        # No back buffer is possible, just make front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Orijinal Hashimoto'nun arkasındaki fikir, blok zincirini bir veri seti olarak kullanmak, blok zincirinden N indeks seçen, bu indekslerdeki işlemleri toplayan, bu verilerin bir XOR'sini gerçekleştiren ve sonucun karmasını döndüren bir hesaplama yapmaktır. Thaddeus Dryja'nın tutarlılık için Python'a çevrilmiş orijinal algoritması aşağıdaki gibidir:

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

Ne yazık ki, Hashimoto RAM zor olarak kabul edilirken, önemli hesaplama yükü olan 256-bit aritmetik kullanır. Ancak Dagger-Hashimoto, bu sorunu çözmek için veri kümesini indekslerken yalnızca en az önemli 64 biti kullanır.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Çift SHA3'ün kullanımı, yalnızca doğru bir ara değerin sağlandığını doğrulayan, neredeyse anında ön doğrulama olan bir sıfır veri biçimine olanak tanır. Çalışma kanıtının bu dış katmanı oldukça ASIC dostudur ve oldukça zayıftır, ancak hemen reddedilmeyecek bir blok oluşturmak için bu küçük miktarda işin yapılması gerektiğinden DDoS'u daha da zor hale getirmek için vardır. Hafif-istemci versiyonu aşağıdaki gibidir:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Madencilik ve doğrulama {#mining-and-verifying}

Şimdi hepsini madencilik algoritmasında bir araya getirelim:

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

Doğrulama algoritması aşağıdadır:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Hafif-istemci dostu doğrulama:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Ayrıca, Dagger-Hashimoto'nun blok başlığına ek gereksinimler getirdiğini unutmayın:

- İki katmanlı doğrulamanın çalışması için, bir blok başlığı hem nonce hem de orta değer pre-sha3'e sahip olmalıdır
- Bir yerde, bir blok başlığı mevcut tohum setinin sha3'ünü depolamalıdır

## Daha fazla kaynak {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve onu ekleyin!_

## Ek {#appendix}

Yukarıda belirtildiği gibi, DAG üretimi için kullanılan RNG, sayı teorisinden elde edilen bazı sonuçlara dayanır. İlk olarak, `picker` değişkeninin temeli olan Lehmer RNG'nin geniş bir periyoda sahip olduğuna dair güvence veriyoruz. İkinci olarak, başlangıç için `x ∈ [2,P-2]` sağlandığında `pow(x,3,P)`'nin `x`'i `1`'e veya `P-1`'e eşlemeyeceğini gösteriyoruz. Son olarak, `pow(x,3,P)`'nin bir karma işlevi olarak ele alındığında düşük bir çarpışma oranına sahip olduğunu gösteriyoruz.

### Lehmer rastgele sayı üreteci {#lehmer-random-number}

`produce_dag` işlevinin tarafsız rastgele sayılar üretmesi gerekmese de, potansiyel bir tehdit, `seed**i % P`'nin yalnızca bir avuç değer almasıdır. Bu, modeli tanımayanlara kıyasla madencilere bir avantaj sağlayabilir.

Bundan kaçınmak için sayı teorisinden bir sonuca başvurulur. [_Güvenli Asal_](https://en.wikipedia.org/wiki/Safe_prime), `(P-1)/2` de asal olacak şekilde bir `P` asalı olarak tanımlanır. [Çarpımsal grup](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ`'nin bir `x` üyesinin _mertebesi_, <pre>xᵐ mod P ≡ 1</pre> olacak şekildeki minimum `m` olarak tanımlanır.
Bu tanımlar göz önüne alındığında, elimizde şunlar vardır:

> Gözlem 1. `x`, güvenli bir `P` asalı için `ℤ/Pℤ` çarpımsal grubunun bir üyesi olsun. Eğer `x mod P ≠ 1 mod P` ve `x mod P ≠ P-1 mod P` ise, `x`'in mertebesi ya `P-1` ya da `(P-1)/2`'dir.

_Kanıt_. `P` güvenli bir asal olduğundan, [Lagrange Teoremi][lagrange] gereğince `x`'in mertebesinin `1`, `2`, `(P-1)/2` veya `P-1` olduğunu söyleyebiliriz.

`x`'in mertebesi `1` olamaz, çünkü Fermat'nın Küçük Teoremi'ne göre elimizde şu vardır:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Dolayısıyla `x`, benzersiz olan `ℤ/nℤ`'nin bir çarpımsal birimi olmalıdır. Varsayım gereği `x ≠ 1` olduğunu varsaydığımız için bu mümkün değildir.

`x`'in mertebesi `x = P-1` olmadıkça `2` olamaz, çünkü bu `P`'nin asal olmasını ihlal eder.

Yukarıdaki önermeden, `(picker * init) % P` yinelemesinin en az `(P-1)/2` döngü uzunluğuna sahip olacağını görebiliriz. Bunun nedeni, `P`'yi ikinin daha yüksek bir kuvvetine yaklaşık olarak eşit olan güvenli bir asal olarak seçmemiz ve `init`'in `[2,2**256+1]` aralığında olmasıdır. `P`'nin büyüklüğü göz önüne alındığında, modüler üs almadan asla bir döngü beklememeliyiz.

DAG'deki ilk hücreyi (etiketi `init` olan değişken) atarken, `pow(sha3(seed) + 2, 3, P)` hesaplarız. İlk bakışta bu, sonucun ne `1` ne de `P-1` olduğunu garanti etmez. Ancak, `P-1` güvenli bir asal olduğundan, Gözlem 1'in bir sonucu olan aşağıdaki ek güvenceye sahibiz:

> Gözlem 2. `x`, güvenli bir `P` asalı için `ℤ/Pℤ` çarpımsal grubunun bir üyesi ve `w` bir doğal sayı olsun. Eğer `x mod P ≠ 1 mod P` ve `x mod P ≠ P-1 mod P` ise, ayrıca `w mod P ≠ P-1 mod P` ve `w mod P ≠ 0 mod P` ise, o zaman `xʷ mod P ≠ 1 mod P` ve `xʷ mod P ≠ P-1 mod P` olur.

### Karma işlevi olarak modüler üs alma {#modular-exponentiation}

Belirli `P` ve `w` değerleri için, `pow(x, w, P)` işlevinin birçok çakışması olabilir. Örneğin, `pow(x,9,19)` yalnızca `{1,18}` değerlerini alır.

`P` asal olduğundan, modüler üs alma karma işlevi için uygun bir `w`, aşağıdaki sonuç kullanılarak seçilebilir:

> Gözlem 3. `P` bir asal sayı olsun; `w` ve `P-1`'in aralarında asal olması için gerek ve yeter koşul, `ℤ/Pℤ`'deki tüm `a` ve `b` için şudur:<center>`aʷ mod P ≡ bʷ mod P` olması için gerek ve yeter koşul `a mod P ≡ b mod P` olmasıdır</center>

Dolayısıyla, `P` asal ve `w`, `P-1` ile aralarında asal olduğunda, `|{pow(x, w, P) : x ∈ ℤ}| = P` olur, bu da karma işlevinin mümkün olan en düşük çarpışma oranına sahip olduğu anlamına gelir.

`P`'nin seçtiğimiz gibi güvenli bir asal olduğu özel durumda, `P-1` yalnızca 1, 2, `(P-1)/2` ve `P-1` çarpanlarına sahiptir. `P` > 7 olduğundan, 3'ün `P-1` ile aralarında asal olduğunu biliyoruz, dolayısıyla `w=3` yukarıdaki önermeyi sağlar.

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
