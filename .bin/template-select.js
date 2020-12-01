#!/usr/bin/env node

//TODO: make command line tool via node

const inquirer = require('inquirer');
const { execSync, spawnSync} = require("child_process");

let select_template_url = null;
let select_package_manager = null;
let select_project_name = null;

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
]).then(({dir_name, select_template, select_package})=> {
    let match = detail.filter(function (item) {
        if (item.name === select_template) return true;
    });
    select_template_url = match[0].url;
    select_package_manager = select_package;
    select_project_name = dir_name;
});




