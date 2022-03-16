<template>
   <div>
      <base-dialog :show="!!error" title="Sign up" @close="error = null">
         {{ error }}
      </base-dialog>
      <base-dialog :show="isLoading" title="Authenticating...">
         <base-spinner></base-spinner>
      </base-dialog>
      <base-card>
         <form @submit.prevent="submitForm">
            <div class="form-control">
               <label for="email">Email</label>
               <input type="email" id="email" v-model.trim="email" />
            </div>
            <div class="form-control">
               <label for="password">Password</label>
               <input type="password" id="password" v-model.trim="password" />
            </div>
            <p v-if="!isFormValid">Please fix above issues</p>
            <base-button>{{ loginModeCapture }}</base-button>
            <base-button type="button" mode="flat" @click="setAuthMode"
               >{{ signupModeCapture }} instead</base-button
            >
         </form>
      </base-card>
   </div>
</template>

<script>
export default {
   data() {
      return {
         email: '',
         password: '',
         isFormValid: true,
         error: null,
         isLoading: false,
         mode: 'login',
      };
   },
   computed: {
      loginModeCapture() {
         if (this.mode === 'login') {
            return 'Login';
         } else {
            return 'Signup';
         }
      },
      signupModeCapture() {
         if (this.mode === 'login') {
            return 'Signup';
         } else {
            return 'Login';
         }
      },
   },
   methods: {
      async submitForm() {
         this.isFormValid = true;
         if (!this.email.includes('@') || this.password.length < 6) {
            this.isFormValid = false;
         }

         this.isLoading = true;

         const formData = {
            email: this.email,
            password: this.password,
         };
         try {
            if (this.mode === 'login') {
               await this.$store.dispatch('login', formData);
            } else {
               await this.$store.dispatch('signup', formData);
            }

            //query.redirect --> CoachList comp-de Login as coach btn kliklenen zaman urlde yaranan query

            /* // MAX-IN YAZDIGI KIMI DAHA QISA KOD 
            // const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
            // this.$router.replace(redirectUrl); */
            const redirectUrl = this.$route.query.redirect;
            // const redirectedFromUrl = this.$route.redirectedFrom.fullPath;
            /** eger urlde query teyin olunubsa hemin querydeki pathe get,
             * teyin olmayibsa login olduqdan sonra bir onceki sehifeye get
             */
            if (redirectUrl) {
               this.$router.replace('/' + redirectUrl);
               // } else if (redirectedFromUrl != undefined) {
               //    this.$router.replace(redirectedFromUrl);
            } else {
               this.$router.replace('/coaches');
            }
         } catch (err) {
            this.error = err.message;
         }

         this.isLoading = false;
      },
      setAuthMode() {
         if (this.mode === 'login') {
            this.mode = 'signup';
         } else {
            this.mode = 'login';
         }
      },
   },
};
</script>

<style scoped>
form {
   margin: 1rem;
   padding: 1rem;
}

.form-control {
   margin: 0.5rem 0;
}

label {
   font-weight: bold;
   margin-bottom: 0.5rem;
   display: block;
}

input,
textarea {
   display: block;
   width: 100%;
   font: inherit;
   border: 1px solid #ccc;
   padding: 0.15rem;
}

input:focus,
textarea:focus {
   border-color: #3d008d;
   background-color: #faf6ff;
   outline: none;
}
</style>