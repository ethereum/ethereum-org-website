---
title: "Geliştirme Ağları"
description: "Geliştirme ağlarına ve Ethereum uygulamaları oluşturmaya yardımcı olan mevcut araçlara genel bir bakış."
lang: tr
---

Akıllı sözleşmelerle bir [Ethereum](/) uygulaması oluştururken, onu dağıtmadan önce nasıl çalıştığını görmek için yerel bir ağda çalıştırmak isteyeceksiniz.

Web geliştirme için bilgisayarınızda yerel bir sunucu çalıştırmanıza benzer şekilde, merkeziyetsiz uygulamanızı (dapp) test etmek üzere yerel bir blokzincir örneği oluşturmak için bir geliştirme ağı kullanabilirsiniz. Bu Ethereum geliştirme ağları, herkese açık bir test ağından çok daha hızlı yinelemeye olanak tanıyan özellikler sağlar (örneğin, bir test ağı musluğundan ETH edinmekle uğraşmanıza gerek kalmaz).

## Ön koşullar {#prerequisites}

Geliştirme ağlarına dalmadan önce [Ethereum yığınının temellerini](/developers/docs/ethereum-stack/) ve [Ethereum ağlarını](/developers/docs/networks/) anlamalısınız.

## Geliştirme ağı nedir? {#what-is-a-development-network}

Geliştirme ağları, temel olarak yerel geliştirme için özel olarak tasarlanmış Ethereum istemcileridir (Ethereum uygulamalarıdır).

**Neden yerel olarak standart bir Ethereum düğümü çalıştırmıyorsunuz?**

Bir [düğüm çalıştırabilirsiniz](/developers/docs/nodes-and-clients/#running-your-own-node) ancak geliştirme ağları geliştirme amacıyla özel olarak oluşturulduğundan, genellikle aşağıdakiler gibi kullanışlı özelliklerle birlikte gelirler:

- Yerel blokzincirinizi verilerle deterministik olarak beslemek (ör. ETH bakiyesi olan hesaplar)
- Aldığı her işlemle sırayla ve gecikme olmadan anında bloklar üretmek
- Gelişmiş hata ayıklama ve günlük kaydı işlevselliği

## Mevcut araçlar {#available-projects}

**Not**: Çoğu [geliştirme çerçevesi](/developers/docs/frameworks/) yerleşik bir geliştirme ağı içerir. [Yerel geliştirme ortamınızı kurmak](/developers/local-environment/) için bir çerçeve ile başlamanızı öneririz.

### Hardhat Ağı {#hardhat-network}

Geliştirme için tasarlanmış yerel bir Ethereum ağı. Sözleşmelerinizi dağıtmanıza, testlerinizi çalıştırmanıza ve kodunuzda hata ayıklamanıza olanak tanır.

Hardhat Ağı, profesyoneller için bir Ethereum geliştirme ortamı olan Hardhat ile yerleşik olarak gelir.

- [Web sitesi](https://hardhat.org/)
- [GitHub](https://github.com/NomicFoundation/hardhat)

### Yerel İşaret Zincirleri {#local-beacon-chains}

Bazı mutabakat istemcileri, test amacıyla yerel işaret zincirleri oluşturmak için yerleşik araçlara sahiptir. Lighthouse, Nimbus ve Lodestar için talimatlar mevcuttur:

- [Lodestar kullanarak yerel test ağı](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Lighthouse kullanarak yerel test ağı](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Herkese Açık Ethereum Test Zincirleri {#public-beacon-testchains}

Ayrıca Ethereum'un bakımı yapılan, herkese açık iki test uygulaması vardır: Sepolia ve Hoodi. Uzun vadeli desteğe sahip önerilen test ağı, herkesin üzerinde doğrulama yapmakta özgür olduğu Hoodi'dir. Sepolia izinli bir doğrulayıcı seti kullanır, bu da bu test ağında yeni doğrulayıcılar için genel bir erişim olmadığı anlamına gelir.

- [Hoodi Staking Başlatma Paneli](https://hoodi.launchpad.ethereum.org/)

### Kurtosis Ethereum Paketi {#kurtosis}

Kurtosis, geliştiricilerin blokzincir ağlarının tekrarlanabilir örneklerini yerel olarak oluşturmalarını sağlayan çoklu kapsayıcı test ortamları için bir derleme sistemidir.

Ethereum Kurtosis paketi, Docker veya Kubernetes üzerinden parametrelendirilebilir, yüksek oranda ölçeklenebilir ve özel bir Ethereum test ağını hızlı bir şekilde başlatmak için kullanılabilir. Paket, tüm büyük Yürütme Katmanı (EL) ve Mutabakat Katmanı (CL) istemcilerini destekler. Kurtosis, Ethereum çekirdek altyapısıyla ilgili doğrulama ve test iş akışlarında kullanılacak temsili bir ağ için tüm yerel bağlantı noktası eşlemelerini ve hizmet bağlantılarını sorunsuz bir şekilde yönetir.

- [Ethereum ağ paketi](https://github.com/kurtosis-tech/ethereum-package)
- [Web sitesi](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Belgeler](https://docs.kurtosis.com/)

## Daha fazla bilgi {#further-reading}

_Size yardımcı olan bir topluluk kaynağı mı biliyorsunuz? Bu sayfayı düzenleyin ve ekleyin!_

## İlgili konular {#related-topics}

- [Geliştirme çerçeveleri](/developers/docs/frameworks/)
- [Yerel bir geliştirme ortamı kurun](/developers/local-environment/)

## Eğitimler: Ethereum'da geliştirme ağları ve test ortamları {#tutorials}

- [Çoklu istemcili yerel bir Ethereum test ağı ile dApp'ler geliştirin ve test edin](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– dApp geliştirme ve testi için Kurtosis ile yerel, çoklu istemcili bir Ethereum test ağının nasıl oluşturulacağı._