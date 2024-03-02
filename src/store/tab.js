export default{
    state: {
        iscollapse: false,
       
    },
    mutations: {
      changeCollapse (state) {
        state.iscollapse=!state.iscollapse
      }
    }
}