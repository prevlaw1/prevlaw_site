<template>
    <form class="form | form-parceiro">
        <h3 class="h4">Quer se tornar parceiro?</h3>
        <p class="small-text">Texto de apoio para aquisição de parceiros.</p>
        <div class="form__group">
            <label for="email" class="form__label | hidden">E-mail</label>
            <input type="email" id="email" name="email" class="form__input" placeholder="Coloque o seu melhor e-mail" />
        </div>
        <div class="form__group">
            <input type="checkbox" id="termos" class="form__input" name="termos" />
            <label for="termos" class="form__label">Eu aceito compartilhar meu e-mail e estou ciente que serei contactado pela Prevlaw</label>
        </div>
        <button type="submit" class="button button--primary button--full">Cadastrar e-mail</button>
    </form>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>