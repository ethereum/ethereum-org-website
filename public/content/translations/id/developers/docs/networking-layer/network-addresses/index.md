---
title: Alamat jaringan
description: Perkenalan ke alamat jaringan.
lang: id
sidebarDepth: 2
---

Node Ethereum harus mengidentifikasi dirinya dengan beberapa informasi dasar untuk dapat terhubung dengan peer. Untuk memastikan setiap peer potensial dapat memahami informasi ini, informasi tersebut diteruskan dalam salah satu dari tiga format standar yang dapat dipahami oleh node Ethereum: multiaddr, enode, atau Ethereum Node Records (ENRs). ENR adalah standar saat ini untuk alamat jaringan Ethereum.

## Persyaratan {#prerequisites}

Beberapa pemahaman tentang [lapisan jaringan](/developers/docs/networking-layer/) Ethereum diperlukan untuk memahami halaman ini.

## Multiaddr {#multiaddr}

Format alamat node Ethereum yang asli adalah 'multiaddr' (kependekan dari 'multi-alamat'). Multiaddr adalah format universal yang di rancang untuk jaringan peer-to-peer. Alamat direpresentasikan sebagai pasangan kunci-nilai dengan kunci dan nilai yang di pisahkan dengan garis miring kedepan. Sebagai contoh, multiaddr untuk simpul dengan alamat IPv4 `192.168.22.27` yang mendengarkan di port TCP `33000` akan terlihat seperti:

`/ip4/192.168.22.27/tcp/33000`

Untuk sebuah node Ethereum, multiaddr berisi node-ID (sebuah hash dari kunci publik mereka):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode adalah cara untuk mengidentifikasi node Ethereum menggunakan format alamat URL. ID simpul heksadesimal dikodekan di bagian nama pengguna pada URL yang dipisahkan dari host dengan menggunakan tanda @. Nama host hanya dapat diberikan sebagai alamat IP; nama DNS tidak diperbolehkan. Port di bagian nama host adalah port mendengarkan TCP. Jika port TCP dan UDP (untuk discovery) berbeda, port UDP ditentukan sebagai parameter query 'discport'.

Dalam contoh berikut, URL simpul menjelaskan sebuah simpul dengan alamat IP `10.3.58.6`, port TCP `30303` dan port penemuan UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Catatan Simpul Ethereum (ENR) {#enr}

Catatan Simpul Ethereum (ENR) adalah format standar untuk alamat jaringan di Ethereum. Mereka menggantikan multiaddr dan enode. Ini sangat berguna karena memungkinkan pertukaran informasi yang lebih besar antar simpul. ENR berisi tanda tangan, nomor urut, dan bidang yang merinci skema identitas yang digunakan untuk menghasilkan dan memvalidasi tanda tangan. ENR juga dapat diisi dengan data arbitrer yang di kelompokan sebagai pasangan atribut-nilai. Pasangan atribut-nilai ini berisikan alamat IP simpul dan informasi tentang subprotokol yang dapat digunakan oleh simpul nya. Klien konsensus menggunakan [struktur ENR tertentu](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) untuk mengidentifikasi boot node dan juga menyertakan bidang `eth2` yang berisi informasi tentang fork Ethereum saat ini dan subnet gosip pengesahan (ini menghubungkan simpul ke sekumpulan peer tertentu yang pengesahannya digabungkan bersama).

## Bacaan Lebih Lanjut {#further-reading}

- [EIP-778: Catatan Simpul Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
