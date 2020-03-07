<template lang="pug">
    .card-body
        input.btn.btn-secondary(
            type="color"
            :value="'#' + selectedColor"
            v-on:input.passive = "e => setSelectedColor(e.target.value.substring(1)) "
        )
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, watch } from "@vue/composition-api";

export default defineComponent({
    props: {
        selectedColor: {
            type: String,
            required: true
        },
        setSelectedColor: {
            type: (Function as unknown) as () => (c: string) => void,
            required: true
        }
    }
});
</script>

<style lang="stylus" scoped>
.btn
    width 100%
    height 3rem
</style>
