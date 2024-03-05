import fs from "fs";
import rimraf from "rimraf";
import common from "./common.js";

const objectContructor = async (dir, fs) => {
  let banner = await common.getDirectusData("bannerDestaque");
  
  let i = { ...banner };
  i.slug = common.slugify(banner.titulo);
  i.imagem = await common.getImage(banner.imagem.id);

  fs.writeFile(
    `${dir}/${i.slug}.json`,
    JSON.stringify(i),
    function (err) {
      if (err) console.log("error", err);
    }
  );
  console.log("ESCREVENDO BANNER DESTAQUE: ", i.slug + ".json");
}

const getBannerDestaque = async () => {
  
  const dir = "./content/banner-destaque";
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

export default getBannerDestaque
