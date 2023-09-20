<template>
  <div class="landing-wrap">
    <div class="loader" v-if="isSearching">
      <span>Delivering Data - wait a second.. Kupo!</span>
      <img
        class="animate__animated animate__pulse animate__infinite"
        src="../assets/delivery_moogle.png"
      />
    </div>

    <topBar />
    <div class="search-wrap animate__animated animate__fadeIn">
      <img mg src="../assets/delivery_moogle.png" />
      <label for="inp_search">Search Eorzea</label>
      <input v-model="this.$store.state.searchTerm" type="text" @keyup="checkSubmit($event)" />
      <button @click="searchDB()">
        <i class="fas fa-search"></i><span>Search</span>
      </button>
    </div>
    <div class="search-results animate__animated animate__fadeIn">
      <div
        class="search-result"
        v-for="char in this.$store.state.searchResults"
        :key="char.characterID"
        @click="this.$store.state.viewingChar = null; this.$store.state.selectedCharID = char.characterID; this.$router.push('/viewchar')"
      >
        <img fc :src="char.characterFaceImage" />
        <div class="char-details">
          <span nm>{{ char.characterName }}</span>
          <span hw>{{ char.characterHomeWorld }}</span>
          <div class="job-wrap">
            <img :src="char.characterJobIcon" />
            <span>{{ char.characterJobLevel }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import topBar from "../components/topBar.vue";

export default {
  components: { topBar },
  data() {
    return {
      isSearching: false,
    };
  },
  methods: {
    async searchDB() {
      this.isSearching = true;
      await axios
        .post(this.$store.state.charSearchPage + this.$store.state.searchTerm.replace(" ","+"), {
          contentType: "application/json",
        })
        .then((response) => {
          this.$store.state.searchResults = response.data;
          this.isSearching = false;
          //console.log(response.data);
        });
    },
    checkSubmit(e){
      if(e.key == "Enter"){
        this.searchDB();
      }
    }
  },
};
</script>

<style lang="scss" scoped>

.landing-wrap{
  background:var(--page-bg-light);
}
.search-wrap {
  display: flex;
  padding: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  width: calc(100% - 2rem);
  max-width: 700px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;


  img[mg]{
    height:120px
  }


  label {
    font-size: 2rem;
    color: white;
  }

  input {
    padding: 0.75rem;
    font-size: 1.2rem;
    background: var(--page-bg-light);
    border: solid 3px var(--top-bar);
    border-radius: 0.5rem;
    outline: none;
    color: white;
  }

  button {
    width: min-content;
    white-space: nowrap;
    background: var(--top-bar);
    color: white;
    border-radius: 0.5rem;
  }
}

.loader {
  font-size: 1.4rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 50%;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 2px 2px 2px #000000;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #000000b0;
  z-index:99999999;

  img {
    height: 284px;
    width: 234px;
  }
}

.search-results {
  width: 100%;
  

  .search-result {
    display: flex;
    color: white;
    padding: .75rem .5rem;
    gap: 0.5rem;
    background: var(--page-bg-dark);
    cursor: pointer;

    &:hover{
      background:var(--page-bg-color);
    }

    .char-details {
      display: flex;
      flex-direction: column;
      gap:.5rem;

      span{
        &[nm]{
          font-size:150%;
        }
        &[hw]{
          color:#ffffff8b;
        }
      }

      .job-wrap{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap:.5rem;
      }

      img {
        height: 24px;
        width: 24px;
      }
    }

    &:nth-child(even) {
      background: var(--page-bg);

      &:hover{
      background:var(--page-bg-color);
    }
    }

    img[fc] {
      border-radius: 50%;
      height: 75px;
    }
  }
}
</style>