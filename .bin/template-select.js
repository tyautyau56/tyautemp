#!/usr/bin/env node

const inquirer = require('inquirer');
const { execSync, spawnSync} = require('child_process');
const path = require('path');
const clear = require('clear');
const rimraf = require('rimraf');
const logSymbols = require('log-symbols');
const chalk = require('chalk');

function check(cmd) {
    try{
        execSync(cmd, {
            stdio: "ignore"
        });
        return true;
    }catch (err) {
        return false;
    }
}

if (!check("git --version")) {
    console.log("git is not installed.");
    process.exit(1);
}

clear();

let select_template_url = null;
let select_package_manager = null;
let select_project_name = null;
const current = "./";

const detail = [
    {
        "name": "next-template",
        "url": "https://github.com/tyautyau56/next-template.git"
    },
    {
        "name": "react-template",
        "url": "https://github.com/tyautyau56/react-template.git"
    },
    {
        "name": "wasm-template",
        "url": null
    }
]

const package_detail = [
    {
        "name": "yarn",
        "cmd": "yarn",
        "args": [
            "install",
            "--cwd"
        ]
    },
    {
        "name": "npm",
        "cmd": "npm",
        "args": [
            "i",
            "--prefix"
        ]
    }
]

inquirer.prompt([
    {
        name: "dir_name",
        message: "What's your project name?"
    },
    {
        name: "select_template",
        type: "list",
        message: "Choose the template you want to use.",
        choices: ["next-template", "react-template", "wasm-template"]
    },
    {
        name: "select_package",
        type: "list",
        message: "Choose the package manager you want to use.",
        choices: ["yarn", "npm"]
    }
]).then(({dir_name, select_template, select_package}) => {
    let match_template = detail.filter(function (item) {
        if (item.name === select_template) return true;
    });
    select_template_url = match_template[0].url;
    select_package_manager = select_package;
    select_project_name = dir_name;
    try {
        run('git', ['clone', '--no-tags', '--depth', '1', select_template_url, select_project_name]);
        console.log(logSymbols.success, "Finished clone git repository!");
    }catch (e) {
        console.error(e);
    }
    rmGitDir(select_project_name, gitDir);
    console.log(logSymbols.success, "Finished remove git folder!");
    try{
        run(select_package_manager, sort_args(select_package_manager, select_project_name));
        console.log(logSymbols.success, "Finished install packages!");
        success();
    }catch (err) {
        console.error(err);
        rimraf.sync(path.join(current, select_project_name));
    }
});

function run(cmd, args, opts) {
    const output = spawnSync(cmd, args, opts);

    if (output.error) {
        throw output.error;
    }

    if (output.status !== 0) {
        throw new Error();
    }
}

const gitDir = ".git"

function rmGitDir(dirName, gitDir) {
    rimraf.sync(path.join(dirName, gitDir))
}

function sort_args(package_name, project_path) {
    let match_package = package_detail.filter(function (item) {
        if (item.name === package_name) return true;
    });
    let args = match_package[0].args;
    args.push(path.join(project_path));
    return args;
}

function success() {
    console.log();
    console.log(chalk.cyan("success!!"));
    console.log();
    console.log();
    console.log(chalk.cyan.bold(`cd ${select_project_name}`));
    console.log(chalk.cyan.bold(`${select_package_manager} start`));
    console.log();
}
