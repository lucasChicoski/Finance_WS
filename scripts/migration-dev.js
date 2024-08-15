var shell = require('shelljs');
var scanf = require('scanf')

console.log('Inserir nome migration: ');
const name_migration = scanf('%s')

shell.exec(`npx prisma migrate dev --name ${name_migration}`)