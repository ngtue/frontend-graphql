<template>
  <div class="book">
    <ApolloQuery
      :query="require('@/graphql/queries/book.gql')"
      :variables="{id: $route.params.id}"
      v-slot="{result: {loading, error, data}}"
      class="container px-5 md:px-10 lg:px-40 mt-10 mx-auto "
    >
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">An error occurred</div>
      <div v-else-if="data" class="flex">
        <div class="w-1/3 mr-10">
          <img :src="data.book.image" alt="cover image" />
        </div>
        <div class="w-2/3">
          <div class="text-xl font-bold text-purple-700">{{ data.book.title }}</div>
          <div>{{ data.book.author }}</div>
          <div class="mt-5">{{ data.book.description }}</div>
          <div class="border border-solid border-purple-700 hover:border-none hover:bg-purple-600 hover:text-white mt-5 w-32 rounded px-4 py-2 text-center">View Link</div>
          <div class="mt-5">
            <router-link :to="`/books/${data.book.id}/edit`" class="mr-5 text-green-600 hover:text-green-500 font-bold">Edit</router-link>
            <a href="#" class="text-red-600 hover:text-red-500 font-bold" @click.prevent="deleteBook">Delete</a>

          </div>
        </div>
      </div>
    </ApolloQuery>
  </div>
</template>

<script>
import deleteBookQuery from '@/graphql/mutations/delete-book.gql'
export default {
  methods: {
    deleteBook() {
      this.$apollo
        .mutate({
          mutation: deleteBookQuery,
          variables: {
            id: this.$route.params.id
          }
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
</script>

<style scope>
.link-margin {
  margin-right: 20px;
}
</style>