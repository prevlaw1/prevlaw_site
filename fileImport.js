const fs = require("fs");
const axios = require("axios");
var rimraf = require("rimraf");
require("dotenv").config({ path: "./.env" });
const server = process.env["BASE_URL"] ? process.env["BASE_URL"] : "";
const token = process.env["ACCESS_TOKEN"] ? process.env["ACCESS_TOKEN"] : "";
const space = process.env["SPACE_ID"] ? process.env["SPACE_ID"] : "";

const contentfulClient = require('contentful');
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: space,
  accessToken: token,
};
const contentful = contentfulClient.createClient(config);


const generator = async () => {
  /*
  //BUILDING UPDATES FILES
  const CONTENT_STATUS = "published"
  const CONTENT_FILTER_BY_STATUS = process.env["DEV"] || process.env["STAGING"] || process.env["PREVIEW"] ? `&filter={"status":{"_in":["draft","published"]}}` : `&filter={"status":{"_eq":"${CONTENT_STATUS}"}}`
  const SUBCONTENT_STATUS_FILTER = process.env["DEV"] || process.env["STAGING"] || process.env["PREVIEW"] ? ["draft","published"] : [CONTENT_STATUS]

  const _getOrganizations = (list) => {
    return list.filter(({hubs_id: {status}}) => (SUBCONTENT_STATUS_FILTER.includes(status))).map(({sort, hubs_id: hub}) => ({
      sort: sort,
      slug: slugify(hub.name + "-" + hub.id),
      name: hub.name,
      region: hub.region,
      description: hub.description,
      link: hub.link,
      image: getImage(hub.image),
      translations: hub.translations
    })).sort((a, b) => {
      return a.sort - b.sort;
    })
  }

  const _getActivities = (list) => {
    // Filter by status
    return list.filter(({activities_id: {status}}) => (SUBCONTENT_STATUS_FILTER.includes(status)))
    .map(({sort, activities_id: activity}) => ({
      sort: sort,
      path: activity.slug ? `activities/${activity.slug}` : `activities/${slugify(activity.title)}`,
      image: getImage(activity.image),
      title: activity.title,
      brown: activity.brown,
      tagline: activity.tagline,
      description: activity.description,
      url: activity.url,
      translations: activity.translations,
    })).sort((a, b) => {
      return a.sort - b.sort;
    })
  }

  const _getPeople = (list) => {
    return list.filter(({team_id: {status}}) => (SUBCONTENT_STATUS_FILTER.includes(status))).map(({sort, team_id: person}) => ({
      sort: sort,
      name: person.name,
      bio: person.bio,
      image: getImage(person.image),
      url: person.url,
      slug: person.slug
    })).sort((a, b) => {
      return a.sort - b.sort;
    })
  }*/

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
    .then((ret) => {
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
            writeFile(authorDir, authorClean);
          }
        });
      });
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

    //BUILDING CAGETORIAS
    const catDir = "./content/categorias";
    manageFolder(catDir);
    let categories;
    await axios
      .get(`${server}/spaces/${space}/entries/?content_type=categoria`, {
        params: {
          access_token:token
        }
      })
      .then((ret) => {
        console.log("CONECTADO COM CATEGORIAS");
        categories = ret.data.items;
        categories.forEach(element => {
          let fields = element.fields
          let categoria ={
            name: fields.titulo,
            slug: slugify(fields.titulo),
          }
          fs.access(catDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
            if (err) {
              console.log(err);
            } else {
              writeFile(catDir, categoria);
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
    .then((ret) => {
      console.log("CONECTADO COM PUBLICACOES");
      updates = ret.data.items;
      updates.forEach(async element => {
        let fields = element.fields;
        let author = await getEntry(fields.autor.sys.id);
        let category = await getEntry(fields.categoria.sys.id);
        let update = {
          slug: slugify(fields.titulo),
          title: fields.titulo,
          author: slugify(author.name),
          date: fields.data,
          cover: await getImage(fields.capa.sys.id),
          category: slugify(category.titulo),
          content: await fetchRichTextData(fields.conteudo)
        }
        fs.access(pubDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
          if (err) {
            console.log(err);
          } else {
            writeFile(pubDir, update);
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
      .then((ret) => {
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
            }
          }
          fs.access(reelDir, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
            if (err) {
              console.log(err);
            } else {
              writeFile(reelDir, item);
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
        .then((ret) => {
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
                  writeFile(dtq1Dir, item);
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
        .then((ret) => {
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
                  writeFile(dtq2Dir, item);
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
          .then((ret) => {
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
                    writeFile(maDir, item);
                  }
                });
              });
            });
          })
          .catch((err) => {
            console.log("ERRO -> ", err);
          });

      
/*
  const dir = "./content/updates";
  if (fs.existsSync(dir)) {
    rimraf(dir, async () => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
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
        await updates.data.data.forEach((post) => {
          let i = post;
          i.slug = slugify(post.title);
          i.cover_image = getImage(post.cover_image);
          if(post.show_in_activity_page && post.show_in_activity_page.length > 0) {
            for (let el of post.show_in_activity_page) {
              let opt = `showInActivityPage${el}`
              i[opt] = el
            }
          };
          i.main_content = post.main_content ? removeIlineStyle(post.main_content) : '',
          i.description = post.description ? removeIlineStyle(post.description) : '';
          i.translations.forEach(tr => {
            let code = tr.languages_code.split('-')[0];
            i[code] = tr;
          });
          i.content_type = post.content_type ? post.content_type : 'Blog';

          fs.writeFile(
            dir + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
        });
      }
    });
  }*/






/*
  //BUILDING EVENTS FILES
  let events;
  const eventsUsefullFields = 'id,status,sort,date_from,date_to,event_name,internal_event,tagline,description,additional_info,image,hero_image,url,map_url,type,place,host,timezones,visible_on_special_activity,show_in_activity_page,sessions.session_id.date,translations.*'
  const eventsfilter = CONTENT_FILTER_BY_STATUS
  await axios
    .get(`${server}items/events?fields=${eventsUsefullFields}${eventsfilter}`)
    .then((ret) => {
      events = ret;
      console.log("CONECTADO COM EVENTS");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirEvents = "./content/events";
  if (fs.existsSync(dirEvents)) {
    rimraf(dirEvents, async () => {
      if (!fs.existsSync(dirEvents)) {
        fs.mkdirSync(dirEvents);
      }
      fs.access(
        dirEvents,
        fs.constants.R_OK | fs.constants.W_OK,
        async (err) => {
          if (err) {
            console.log(err);
          } else {
            await events.data.data.forEach((event) => {
              let i = event;
              i.is_main_event_series = false;
              i.slug = slugify(event.event_name + "-" + event.id);
              i.image = getImage(event.image);
              i.hero_image = getImage(event.hero_image);
              i.date = event.date_from;
              if(event.show_in_activity_page && event.show_in_activity_page.length > 0) {
                for (let el of event.show_in_activity_page) {
                  let opt = `showInActivityPage${el}`
                  i[opt] = el
                }
              };
              i.translations.forEach(tr => {
                if(tr.languages_code) {
                  let code = tr.languages_code.split('-')[0];
                  i[code] = tr;
                }
              });
              fs.writeFile(
                dirEvents + "/" + i.slug + ".json",
                JSON.stringify(i),
                function (err, result) {
                  if (err) console.log("error", err);
                }
              );
              console.log("ARQUIVO ESCRITO ->", i.slug + ".json");

            });
          }
        }
      );
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirEvents);
    fs.access(dirEvents, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await events.data.data.forEach((event) => {
          let i = event;
          i.is_main_event_series = false;
          i.slug = slugify(event.event_name + "-" + event.id);
          i.image = getImage(event.image);
          i.hero_image = getImage(event.hero_image);
          i.date = event.date_from;
          if(event.show_in_activity_page && event.show_in_activity_page.length > 0) {
            for (let el of event.show_in_activity_page) {
              let opt = `showInActivityPage${el}`
              i[opt] = el
            }
          };
          i.translations.forEach(tr => {
            let code = tr.languages_code.split('-')[0];
            i[code] = tr;
          });

          fs.writeFile(
            dirEvents + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");

        });
      }
    });
  }

  // BUILDING EVENTS - NEW STRUCTURE
  // BASIC EVENT
  // EVENT SINGLE SESSION
  // EVENT MULTI-SESSION
  // EVENT SERIES

  // Um objeto cuja chave será o id dos eventos.
  let eventsRelationsObj = {}
  await axios.get(
    `${server}items/event_builder_event_builder?fields=*.id,*.name`

  )
  .then((res) => {
    res.data.data.forEach((item) => {
      // parent event_builder_id -> 1
      // child related_event_builder_id -> {id: 1, name: 'A'}

      if (item.event_builder_id && item.related_event_builder_id) { // Os dois tem que ser != null para considerar a relação
        const parent = item.event_builder_id;
        const child = item.related_event_builder_id;

        if (eventsRelationsObj[child.id]) {
          eventsRelationsObj[child.id].push(parent);
        } else {
          eventsRelationsObj[child.id] = [parent];
        }
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });

  let eventSection;
  const eventSectionUsefullFields = '*,partners.partners_id.*,sessions.session_id.*,sessions.session_id.speakers.speaker_id.*,sessions.session_id.partners.partners_id.*,single_session.*,single_session.speakers.speaker_id.*,single_session.partners.partners_id.*,event_series.*,event_series.related_event_builder_id.*,event_series.related_event_builder_id.sessions.session_id.*,event_series.related_event_builder_id.sessions.session_id.speakers.speaker_id.*,event_series.related_event_builder_id.sessions.session_id.partners.partners_id.*,translations.*'
  let eventSectionfilter = `&filter={`
  eventSectionfilter += (process.env["DEV"] || process.env["STAGING"] || process.env["PREVIEW"]) ? "}" : `"status":{"_eq":"${CONTENT_STATUS}"}}`

  await axios
    .get(`${server}items/event_builder?fields=${eventSectionUsefullFields}${eventSectionfilter}`)
    .then((ret) => {
      eventSection = ret;
      console.log("CONECTADO COM EVENT SECTION");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirEventSection = "./content/eventsSection";
  if (fs.existsSync(dirEventSection)) {
    rimraf(dirEventSection, async () => {
      if (!fs.existsSync(dirEventSection)) {
        fs.mkdirSync(dirEventSection);
      }
      fs.access(
        dirEventSection,
        fs.constants.R_OK | fs.constants.W_OK,
        async (err) => {
          if (err) {
            console.log(err);
          } else {
            await eventSection.data.data.forEach((event) => {
              let i = { translations: event.translations };
              // default event fields
              i.id = event.id,
              i.sort = event.sort,
              i.slug = slugify(event.name);
              i.internal_event = event.sessions.length == 0 && event.event_series.length == 0 ? false : true;
              i.hero_image = getImage(event.hero_image);
              i.image = getImage(event.image);
              i.date = event.date,
              // [D4D-436] - Se o single event não tiver data de fim, considerar a data de início.
              i.date_to = event.date_to === null && event.event_type === 'event_single_session' ? event.date : event.date_to,
              i.main_timezone = event.main_timezone,
              i.timezones = event.timezones ? event.timezones : [],
              i.event_name = event.name,
              i.tagline = event.tagline,
              i.additional_info = event.additional_info,
              i.description = event.excerpt,
              i.url = event.url,
              i.map_url = event.map_url ? event.map_url : '',
              i.type = event.type,
              i.event_type = event.event_type,
              i.host = event.host ? event.host : '';
              if(event.show_in_activity_page && event.show_in_activity_page.length > 0) {
                for (let el of event.show_in_activity_page) {
                  let opt = `showInActivityPage${el}`
                  i[opt] = el
                }
              };
              i.partner_collors = {
                base: event.base ? hexToHsl(event.base ).join(',') : '',
                primary: event.primary ? hexToHsl(event.primary ).join(',') : '',
                accent: event.accent ? hexToHsl(event.accent ).join(',') : '',
              },
              i.translations.length > 0 ? i.translations.forEach(tr => {
                if(tr.languages_code) {
                  let code = tr.languages_code.split('-')[0];
                  i[code] = tr;
                }
              }) : [];
              i.partners = event.partners.length > 0 ? event.partners.map((item => {
                let partner = {
                  name: item.partners_id.name,
                  url: item.partners_id.url,
                  image: getImage(item.partners_id.image)
                }
                return partner
              })) : []
              i.show_sessions = event.hide_sessions == true ? false: true;
              // end default event fields
              i.sessions = event.event_type === 'event_multi_session' && event.sessions && event.sessions.length > 0 ? event.sessions.map((item) => {
                let session =  {
                  name: item.session_id && item.session_id.name ? item.session_id.name: '',
                  tagline: item.session_id.tagline,
                  url: item.session_id.url,
                  slug: slugify(item.session_id.name),
                  streaming_url: item.session_id.streaming_url,
                  timezones: item.session_id.timezones,
                  date: item.session_id.date,
                  main_timezone: item.session_id.main_timezone,
                  timezones: item.session_id.timezones,
                  speakers: item.session_id.speakers && item.session_id.speakers.length > 0 ? item.session_id.speakers.map((spkr => {
                    let speaker = {
                      name: spkr.speaker_id.name,
                      attribution: spkr.speaker_id.attribution && spkr.speaker_id.attribution.length > 0 ? spkr.speaker_id.attribution : [],
                      job_title: spkr.speaker_id.job_title ? spkr.speaker_id.job_title : '',
                      image: spkr.speaker_id.image ? getImage(spkr.speaker_id.image) : '',
                      bio: spkr.speaker_id.bio ? spkr.speaker_id.bio : '',
                      social_media: spkr.speaker_id.social_media && spkr.speaker_id.social_media.length > 0 ? spkr.speaker_id.social_media : []
                    }
                    return speaker
                  })) : [],
                  partners: item.session_id.partners.length > 0 ? item.session_id.partners.map((item => {
                    let partner = {}
                    if(item.partners_id) {
                      partner = {
                        name: item.partners_id.name,
                        url: item.partners_id.url,
                        image: getImage(item.partners_id.image)
                      }
                    }
                    return partner
                  })) : []
                }
                return session
              }) : [],
              i.is_main_event_series = event.event_type === 'event_series' ? true : false;
              i.event_series = event.event_type === 'event_series' && event.event_series ? event.event_series : [];
              i.event_series = i.event_series.length > 0 ? i.event_series.map(item => {
                let event = {
                  "id": item.related_event_builder_id.id,
                  "name": item.related_event_builder_id.name
                }
                return event
              }) : [];

              i.single_session = event.event_type === 'event_single_session' && event.single_session ?
                {
                  name: event.single_session && event.single_session.name ? event.single_session.name: '',
                  tagline: event.single_session.tagline,
                  url: event.single_session.url,
                  slug: slugify(event.single_session.name),
                  streaming_url: event.single_session.streaming_url,
                  timezones: event.single_session.timezones,
                  date: event.single_session.date,
                  main_timezone: event.single_session.main_timezone,
                  timezones: event.single_session.timezones,
                  speakers: event.single_session.speakers && event.single_session.speakers.length > 0 ? event.single_session.speakers.map((spkr => {
                    let speaker = {
                      name: spkr.speaker_id.name,
                      attribution: spkr.speaker_id.attribution && spkr.speaker_id.attribution.length > 0 ? spkr.speaker_id.attribution : [],
                      job_title: spkr.speaker_id.job_title ? spkr.speaker_id.job_title : '',
                      image: spkr.speaker_id.image ? getImage(spkr.speaker_id.image) : '',
                      bio: spkr.speaker_id.bio ? spkr.speaker_id.bio : '',
                      social_media: spkr.speaker_id.social_media && spkr.speaker_id.social_media.length > 0 ? spkr.speaker_id.social_media : []
                    }
                    return speaker
                  })) : [],
                  partners: event.single_session.partners.length > 0 ? event.single_session.partners.map((item => {
                    let partner = {}
                    if(item.partners_id) {
                      partner = {
                        name: item.partners_id.name,
                        url: item.partners_id.url,
                        image: getImage(item.partners_id.image)
                      }
                    }
                    return partner
                  })) : []
                }
              : {};

              // PARENTS
              i.parents = eventsRelationsObj[i.id]

              fs.writeFile(
                dirEventSection + "/" + i.slug + ".json",
                JSON.stringify(i),
                function (err, result) {
                  if (err) console.log("error", err);
                }
              );

              fs.writeFile(
                dirEvents + "/" + i.slug + ".json",
                JSON.stringify(i),
                function (err, result) {
                  if (err) console.log("error", err);
                }
              );
              console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
            });
          }
        }
      );
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirEventSection);
    fs.access(dirEventSection, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await eventSection.data.data.forEach((event) => {
          let i = { translations: event.translations };
          // default event fields
          i.id = event.id,
          i.sort = event.sort,
          i.slug = slugify(event.name);
          i.internal_event = event.sessions.length == 0 && event.event_series.length == 0 ? false : true;
          i.hero_image = getImage(event.hero_image);
          i.image = getImage(event.image);
          i.date = event.date,
          // [D4D-436] - Se o single event não tiver data de fim, considerar a data de início.
          i.date_to = event.date_to === null && event.event_type === 'event_single_session' ? event.date : event.date_to,
          i.main_timezone = event.main_timezone,
          i.timezones = event.timezones,
          i.event_name = event.name,
          i.tagline = event.tagline,
          i.additional_info = event.additional_info,
          i.description = event.excerpt,
          i.url = event.url,
          i.map_url = event.map_url ? event.map_url : '',
          i.type = event.type,
          i.event_type = event.event_type,
          i.host = event.host ? event.host : '';
          if(event.show_in_activity_page && event.show_in_activity_page.length > 0) {
            for (let el of event.show_in_activity_page) {
              let opt = `showInActivityPage${el}`
              i[opt] = el
            }
          };
          i.partner_collors = {
            base: event.base ? hexToHsl(event.base ).join(',') : '',
            primary: event.primary ? hexToHsl(event.primary ).join(',') : '',
            accent: event.accent ? hexToHsl(event.accent ).join(',') : '',
          },
          i.translations.length > 0 ? i.translations.forEach(tr => {
            if(tr.languages_code) {
              let code = tr.languages_code.split('-')[0];
              i[code] = tr;
            }
          }) : [];
          i.partners = event.partners.length > 0 ? event.partners.map((item => {
            let partner = {
              name: item.partners_id.name,
              url: item.partners_id.url,
              image: getImage(item.partners_id.image)
            }
            return partner
          })) : []
          i.show_sessions = event.hide_sessions == true ? false: true;
          // end default event fields
          i.sessions = event.event_type === 'event_multi_session' && event.sessions && event.sessions.length > 0 ? event.sessions.map((item) => {
            let session =  {
              name: item.session_id.name,
              tagline: item.session_id.tagline,
              url: item.session_id.url,
              slug: slugify(item.session_id.name),
              streaming_url: item.session_id.streaming_url,
              timezones: item.session_id.timezones,
              date: item.session_id.date,
              speakers: item.session_id.speakers && item.session_id.speakers.length > 0 ? item.session_id.speakers.map((spkr => {
                let speaker = {
                  name: spkr.speaker_id.name,
                  attribution: spkr.speaker_id.attribution && spkr.speaker_id.attribution.length > 0 ? spkr.speaker_id.attribution : [],
                  job_title: spkr.speaker_id.job_title ? spkr.speaker_id.job_title : '',
                  image: spkr.speaker_id.image ? getImage(spkr.speaker_id.image) : '',
                  bio: spkr.speaker_id.bio ? spkr.speaker_id.bio : '',
                  social_media: spkr.speaker_id.social_media && spkr.speaker_id.social_media.length > 0 ? spkr.speaker_id.social_media : []
                }
                return speaker
              })) : [],
              partners: item.session_id.partners.length > 0 ? item.session_id.partners.map((item => {
                let partner = {}
                if(item.partners_id) {
                  partner = {
                    name: item.partners_id.name,
                    url: item.partners_id.url,
                    image: getImage(item.partners_id.image)
                  }
                }
                return partner
              })) : []
            }
            return session
          }) : [],
          i.is_main_event_series = event.event_type === 'event_series' ? true : false;
          i.event_series = event.event_type === 'event_series' && event.event_series ? event.event_series : [];
          i.event_series = i.event_series.length > 0 ? i.event_series.map(item => {
            let event = {
              "id": item.related_event_builder_id.id,
              "name": item.related_event_builder_id.name
            }
            return event
          }) : [];

          i.single_session = event.event_type === 'event_single_session' && event.single_session ?
            {
              name: event.single_session && event.single_session.name ? event.single_session.name: '',
              tagline: event.single_session.tagline,
              url: event.single_session.url,
              slug: slugify(event.single_session.name),
              streaming_url: event.single_session.streaming_url,
              timezones: event.single_session.timezones,
              date: event.single_session.date,
              main_timezone: event.single_session.main_timezone,
              timezones: event.single_session.timezones,
              speakers: event.single_session.speakers && event.single_session.speakers.length > 0 ? event.single_session.speakers.map((spkr => {
                let speaker = {
                  name: spkr.speaker_id.name,
                  attribution: spkr.speaker_id.attribution && spkr.speaker_id.attribution.length > 0 ? spkr.speaker_id.attribution : [],
                  job_title: spkr.speaker_id.job_title ? spkr.speaker_id.job_title : '',
                  image: spkr.speaker_id.image ? getImage(spkr.speaker_id.image) : '',
                  bio: spkr.speaker_id.bio ? spkr.speaker_id.bio : '',
                  social_media: spkr.speaker_id.social_media && spkr.speaker_id.social_media.length > 0 ? spkr.speaker_id.social_media : []
                }
                return speaker
              })) : [],
              partners: event.single_session.partners.length > 0 ? event.single_session.partners.map((item => {
                let partner = {}
                if(item.partners_id) {
                  partner = {
                    name: item.partners_id.name,
                    url: item.partners_id.url,
                    image: getImage(item.partners_id.image)
                  }
                }
                return partner
              })) : []
            }
          : {};

          // PARENTS
          i.parents = eventsRelationsObj[i.id]

          fs.writeFile(
            dirEventSection + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          fs.writeFile(
            dirEvents + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");

        });
      }
    });
  }

  //BUILDING ACTIVITIES FILES
  let activities;
  let partners;
  const activitiesUsefullFields = 'id,sort,status,date,brow,title,tagline,description,url,image,main_content,slug,partners.*,translations.*'
  const filterActivities  = CONTENT_FILTER_BY_STATUS
  const partnersUsefullFields = 'id,sort,status,name,url,image,translations.*'
  const filterPartners  = CONTENT_FILTER_BY_STATUS
  await axios
  .get(`${server}items/activities?fields=${activitiesUsefullFields}${filterActivities}`)
    .then((ret) => {
      activities = ret;
      console.log("CONECTADO COM ACTIVITIES");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  await axios
    .get(`${server}items/partners?fields=${partnersUsefullFields}${filterPartners}`)
    .then((ret) => {
      partners = ret;
      partners.data.data.forEach(pt => {
        pt.image = getImage(pt.image);
      });
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirActivities = "./content/activities";
  if (fs.existsSync(dirActivities)) {
    rimraf(dirActivities, async () => {
      if (!fs.existsSync(dirActivities)) {
        fs.mkdirSync(dirActivities);
      }
      fs.access(
        dirActivities,
        fs.constants.R_OK | fs.constants.W_OK,
        async (err) => {
          if (err) {
            console.log(err);
          } else {
            await activities.data.data.forEach((activitiy) => {
              let i = activitiy;
              i.slug = i.slug? i.slug : slugify(activitiy.title);
              i.image = getImage(activitiy.image);
              i.partners = i.partners.sort(function(a, b) {
                return a.sort - b.sort;
              })

              i.partners.forEach(pt => {
                i.partners = partners.data.data.filter(partner => {
                  return partner.id = pt.partners_id
                })
              });

              fs.writeFile(
                dirActivities + "/" + i.slug + ".json",
                JSON.stringify(i),
                function (err, result) {
                  if (err) console.log("error", err);
                }
              );
              console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
            });
          }
        }
      );
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirActivities);
    fs.access(dirActivities, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await activities.data.data.forEach((activitiy) => {
          let i = activitiy;
          i.slug = i.slug? i.slug : slugify(activitiy.title);
          i.image = getImage(activitiy.image);
          i.partners = i.partners.sort(function(a, b) {
            return a.sort - b.sort;
          })
          i.partners.forEach(pt => {
            i.partners = partners.data.data.filter(partner => {
              return partner.id = pt.partners_id
            })
          });

          fs.writeFile(
            dirActivities + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
        });
      }
    });
  }

  //BUILDING TEAM FILES
  let team;
  const teamUsefullFields = 'id,status,sort,name,job_title,bio,organization,image,url,affiliated_organization,project,translations.*'
  const filterTeam  = CONTENT_FILTER_BY_STATUS
  await axios
    .get(`${server}items/team?fields=${teamUsefullFields}${filterTeam}`)
    .then((ret) => {
      team = ret;
      console.log("CONECTADO COM TEAM");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirTeam = "./content/team";
  if (fs.existsSync(dirTeam)) {
    rimraf(dirTeam, async () => {
      if (!fs.existsSync(dirTeam)) {
        fs.mkdirSync(dirTeam);
      }
      fs.access(dirTeam, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await team.data.data.forEach((member) => {
            let i = member;
            i.slug = slugify(member.name);
            i.image = getImage(member.image);
            i.translations.forEach(tr => {
              let code = tr.languages_code.split('-')[0];
              i[code] = tr;
            });
            fs.writeFile(
              dirTeam + "/" + i.slug + ".json",
              JSON.stringify(i),
              function (err, result) {
                if (err) console.log("error", err);
              }
            );
            console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
          });
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirTeam);
    fs.access(dirTeam, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await team.data.data.forEach((member) => {
          let i = member;
          i.slug = slugify(member.name);
          i.image = getImage(member.image);
          i.translations.forEach(tr => {
            let code = tr.languages_code.split('-')[0];
            i[code] = tr;
          });
          fs.writeFile(
            dirTeam + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
        });
      }
    });
  }

  //BUILDING HUB FILES
  let hubs;
  const hubsUsefullFields = 'id,status,name,region,description,link,image,hubs,translations.*'
  const filterHubs  = CONTENT_FILTER_BY_STATUS
  await axios
    .get(`${server}items/hubs?fields=${hubsUsefullFields}${filterHubs}`)
    .then((ret) => {
      hubs = ret;
      console.log("CONECTADO COM HUBS");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirHubs = "./content/hubs";
  if (fs.existsSync(dirHubs)) {
    rimraf(dirHubs, async () => {
      if (!fs.existsSync(dirHubs)) {
        fs.mkdirSync(dirHubs);
      }
      fs.access(dirHubs, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await hubs.data.data.forEach((hub) => {
            let i = hub;
            i.slug = slugify(hub.name + "-" + hub.id);
            i.image = getImage(hub.image);
            i.translations.forEach(tr => {
              let code = tr.languages_code.split('-')[0];
              i[code] = tr;
            });
            fs.writeFile(
              dirHubs + "/" + i.slug + ".json",
              JSON.stringify(i),
              function (err, result) {
                if (err) console.log("error", err);
              }
            );
            console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
          });
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirHubs);
    fs.access(dirHubs, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await hubs.data.data.forEach((hub) => {
          let i = hub;
          i.slug = slugify(hub.name + "-" + hub.id);
          i.image = getImage(hub.image);
          i.translations.forEach(tr => {
            let code = tr.languages_code.split('-')[0];
            i[code] = tr;
          });
          fs.writeFile(
            dirHubs + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
        });
      }
    });
  }

  //BUILDING HIGHLIGHTS FILE
  let highlights;
  const highlightsUsefullFields = 'id,status,content_type,brow,heading,tagline,excerpt,image,url_label,custom_url,url,sort,activities.*,events.*,news.*,event_builder.*,translations.*'
  const filter  = CONTENT_FILTER_BY_STATUS
  const sortBy = '&sort=sort'
  await axios
    .get(`${server}items/highlights?fields=${highlightsUsefullFields}${filter}${sortBy}`)
    .then((ret) => {
      highlights = ret;
      console.log("CONECTADO COM HIGHLIGHTS");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirHighlights = "./content/highlights";
  if (fs.existsSync(dirHighlights)) {
    rimraf(dirHighlights, async () => {
      if (!fs.existsSync(dirHighlights)) {
        fs.mkdirSync(dirHighlights);
      }
      fs.access(dirHighlights, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await highlights.data.data.forEach((item) => {
            let i = {sort: item.sort};
            i.image = getImage(item.image);
            i.brow = item.content_type ? item.content_type.charAt(0).toUpperCase() + item.content_type.slice(1): '';
            i.title = item.heading;
            i.tagline = item.tagline;
            i.description = item.excerpt;
            i.url_label = item.url_label;
            i.url = item.url;
            item.translations.forEach(tr => {
              tr.title = tr.heading;
              tr.description = tr.excerpt;
            })
            i.translations = item.translations;
            i.hasCustomUrl = item.custom_url;

            if(item.content_type === 'activities') {
              i.slug = item.activities && item.activities.title ? slugify(item.activities.title): slugify(item.heading);
              let tmpSlug = item.activities.slug ? item.activities.slug : ''
              if(tmpSlug !== '' && i.slug !== tmpSlug) {
                i.slug = tmpSlug
              }
              i.contentType = 'activity';
              i.customUrl = `/${item.content_type}/${i.slug}/`;

            } else if(item.content_type === 'news') {
              i.slug = item.news && item.news.title ? slugify(item.news.title): slugify(item.heading);
              i.contentType = 'card';
              if(i.hasCustomUrl){
                i.customUrl = item.url;
              } else {
                i.customUrl = `/${item.content_type}/${i.slug}/`;
              }

            } else if(item.content_type === 'events') {
              i.slug = item.events && item.events.event_name ? slugify(item.events.event_name + "-" + item.events.id): slugify(item.heading);
              i.contentType = 'card';
              if(item.custom_url && item.url !== "") {
                i.customUrl = i.url;
              } else {
                i.customUrl = i.url.includes(i.slug) ? `/${item.content_type}/${i.slug}/` : i.url;
              }
            } else if(item.content_type === 'eventBuilder') {
              i.brow = item.brow ? item.brow : 'Events';
              i.slug = item.event_builder && item.event_builder.name ? slugify(item.event_builder.name): slugify(item.heading);
              i.contentType = 'card';
              if(item.custom_url && item.url !== "") {
                i.customUrl = i.url;
              } else {
                i.customUrl = i.url.includes(i.slug) ? `/events/${i.slug}/` : i.url;
              }
            }
            i.cardImageUrl = i.image;
            i.cardImageDescription = i.heading;

            fs.writeFile(
              dirHighlights + "/" + i.slug + ".json",
              JSON.stringify(i),
              function (err, result) {
                if (err) console.log("error", err);
              }
            );
            console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
          });
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirHighlights);
    fs.access(dirHighlights, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await highlights.data.data.forEach((item) => {
          let i = {sort: item.sort};
          i.image = getImage(item.image);
          i.brow = item.brow;
          i.title = item.heading;
          i.tagline = item.tagline;
          i.description = item.excerpt;
          i.url_label = item.url_label;
          i.url = item.url;
          item.translations.forEach(tr => {
            tr.title = tr.heading;
            tr.description = tr.excerpt;
          })
          i.translations = item.translations;
          i.hasCustomUrl = item.custom_url;

          if(item.content_type === 'activities') {
            i.slug = item.activities && item.activities.title ? slugify(item.activities.title): slugify(item.heading);
            let tmpSlug = item.activities.slug ? item.activities.slug : ''
            if(tmpSlug !== '' && i.slug !== tmpSlug) {
              i.slug = tmpSlug
            }
            i.contentType = 'activity';
            i.customUrl = `/${item.content_type}/${i.slug}/`;

          } else if(item.content_type === 'news') {
            i.slug = item.news && item.news.title ? slugify(item.news.title): slugify(item.heading);
            i.contentType = 'card';
            if(i.hasCustomUrl){
              i.customUrl = item.url;
            } else {
              i.customUrl = `/${item.content_type}/${i.slug}/`;
            }

          } else if(item.content_type === 'events') {
            i.slug = item.events && item.events.event_name ? slugify(item.events.event_name + "-" + item.events.id): slugify(item.heading);
            i.contentType = 'card';
            if(item.custom_url && item.url !== "") {
              i.customUrl = i.url;
            } else {
              i.customUrl = i.url.includes(i.slug) ? `/${item.content_type}/${i.slug}/` : i.url;
            }
          } else if(item.content_type === 'eventBuilder') {
            i.slug = item.event_builder && item.event_builder.name ? slugify(item.event_builder.name): slugify(item.heading);
            i.contentType = 'card';
            if(item.custom_url && item.url !== "") {
              i.customUrl = i.url;
            } else {
              i.customUrl = i.url.includes(i.slug) ? `/events/${i.slug}/` : i.url;
            }
          }
          i.cardImageUrl = i.image;
          i.cardImageDescription = i.heading;

          fs.writeFile(
            dirHighlights + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
        });
      }
    });
  }

  //BUILDING PUBLICATION FILES
  let publications;
  const publicationUsefullFields = 'id,status,sort,date,name,target,url,resources,resources.resources_id,tagline,description,image,translations.*'
  const filterPub = CONTENT_FILTER_BY_STATUS
  const sortedBy = '&sort=sort' // reflecting the sorting made on directus
  await axios
    .get(`${server}items/publication?fields=${publicationUsefullFields}${filterPub}${sortedBy}`)
    .then((ret) => {
      publications = ret;
      console.log("CONECTADO COM PUBLICATION");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirPublications = "./content/publications";
  if (fs.existsSync(dirPublications)) {
    rimraf(dirPublications, async () => {
      if (!fs.existsSync(dirPublications)) {
        fs.mkdirSync(dirPublications);
      }
      fs.access(dirPublications, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await publications.data.data.forEach((pub) => {
            let i = pub;
            i.slug = slugify(pub.name);
            i.image = pub.image ? getImage(pub.image) : '/images/d4d-card-default.svg';
            i.translations.forEach(tr => {
              let code = tr.languages_code.split('-')[0];
              i[code] = tr;
            });
            i.target = pub.target;
            if(pub.target === 'resource') {
              i.resourceUrl = buildResourceQuery(pub.resources)
            }
            fs.writeFile(
              dirPublications + "/" + i.slug + ".json",
              JSON.stringify(i),
              function (err, result) {
                if (err) console.log("error", err);
              }
            );
            console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
          });
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirPublications);
    fs.access(dirPublications, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await publications.data.data.forEach((pub) => {
          let i = pub;
          i.slug = slugify(pub.name);
          i.image = pub.image ? getImage(pub.image) : '/images/d4d-card-default.svg';
          i.translations.forEach(tr => {
            let code = tr.languages_code.split('-')[0];
            i[code] = tr;
          });
          i.target = pub.target;
          if(pub.target === 'resource') {
            i.resourceUrl = buildResourceQuery(pub.resources)
          }
          fs.writeFile(
            dirPublications + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
        });
      }
    });
  }

  //BUILDING PAGES FILES
  let pages;

  const aboutPageFields = 'network_member_organizations.sort,network_member_organizations.hubs_id.*,donor_organizations.sort,donor_organizations.hubs_id.*,global_partners.sort,global_partners.hubs_id.*,executive_committee.sort,executive_committee.team_id.*,global_research_hub.sort,global_research_hub.team_id.*'
  const activitiesPageFields = 'global_initiatives.sort,global_initiatives.activities_id.*,regional_plans.sort,regional_plans.activities_id.*'
  const pagesUsefullFields = 'id,status,sort,name,target,tagline,translations.*'

  const filterPages = CONTENT_FILTER_BY_STATUS
  await axios
    .get(`${server}items/pages?fields=${pagesUsefullFields},${aboutPageFields},${activitiesPageFields}${filterPages}`)
    .then((ret) => {
      pages = ret;
      console.log("CONECTADO COM PAGES");
    })
    .catch((err) => {
      console.log("ERRO -> ", err);
    });

  const dirPages = "./content/pages";
  if (fs.existsSync(dirPages)) {
    rimraf(dirPages, async () => {
      if (!fs.existsSync(dirPages)) {
        fs.mkdirSync(dirPages);
      }
      fs.access(dirPages, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
        if (err) {
          console.log(err);
        } else {
          await pages.data.data.forEach((pg) => {
            let i = pg;
            i.slug = slugify(pg.name);

            // About page - organization fields
            i.networkMemberOrganizations = _getOrganizations(i.network_member_organizations)
            i.globalPartners = _getOrganizations(i.global_partners)
            i.donorOrganizations = _getOrganizations(i.donor_organizations)
            delete i.network_member_organizations
            delete i.global_partners
            delete i.donor_organizations

            // About page - team fields
            i.executiveCommittee = _getPeople(i.executive_committee)
            i.globalResearchHub = _getPeople(i.global_research_hub)
            delete i.global_research_hub
            delete i.executive_committee

            // Activities page - activities fields
            i.regionalPlans = _getActivities(i.regional_plans)
            i.globalInitiatives = _getActivities(i.global_initiatives)
            delete i.regional_plans
            delete i.global_initiatives
            fs.writeFile(
              dirPages + "/" + i.slug + ".json",
              JSON.stringify(i),
              function (err, result) {
                if (err) console.log("error", err);
              }
            );
            console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
          });
        }
      });
    });
  } else {
    if (!fs.existsSync("./content")) {
      fs.mkdirSync("./content");
    }
    fs.mkdirSync(dirPages);
    fs.access(dirPages, fs.constants.R_OK | fs.constants.W_OK, async (err) => {
      if (err) {
        console.log(err);
      } else {
        await pages.data.data.forEach((pg) => {
          let i = pg;
          i.slug = slugify(pg.name);
          i.image = getImage(pg.image);

          // About page - organization fields
          i.networkMemberOrganizations = _getOrganizations(i.network_member_organizations)
          i.globalPartners = _getOrganizations(i.global_partners)
          i.donorOrganizations = _getOrganizations(i.donor_organizations)
          delete i.network_member_organizations
          delete i.global_partners
          delete i.donor_organizations

          // About page - team fields
          i.executiveCommittee = _getPeople(i.executive_committee)
          i.globalResearchHub = _getPeople(i.global_research_hub)
          delete i.global_research_hub
          delete i.executive_committee

          // Activities page - activities fields
          i.regionalPlans = _getActivities(i.regional_plans)
          i.globalInitiatives = _getActivities(i.global_initiatives)
          delete i.regional_plans
          delete i.global_initiatives
          fs.writeFile(
            dirPages + "/" + i.slug + ".json",
            JSON.stringify(i),
            function (err, result) {
              if (err) console.log("error", err);
            }
          );
          console.log("ARQUIVO ESCRITO ->", i.slug + ".json");
        });
      }
    });
  }*/
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
    .then((ret) => {
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
    .then((ret) => {
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
    let htmlString = contentfulRichTextHtmlRenderer.documentToHtmlString(richTextDocument)


    return htmlString;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

return generator();
