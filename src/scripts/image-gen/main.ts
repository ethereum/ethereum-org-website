/**
 * Image generation via OpenRouter, with cutout/full-bleed post-processing.
 *
 *   pnpm tsx src/scripts/image-gen/main.ts models [--filter <text>]
 *   pnpm tsx src/scripts/image-gen/main.ts generate --type cutout|full-bleed --prompt-file <f> [--ref <img>]... [options]
 *   pnpm tsx src/scripts/image-gen/main.ts process <input> --type cutout|full-bleed --out <file> [options]
 *
 * Workflow and conventions: .claude/skills/image-gen/SKILL.md
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { parseArgs } from "node:util"
import sharp from "sharp"

import {
  enumValues,
  fetchModels,
  generate,
  type ImageModel,
  rangeMax,
  scrub,
} from "./openrouter"
import { type ImageType, KEY_HEX, type KeyColor, processImage } from "./process"

const DEFAULT_MODEL = "google/gemini-3-pro-image"

const fail = (msg: string): never => {
  console.error(scrub(msg))
  process.exit(1)
}

const asType = (v: string | undefined): ImageType =>
  v === "cutout" || v === "full-bleed"
    ? v
    : fail("--type must be `cutout` or `full-bleed`")

const asKey = (v: string | undefined): KeyColor =>
  v === "green" || v === "magenta"
    ? v
    : fail("--key-color must be `green` or `magenta`")

const promptSuffix = (type: ImageType, transparent: boolean, key: KeyColor) => {
  if (type === "full-bleed") {
    return "Full-bleed composition: the scene continues edge to edge on all four sides. No border, frame, vignette, rounded corners, letterboxing or blank margin."
  }
  const margin =
    "The entire subject, including every extremity, sits well inside the frame with generous empty margin (at least 10% of the frame) on all four sides. Nothing touches or is cropped by any edge."
  if (transparent)
    return `Isolated subject on a fully transparent background. ${margin}`
  return `Isolated subject on a perfectly flat, uniform pure ${KEY_HEX[key]} chroma-key background: no gradient, floor, cast shadow or reflection on the background. ${margin} Do not use ${key} or any shade close to ${KEY_HEX[key]} anywhere in the subject.`
}

const EXT: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
}

const encodeRef = async (path: string) => {
  const buf = await sharp(path)
    .resize(2048, 2048, { fit: "inside", withoutEnlargement: true })
    .png()
    .toBuffer()
  return `data:image/png;base64,${buf.toString("base64")}`
}

const pick = (
  model: ImageModel,
  param: string,
  value: string | undefined
): string | undefined => {
  if (!value) return undefined
  const allowed = enumValues(model, param)
  if (!allowed) {
    console.warn(
      `note: ${model.id} has no \`${param}\` option; ignoring ${value}`
    )
    return undefined
  }
  if (!allowed.includes(value)) {
    fail(`${model.id} ${param} must be one of: ${allowed.join(", ")}`)
  }
  return value
}

const describeModel = (m: ImageModel) => {
  const p = (k: string) => enumValues(m, k)?.join("|")
  return [
    m.id,
    `  aspect: ${p("aspect_ratio") ?? "-"}`,
    `  resolution: ${p("resolution") ?? "-"}  quality: ${p("quality") ?? "-"}`,
    `  background: ${p("background") ?? "-"}  n<=${rangeMax(m, "n") ?? 1}  refs<=${rangeMax(m, "input_references") ?? 0}`,
  ].join("\n")
}

const cmdModels = async (argv: string[]) => {
  const { values } = parseArgs({
    args: argv,
    options: { filter: { type: "string" } },
  })
  const models = await fetchModels()
  const f = values.filter?.toLowerCase()
  for (const m of models) {
    if (!f || m.id.toLowerCase().includes(f)) console.log(describeModel(m))
  }
}

const cmdGenerate = async (argv: string[]) => {
  const { values } = parseArgs({
    args: argv,
    options: {
      type: { type: "string" },
      prompt: { type: "string" },
      "prompt-file": { type: "string" },
      ref: { type: "string", multiple: true, default: [] },
      model: { type: "string", default: DEFAULT_MODEL },
      aspect: { type: "string", default: "1:1" },
      resolution: { type: "string" },
      quality: { type: "string" },
      n: { type: "string", default: "1" },
      "key-color": { type: "string", default: "green" },
      "out-dir": { type: "string" },
      name: { type: "string", default: "image" },
      pad: { type: "string", default: "0.02" },
      "max-size": { type: "string" },
      "dry-run": { type: "boolean", default: false },
    },
  })
  const type = asType(values.type)
  const key = asKey(values["key-color"])
  const userPrompt =
    values.prompt ??
    (values["prompt-file"]
      ? readFileSync(values["prompt-file"], "utf8").trim()
      : "")
  if (!userPrompt) fail("Provide --prompt or --prompt-file")
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(values.name)) {
    fail("--name must be kebab-case")
  }
  const n = Number(values.n)
  if (!Number.isInteger(n) || n < 1) fail("--n must be a positive integer")

  const models = await fetchModels()
  const model =
    models.find((m) => m.id === values.model) ??
    fail(
      `Unknown image model ${values.model}. Run \`pnpm tsx src/scripts/image-gen/main.ts models\`.`
    )

  const missing = values.ref.filter((p) => !existsSync(p))
  if (missing.length) fail(`Reference not found: ${missing.join(", ")}`)
  const maxRefs = rangeMax(model, "input_references") ?? 0
  if (values.ref.length > maxRefs) {
    fail(`${model.id} accepts at most ${maxRefs} reference images`)
  }
  const transparent =
    type === "cutout" &&
    !!enumValues(model, "background")?.includes("transparent")
  const prompt = `${userPrompt}\n\n${promptSuffix(type, transparent, key)}`

  const perCall = Math.min(n, rangeMax(model, "n") ?? 1)
  const body: Record<string, unknown> = {
    model: model.id,
    prompt,
    aspect_ratio: pick(model, "aspect_ratio", values.aspect),
    // 2K by default where offered; Gemini otherwise falls back to 1K
    resolution: pick(
      model,
      "resolution",
      values.resolution ??
        (enumValues(model, "resolution")?.includes("2K") ? "2K" : undefined)
    ),
    quality: pick(model, "quality", values.quality),
    ...(transparent && { background: "transparent", output_format: "png" }),
    ...(perCall > 1 && { n: perCall }),
  }

  if (values["dry-run"]) {
    console.log(
      JSON.stringify({ ...body, input_references: values.ref }, null, 2)
    )
    console.log(
      `calls: ${Math.ceil(n / perCall)}  cutout via: ${transparent ? "native alpha" : type === "cutout" ? `${key} key` : "-"}`
    )
    return
  }

  if (values.ref.length) {
    body.input_references = await Promise.all(
      values.ref.map(async (p) => ({
        type: "image_url",
        image_url: { url: await encodeRef(p) },
      }))
    )
  }

  // Outside the repo and any session scratchpad, so every candidate survives across
  // iterations and sessions. Numbering continues past existing files; nothing is overwritten.
  const outDir = values["out-dir"] ?? join(tmpdir(), "image-gen", values.name)
  mkdirSync(outDir, { recursive: true })
  const taken = readdirSync(outDir)
    .map((f) => f.match(new RegExp(`^${values.name}-(\\d+)[.-]`))?.[1])
    .filter(Boolean)
    .map(Number)
  let index = Math.max(0, ...taken)
  const maxSize = values["max-size"] ? Number(values["max-size"]) : undefined
  const meta = {
    model: model.id,
    type,
    cutout: transparent
      ? "native-alpha"
      : type === "cutout"
        ? `${key}-key`
        : null,
    params: { ...body, input_references: undefined },
    prompt,
    refs: values.ref,
  }
  let cost = 0

  for (let made = 0; made < n; ) {
    const res = await generate({
      ...body,
      ...(perCall > 1 && { n: Math.min(perCall, n - made) }),
    })
    const callCost = res.usage?.cost ?? 0
    cost += callCost
    if (!res.data?.length) fail("Response contained no images")
    for (const img of res.data) {
      made++
      index++
      const stem = join(outDir, `${values.name}-${index}`)
      const raw = `${stem}-raw.${EXT[img.media_type ?? "image/png"] ?? "png"}`
      const buf = Buffer.from(img.b64_json, "base64")
      writeFileSync(raw, buf)
      let output = `${stem}.png`
      let issues: string[]
      try {
        ;({ issues } = await processImage(buf, output, {
          type,
          keyColor: key,
          nativeAlpha: transparent,
          pad: Number(values.pad),
          maxSize,
        }))
      } catch (e) {
        output = ""
        issues = [(e as Error).message]
      }
      writeFileSync(
        `${stem}.json`,
        JSON.stringify(
          {
            createdAt: new Date().toISOString(),
            ...meta,
            callCostUsd: callCost,
            raw,
            output,
            issues,
          },
          null,
          2
        )
      )
      console.log(`${issues.length ? "CHECK" : "ok"}  ${output || raw}`)
      for (const issue of issues) console.log(`      ${issue}`)
    }
  }

  console.log(`cost: $${cost.toFixed(4)}  archive: ${outDir}`)
}

const cmdProcess = async (argv: string[]) => {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      type: { type: "string" },
      out: { type: "string" },
      "key-color": { type: "string", default: "green" },
      "native-alpha": { type: "boolean", default: false },
      pad: { type: "string", default: "0.02" },
      "max-size": { type: "string" },
    },
  })
  const input = positionals[0] ?? fail("Missing input image")
  const out = values.out ?? fail("Missing --out")
  const { issues } = await processImage(input, out, {
    type: asType(values.type),
    keyColor: asKey(values["key-color"]),
    nativeAlpha: values["native-alpha"],
    pad: Number(values.pad),
    maxSize: values["max-size"] ? Number(values["max-size"]) : undefined,
  })
  console.log(`${issues.length ? "CHECK" : "ok"}  ${out}`)
  for (const issue of issues) console.log(`      ${issue}`)
}

const [cmd, ...rest] = process.argv.slice(2)
const commands: Record<string, (argv: string[]) => Promise<void>> = {
  models: cmdModels,
  generate: cmdGenerate,
  process: cmdProcess,
}

;(
  commands[cmd] ?? (() => fail("Usage: main.ts <models|generate|process> ..."))
)(rest).catch((e: Error) => fail(e.message))
