<template>
   <li>
      <h3>{{ fullName }}</h3>
      <h4>${{ hourlyRate }}/hour</h4>
      <div>
         <base-badge
            v-for="area in areas"
            :key="area"
            :type="area"
            :content="area"
         ></base-badge>
      </div>
      <div class="actions">
         <base-button link :to="contactLink" mode="outline">
            Contact
         </base-button>
         <base-button link :to="viewDetailsLink">View details</base-button>
      </div>
   </li>
</template>

<script>
import BaseBadge from '../ui/BaseBadge.vue';
import BaseButton from '../ui/BaseButton.vue';
export default {
   components: { BaseButton, BaseBadge },
   props: ['id', 'firstName', 'lastName', 'areas', 'description', 'hourlyRate'],
   computed: {
      fullName() {
         return this.firstName + ' ' + this.lastName;
      },
      viewDetailsLink() {
         return this.$route.path + '/' + this.id; // /coaches/c1
      },
      contactLink() {
         return this.viewDetailsLink + '/contact'; // /coaches/c1/contact
      },
   },
};
</script>

<style scoped>
li {
   margin: 1rem 0;
   border: 1px solid #424242;
   border-radius: 12px;
   padding: 1rem;
}

h3 {
   font-size: 1.5rem;
}

h3,
h4 {
   margin: 0.5rem 0;
}

div {
   margin: 0.5rem 0;
}

.actions {
   display: flex;
   justify-content: flex-end;
}
</style>