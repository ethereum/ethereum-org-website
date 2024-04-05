LANGUAGES=($(jq -r '.[].code' i18n.config.json))
MONTH=$(date +%B | tr '[:upper:]' '[:lower:]')

for lang in "${LANGUAGES[@]}"; do
  if [[ $(git status -s | grep -E "\/$lang\/" | wc -l) -eq 0 ]]; then continue; fi

  BRANCH_NAME="crowdin-import-$MONTH-$lang"
  MESSAGE="chore: i18n import for $lang"

  git checkout -b $BRANCH_NAME origin/dev
  git add public/content/translations/$lang
  git add src/intl/$lang
  # git commit -m $MESSAGE
  # git push origin $BRANCH_NAME


  SUMMARY_JSON="src/data/crowdin/import-summary.json"
  VALUES=$(echo $(cat $SUMMARY_JSON) | jq -r ".$lang[]")
  if [[ -z "$VALUES" ]]; then
    VALUES="No issues found"
  fi

  echo "## Description" > pr_body.txt
  echo "This PR was automatically created to import Crowdin translations." >> pr_body.txt
  echo "This workflows runs on the first of every month at 16:20 (UTC)." >> pr_body.txt
  echo "" >> pr_body.txt
  echo "Thank you to everyone contributing to translate ethereum.org ❤️" >> pr_body.txt
  echo "" >> pr_body.txt
  echo "## Markdown checker alerts" >> pr_body.txt
  echo "$VALUES" >> pr_body.txt

  # gh auth login --with-token ${{ secrets.GITHUB_TOKEN }}
  # gh pr create \
  #   --base dev \
  #   --head $BRANCH_NAME
  #   --title $MESSAGE
  #   --body-file pr_body.txt

  rm pr_body.txt
  rm $SUMMARY_JSON
done
