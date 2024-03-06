import fs from "fs";
import rimraf from "rimraf";
import common from "./common.js";
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const objectContructor = async (dir, fs) => {
  let files = await common.getDirectusAssets();
  
  files.forEach(async (item, num) => {
    let i = { ...item };
    let ext = i.filename_download.split('.').pop();
    i.slug = `${i.id}.${ext}`;
    console.log("ESCREVENDO IMAGEM: ", i.slug);
    const response = await axios.get(`${ process.env.DIRECTUS_IMAGE_BASE_URL }/assets/${i.id}`, {
        responseType: 'arraybuffer'
    });

    fs.writeFile(
      `${dir}/${i.slug}`,
      response.data,
      function (err) {
        if (err) console.log("error", err);
      }
    );
  });
}

const getFiles = async () => {
  
  const dir = "./public/images/directus";
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
  
}

export default getFiles
