<template>

  <topBar />
  <div class="char-wrap">


  <div class="button-wrap">
    <button back @click="this.$router.push('/')"><i class="fas fa-angle-left"></i><span>Back</span></button>
    <button refresh @click="forceUpdate()">
      <i class="fas fa-sync-alt"></i><span>Force Update</span>
    </button>
  </div>

  <div class="char-image-wrap">
    <div class="loader" v-if="!this.$store.state.viewingChar">
      <span>Delivering Data - wait a second.. Kupo!</span>
      <img
        class="animate__animated animate__pulse animate__infinite"
        src="../assets/delivery_moogle.png"
      />
    </div>
    <div
      class="char-img animate__animated animate__fadeIn"
      :style="
        'background: url(' +
        this.$store.state.viewingChar.characterImage +
        '); background-position:center top;'
      "
      v-if="this.$store.state.viewingChar"
    >
      <div class="char-name animate__animated animate__slideInDown">
        <span class="w-s">{{
          this.$store.state.viewingChar.characterHomeWorld
        }}</span>
        <span class="c-n">{{
          this.$store.state.viewingChar.characterName
        }} </span>
      </div>
      <div class="char-spec">
        <div class="itembox animate__animated animate__slideInLeft">
          <div class="s-l">
            {{
              this.$store.state.viewingChar.characterCurrentJobLevel.replace(
                "LEVEL",
                ""
              )
            }}
          </div>
          <div class="s-n">
            {{ this.$store.state.viewingChar.characterCurrentJob }}
          </div>
        </div>
        <div class="itembox animate__animated animate__slideInRight">
          <div class="s-l">
            {{ this.$store.state.viewingChar.characterGender }}
          </div>
          <div class="s-n">
            {{ this.$store.state.viewingChar.characterRace }}
          </div>
        </div>
        <span fc>
          <img :src="this.$store.state.viewingChar.characterFCBadge" />
          <span>{{ this.$store.state.viewingChar.characterFCName }}</span></span>
      </div>
    </div>

    <div class="char-options animate__animated animate__slideInUp" v-if="this.$store.state.viewingChar">
      <charOptions />
    </div>

  </div>
  <div v-if="this.$store.state.charView == 'jobs' && this.$store.state.viewingChar" class="job-info animate__animated animate__fadeIn"  >
    <table>
      <thead>
        <tr>
          <td ic></td>
          <td>Job</td>
          <td lv>Level</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="job in this.$store.state.viewingChar.characterJobs"
          :key="job"
        >
          <td ic><img :src="job.jobIcon" /></td>
          <td>{{ job.jobName }}</td>
          <td lv>{{ job.jobLevel }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="this.$store.state.charView == 'gear' && this.$store.state.viewingChar" class="job-info animate__animated animate__fadeIn">
    <table>
      <thead>
        <tr>
          <td ic></td>
          <td>Name</td>
          <td lv>iLvl</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="gear in this.$store.state.viewingChar.characterGear"
          :key="gear"
        >
          <td ic><img :src="gear.itemImage" /></td>
          <td :style="getRarityColor(gear.itemRarity)">{{ gear.itemName }}</td>
          <td lv>{{ gear.itemILevel.replace("Item Level","") }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
import topBar from "../components/topBar.vue";
import charOptions from "../components/charOptions.vue";
import axios from "axios";


export default {
  components: { topBar,charOptions },
  mounted(){
    //scroll to the main section
    if(this.$store.state.selectedCharID == null){this.$router.push('/')}
    this.loadCharacter();
    window.scrollTo({top: 75, behavior: 'smooth'})
  },
  methods:{
        async loadCharacter(){
            await axios.post(this.$store.state.charLoadPage + this.$store.state.selectedCharID, {
                contentType:'application/json'
            }).then(
                response =>{
                    this.$store.state.viewingChar = response.data;
                    window.scrollTo({top: 127, behavior: 'smooth'})
                    //console.log(response.data);
                }
            )
        },
        async forceUpdate(){
          this.$store.state.viewingChar = null;
          await axios.post(this.$store.state.charLoadPage + this.$store.state.selectedCharID + "&update=true", {
                contentType:'application/json'
            }).then(
                response =>{
                    this.$store.state.viewingChar = response.data;
                    //console.log(response.data);
                }
            )
        },
        getRarityColor(itemRarity){
          switch (itemRarity){
            case "common": return "color:#f3f3f3";
            case "uncommon": return "color:#c0ffc0";
            case "magic": return "color:#d789b6";
            case "artifact": return "color:#e5dd7e";
            case "legend": return "color:#ffa666";
            case "epic": return "color:#b38cff";
            case "rare": return "color:#5990ff";
            default: return itemRarity;
          }
        }
    }
};
</script>

<style lang="scss" scoped>
.char-wrap{
  width:100%;
  max-width:1500px;
  margin:0 auto;
}
.char-image-wrap {
  background: url(../assets/char_bg_empty.png);
  height: 873px;
  max-height:100svh;
  background-position: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  

  @media screen and (min-width:900px) {
        margin:1rem;
        border-radius: .5rem .5rem 0 0 ;
  }

  .char-options{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
  }

  span[fc]{
    position:absolute;
    bottom:5rem;
    right:1rem;
    background:#000000b9;
    padding:1rem;
    color:white;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .char-img {
    height: 873px;
    max-height:100svh;
    width: 100%;
    max-width: 640px;
    background-position: center ;
    background-position-y: 1rem;
  }

  .char-name {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    user-select: none;



    .w-s {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.748);
    }
    .c-n {
      font-size: 2rem;
      color: white;
      text-shadow: 2px 2px 2px #000000;
    }
  }
}
.char-spec {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1rem;

  .s-l {
    font-size: 2rem;
  }
  .s-n {
    font-size: 1.2rem;
  }
}
.button-wrap {
  display: flex;
  justify-content: space-between;
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

  img {
    height: 284px;
    width: 234px;
  }
}
.job-info {
  padding: 1rem;
  width: calc(100% - 2rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .section-title {
    font-size: 2rem;
    color: white;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.2rem;

    thead {
      tr {
        background: var(--top-bar);
        color: white;
        td {
          padding: 0.5rem;
          &[lv] {
            text-align: center;
            width:50px;
          }
          &[ic] {
            width:20px;
          
          }
        }
      }
    }

    tbody {
      tr {
        &:nth-child(even) {
          background: var(--page-bg-light);
        }
        td {
          padding: 0.25rem;
          color: white;
          &[lv] {
            text-align: center;
            width:50px;
          }
          &[ic] {
            width: 20px;
            img{
              max-height:30px;
            }
          }
        }
      }
    }
  }
}
</style>