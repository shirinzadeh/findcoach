<template>
   <coach-form @form-data="savedData"></coach-form>
</template>

<script>
import CoachForm from '../../component/coaches/CoachForm.vue';
export default {
   components: {
      CoachForm,
   },
   methods: {
      savedData(data) {
         this.$store.dispatch('coaches/addCoach', data);
         this.$router.replace('/');
      },
   },
};
</script>

