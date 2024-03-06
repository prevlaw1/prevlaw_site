import fs from "fs";
import rimraf from "rimraf";
import common from "./common.js";

const objectContructor = async (dir, fs) => {
  let peticoes = await common.getDirectusData("tabela");
  
  peticoes.forEach(async (item, num) => {
    let i = { ...item };
    i.slug = common.slugify(item.titulo);
    common.replaceImageUrls(i.tabela).then(result => {
      i.tabela = result;
      fs.writeFile(
        `${dir}/${i.slug}.json`,
        JSON.stringify(i),
        function (err) {
          if (err) console.log("error", err);
        }
      );
      console.log("ESCREVENDO TABELA: ", i.slug + ".json");
    }).catch(err => {
      console.error(err);
    });
  });
}

const getTabelas = async () => {
  
  const dir = "./content/tabelas";
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

export default getTabelas
