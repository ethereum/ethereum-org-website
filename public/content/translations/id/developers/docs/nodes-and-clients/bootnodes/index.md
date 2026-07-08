---
title: Pengantar Simpul Boot Ethereum
description: Informasi dasar yang Anda butuhkan untuk memahami simpul boot
lang: id
---

Ketika sebuah node baru bergabung dengan jaringan Ethereum, node tersebut perlu terhubung ke node yang sudah ada di jaringan untuk kemudian menemukan rekan (peer) baru. Titik masuk ke jaringan Ethereum ini disebut simpul boot. Klien biasanya memiliki daftar simpul boot yang di-hardcode di dalamnya. Simpul boot ini biasanya dijalankan oleh tim devops Yayasan Ethereum atau tim klien itu sendiri. Perhatikan bahwa simpul boot tidak sama dengan node statis. Node statis dipanggil berulang kali, sedangkan simpul boot hanya dipanggil jika tidak ada cukup rekan untuk terhubung dan sebuah node perlu melakukan bootstrap pada beberapa koneksi baru.

## Terhubung ke simpul boot {#connect-to-a-bootnode}

Sebagian besar klien memiliki daftar simpul boot bawaan, tetapi Anda mungkin juga ingin menjalankan simpul boot Anda sendiri, atau menggunakan salah satu yang bukan bagian dari daftar hardcode klien. Dalam hal ini, Anda dapat menentukannya saat memulai klien Anda, sebagai berikut (contoh ini untuk Geth, silakan periksa dokumentasi klien Anda):

```
geth --bootnodes "enode://<ID node>@<alamat IP>:<port>"
```

## Menjalankan simpul boot {#run-a-bootnode}

Simpul boot adalah full node yang tidak berada di belakang NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)). Setiap full node dapat bertindak sebagai simpul boot selama tersedia untuk publik.

Saat Anda memulai sebuah node, node tersebut akan mencatat log [enode](/developers/docs/networking-layer/network-addresses/#enode) Anda, yang merupakan pengidentifikasi publik yang dapat digunakan orang lain untuk terhubung ke node Anda.

Enode biasanya dibuat ulang pada setiap restart, jadi pastikan untuk melihat dokumentasi klien Anda tentang cara menghasilkan enode persisten untuk simpul boot Anda.

Agar menjadi simpul boot yang baik, ada baiknya untuk meningkatkan jumlah maksimum rekan yang dapat terhubung kepadanya. Menjalankan simpul boot dengan banyak rekan akan meningkatkan kebutuhan bandwidth secara signifikan.

## Simpul boot yang tersedia {#available-bootnodes}

Daftar simpul boot bawaan di dalam go-ethereum dapat ditemukan [di sini](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Simpul boot ini dikelola oleh Yayasan Ethereum dan tim go-ethereum.

Terdapat daftar simpul boot lain yang dikelola oleh sukarelawan. Pastikan untuk selalu menyertakan setidaknya satu simpul boot resmi, jika tidak, Anda bisa terkena serangan gerhana (eclipse attack).