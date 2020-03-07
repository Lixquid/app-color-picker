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
                button.btn.btn-outline-secondary.dropdown-toggle(
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                ) {{selectedOutput}}
                .dropdown-menu
                    a.dropdown-item(
                        href="#"
                        v-for="(_, k) in outputFormats"
                        :key="k"
                        v-on:click.prevent="selectedOutput = k"
                    ) {{k}}
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
            button.btn.btn-link.dropdown-toggle(
                type="button"
                v-on:click.passive="historyVisible = !historyVisible"
            ) History

        .card.mb-5(v-if="previewVisible")
            .card-header Preview
            .card-body.text-center.px-5
                .row
                    .col.text-dark(:style="{background: '#' + selectedColor}")
                        .h1.py-3 Example
                    .col.text-light(:style="{background: '#' + selectedColor}")
                        .h1.py-3 Example
                .row
                    .col.bg-dark(:style="{color: '#' + selectedColor}")
                        .h1.py-3 Example
                    .col.bg-light(:style="{color: '#' + selectedColor}")
                        .h1.py-3 Example

        .card.mb-5(v-if="historyVisible")
            .card-header
                | History
                a.text-danger.float-right(
                    href="#"
                    v-on:click.prevent="history = []"
                ) Clear All
            .card-body.history--body
                ul.mb-0
                    li(
                        v-for="(c, i) in history"
                        :key="i"
                    )
                        a(
                            href="#"
                            v-on:click.prevent="selectedColor = c"
                        ) {{c}}

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
import { defineComponent, ref, computed, watch } from "@vue/composition-api";
import palettes from "./colorpalettes.json";

const HISTORY_MAXIMUM = 100;

const outputFormats = {
    Hex(input: string): string {
        return "#" + input;
    },
    RGB(input: string): string {
        return (
            "rgb(" +
            parseInt(input.substring(0, 2), 16) +
            ", " +
            parseInt(input.substring(2, 4), 16) +
            ", " +
            parseInt(input.substring(4, 6), 16) +
            ")"
        );
    }
};

export default defineComponent({
    setup() {
        const outputElementRef = ref<HTMLInputElement>();
        const selectedColor = ref("ffffff");
        const selectedPalette = ref<keyof typeof palettes>(
            Object.keys(palettes)[0]
        );
        const previewVisible = ref(false);
        const history = ref<string[]>([]);
        const historyVisible = ref(false);
        const selectedOutput = ref<keyof typeof outputFormats>("Hex");

        const output = computed(() =>
            outputFormats[selectedOutput.value](selectedColor.value)
        );

        watch(
            selectedColor,
            c => {
                history.value.unshift(c);
                if (history.value.length > HISTORY_MAXIMUM) {
                    history.value.splice(HISTORY_MAXIMUM);
                }
            },
            { lazy: true }
        );

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
            previewVisible,
            history,
            historyVisible,
            outputFormats,
            selectedOutput
        };
    }
});
</script>

<style lang="stylus" scoped>
.palette--box
    flex-grow 1
    height 3em
    border none

.history--body
    overflow scroll
    max-height 50vh
</style>
