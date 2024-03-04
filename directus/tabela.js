import fs from "fs";
import rimraf from "rimraf";
import common from "./common.js";

const objectContructor = async (dir, fs) => {
  let peticoes = await common.getDirectusData("tabela");
  
  peticoes.forEach(async (item, num) => {
    let i = { ...item };
    i.slug = common.slugify(item.titulo);
    let regex = /http:\/\/143\.198\.106\.178\/{0,2}\/assets/g;
    i.tabela = item.tabela.replace(regex, 'https://143.198.106.178/assets')

    fs.writeFile(
      `${dir}/${i.slug}.json`,
      JSON.stringify(i),
      function (err) {
        if (err) console.log("error", err);
      }
    );
    console.log("ESCREVENDO TABELA: ", i.slug + ".json");
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
