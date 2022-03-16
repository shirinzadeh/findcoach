let timer;

export default {
   state() {
      return {
         userId: null,
         token: null,
      }
   },
   mutations: {
      setAuthentication(state, payload) {
         state.userId = payload.userId;
         state.token = payload.idToken;
      }
   },
   actions: {
      async signup(context, data) {
         context.dispatch('auth', {
            ...data, 
            mode: 'signup'
         })
      },
      async login(context,data) {
         return context.dispatch('auth', {
            ...data,
            mode: 'login'
         });
      },
      /**LOGIN VE SIGNUP KOD EYNI OLDUGU UCUN auth ACTION YARADIRIQ. TEK FERQLERI URL OLDUGUNA GORE 
       * MODE TEYIN EDIRIK.
       */
      async auth(context, data) {
         const mode = data.mode; 
         //login url
         let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoOke-sSP_DWm_03uzYBDBCHvcO2ZMjks'
         
         if(mode === 'signup') {
            //signup url
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoOke-sSP_DWm_03uzYBDBCHvcO2ZMjks';
         }
         const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
               email: data.email,
               password: data.password,
               returnSecureToken: true,
            })
         })
         const responseData = await response.json();
         if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to sign up');
            throw error;
         }

         const expiresIn = +responseData.expiresIn * 1000;
         const expirationDate = new Date().getTime() + expiresIn;

         localStorage.setItem('token', responseData.idToken);
         localStorage.setItem('id', responseData.localId);
         localStorage.setItem('expiresIn', expirationDate)
         
         timer = setTimeout(() => {
            context.dispatch('logout')
         }, expiresIn);

         context.commit('setAuthentication', {
            userId: responseData.localId,
            idToken: responseData.idToken,
            expirationDate: expirationDate,
         })
      },
      tryLogin(context) {
         const token = localStorage.getItem('token');
         const userId = localStorage.getItem('id');
         const expiresIn = localStorage.getItem('expiresIn');

         const differenceExpAndCurrentTime = +expiresIn - new Date().getTime();
         if(differenceExpAndCurrentTime < 0) {
            return;
         }

         // timer = setTimeout(() => {
         //    context.dispatch('logout')
         // }, expiresIn);

         if(token && userId) {
            context.commit('setAuthentication', {
               idToken: token,
               userId: userId,
            })
         }
      },
      logout(context) {
         localStorage.removeItem('token');
         localStorage.removeItem('id');
         localStorage.removeItem('expiresIn')

         clearInterval(timer)

         //Bu sekilde yazmaq sehvdir, cunki bu actiondir mutation deyil
         /*context.state.userId = null;
         context.state.token = null;
         context.state.expirationDate = null;*/
         context.commit('setAuthentication', {
            userId: null,
            idToken: null,
         })
      },
   },
   getters: {
      userId(state) {
         return state.userId
      }, 
      token(state) {
         return state.token
      },
      isAuthenticated(state) {
         return !!state.token
      }
   }
}