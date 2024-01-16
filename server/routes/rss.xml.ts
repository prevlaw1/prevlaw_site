import { serverQueryContent } from '#content/server'
import RSS from 'rss';

export default defineEventHandler(async (event) => {
    const feed = new RSS({
      title: 'Prevlaw',
      description: 'Feed RSS para o site Prevlaw',
      site_url: 'https://www.prevlaw.com',
      feed_url: `https://www.prevlaw.com/rss.xml`,
    })
    
    
    const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
    
    let blogPosts = docs.filter((doc) => doc?.type?.includes('noticias') || doc?.type?.includes('beneficios') || doc?.type?.includes('revisoes'))

    
    for (const doc of blogPosts) {
    
      feed.item({
    
        title: doc.title ?? '-',
        url: `https://www.prevlaw.com${ doc.type === 'noticias' ? '/noticias' : doc.type === 'beneficios' ? '/beneficios' : '/revisoes' }/${doc.slug }`,
        date: doc.date,
        description: doc.excerpt?doc.excerpt:'-',
        enclosure: {  url: doc.cover },
      })
    
    }
    
    
    const feedString = feed.xml({ indent: true })
    
    event.res.setHeader('content-type', 'text/xml')
    
    event.res.end(feedString)
});
