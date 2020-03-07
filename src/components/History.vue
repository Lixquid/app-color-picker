<template lang="pug">
    .card
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
                        v-on:click.prevent="setSelectedColor(c)"
                    ) {{c}}
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from "@vue/composition-api";

const HISTORY_MAXIMUM = 100;

export function useHistory(selectedColor: Ref<string>) {
    const history = ref<string[]>([]);

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

    return history;
}

export default defineComponent({
    props: {
        history: { type: Array as () => string[], required: true },
        setSelectedColor: {
            type: (Function as unknown) as () => (c: string) => void,
            required: true
        }
    }
});
</script>

<style lang="stylus" scoped>
.history--body
    overflow-y scroll
    max-height 50vh
</style>
