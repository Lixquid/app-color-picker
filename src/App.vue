<template lang="pug">
    .container.my-5.mx-auto
        h1.mb-5
            | Color Picker
            |
            a.btn.btn-outline-primary.float-right(href="https://lixquid.com").
                lixquid.com

        .input-group.input-group-lg.w-100.mb-3
            input.form-control(
                type="text"
                :value="output"
                ref="outputElementRef"
                readonly
            )
            .input-group-append
                button.btn.btn-success(
                    type="button"
                    v-on:click.passive="outputToClipboard"
                ) Copy

        .mb-3
            button.btn.btn-link.dropdown-toggle(
                type="button"
                v-on:click.passive="previewVisible = !previewVisible"
            ) Preview

        .card.mb-5(v-if="previewVisible")
            .card-header Preview
            .card-body.text-center.px-5
                .row
                    .col.text-dark(:style="{background: '#' + selectedColor}")
                        .h1 Example
                    .col.text-light(:style="{background: '#' + selectedColor}")
                        .h1 Example
                .row
                    .col.bg-dark(:style="{color: '#' + selectedColor}")
                        .h1 Example
                    .col.bg-light(:style="{color: '#' + selectedColor}")
                        .h1 Example

        .card.mt-5
            .card-header
                ul.nav.nav-tabs.card-header-tabs
                    li.nav-item
                        a.nav-link.active(
                            href="#"
                            v-on:click.prevent=""
                        ) Palette
            .card-body
                select.custom-select.mb-3(v-model="selectedPalette")
                    option(v-for="(_, palette) in palettes") {{palette}}
                .d-flex(v-for="row in palettes[selectedPalette]")
                    button.palette--box(
                        v-for="c in row"
                        :title="c"
                        :style="{background: '#' + c}"
                        v-on:click.passive="selectedColor = c"
                    )

</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import palettes from "./colorpalettes.json";

export default defineComponent({
    setup() {
        const outputElementRef = ref<HTMLInputElement>();
        const selectedColor = ref("ffffff");
        const selectedPalette = ref<keyof typeof palettes>(
            Object.keys(palettes)[0]
        );
        const previewVisible = ref(false);

        const output = computed(() => "#" + selectedColor.value);

        function outputToClipboard() {
            const element = outputElementRef.value;
            if (!element) {
                console.log(5);
                return;
            }
            element.focus();
            element.select();
            document.execCommand("copy");
        }

        return {
            selectedColor,
            palettes,
            selectedPalette,
            outputElementRef,
            output,
            outputToClipboard,
            previewVisible
        };
    }
});
</script>

<style lang="stylus" scoped>
.palette--box {
  flex-grow: 1;
  height: 3em;
  border: none;
}
</style>
