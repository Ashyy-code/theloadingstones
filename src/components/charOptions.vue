<template>
  <div class="char-options-wrap">
    <button @click="this.$store.state.charView = 'jobs'" :sel="this.$store.state.charView == 'jobs'"><i class="fas fa-gavel"></i><span>Jobs</span></button>
    <button @click="this.$store.state.charView = 'gear'" :sel="this.$store.state.charView == 'gear'"><i class="fas fa-tshirt"></i><span>Gear</span></button>
    <button @click="this.$store.state.charView = 'collects'" :sel="this.$store.state.charView == 'collects'"><i class="fas fa-paw"></i><span>Collects</span></button>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.char-options-wrap{
    display: flex;

    button{
        width:33.3%;
        margin-right:1px;
        justify-content: center;
        background:#222631e6;
        color:white;

        cursor: pointer;

        &:hover{
            background:var(--page-bg-color);
        }

        &[sel="true"]{
            background:var(--page-bg);
            
        }
    }
}
</style>