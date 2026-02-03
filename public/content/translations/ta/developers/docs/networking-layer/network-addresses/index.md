---
title: நெட்வொர்க் முகவரிகள்
description: நெட்வொர்க் முகவரிகள் பற்றிய ஒரு அறிமுகம்.
lang: ta
sidebarDepth: 2
---

Ethereum nodes, peer-களுடன் (சமநிலைப்புள்ளிகளுடன்) இணைய அடிப்படைத் தகவல்கள் (basic information) மூலம் தங்களை அடையாளப்படுத்த வேண்டும். எந்த node-யும் இந்தத் தகவலைப் புரிந்துகொள்ளக் கூடியவாறு, அது மூன்று standard format-களில் ஒன்றில் பரிமாறப்படுகிறது: multiaddr, enode, or Ethereum Node Records (ENRs). ENRs தான் Ethereum network addresses-க்கான தற்போதைய (current) தரநிலை (standard).

## முன்னேற்றக் கட்டுரை {#prerequisites}

இந்தப் பக்கத்தைப் புரிந்துகொள்ள Ethereum-இன் [நெட்வொர்க்கிங் லேயர்](/developers/docs/networking-layer/) பற்றி சில புரிதல் தேவை.

## Multiaddr {#multiaddr}

Ethereum node address-இன் முதல் வடிவம் multiaddr (multi-addresses என்பதன் சுருக்கம்) ஆகும். Multiaddr என்பது peer-to-peer networks-க்காக வடிவமைக்கப்பட்ட ஒரு universal format. இங்கே addresses என்பது key-value pairs-ஆக குறிக்கப்படும். உதாரணமாக, `192.168.22.27` என்ற IPv4 முகவரியுடன், TCP போர்ட் `33000`-இல் கேட்கும் ஒரு நோடின் மல்டிஅட்ரஸ் இதுபோன்று இருக்கும்:

`/ip4/192.168.22.27/tcp/33000`

Ethereum node-இற்காக, multiaddr கூடுதலாக node-ID-ஐ (அவர்களின் public key-இன் hash) கொண்டிருக்கும்:

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode என்பது Ethereum node-ஐ அடையாளப்படுத்த URL address format மூலம் பயன்படுத்தப்படும் ஒரு முறை. Hexadecimal node-ID URL-இன் username பகுதியில் குறியாக்கப்படும். அது host-இல் இருந்து @ சின்னத்தால் பிரிக்கப்படும். Hostname-ஆக IP address மட்டும் வழங்கப்பட வேண்டும்.
(DNS பெயர்கள் அனுமதிக்கப்படவில்லை). Hostname பகுதியில் கொடுக்கப்பட்ட port என்பது TCP listening port. TCP port மற்றும் UDP (discovery) port வேறுபட்டால், UDP port discport என்ற query parameter-ஆக குறிப்பிடப்படும்.

பின்வரும் எடுத்துக்காட்டில், நோட் URL ஆனது `10.3.58.6` என்ற IP முகவரி, `30303` என்ற TCP போர்ட் மற்றும் `30301` என்ற UDP டிஸ்கவரி போர்ட்டைக் கொண்ட ஒரு நோடை விவரிக்கிறது.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum நோட் பதிவுகள் (ENRs) {#enr}

Ethereum Node Records (ENRs) என்பது Ethereum-இல் network addresses-க்கான ஒரு standardized format. இது multiaddr மற்றும் enode வடிவங்களை மாற்றியமைத்து supersede செய்கிறது. Enr-கள் மிகவும் பயனுள்ளதாகும், ஏனெனில் அவை node-கள் இடையே அதிகப்படியான தகவல் பரிமாற்றத்தை (greater informational exchange) அனுமதிக்கின்றன. ENR-ல் அடங்குபவை: Signature (கையொப்பம்), Sequence number, Identity scheme (கையொப்பங்களை உருவாக்கவும் சரிபார்க்கவும் பயன்படுத்தப்படும் அடையாள திட்டத்தின் விவரங்கள்). மேலும், ENR key-value pairs-ஆக அமைக்கப்பட்ட arbitrary data-வையும் கொண்டிருக்க முடியும். இந்த key-value pairs, node-இன்: IP address, Sub-protocols (அந்த node பயன்படுத்தக்கூடிய துணை நெறிமுறைகள்)
பற்றி தகவல்களை கொண்டிருக்கும். கான்சென்சஸ் கிளையன்ட்கள், பூட் நோட்களை அடையாளம் காண ஒரு [குறிப்பிட்ட ENR கட்டமைப்பைப்](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) பயன்படுத்துகின்றன, அத்துடன் தற்போதைய Ethereum ஃபோர்க் மற்றும் அட்டஸ்டேஷன் காசிப் சப்நெட் (இது நோடை ஒரு குறிப்பிட்ட பியர்ஸ் தொகுப்புடன் இணைக்கிறது, அவற்றின் சான்றளிப்புகள் ஒன்றாகத் திரட்டப்படுகின்றன) பற்றிய தகவல்களைக் கொண்ட `eth2` ஃபீல்டையும் கொண்டுள்ளன.

## மேலும் வாசிக்க {#further-reading}

- [EIP-778: Ethereum நோட் பதிவுகள் (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
