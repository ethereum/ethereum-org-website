---
title: Durum Kanalları
description: Şu anda Ethereum topluluğu tarafından kullanılan bir ölçeklendirme çözümü olarak durum kanallarına ve ödeme kanallarına giriş.
lang: tr
sidebarDepth: 3
---

Özel kanallar, Ethereum Ana Ağı ile etkileşimi minimumda tutarak katılımcıların zincir dışında güvenli bir şekilde işlem yapmasına olanak tanır. Kanal eşleri, kanalı aşıp kapatmak için zincir üstünde sadece iki tane işlem gönderirken, zincir dışında isteğe bağlı sayıda işlem yapabilirler. Bu, kullanıcılar için son derece yüksek işlem verimine izin verir ve daha düşük maliyetler ile sonuçlanır.

##  {#how-do-sidechains-work}

Ethereum gibi halka açık blok zincirleri, dağılmış mimarilerinden dolayı ölçeklenebilirlik zorluklarıyla karşılaşır: zincir üstü işlemler tüm düğümler tarafından yürütülmelidir. Düğümler mütevazi bir donanım kullanarak bir bloktaki işlem hacmini işleyebilmeli ve ağın işlem hacmine bir sınır koyarak merkeziyetsizliğini korumalıdır.

###  {#consensus-algorithms}

Kanallar, iki tarafın birbirleri arasında birçok işlem yapmasına ve ardından sadece nihai sonuçları blokzincire göndermesine izin veren basit eşler arası protokollerdir. Kanal, ürettiği özet verilerin gerçekten geçerli bir dizi işlemin sonucu olduğunu kriptografi kullanarak gösterir. ["Çok imzalı"](/developers/docs/smart-contracts/#multisig) akıllı sözleşme, işlemlerin doğru taraflarca imzalanmasını sağlar.

- []()
- []()
-

Kanallar sayesinde, durum değişiklikleri ilgili taraflar tarafından yürütülür ve doğrulanır, bu da Ethereum'un yürütüm katmanındaki hesaplamayı en aza indirir. Bu, Ethereum'daki yoğunluğu azaltır ve aynı zamanda kullanıcılar için işlem sürecini hızlandırır.

####  {#block-parameters}

Her bir kanal, Ethereum üzerinde çalıştırılan bir [çok imzalı akıllı sözleşme](/developers/docs/smart-contracts/#multisig) tarafından yönetilir. Bir kanal açmak için katılımcılar kanal sözleşmesini zincir üstünde dağıtır ve içine fon yatırır.

Kanalı kapatmak için katılımcılar kanalın üzerinde son anlaşılan durumu zincir üstünde gönderir. Sonrasında akıllı sözleşme, kilitli olan fonları kanalın son durumundaki her katılımcısının bakiyesine göre dağıtır.

Eşler arası kanallar, önceden tanımlanan bazı katılımcıların, görünür bir ek yüke maruz kalmadan yüksek sıklıkta işlem yapmak isteyeceği durumlar için kullanışlıdır. Blokzincir kanalları iki kategoriye ayrılır: **ödeme kanalları** ve **özel kanallar**.

###  {#evm-compatibility}

Bir ödeme kanalı en iyi, iki kullanıcının birlikte tuttuğu "iki yönlü ledger" olarak tanımlanabilir. Ledger'in ilk bakiyesi, kanal açma aşamasında zincir üstü sözleşmeye kilitlenen mevduatın toplamıdır.

Ledger'in bakiyesinde güncelleme yapılması (örn. ödeme kanalının durumu) için kanalda bulunan tüm tarafların onayı gerekir. Tüm katılımcıların imzaladığı bir kanal güncellemesi, tıpkı Ethereum'daki bir işlem gibi tamamlanmış olarak kabul edilir.

Ödeme kanalları, basit kullanıcı etkileşimlerinin (örn. ETH transferleri, atomik takaslar, mikro ödemeler) yüksek maliyetli zincir üstü faaliyetini en aza indirmek için tasarlanmış olan ilk ölçeklendirme çözümlerinden biri olmuştur. Kanalın katılımcıları, transferlerinin net toplamı yatırılmış jetonları aşmadığı takdirde birbirleri arasında sınırsız miktarda işlemi anında ve ücretsiz yapabilir.

Zincir dışı ödemeleri desteklemenin yanı sıra, ödeme kanallarının genel durum geçiş mantığını işlemede ödeme kanallarının kullanışlı olup olmadığı kanıtlanmamıştır. Özel kanallar, bu sorunu çözmek için ve kanalları genel amaçlı hesaplamayı ölçeklendirmek için kullanışlı hale getirmek amacıyla oluşturuldu.

###  {#asset-movement}

Özel kanallar hala ödeme kanalları ile birçok ortak özelliğe sahiptir. Örnek olarak, kullanıcılar diğer kanalların katılımcılarının da imzalaması gereken imzalanmış kriptografik mesajları (işlemler) takas ederek etkileşim kurarlar. Önerilen bir durum güncellemesi tüm katılımcılar tarafından imzalanmazsa geçersiz olur.

##  {#pros-and-cons-of-sidechains}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#use-sidechains}

- []()
- []()
- []()
- []()
- []()

##  {#further-reading}

-

_ _
