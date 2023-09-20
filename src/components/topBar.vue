<template>
  <div class="top-bar-wrap">
    <span>The Loading Stones</span>
    <img src="../assets/ffxiv_icon.png" />
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.top-bar-wrap{
    background:var(--top-bar);
    padding:1rem;
    width:calc(100% - 2rem);
    color:white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    span{
        text-transform: uppercase;
    }

}
</style>