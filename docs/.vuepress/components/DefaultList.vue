<template>
  <div>
    <ul>
      <li v-for="item in this.items">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">{{
          item.name
        }}</a
        >, {{ item.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'default-list',
  props: {
    items: Array
  }
}
</script>
