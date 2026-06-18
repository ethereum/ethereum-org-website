---
title: نیٹ ورک کے پتے
description: نیٹ ورک کے پتوں کا تعارف۔
lang: ur
sidebarDepth: 2
---

[ایتھیریم](/) نوڈز کو پیئرز سے جڑنے کے لیے کچھ بنیادی معلومات کے ساتھ اپنی شناخت کرانی ہوتی ہے۔ اس بات کو یقینی بنانے کے لیے کہ کوئی بھی ممکنہ پیئر اس معلومات کو سمجھ سکے، اسے تین معیاری فارمیٹس میں سے کسی ایک میں بھیجا جاتا ہے جسے کوئی بھی ایتھیریم نوڈ سمجھ سکتا ہے: <span dir="ltr">multiaddr</span>، <span dir="ltr">enode</span>، یا ایتھیریم نوڈ ریکارڈز (<span dir="ltr">ENRs</span>)۔ <span dir="ltr">ENRs</span> ایتھیریم نیٹ ورک کے پتوں کے لیے موجودہ معیار ہیں۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو سمجھنے کے لیے ایتھیریم کی [نیٹ ورکنگ لیئر](/developers/docs/networking-layer/) کی کچھ سمجھ ہونا ضروری ہے۔

## <span dir="ltr">Multiaddr</span> {#multiaddr}

ایتھیریم نوڈ کے پتے کا اصل فارمیٹ '<span dir="ltr">multiaddr</span>' تھا (جو '<span dir="ltr">multi-addresses</span>' کا مخفف ہے)۔ <span dir="ltr">Multiaddr</span> ایک عالمگیر فارمیٹ ہے جسے پیئر ٹو پیئر نیٹ ورکس کے لیے ڈیزائن کیا گیا ہے۔ پتوں کو کلید-قدر (<span dir="ltr">key-value</span>) کے جوڑوں کے طور پر پیش کیا جاتا ہے جس میں کلیدوں اور قدروں کو فارورڈ سلیش کے ذریعے الگ کیا جاتا ہے۔ مثال کے طور پر، ایک نوڈ جس کا <span dir="ltr">IPv4</span> پتہ `192.168.22.27` ہے اور وہ <span dir="ltr">TCP</span> پورٹ `33000` پر سن رہا ہے، اس کا <span dir="ltr">multiaddr</span> کچھ یوں دکھتا ہے:

`/ip4/192.168.22.27/tcp/33000`

ایک ایتھیریم نوڈ کے لیے، <span dir="ltr">multiaddr</span> میں <span dir="ltr">node-ID</span> (ان کی عوامی کلید کا ایک ہیش) شامل ہوتا ہے:

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## <span dir="ltr">Enode</span> {#enode}

<span dir="ltr">enode</span> ایک <span dir="ltr">URL</span> پتے کے فارمیٹ کا استعمال کرتے ہوئے ایتھیریم نوڈ کی شناخت کرنے کا ایک طریقہ ہے۔ ہیکساڈیسیمل <span dir="ltr">node-ID</span> کو <span dir="ltr">URL</span> کے یوزر نیم حصے میں انکوڈ کیا جاتا ہے جسے میزبان (host) سے <span dir="ltr">@</span> علامت کا استعمال کرتے ہوئے الگ کیا جاتا ہے۔ ہوسٹ نیم صرف ایک <span dir="ltr">IP</span> پتے کے طور پر دیا جا سکتا ہے؛ <span dir="ltr">DNS</span> ناموں کی اجازت نہیں ہے۔ ہوسٹ نیم کے حصے میں موجود پورٹ <span dir="ltr">TCP</span> لسننگ پورٹ ہوتی ہے۔ اگر <span dir="ltr">TCP</span> اور <span dir="ltr">UDP</span> (دریافت) پورٹس مختلف ہوں، تو <span dir="ltr">UDP</span> پورٹ کو کوئری پیرامیٹر "<span dir="ltr">discport</span>" کے طور پر بیان کیا جاتا ہے۔

درج ذیل مثال میں، نوڈ <span dir="ltr">URL</span> ایک ایسے نوڈ کو بیان کرتا ہے جس کا <span dir="ltr">IP</span> پتہ `10.3.58.6`، <span dir="ltr">TCP</span> پورٹ `30303` اور <span dir="ltr">UDP</span> دریافت پورٹ `30301` ہے۔

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## ایتھیریم نوڈ ریکارڈز (<span dir="ltr">ENRs</span>) {#enr}

ایتھیریم نوڈ ریکارڈز (<span dir="ltr">ENRs</span>) ایتھیریم پر نیٹ ورک کے پتوں کے لیے ایک معیاری فارمیٹ ہیں۔ یہ <span dir="ltr">multiaddrs</span> اور <span dir="ltr">enodes</span> کی جگہ لیتے ہیں۔ یہ خاص طور پر مفید ہیں کیونکہ یہ نوڈز کے درمیان زیادہ معلومات کے تبادلے کی اجازت دیتے ہیں۔ <span dir="ltr">ENR</span> میں ایک دستخط، سیکوئنس نمبر اور ایسے فیلڈز شامل ہوتے ہیں جو دستخطوں کو بنانے اور ان کی توثیق کرنے کے لیے استعمال ہونے والی شناختی اسکیم کی تفصیل دیتے ہیں۔ <span dir="ltr">ENR</span> کو کلید-قدر (<span dir="ltr">key-value</span>) کے جوڑوں کے طور پر منظم کردہ صوابدیدی ڈیٹا سے بھی بھرا جا سکتا ہے۔ ان کلید-قدر کے جوڑوں میں نوڈ کا <span dir="ltr">IP</span> پتہ اور ان ذیلی پروٹوکولز کے بارے میں معلومات شامل ہوتی ہیں جنہیں نوڈ استعمال کرنے کے قابل ہوتا ہے۔ اتفاق رائے والے کلائنٹس بوٹ نوڈز کی شناخت کے لیے ایک [مخصوص <span dir="ltr">ENR</span> ساخت](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) کا استعمال کرتے ہیں اور اس میں ایک `eth2` فیلڈ بھی شامل ہوتا ہے جس میں موجودہ ایتھیریم فورک اور تصدیق کے گپ شپ سب نیٹ (<span dir="ltr">attestation gossip subnet</span>) کے بارے میں معلومات ہوتی ہیں (یہ نوڈ کو پیئرز کے ایک خاص سیٹ سے جوڑتا ہے جن کی تصدیقات کو ایک ساتھ جمع کیا جاتا ہے)۔

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">EIP-778</span>: ایتھیریم نوڈ ریکارڈز (<span dir="ltr">ENR</span>)](https://eips.ethereum.org/EIPS/eip-778)
- [<span dir="ltr">LibP2P: Multiaddr-Enode-ENR?!</span>](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)