<template>
    <footer class="footer">
        <div class="center | footer__content" size="wide">
            <div class="footer__column">
                <nuxt-link to="/" class="footer__logo-link">
                    <img format="webp" src="/images/logo-vertical.webp" alt="Prevlaw" class="footer-logo" />
                </nuxt-link>
                <div class="footer__row">
                    <nuxt-link to="/termos" class="footer__link">
                        Termos e condições de de uso
                    </nuxt-link>
                    <nuxt-link to="/privacidade" class="footer__link">
                        Políticas de privacidade
                    </nuxt-link>
                </div>
            </div>
            <div class="footer__column" v-for="c in nav" v-bind:key="c.title">
                <h3 class="footer__title">{{ c.title }}</h3>
                <ul class="footer__list">
                    <li v-for="i in c.items" v-bind:key="i.title">
                        <nuxt-link :to="i.url" :target="i.target" class="footer__link">{{ i.title }}</nuxt-link>
                    </li>
                </ul>
                <social-list :negativo="true" size="small" v-if="c.socials"></social-list>
                <p class="footer-text" v-if="c.cnpj">Prevlaw LTDA - 52.657.636/0001-04</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
    const nav = [
        /*{
            title: 'Advogados',
            items: [
                {
                    title: 'Buscar petições previdenciárias',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Buscar advogado previdenciário',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Buscar decisões previdenciárias',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Planos de assinatura',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Benefícios previdenciários',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Revisões previdenciárias',
                    url: '#',
                    target: "_blank"
                },
            ]
        },
        {
            title: 'Produto',
            items: [
                {
                    title: 'Cálculos previdenciários',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Liquidação de Sentença',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Revisão da Vida toda',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Petições',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Clientes',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Escritório',
                    url: '#',
                    target: "_blank"
                },
            ]
        },
        {
            title: 'Petições',
            items: [
                {
                    title: 'Petições previdenciárias',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Petições iniciais',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Recursos',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Contrarazões',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Requerimentos Administrativos',
                    url: '#',
                    target: "_blank"
                }
            ]
        },*/
        {
            title: 'Redes sociais',
            items: [
                /*{
                    title: 'História',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Mapa',
                    url: '#',
                    target: "_blank"
                },
                {
                    title: 'Ajuda',
                    url: '#',
                    target: "_blank"
                }*/
            ],
            socials: true,
            cnpj: true
        }
    ]
</script>

<style lang="scss" scoped>
    .footer {
        padding-block: 60px;
        background-color: #233450;
    }

        .footer__content {
            display: flex;
            flex-flow: row nowrap;
            gap: 64px;
            justify-content: space-between;
            @media (max-width: 36em) {
                flex-flow: column nowrap;
                align-items: center;
            }
        }

        .footer-logo {
            flex-shrink: 1;
            max-width: 127px;
        }

        .footer__column {
            display: flex;
            flex-flow: column nowrap;
            @media (max-width: 36em) {
                text-align: center;
                gap: 32px;
                align-items: center;
            }
        }

        .footer__row {
            display: flex;
            flex-flow: rown nowrap;
            gap: 32px;
            align-items: flex-end;
            flex-grow: 1;
            @media (max-width: 36em) {
                flex-direction: column;
                align-items: center;
            }
        }

        .footer__title {
            color: hsla(0, 0%, 100%, 0.9);
            font-family: var(--body-font);
            font-size: 1em;
            font-weight: 700;
            padding-bottom: 8px;
        }

        .footer__list {
            list-style: none;
            display: flex;
            flex-flow: column nowrap;
            gap: 8px;
        }

        .footer__link {
            color: hsla(0, 0%, 100%, 0.75);
            font-size: 0.875em;
            font-weight: 600;
            text-decoration: none;
        }

        :deep(.socials) {
            margin-top: 24px;
        }

        .footer-text {
            margin-top: 24px;
            color: hsla(0, 0%, 100%, 1);
            font-size: 0.875em;
            font-weight: 500;
        }
</style>