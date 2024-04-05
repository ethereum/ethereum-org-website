import { resolve } from "path"

export const DOT_CROWDIN = ".crowdin"

export const CROWDIN_DATA_DIR = "src/data/crowdin"
export const SAVE_FILE = "download.zip"
export const FILE_PATH = resolve(CROWDIN_DATA_DIR, SAVE_FILE)

export const SUMMARY_SAVE_FILE = "import-summary.json"
export const SUMMARY_PATH = resolve(CROWDIN_DATA_DIR, SUMMARY_SAVE_FILE)
