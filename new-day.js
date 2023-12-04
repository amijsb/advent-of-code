const fs = require("fs");
const path = require("path");

if (process.argv.length !== 4) {
  console.error("Wrong input format! Try this: npm run new-day 2022 day-01");
  return;
}

const arguments = process.argv.slice(2);

const year = arguments[0];
const day = arguments[1];

const app = fs
  .readFileSync(path.join(__dirname, `templates/app.ts`), "utf-8")
  .replaceAll("%%DAY%%", day)
  .replaceAll("%%YEAR%%", year);
const part01 = fs.readFileSync(path.join(__dirname, `templates/01.ts`), "utf-8");
const part02 = fs.readFileSync(path.join(__dirname, `templates/02.ts`), "utf-8");

const createNewDay = (year, day) => {
  fs.mkdir(path.join(__dirname, `input/${year}/${day}`), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }

    fs.writeFile(
      path.join(__dirname, `input/${year}/${day}/input.txt`),
      "[insert input]",
      (err) => {
        if (err) {
          return console.error(err);
        }
      },
    );

    fs.writeFile(
      path.join(__dirname, `input/${year}/${day}/test-input.txt`),
      "[insert test input]",
      (err) => {
        if (err) {
          return console.error(err);
        }
      },
    );
  });

  fs.mkdir(path.join(__dirname, `src/${year}/${day}`), { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }

    fs.writeFile(path.join(__dirname, `src/${year}/${day}/01.ts`), part01, (err) => {
      if (err) {
        return console.error(err);
      }
    });

    fs.writeFile(path.join(__dirname, `src/${year}/${day}/02.ts`), part02, (err) => {
      if (err) {
        return console.error(err);
      }
    });
  });

  fs.writeFile(path.join(__dirname, `src/app.ts`), app, (err) => {
    if (err) {
      return console.error(err);
    }
  });

  console.log(`Created ${year}/${day} for you!`);
};

createNewDay(year, day);
