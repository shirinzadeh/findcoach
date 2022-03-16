<template>
   <base-card>
      <span class="filter-option">
         <input type="checkbox" id="frontend" checked @change="updateFilter" />
         <label for="frontend">Frontend</label>
      </span>
      <span class="filter-option">
         <input type="checkbox" id="backend" checked @change="updateFilter" />
         <label for="backend">Backend</label>
      </span>
      <span class="filter-option">
         <input type="checkbox" id="career" checked @change="updateFilter" />
         <label for="career">Career</label>
      </span>
   </base-card>
</template>

<script>
export default {
   emits: ['update-filter'],
   data() {
      return {
         filters: {
            frontend: true,
            backend: true,
            career: true,
         },
      };
   },
   methods: {
      updateFilter(e) {
         const checkboxId = e.target.id;
         const isChecked = e.target.checked;
         const updatedFilter = {
            ...this.filters,
            [checkboxId]: isChecked,
         };
         this.filters = updatedFilter;
         this.$emit('update-filter', updatedFilter);
      },
   },
};
</script>

<style scoped>
h2 {
   margin: 0.5rem 0;
}

.filter-option {
   margin-right: 1rem;
}

.filter-option label,
.filter-option input {
   vertical-align: middle;
}

.filter-option label {
   margin-left: 0.25rem;
}

.filter-option.active label {
   font-weight: bold;
}
</style>