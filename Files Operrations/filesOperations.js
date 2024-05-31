const fsPromise = require('fs').promises;
const path = require('path');


process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught exception: ${err} `);
  process.exit(1);
});

const filesOps = async () => {
  try {
    await fsPromise.writeFile(path.join(__dirname, 'test.txt'), 'I am the new Text😜😜');
    console.log('✔ Write was successful');
    // Read File
    const data = await fsPromise.readFile(path.join(__dirname, 'test.txt'), { encoding: 'utf8' });
    console.log(`The Data in the file is ${data}`);

    // Write File
    await fsPromise.writeFile(path.join(__dirname, 'test.txt'), 'I am the new Text😜😜');
    console.log('✔ Write was successful');

    // Aapend data
    await fsPromise.appendFile(path.join(__dirname, 'test.txt'), '\nMore data appended ');
    console.log('✔ Append was successful');

    //rename  the file
    await fsPromise.rename(path.join(__dirname, 'test.txt'), path.join(__dirname, 'renamed.txt'));
    console.log('✔ Rename was successful');
  } catch (error) {
    console.error('Error:', error);
  }
};

filesOps();
