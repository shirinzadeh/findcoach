<template>
   <base-card>
      <form @submit.prevent="submitForm">
         <div class="form-control" :class="{ invalid: !firstname.isValid }">
            <label for="firstname">Firstname</label>
            <input
               type="text"
               id="firstname"
               v-model.trim="firstname.val"
               @blur="clearValidity"
            />
         </div>
         <div class="form-control" :class="{ invalid: !lastname.isValid }">
            <label for="lastname">Lastname</label>
            <input
               type="text"
               id="lastname"
               v-model.trim="lastname.val"
               @blur="clearValidity"
            />
         </div>
         <div class="form-control" :class="{ invalid: !description.isValid }">
            <label for="description">Description</label>
            <textarea
               id="description"
               v-model.trim="description.val"
               @blur="clearValidity"
            >
            </textarea>
         </div>
         <div class="form-control" :class="{ invalid: !rate.isValid }">
            <label for="rate">Hourly rate</label>
            <input
               type="number"
               id="rate"
               v-model.trim="rate.val"
               @blur="clearValidity"
            />
         </div>
         <div class="form-control" :class="{ invalid: !areas.isValid }">
            <h3>Areas of expertise</h3>
            <div>
               <input
                  type="checkbox"
                  name=""
                  id="frontend"
                  value="frontend"
                  v-model="areas.val"
                  @blur="clearValidity"
               />
               <label for="frontend">Frontend development</label>
            </div>
            <div>
               <input
                  type="checkbox"
                  name=""
                  id="backend"
                  value="backend"
                  v-model="areas.val"
                  @blur="clearValidity"
               />
               <label for="backend">Backend development</label>
            </div>
            <div>
               <input
                  type="checkbox"
                  name=""
                  id="career"
                  value="career"
                  v-model="areas.val"
                  @blur="clearValidity"
               />
               <label for="career">Career advicory</label>
            </div>
         </div>
         <base-button>Register</base-button>
      </form>
   </base-card>
</template>

<script>
export default {
   emits: ['form-data'],
   data() {
      return {
         firstname: {
            val: '',
            isValid: true,
         },
         lastname: {
            val: '',
            isValid: true,
         },
         description: {
            val: '',
            isValid: true,
         },
         rate: {
            val: null,
            isValid: true,
         },
         areas: {
            val: [],
            isValid: true,
         },
         isFormValid: true,
      };
   },
   methods: {
      clearValidity(e) {
         const id = e.target.id;
         if (this[id]) {
            this[id].isValid = true;
         }
         if (this.areas.val.includes(id)) {
            console.log('yes');
            this.areas.isValid = true;
         }
      },
      formValidation() {
         this.isFormValid = true;

         if (this.firstname.val === '') {
            this.firstname.isValid = false;
            this.isFormValid = false;
         }
         if (this.lastname.val === '') {
            this.lastname.isValid = false;
            this.isFormValid = false;
         }
         if (this.description.val === '') {
            this.description.isValid = false;
            this.isFormValid = false;
         }
         if (!this.rate.val) {
            this.rate.isValid = false;
            this.isFormValid = false;
         }
         if (this.areas.val.length === 0) {
            this.areas.isValid = false;
            this.isFormValid = false;
         }
      },
      submitForm() {
         this.formValidation();

         if (!this.isFormValid) {
            // Not execute the rest of the code if isFormValid is false
            return;
         }

         const formData = {
            first: this.firstname.val,
            last: this.lastname.val,
            desc: this.description.val,
            rate: this.rate.val,
            areas: this.areas.val,
         };
         this.$emit('form-data', formData);
      },
   },
};
</script>

<style scoped>
.form-control {
   margin: 0.5rem 0;
}

label {
   font-weight: bold;
   display: block;
   margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
   font-weight: normal;
   display: inline;
   margin: 0 0 0 0.5rem;
}

input,
textarea {
   display: block;
   width: 100%;
   border: 1px solid #ccc;
   font: inherit;
}

input:focus,
textarea:focus {
   background-color: #f0e6fd;
   outline: none;
   border-color: #3d008d;
}

input[type='checkbox'] {
   display: inline;
   width: auto;
   border: none;
}

input[type='checkbox']:focus {
   outline: #3d008d solid 1px;
}

h3 {
   margin: 0.5rem 0;
   font-size: 1rem;
}

.invalid label {
   color: red;
}

.invalid input,
.invalid textarea {
   border: 1px solid red;
}
</style>