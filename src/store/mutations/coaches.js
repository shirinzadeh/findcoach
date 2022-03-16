export default {
   namespaced: true,
   state() {
      return {
         lastFetchTime: null,
         coaches: [
            {
              id: 'c1',
              firstName: 'Maximilian',
              lastName: 'Schwarzmüller',
              areas: ['frontend', 'backend', 'career'],
              description:
                "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
              hourlyRate: 30
            },
            {
              id: 'c2',
              firstName: 'Julie',
              lastName: 'Jones',
              areas: ['frontend', 'career'],
              description:
                'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
              hourlyRate: 30
            },
         ]
      }
   },
   mutations: {
      addCoach(state, payload) {
         state.coaches.push(payload);
      },
      setCoaches(state, payload) {
         state.coaches = payload;
      },
      setFetchTimeStamp(state) {
         state.lastFetchTime = new Date().getTime()
      } 
   },
   actions: {
      async addCoach(context, data) {
         /* Ya form submit olan zaman form datasini yadda saxladigimiz objectde 
         coaches arrayindeki key-lere gore yadda saxlanamliydi, ya da ki actionsda deyismek lazimdi */
         const fixedData = {
            // id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            areas: data.areas,
            description: data.desc,
            hourlyRate: data.rate
         }

         /** FETCHDEN SONRA */
         const coachId = context.rootGetters.userId;
         const token = context.rootGetters.token;
         const response = await fetch(`https://vue-http-demo-945ca-default-rtdb.firebaseio.com/coaches/${coachId}.json?auth=${token}`, {
            method: 'PUT', //tells Firebase that data in there will be overwritten if it existed or will be created if it didn't exist yet. And the difference to POST is that with POST, a new entry would be added all the time,
            body: JSON.stringify(fixedData)
         })
         // const responseData = await response.json();
         if(!response.ok) {
            //error
         }
         context.commit('addCoach', {
            ...fixedData,
            id: coachId
         });
         // context.rootState.userIsCoach = true;
      },
      async getCoaches(context) {
         if(!context.getters.shouldUpdate) {
            return
         }
         const response = await fetch(`https://vue-http-demo-945ca-default-rtdb.firebaseio.com/coaches.json`);
         const responseData = await response.json();

         if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to load coach');
            throw error;
         }

         const coachesHelper = []

         for(let key in responseData) {
            const coach = {
               id: key,
               firstName: responseData[key].firstName,
               lastName: responseData[key].lastName,
               areas: responseData[key].areas,
               description: responseData[key].description,
               hourlyRate: responseData[key].hourlyRate
            }
            coachesHelper.push(coach)
         }

         context.commit('setCoaches', coachesHelper);
         context.commit('setFetchTimeStamp')
      },
   },
   getters: {
      coaches(state) {
         return state.coaches;
      },
      hasCoaches(state) {
         return state.coaches && state.coaches.length > 0
      },
      isCoach(_, getters, _2, rootGetters) {
         /**
          * Alternative way is creating userIsCoach data in state.
          * and make it true after adding(registering) coach
          */
         // get coaches array
         const coaches = getters.coaches; 
         // get new user id 
         const coachId = rootGetters.userId; 
         // check if one of the coaches[] ids is new user id
         return coaches.some(coach => coach.id === coachId); 
      },
      shouldUpdate(state) {
         const lastFetchTime = state.lastFetchTime;
         if(!lastFetchTime) {
            return true
         }
         const currentTime = new Date().getTime();
         return (currentTime - lastFetchTime) / 1000 > 60
      }
   }
}