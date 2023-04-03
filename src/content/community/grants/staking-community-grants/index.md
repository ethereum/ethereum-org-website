---
title: Eth2 staking community grants
description: Instructions, deadlines, and information for the Eth2 staking grants
lang: en
sidebarDepth: 2
---

# Eth2 staking community grants {#Eth2-staking-community-grants}

<InfoBanner emoji=":warning:" isWarning={true}>
  This challenge is over. <a href="https://blog.ethereum.org/2021/02/09/esp-staking-community-grantee-announcement/" target="_blank">View the results</a>
</InfoBanner>

_The Ethereum Foundation is sponsoring a wave of Eth2 staking community grants. Proposals are due December 22, 2020. Here are all the details you need._

<Divider />

Calling all those interested in building up the Eth2 staking and validator community!

Eth2 is happening! The Mainnet [deposit contract address](/staking/deposit-contract/) is deployed. And [genesis of the Beacon Chain](https://hackmd.io/@benjaminion/genesis) is [right around the corner](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/). Which means, stakers are gearing up to stake.

The Ethereum Foundation is funding the creation of tools, documentation, and resources to make for a delightful staking and validator experience. While the spirited staker ecosystem has already made great progress with respect to public good community resources, we are still in the early days and there's more work to do!

<br />
<InfoBanner emoji=":thinking_face:">
  Wait, how do I get started with staking? Learn <a href="/en/staking/">what staking means</a>, or try it first on the <a href="https://medalla.launchpad.ethereum.org/" target="_blank">Medalla testnet</a>
</InfoBanner>

## Submit proposal {#submit-proposal}

Anyone is free to participate (individuals and teams) in this grants round.

If you want to submit something but need some inspiration, check out the <a href="#examples">examples</a> and the <a href="#wishlist">wishlist</a>.

Ideas and projects at any stage of development are welcome:

- Idea phase.
- Proof-of-concept.
- Work in progress.
- Fleshed out project.

Grants are decided on a case-by-case basis and you may enter more than one proposal! So long as each proposal is unique and meets <a href="#requirements">the requirements</a>.

### Deadline {#deadline}

The deadline for proposals is any time the day of <b>Tuesday, December 22, 2020</b>. We will follow-up with you about your submission by email.

### Requirements {#requirements}

- Proposals must be in English.
- Work must be open source with a free and permissive license.
- If published work, it must be accessible by a url.

### Selection criteria {#selection-criteria}

_Surprise us with your creativity! But here are a few selection criteria considerations (depending on the submission type some criteria might not be applicable):_

- Potential impact on broadening the staker community
- Quality of contribution to the staking tooling ecosystem
- Clarity, conciseness and organization of documentation
- Novelty in reducing the barrier of entry to staking
- Insights that lead to substantive changes in client implementations or specifications
- Analyses or visualizations that help a non-technical audience gain insight into the network
- Overall quality and clarity of data analysis or data visualization.

## Examples {#examples}

Here are some prompt questions that may help inspire you:

- _Are you building end-to-end staking guides for different clients on various platforms?_
- _Are you writing crisp, clear staking documentation?_
- _Are you teaching stakers of all levels, from beginner to advanced, through video and written tutorials?_
- _Are you building a staking wiki focused on best practices and security? What novel ways can you dream up to encourage people to contribute?_
- _Are you experimenting with sophisticated staking setups and detailing out guides/tools for the community to reproduce and understand tradeoffs?_
- _What engaging diagrams or illustrations of the Beacon Chain are you creating?_
- _How can you make it easier to retrieve live data from the Beacon Chain?_
- _What data analyses and visualizations can give stakers live insights into the network?_
- _What new staking tools are you building?_
- _How can you make a stakers life easier, more productive, or just generally more delightful?_

Other topic areas are welcome too! Be it research, testing frameworks, infographics, and so on. The point of the program is to help contribute to the long term health of the Eth2 staking and validator community. If your proposal advances this aim, tell us about it!

In addition to the prompt questions above, here's a wishlist of avenues to explore.

## Wishlist {#wishlist}

The Ethereum Foundation are interested in the following things, but don't let this restrict your creativity.

<ExpandableCard
contentPreview="Build resources that can serve as the best places for someone to go to learn about staking Ethereum."
title="Community and education">

   <p>For example:</p>

   <ul>
    <li><b>Education quickstart</b>: What are the essential things for someone new to staking to learn? What's the most effective way to deliver that information, to bring someone from "starting from scratch" to "I know how this works" in thirty minutes? – <em>For example: high quality blog posts, diagrams, illustrations, or videos for understanding Eth2 and staking</em></li>
    <li><b>End-to-end staking guides</b> for different clients on various platforms. In particular, guides that provide context and education to understand the "why" behind certain commands.</li>
    <li><b>Best practices</b> for staking safely and securely? What are the tradeoffs between different methods? – <em>Do these details change across different clients? Across different operating systems?</em></li>
    <li><b>Build a staking wiki</b> focused on best practices and security.</li>
    <li><b>Write guides</b> for safely porting validator keys between different clients.</li>
    <li><b>Experiment with sophisticated setups</b> and write guides for community to reproduce and understand the tradeoffs, for example:
      <ul>
         <li>Building on exotic hardware</li>
         <li>A validator client load balanced between multiple nodes</li>
         <li>Using a VPN to dynamically change IP every <em>N</em> days</li>
         <li>Safely porting validator keys between different clients using validator interchange format</li>
         <li>Configuring SystemD and logging for Eth2 clients (with sample configuration files) </li>
      </ul>
   </li> 
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Build tools to make staking easier."
title="Staking and validator tools">

   <p>For example:</p>

   <ul>
    <li>Dashboards, alerts or other monitoring for validators that plug into beacon node APIs.</li>
    <li>A single installer/manager for all client types that include redundancy, failure detection and auto-fallback.</li>
    <li>BLS signing and validator client integration on hardware security modules.</li>
    <li>Scripts for easily swapping node type:
      <ul>
         <li>Can this be done automatically by detecting degraded performance?</li>
      </ul>
    </li>
    <li>VC to load balancing across multiple beacon nodes using the standard API.
      <ul>
         <li>Consider having two beacon nodes (one for attestation publishing, one for proposal publishing) to try to mitigate denial of service attacks.</li>
      </ul>
   </li>
   <li>web3 library extensions for Eth2 functionality using the common <a href="https://github.com/ethereum/eth2.0-apis">Eth2-api</a>.</li>
   <li>Additional and extended Eth2 deposit/key management tooling.</li> 
   <li>Fork <a href="https://iancoleman.io/bip39/">https://iancoleman.io/bip39/</a> to support EIP2335 + EIP2334. Or, implement the same functionalities in ChainSafe's <a href="https://bls-keygen.com/">https://bls-keygen.com/</a></li>
   <li>Tool to allow validators to "sanity check" their withdrawal credentials validity.</li>
   <li>Off-the shelf solutions to make staking more secure and robust.</li>
      <ul>
         <li>Run validator client on separate hardware that is not directly connected to the Internet.</li>
         <li>Add networking fail-safe via 3G/4G connections.</li>
         <li>Develop lightweight staking hardware security models that keeps keys secure and supports a basic validator client.</li>
         <li>Standard android builds for beacon node and/or validator client.</li>
      </ul>
   <li>Decentralized validators.</li>
      <ul>
         <li>Secret shared validator implementations aimed at enhancing security of single user setups.</li>
         <li>Decentralized staking pool research and development.</li>
      </ul>
   <li>hamradio-net and other experimental network resilience projects.</li>
      <ul>
         <li>Deploy a version of p2p networking on ham radio so even in the case of ocean fiber optic cable failure the network will not become partitioned.</li>
         <li>Any other project that can increase the resilience of the Eth2 network even in the event of major global internet disruptions (satellites, mesh networks, etc)</li>
      </ul>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Analyze and visualize data to help us better understand Eth2 staking. "
title="Data analysis and visualisation">

   <p>For example:</p>
   <ul>
    <li>Consider applying <a href="https://www.notion.so/69fe10ffe83748bc87faa0e2586ba857">Medalla Data Challenge wishlist</a> ideas to Mainnet with enhanced scripts, extended analysis, or live monitoring.</li>
    <li>Simplify, through tutorials or tools, collection of network attestation data.</li>
    <li>Build support tools for live insights and visualisations into the network.</li>
    <li>Use rumor agents to analyze and/or visualize gossip subnets in real time.</li>
    <li>Build a website for visualizing/querying the validator activation and exit queue</li>
    <li>Build a website for visualizing the FFG finality process.</li>
    <li>Build a client-agnostic Eth2 fork/branch monitor to aid in debugging when difficulties arise.</li>
    <li>Build a mechanism to monitor Eth1 voting.</li>
    <li>Tips on how to access data to analyze – <em>for example: tooling for building public datasets</em>.</li>
    <li>Analyze client performance under various conditions.</li> 
  </ul>
</ExpandableCard>

## Next steps and support {#next-steps-and-support}

For any general support questions about your submission, please email [eth2+staking@ethereum.org](mailto:eth2+medalla@ethereum.org).

For technical questions about Eth2 staking, ideas or direction for proposals, and all things eth2, we invite you to head over to the community-driven [ethstaker Discord](https://invite.gg/ethstaker).

## Frequently asked questions {#faq}

<ExpandableCard
contentPreview="Anybody!"
title="Who can submit proposals for Eth2 Staking Community Grants?">

   <p>Feel free to submit as teams or individuals.</p>

</ExpandableCard>

<ExpandableCard
contentPreview="The more detailed information, the better."
title="What makes for a good proposal?">

   <p>In short, we need enough information to understand your goals, your motivation and your challenges. The more details you provide, the more likely we’ll be able to help.</p>

   <p>For example:</p>

   <ul>
    <li>Showing a clear grasp of the problem you're trying to solve</li>
    <li>Clearly identifying your project's impact and how it would help the Eth2 staking ecosystem</li>
    <li>Detailed description of your project</li>
  </ul>
</ExpandableCard>

<ExpandableCard
contentPreview="Any stage of development!"
title="What state does my idea or project need to be in?">

   <p>
    If you have an idea or project that benefits the Eth2 staking community, we want to hear about it! The goal is to support regular, consistent work that pushes forward the Eth2 staking ecosystem. 
   </p>
   <p>
    Eth2 Staking Community Grants is an open call for proposals. Which means, it's expected that some ideas or projects won't be fully shipped before the deadline, but instead require ongoing efforts. 
   </p>
</ExpandableCard>

<ExpandableCard
contentPreview="You can submit an inquiry for support through the Ecosystem support program."
title="What if I miss the deadline?">

   <p>
    The Ethereum Foundation has a general grants initiative called the <a href="https://esp.ethereum.foundation/">Ecosystem Support Program (ESP)</a>. 
   </p>
   <p>
    If you miss the deadline for this dedicated round of grants, but have a proposal related to Eth2 staking, head on over to ESP.
   </p>
</ExpandableCard>

<ExpandableCard
contentPreview="Find some great community resources within."
title="How can I learn more about Eth2?">

   <p>
    Here are some helpful resources:
   </p>

- [Eth2 Overview](/eth2/) – _ethereum.org_
- [The beacon chain](/upgrades/beacon-chain/) – _ethereum.org_
- The Genesis of a Beacon Chain — Ben Edgington [https://hackmd.io/@benjaminion/genesis](https://hackmd.io/@benjaminion/genesis)
- The Beacon Chain Ethereum 2.0 explainer — [https://ethos.dev/beacon-chain/](https://ethos.dev/beacon-chain/)
- [The State of Eth2](https://blog.ethereum.org/2020/06/02/the-state-of-eth2-june-2020/) _– Danny Ryan_
- ['Intro to Eth2 & Staking for Beginners'](https://www.youtube.com/watch?v=tpkpW031RCI) - Superphiz
- [https://old.reddit.com/r/ethstaker/wiki/studymaster](https://old.reddit.com/r/ethstaker/wiki/studymaster)
- [https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

</ExpandableCard>

<ExpandableCard
contentPreview="You need to use the dedicated launchpad product."
title="How do I start staking?">

   <p>
    If you're new to staking, we encourage you to practice first on a testnet before moving to Mainnet. Follow the steps to set up a validator on the Medalla testnet via <a href="https://medalla.launchpad.ethereum.org/">the Medalla launchpad</a>.
   </p>
   <p>
    Once you're ready for real ETH, head on over to <a href="http://launchpad.ethereum.org/">the Eth2 launchpad</a> to set up your Eth2 validator.
   </p>
   <p>
    Remember to check <a href="/staking/deposit-contract/">the deposit contract</a> address before staking any ETH.
   </p>
</ExpandableCard>

<ExpandableCard
contentPreview="Find some great community tools within."
title="Which tools should I use?">

   <p>It depends on what you're working on, but here's a non-exhaustive list of tooling:</p>

- [A non-exhaustive list of Eth2 tooling](https://notes.ethereum.org/@protolambda/eth2_tooling#Network-tooling) _– protolambda_
- [Eth2 client APIs](https://github.com/ethereum/eth2.0-apis)
- [rumor](https://github.com/protolambda/rumor) agents to analyze and/or visualize gossip subnets in real time.
  - rumor is an interactive shell to run the Eth2 network stack, attach to testnets, debug clients, and extract data for tooling.
- [wealdtech/chaind](https://github.com/wealdtech/chaind) for pulling historical state at a given node.
- [lighthouse crawler](https://github.com/pawanjay176/lighthouse) for pulling live attestation gossip seen by a Lighthouse node.
  - clone the repo and run `cargo run --release --bin crawler`
- eth2 block explorers
  - [Beaconcha.in](https://beaconcha.in/)
  - [BeaconScan](https://beaconscan.com/)
  - [BlockAction](https://medalla.blockaction.io/)

</ExpandableCard>

<ExpandableCard
contentPreview="You can stake, run clients, and join discord communities."
title="How can I get more involved in Eth2?">

   <p>
    For client information and the latest initiatives check out how to <a href="/upgrades/get-involved/">get involved in Eth2</a>.
   </p>
   <p>
    Join the following Discord communities:
   </p>
   <ul>
   <li><a href="https://discord.com/invite/VmG7Uxc">Eth R&D</a></li>
   <li><a href="https://invite.gg/ethstaker">EthStaker</a></li>
    </ul>
</ExpandableCard>

## More on Staking and Eth2 {#more-on-staking-and-eth2}

<CardContainer>
   <Card title="Staking" description="Learn more about staking. Where you can do it, what you need, and the potential risks and rewards." emoji=":money_bag:">
      <ButtonLink to="/staking/">
         More on staking
      </ButtonLink>
   </Card>
   <br />
   <Card title="The Beacon Chain" description="The Beacon Chain introduces staking and proof-of-stake to the Ethereum network. Learn more about this new piece of the ecosystem." emoji=":police_car_light:">
      <ButtonLink to="/upgrades/beacon-chain/">
         More on the Beacon Chain
      </ButtonLink>
   </Card>
</CardContainer>
