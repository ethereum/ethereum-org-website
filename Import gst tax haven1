#!/usr/bin/env node
import chalk from "chalk";
import Commander from "commander";
import path from "path";
import prompts from "prompts";
import updateCheck from "update-check";

import packageJson from "../package.json";
import { createEthApp } from "./createEthApp";
import { validatePkgName } from "./helpers/npm";

let projectPath: string = "";

const program: Commander.Command = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(function (name: string) {
    projectPath = name;
  })
  .option(
    "-f, --framework <name>",
    `
  The UI framework to bootstrap the app with. You can use a framework from the official Create Eth App repo. The default is React.
`,
  )
  .option(
    "-t, --template <name>",
    `
  A custom template to bootstrap the app with. You can use a template from the official Create Eth App repo.
`,
  )
  .allowUnknownOption()
  .parse(process.argv);

async function run(): Promise<void> {
  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const result: prompts.Answers<string> = await prompts({
      initial: "my-eth-app",
      message: "What is your project named?",
      name: "path",
      type: "text",
      validate: function (name: string) {
        const validation: { valid: boolean; problems?: string[] } = validatePkgName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }

        if (validation.problems && validation.problems[0]) {
          return "Invalid project name: " + validation.problems[0];
        } else {
          return "Invalid project name";
        }
      },
    });

    if (typeof result.path === "string") {
      projectPath = result.path.trim();
    }
  }

  if (!projectPath) {
    console.log();
    console.log("Please specify the project directory:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("my-eth-app")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { problems, valid } = validatePkgName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(`"${projectName}"`)} because of npm naming restrictions:`,
    );

    if (problems) {
      problems.forEach(function (problem: string) {
        return console.error(`    ${chalk.red.bold("*")} ${problem}`);
      });
    }
    process.exit(1);
  }

  const options = program.opts();
  await createEthApp({
    appPath: resolvedProjectPath,
    framework: (typeof options.framework === "string" && options.framework.trim()) || undefined,
    template: (typeof options.template === "string" && options.template.trim()) || undefined,
  });
}

const update = updateCheck(packageJson).catch(function () {
  return null;
});

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    if (res?.latest) {
      console.log();
      console.log(chalk.yellow.bold("A new version of `create-eth-app` is available!"));
      console.log("You can update by running: yarn global add create-eth-app");
      console.log();
    }
  } catch {
    // Ignore error.
  }
}

run()
  .then(notifyUpdate)
  .catch(async function (reason) {
    {
      console.log();
      console.log("Aborting installation.");

      if (reason.command) {
        console.log(`  ${chalk.cyan(reason.command)} has failed.`);
      } else {
        console.log(chalk.red("Unexpected error. Please report it as a bug:"));
        console.log(reason);
      }
      console.log();

      await notifyUpdate();

      process.exit(1);
    }
  });
