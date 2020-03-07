<template lang="pug">
    .container.my-5.mx-auto
        h1.mb-5
            | Color Picker
            |
            a.btn.btn-outline-primary.float-right(href="https://lixquid.com").
                lixquid.com

        output-bar(:selectedColor="selectedColor")

        .mb-3
            button.btn.btn-link.dropdown-toggle(
                type="button"
                v-on:click.passive="previewVisible = !previewVisible"
            ) Preview
            button.btn.btn-link.dropdown-toggle(
                type="button"
                v-on:click.passive="historyVisible = !historyVisible"
            ) History

        preview.mb-5(:selectedColor="selectedColor", v-if="previewVisible")
        history.mb-5(
            :history="history"
            :setSelectedColor="(c) => selectedColor = c"
            v-if="historyVisible"
        )

        .card.mt-5
            .card-header
                ul.nav.nav-tabs.card-header-tabs
                    li.nav-item(
                        v-for="picker in availablePickers"
                        :key="picker"
                    )
                        a.nav-link(
                            href="#"
                            v-on:click.prevent="selectedPicker = picker"
                            :class="{active: selectedPicker === picker}"
                        ) {{picker}}
            selector-palette(
                :setSelectedColor="c => selectedColor = c"
                v-show="selectedPicker === 'Palette'"
            )
            SelectorHTML5(
                :selectedColor="selectedColor"
                :setSelectedColor="c => selectedColor = c"
                v-show="selectedPicker === 'HTML5'"
            )

</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import Preview from "./components/Preview.vue";
import History, { useHistory } from "./components/History.vue";
import OutputBar from "./components/OutputBar.vue";
import SelectorPalette from "./components/SelectorPalette.vue";
import SelectorHTML5 from "./components/SelectorHTML5.vue";

const availablePickers = ["Palette", "HTML5"];

export default defineComponent({
    components: {
        Preview,
        History,
        OutputBar,
        SelectorPalette,
        SelectorHTML5
    },
    setup() {
        const selectedColor = ref("ffffff");
        const selectedPicker = ref("Palette");

        const previewVisible = ref(false);
        const historyVisible = ref(false);
        const history = useHistory(selectedColor);

        return {
            selectedColor,
            selectedPicker,

            previewVisible,
            historyVisible,
            history,

            availablePickers
        };
    }
});
</script>
