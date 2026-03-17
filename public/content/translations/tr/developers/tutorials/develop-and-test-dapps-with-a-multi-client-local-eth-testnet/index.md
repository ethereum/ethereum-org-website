---
title: "Yerel, çok istemcili bir test ağında bir merkeziyetsiz uygulama nasıl geliştirilir ve test edilir"
description: "Bu kılavuz, test ağını bir merkeziyetsiz uygulamayı dağıtmak ve test etmek için kullanmadan önce, size çok istemcili bir yerel Ethereum test ağını nasıl somutlaştıracağınız ve yapılandıracağınız konusunda yol gösterecektir."
author: "Tedi Mitiku"
tags:
  [
    "istemciler",
    "düğümler",
    "akıllı kontratlar",
    "birleştirilebilirlik",
    "mutabakat katmanı",
    "yürütme katmanı",
    "test etmek"
  ]
skill: intermediate
lang: tr
published: 2023-04-11
---

## Giriş {#introduction}

Bu kılavuz, yapılandırılabilir bir yerel Ethereum test ağını somutlaştırma, ona bir akıllı sözleşme dağıtma ve merkeziyetsiz uygulamanıza karşı testler yürütmek için test ağını kullanma sürecinde size yol gösterir. Bu kılavuz, canlı bir test ağına veya ana ağa dağıtım yapmadan önce merkeziyetsiz uygulamalarını farklı ağ yapılandırmalarına karşı yerel olarak geliştirmek ve test etmek isteyen merkeziyetsiz uygulama geliştiricileri için tasarlanmıştır.

Bu kılavuzda şunları yapacaksınız:

- [Kurtosis](https://www.kurtosis.com/) kullanarak [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) ile yerel bir Ethereum test ağı oluşturun,
- Bir merkeziyetsiz uygulamayı derlemek, dağıtmak ve test etmek için Hardhat merkeziyetsiz uygulama geliştirme ortamınızı yerel test ağına bağlayın ve
- Çeşitli ağ yapılandırmalarına karşı geliştirme ve test iş akışlarını etkinleştirmek için düğüm sayısı ve belirli YK/MK istemci eşleşmeleri gibi parametreler de dahil olmak üzere yerel test ağını yapılandırın.

### Kurtosis nedir? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/), çok kapsayıcılı test ortamlarını yapılandırmak için tasarlanmış birleştirilebilir bir yapı sistemidir. Geliştiricilerin, blokzincir test ağları gibi dinamik kurulum mantığı gerektiren yeniden üretilebilir ortamlar oluşturmasını özellikle sağlar.

Bu kılavuzda, Kurtosis eth-network-package, [`geth`](https://geth.ethereum.org/) Yürütme Katmanı (YK) istemcisinin yanı sıra [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) ve [`lodestar`](https://lodestar.chainsafe.io/) Mutabakat Katmanı (MK) istemcileri desteğiyle yerel bir Ethereum test ağı oluşturur. Bu paket, Hardhat Network, Ganache ve Anvil gibi çerçevelerdeki ağlara yapılandırılabilir ve birleştirilebilir bir alternatif olarak hizmet eder. Kurtosis, geliştiricilere kullandıkları test ağları üzerinde daha fazla kontrol ve esneklik sunar; bu da [Ethereum Vakfı'nın Birleşim'i test etmek için Kurtosis'i kullanmasının](https://www.kurtosis.com/blog/testing-the-ethereum-merge) ve ağ yükseltmelerini test etmek için kullanmaya devam etmesinin önemli bir nedenidir.

## Kurtosis'i kurma {#setting-up-kurtosis}

Devam etmeden önce, şunlara sahip olduğunuzdan emin olun:

- Yerel makinenizde [Docker motorunu kurun ve başlatın](https://docs.kurtosis.com/install/#i-install--start-docker)
- [Kurtosis CLI'yi yükleyin](https://docs.kurtosis.com/install#ii-install-the-cli) (veya CLI zaten yüklüyse en son sürüme yükseltin)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) ve [npx](https://www.npmjs.com/package/npx) (merkeziyetsiz uygulama ortamınız için) yükleyin

## Yerel bir Ethereum test ağı oluşturma {#instantiate-testnet}

Yerel bir Ethereum test ağı başlatmak için şunu çalıştırın:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Not: Bu komut, `--enclave` bayrağını kullanarak ağınızı "local-eth-testnet" olarak adlandırır.

Kurtosis, talimatları yorumlamak, doğrulamak ve ardından yürütmek için çalışırken perde arkasında attığı adımları yazdıracaktır. Sonunda, aşağıdakine benzer bir çıktı görmelisiniz:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Enclave oluşturuldu: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Dosya Yapıtları =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== Kullanıcı Hizmetleri ==========================================
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

Tebrikler! Docker üzerinde bir MK (`lighthouse`) ve YK istemcisi (`geth`) ile yerel bir Ethereum test ağı oluşturmak için Kurtosis'i kullandınız.

### Gözden Geçirme {#review-instantiate-testnet}

Bu bölümde, bir Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) içinde yerel bir Ethereum test ağı başlatmak için Kurtosis'i GitHub'da uzaktan barındırılan [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) kullanmaya yönlendiren bir komut yürüttünüz. Enclave'inizin içinde hem "dosya yapıtları" hem de "kullanıcı hizmetleri" bulacaksınız.

Enclave'inizdeki [Dosya Yapıtları](https://docs.kurtosis.com/advanced-concepts/files-artifacts/), YK ve MK istemcilerini önyüklemek için oluşturulan ve kullanılan tüm verileri içerir. Veriler, bu [Docker görüntüsünden](https://github.com/ethpandaops/ethereum-genesis-generator) oluşturulan `prelaunch-data-generator` hizmeti kullanılarak oluşturuldu.

Kullanıcı hizmetleri, enclave'inizde çalışan tüm kapsayıcılı hizmetleri görüntüler. Hem bir YK istemcisi hem de bir MK istemcisi içeren tek bir düğümün oluşturulduğunu fark edeceksiniz.

## Merkeziyetsiz uygulama geliştirme ortamınızı yerel Ethereum test ağına bağlama {#connect-your-dapp}

### Merkeziyetsiz uygulama geliştirme ortamını kurma {#set-up-dapp-env}

Artık çalışan bir yerel test ağınız olduğuna göre, yerel test ağınızı kullanmak için merkeziyetsiz uygulama geliştirme ortamınızı bağlayabilirsiniz. Bu kılavuzda, yerel test ağınıza bir blackjack merkeziyetsiz uygulaması dağıtmak için Hardhat çerçevesi kullanılacaktır.

Merkeziyetsiz uygulama geliştirme ortamınızı kurmak için, örnek merkeziyetsiz uygulamamızı içeren depoyu klonlayın ve bağımlılıklarını yükleyin, şunu çalıştırın:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Burada kullanılan [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) klasörü, [Hardhat](https://hardhat.org/) çerçevesini kullanan bir merkeziyetsiz uygulama geliştiricisi için tipik kurulumu içerir:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) bir Blackjack merkeziyetsiz uygulaması için birkaç basit akıllı sözleşme içerir
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) yerel Ethereum ağınıza bir jeton sözleşmesi dağıtmak için bir betik içerir
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) Blackjack merkeziyetsiz uygulamamızdaki her oyuncu için 1000 jetonun basıldığını doğrulamak amacıyla jeton sözleşmeniz için basit bir .js testi içerir
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) Hardhat kurulumunuzu yapılandırır

### Hardhat'i yerel test ağını kullanacak şekilde yapılandırma {#configure-hardhat}

Merkeziyetsiz uygulama geliştirme ortamınız kurulduktan sonra, Kurtosis kullanılarak oluşturulan yerel Ethereum test ağını kullanmak için Hardhat'i bağlayacaksınız. Bunu başarmak için, `hardhat.config.ts` yapılandırma dosyanızdaki `localnet` yapısındaki `<$YOUR_PORT>` öğesini herhangi bir `el-client-<num>` hizmetinden gelen rpc uri çıktısının bağlantı noktasıyla değiştirin. Bu örnek durumda, bağlantı noktası `64248` olacaktır. Sizin bağlantı noktanız farklı olacaktır.

`hardhat.config.ts` içinde örnek:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: $YOUR_PORT'U ETH AĞI KURTOSIS PAKETİNİN ÜRETTİĞİ BİR DÜĞÜM URI'SİNİN BAĞLANTI NOKTASIYLA DEĞİŞTİRİN

// Bunlar, eth-network-package tarafından oluşturulan önceden finanse edilmiş test hesaplarıyla ilişkili özel anahtarlardır
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

Dosyanızı kaydettiğinizde, Hardhat merkeziyetsiz uygulama geliştirme ortamınız artık yerel Ethereum test ağınıza bağlanmış olur! Test ağınızın çalıştığını şu komutu çalıştırarak doğrulayabilirsiniz:

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

Bu, Hardhat'in yerel test ağınızı kullandığını ve `eth-network-package` tarafından oluşturulan önceden finanse edilmiş hesapları algıladığını doğrular.

### Merkeziyetsiz uygulamanızı yerel olarak dağıtın ve test edin {#deploy-and-test-dapp}

Merkeziyetsiz uygulama geliştirme ortamı yerel Ethereum test ağına tamamen bağlandığında, artık yerel test ağını kullanarak merkeziyetsiz uygulamanıza karşı geliştirme ve test iş akışlarını çalıştırabilirsiniz.

Yerel prototipleme ve geliştirme için `ChipToken.sol` akıllı sözleşmesini derlemek ve dağıtmak için şunu çalıştırın:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Çıktı şuna benzer görünmelidir:

```python
ChipToken şuraya dağıtıldı: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Şimdi, Blackjack merkeziyetsiz uygulamamızdaki her oyuncu için 1000 jeton basıldığını doğrulamak için yerel merkeziyetsiz uygulamanıza karşı `simple.js` testini çalıştırmayı deneyin:

Çıktı şuna benzer görünmelidir:

```python
npx hardhat test --network localnet
```

Çıktı şuna benzer görünmelidir:

```python
ChipToken
    mint
      ✔ PLAYER ONE için 1000 fiş basmalı

  1 başarılı (654ms)
```

### Gözden Geçirme {#review-dapp-workflows}

Bu noktada, bir merkeziyetsiz uygulama geliştirme ortamı kurdunuz, onu Kurtosis tarafından oluşturulan yerel bir Ethereum ağına bağladınız ve merkeziyetsiz uygulamanıza karşı basit bir test derlediniz, dağıttınız ve çalıştırdınız.

Şimdi de, merkeziyetsiz uygulamalarımızı değişken ağ yapılandırmaları altında test etmek için temel ağı nasıl yapılandırabileceğinizi keşfedelim.

## Yerel Ethereum test ağını yapılandırma {#configure-testnet}

### İstemci yapılandırmalarını ve düğüm sayısını değiştirme {#configure-client-config-and-num-nodes}

Yerel Ethereum test ağınız, geliştirmek veya test etmek istediğiniz senaryoya ve belirli ağ yapılandırmasına bağlı olarak, farklı YK ve MK istemci çiftlerinin yanı sıra değişen sayıda düğüm kullanacak şekilde yapılandırılabilir. Bu, kurulduktan sonra özelleştirilmiş bir yerel test ağı oluşturabileceğiniz ve aynı iş akışlarını (dağıtım, testler vb.) çalıştırmak için kullanabileceğiniz anlamına gelir. her şeyin beklendiği gibi çalıştığından emin olmak için çeşitli ağ yapılandırmaları altında. Değiştirebileceğiniz diğer parametreler hakkında daha fazla bilgi edinmek için bu bağlantıyı ziyaret edin.

Deneyin! Bir JSON dosyası aracılığıyla `eth-network-package`'a çeşitli yapılandırma seçenekleri iletebilirsiniz. Bu ağ parametreleri JSON dosyası, Kurtosis'in yerel Ethereum ağını kurmak için kullanacağı belirli yapılandırmaları sağlar.

Varsayılan yapılandırma dosyasını alın ve farklı YK/MK çiftlerine sahip üç düğüm başlatmak için düzenleyin:

- Düğüm 1, `geth`/`lighthouse` ile
- Düğüm 2, `geth`/`lodestar` ile
- Düğüm 3, `geth`/`teku` ile

Bu yapılandırma, merkeziyetsiz uygulamanızı test etmek için heterojen bir Ethereum düğüm uygulamaları ağı oluşturur. Yapılandırma dosyanız şimdi şöyle görünmelidir:

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

Her `participants` yapısı ağdaki bir düğüme karşılık gelir, bu nedenle 3 `participants` yapısı Kurtosis'e ağınızda 3 düğüm başlatmasını söyleyecektir. Her `participants` yapısı, o belirli düğüm için kullanılan YK ve MK çiftini belirtmenize olanak tanır.

`network_params` yapısı, her düğüm için başlangıç dosyalarını oluşturmak için kullanılan ağ ayarlarını ve ağın yuva başına saniyesi gibi diğer ayarları yapılandırır.

Düzenlenen parametreler dosyanızı istediğiniz herhangi bir dizine kaydedin (aşağıdaki örnekte masaüstüne kaydedilmiştir) ve ardından Kurtosis paketinizi çalıştırmak için şunu çalıştırın:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Not: `kurtosis clean -a` komutu, Kurtosis'e yeni bir tane başlatmadan önce eski test ağını ve içeriğini yok etmesi talimatını vermek için burada kullanılır.

Yine Kurtosis bir süre çalışacak ve gerçekleşen adımları tek tek yazdıracaktır. Sonunda, çıktı şuna benzer görünmelidir:

```python
Starlark kodu başarıyla çalıştırıldı. Çıktı döndürülmedi.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Enclave oluşturuldu: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Dosya Yapıtları =========================================
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

========================================== Kullanıcı Hizmetleri ==========================================
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

Tebrikler! Yerel test ağınızı 1 yerine 3 düğüme sahip olacak şekilde başarıyla yapılandırdınız. Merkeziyetsiz uygulamanıza karşı daha önce yaptığınız iş akışlarını (dağıtma ve test etme) çalıştırmak için, `hardhat.config.ts` yapılandırma dosyanızdaki `localnet` yapısındaki `<$YOUR_PORT>` öğesini yeni, 3 düğümlü yerel test ağınızdaki herhangi bir `el-client-<num>` hizmetinden gelen rpc uri çıktısının bağlantı noktasıyla değiştirerek daha önce yaptığımız işlemlerin aynısını gerçekleştirin.

## Sonuç {#conclusion}

İşte bu kadar! Bu kısa kılavuzu özetlemek gerekirse, şunları yaptınız:

- Kurtosis kullanarak Docker üzerinde yerel bir Ethereum test ağı oluşturdunuz
- Yerel merkeziyetsiz uygulama geliştirme ortamınızı yerel Ethereum ağına bağladınız
- Yerel Ethereum ağında bir merkeziyetsiz uygulama dağıttınız ve ona karşı basit bir test çalıştırdınız
- Temel Ethereum ağını 3 düğüme sahip olacak şekilde yapılandırdınız

Sizin için neyin iyi gittiğini, neyin iyileştirilebileceğini veya sorularınızı yanıtlamak için sizden haber bekliyoruz. [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) üzerinden ulaşmaktan veya [bize e-posta göndermekten](mailto:feedback@kurtosistech.com) çekinmeyin!

### Diğer örnekler ve kılavuzlar {#other-examples-guides}

Postgres veritabanı ve üzerine bir API oluşturacağınız [hızlı başlangıcımıza](https://docs.kurtosis.com/quickstart) ve harika örnekler bulacağınız [awesome-kurtosis depomuzdaki](https://github.com/kurtosis-tech/awesome-kurtosis) diğer örneklerimize göz atmanızı öneririz, bunlar arasında şunlar için paketler bulunur:

- İşlemleri simüle etmek için bir işlem spam göndericisi, bir çatal izleyicisi ve bağlı bir Grafana ve Prometheus örneği gibi ek hizmetlerle bağlı olan [aynı yerel Ethereum test ağını başlatma](https://github.com/kurtosis-tech/eth2-package)
- Aynı yerel Ethereum ağına karşı bir [alt ağ testi](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) gerçekleştirme
