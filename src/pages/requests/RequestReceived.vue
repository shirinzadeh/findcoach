<template>
   <section>
      <base-dialog :show="!!error" title="Error message" @close="errorHandle">
         {{ error }}
      </base-dialog>
      <base-card>
         <header>
            <h2>Requests received</h2>
         </header>
         <base-spinner v-if="isLoading"></base-spinner>
         <ul v-else-if="hasReceivedRequests">
            <requests-item
               v-for="req in receivedRequests"
               :key="req.id"
               :email="req.coachEmail"
               :message="req.coachMsg"
            ></requests-item>
         </ul>
         <h3 v-else>You haven't received any requests yet!</h3>
      </base-card>
   </section>
</template>

<script>
import RequestsItem from './RequestsItem.vue';

export default {
   components: {
      RequestsItem,
   },
   data() {
      return {
         error: null,
         isLoading: false,
      };
   },
   created() {
      this.loadRequests();
   },
   computed: {
      receivedRequests() {
         return this.$store.getters['requests/filterRequests'];
      },
      hasReceivedRequests() {
         return this.$store.getters['requests/hasRequests'];
      },
   },
   methods: {
      async loadRequests() {
         this.isLoading = true;
         try {
            await this.$store.dispatch('requests/getRequest');
         } catch (error) {
            this.error = error.message;
         }
         this.isLoading = false;
      },
      errorHandle() {
         this.error = null;
      },
   },
};
</script>

<style scoped>
header {
   text-align: center;
}

ul {
   list-style: none;
   margin: 2rem auto;
   padding: 0;
   max-width: 30rem;
}

h3 {
   text-align: center;
}
</style>