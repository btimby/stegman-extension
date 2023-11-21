<template>
    <div>
        <h1>Stegman</h1>
        <p>Type your hidden message below</p>
    </div>
</template>

<script>
export default {
    name: 'Home',

    mounted() {
        chrome.tags.query({
            active: true,
            currentWindow: true,
        }, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'DOMInfo' }, this.onResponse);
        });
    },

    methods: {
        onResponse(r) {
            console.log(r);
        },
    },
};
</script>

<style scoped>
</style>
