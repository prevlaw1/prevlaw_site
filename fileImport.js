const fs = require("fs");
const axios = require("axios");
var rimraf = require("rimraf");
require("dotenv").config({ path: "./.env" });
const server = process.env["BASE_URL"] ? process.env["BASE_URL"] : "";
const token = process.env["ACCESS_TOKEN"] ? process.env["ACCESS_TOKEN"] : "";
const space = process.env["SPACE_ID"] ? process.env["SPACE_ID"] : "";

const contentfulClient = require('contentful');
const { html } = require("parse5");
const { DOMParser } = require('xmldom');
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: space,
  accessToken: token,
};
const contentful = contentfulClient.createClient(config);


const generator = async () => {

  //BUILDING AUTHORS
  const authorDir = "./content/autores";
  manageFolder(authorDir);
  let authors;
  await axios
    .get(`${server}/spaces/${space}/entries/?content_type=person`, {
      params: {
        access_token:token
      }
    })
    .then(async (ret) => {
      console.log("CONECTADO COM AUTHORS");
      authors = ret.data.items;
      authors.forEach(async element => {
        let author = element.fields
        let authorClean ={
          name: author.name,
          slug: slugify(author.name),
          cargo: author.cargo,
          picture: await getImage(author.picture.sys.id),
          desde: author.colunistaDesde,
          bio: author.bio,
          url: author.linkedIn
        }
        fs.access(authorDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
          if (err) {
            console.log(err);
          } else {
            await writeFile(authorDir, authorClean);
          }
        });
      });
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

    //BUILDING SUBCATEGORIAS
    const scDir = "./content/subcategorias";
    manageFolder(scDir);
    let sc;
    await axios
      .get(`${server}/spaces/${space}/entries/?content_type=subcategoria`, {
        params: {
          access_token:token
        }
      })
      .then(async (ret) => {
        console.log("CONECTADO COM SUBCATEGORIAS");
        sc = ret.data.items;
        sc.forEach(async element => {
          let fields = element.fields
          let category = await getEntry(fields.categoria.sys.id);
          let subcategoria ={
            name: fields.titulo,
            slug: slugify(fields.titulo),
            category: slugify(category.titulo),
          }
          fs.access(scDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
            if (err) {
              console.log(err);
            } else {
              await writeFile(scDir, subcategoria);
            }
          });
        });
      })
      .catch((err) => {
        console.log("ERRO -> ", err);
      });

      //BUILDING CATEGORIAS
      const catDir = "./content/categorias";
      manageFolder(catDir);
      let categories;
      await axios
        .get(`${server}/spaces/${space}/entries/?content_type=categoria`, {
          params: {
            access_token:token
          }
        })
        .then(async (ret) => {
          console.log("CONECTADO COM CATEGORIAS");
          categories = ret.data.items;
          categories.forEach(async element => {
            let fields = element.fields
            let categoria ={
              name: fields.titulo,
              slug: slugify(fields.titulo),
              capa: await getImage(fields.capa.sys.id)
            }
            fs.access(catDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
              if (err) {
                console.log(err);
              } else {
                await writeFile(catDir, categoria);
              }
            });
          });
        })
        .catch((err) => {
          console.log("ERRO -> ", err);
        });

  // BUILDING UPDATES
  const pubDir = "./content/publicacoes";
  manageFolder(pubDir);
  let updates;
  await axios
    .get(`${server}/spaces/${space}/entries/?content_type=publicacao`, {
      params: {
        access_token:token
      }
    })
    .then(async (ret) => {
      console.log("CONECTADO COM PUBLICACOES");
      updates = ret.data.items;
      updates.forEach(async element => {
        let fields = element.fields;
        let author = await getEntry(fields.autor.sys.id);
        let category = await getEntry(fields.categoria.sys.id);
        let conteudo = await fetchRichTextData(fields.conteudo);
        let firstParagraph = '';
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(conteudo, 'text/html');
        const paragraphs = htmlDoc.getElementsByTagName('p');
        if (paragraphs.length > 0) {
          firstParagraph = paragraphs[0].textContent.trim();
        }
        let update = {
          slug: slugify(fields.titulo),
          title: fields.titulo,
          tagline: fields.tagline,
          author: slugify(author.name),
          date: fields.data,
          cover: await getImage(fields.capa.sys.id),
          category: slugify(category.titulo),
          content: conteudo,
          excerpt: firstParagraph,
          type: 'noticias'
        }
        fs.access(pubDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
          if (err) {
            console.log(err);
          } else {
            await writeFile(pubDir, update);
          }
        });
      });
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

    // BUILDING BENEFICIOS
    const benDir = "./content/beneficios";
    manageFolder(benDir);
    let beneficios;
    await axios
      .get(`${server}/spaces/${space}/entries/?content_type=beneficios`, {
        params: {
          access_token:token
        }
      })
      .then(async (ret) => {
        console.log("CONECTADO COM BENEFICIOS");
        beneficios = ret.data.items;
        beneficios.forEach(async element => {
          let fields = element.fields;
          let author = await getEntry(fields.autor.sys.id);
          let category = await getEntry(fields.categoria.sys.id);
          let conteudo = await fetchRichTextData(fields.conteudo);
          let firstParagraph = '';
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(conteudo, 'text/html');
          const paragraphs = htmlDoc.getElementsByTagName('p');
          if (paragraphs.length > 0) {
            firstParagraph = paragraphs[0].textContent.trim();
          }
          let beneficio = {
            slug: slugify(fields.titulo),
            title: fields.titulo,
            tagline: fields.tagline,
            author: slugify(author.name),
            date: fields.data,
            cover: await getImage(fields.capa.sys.id),
            category: slugify(category.titulo),
            content: conteudo,
            excerpt: firstParagraph,
            atualizacao: element.sys.updatedAt,
            type: 'beneficios'
          }
          fs.access(benDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
            if (err) {
              console.log(err);
            } else {
              await writeFile(benDir, beneficio);
            }
          });
        });
      })
      .catch((err) => {
        console.log("ERRO -> ", err);
      });

      // BUILDING REVISOES
      const rvDir = "./content/revisoes";
      manageFolder(rvDir);
      let revisoes;
      await axios
        .get(`${server}/spaces/${space}/entries/?content_type=revisao`, {
          params: {
            access_token:token
          }
        })
        .then(async (ret) => {
          console.log("CONECTADO COM REVISOES");
          revisoes = ret.data.items;
          revisoes.forEach(async element => {
            let fields = element.fields;
            let author = await getEntry(fields.autor.sys.id);
            let category = await getEntry(fields.categoria.sys.id);
            let conteudo = await fetchRichTextData(fields.conteudo);
            let firstParagraph = '';
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(conteudo, 'text/html');
            const paragraphs = htmlDoc.getElementsByTagName('p');
            if (paragraphs.length > 0) {
              firstParagraph = paragraphs[0].textContent.trim();
            }
            let revisao = {
              slug: slugify(fields.titulo),
              title: fields.titulo,
              tagline: fields.tagline,
              author: slugify(author.name),
              date: fields.data,
              cover: await getImage(fields.capa.sys.id),
              category: slugify(category.titulo),
              content: conteudo,
              excerpt: firstParagraph,
              atualizacao: element.sys.updatedAt,
              type: 'revisoes'
            }
            fs.access(rvDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
              if (err) {
                console.log(err);
              } else {
                await writeFile(rvDir, revisao);
              }
            });
          });
        })
        .catch((err) => {
          console.log("ERRO -> ", err);
        });

        // BUILDING TABELAS
        const tbDir = "./content/tabelas";
        manageFolder(tbDir);
        let tabelas;
        await axios
          .get(`${server}/spaces/${space}/entries/?content_type=tabela`, {
            params: {
              access_token:token
            }
          })
          .then(async (ret) => {
            console.log("CONECTADO COM TABELAS");
            tabelas = ret.data.items;
            tabelas.forEach(async element => {
              let fields = element.fields;
              let tabela = {
                slug: slugify(fields.titulo),
                title: fields.titulo,
                tagline: fields.tagline,
                descricao: fields.descricao,
                tabela: await fetchRichTextData(fields.tabela),
              }
              fs.access(tbDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
                if (err) {
                  console.log(err);
                } else {
                  await writeFile(tbDir, tabela);
                }
              });
            });
          })
          .catch((err) => {
            console.log("ERRO -> ", err);
          });

    // BUILDING CARROSSEL HOME
    const reelDir = "./content/reel";
    manageFolder(reelDir);
    let reel;
    await axios
      .get(`${server}/spaces/${space}/entries/?content_type=carrosselHome`, {
        params: {
          access_token:token
        }
      })
      .then(async (ret) => {
        console.log("CONECTADO COM CARROSSEL HOME");
        reel = ret.data.items;
        reel.forEach(async element => {
          let fields = element.fields;
          let item = {}
          if(fields.conteudo) {
            let post = await getEntry(fields.conteudo.sys.id);
            item = {
              slug: fields.titulo? slugify(fields.titulo): slugify(post.titulo),
              title: fields.titulo? fields.titulo: post.titulo,
              capa: fields.capa? await getImage(fields.capa.sys.id): '',
              ref: slugify(post.titulo)
            }
          } else {
            item = {
              slug: slugify(fields.titulo),
              title: fields.titulo,
              capa: await getImage(fields.capa.sys.id),
              url: fields.url,
              ref: false
            }
          }
          fs.access(reelDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
            if (err) {
              console.log(err);
            } else {
              await writeFile(reelDir, item);
            }
          });
        });
      })
      .catch((err) => {
        console.log("ERRO -> ", err);
      });

      // BUILDING DESTAQUE MEIO
      const dtq1Dir = "./content/destaque-meio";
      manageFolder(dtq1Dir);
      let dtq1;
      await axios
        .get(`${server}/spaces/${space}/entries/?content_type=destaque1`, {
          params: {
            access_token:token
          }
        })
        .then(async (ret) => {
          console.log("CONECTADO COM DESTAQUE 1");
          dtq1 = ret.data.items;
          dtq1[0].fields.conteudo.forEach(async element => {
            let fields = element.sys;
            await getEntry(fields.id).then((post) => {
              let item = {
                slug: slugify(post.titulo),
                ref: slugify(post.titulo)
              }
              fs.access(dtq1Dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
                if (err) {
                  console.log(err);
                } else {
                  await writeFile(dtq1Dir, item);
                }
              });
            });
          });
        })
        .catch((err) => {
          console.log("ERRO -> ", err);
        });

      // BUILDING DESTAQUE LATERAL
      const dtq2Dir = "./content/destaque-lateral";
      manageFolder(dtq2Dir);
      let dtq2;
      await axios
        .get(`${server}/spaces/${space}/entries/?content_type=destaque2`, {
          params: {
            access_token:token
          }
        })
        .then(async (ret) => {
          console.log("CONECTADO COM DESTAQUE 2");
          dtq2 = ret.data.items;
          dtq2[0].fields.conteudo.forEach(async element => {
            let fields = element.sys;
            await getEntry(fields.id).then((post) => {
              let item = {
                slug: slugify(post.titulo),
                ref: slugify(post.titulo)
              }
              fs.access(dtq2Dir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
                if (err) {
                  console.log(err);
                } else {
                  await writeFile(dtq2Dir, item);
                }
              });
            });
          });
        })
        .catch((err) => {
          console.log("ERRO -> ", err);
        });

        // BUILDING MAIS ACESSADAS
        const maDir = "./content/mais-acessadas";
        manageFolder(maDir);
        let ma;
        await axios
          .get(`${server}/spaces/${space}/entries/?content_type=maisAcessados`, {
            params: {
              access_token:token
            }
          })
          .then(async (ret) => {
            console.log("CONECTADO COM MAIS ACESSADAS");
            ma = ret.data.items;
            ma[0].fields.conteudo.forEach(async element => {
              let fields = element.sys;
              await getEntry(fields.id).then((post) => {
                let item = {
                  slug: slugify(post.titulo),
                  ref: slugify(post.titulo)
                }
                fs.access(maDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    await writeFile(maDir, item);
                  }
                });
              });
            });
          })
          .catch((err) => {
            console.log("ERRO -> ", err);
          });

          // BUILDING BANNER DESTAQUE
          const bdDir = "./content/banner-destaque";
          manageFolder(bdDir);
          let bd;
          await axios
            .get(`${server}/spaces/${space}/entries/?content_type=bannerDestaque`, {
              params: {
                access_token:token
              }
            })
            .then(async (ret) => {
              console.log("CONECTADO COM BANNER DESTAQUE");
              bd = ret.data.items;
              bd.forEach(async element => {
                let fields = element.fields
                let banner ={
                  name: fields.titulo,
                  slug: slugify(fields.titulo),
                  imagem: await getImage(fields.imagem.sys.id),
                  url: fields.url
                }
                fs.access(bdDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    await writeFile(bdDir, banner);
                  }
                });
              });
            })
            .catch((err) => {
              console.log("ERRO -> ", err);
            });
};

const slugify = (term) => {
  return term
    .toString()
    .toLowerCase()
    .replace(/[àÀáÁâÂãäÄÅåª]+/g, "a") // Special Characters #1
    .replace(/[èÈéÉêÊëË]+/g, "e") // Special Characters #2
    .replace(/[ìÌíÍîÎïÏ]+/g, "i") // Special Characters #3
    .replace(/[òÒóÓôÔõÕöÖº]+/g, "o") // Special Characters #4
    .replace(/[ùÙúÚûÛüÜ]+/g, "u") // Special Characters #5
    .replace(/[ýÝÿŸ]+/g, "y") // Special Characters #6
    .replace(/[ñÑ]+/g, "n") // Special Characters #7
    .replace(/[çÇ]+/g, "c") // Special Characters #8
    .replace(/[ß]+/g, "ss") // Special Characters #9
    .replace(/[Ææ]+/g, "ae") // Special Characters #10
    .replace(/[Øøœ]+/g, "oe") // Special Characters #11
    .replace(/[%]+/g, "pct") // Special Characters #12
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const getImage = async (id) => {
  let url;
  await axios
    .get(`${server}/spaces/${space}/assets/${id}`, {
      params: {
        access_token:token
      }
    })
    .then(async (ret) => {
      url= ret.data.fields.file.url
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });
    return url;
};

const getEntry = async (id) => {
  let entry;
  await axios
    .get(`${server}/spaces/${space}/entries/${id}`, {
      params: {
        access_token:token
      }
    })
    .then(async (ret) => {
      entry = ret.data.fields
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });
    return entry;
};

const removeIlineStyle = (val) => {
  const RGX = new RegExp(`style=("|\')(.*?)("|\')`)
  const RGX2 = new RegExp(`style=(\\"|\')(.*?)("|\')`)
  //const RGX2 = new RegExp(`style=\\["|']{1}([^(\\)]*)\\["|']{1}`)

  if(!val) {
    return ''
  }

  let lsVal = val ? val.split('>') : '';

  lsVal = lsVal.length > 0 ? lsVal.map((item) => {
    return item.replace(RGX, "").replace(RGX2,"")
  }) : [];

  return lsVal.length > 0 ? lsVal.join(">"): ''
}

const manageFolder = (dir) => {
  if (fs.existsSync(dir)) {
    rimraf(dir, async () => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    });
  }  else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dir);
  }
}

const writeFile = (dir, obj) => {
  fs.writeFile(
    dir + "/" + obj.slug + ".json",
    JSON.stringify(obj),
    function (err, result) {
      if (err) console.log("error", err);
    }
  );
  console.log("ARQUIVO ESCRITO ->", obj.slug + ".json");
}


const fetchRichTextData = async (richTextDocument) => {
  try {
    // Include @contentful/rich-text-html-renderer directly in the script
    contentfulRichTextHtmlRenderer = require('@contentful/rich-text-html-renderer');
    contentfulTypes = require('@contentful/rich-text-types')

    const options = {
      renderNode: {
        [contentfulTypes.BLOCKS.EMBEDDED_ASSET]: (node) => `asset(${node.data.target.sys.id})`,
        [contentfulTypes.BLOCKS.EMBEDDED_ENTRY]: (node) => `entry(${node.data.target.sys.id})`,
      }
    }

    let htmlString = contentfulRichTextHtmlRenderer.documentToHtmlString(richTextDocument, options)

    const regex = /asset\((\w+)\)/g;

    // Substituir cada correspondência pela string desejada
    const resultado = await htmlString.replaceAsync(regex, async (_, id) => {
      const imagemSrc = await getImage(id);
      return `<img src="${imagemSrc}" />`;
    });

    const regex2 = /entry\((\w+)\)/g;

    // Substituir cada correspondência pela string desejada
    const resultado2 = await resultado.replaceAsync(regex2, async (_, id) => {
      const entry = await getEntry(id);
      const imagemSrc = await getImage(entry.imagem.sys.id);
      return `<a href="${entry.url}" target="_blank" class="banner"><img src="${imagemSrc}" alt="${entry.titulo}" /></a>`;
    });

    return resultado2;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Adiciona suporte para replace assíncrono
String.prototype.replaceAsync = async function (re, callback) {
  const promises = [];
  this.replace(re, (match, ...args) => {
    const promise = callback(match, ...args);
    promises.push(promise);
  });
  const results = await Promise.all(promises);
  return this.replace(re, () => results.shift());
};


return generator();
