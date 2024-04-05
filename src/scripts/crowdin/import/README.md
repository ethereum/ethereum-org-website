## Console flags

- `-b,--buckets`: Prints buckets overview and exits
- `-v,--verbose`: Prints verbose console logs
- `-f,--full`: Prints full name of buckets in summary

## Instructions for use

1. Run `yarn crowdin-clean` to initialize fresh ./.crowdin folder. This can also be used to erase contents when finished.

2a. Export/import CSV of languages ready for review:

  1. Open "Website translation board" document in ethereum.org Notion (internal only)
  2. Switch view of "Translation status by language" table to "All reviewed"
  3. Click triple-dot (...) menu in TOP right corner of the entire app
  4. Select "Export" > "Export as CSV"
    - Export format: Markdown & CSV
    - Include databases: Current view
    - Include content: No files or images
    - Include subpages: Off
    - Click "Export" > Save zip file
  5. Unzip contents into (or copy into) ./.crowdin folder in the root of this repo

2b. Alternatively, you can manually add buckets to import to the USER_OVERRIDE object below.
  1. Add the number of the corresponding content bucket to the chosen language array below
      - ie. `es: [1, 10],` would import the "Homepage" and "Learn" buckets for Spanish
  2. Save file without committing\*

- Any items in USER_OVERRIDE will override the CSV import

3. Export translated content from Crowdin and import into ./.crowdin folder:
  1. Export latest translated content from Crowdin and unzip
  2. Copy languages folder from Crowdin export to ./.crowdin
    - ie. ./.crowdin/{lang-codes}
4. Execute script:
  1. Execute script by running `yarn crowdin-import`
  2. If successful, copy `BUILD_LOCALES={langs}` output and paste in your `.env`, then build site to test results.

\*Remember: Revert any working changes to this file before committing Crowdin import

## Primary script: `main` function

Exported languages from Crowdin come as a .zip file, when unzipped contains
one folder for each language, using Crowdin language codes (which differ
slight from those used in the repo). These folders must be copied into the
root `.crowdin` folder of this repo.

A CSV containing the language buckets that have been "Reviewed" can be exported
from Crowdin to automate the process of importing the needed buckets. See
"Instructions for use" above.

You can alternatively use the USER_OVERRIDE object above to manually select buckets.

The script iterates through each language chosen, using the dictionary object
below to convert the repo lang code to the code used by Crowdin (only if
needed, defaults to same). `fs` is used to find matching language folder.

The "buckets" chosen (type number[]) are then iterated over, opening the
corresponding folder that begins with the same number string (formatted 00).

Each selected bucket folder is then iterated over, calling the
`scrapeDirectory(_path, contentSubpath, repoLangCode)` function. This function
iterates over every file contained in the working directory. If the filetype
is `.json` the file is moved to the `/src/intl/{lang}/` directory. If the
filetype is `.md` the `contentSubpath` is used to copy the file to its
correct place in `/src/content/translations/{lang}/{contentSubpath}.

If the directory item is another directory, `scrapeDirectory` is called
recursively, passing the new `_path` and `contentSubpath`. The base case for
this function is no more directory items remaining, and returns void.
