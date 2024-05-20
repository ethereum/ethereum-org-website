---
title: IPFS for decentralized user interfaces
description: This tutorial teaches the reader how to use IPFS to store the user interface for a dapp. Although the application's data and business logic are decentralized, without a censorship resistant user interface users might lose access to it anyway.
author: Ori Pomerantz
tags: ["ipfs", "user interface"]
skill: beginner
lang: en
published: 2024-06-30
---

## Introduction {#introduction}

You wrote an incredible new dapp. You've even written a [user interface](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) for it. But now you're afraid that somebody will attempt to censor it by bringing down your user interface, which is just one server off in the cloud. In this tutorial you learn how to avoid this by putting your user interface up on [IPFS](https://ipfs.tech/developers/) so anybody interested will be able to [pin](https://docs.ipfs.tech/concepts/persistence/#pinning-services) it on a server for future access.

You could use a third-party service such as [Fleek](https://docs.fleek.xyz/docs) to do all the work. This tutorial is for people who want to do enough to understand what they are doing even if it is more work.


## Getting started locally {#getting-started-locally}

There are multiple [third-party ISPFS providers](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), but it is best to start with running IPFS locally for testing.

1. Install the [IPFS user interface](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Create a directory with your web site. If you are using [Vite](https://vitejs.dev/), use this command:

   ```sh
   pnpm vite build
   ```

3. In IPFS Desktop, click **Import > Folder** and select the directory you created in the previous step.

4. Select the folder you just uploaded and click **Rename**. Give it a more meaningful name.

5. Select it again and click **Share link**. Copy the URL to the clipboard. The link would be similar to `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Click **Status**. Expand the **Advanced** tab to see the gateway address. For example, on my system the address is `http://127.0.0.1:8080`.

7. Combine the path from the link step with the gateway address to find your address. For example, for the example above, the URL is `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Open that URL in a browser to see your site.

## Uploading {#uploading}

So now you can use IPFS to serve files locally, which is not very exciting. The next step is to make them available for the world when you're offline.

There are a number of well known [pinning services](https://docs.ipfs.tech/concepts/persistence/#pinning-services). Choose one of them. Whichever service you use, you need to create an account and provide it with the CID (content identifier) in your IPFS desktop.

Personally, I found [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) to be the easiest to use. Here are the directions for it:

1. Browse to [the dashboard](https://dashboard.4everland.org/overview) and log on with your wallet.

2. In the left sidebar click **Storage > 4EVER Pin**.

3. Click **Upload > Selected CID**. Give your content a name and provide the CID from IPFS desktop.

4. The initial status is **Queued**. Reload until it changes to **Pinned**.

5. Click your CID to get the link. You can see my application [here](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. You might need to activate your account to have it pinned for more than a month. Account activation costs about $1. If you closed it, log out and log back in to be asked to activate again.

## Using from IPFS {#using-from-ipfs}

At this point you have a link to a centralized gateway that serves your IPFS content. In short, your user interface may be a bit safer but it's stil not censorship resistant. For real censorship resistance you need to use IPFS [directly from the browser](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Once you have that installed (and the desktop IPFS working), you can go to [/ipfs/<CID>](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) on any site and you'll get that content, served in a decentralized manner.

## Conclusion {#conclusion}

You cannot reliably delete IPFS files, so as long as you're modifying your user interface, it is probably best to leave it centralized. However, once you've stabilized it, it seems like it would be an excellent idea to release it on IPFS so that portion of your dapp can also be decentralized and censorship resistant.