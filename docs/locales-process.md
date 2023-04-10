# Locales generation process

Every time `yarn build` or `yarn start` is executed, the following process is
going to be triggered as well:

<img src="./locales.png">

With this process, we reduce the amount of text we bundle on each page since we
are querying only the necessary translations that each page needs.
