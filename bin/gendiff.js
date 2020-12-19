#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index.js';

program.arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('123', '', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });

program.parse(process.argv);
