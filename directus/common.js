import dotenv from 'dotenv';
import { createDirectus, staticToken, rest, readItems  } from '@directus/sdk';

dotenv.config();

const CONTENT_STATUS = process.env.DEV ? JSON.parse(process.env.DEV) : ["published"];
const directus = createDirectus(process.env.DIRECTUS_BASE_URL)
  .with(staticToken(process.env.DIRECTUS_TOKEN))
  .with(rest());
console.log()

// get content from directus
const getDirectusData = async (collectionName, junctionFields=undefined) => {
  const content = await directus.request(readItems(collectionName, {
    fields: junctionFields ? [`*.*`, ...junctionFields] : ['*.*'],
    limit: -1,
    filter: {
      "status": {
        "_in" : CONTENT_STATUS
      }
    }
  }));

  return content;
}

const getAssets = async () => {
  const content = await client.request(readFiles(query_object));
  return content;
}

// getImageUrl
const getImage = (imageId) => {
  return `${ process.env.DIRECTUS_IMAGE_BASE_URL }/assets/${ imageId }`;
}

// file download example
{/* <a href="https://your-directus.com/assets/<file-id>?download" target="_blank" download="Your File.pdf">Download</a> */}

// slugify
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

const formatDate = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleDateString(
    'pt-br',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );
}

const formatTime = (date) => {
  if (!date) return '';

  return new Date(date).toLocaleTimeString(
    'en',
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );
}

export default {
  getDirectusData,
  getImage,
  slugify,
  formatDate,
  formatTime
};
