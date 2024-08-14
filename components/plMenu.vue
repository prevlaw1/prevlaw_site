<template>
    <section class="menu-container">
        <div class="center" size="wide">
            <nav class="main-menu | main-menu--desktop | not-mobile">
                <nuxt-link to="/">
                    <img format="webp" src="/images/logo-horizontal.webp" alt="Prevlaw" class="main-menu__logo" />
                </nuxt-link>
                <ul class="main-menu__list">
                    <li class="main-menu__item" v-for="item in data.nav" v-bind:key="item.title">
                        <nuxt-link :to="item.url" :target="item.target" class="main-menu__link">{{ item.title }} <span class="material-symbols-outlined" v-if="item.submenu && item.submenu.length > 0">expand_more</span></nuxt-link>
                        <ul class="main-menu__submenu" v-if="item.submenu && item.submenu.length > 0">
                            <li class="main-menu__submenu-item" v-for="subitem in item.submenu" v-bind:key="subitem.title">
                                <nuxt-link :to="subitem.url" :target="subitem.target" class="main-menu__link">{{ subitem.title }}</nuxt-link>
                            </li>
                        </ul>
                    </li>
                    <li class="main-menu__item">
                        <a href="#" class="main-menu__search" @click.prevent="abrirMenu('buscaDialog')">
                            <img format="webp" src="/images/icon-lupa.svg" class="main-menu__trigger" alt="Buscar conteúdos" />
                        </a>
                    </li>
                </ul>
                <div class="main-menu__actions">
                    <nuxt-link class="assine-button assine-button--secondary" target="_blank" to="https://app.prevlaw.com/" >Login</nuxt-link>
                    <nuxt-link class="assine-button" target="_blank" to="https://app.prevlaw.com/auth/register" >Assine agora</nuxt-link>
                </div>
            </nav>
            <nav class="main-menu | main-menu--mobile | not-desktop" aria-hidden="true">
                <div class="main-menu__actions">
                    <a href="#"  @click.prevent="abrirMenu('menuDialog')">
                        <img format="webp" class="main-menu__trigger" src="/images/menu-trigger.svg" alt="Menu" />
                    </a>
                    <nuxt-link to="/">
                        <img format="webp" src="/images/logo-horizontal.webp" alt="Prevlaw" class="main-menu__logo" />
                    </nuxt-link>
                </div>
                <div class="main-menu__actions">
                    <nuxt-link class="assine-button assine-button--secondary" target="_blank" to="https://app.prevlaw.com/" >Login</nuxt-link>
                    <nuxt-link class="assine-button" target="_blank" to="https://app.prevlaw.com/auth/register" >Assine agora</nuxt-link>
                </div>
                <dialog id="menuDialog" class="main-menu__dialog | dialog">
                    <div class="dialog__content">
                        <div class="dialog__title">
                            <nuxt-link to="/">
                                <img format="webp" src="/images/logo-horizontal.webp" alt="Prevlaw" class="main-menu__logo" />
                            </nuxt-link>
                            <a href="#" @click.prevent="fecharMenu('menuDialog')">
                                <img format="webp" class="main-menu__trigger" src="/images/close.svg" alt="Fechar menu" />
                            </a>
                        </div>
                        <ul class="dialog__menu">
                            <li class="main-menu__item" v-for="item in data.nav" v-bind:key="item.title">
                                <nuxt-link :to="item.url" :target="item.target" class="main-menu__link">{{ item.title }} <span class="material-symbols-outlined" v-if="item.submenu && item.submenu.length > 0">expand_more</span></nuxt-link>
                                <ul class="dialog__submenu" v-if="item.submenu && item.submenu.length > 0">
                                    <li class="main-menu__submenu-item" v-for="subitem in item.submenu" v-bind:key="subitem.title">
                                        <nuxt-link :to="subitem.url" :target="subitem.target" class="main-menu__link">{{ subitem.title }}</nuxt-link>
                                    </li>
                                </ul>
                            </li>
                            <li class="main-menu__item">
                                <a href="#" class="main-menu__search" @click.prevent="abrirMenu('buscaDialog')">
                                    <img format="webp" src="/images/icon-lupa.svg" class="main-menu__trigger" alt="Buscar conteúdos" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </dialog>
            </nav>
        </div>
        <dialog id="buscaDialog" class="dialog">
            <div class="dialog__content">
                <div class="dialog__title">
                    <nuxt-link to="/">
                        <img format="webp" src="/images/logo-horizontal.webp" alt="Prevlaw" class="main-menu__logo" />
                    </nuxt-link>
                    <a href="#" @click.prevent="fecharMenu('buscaDialog')">
                        <img format="webp" class="main-menu__trigger" src="/images/close.svg" alt="Fechar menu" />
                    </a>
                </div>
                <form action="/busca" class="busca-form">
                    <label for="termo" class="busca-form__title">Como podemos de ajudar?</label>
                    <input type="text" name="termo" id="termo" placeholder="Digite aqui o que você procura" />
                    <div class="busca-form__line">
                        <div class="busca-form__line-item">
                            <input type="checkbox" name="tudo" id="tudo" v-model="tudo" />
                            <label for="tudo">Todos os conteúdos do site</label>
                        </div>
                        <div class="busca-form__line-item">
                            <input type="checkbox" name="noticias" id="noticias" v-model="noticias" />
                            <label for="noticias">Notícias</label>
                        </div>
                        <div class="busca-form__line-item">
                            <input type="checkbox" name="beneficios" id="beneficios" v-model="beneficios" />
                            <label for="beneficios">Benefícios</label>
                        </div>
                        <div class="busca-form__line-item">
                            <input type="checkbox" name="revisoes" id="revisoes" v-model="revisoes" />
                            <label for="revisoes">Revisões</label>
                        </div>
                    </div>
                    <button type="submit" class="button button--primary">Buscar</button>
                </form>
            </div>
        </dialog>
    </section>
</template>

<script setup>
    import { ref, watch } from 'vue';
    const tabelas = await queryContent('tabelas').find();
    const data = reactive({
        nav: [
            /*{
                title: 'Produto',
                url: '#',
                target: "_blank"
            },
            {
                title: 'Assine',
                url: '#',
                target: "_blank"
            },*/
            {
                title: 'Notícias',
                url: '/busca?noticias=true'
                //url: '/noticias',
            },
            {
                title: 'Benefícios',
                url: '/beneficios',
            },
            {
                title: 'Revisões',
                url: '/revisoes',
            },
            {
                title: 'Ferramentas',
                url: '',
                submenu: []
            }
        ]
    });

    tabelas.forEach(element => {
        let item = {
            title: element.titulo,
            url: `/ferramentas/${element.slug}`
        };
        data.nav[3].submenu.push(item);
    });

    const abrirMenu = (id) => {
        let dialog = document.getElementById(id);
        dialog.showModal();
    }

    const fecharMenu = (id) => {
        let dialog = document.getElementById(id);
        dialog.close();
    }

    const tudo = ref(true);
    const noticias = ref(false);
    const beneficios = ref(false);
    const revisoes = ref(false);

    watch([noticias, beneficios, revisoes], ([newNoticias, newBeneficios, newRevisoes]) => {
        tudo.value = !newNoticias && !newBeneficios && !newRevisoes;
    });
</script>

<style lang="scss" scoped>
    .menu-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 3;
        padding-block: 32px;
    }

        .main-menu__logo {
            height: 40px;
            width: auto;
            @media (max-width: 36em) {
                height: 24px;
                width: auto;
            }
        }

        .main-menu,
        .dialog__title {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
        }

        .main-menu__actions {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 16px;
        }

        .main-menu__link {
            color: hsla(0, 0%, 100%, 0.75);
            text-decoration: none;
            font-size: 0.875em;
            font-weight: 600;
            padding: 8px 16px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            gap: 8px;
            span {
                color: hsla(0, 0%, 100%, 0.75);
                height: 100%;
                font-size: 1rem;
                line-height: 1rem;
            }
            &:hover {
                text-decoration: underline;
            }
            @media (max-width: 36em) {
                justify-content: center;
            }
        }

        .main-menu__list {
            display: flex;
            flex-flow: row nowrap;
            list-style: none;
            li {
                position: relative;
            }
        }

        /* Style for the submenu */
        .main-menu__submenu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            padding-block: 16px;
            flex-flow: column nowrap;
            gap: 16px;
            list-style: none;
            background: hsla(210, 100%, 23%, 0.85);
            border-radius: 4px;
            min-width: 240px;
        }

        .main-menu__list li:hover .main-menu__submenu {
            display: flex;
        }


    // MOBILE
    .main-menu__trigger {
        width: 28px;
        height: 28px;
    }

    .dialog {
        position: relative;
        z-index: 99;
        height: 100%;
        width: 100%;
        margin: auto;
        background: none;
        border: none;
        padding: 8px;
    }

        .dialog::backdrop {
            background: hsla(210, 100%, 23%, 0.85);
            backdrop-filter: blur(5px);
            @media (min-width: 36em) {
                background: hsla(210, 100%, 10%, 0.8)
            }
        }

        .dialog__content {
            display: flex;
            flex-flow: column nowrap;
            gap: 16px;
            height: 100%;
        }

        .dialog__menu {
            flex-grow: 1;
            list-style: none;
            display: flex;
            flex-flow: column nowrap;
            gap: 24px;
            align-items: center;
            justify-content: center;
            text-align: center;
        }

    .busca-form {
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: 640px;
        width: 90%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-flow: column nowrap;
        gap: 24px;
        align-items: flex-start;
        input[type="text"] {
            padding: 24px;
            width: 100%;
        }
        input[type="checkbox"] {
            margin-right: 8px;
        }
        label {
            color: white;
            font-size: 0.875em;
        }
    }

        .busca-form__title {
            color: white;
            font-size: 1.375em;
            font-weight: 500;
        }

        .busca-form__line {
            display: flex;
            flex-flow: row nowrap;
            gap: 32px;
            align-items: center;
            @media (max-width: 36em) {
                flex-flow: row wrap;
            }
        }
</style>