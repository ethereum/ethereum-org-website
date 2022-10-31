---
title: Geth ile bir hafif (light) düğüm nasıl çalıştırılır
description: Geth ile bir lightclient nasıl indirilir, kurulur ve çalıştırılır.
author: "Brian Gu"
tags:
  - "istemciler"
  - "geth"
  - "düğümler"
skill: beginner
lang: tr
published: 2022-03-04
---

Bir [Ethereum düğümü](/developers/docs/nodes-and-clients/) çalıştırmak istiyor olabilirsiniz. Bunu yapmanın en kolay yollarından biri Geth'i indirmek, kurmak ve çalıştırmaktır. Geth ile bir hafif düğümü dakikalar içinde çalışır duruma getirebiliriz.

Hafif istemci, Ethereum durumuyla tam etkileşime izin verirken 400 Mb'den daha az depolama gerektirir. Hafif istemciler uzak eşlerden veri alır, bu nedenle bazı sorguların yanıtlanması diğer senkronizasyon modlarına kıyasla daha uzun sürebilir.

Farklı senkronizasyon modları arasındaki farkların açıklaması için [düğüm ve istemci geliştirici belgelerimizi](/developers/docs/nodes-and-clients/#node-types) okuyun.

## Kurun ve çalıştırın {#install-and-run}

İlk olarak, [Geth'i kurun](https://geth.ethereum.org/docs/install-and-build/installing-geth).

Geth'i kurduktan sonra, bir Terminal penceresinde aşağıdaki komutu çalıştırarak bir Ethereum düğümünü "hafif" modda çalıştırabilirsiniz:

```bash
geth --syncmode light
```

Geth başlatıldıktan sonra, "eşler" olarak bilinen Ethereum üzerindeki diğer düğümlere bağlanmaya başlayacak. Eşlerle bağlantı kurma süreci biraz zaman alabilir.

Geth düğümünüz yeterli sayıda eşe sahip olduğunda, zincirdeki yeni bloklardan başlıkları içe aktarır.

Yeni blok başlıklarının artık bir "yaşı" olmadığında Geth, zincirin başıyla senkronize edilir.

## Düğümünüzü durdurma ve yeniden başlatma {#stopping-and-restarting-your-node}

<kbd>CTRL</kbd>+<kbd>C</kbd> tuşlarına basarak düğümünüzü istediğiniz zaman durdurabilirsiniz.

Düğümü yeniden başlatırken, Geth'in düğümün son çalıştırılmasından bu yana oluşturulan blok başlıklarını indirmesi birkaç dakika sürecektir.

## HTTP-RPC sunucusunu etkinleştir {#enable-the-http-rpc-server}

HTTP-RPC sunucusunu etkinleştirmek, Ethereum düğümünüzü cüzdanlar, tarayıcı uzantıları veya özel yazılım kitaplıkları gibi diğer yazılımlara bağlamanıza olanak tanır.

Geth'i başlatırken aşağıdaki komutu çalıştırarak HTTP-RPC sunucusunu etkinleştirebilirsiniz:

```bash
geth --syncmode light --http
```

Etkinleştirildiğinde, `curl http://127.0.0.1:8545` komutunu çalıştırın. Bu, hata bildirmemelidir.

### Uzak bağlantılara izin verin {#allow-remote-connections}

Uzak ana bilgisayarların düğümünüze bağlanmasına izin vermek için aşağıdaki komutla Geth'i başlatın:

```
geth --syncmode light --http --http.addr 0.0.0.0
```

Not: Bu, güvenlik duvarı gibi yerel ana makinenize gelen istekleri engelleyen bir işlem olmadığını varsayar.

## Geth JavaScript konsolu {#geth-javascript-console}

Geth, düğümünüzle etkileşim kurmak için kullanabileceğiniz yerleşik bir JavaScript konsoluna ve [web3js](https://github.com/ethereum/web3.js/) adlı bir JavaScript API'sine sahiptir.

JavaScript konsolunu kullanmak için şunu çalıştırın:

```bash
geth attach
```

Bu konsol, Ethereum ile doğrudan etkileşime izin verir. Örneğin, `eth.blockNumber` komutunu çalıştırmak, bilinen en son blok numarasını yazdıracaktır.

[Tam web3js belgeleri](http://web3js.readthedocs.io/)

## Mainnet ve test ağları {#mainnet-and-testnets}

Geth, düğümünüzü varsayılan olarak [Ethereum Mainnet](/glossary/#mainnet/) üzerinde çalıştırır.

Terminal'de aşağıdaki komutlardan birini çalıştırarak, [genel test ağlarından](/networks/#testnets/) birinde bir düğüm çalıştırmak için Geth'i kullanmak da mümkündür:

```bash
geth --syncmode light --ropsten
geth --syncmode light --rinkeby
geth --syncmode light --goerli
```

## Blok zinciri ve EVM verileri nerede saklanıyor? {#where-is-the-blockchain-and-evm-data-stored}

Geth'in ham blok zinciri verilerini depolamak için kullandığı dizin, işletim sisteminize bağlıdır. Geth'i çalıştırdıktan sonra şuna benzeyen bir mesaj bulmaya çalışın:

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

`“database=”` ardındaki yol, blok zinciri verilerinin makinenizde nerede depolandığını size söyleyecektir. Tam bir düğüm çalıştırıyorsanız bu dizin, blok zincirine taahhüt edilmiş her blok hakkındaki tüm verileri içerecektir. Hafif bir düğüm çalıştırdığımız için bu dizin yalnızca blok başlıklarını içerir.

Bu noktada, buranın blok zincirinin en düşük seviyede yaşadığı yer olduğunu vurgulamakta fayda var. Blok zincirinin tam içeriği ve EVM durumu, Ethereum ağındaki her tam düğümde, bilgisayarınızdakine çok benzeyen dizinlerde depolanır.

## Daha fazla okuma {#further-reading}

- [Farklı ağlar hakkında öğrenin](/developers/docs/networks/).
- [Tam bir düğüm çalıştırın](/run-a-node/)
