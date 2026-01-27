---
title: "EthereumEthereum Başlangıç Düğümüne Giriş"
description: "Başlangıç düğümlerini anlamak için ihtiyacın olan temel bilgiler"
lang: tr
---

Yeni bir düğüm Ethereum ağına katıldığında, yeni düğümler keşfetmek için halihazırda ağda bulunan düğümlerle bağlantı kurmaya ihtiyaç duyar. Ethereum ağındaki bu giriş noktaları başlangıç düğümü olarak adlandırılır. İstemciler genellikle kodlanmış bir başlangıç düğümleri listesi içerir. Bu başlangıç düğümleri tipik olarak Ethereum Foundation geliştirici takımı ya da istemci takımı tarafından çalıştırılır. Başlangıç düğümlerinin statik düğümler ile aynı olmadığını unutmayın. Statik düğümler tekrar tekrar çağırılırken, başlangıç düğümleri yalnızca, bağlantı için yeterli düğüm olmadığında ve bir düğümün yeni bağlantılar başlatması gerektiğinde çağırılır.

## Bir bootnode'a bağlanın {#connect-to-a-bootnode}

Çoğu istemcinin yerleşik bir bootnode listesi vardır, ancak kendi bootnode'unuzu çalıştırmak veya istemcinin sabit kodlanmış listesinde olmayan birini kullanmak da isteyebilirsiniz. Böyle bir durumda, istemcinize başlarken bunu belirtebilirsiniz (Geth için bir örnek: lütfen istemci dokümanlarınızı kontrol edin):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Bir bootnode çalıştırın {#run-a-bootnode}

Bootnode'lar, bir NAT'ın ([Ağ Adresi Çevirisi](https://www.geeksforgeeks.org/network-address-translation-nat/)) arkasında olmayan tam düğümlerdir. Her tam düğüm halka açık olduğu taktirde, bir başlangıç düğümü gibi hareket edebilir.

Bir düğüm başlattığınızda, başkalarının düğümünüze bağlanmak için kullanabileceği, herkese açık bir tanımlayıcı olan [enode](/developers/docs/networking-layer/network-addresses/#enode) kimliğiniz kaydedilmelidir.

Enode genellikle her yeniden başlatmada yeniden oluşur, bu yüzden kendi başlangıç düğümünüz için kalıcı bir enode oluşturmak üzere istemci dokümanlarınıza baktığınızdan emin olun.

Iyi bir başlangıç düğümü olmak için, kendisine bağlanabilecek maksimum eş düğüm sayısını arttırmak iyi bir fikirdir. Çok sayıda eş düğüm ile başlangıç düğümünü çalıştırmak, bant genişliği gereksinimini önemli ölçüde arttırır.

## Mevcut bootnode'lar {#available-bootnodes}

go-ethereum'daki yerleşik bootnode'ların listesini [burada](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23) bulabilirsiniz. Bu başlangıç düğümleri, Ethereum Foundation ve go-ethereum ekibi tarafından korunur.

Gönüllüler tarafından tutulan başka başlangıç düğümü listeleri de mevcuttur. Lütfen en az bir resmi başlangıç düğümüne sahip olduğunuzdan emin olun, aksi tadirde "tutulma" saldırısına maruz kalabilirsiniz.
