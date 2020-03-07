<template lang="pug">
    .input-group.input-group-lg.w-100.mb-3
        input.form-control(
            type="text"
            :value="output"
            ref="inputRef"
            readonly
        )
        .input-group-append
            button.btn.btn-outline-secondary.dropdown-toggle(
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            ) {{format}}
            .dropdown-menu
                a.dropdown-item(
                    href="#"
                    v-for="(_, k) in outputFormats"
                    :key="k"
                    v-on:click.prevent="format = k"
                ) {{k}}
        .input-group-append
            button.btn.btn-success(
                type="button"
                v-on:click.passive="setClipboard"
            ) Copy
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs } from "@vue/composition-api";

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
    props: {
        selectedColor: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const { selectedColor } = toRefs(props);
        const inputRef = ref<HTMLInputElement>();
        const format = ref<keyof typeof outputFormats>("Hex");

        const output = computed(() =>
            outputFormats[format.value](selectedColor.value)
        );

        function setClipboard() {
            const element = inputRef.value;
            if (!element) {
                console.log(5);
                return;
            }
            element.focus();
            element.select();
            document.execCommand("copy");
        }

        return {
            inputRef,
            format,
            output,
            outputFormats,
            setClipboard
        };
    }
});
</script>
