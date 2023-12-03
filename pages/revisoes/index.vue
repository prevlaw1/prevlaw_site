<template>
    <section>
        <default-hero image="/images/default-hero.jpg">
            <div class="center | default-hero__content" size="wide">
                <h1 class="default-hero__title">Revisões</h1>
                <div class="breadcrumbs">
                    <nuxt-link to="/" class="breadcrumbs__link">Home</nuxt-link>
                    <span class="material-symbols-outlined">chevron_right</span>
                    <p class="breadcrumbs__current">Revisões</p>
                </div>
            </div>
        </default-hero>
        <section class="tagline | blue-section">
            <div class="center" size="wide">
                <p>Aqui precisamos de uma descrição de destaque da página para melhorar a otimização nas buscas com até duas linhas, explicando um pouco sobre o conteúdo que virá abaixo.</p>
            </div>
        </section>
        <section>
            <div class="center | intro" size="wide">
                <div class="intro__image"></div>
                <div class="intro__info">
                    <h3>Revisão de aposentadoria e outros benefícios do INSS</h3>
                    <p>Algumas possibilidades de receber uma aposentadoria maior são as revisões previdenciárias, que consistem em pedir reavaliação de um benefício previdenciário já concedido.</p>
                    <div>
                        <p>É possível pedir a revisão de aposentadoria ou outros benefícios pagos pelo INSS fazendo:</p>
                        <ul>
                            <li>Pedido administrativo, diretamente no INSS;</li>
                            <li>Pedido judicial, procurando um advogado especialista na área.</li>
                        </ul>
                    </div>
                    <p>Você pode solicitar a revisão do seu benefício diretamente ao INSS de forma presencial, indo à uma agência na sua cidade, ou online pelo sistema <a href="https://meu.inss.gov.br/" target="_blank">MeuINSS</a>.</p>
                </div>
            </div>
            <div class="center intro" size="wide">
                <div class="intro__info">
                    <h3>É sempre seguro pedir a revisão do benefício?</h3>
                    <p>Não. É sempre importante lembrar que revisar um benefício pode ter um efeito positivo, mas outro negativo. A revisão feita diretamente no INSS pode aumentar o valor do seu benefício, pois, dependendo do motivo da revisão, o valor pode ser corrigido para que seja mais justo.</p>
                    <p>Por outro lado, caso o INSS entenda que o benefício foi concedido de forma errada, o valor pode ser reduzido.</p>
                    <p>Portanto, é fundamental saber o motivo da revisão para ter uma maior compreensão do que pode acontecer com o seu benefício. Por isso é importante buscar um advogado previdenciário especialista na área. Esse profissional terá condições de verificar antes de fazer o pedido se a revisão vale a pena ou não.</p>
                </div>
            </div>
            <div class="center intro" size="wide">
                <div class="intro__info">
                    <h3>Quem pode pedir revisão do seu benefício?</h3>
                    <p>Quem tem direito a revisão de aposentadoria são aqueles beneficiários que possuem algum erro na concessão do benefício, como por exemplo:</p>
                    <ul>
                        <li>Erro no cálculo de benefício: O cálculo de aposentadoria leva em conta vários fatores, como número de contribuições, salário de contribuição, carência, tempo de contribuição, idade, etc. Em caso de erro nesses itens, é possível pedir revisão.</li>
                        <li>Falta de tempo de contribuição: Para se aposentar, é necessário ter contribuído por um determinado período. Se o INSS concedeu a aposentadoria calculando o tempo de forma errada, é possível solicitar revisão. O INSS pode cometer erros em conversões de atividade especial em atividade comum, ou pode ter ignorado vínculos muito antigos que foram “perdidos” nas mudanças que ocorreram no sistema do INSS ao longo do tempo, etc.</li>
                        <li>Valor das contribuições: as contribuições pagas no passado durante a vida do segurado foram pagas de forma errada, muitas vezes a menor, ou por vezes nem foram pagas por algum empregador.</li>
                        <li>Inconsistência de dados: Se houver inconsistência na documentação apresentada, como dados incorretos ou informações incompletas, é possível solicitar revisão.</li>
                    </ul>
                </div>
            </div>
            <div class="center intro" size="wide">
                <div class="intro__info">
                    <h3>Até quando pedir revisão da aposentadoria?</h3>
                    <p>Você pode solicitar uma revisão de aposentadoria ou outros benefícios previdenciários a qualquer momento, desde que dentro do prazo legal.</p>
                    <p>Pelo prazo de prescrição, você tem 5 anos para solicitar a recuperação de valores atrasados. Ou seja, valores que foram pagos a mais de 5 anos não podem mais ser recebidos de volta.</p>
                    <p>O prazo de decadência é de 10 anos a partir do primeiro pagamento do benefício. Depois deste período, não é mais possível pedir a revisão.</p>
                    <p>Exemplo: o aposentado que teve seu pedido de aposentadoria aprovado em 2013 e passou a receber a partir desse ano, terá até 2023 para revisar sua aposentadoria. Para saber se tem direito a revisão de aposentadoria, é possível entrar em contato com a Previdência Social ou procurar um advogado especializado em Direito Previdenciário.</p>
                </div>
            </div>
        </section>
        <section>
            <div class="center | revisoes" size="wide">
                <div class="revisoes__list | grid-3">
                    <base-card v-for="post in data.revisoes" v-bind:key="post.slug" :cardData="post" tagColor="accent" linkText="Conheça o benefício" />
                </div>
            </div>
        </section>
    </section>
</template>

<script setup>
    const revisoes = await queryContent('revisoes').find();
    const categorias = await queryContent('categorias').find();

    const data = reactive({
        revisoes: []
    });

    function buildItem(publicacao) {
        let item = {};
        item.slug = publicacao.slug;
        item.title = publicacao.title;
        item.image = publicacao.cover;
        item.brow = categorias.find(c => c.slug === publicacao.category).name;
        item.url=`/revisoes/${item.slug}`;
        return item;
    }

    revisoes.forEach(element => {
        data.revisoes.push(buildItem(element));
    });

</script>

<style lang="scss" scoped>
    .intro {
        padding-block: 32px;
        display: flex;
        flex-flow: row nowrap;
        gap: 32px;
        @media screen and (max-width: 36em) {
            flex-flow: column nowrap;
        }
        &:not(:last-child) {
            border-bottom: 1px solid hsl(0, 0%, 0%, 0.12);
        }
        &:last-child {
            margin-bottom: 32px;
        }
    }

        .intro__image {
            background-image: url('/images/revisoes-desc.jpg');
            width: 395px;
            flex-shrink: 0;
            border-radius: 4px;
            background-size: cover;
            background-position: center;
            @media screen and (max-width: 36em) {
                height: 200px;
                width: 100%;
            }
        }

        .intro__info {
            flex-grow: 1;
            display: flex;
            flex-flow: column nowrap;
            gap: 24px;
            a {
                color: #006EDB;
            }
            ul {
                padding-left: 32px;
            }
        }

    .revisoes {
        padding-bottom: 128px;
    }
</style>