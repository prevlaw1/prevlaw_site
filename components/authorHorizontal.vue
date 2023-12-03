<template>
    <div class="author-card">
        <div class="author-card__image" :style="`background-image:url(${props.autor.picture});`">
            <a :href="props.autor.url" target="_blank" class="author-card__link">
                <img src="/images/linkedin-negativo.svg" :alt="`LinkedIn de ${props.autor.name}`">
            </a>
        </div>
        <div class="author-card__content">
            <p class="author-card__sobre">Sobre o autor desse conteúdo</p>
            <p class="author-card__tempo">Colunista desde {{ props.autor.desde }}</p>
            <div class="author-card__info">
                <p class="author-card__nome">{{ props.autor.name }}</p>
                <p class="author-card__cargo">{{ props.autor.cargo }}</p>
            </div>
                <nuxt-link class="base-link" to="#">Veja o perfil de Alfredo da Silva <span class="material-symbols-outlined">chevron_right</span></nuxt-link>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        autor: {
            type: Object,
            default: {
                name:"Alfredo da Silva",
                slug:"alfredo-da-silva",
                cargo:"Advogado pós graduado em direito previdenciário pela USP e especialista em revisão de aposentadoria",
                picture:"//images.ctfassets.net/1s37hnmczxoa/6pHA66tPILrdYLD2HR2tsu/ba7ce41f04ad108c9245c4cf029a69ec/pexels-pranav-digwal-32976.jpg",
                desde:"2002",
                bio:"Advogado pós graduado em direito previdenciário pela USP e especialista em revisão de aposentadoria. Advogado pós graduado em direito previdenciário pela USP e especialista em revisão de aposentadoria. Advogado pós graduado em direito previdenciário pela USP e especialista em revisão de aposentadoria. Advogado pós graduado em direito previdenciário pela USP e especialista em revisão de aposentadoria.",
                url:"https://www.linkedin.com/in/seidgy/"
            },
        },
    });
</script>

<style lang="scss" scoped>
    .author-card {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        @media screen and (max-width: 36em) {
            flex-flow: column nowrap;
        }
    }

        .author-card__bg {
            border-radius: 4px 4px 0 0;
            background-image: url('/images/books.jpg');
            width: 100%;
            height: 128px;
            background-size: cover;
            background-position: center;
        }

        .author-card__content {
            display: flex;
            flex-flow: column nowrap;
            gap: 16px;
            padding: 24px;
            border-radius: 16px;
            position: relative;
            z-index: 1;
        }

        .author-card__tempo {
            font-size: 0.75em;
        }

        .author-card__image {
            height: 160px;
            width: 160px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            border: 8px solid #CDE6FF;
        }

        .author-card__sobre {
            font-size: 0.75em;
            color: hsla(0, 0%, 0%, 0.7);
        }

        .author-card__info {
            color: hsla(0, 0%, 0%, 0.9);
        }

        .author-card__nome {
            font-size: 1.375em;
            font-weight: 500;
            margin-bottom: 4px;
        }

        .author-card__cargo {
            font-size: 0.875em;
        }

        .author-card__link {
            width: 100%;
            height: 100%;
            padding: 12px;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-end;
            align-items: center;
            opacity: 0;
            transition: opacity 0.2s ease-out;
            &:hover {
                opacity: 1;
            }
            img {
                width: 24px;
                height: 24px;
            }
        }
</style>