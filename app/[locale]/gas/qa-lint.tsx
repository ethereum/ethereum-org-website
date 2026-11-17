import { join } from "path"

import { getEventTypes } from "@/data-layer/fetchers/fetchEvents"

export const qaEventTypes = getEventTypes

export const QaImg = () => <img src="/qa.png" alt="" />
