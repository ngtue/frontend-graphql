<template >
  <div>
    <router-link :to="`/books/${book.id}`">
      <img :src="book.image" alt="cover image" class="h-56 mb-3" />
    </router-link>
    <router-link
      :to="`/books/${book.id}`"
      class="font-bold text-purple-700 hover:text-purple-600"
    >{{ book.title }}</router-link>
    <div class="text-gray-600 text-sm">{{ book.author }}</div>
  </div>
</template>
<script>
export default {
  props: ['book']
}
</script>