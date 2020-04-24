<template>
  <div class="book-create">
    <div class="px-5 md:px-10 lg:px-40 container mx-auto mt-10">
      <h1 class="text-2xl text-purple-700 mb-5">Create a book</h1>
      <form action="#" method="POST" @submit.prevent="addBook">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" name="title" id="title" v-model="title" />
        </div>
        <div class="form-group">
          <label for="author">Author</label>
          <input type="text" name="author" id="author" v-model="author" />
        </div>
        <div class="form-group">
          <label for="image">Image</label>
          <input type="text" name="image" id="image" v-model="image" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea cols="30" rows="10" name="description" id="description" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="link">Link</label>
          <input type="text" name="link" id="link" v-model="link" />
        </div>
        <div class="form-group">
          <label for="featured">Featured</label>
          <input type="checkbox" name="featured" id="featured" v-model="featured" />
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <ApolloQuery :query="require('@/graphql/queries/categories.gql')">
            <template v-slot="{result: {loading, error, data}}">
              <div>
                <div v-if="loading">Loading...</div>
                <div v-else-if="error">An error occurred</div>
                <div v-else-if="data">
                  <select
                    name="category"
                    id="category"
                    class="input-field input-normal"
                    v-model="category_id"
                  >
                    <option
                      v-for="category of data.categories"
                      :key="category.id"
                      :value="category.id"
                    >{{ category.name }}</option>
                  </select>
                </div>
                <div v-else>No result :(</div>
              </div>
            </template>
          </ApolloQuery>
        </div>
        <div class="form-group">
          <button type="submit" class="bg-green-600 hover:bg-green-500 text-white font-bold rounded px-4 py-2">Add book</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import addBookQuery from "@/graphql/mutations/add-book.gql";
export default {
  data() {
    return {
      title: "",
      author: "",
      image: "",
      description: "",
      link: "",
      featured: false,
      category_id: 1
    };
  },
  methods: {
    addBook() {
      this.$apollo
        .mutate({
          mutation: addBookQuery,
          variables: {
            title: this.title,
            author: this.author,
            image: this.image,
            description: this.description,
            link: this.link,
            featured: this.featured,
            category_id: this.category_id
          }
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}
input[type="text"], textarea, select {
  padding: 5px 7px;
  border: 1px solid purple;
  border-radius: 5px;
}
label {
  margin-right: 10px;
  display: block;
  font-weight: bold;
}
</style>