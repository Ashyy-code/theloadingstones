import { createStore } from "vuex";
export default createStore({
    state(){
        return{
            viewingChar:null,
            searchResults:null,
            charLoadPage:'https://ashypls.com/endpoints/Loadstone/Loader/characterLoader.aspx?charID=',
            charSearchPage:'https://ashypls.com/endpoints/Loadstone/Loader/characterSearch.aspx?query=',
            selectedCharID:null,
            searchTerm:null,
            charView:'jobs'
        }
    }
})