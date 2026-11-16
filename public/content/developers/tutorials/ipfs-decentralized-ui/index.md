---
title: IPFS for decentralized user interfaces
description: This tutorial teaches the reader how to use IPFS to store the user interface for a dapp. Although the application's data and business logic are decentralized, without a censorship resistant user interface users might lose access to it anyway.
author: Ori Pomerantz
tags: ["ipfs", "dapps", "frontend"]
skill: beginner
breadcrumb: IPFS for dapp UIs
lang: en
published: 2024-06-29
---

You wrote an incredible new dapp. You've even written a [user interface](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) for it. But now you're afraid that somebody will attempt to censor it by bringing down your user interface, which is just one server off in the cloud. In this tutorial you learn how to avoid censorship by putting your user interface up on **[interplanetary file system (IPFS)](https://docs.ipfs.tech/)** so anybody interested will be able to pin it on a server for future access.

You could use a third-party hosting service to do all the work. This tutorial is for people who want to do enough to understand what they are doing even if it is more work.

## Getting started locally {#getting-started-locally}

There are multiple [third-party IPFS providers](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), but it is best to start with running IPFS locally for testing.

1. Install the [IPFS user interface](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Create a directory with your web site. If you are using [Vite](https://vite.dev/), build the site with relative asset paths. Gateways serve your site under `/ipfs/<CID>/`, so the default absolute paths (`/assets/...`) would not load. Run this command in your Vite project:

   ```sh
   pnpm vite build --base=./
   ```

   The output is in the `dist` directory. Alternatively, set `base: './'` in `vite.config.ts`.

3. In IPFS Desktop, click **Import > Folder** and select the directory you created in the previous step.

4. Select the folder you just uploaded and click **Rename**. Give it a more meaningful name.

5. Select it again and click **Share link**. Copy the URL to the clipboard. The link would be similar to `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Public gateways such as `ipfs.io` are rate limited and may block some content, so use your local gateway for testing.

6. Click **Status**. Expand the **Advanced** tab to see the gateway address. For example, on my system the address is `http://127.0.0.1:8080`.

7. Combine the path from the link step with the gateway address to find your address. For example, for the example above, the URL is `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Open that URL in a browser to see your site.

## Uploading {#uploading}

So now you can use IPFS to serve files locally, which is not very exciting. The next step is to make them available for the world when you're offline.

There are a number of well known [pinning services](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Choose one of them. Whichever service you use, you need to create an account and provide it with the **content identifier (CID)** in your IPFS desktop.

Personally, I found [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) to be the easiest to use. Here are the directions for it:

1. Browse to [the dashboard](https://dashboard.4everland.org/overview) and login with your wallet.

2. In the left sidebar click **Storage > 4EVER Pin**.

3. Click **Upload > Selected CID**. Give your content a name and provide the CID from IPFS desktop. A CID is either a version 0 CID, which starts with `Qm` (for example, `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`), or a [version 1 CID](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1), which usually starts with `bafy` (for example, `bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im`).

4. The initial status is **Queued**. Reload until it changes to **Pinned**.

5. Click your CID to get the link. You can see my application [here](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Free accounts have limited storage and pinning duration. Check the [4EVERLAND pricing](https://docs.4everland.org/get-started/billing-and-pricing) for the current terms.

## Using from IPFS {#using-from-ipfs}

At this point you have a link to a centralized gateway that serves your IPFS content. In short, your user interface may be a bit safer but it's still not censorship resistant. For real censorship resistance, users need to use IPFS [directly from a browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Once you have that installed (and the desktop IPFS working), you can go to `/ipfs/<CID>` on any gateway (for example, `http://127.0.0.1:8080/ipfs/<CID>`) and you'll get that content, served in a decentralized manner.

## Drawbacks {#drawbacks}

You cannot reliably delete IPFS files, so as long as you're modifying your user interface, it is probably best to either leave it centralized, or use [interplanetary name system (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), a system that provides mutability on top of IPFS. Of course, anything that is mutable can be censored, in the case of IPNS by pressuring the person with the private key to which it corresponds.

Additionally, some packages have a problem with IPFS, so if your web site is very complicated that may not be a good solution. And of course, anything that relies on server integration cannot be decentralized just by having the client side on IPFS.

## Discoverability via ENS {#discoverability}

You can set the [content hash](https://docs.ens.domains/ensip/7) of an ENS name (like vitalik.eth) to your IPFS CID. Users can then reach your site through an ENS-aware gateway such as [eth.limo](https://eth.limo/) (for example, `https://vitalik.eth.limo`), or directly in browsers that resolve ENS names. Remember that updating the content hash is an onchain transaction, so every new version of your user interface needs one.

## Conclusion {#conclusion}

Just as Ethereum lets you decentralize the database and business logic aspects of your dapp, IPFS lets you decentralize the user interface. This lets you shut off one more attack vector against your dapp.

[See here for more of my work](https://cryptodocguy.pro/).
