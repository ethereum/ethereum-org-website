---
title: Python Geliştiricileri için Ethereum'a Giriş, Bölüm 1
description: Özellikle Python programlama dili hakkında bilgi sahibi olanlar için yararlı olan Ethereum geliştirmeye giriş
author: Marc Garreau
lang: tr
tags:
  - "başlarken"
  - "python"
  - "blok zinciri"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Şu Ethereum denen şeyi duydunuz ve konuya daha derinlemesine inmeye hazır mı hissediyorsunuz? Bu gönderi, bazı blok zinciri temellerini hızlı bir şekilde ele alacak, ardından sizi simüle edilmiş bir Ethereum düğümü ile etkileşime sokarak blok verilerini okuyacak, hesap bakiyelerini kontrol edecek ve işlemleri gönderecektir. Bu arada, uygulama oluşturmanın geleneksel yolları ile bu yeni merkeziyetsiz paradigma arasındaki farkları vurgulayacağız.

## (Hafif) ön koşullar {#soft-prerequisites}

Bu gönderi, birçok türden geliştiricileri için ulaşılabilir olmayı arzulamaktadır. [Python araçları](/developers/docs/programming-languages/python/) kullanılacaktır, ama sadece fikirler için bir araç olacaklardır: Bir Python geliştiricisi değilseniz de sorun olmaz. Gelgelelim, Ethereum ile ilgili kısımlara hızlıca geçebilmemiz için bazı şeyleri bildiğinizi varsayacağım.

Varsayımlar:

- bir terminalde gezinebildiğiniz,
- birkaç satır Python kodu yazdığınız,
- Python'un 3.6 ya da daha yüksek bir sürümü cihazınızda yüklüdür (bir [sanal ortam](https://realpython.com/effective-python-environment/#virtual-environments) kullanılması teşvik edilmektedir), ve
- Python’un paket indiricisi `pip`'i kullandığınız varsayılır. Buna karşın, eğer varsayımlardan herhangi biri doğru değilse, veya bu makaledeki kodu yeniden uygulamayı düşünmüyorsanız, büyük ihtimalle yine de gayet iyi şekilde takip edebilirsiniz.

## Kısaca blok zincirleri {#blockchains-briefly}

Ethereum'u tanımlamanın birçok yolu bulunsa da Ethereum, özünde bir blok zinciridir. Blok zincirleri bir dizi bloktan oluşur, bu yüzden oradan başlayalım. En basit şekilde, Ethereum blok zincirindeki her bir blok sadece birtakım meta veri ve bir dizi işlemdir. JSON formatında, şöyle bir şeye benzer:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   "miner": "0xa1b2c3...",
   ...,
   "transactions": [...]
}
```

Her [blok](/developers/docs/blocks/) kendinden önceki bloğa doğru bir referansa sahiptir; `parentHash` kısaca önceki bloğun hash değeridir.

<div class="featured">Not: Ethereum, <a href="https://wikipedia.org/wiki/Hash_function">hash fonksiyonlarını</a> sürekli sabit büyüklükteki değerler ("hash değerleri") oluşturmak için kullanır. Hash değerleri, Ethereum'da büyük bir rol oynar ama şimdilik onları benzersiz kimlikler olarak düşünebilirsiniz.</div>

![Her bloğun içindeki verileri içeren bir blok zincirini gösteren bir diyagram](./blockchain-diagram.png)

_Bir blok zinciri aslen bağlantılı bir dizidir; her bir blok önceki bloğa doğru bir referansa sahiptir._

Bu veri yapısı yeni bir şey değildir ama ağı yöneten kurallar (yani eşler arası protokoller) öyledir. Merkezi bir otorite yoktur; eşler ağı, ağı sürdürmek için iş birliği yapmalı ve bir sonraki bloğa hangi işlemlerin dahil edileceğine karar vermek için rekabet etmelidir. Bu nedenle, bir arkadaşınıza biraz para göndermek istediğinizde, bu işlemi ağa yayınlamanız ve ardından gelecek bir bloğa eklenmesini beklemeniz gerekir.

Blok zincirinin, paranın bir kullanıcıdan diğerine gerçekten gönderildiğini doğrulamasının tek yolu, o blok zincirine özgü (yani, blok zinciri tarafından oluşturulan ve yönetilen) bir para birimi kullanmaktır. Ethereum'da bu para birimine ether denir ve Ethereum blok zinciri, hesap bakiyelerinin tek resmi kaydını içerir.

## Yeni bir paradigma {#a-new-paradigm}

Bu merkeziyetsiz yeni teknoloji yığını, yeni geliştirici araçları ortaya çıkardı. Bu tür araçlar birçok programlama dilinde mevcuttur, ancak biz Python merceğinden bakacağız. Tekrarlamak gerekirse: Python tercih ettiğiniz dil olmasa bile, takip etmek çok zor olmayacaktır.

Ethereum ile etkileşim kurmak isteyen Python geliştiricilerinin [Web3.py](https://web3py.readthedocs.io/).'ye ulaşması muhtemeldir. Web3.py, bir Ethereum düğümüne bağlanma ve ondan veri gönderme ve alma şeklinizi büyük ölçüde basitleştiren bir kütüphanedir.

<div class="featured">Not: “Ethereum düğümü” ve “Ethereum istemcisi” birbirinin yerine kullanılan terimlerdir. Her iki durumda da, Ethereum ağındaki bir katılımcının çalıştırdığı yazılım ifade edilir. Bu yazılım blok verilerini okuyabilir, zincire yeni bloklar eklendiğinde ("kazıldığında") güncellemeler alabilir, yeni işlemler yayınlayabilir ve daha fazlasını yapabilir.</div>

[Ethereum istemcileri](/developers/docs/nodes-and-clients/); [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP veya Websockets tarafından erişilebilir olacak şekilde yapılandırılabilir, bu nedenle Web3.py'nin bu yapılandırmayı yansıtması gerekecek. Web3.py, bu bağlanma seçeneklerini **sağlayıcı** (provider) olarak ifade eder. Web3.py örneğini düğümünüze bağlamak için üç sağlayıcıdan birini seçmeniz gerekir.

![Web3.py'nin uygulamanızı bir Ethereum düğümüne bağlamak için IPC'yi nasıl kullandığını gösteren bir diyagram](./web3py-and-nodes.png)

_Ethereum düğümünü ve Web3.py'yi aynı protokol aracılığıyla iletişim kuracak şekilde yapılandırın, örneğin bu şemadaki IPC gibi._

Web3.py uygun şekilde yapılandırıldıktan sonra blok zinciri ile etkileşime başlayabilirsiniz. İşte karşılaşacaklarımızın bir ön izlemesi olarak birkaç Web3.py kullanım örneği:

```python
# read block data:
w3.eth.get_block('latest')

# send a transaction:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Kurulum {#installation}

Bu örnekte, sadece bir Python yorumlayıcısı içinde çalışacağız. Herhangi bir dizin, dosya, sınıf veya fonksiyon oluşturmayacağız.

<div class="featured">Not: Aşağıdaki örneklerde "$" ile başlayan komutların terminalde çalıştırılması amaçlanmıştır. ("$" işaretini yazmayınız, bu sadece satır başlangıcını belli etmek içindir.)</div>

İlk olarak, deney yapabileceğiniz kullanıcı dostu bir ortam yaratmak için [IPython](https://ipython.org/) indirin. IPython, diğer özelliklerin yanı sıra tab tuşu ile tamamlama özelliği sunarak Web3.py içinde nelerin mümkün olduğunu görmeyi çok daha kolaylaştırır.

```bash
$ pip install ipython
```

Web3.py, `web3` adı altında yayınlanmıştır. Şu şekilde kurun:

```bash
$ pip install web3
```

Bir şey daha: Daha sonra birkaç bağımlılık gerektiren bir blok zinciri simüle edeceğiz. Bunları şu şekilde yükleyebilirsiniz:

```bash
$ pip install 'web3[tester]'
```

Başlamaya hazırsınız!

## Bir sanal alan (sandbox) başlatın {#spin-up-a-sandbox}

Terminalinizde `ipython` çalıştırarak yeni bir Python ortamı açın. Bu, `python` çalıştırmakla benzerdir ancak daha fazla kullanışlı özelliği beraberinde getirir.

```bash
$ ipython
```

Bu, çalıştırmakta olduğunuz Python ve IPython sürümleri hakkında bazı bilgileri yazdıracaktır, ardından girdi bekleyen bir bilgi istemi görmelisiniz:

```python
In [1]:
```

Şu anda interaktif bir Python kabuğuna bakıyorsunuz. Aslında oyun oynamanız için bir sanal alandır. Buraya kadar geldiyseniz, Web3.py'yi içe aktarmanın zamanı geldi:

```python
In [1]: from web3 import Web3
```

## Web3 modülü ile tanışın {#introducing-the-web3-module}

[Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) modülü, Ethereum'a bir geçit olmanın yanı sıra birkaç kolaylık fonksiyonu sunar. Birkaçını keşfedelim.

Bir Ethereum uygulamasında, genellikle para birimini dönüştürmeniz gerekir. Web3 modülü bunun için bir çift yardımcı yöntem sağlar: [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.fromWei) ve [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toWei).

<div class="featured">
Not: Bilgisayarlar, ondalık matematiği işlemede çok kötüdür. Bunu aşmak için geliştiriciler genellikle dolar tutarlarını sent olarak saklar. Örneğin fiyatı $5,99 olan bir ürün veritabanında 599 olarak saklanabilir.

<b>Ether</b> bazındaki işlemler işlenirken benzer bir model kullanılır. Ancak, ether'da iki ondalık nokta yerine 18 ondalık nokta bulunur! Ether'ın en küçük birimine <b>wei</b> denir, bu nedenle işlem gönderirken belirtilen değer budur.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</div>

Bazı değerleri wei'ye ve wei'den dönüştürmeyi deneyin. Ether ve wei [arasındaki birçok birim için isimler olduğunu](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations) unutmayın. Bunlar arasında daha iyi bilinenlerden biri **gwei**'dir, çünkü genellikle işlem ücretleri bu şekilde temsil edilir.

```python
In [2]: Web3.toWei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.fromWei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 modülündeki diğer yardımcı program yöntemleri arasında veri formatı dönüştürücüleri (örneğin, [`toHex `](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), adres yardımcıları (örneğin, [` isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) ve hash fonksiyonları (örneğin, [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)) bulunur. Bunların çoğu serinin devamında ele alınacaktır. Kullanılabilir tüm yöntemleri ve özellikleri görüntülemek için `Web3`. yazıp noktadan sonra iki kez tab tuşuna basarak IPython'un otomatik tamamlama özelliğinden faydalanın.

## Zincirle konuşun {#talk-to-the-chain}

Kolaylık yöntemleri güzel ama şimdi blok zincirine geçelim. Sonraki adım, Web3.py'yi bir Ethereum düğümü ile iletişim kuracak şekilde yapılandırmaktır. Burada IPC, HTTP veya Websocket sağlayıcılarını kullanma seçeneğimiz bulunuyor.

Bu yolu kullanmayacağız ancak HTTP Sağlayıcısını kullanan eksiksiz bir iş akışı örneği şöyle görünebilir:

- Bir Ethereum düğümü indirin, örneğin [Geth](https://geth.ethereum.org/).
- Geth'i bir terminal penceresinde başlatın ve ağı senkronize etmesini bekleyin. Varsayılan HTTP portu `8545`'tir, ancak bu değiştirilebilir.
- Web3.py'ye `localhost:8545` üzerindeki HTTP aracılığıyla düğüme bağlanmasını söyleyin. `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Düğüm ile etkileşime geçmek için `w3` oluşumunu kullanın.

Bu, bunu yapmanın "gerçek" bir yolu olsa da, senkronizasyon işlemi saatler sürer ve yalnızca bir geliştirme ortamı istiyorsanız gereksizdir. Web3.py bu amaç için dördüncü bir sağlayıcı sunar: **EthereumTesterProvider**. Bu test sağlayıcısı, rahat izinlere ve oynamak için sahte para birimine sahip simüle edilmiş bir Ethereum düğümüne bağlanır.

![Web3.py uygulamanızı simüle edilmiş bir Ethereum düğümüne bağlayan EthereumTesterProvider'ı gösteren bir diyagram](./ethereumtesterprovider.png)

_EthereumTesterProvider, simüle edilmiş bir düğüme bağlanır ve hızlı geliştirme ortamları için kullanışlıdır._

Bu simüle edilmiş düğüme [eth-tester](https://github.com/ethereum/eth-tester) denir ve onu, `pip install web3[tester]` komutunun bir parçası olarak kurduk. Web3.py'yi bu test sağlayıcısını kullanacak şekilde yapılandırmak şu kadar basittir:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Artık zincirde sörf yapmaya hazırsınız! İnsanlar buna sörf yapmak demezler. Bunu az önce kafamdan uydurdum. Hadi hızlı bir tur atalım.

## Hızlı tur {#the-quick-tour}

İlk önce önemli bir şeyi aradan çıkaralım, bir akıl sağlığı kontrolü:

```python
In [5]: w3.isConnected()
Out[5]: True
```

Test sağlayıcısını kullandığımız için bu çok değerli bir test olmasa da başarısız olursa, `w3` değişkenini başlatırken yanlış bir şeyler yazmış olabilirsiniz. İç parantezleri dahil ettiğinizi iki kez kontrol edin, yani `Web3.EthereumTesterProvider()` şeklinde olsun.

## 1. tur durağı: [hesaplar](/developers/docs/accounts/) {#tour-stop-1-accounts}

Kolaylık sağlamak için, test sağlayıcısı bazı hesaplar oluşturdu ve bunları test ether'ı ile önceden yükledi.

İlk olarak, bu hesapların bir listesini görelim:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Bu komutu çalıştırırsanız, `0x` ile başlayan on dizelik bir liste görmelisiniz. Her biri bir **açık adrestir** ve bazı yönlerden çek hesabındaki hesap numarasına benzer. Bu adresi size ether göndermek isteyen birine verirsiniz.

Belirtildiği gibi, test sağlayıcısı bu hesapların her birine bir miktar test ether'ını önceden yüklemiştir. İlk hesapta ne kadar olduğunu öğrenelim:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Bir sürü sıfır var! Güle oynaya sahte bankaya doğru gitmeden önce para birimleriyle ilgili eski dersi hatırlayın. Ether değerleri, en küçük değer olan wei ile temsil edilir. Bunu ether'a çevirin:

```python
In [8]: w3.fromWei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Bir milyon test ether'ı, yine de az buz para değil.

## 2. tur durağı: blok verisi {#tour-stop-2-block-data}

Simüle edilmiş blok zincirinin durumuna bir göz atalım:

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

Bir blok hakkında birçok bilgi döndürülür, ancak burada dikkat edeceğimiz sadece birkaç şey var:

- Test cihazı sağlayıcısını ne kadar süre önce yapılandırmış olursanız olun, blok numarası sıfırdır . Yaklaşık her 15 saniyede bir yeni bir blok oluşturan gerçek Ethereum ağının aksine, bu simülasyon siz ona biraz iş verene kadar bekleyecektir.
- Henüz hiçbir şey yapmadığımız için `transactions` da aynı nedenden dolayı boş bir listedir. Bu ilk blok, sadece zinciri başlatmak için kullanılan bir **boş bloktur**.
- `parentHash`'in sadece birkaç tane boş bayt olduğuna dikkat edin. Bu, **başlangıç bloğu** (genesis block) olarak da bilinen, zincirdeki ilk blok olduğu anlamına gelir.

## 3. tur durağı: [işlemler](/developers/docs/transactions/) {#tour-stop-3-transactions}

Kazılacak bir işlem olana dek sıfırıncı blokta kalacağımız için ona bir işlem verelim. Bir hesaptan diğerine birkaç test ether'ı gönderin:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(3, 'ether'),
   'gas': 21000
})
```

Bu, genellikle işleminizin yeni bir bloğa kazılması için birkaç saniye bekleyeceğiniz noktadır. Tam süreç hemen hemen şöyle işler:

1. Bir işlem gönderin ve işlem hash değerini tutun. İşlem, kazılana kadar "beklemede" kalır. `tx_hash = w3.eth.send_transaction({ … })`
2. İşlemin kazılmasını bekleyin: `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Uygulama mantığına devam edin. Başarılı işlemi görüntülemek için: `w3.eth.get_transaction(tx_hash)`

Simüle edilmiş ortamımız, işlemi anında yeni bir bloğa ekleyecektir, böylece işlemi hemen görebiliriz:

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

Burada bazı tanıdık ayrıntılar göreceksiniz: `from`, `to`, ve ` value` alanları, `send_transaction` çağrımızın girdileriyle eşleşmelidir. Diğer güven verici kısım, bu işlemin 1 numaralı blok içindeki ilk işlem (`'transactionIndex': 0`) olarak dahil edilmiş olmasıdır.

Ayrıca, ilgili iki hesabın bakiyelerini kontrol ederek bu işlemin başarısını kolayca doğrulayabiliriz. Üç ether, birinden diğerine geçmiş olmalı.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999999999999969000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Sonraki iyi gözüküyor! Bakiye, 1.000.000'dan 1.000.003 ether'a döndü. Peki ilk hesaba ne oldu? Üç ether'dan biraz daha fazlasını kaybetmiş görünüyor. Ne yazık ki, hayatta hiçbir şey bedava değildir ve Ethereum genel ağını kullanmak, eşlerinizi destekleyici rolleri için telafi etmenizi gerektirir. İşlemi yapan hesaptan 31000 wei'ye kadar ufak bir işlem ücreti düşülmüştür.

<div class="featured">Not: Genel ağda işlem ücretleri, ağ talebine ve bir işlemin ne kadar hızlı işlenmesini istediğinize göre değişir. Ücretlerin nasıl hesaplandığına dair bir belge görmek istiyorasanız, işlemlerin bir bloğa <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">nasıl dahil edildiğine ilişkin önceki gönderime göz atabilirsiniz</a>.</div>

## Ve derin bir nefes alın {#and-breathe}

Bir süredir bu işle uğraştığımız için şu anda biraz mola vermek iyi gelebilir. Derine dalmaya devam ediyoruz ve bu serinin ikinci bölümünde keşfe devam edeceğiz. Gelecekteki bazı kavramlar: gerçek bir düğüme bağlanma, akıllı sözleşmeler ve token'lar. Bunlarla ilgili sorularınız mı var? Bana sorabilirsiniz! Geri bildiriminiz konunun ilerleyişini etkileyecek. [Twitter](https://twitter.com/wolovim) aracılığıyla isteklerinizi iletebilirsiniz.
