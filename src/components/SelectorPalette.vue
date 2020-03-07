<template lang="pug">
    .card-body
        select.custom-select.mb-3(v-model="selectedPalette")
            option(v-for="(_, palette) in palettes") {{palette}}
        .d-flex(v-for="row in palettes[selectedPalette]")
            button.palette--box(
                v-for="c in row"
                :title="c"
                :style="{background: '#' + c}"
                v-on:click.passive="setSelectedColor(c)"
            )
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import palettes from "./colorpalettes.json";

export default defineComponent({
    props: {
        setSelectedColor: {
            type: (Function as unknown) as () => (c: string) => void,
            required: true
        }
    },
    setup() {
        const selectedPalette = ref<keyof typeof palettes>(
            Object.keys(palettes)[0]
        );
        return {
            palettes,
            selectedPalette
        };
    }
});
</script>

<style lang="stylus" scoped>
.palette--box
    flex-grow 1
    height 3em
    border none
</style>
