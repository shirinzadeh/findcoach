import { createStore } from 'vuex';
import coachesModule from './mutations/coaches.js'
import requestsModule from './mutations/requests.js';
import authModule from './mutations/auth.js';

const store = createStore({
   modules: {
      coaches: coachesModule,
      requests: requestsModule,
      auth: authModule
   },
   // state() {
   //    return {
   //       userId: 'c3',
   //       // userIsCoach: false
   //    }
   // },
   // getters: {
   //    userId(state) {
   //       return state.userId
   //    }, 
   //    // userIsCoach(state) {
   //    //    return state.userIsCoach
   //    // }
   // }
})

export default store;