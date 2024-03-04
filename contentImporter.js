import chalk from 'chalk';

import getAutores from './directus/autor.js';
import getCategorias from './directus/categoria.js';
import getPublicacoes from './directus/publicacao.js';
import getBeneficios from './directus/beneficio.js';
import getRevisoes from './directus/revisao.js';
import getTabelas from './directus/tabela.js';
import getDestaques from './directus/destaquesHome.js';
import getBannerDestaque from './directus/bannerDestaque.js';
import getCarrosselHome from './directus/carrosselHome.js';

console.log('');
console.log(chalk.green('IMPORTANTO CONTEUDO DO DIRECTUS...'));
console.log('');
console.log(chalk.green('[ AUTORES - CATEGORIAS - PUBLICACOES - BENEFICIOS - REVISOES - TABELAS - DESTAQUES - BANNER DESTAQUE]'));

getAutores();
getCategorias();
getPublicacoes();
getBeneficios();
getRevisoes();
getTabelas();
getDestaques();
getBannerDestaque();
getCarrosselHome();
