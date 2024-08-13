import fs from "fs";
import rimraf from "rimraf";
import common from "./common.js";

const objectContructor = async (dir, fs) => {
  let termos = await common.getDirectusData("termos");
  
  let i = { ...termos };
  i.slug = common.slugify(termos.titulo);

  fs.writeFile(
    `${dir}/${i.slug}.json`,
    JSON.stringify(i),
    function (err) {
      if (err) console.log("error", err);
    }
  );
  console.log("ESCREVENDO TERMOS: ", i.slug + ".json");
}

const getTermos = async () => {
  
  const dir = "./content/termos";
  if (fs.existsSync(dir)) {
    rimraf(dir, async () => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          objectContructor(dir, fs);
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dir);
    fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        objectContructor(dir, fs);
      }
    });
  }
}

export default getTermos
