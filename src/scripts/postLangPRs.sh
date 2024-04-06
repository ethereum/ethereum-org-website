LANGUAGES=($(jq -r '.[].code' i18n.config.json))
MONTH=$(date +%B | tr '[:upper:]' '[:lower:]')
TIMESTAMP=$(date +'%Y%m%d%H%M%S')
STARTING_BRANCH=$(git rev-parse --abbrev-ref HEAD)

for lang in "${LANGUAGES[@]}"; do
  if [[ $(git status -s | grep -E "\/$lang\/" | wc -l) -eq 0 ]]; then continue; fi
  BRANCH_NAME="$MONTH-$lang-$TIMESTAMP"
  MESSAGE="chore: import translations for $lang"
  git checkout -b $BRANCH_NAME;
  git reset .
  git add public/content/translations/$lang;
  git add src/intl/$lang;
  git commit -m "$MESSAGE";
  # git push origin $BRANCH_NAME;

  SUMMARY_PATH="src/data/crowdin/import-summary.json"
  SUMMARY_JSON=$(cat $SUMMARY_PATH)
  VALUES=$(echo $SUMMARY_JSON | jq -r ".$lang[]")
  if [[ -z "$VALUES" ]]; then
    VALUES="No issues found"
  fi

  echo "## Description" > pr_body.txt;
  echo "This PR was automatically created to import Crowdin translations." >> pr_body.txt;
  echo "This workflows runs on the first of every month at 16:20 (UTC)." >> pr_body.txt;
  echo "" >> pr_body.txt;
  echo "Thank you to everyone contributing to translate ethereum.org ❤️" >> pr_body.txt;
  echo "" >> pr_body.txt;
  echo "## Markdown checker alerts" >> pr_body.txt;
  echo "$VALUES" >> pr_body.txt;

  # gh auth login --with-token ${{ secrets.GITHUB_TOKEN }};
  # gh pr create \
  #   --base dev \
  #   --head $BRANCH_NAME \
  #   --title $MESSAGE \
  #   --body-file pr_body.txt;

  rm pr_body.txt;
  git checkout $STARTING_BRANCH;
done;

rm $SUMMARY_PATH
