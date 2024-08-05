#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';

import { login } from './auth.service';
import { addCar, deleteCar, getCar, getCars, updateCar } from './cars.service';

const program = new Command();

program
  .command('login')
  .description('Login to the application')
  .action(async () => {
    const questions: any = [
      { type: 'input', name: 'login', message: 'Login:' },
      { type: 'password', name: 'password', message: 'Password:' },
    ];
    const answers = await inquirer.prompt(questions);
    await login(answers.login, answers.password);
  });

program
  .command('list')
  .description('Get cars with optional filters')
  .option('-f, --filters <filters>', 'Filter options')
  .action(async (cmdObj) => {
    const filters: Record<string, 'asc' | 'desc'> = cmdObj.filters
      ? cmdObj.filters.split(' ').reduce((result: any, option: any) => {
          const [key, sort] = option.split(':');
          result[key] = sort;
          return result;
        }, {})
      : null;
    await getCars(filters);
  });

program
  .command('get')
  .description('Get car by ID')
  .action(async (id) => {
    await getCar(id);
  });

program
  .command('add')
  .description('Add car')
  .action(async (id) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'brand',
        message: 'Brand:',
        require: true,
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name:',
        require: true,
      },
      {
        type: 'input',
        name: 'yearOfManufacture',
        message: 'Year of Manufacture:',
        require: true,
      },
      {
        type: 'input',
        name: 'price',
        message: 'Price:',
        require: true,
      },
    ] as any);
    const car: Record<string, any> = {};
    if (answers.brand) car.brand = answers.brand;
    if (answers.name) car.name = answers.name;
    if (answers.yearOfManufacture)
      car.yearOfManufacture = Number.parseInt(answers.yearOfManufacture);
    if (answers.price) car.price = Number.parseInt(answers.price);
    await addCar(car);
  });

program
  .command('update <id>')
  .description('Update car by ID')
  .action(async (id) => {
    const answers = await inquirer.prompt([
      { type: 'input', name: 'brand', message: 'Brand (leave empty to skip):' },
      { type: 'input', name: 'name', message: 'Name (leave empty to skip):' },
      {
        type: 'input',
        name: 'yearOfManufacture',
        message: 'Year of Manufacture (leave empty to skip):',
      },
      { type: 'input', name: 'price', message: 'Price (leave empty to skip):' },
    ] as any);
    const updateData: Record<string, any> = {};
    if (answers.brand) updateData.brand = answers.brand;
    if (answers.name) updateData.name = answers.name;
    if (answers.yearOfManufacture)
      updateData.yearOfManufacture = Number.parseInt(answers.yearOfManufacture);
    if (answers.price) updateData.price = Number.parseInt(answers.price);
    await updateCar(id, updateData);
  });

program
  .command('delete <id>')
  .description('Delete car by ID')
  .action(async (id) => {
    await deleteCar(id);
  });

program.parse(process.argv);
