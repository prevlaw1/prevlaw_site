import fs from "fs";
import rimraf from "rimraf";
import common from "./common.js";

const objectContructor = async (dir, fs) => {
  let peticoes = await common.getDirectusData("carrosselHome");
  
  peticoes.forEach(async (item, num) => {
    let i = { ...item };
    i.slug = item.id;
    i.capa = i.capa ? await common.getImage(item.capa.id): null;
    if(item.publicacao) {
      i.publicacao.capa = await common.getImage(i.publicacao.capa)
      i.publicacao.slug = common.slugify(i.publicacao.titulo)
    } else if (item.beneficio) {
      i.beneficio.capa = await common.getImage(i.beneficio.capa)
      i.beneficio.slug = common.slugify(i.beneficio.titulo)
    } else if (item.revisao) {
      i.revisao.capa = await common.getImage(i.revisao.capa)
      i.revisao.slug = common.slugify(i.revisao.titulo)
    }

    fs.writeFile(
      `${dir}/${i.slug}.json`,
      JSON.stringify(i),
      function (err) {
        if (err) console.log("error", err);
      }
    );
    console.log("ESCREVENDO REEL: ", i.slug + ".json");
  });
}

const getCarrosselHome = async () => {
  
  const dir = "./content/reel";
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

export default getCarrosselHome
