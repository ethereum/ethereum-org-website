---
title: "Yerel, çok istemcili bir test ağında bir dApp nasıl geliştirilir ve test edilir"
description: "Bu kılavuz, bir dApp'i dağıtmak ve test etmek için test ağını kullanmadan önce çok istemcili yerel bir Ethereum test ağının nasıl başlatılacağı ve yapılandırılacağı konusunda size yol gösterecektir."
author: "Tedi Mitiku"
tags:
  [
    "istemciler",
    "düğümler",
    "akıllı sözleşmeler",
    "birleştirilebilirlik",
    "mutabakat katmanı",
    "yürütme katmanı",
    "test etme",
  ]
skill: intermediate
breadcrumb: "Çok istemcili test ağı"
lang: tr
published: 2023-04-11
---

## Giriş {#introduction}

Bu kılavuz, yapılandırılabilir yerel bir Ethereum test ağını başlatma, ona bir akıllı sözleşme dağıtma ve merkeziyetsiz uygulamanıza (dapp) yönelik testler çalıştırmak için test ağını kullanma sürecinde size yol gösterir. Bu kılavuz, canlı bir test ağına veya Ana Ağ'a dağıtım yapmadan önce dapp'lerini farklı ağ yapılandırmalarına karşı yerel olarak geliştirmek ve test etmek isteyen dapp geliştiricileri için tasarlanmıştır.

Bu kılavuzda şunları yapacaksınız:

- [Kurtosis](https://www.kurtosis.com/) kullanarak [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) ile yerel bir Ethereum test ağı başlatmak,
- Bir dapp'i derlemek, dağıtmak ve test etmek için Hardhat dapp geliştirme ortamınızı yerel test ağına bağlamak ve
- Çeşitli ağ yapılandırmalarına karşı geliştirme ve test iş akışlarını etkinleştirmek için düğüm sayısı ve belirli yürütme katmanı (EL) / mutabakat katmanı (CL) istemci eşleşmeleri gibi parametreler dahil olmak üzere yerel test ağını yapılandırmak.

### Kurtosis nedir? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/), çoklu kapsayıcı test ortamlarını yapılandırmak için tasarlanmış birleştirilebilir bir derleme sistemidir. Özellikle geliştiricilerin, blokzincir test ağları gibi dinamik kurulum mantığı gerektiren tekrarlanabilir ortamlar oluşturmasına olanak tanır.

Bu kılavuzda, [ethPandaOps](https://ethpandaops.io/) tarafından sürdürülen Kurtosis `ethereum-package`, yerel bir Ethereum test ağı başlatır. [`geth`](https://geth.ethereum.org/) gibi tüm büyük yürütme katmanı (EL) istemcilerini ve [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) ve [`lodestar`](https://lodestar.chainsafe.io/) gibi mutabakat katmanı (CL) istemcilerini destekler. Bu paket, Hardhat Network ve Anvil gibi çerçevelerdeki ağlara yapılandırılabilir ve birleştirilebilir bir alternatif olarak hizmet eder. Kurtosis, geliştiricilere kullandıkları test ağları üzerinde daha fazla kontrol ve esneklik sunar; bu da Ethereum istemci ekiplerinin ağ yükseltmelerini test etmek için onu kullanmasının başlıca nedenidir.

## Kurtosis'i kurma {#setting-up-kurtosis}

Devam etmeden önce şunlara sahip olduğunuzdan emin olun:

- Yerel makinenizde [Docker motorunu kurmuş ve başlatmış olmak](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI'ı kurmuş olmak](https://docs.kurtosis.com/install#ii-install-the-cli) (veya CLI zaten kuruluysa en son sürüme yükseltmiş olmak)
- [Node.js](https://nodejs.org/en) kurmuş olmak (dapp ortamınız için)

## Yerel bir Ethereum test ağı başlatma {#instantiate-testnet}

Yerel bir Ethereum test ağı başlatmak için şunu çalıştırın:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Not: Bu komut, `--enclave` bayrağını kullanarak ağınızı "local-eth-testnet" olarak adlandırır.

Kurtosis, talimatları yorumlamak, doğrulamak ve ardından yürütmek için çalışırken arka planda attığı adımları yazdıracaktır. Sonunda, oluşturduğu yerleşim bölgesinin (enclave) bir özetini yazdırır. Özet, bir **dosya eserleri (files artifacts)** listesi ve bir **kullanıcı hizmetleri (user services)** listesi içerir. Varsayılan yapılandırmayla, kullanıcı hizmetleri tek bir düğüm içerir:

- `el-1-geth-lighthouse`, `geth` yürütme istemcisi
- `cl-1-lighthouse-geth`, `lighthouse` işaret düğümü
- `vc-1-geth-lighthouse`, `lighthouse` doğrulayıcı istemcisi

Her hizmet, açığa çıkardığı bağlantı noktaları ve her birinin eşlendiği yerel bağlantı noktasıyla birlikte listelenir. Örneğin, `el-1-geth-lighthouse` hizmetinin `rpc` bağlantı noktası, dapp araçlarınızın kullanacağı JSON-RPC uç noktasıdır. Kesin hizmetler ve bağlantı noktası numaraları makinenizde farklı olacaktır.

Bu özeti istediğiniz zaman şu komutu çalıştırarak tekrar görüntüleyebilirsiniz:

```sh
kurtosis enclave inspect local-eth-testnet
```

Tebrikler! Docker üzerinden bir CL (`lighthouse`) ve EL istemcisi (`geth`) ile yerel bir Ethereum test ağı başlatmak için Kurtosis'i kullandınız.

### İnceleme {#review-instantiate-testnet}

Bu bölümde, Kurtosis'i bir Kurtosis [Yerleşim Bölgesi (Enclave)](https://docs.kurtosis.com/advanced-concepts/enclaves/) içinde yerel bir Ethereum test ağı başlatmak üzere [GitHub'da uzaktan barındırılan `ethereum-package`](https://github.com/ethpandaops/ethereum-package) paketini kullanmaya yönlendiren bir komut yürüttünüz. Yerleşim bölgenizin içinde hem "dosya eserleri" hem de "kullanıcı hizmetleri" bulacaksınız.

Yerleşim bölgenizdeki [Dosya Eserleri](https://docs.kurtosis.com/advanced-concepts/files-artifacts/), başlangıç (genesis) dosyaları ve doğrulayıcı anahtarları gibi EL ve CL istemcilerini başlatmak için oluşturulan ve kullanılan tüm verileri içerir. Başlangıç verileri [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator) kullanılarak oluşturulmuştur.

Kullanıcı hizmetleri, yerleşim bölgenizde çalışan tüm kapsayıcıya alınmış hizmetleri görüntüler. Hem bir EL istemcisi hem de bir CL istemcisi içeren tek bir düğümün oluşturulduğunu fark edeceksiniz.

## Dapp geliştirme ortamınızı yerel Ethereum test ağına bağlayın {#connect-your-dapp}

### Dapp geliştirme ortamını kurun {#set-up-dapp-env}

Artık çalışan bir yerel test ağınız olduğuna göre, yerel test ağınızı kullanmak için dapp geliştirme ortamınızı bağlayabilirsiniz. Bu kılavuzda, yerel test ağınıza bir blackjack dapp'i dağıtmak için Hardhat çerçevesi kullanılacaktır.

Dapp geliştirme ortamınızı kurmak için örnek dapp'imizi içeren depoyu klonlayın ve bağımlılıklarını yükleyin, şunu çalıştırın:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Örnek projenin bazı Hardhat eklentileri çakışan eş bağımlılık sürümleri bildirdiği için `--legacy-peer-deps` bayrağı gereklidir.

Burada kullanılan [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) klasörü, [Hardhat](https://hardhat.org/) çerçevesini kullanan bir dapp geliştiricisi için tipik kurulumu içerir:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts), bir Blackjack dapp'i için birkaç basit akıllı sözleşme içerir
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts), yerel Ethereum ağınıza bir token sözleşmesi dağıtmak için bir komut dosyası içerir
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test), Blackjack dapp'imizdeki her oyuncu için 1000 adet basıldığını doğrulamak üzere token sözleşmeniz için basit bir .js testi içerir
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts), Hardhat kurulumunuzu yapılandırır

### Hardhat'i yerel test ağını kullanacak şekilde yapılandırın {#configure-hardhat}

Dapp geliştirme ortamınız kurulduğuna göre, şimdi Hardhat'i Kurtosis kullanılarak oluşturulan yerel Ethereum test ağını kullanacak şekilde bağlayacaksınız. İlk olarak, yürütme istemcisinin JSON-RPC uç noktasının yerel adresini bulun:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

Çıktı, `http://127.0.0.1:32769` gibi bir URL'dir. Sizin bağlantı noktanız farklı olacaktır. `hardhat.config.ts` yapılandırma dosyanızdaki `localnet` yapısında bulunan `<PORT>` değerini bu bağlantı noktasıyla değiştirin.

`hardhat.config.ts` içindeki örnek:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: <PORT> DEĞERİNİ ETH AĞI KURTOSIS PAKETİ TARAFINDAN ÜRETİLEN BİR DÜĞÜM URI'SİNİN PORTU İLE DEĞİŞTİRİN
  // Bunlar, eth-network-package tarafından oluşturulan önceden fonlanmış test hesaplarıyla ilişkili özel anahtarlardır
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Bu özel anahtarlar herkesçe bilinen test anahtarlarıdır. Bunları asla Ana Ağ'da veya herhangi bir halka açık ağda kullanmayın.

Dosyanızı kaydettiğinizde, Hardhat dapp geliştirme ortamınız artık yerel Ethereum test ağınıza bağlanmış olur! Test ağınızın çalıştığını şunu çalıştırarak doğrulayabilirsiniz:

```sh
npx hardhat balances --network localnet
```

Çıktı, yukarıdaki hesapların her birinin adresini ve bakiyesini listeler. Örneğin, ilk satır şuna benzemelidir:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Bu, Hardhat'in yerel test ağınızı kullandığını doğrular ve `ethereum-package` tarafından oluşturulan önceden fonlanmış hesapları algılar.

### Dapp'inizi yerel olarak dağıtın ve test edin {#deploy-and-test-dapp}

Dapp geliştirme ortamı yerel Ethereum test ağına tamamen bağlandığına göre, artık yerel test ağını kullanarak dapp'inize karşı geliştirme ve test iş akışlarını çalıştırabilirsiniz.

Yerel prototipleme ve geliştirme için `ChipToken.sol` akıllı sözleşmesini derlemek ve dağıtmak üzere şunu çalıştırın:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Çıktı şuna benzer olmalıdır:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Şimdi, Blackjack dapp'imizdeki her oyuncu için 1000 adet basıldığını doğrulamak üzere yerel dapp'inize karşı `ChipToken.js` testini çalıştırmayı deneyin. Örnek test hala ethers v5 `deployed()` işlevini kullanıyor, ethers v6 bunu `waitForDeployment()` ile değiştirdi, bu yüzden önce onu güncelleyin:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Ardından testi çalıştırın:

```sh
npx hardhat test --network localnet
```

Çıktı şuna benzer olmalıdır:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### İnceleme {#review-dapp-workflows}

Bu noktada, artık bir dapp geliştirme ortamı kurdunuz, onu Kurtosis tarafından oluşturulan yerel bir Ethereum ağına bağladınız ve dapp'inize karşı basit bir test derlediniz, dağıttınız ve çalıştırdınız.

Şimdi, dapp'lerimizi değişen ağ yapılandırmaları altında test etmek için temel ağı nasıl yapılandırabileceğinizi keşfedelim.

## Yerel Ethereum test ağını yapılandırma {#configure-testnet}

### İstemci yapılandırmalarını ve düğüm sayısını değiştirme {#configure-client-config-and-num-nodes}

Yerel Ethereum test ağınız, geliştirmek veya test etmek istediğiniz senaryoya ve belirli ağ yapılandırmasına bağlı olarak farklı EL ve CL istemci çiftlerinin yanı sıra değişen sayıda düğüm kullanacak şekilde yapılandırılabilir. Bu, bir kez kurulduktan sonra, özelleştirilmiş bir yerel test ağı başlatabileceğiniz ve her şeyin beklendiği gibi çalıştığından emin olmak için çeşitli ağ yapılandırmaları altında aynı iş akışlarını (dağıtım, testler vb.) çalıştırmak için kullanabileceğiniz anlamına gelir. Değiştirebileceğiniz diğer parametreler hakkında daha fazla bilgi edinmek için [`ethereum-package` yapılandırma belgelerine](https://github.com/ethpandaops/ethereum-package#configuration) bakın.

Bir deneyin! Bir YAML dosyası aracılığıyla `ethereum-package` paketine çeşitli yapılandırma seçenekleri aktarabilirsiniz. Bu ağ parametreleri dosyası, Kurtosis'in yerel Ethereum ağını kurmak için kullanacağı belirli yapılandırmaları sağlar.

Farklı EL/CL çiftlerine sahip üç düğüm başlatan `network_params.yaml` adında bir dosya oluşturun:

- `geth`/`lighthouse` ile Düğüm 1
- `geth`/`lodestar` ile Düğüm 2
- `geth`/`teku` ile Düğüm 3

Bu yapılandırma, dapp'inizi test etmek için Ethereum düğüm uygulamalarından oluşan heterojen bir ağ oluşturur. Yapılandırma dosyanız şuna benzemelidir:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

`participants` içindeki her giriş ağdaki bir düğümle eşleşir, bu nedenle 3 `participants` girişi Kurtosis'e ağınızda 3 düğüm başlatmasını söyleyecektir. Her giriş, o belirli düğüm için kullanılan EL ve CL çiftini belirtmenize olanak tanır. Belirtmediğiniz parametreler varsayılan değerlerini korur.

`network_params` yapısı, her düğüm için başlangıç dosyalarını oluşturmak üzere kullanılan ağ ayarlarının yanı sıra ağın slot başına saniyesi gibi diğer ayarları yapılandırır.

Parametre dosyanızı kaydedin ve ardından şunu çalıştırarak Kurtosis paketinizi çalıştırmak için kullanın:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Not: `kurtosis clean -a` komutu burada Kurtosis'e yeni bir tane başlatmadan önce eski test ağını ve içeriğini yok etmesi talimatını vermek için kullanılır.

Yine, Kurtosis bir süre çalışacak ve gerçekleşen bireysel adımları yazdıracaktır. Sonunda, yerleşim bölgesi özetini yazdırır. Bu kez, kullanıcı hizmetleri, eşleşen mutabakat ve doğrulayıcı istemcileriyle birlikte yürütme istemcileri için örneğin `el-1-geth-lighthouse`, `el-2-geth-lodestar` ve `el-3-geth-teku` olmak üzere üç düğüm içerir.

Tebrikler! Yerel test ağınızı 1 yerine 3 düğüme sahip olacak şekilde başarıyla yapılandırdınız. Dapp'inize karşı daha önce yaptığınız aynı iş akışlarını (dağıtma ve test etme) çalıştırmak için, `hardhat.config.ts` yapılandırma dosyanızdaki `localnet` yapısında bulunan `<PORT>` değerini yeni, 3 düğümlü yerel test ağınızdaki herhangi bir `el-<num>-...` hizmetinin `rpc` bağlantı noktasıyla değiştirerek daha önce yaptığımız aynı işlemleri gerçekleştirin.

## Sonuç {#conclusion}

İşte bu kadar! Bu kısa kılavuzu özetlemek gerekirse, şunları yaptınız:

- Kurtosis kullanarak Docker üzerinden yerel bir Ethereum test ağı oluşturdunuz
- Yerel dapp geliştirme ortamınızı yerel Ethereum ağına bağladınız
- Yerel Ethereum ağında bir dapp dağıttınız ve ona karşı basit bir test çalıştırdınız
- Temel Ethereum ağını 3 düğüme sahip olacak şekilde yapılandırdınız

Sizin için nelerin iyi gittiğini, nelerin iyileştirilebileceğini duymak veya sorularınızı yanıtlamak isteriz. [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) üzerinden ulaşmaktan çekinmeyin!

### Diğer örnekler ve kılavuzlar {#other-examples-guides}

[Hızlı başlangıç](https://docs.kurtosis.com/quickstart) kılavuzumuza ve [awesome-kurtosis depomuzdaki](https://github.com/kurtosis-tech/awesome-kurtosis) diğer örneklerimize göz atmanızı öneririz.

`ethereum-package`, ağınızın yanında bir işlem spamlayıcı (işlemleri simüle etmek için), bir blok gezgini ve bağlı Grafana ve Prometheus örnekleri gibi ek hizmetler de başlatabilir. Bunları etkinleştirmek için, [paket belgelerinde](https://github.com/ethpandaops/ethereum-package#configuration) açıklandığı gibi parametre dosyanızda `additional_services` altında listeleyin.
