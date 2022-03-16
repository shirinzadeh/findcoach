export default {
   namespaced: true,
   state() {
      return {
         requests: []
      }
   },
   mutations: {
      addResource(state, payload) {
         state.requests.push(payload);
      },
      setRequest(state, payload) {
         state.requests = payload;
      }
   },
   actions: {
     async contactCoach(context, data) {
        const newResource = {
         coachEmail: data.email,
         coachMsg: data.message
        }

        const coachId = data.coachId;
        const response = await fetch(`https://vue-http-demo-945ca-default-rtdb.firebaseio.com/requests/${coachId}.json`, {
           method: 'POST',
           body: JSON.stringify(newResource)
        })
        const responseData = await response.json();
        if(!response.ok) {
           const error = new Error(responseData.message || 'Failed to send request');
           throw error;
        }

        newResource.id = responseData.name;
        newResource.coachId = coachId;
        context.commit('addResource', newResource);
     },
     async getRequest(context) {
      const coachId = context.rootGetters.userId  ;
      const token = context.rootGetters.token;
      const response = await fetch(`https://vue-http-demo-945ca-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
      const responseData = await response.json();
      if(!response.ok) {
         const error = new Error(responseData.message || 'Failed to fetch requests');
         throw error;
      }

      const requestHandler = [];
      
      for(const key in responseData) {
         const req = {
            id: key,
            coachId: coachId,            
            coachEmail: responseData[key].coachEmail,
            coachMsg: responseData[key].coachMsg,
         }
         requestHandler.push(req);
      }
      context.commit('setRequest', requestHandler);
     }
   },
   getters: {
      requests(state) {
         return state.requests;
      },
      filterRequests(_, getters, _2, rootGetters) {
         return getters.requests.filter(req => req.coachId === rootGetters.userId)
      },
      hasRequests(_, getters) {
         return getters.filterRequests && getters.filterRequests.length > 0
      },
   }
}