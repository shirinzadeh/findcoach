<template>
   <section>
      <coach-filter @update-filter="setFilter"></coach-filter>
   </section>
   <section>
      <base-card>
         <base-dialog :show="!!errorMsg" title="Error" @close="errorHandler">
            {{ errorMsg }}
         </base-dialog>
         <div class="controls">
            <base-button mode="outline" @click="loadCoaches"
               >REFRESH</base-button
            >
            <!-- ADDING CUSTOM QUERY -->
            <!-- REDIRECT TO REGISTER PAGE AFTER LOGIN  -->
            <!-- redirect yerine istenilen sey yazmaq olar. red ve ya from ve s.   -->
            <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
               >Login as a Coach</base-button
            >
            <base-button
               v-if="!isCoach && !isLoading && isLoggedIn"
               link
               to="/register"
            >
               Register as a Coach
            </base-button>
         </div>
         <div v-if="isLoading">
            <base-spinner></base-spinner>
         </div>
         <ul v-else-if="hasCoaches">
            <coach-item
               v-for="coach in filteredCoaches"
               :key="coach.id"
               :id="coach.id"
               :first-name="coach.firstName"
               :last-name="coach.lastName"
               :areas="coach.areas"
               :description="coach.description"
               :hourly-rate="coach.hourlyRate"
            ></coach-item>
         </ul>
         <p v-else>There isn't any coach</p>
      </base-card>
   </section>
</template>

<script>
import CoachItem from '../../component/coaches/CoachItem.vue';
import CoachFilter from '../../component/coaches/CoachFilter.vue';

export default {
   components: {
      CoachItem,
      CoachFilter,
   },
   data() {
      return {
         isLoading: false,
         errorMsg: null,
         activeFilters: {
            frontend: true,
            backend: true,
            career: true,
         },
      };
   },
   computed: {
      isCoach() {
         // return this.$store.getters.userIsCoach;
         return this.$store.getters['coaches/isCoach'];
      },
      filteredCoaches() {
         const coaches = this.$store.getters['coaches/coaches'];
         return coaches.filter((coach) => {
            if (
               this.activeFilters.frontend &&
               coach.areas.includes('frontend')
            ) {
               return true;
            }
            if (this.activeFilters.backend && coach.areas.includes('backend')) {
               return true;
            }
            if (this.activeFilters.career && coach.areas.includes('career')) {
               return true;
            }
            return false;
         });
      },
      hasCoaches() {
         return this.$store.getters['coaches/hasCoaches'];
      },
      isLoggedIn() {
         return this.$store.getters.isAuthenticated;
      },
   },
   created() {
      this.loadCoaches();
   },
   methods: {
      setFilter(updatedFilter) {
         this.activeFilters = updatedFilter;
      },
      async loadCoaches() {
         this.isLoading = true;
         await this.$store.dispatch('coaches/getCoaches');
         this.isLoading = false;
      },
      errorHandler() {
         this.errorMsg = null;
      },
   },
};
</script>

<style scoped>
ul {
   list-style: none;
   margin: 0;
   padding: 0;
}

.controls {
   display: flex;
   justify-content: space-between;
}
</style>