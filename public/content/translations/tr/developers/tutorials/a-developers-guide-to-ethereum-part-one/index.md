---
title: Bir Python geliştiricisinin Ethereum'a girişi, bölüm 1
description: Özellikle Python programlama dili bilgisine sahip olanlar için faydalı bir Ethereum geliştirmeye giriş rehberi
author: Marc Garreau
lang: tr
tags: ["python", "web3.py"]
skill: beginner
breadcrumb: Python ile Ethereum
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Demek bu Ethereum denen şeyi duydunuz ve tavşan deliğinden aşağı inmeye hazırsınız? Bu yazı, bazı blokzincir temellerini hızlıca ele alacak, ardından simüle edilmiş bir Ethereum düğümü ile etkileşime geçmenizi sağlayacak: blok verilerini okuma, hesap bakiyelerini kontrol etme ve işlemler gönderme. Bu süreçte, geleneksel uygulama geliştirme yöntemleri ile bu yeni merkeziyetsiz paradigma arasındaki farkları vurgulayacağız.

## (Esnek) ön koşullar {#soft-prerequisites}

Bu yazı, geniş bir geliştirici kitlesi için erişilebilir olmayı hedefliyor. [Python araçları](/developers/docs/programming-languages/python/) kullanılacak, ancak bunlar sadece fikirleri aktarmak için bir araç; bir Python geliştiricisi olmasanız da sorun değil. Yine de, Ethereum'a özgü kısımlara hızlıca geçebilmemiz için halihazırda bildikleriniz hakkında sadece birkaç varsayımda bulunacağım.

Varsayımlar:

- Bir terminalde gezinebilirsiniz,
- Birkaç satır Python kodu yazdınız,
- Makinenizde Python 3.6 veya daha yeni bir sürüm yüklü (bir [sanal ortam](https://realpython.com/effective-python-environment/#virtual-environments) kullanılması şiddetle tavsiye edilir) ve
- Python'un paket yükleyicisi olan `pip` aracını kullandınız.
  Tekrar belirtmek gerekirse, bunlardan herhangi biri doğru değilse veya bu makaledeki kodu yeniden üretmeyi planlamıyorsanız, muhtemelen yine de sorunsuz bir şekilde takip edebilirsiniz.

## Kısaca blokzincirler {#blockchains-briefly}

Ethereum'u tanımlamanın birçok yolu vardır, ancak kalbinde bir blokzincir yatar. Blokzincirler bir dizi bloktan oluşur, bu yüzden oradan başlayalım. En basit ifadeyle, Ethereum blokzincirindeki her blok sadece bazı meta veriler ve bir işlemler listesidir. JSON formatında bu şuna benzer:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Her [blok](/developers/docs/blocks/), kendinden önceki bloğa bir referans içerir; `parentHash` basitçe önceki bloğun hash'idir.

<FeaturedText>Not: Ethereum, sabit boyutlu değerler ("hash'ler") üretmek için düzenli olarak <a href="https://wikipedia.org/wiki/Hash_function">hash fonksiyonlarını</a> kullanır. Hash'ler Ethereum'da önemli bir rol oynar, ancak şimdilik onları benzersiz kimlikler (ID'ler) olarak düşünebilirsiniz.</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_Bir blokzincir temel olarak bağlı bir listedir; her blok önceki bloğa bir referans içerir._

Bu veri yapısı yeni bir şey değildir, ancak ağı yöneten kurallar (yani eşler arası protokoller) yenidir. Merkezi bir otorite yoktur; eşlerden oluşan ağ, ağı sürdürmek için iş birliği yapmalı ve bir sonraki bloğa hangi işlemlerin dahil edileceğine karar vermek için rekabet etmelidir. Bu nedenle, bir arkadaşınıza biraz para göndermek istediğinizde, bu işlemi ağa yayınlamanız ve ardından gelecek bir bloğa dahil edilmesini beklemeniz gerekir.

Blokzincirin paranın gerçekten bir kullanıcıdan diğerine gönderildiğini doğrulamasının tek yolu, o blokzincire özgü (yani onun tarafından oluşturulan ve yönetilen) bir para birimi kullanmaktır. Ethereum'da bu para birimine Ether denir ve Ethereum blokzinciri, hesap bakiyelerinin tek resmi kaydını içerir.

## Yeni bir paradigma {#a-new-paradigm}

Bu yeni merkeziyetsiz teknoloji yığını, yeni geliştirici araçları ortaya çıkardı. Bu tür araçlar birçok programlama dilinde mevcuttur, ancak biz Python merceğinden bakacağız. Tekrar etmek gerekirse: Python tercih ettiğiniz dil olmasa bile, takip etmekte pek zorlanmazsınız.

Ethereum ile etkileşime geçmek isteyen Python geliştiricilerinin [Web3.py](https://web3py.readthedocs.io/)'a yönelmesi muhtemeldir. Web3.py, bir Ethereum düğümüne bağlanma ve ardından ondan veri gönderip alma şeklinizi büyük ölçüde basitleştiren bir kütüphanedir.

<FeaturedText>Not: "Ethereum düğümü" ve "Ethereum istemcisi" birbirinin yerine kullanılır. Her iki durumda da, Ethereum ağındaki bir katılımcının çalıştırdığı yazılımı ifade eder. Bu yazılım blok verilerini okuyabilir, zincire yeni bloklar eklendiğinde güncellemeleri alabilir, yeni işlemleri yayınlayabilir ve daha fazlasını yapabilir. Teknik olarak istemci yazılımdır, düğüm ise yazılımı çalıştıran bilgisayardır.</FeaturedText>

[Ethereum istemcileri](/developers/docs/nodes-and-clients/) [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP veya Websocket'ler aracılığıyla erişilebilir olacak şekilde yapılandırılabilir, bu nedenle Web3.py'ın bu yapılandırmayı yansıtması gerekecektir. Web3.py bu bağlantı seçeneklerini **sağlayıcılar (providers)** olarak adlandırır. Web3.py örneğini düğümünüze bağlamak için bu üç sağlayıcıdan birini seçmek isteyeceksiniz.

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_Ethereum düğümünü ve Web3.py'ı aynı protokol üzerinden iletişim kuracak şekilde yapılandırın, örn. bu diyagramdaki IPC._

Web3.py düzgün bir şekilde yapılandırıldıktan sonra, blokzincir ile etkileşime geçmeye başlayabilirsiniz. İşte ileride göreceklerinizin bir önizlemesi olarak birkaç Web3.py kullanım örneği:

```python
# blok verisini oku:
w3.eth.get_block('latest')

# bir işlem gönder:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Kurulum {#installation}

Bu rehberde, sadece bir Python yorumlayıcısı içinde çalışacağız. Herhangi bir dizin, dosya, sınıf veya fonksiyon oluşturmayacağız.

<FeaturedText>Not: Aşağıdaki örneklerde, `$` ile başlayan komutların terminalde çalıştırılması amaçlanmıştır. (`$` işaretini yazmayın, sadece satırın başlangıcını belirtir.)</FeaturedText>

İlk olarak, keşif yapmak için kullanıcı dostu bir ortam sağlayan [IPython](https://ipython.org/)'ı kurun. IPython, diğer özelliklerinin yanı sıra sekme (tab) ile tamamlama sunarak Web3.py içinde nelerin mümkün olduğunu görmeyi çok daha kolay hale getirir.

```bash
pip install ipython
```

Web3.py, `web3` adıyla yayınlanmıştır. Şu şekilde kurabilirsiniz:

```bash
pip install web3
```

Bir şey daha – daha sonra bir blokzinciri simüle edeceğiz, bu da birkaç bağımlılık daha gerektiriyor. Bunları şu şekilde kurabilirsiniz:

```bash
pip install 'web3[tester]'
```

Başlamak için her şey hazır!

Not: `web3[tester]` paketi Python 3.10.xx sürümüne kadar çalışır.

## Bir korumalı alan (sandbox) oluşturun {#spin-up-a-sandbox}

Terminalinizde `ipython` çalıştırarak yeni bir Python ortamı açın. Bu, `python` çalıştırmaya benzer, ancak daha fazla ekstra özellik ile birlikte gelir.

```bash
ipython
```

Bu, çalıştırdığınız Python ve IPython sürümleri hakkında bazı bilgiler yazdıracak, ardından girdi bekleyen bir komut istemi görmelisiniz:

```python
In [1]:
```

Şu anda etkileşimli bir Python kabuğuna bakıyorsunuz. Temel olarak, oynamak için bir korumalı alandır. Buraya kadar geldiyseniz, Web3.py'ı içe aktarmanın zamanı geldi:

```python
In [1]: from web3 import Web3
```

## Web3 modülüne giriş {#introducing-the-web3-module}

Ethereum'a bir geçit olmasının yanı sıra, [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) modülü birkaç kolaylık sağlayan fonksiyon sunar. Birkaçını inceleyelim.

Bir Ethereum uygulamasında, genellikle para birimi değerlerini dönüştürmeniz gerekecektir. Web3 modülü tam da bunun için birkaç yardımcı metot sağlar: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) ve [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Not: Bilgisayarlar ondalık matematikle başa çıkma konusunda kötü şöhrete sahiptir. Bunu aşmak için geliştiriciler genellikle dolar tutarlarını sent olarak saklarlar. Örneğin, fiyatı 5,99 $ olan bir ürün veritabanında 599 olarak saklanabilir.

<b>Ether</b> cinsinden işlemleri yönetirken de benzer bir model kullanılır. Ancak, iki ondalık basamak yerine Ether'in 18 basamağı vardır! Ether'in en küçük birimine <b>Wei</b> denir, bu nedenle işlemler gönderilirken belirtilen değer budur.

1 Ether = 1000000000000000000 Wei

1 Wei = 0.000000000000000001 Ether

</FeaturedText>

Bazı değerleri Wei'ye ve Wei'den dönüştürmeyi deneyin. Ether ve Wei arasındaki [birçok birimin isimleri olduğuna](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) dikkat edin. Bunlar arasında en iyi bilinenlerden biri **Gwei**'dir, çünkü işlem ücretleri genellikle bu şekilde temsil edilir.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 modülündeki diğer yardımcı metotlar arasında veri formatı dönüştürücüleri (örn. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), adres yardımcıları (örn. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) ve hash fonksiyonları (örn. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)) bulunur. Bunların birçoğu serinin ilerleyen bölümlerinde ele alınacaktır. Mevcut tüm metotları ve özellikleri görüntülemek için, `Web3` yazıp noktadan sonra sekme (tab) tuşuna iki kez basarak IPython'ın otomatik tamamlama özelliğinden yararlanın.

## Zincirle konuşun {#talk-to-the-chain}

Kolaylık sağlayan metotlar harika, ancak blokzincire geçelim. Bir sonraki adım, Web3.py'ı bir Ethereum düğümü ile iletişim kuracak şekilde yapılandırmaktır. Burada IPC, HTTP veya Websocket sağlayıcılarını kullanma seçeneğimiz var.

Bu yoldan gitmeyeceğiz, ancak HTTP Sağlayıcısı kullanan eksiksiz bir iş akışı örneği şuna benzeyebilir:

- Bir Ethereum düğümü indirin, örn. [Geth](https://geth.ethereum.org/).
- Bir terminal penceresinde Geth'i başlatın ve ağı eşzamanlamasını bekleyin. Varsayılan HTTP bağlantı noktası `8545`'tir, ancak yapılandırılabilir.
- Web3.py'a `localhost:8545` üzerinden HTTP aracılığıyla düğüme bağlanmasını söyleyin.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Düğümle etkileşime geçmek için `w3` örneğini kullanın.

Bu, bunu yapmanın "gerçek" bir yolu olsa da, eşzamanlama süreci saatler sürer ve sadece bir geliştirme ortamı istiyorsanız gereksizdir. Web3.py bu amaçla dördüncü bir sağlayıcı olan **EthereumTesterProvider**'ı sunar. Bu test sağlayıcısı, esnek izinlere ve oynamak için sahte para birimine sahip simüle edilmiş bir Ethereum düğümüne bağlanır.

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider simüle edilmiş bir düğüme bağlanır ve hızlı geliştirme ortamları için kullanışlıdır._

Bu simüle edilmiş düğüm [eth-tester](https://github.com/ethereum/eth-tester) olarak adlandırılır ve onu `pip install web3[tester]` komutunun bir parçası olarak kurduk. Web3.py'ı bu test sağlayıcısını kullanacak şekilde yapılandırmak şu kadar basittir:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Artık zincirde sörf yapmaya hazırsınız! İnsanlar böyle bir şey söylemez. Bunu az önce uydurdum. Hızlıca bir tura çıkalım.

## Hızlı tur {#the-quick-tour}

Her şeyden önce, bir sağlamlık kontrolü:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Test sağlayıcısını kullandığımız için bu çok değerli bir test değil, ancak başarısız olursa, muhtemelen `w3` değişkenini oluştururken bir şeyi yanlış yazmışsınızdır. İç parantezleri eklediğinizi iki kez kontrol edin, yani `Web3.EthereumTesterProvider()`.

## Tur durağı #1: [hesaplar](/developers/docs/accounts/) {#tour-stop-1-accounts}

Bir kolaylık olarak, test sağlayıcısı bazı hesaplar oluşturdu ve bunlara önceden test Ether'i yükledi.

İlk olarak, bu hesapların bir listesini görelim:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Bu komutu çalıştırırsanız, `0x` ile başlayan on dizelik bir liste görmelisiniz. Her biri bir **açık adrestir (public address)** ve bazı açılardan bir vadesiz hesaptaki hesap numarasına benzer. Size Ether göndermek isteyen birine bu adresi verirsiniz.

Belirtildiği gibi, test sağlayıcısı bu hesapların her birine bir miktar test Ether'i önceden yüklemiştir. İlk hesapta ne kadar olduğunu öğrenelim:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Bu çok fazla sıfır demek! Sahte bankaya gidip sevinmeden önce, daha önceki para birimi değerleri hakkındaki dersi hatırlayın. Ether değerleri en küçük birim olan Wei cinsinden temsil edilir. Bunu Ether'e dönüştürün:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Bir milyon test Ether'i — yine de fena değil.

## Tur durağı #2: blok verileri {#tour-stop-2-block-data}

Bu simüle edilmiş blokzincirin durumuna bir göz atalım:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Bir blok hakkında birçok bilgi döndürülür, ancak burada belirtilmesi gereken sadece birkaç şey var:

- Blok numarası sıfırdır — test sağlayıcısını ne kadar zaman önce yapılandırdığınızın bir önemi yoktur. Her 12 saniyede bir yeni bir blok ekleyen gerçek Ethereum ağının aksine, bu simülasyon ona yapacak bir iş verene kadar bekleyecektir.
- `transactions` aynı nedenden dolayı boş bir listedir: henüz hiçbir şey yapmadık. Bu ilk blok, sadece zinciri başlatmak için bir **boş bloktur**.
- `parentHash` değerinin sadece bir dizi boş bayt olduğuna dikkat edin. Bu, zincirdeki ilk blok olduğunu, diğer adıyla **başlangıç bloğu** olduğunu gösterir.

## Tur durağı #3: [işlemler](/developers/docs/transactions/) {#tour-stop-3-transactions}

Bekleyen bir işlem olana kadar sıfırıncı blokta takılı kaldık, bu yüzden ona bir tane verelim. Bir hesaptan diğerine birkaç test Ether'i gönderin:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Bu, tipik olarak işleminizin yeni bir bloğa dahil edilmesi için birkaç saniye bekleyeceğiniz noktadır. Tüm süreç şuna benzer:

1. Bir işlem gönderin ve işlem hash'ini saklayın. İşlemi içeren blok oluşturulup yayınlanana kadar işlem "bekliyor" durumundadır.
   `tx_hash = w3.eth.send_transaction({ … })`
2. İşlemin bir bloğa dahil edilmesini bekleyin:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Uygulama mantığına devam edin. Başarılı işlemi görüntülemek için:
   `w3.eth.get_transaction(tx_hash)`

Simüle edilmiş ortamımız işlemi anında yeni bir bloğa ekleyecektir, böylece işlemi hemen görüntüleyebiliriz:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Burada bazı tanıdık detaylar göreceksiniz: `from`, `to` ve `value` alanları `send_transaction` çağrımızın girdileriyle eşleşmelidir. Diğer güven verici kısım ise, bu işlemin 1 numaralı blok içinde ilk işlem (`'transactionIndex': 0`) olarak dahil edilmiş olmasıdır.

Ayrıca, ilgili iki hesabın bakiyelerini kontrol ederek bu işlemin başarısını kolayca doğrulayabiliriz. Üç Ether birinden diğerine geçmiş olmalıdır.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

İkincisi iyi görünüyor! Bakiye 1.000.000'dan 1.000.003 Ether'e çıktı. Peki ilk hesaba ne oldu? Üç Ether'den biraz daha fazlasını kaybetmiş gibi görünüyor. Ne yazık ki hayatta hiçbir şey bedava değildir ve Ethereum açık ağını kullanmak, destekleyici rolleri için eşlerinizi telafi etmenizi gerektirir. İşlemi gönderen hesaptan küçük bir işlem ücreti düşüldü - bu ücret, yakılan Gaz miktarının (bir ETH transferi için 21000 birim Gaz) ağ etkinliğine göre değişen bir taban ücret ile çarpılması ve işlemi bir bloğa dahil eden Doğrulayıcıya giden bir öncelik ücretinin eklenmesiyle hesaplanır.

[Gaz](/developers/docs/gas/#post-london) hakkında daha fazla bilgi

<FeaturedText>Not: Açık ağda, işlem ücretleri ağ talebine ve bir işlemin ne kadar hızlı işlenmesini istediğinize bağlı olarak değişkendir. Ücretlerin nasıl hesaplandığının bir dökümüyle ilgileniyorsanız, <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">işlemlerin bir bloğa nasıl dahil edildiği</a> hakkındaki önceki yazıma bakın.</FeaturedText>

## Ve nefes alın {#and-breathe}

Bir süredir bununla uğraşıyoruz, bu yüzden burası mola vermek için iyi bir yer gibi görünüyor. Tavşan deliği devam ediyor ve bu serinin ikinci bölümünde keşfetmeye devam edeceğiz. Gelecek bazı kavramlar: gerçek bir düğüme bağlanma, akıllı sözleşmeler ve token'lar. Takip eden sorularınız mı var? Bana bildirin! Geri bildiriminiz buradan nereye gideceğimizi etkileyecektir. İsteklerinizi [Twitter](https://twitter.com/wolovim) üzerinden iletebilirsiniz.