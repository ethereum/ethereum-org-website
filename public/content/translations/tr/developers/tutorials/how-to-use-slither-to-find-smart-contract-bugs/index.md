---
title: Akıllı sözleşme hatalarını bulmak için Slither nasıl kullanılır?
description: Akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Slither'ı kullanma
author: Trailofbits
lang: tr
tags:
  [
    "katılık",
    "akıllı kontratlar",
    "güvenlik",
    "test etmek"
  ]
skill: advanced
published: 2020-06-09
source: Güvenli sözleşmeler oluşturmak
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slither Nasıl Kullanılır? {#how-to-use-slither}

Bu öğreticinin amacı, akıllı sözleşmelerdeki hataları otomatik olarak bulmak için Slither'ın nasıl kullanılacağını göstermektir.

- [Kurulum](#installation)
- [Komut satırı kullanımı](#command-line)
- [Statik analize giriş](#static-analysis): Statik analize kısa bir giriş
- [API](#api-basics): Python API'si açıklaması

## Kurulum {#installation}

Slither, Python >= 3.6 gerektirir. Pip veya docker kullanılarak kurulabilir.

Pip aracılığıyla Slither:

```bash
pip3 install --user slither-analyzer
```

Docker aracılığıyla Slither:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Son komut, geçerli dizininize erişimi olan bir docker'da eth-security-toolbox'ı çalıştırır. Dosyaları ana makinenizden değiştirebilir ve docker'dan dosyalar üzerindeki araçları çalıştırabilirsiniz_

Docker içinde şunu çalıştırın:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Bir betik çalıştırma {#running-a-script}

Python 3 ile bir python betiği çalıştırmak için:

```bash
python3 script.py
```

### Komut satırı {#command-line}

**Komut satırı ve kullanıcı tanımlı komut dosyaları.** Slither, birçok yaygın hatayı bulan bir dizi önceden tanımlanmış algılayıcıyla birlikte gelir. Slither'ı komut satırından çağırmak tüm algılayıcıları çalıştırır, ayrıntılı statik analiz bilgisi gerekmez:

```bash
slither project_paths
```

Dedektörlere ek olarak Slither, [yazıcıları](https://github.com/crytic/slither#printers) ve [araçları](https://github.com/crytic/slither#tools) aracılığıyla kod inceleme yeteneklerine sahiptir.

Özel dedektörlere ve GitHub entegrasyonuna erişmek için [crytic.io](https://github.com/crytic) kullanın.

## Statik analiz {#static-analysis}

Slither statik analiz çatısının yetenekleri ve tasarımı, blog gönderilerinde ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) ve bir [akademik makalede](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) açıklanmıştır.

Statik analizin farklı türleri mevcuttur. [clang](https://clang-analyzer.llvm.org/) ve [gcc](https://lwn.net/Articles/806099/) gibi derleyicilerin bu araştırma tekniklerine dayandığını büyük olasılıkla fark etmişsinizdir, ancak bu aynı zamanda [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) ve [Frama-C](https://frama-c.com/) ile [Polyspace](https://www.mathworks.com/products/polyspace.html) gibi resmi yöntemlere dayalı araçların da temelini oluşturur.

Burada statik analiz tekniklerini ve araştırmalarını kapsamlı bir şekilde incelemeyeceğiz. Bunun yerine, hataları bulmak ve kodu anlamak amacıyla onu daha etkili bir şekilde kullanabilmeniz için Slither'ın nasıl çalıştığını anlamak için gerekenlere odaklanacağız.

- [Kod temsili](#code-representation)
- [Kod analizi](#analysis)
- [Ara temsil](#intermediate-representation)

### Kod temsili {#code-representation}

Tek bir yürütme yolunu değerlendiren dinamik analizin aksine, statik analiz aynı anda tüm yolları değerlendirir. Bunu yapmak için farklı bir kod temsiline dayanır. En yaygın iki tanesi soyut sözdizimi ağacı (AST) ve kontrol akış grafiğidir (CFG).

### Soyut Sözdizimi Ağaçları (AST) {#abstract-syntax-trees-ast}

AST, derleyici kodu her ayrıştırdığında kullanılır. Bu, muhtemelen statik analizin gerçekleştirilebileceği en temel yapıdır.

Özetle bir AST, genellikle her yaprağın bir değişken veya bir sabit içerdiği ve iç düğümlerin işlenenler veya kontrol akışı işlemleri olduğu yapılandırılmış bir ağaçtır. Aşağıdaki kodu göz önünde bulundurun:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

İlgili AST şurada gösterilir:

![AST](./ast.png)

Slither, solc tarafından dışa aktarılan AST'yi kullanır.

Oluşturulması basit olsa da, AST iç içe geçmiş bir yapıdır. Bazen, bunu analiz etmek pek kolay olmayabilir. Örneğin, `a + b <= a` ifadesinin kullandığı işlemleri belirlemek için önce `<=` ve ardından `+`yı analiz etmelisiniz. Yaygın bir yaklaşım, ağaçta özyinelemeli olarak gezinen ziyaretçi desenini kullanmaktır. Slither, [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) içinde jenerik bir ziyaretçi içerir.

Aşağıdaki kod, ifadenin bir toplama işlemi içerip içermediğini tespit etmek için `ExpressionVisitor` kullanır:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression, test edilecek ifadedir
print(f'{expression} ifadesi bir toplama içeriyor: {visitor.result()}')
```

### Kontrol Akış Grafiği (CFG) {#control-flow-graph-cfg}

İkinci en yaygın kod temsili kontrol akış grafiğidir (CFG). Adından da anlaşılacağı gibi, bu, tüm yürütme yollarını ortaya çıkaran graf tabanlı bir gösterimdir. Her düğüm bir veya daha fazla talimat içerir. Grafikteki kenarlar kontrol akışı işlemlerini (if/then/else, döngü vb.) temsil eder. Önceki örneğimizin CFG'si şöyledir:

![CFG](./cfg.png)

CFG, analizlerin çoğunun üzerine inşa edildiği temsildir.

Daha birçok kod gösterimi mevcuttur. Her bir gösterimin, gerçekleştirmek istediğiniz analize göre avantajları ve dezavantajları vardır.

### Analiz {#analysis}

Slither ile gerçekleştirebileceğiniz en basit analiz türleri sözdizimsel analizlerdir.

### Sözdizimi analizi {#syntax-analysis}

Slither, desen eşleştirme benzeri bir yaklaşım kullanarak tutarsızlıkları ve kusurları bulmak için kodun farklı bileşenleri ve onların gösterimleri arasında gezinebilir.

Örneğin, aşağıdaki dedektörler söz dizimiyle ilgili sorunları arar:

- [Durum değişkeni gölgeleme](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): tüm durum değişkenleri üzerinde yinelenir ve herhangi birinin kalıtılmış bir sözleşmeden bir değişkeni gölgeleyip gölgelemediğini kontrol eder ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Hatalı ERC20 arayüzü](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): hatalı ERC20 fonksiyon imzalarını arar ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Anlamsal analiz {#semantic-analysis}

Sözdizimi analizinin aksine, anlamsal bir analiz daha derine iner ve kodun "anlamını" analiz eder. Bu aile, bazı genel analiz türlerini içerir. Bunlar daha güçlü ve kullanışlı sonuçlara yol açar, ancak yazılmaları da daha karmaşıktır.

Anlamsal analizler, en gelişmiş güvenlik açığı tespitleri için kullanılır.

#### Veri bağımlılığı analizi {#fixed-point-computation}

`variable_a`'nın değerinin `variable_b`'den etkilendiği bir yol varsa, `variable_a` değişkeninin `variable_b`'ye veri bağımlı olduğu söylenir.

Aşağıdaki kodda `variable_a` değişkeni `variable_b`'ye bağımlıdır:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither, ara gösterimi (ileriki bir bölümde ele alınacaktır) sayesinde yerleşik [veri bağımlılığı](https://github.com/crytic/slither/wiki/data-dependency) yetenekleriyle birlikte gelir.

Veri bağımlılığı kullanımına bir örnek, [tehlikeli katı eşitlik dedektöründe](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) bulunabilir. Burada Slither, tehlikeli bir değere katı eşitlik karşılaştırması arar ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) ve bir saldırganın sözleşmeyi tuzağa düşürmesini önlemek için kullanıcıya `==` yerine `>=` veya `<=` kullanması gerektiğini bildirir. Diğer şeylerin yanı sıra dedektör, `balanceOf(address)` çağrısının dönüş değerini tehlikeli olarak kabul eder ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) ve kullanımını izlemek için veri bağımlılığı motorunu kullanır.

#### Sabit nokta hesaplaması {#fixed-point-computation}

Analiziniz CFG içinde gezinir ve kenarları takip ederse, daha önce ziyaret edilmiş düğümleri görmeniz olasıdır. Örneğin, bir döngü aşağıda gösterildiği gibi sunulursa:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Analizinizin ne zaman duracağını bilmesi gerekir. Burada iki ana strateji vardır: (1) her düğümde sonlu sayıda yineleme yapmak, (2) _sabit nokta_ adı verilen bir şeyi hesaplamak. Sabit nokta, temel olarak bu düğümü analiz etmenin artık anlamlı bir bilgi sağlamadığı anlamına gelir.

Kullanılan bir sabit nokta örneği, yeniden giriş dedektörlerinde bulunabilir: Slither düğümleri araştırır ve harici çağrıları, depolamaya yazma ve okuma işlemlerini arar. Bir sabit noktaya ulaştığında ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), keşfi durdurur ve farklı yeniden giriş desenleri ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) aracılığıyla bir yeniden girişin mevcut olup olmadığını görmek için sonuçları analiz eder.

Verimli sabit nokta hesaplaması kullanarak analizler yazmak, analizin kendi bilgilerini nasıl yaydığını iyi anlamayı gerektirir.

### Ara temsil {#intermediate-representation}

Bir ara temsil (IR), statik analize orijinalinden daha elverişli olması amaçlanan bir dildir. Slither, Solidity'yi kendi IR'si olan [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)'ye çevirir.

Yalnızca temel kontroller yazmak istiyorsanız SlithIR'ı anlamanız gerekli değildir. Ancak, gelişmiş anlamsal analizler yazmayı planlıyorsanız kullanışlı olacaktır. [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) ve [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) yazıcıları, kodun nasıl çevrildiğini anlamanıza yardımcı olacaktır.

## API Temelleri {#api-basics}

Slither'ın, sözleşmenin ve fonksiyonlarının temel niteliklerini keşfetmenizi sağlayan bir API'si vardır.

Bir kod tabanını yüklemek için:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Sözleşmeleri ve fonksiyonları keşfetme {#exploring-contracts-and-functions}

Bir `Slither` nesnesi şunlara sahiptir:

- `contracts (list(Contract)`: sözleşme listesi
- `contracts_derived (list(Contract)`: başka bir sözleşme tarafından kalıtılmayan sözleşmelerin listesi (sözleşmelerin alt kümesi)
- `get_contract_from_name (str)`: Adından bir sözleşme döndürür

Bir `Contract` nesnesi şunlara sahiptir:

- `name (str)`: Sözleşmenin adı
- `functions (list(Function))`: Fonksiyon listesi
- `modifiers (list(Modifier))`: Niteleyici listesi
- `all_functions_called (list(Function/Modifier))`: Sözleşme tarafından erişilebilen tüm dahili fonksiyonların listesi
- `inheritance (list(Contract))`: Kalıtılmış sözleşmelerin listesi
- `get_function_from_signature (str)`: İmzasından bir Fonksiyon döndürür
- `get_modifier_from_signature (str)`: İmzasından bir Niteleyici döndürür
- `get_state_variable_from_name (str)`: Adından bir StateVariable (Durum Değişkeni) döndürür

Bir `Function` veya `Modifier` nesnesi şunlara sahiptir:

- `name (str)`: Fonksiyonun adı
- `contract (contract)`: fonksiyonun bildirildiği sözleşme
- `nodes (list(Node))`: Fonksiyonun/niteleyicinin CFG'sini oluşturan düğümlerin listesi
- `entry_point (Node)`: CFG'nin giriş noktası
- `variables_read (list(Variable))`: Okunan değişkenlerin listesi
- `variables_written (list(Variable))`: Yazılan değişkenlerin listesi
- `state_variables_read (list(StateVariable))`: Okunan durum değişkenlerinin listesi (okunan `değişkenlerin` alt kümesi)
- `state_variables_written (list(StateVariable))`: Yazılan durum değişkenlerinin listesi (yazılan `değişkenlerin` alt kümesi)
