---
title: Yerel, çok istemcili bir test ağında bir dapp nasıl geliştirilir ve test edilir
description: Bu rehber, bir dapp'i dağıtmak ve test etmek için test ağını kullanmadan önce çok istemcili yerel bir Ethereum test ağının nasıl başlatılacağı ve yapılandırılacağı konusunda size yol gösterecektir.
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
breadcrumb: Çok istemcili test ağı
lang: tr
published: 2023-04-11
---

## Giriş {#introduction}

Bu rehber, yapılandırılabilir yerel bir Ethereum test ağını başlatma, ona bir akıllı sözleşme dağıtma ve merkeziyetsiz uygulamanıza (dapp) karşı testler çalıştırmak için test ağını kullanma sürecinde size yol gösterir. Bu rehber, dapp'lerini canlı bir test ağına veya Ana Ağ'a dağıtmadan önce farklı ağ yapılandırmalarına karşı yerel olarak geliştirmek ve test etmek isteyen dapp geliştiricileri için tasarlanmıştır.

Bu rehberde şunları yapacaksınız:

- [Kurtosis](https://www.kurtosis.com/) kullanarak [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ile yerel bir Ethereum test ağı başlatmak,
- Bir dapp'i derlemek, dağıtmak ve test etmek için Hardhat dapp geliştirme ortamınızı yerel test ağına bağlamak ve
- Çeşitli ağ yapılandırmalarına karşı geliştirme ve test iş akışlarını etkinleştirmek için düğüm sayısı ve belirli EL/CL istemci eşleşmeleri gibi parametreler dahil olmak üzere yerel test ağını yapılandırmak.

### Kurtosis nedir? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/), çok kapsayıcılı test ortamlarını yapılandırmak için tasarlanmış birleştirilebilir bir derleme sistemidir. Özellikle geliştiricilerin, blokzincir test ağları gibi dinamik kurulum mantığı gerektiren tekrarlanabilir ortamlar oluşturmasına olanak tanır.

Bu rehberde, Kurtosis eth-network-package, [`geth`](https://geth.ethereum.org/) yürütme katmanı (EL) istemcisinin yanı sıra [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) ve [`lodestar`](https://lodestar.chainsafe.io/) mutabakat katmanı (CL) istemcilerini destekleyen yerel bir Ethereum test ağı başlatır. Bu paket, Hardhat Network, Ganache ve Anvil gibi çerçevelerdeki ağlara yapılandırılabilir ve birleştirilebilir bir alternatif olarak hizmet eder. Kurtosis, geliştiricilere kullandıkları test ağları üzerinde daha fazla kontrol ve esneklik sunar; bu da [Ethereum Vakfı'nın Birleşme'yi test etmek için Kurtosis'i kullanmasının](https://www.kurtosis.com/blog/testing-the-ethereum-merge) ve ağ yükseltmelerini test etmek için kullanmaya devam etmesinin önemli bir nedenidir.

## Kurtosis'i kurma {#setting-up-kurtosis}

Devam etmeden önce şunlara sahip olduğunuzdan emin olun:

- Yerel makinenizde [Docker motorunu kurmuş ve başlatmış olmak](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI'yi kurmuş olmak](https://docs.kurtosis.com/install#ii-install-the-cli) (veya zaten CLI kuruluysa en son sürüme yükseltmiş olmak)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) ve [npx](https://www.npmjs.com/package/npx) kurmuş olmak (dapp ortamınız için)

## Yerel bir Ethereum test ağı başlatma {#instantiate-testnet}

Yerel bir Ethereum test ağı başlatmak için şunu çalıştırın:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Not: Bu komut, `--enclave` bayrağını kullanarak ağınızı "local-eth-testnet” olarak adlandırır.

Kurtosis, talimatları yorumlamak, doğrulamak ve ardından yürütmek için çalışırken arka planda attığı adımları yazdıracaktır. Sonunda, aşağıdakine benzer bir çıktı görmelisiniz:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

Tebrikler! Docker üzerinden bir CL (`lighthouse`) ve EL istemcisi (`geth`) ile yerel bir Ethereum test ağı başlatmak için Kurtosis'i kullandınız.

### İnceleme {#review-instantiate-testnet}

Bu bölümde, Kurtosis'i bir Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/)'i içinde yerel bir Ethereum test ağı başlatmak üzere [GitHub'da uzaktan barındırılan `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) paketini kullanmaya yönlendiren bir komut çalıştırdınız. Enclave'inizin içinde hem "dosya yapıları" (file artifacts) hem de "kullanıcı hizmetleri" (user services) bulacaksınız.

Enclave'inizdeki [Dosya Yapıları](https://docs.kurtosis.com/advanced-concepts/files-artifacts/), EL ve CL istemcilerini başlatmak için oluşturulan ve kullanılan tüm verileri içerir. Veriler, bu [Docker imajından](https://github.com/ethpandaops/ethereum-genesis-generator) oluşturulan `prelaunch-data-generator` hizmeti kullanılarak oluşturulmuştur.

Kullanıcı hizmetleri, enclave'inizde çalışan tüm kapsayıcılı hizmetleri görüntüler. Hem bir EL istemcisi hem de bir CL istemcisi içeren tek bir düğümün oluşturulduğunu fark edeceksiniz.

## Dapp geliştirme ortamınızı yerel Ethereum test ağına bağlayın {#connect-your-dapp}

### Dapp geliştirme ortamını kurun {#set-up-dapp-env}

Artık çalışan bir yerel test ağınız olduğuna göre, dapp geliştirme ortamınızı yerel test ağınızı kullanacak şekilde bağlayabilirsiniz. Bu rehberde, yerel test ağınıza bir blackjack dapp'i dağıtmak için Hardhat çerçevesi kullanılacaktır.

Dapp geliştirme ortamınızı kurmak için örnek dapp'imizi içeren depoyu klonlayın ve bağımlılıklarını yükleyin, şunu çalıştırın:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Burada kullanılan [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) klasörü, [Hardhat](https://hardhat.org/) çerçevesini kullanan bir dapp geliştiricisi için tipik kurulumu içerir:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts), bir Blackjack dapp'i için birkaç basit akıllı sözleşme içerir
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts), yerel Ethereum ağınıza bir token sözleşmesi dağıtmak için bir betik içerir
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test), Blackjack dapp'imizdeki her oyuncu için 1000 token basıldığını doğrulamak üzere token sözleşmeniz için basit bir .js testi içerir
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts), Hardhat kurulumunuzu yapılandırır

### Hardhat'i yerel test ağını kullanacak şekilde yapılandırın {#configure-hardhat}

Dapp geliştirme ortamınız kurulduğuna göre, şimdi Hardhat'i Kurtosis kullanılarak oluşturulan yerel Ethereum test ağını kullanacak şekilde bağlayacaksınız. Bunu başarmak için, `hardhat.config.ts` yapılandırma dosyanızdaki `localnet` yapısında bulunan `<$YOUR_PORT>` değerini, herhangi bir `el-client-<num>` hizmetinden alınan rpc uri çıktısının bağlantı noktasıyla (port) değiştirin. Bu örnek durumda, bağlantı noktası `64248` olacaktır. Sizin bağlantı noktanız farklı olacaktır.

`hardhat.config.ts` içindeki örnek:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT İFADESİNİ ETH AĞI KURTOSIS PAKETİ TARAFINDAN ÜRETİLEN BİR DÜĞÜM URI'SİNİN PORTU İLE DEĞİŞTİRİN

// Bunlar, eth-network-package tarafından oluşturulan önceden fonlanmış test hesaplarıyla ilişkili özel anahtarlardır
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Dosyanızı kaydettiğinizde, Hardhat dapp geliştirme ortamınız artık yerel Ethereum test ağınıza bağlanmış olur! Test ağınızın çalıştığını şunu çalıştırarak doğrulayabilirsiniz:

```python
npx hardhat balances --network localnet
```

Çıktı şuna benzer görünmelidir:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Bu, Hardhat'in yerel test ağınızı kullandığını doğrular ve `eth-network-package` tarafından oluşturulan önceden fonlanmış hesapları algılar.

### Dapp'inizi yerel olarak dağıtın ve test edin {#deploy-and-test-dapp}

Dapp geliştirme ortamı yerel Ethereum test ağına tamamen bağlandığında, artık yerel test ağını kullanarak dapp'inize karşı geliştirme ve test iş akışlarını çalıştırabilirsiniz.

Yerel prototipleme ve geliştirme için `ChipToken.sol` akıllı sözleşmesini derlemek ve dağıtmak üzere şunu çalıştırın:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Çıktı şuna benzer görünmelidir:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Şimdi, Blackjack dapp'imizdeki her oyuncu için 1000 token basıldığını doğrulamak üzere yerel dapp'inize karşı `simple.js` testini çalıştırmayı deneyin:

Çıktı şuna benzer görünmelidir:

```python
npx hardhat test --network localnet
```

Çıktı şuna benzer görünmelidir:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### İnceleme {#review-dapp-workflows}

Bu noktada, artık bir dapp geliştirme ortamı kurdunuz, onu Kurtosis tarafından oluşturulan yerel bir Ethereum ağına bağladınız ve dapp'inize karşı basit bir test derlediniz, dağıttınız ve çalıştırdınız.

Şimdi, dapp'lerimizi farklı ağ yapılandırmaları altında test etmek için temel ağı nasıl yapılandırabileceğinizi keşfedelim.

## Yerel Ethereum test ağını yapılandırma {#configure-testnet}

### İstemci yapılandırmalarını ve düğüm sayısını değiştirme {#configure-client-config-and-num-nodes}

Yerel Ethereum test ağınız, geliştirmek veya test etmek istediğiniz senaryoya ve belirli ağ yapılandırmasına bağlı olarak farklı EL ve CL istemci çiftlerinin yanı sıra değişen sayıda düğüm kullanacak şekilde yapılandırılabilir. Bu, bir kez kurulduktan sonra, özelleştirilmiş bir yerel test ağı başlatabileceğiniz ve her şeyin beklendiği gibi çalıştığından emin olmak için çeşitli ağ yapılandırmaları altında aynı iş akışlarını (dağıtım, testler vb.) çalıştırmak için kullanabileceğiniz anlamına gelir. Değiştirebileceğiniz diğer parametreler hakkında daha fazla bilgi edinmek için bu bağlantıyı ziyaret edin.

Bir deneyin! Bir JSON dosyası aracılığıyla `eth-network-package` paketine çeşitli yapılandırma seçenekleri aktarabilirsiniz. Bu ağ parametreleri JSON dosyası, Kurtosis'in yerel Ethereum ağını kurmak için kullanacağı belirli yapılandırmaları sağlar.

Varsayılan yapılandırma dosyasını alın ve farklı EL/CL çiftlerine sahip iki düğüm başlatmak için düzenleyin:

- `geth`/`lighthouse` ile Düğüm 1
- `geth`/`lodestar` ile Düğüm 2
- `geth`/`teku` ile Düğüm 3

Bu yapılandırma, dapp'inizi test etmek için Ethereum düğüm uygulamalarından oluşan heterojen bir ağ oluşturur. Yapılandırma dosyanız artık şuna benzemelidir:

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Her `participants` yapısı ağdaki bir düğümle eşleşir, bu nedenle 3 `participants` yapısı Kurtosis'e ağınızda 3 düğüm başlatmasını söyleyecektir. Her `participants` yapısı, o belirli düğüm için kullanılan EL ve CL çiftini belirlemenize olanak tanır.

`network_params` yapısı, her düğüm için genesis dosyalarını oluşturmak üzere kullanılan ağ ayarlarının yanı sıra ağın slot başına saniye sayısı gibi diğer ayarları yapılandırır.

Düzenlediğiniz parametreler dosyasını dilediğiniz bir dizine kaydedin (aşağıdaki örnekte masaüstüne kaydedilmiştir) ve ardından şunu çalıştırarak Kurtosis paketinizi çalıştırmak için kullanın:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Not: `kurtosis clean -a` komutu burada Kurtosis'e yeni bir tane başlatmadan önce eski test ağını ve içeriğini yok etmesi talimatını vermek için kullanılır.

Yine, Kurtosis bir süre çalışacak ve gerçekleşen bireysel adımları yazdıracaktır. Sonunda, çıktı şuna benzer görünmelidir:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

Tebrikler! Yerel test ağınızı 1 yerine 3 düğüme sahip olacak şekilde başarıyla yapılandırdınız. Dapp'inize karşı daha önce yaptığınız aynı iş akışlarını (dağıtma ve test etme) çalıştırmak için, `hardhat.config.ts` yapılandırma dosyanızdaki `localnet` yapısında bulunan `<$YOUR_PORT>` değerini, yeni 3 düğümlü yerel test ağınızdaki herhangi bir `el-client-<num>` hizmetinden alınan rpc uri çıktısının bağlantı noktasıyla değiştirerek daha önce yaptığımız aynı işlemleri gerçekleştirin.

## Sonuç {#conclusion}

İşte bu kadar! Bu kısa rehberi özetlemek gerekirse, şunları yaptınız:

- Kurtosis kullanarak Docker üzerinden yerel bir Ethereum test ağı oluşturdunuz
- Yerel dapp geliştirme ortamınızı yerel Ethereum ağına bağladınız
- Yerel Ethereum ağında bir dapp dağıttınız ve ona karşı basit bir test çalıştırdınız
- Temel Ethereum ağını 3 düğüme sahip olacak şekilde yapılandırdınız

Sizin için nelerin iyi gittiğini, nelerin iyileştirilebileceğini duymak veya sorularınızı yanıtlamak isteriz. [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) üzerinden ulaşmaktan veya [bize e-posta göndermekten](mailto:feedback@kurtosistech.com) çekinmeyin!

### Diğer örnekler ve rehberler {#other-examples-guides}

Sizi [hızlı başlangıç](https://docs.kurtosis.com/quickstart) rehberimize (üzerine bir Postgres veritabanı ve API inşa edeceğiniz) ve aşağıdakiler için paketler de dahil olmak üzere bazı harika örnekler bulabileceğiniz [awesome-kurtosis depomuzdaki](https://github.com/kurtosis-tech/awesome-kurtosis) diğer örneklerimize göz atmaya teşvik ediyoruz:

- [Aynı yerel Ethereum test ağını başlatmak](https://github.com/kurtosis-tech/eth2-package), ancak bir işlem spamlayıcı (işlemleri simüle etmek için), bir çatallanma monitörü ve bağlı bir Grafana ile Prometheus örneği gibi ek hizmetler bağlı olarak
- Aynı yerel Ethereum ağına karşı bir [alt ağ testi](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) gerçekleştirmek