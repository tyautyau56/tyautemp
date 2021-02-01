#!/usr/bin/env node

const inquirer = require('inquirer');
const { execSync, spawnSync} = require('child_process');
const path = require('path');
const clear = require('clear');
const rimraf = require('rimraf');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const emoji = require('node-emoji');

function check(cmd: string) {
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
    console.log("git is not installed");
    process.exit(1);
}

clear();
console.log(check("git --version"));