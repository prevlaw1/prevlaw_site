<template>
    <section class="product-page">
        <default-hero class="blue-hero" :gradient="false">
            <div class="center | default-hero__content" size="wide">
                <mock-section image="/images/mock-1.jpg" imageDescription="Página inicial do App Prevlaw">
                    <div class="col col--24">
                        <h1>Tudo em um só lugar! A plataforma completa do advogado previdenciarista.</h1>
                        <p>No Prevlaw você encontra tudo para dominar a prática previdenciária: cálculos previdenciários, modelos de petições, sistema de gestão de escritório, assinatura digital de documentos, cursos práticos, lives e uma comunidade exclusiva com nossos especialistas.</p>
                        <p class="bold">Feito por quem advoga, de verdade.</p>
                        <nuxt-link class="button button--sm button--white button--icon" to="http://app.prevlaw.com">Teste grátis por 8 dias<span class="material-symbols-outlined">chevron_right</span></nuxt-link>
                    </div>
                </mock-section>
            </div>
        </default-hero>
        <section class="cta">
            <div class="center col col--40 col--center" size="narrow">
                <p>Tenha acesso a + de 1000 petições que ganharam processos reais, cursos, lives e comunidade exclusiva de whatsapp com nosso time de especialistas. </p>
                <nuxt-link class="button button--sm button--primary button--icon" to="http://app.prevlaw.com">Teste grátis por 8 dias<span class="material-symbols-outlined">chevron_right</span></nuxt-link>
            </div>
        </section>
        <section class="blue-section">
            <div class="center col col--40 col--center" size="narrow">
                <p>Agora com o melhor sistema de cálculos do Brasil </p>
                <div class="row row--10 row--center">
                    <img class="promo-logo" src="/images/prevlaw-negativa.svg" alt="Prevlaw">
                    <p>+</p>
                    <img class="promo-logo" src="/images/CJ.svg" alt="Cálculo Jurídico">
                </div>
                <p>Todos os cálculos que você precisa ao seu alcance, sem limites.</p>
            </div>
        </section>
        <section class="produto">
            <div class="center" size="wide">
                <mock-section :faintBg="true" image="/images/mock-2.jpg" imageDescription="Cálcuo Jurídico no App Prevlaw">
                    <div class="col col--24">
                        <h4>Cálculos:</h4>
                        <ul class="shrink">
                            <li>Planejamento, Concessão, Revisão e Restabelecimento [RGPS]</li>
                            <li>Revisão da Vida Toda</li>
                            <li>Liquidação de Sentença</li>
                            <li>Restituição INSS acima do teto</li>
                            <li>Análise Previdenciária Rápida</li>
                            <li>Análise de Requisitos do BPC/LOAS</li>
                            <li>Planejamento, Concessão e Revisão RPPS - Regras União</li>
                            <li>Contribuições em Atraso</li>
                            <li>Complementação</li>
                            <li>Planejamento, Concessão e Revisão RPPS Estadual todos os Estados Disponíveis</li>
                            <li>Planejamento, Concessão e Revisão RPPS Municipal</li>
                            <li>Principais cidades disponíveis (solicitar novas cidades)*</li>
                        </ul>
                    </div>
                </mock-section>
                <div class="cj-cta | col col--16 col--center">
                    <p class="small-text">Faça quantos cálculos quiser, sem limites!</p>
                    <nuxt-link class="button button--sm button--primary button--icon" to="http://app.prevlaw.com">Assinantes prevlaw tem desconto no Cálculo Jurídico<span class="material-symbols-outlined">chevron_right</span></nuxt-link>
                </div>
            </div>
        </section>
        <section class="produto produto--main">
            <div class="center" size="wide">
                <mock-section image="/images/mock-3.jpg" imageDescription="Cadastro de clientes no App Prevlaw">
                    <div class="col col--24">
                        <h2>Sistema de gestão de escritório</h2>
                        <ul>
                            <li>Cadastros ILIMITADOS de clientes e processos</li>
                            <li>Ficha de atendimento guiado de cliente previdenciário</li>
                            <li>Agenda pessoal</li>
                            <li>Criação e controle de tarefas e prazos processuais</li>
                            <li>Armazenamento ILIMITADO de documentos na nuvem</li>
                        </ul>
                        <nuxt-link class="button button--sm button--primary button--icon" to="http://app.prevlaw.com">Teste grátis por 8 dias<span class="material-symbols-outlined">chevron_right</span></nuxt-link>
                    </div>
                </mock-section>
            </div>
        </section>
        <section class="produto produto--main">
            <div class="center" size="wide">
                <mock-section image="/images/mock-4.jpg" imageDescription="Petições no App Prevlaw">
                    <div class="col col--24">
                        <h2>Petições</h2>
                        <ul>
                            <li>+1000 modelos que ganharam processos reais</li>
                            <li>Elaboradas por especialistas com mais de 20 anos de advocacia previdenciária</li>
                            <li>Edição inteligente: preenchimento automático com os dados do cliente</li>
                            <li>Baixe sua petição em PDF ou Word</li>
                            <li>Acesso ilimitado</li>
                        </ul>
                        <nuxt-link class="button button--sm button--primary button--icon" to="http://app.prevlaw.com">Teste grátis por 8 dias<span class="material-symbols-outlined">chevron_right</span></nuxt-link>
                    </div>
                </mock-section>
            </div>
        </section>
        <section class="produto produto--main">
            <div class="center" size="wide">
                <mock-section image="/images/mock-5.jpg" imageDescription="Assinatura digital no App Prevlaw">
                    <div class="col col--24">
                        <h2>Assinatura Digital</h2>
                        <ul>
                            <li>Modelos reais de procurações e contratos de honorários</li>
                            <li>Seu cliente assina tudo sem sair de casa</li>
                            <li>Envie qualquer documento para assinatura de forma 100% digital</li>
                            <li>Assinatura com certificação ICP-Brasil (Lei n. 14.063/20)</li>
                        </ul>
                        <nuxt-link class="button button--sm button--primary button--icon" to="http://app.prevlaw.com">Teste grátis por 8 dias<span class="material-symbols-outlined">chevron_right</span></nuxt-link>
                    </div>
                </mock-section>
            </div>
        </section>
        <section class="produto produto--main">
            <div class="center" size="wide">
                <mock-section image="/images/mock-6.jpg" imageDescription="Cursos no App Prevlaw">
                    <div class="col col--24">
                        <h2>Cursos, lives e uma comunidade exclusiva</h2>
                        <ul>
                            <li>Acesso à nossa comunidade no WhatsApp</li>
                            <li>Contato direto com todos os fundadores do Prevlaw</li>
                            <li>Dicas práticas e trocas de experiências diárias</li>
                            <li>Cursos focados na prática da advocacia previdenciária</li>
                            <li>Tire suas dúvidas em lives exclusivas com nossos especialistas</li>
                        </ul>
                        <nuxt-link class="button button--sm button--primary button--icon" to="http://app.prevlaw.com">Teste grátis por 8 dias<span class="material-symbols-outlined">chevron_right</span></nuxt-link>
                    </div>
                </mock-section>
            </div>
        </section>
        <banner-principal />
        <section class="mais-acessadas">
            <div class="center" size="wide">
              <div class="busca__list | grid-3">
                <div v-for="post in data.maisAcessadas" v-bind:key="post.slug">
                  <base-card :cardData="post" v-if="post.type == 'noticias'" />
                  <base-card :cardData="post" tagColor="accent" linkText="Conheça o benefício" v-else  />
                </div>
              </div>
            </div>
        </section>
    </section>
</template>

<script setup>
    const publicacoes = await queryContent('publicacoes').find();
    const revisoes = await queryContent('beneficios').find();
    const beneficios = await queryContent('revisoes').find();
    const categorias = await queryContent('categorias').find();
    const autores = await queryContent('autores').find();
    let todos = publicacoes.concat(beneficios, revisoes);
    let maisAcessadas = todos.sort((a, b) => b.acessos - a.acessos);
    maisAcessadas = maisAcessadas.slice(0, 6);

    const data = reactive({
      maisAcessadas: [],
    });

    // Configurar as opções para formatar a data
    let opcoes = { day: 'numeric', month: 'long', year: 'numeric' };

    // Criar um objeto Intl.DateTimeFormat com as opções
    let formatadorData = new Intl.DateTimeFormat('pt-BR', opcoes);

    function findPost(i) {
      let id = publicacoes.find(p => p.id === i.id);
      let post = id? id.slug == i.slug ? id : null : null;
      if(!post || post.length <= 0) {
        id = beneficios.find(p => p.id === i.id);
        post = id? id.slug == i.slug ? id : null : null;
      }
      if(!post || post.length <= 0) {
        id = revisoes.find(p => p.id === i.id);
        post = id? id.slug == i.slug ? id : null : null;
      }
      return post
    }

    function buildItem(publicacao) {
        let item = {};
        item.slug = publicacao.slug;
        item.title = publicacao.titulo;
        item.image = publicacao.capa;
        item.brow = publicacao.categoria.nome;
        item.type = publicacao.type;
        item.url=`/${item.type}/${item.slug}`;
        let dataObj;
        if(publicacao.date_updated) {
          dataObj = new Date(publicacao.date_updated);
        } else {
          dataObj = new Date(publicacao.data);
        }
        item.date = formatadorData.format(dataObj);
        item.atualizado = publicacao.date_updated? publicacao.date_updated: publicacao.data;
        return item;
    }

    maisAcessadas.forEach(i => {
        data.maisAcessadas.push(buildItem(findPost(i)));
    });

</script>

<style lang="scss" scoped>

    .product-page {
        background: white;
    }

    .blue-hero {
        background: #245383;
        position: relative;
        height: auto;
        padding-bottom: 0;
        h1 {
            font-size: 2.5em;
            font-weight: 500;
        }
        p {
            color: white;
        }
        &::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            top: auto;
            display: block;
            background: white;
            height: 14px;
            opacity: 1;
        }
    }

    .cta {
        padding: 80px 0 60px;
        p {
            font-size: 2em;
            font-weight: 500;
            color: hsla(210, 57%, 33%, 1);
            text-align: center;
        }
    }

    .blue-section {
        padding-bottom: 70px;
        margin-bottom: -40px;
        p {
            font-size: 2em;
            font-weight: 500;
            text-align: center;
        }
    }

    .promo-logo {
        max-height: 38px;
    }

    .produto {
        h2 {
            font-size: 2em;
            font-weight: 500;
            text-align: center;
        }
        h4 {
            font-weight: 700;
            font-size: 1em;
            color: hsla(210, 57%, 43%, 1);
        }
        ul {
            padding-left: 20px;
            li {
                margin-bottom: 16px;
            }
            &.shrink {
                li {
                    font-size: 0.875em;
                    margin-bottom: 0;
                }
            }
        }
    }

        .produto--main {
            padding-block: 40px;
        }

    .cj-cta {
        padding-block: 26px;
        p {
            text-transform: uppercase;
            color: hsla(210, 57%, 33%, 1);
            font-size: 0.75em;
        }
    }
</style>