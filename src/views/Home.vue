<template>
  <div class="home">
    <div class="hero mb-20 bg-gray-300">
      <div class="container flex-col lg:flex-row mx-auto lg:px-40 px-5 flex lg:justify-between">
        <div class="mt-10">
          <p
            class="lg:w-3/4 text-2xl font-bold leading-tight mb-5"
          >Book recommendation site built with GraphQL</p>
          <p
            class="lg:w-3/4"
          >Built with Laravel(Lighthouse GraphQL), Vue.js(vue-apollo) and Tailwind CSS</p>
          <div class="flex items-center mt-5">
            <a
              href="#"
              class="bg-purple-700 text-white rounded px-4 py-2 mr-4 hover:bg-purple-600"
            >View Books</a>
            <a
              href="#"
              class="border border-solid border-purple-700 px-4 py-2 text-purple-700 rounded hover:border-purple-600 hover:bg-purple-600 hover:text-white"
            >View Screencasts</a>
          </div>
        </div>
        <div class="mt-10 lg:mt-0">
          <img src="../assets/hero.svg" alt="hero" />
        </div>
      </div>
    </div>
    <!-- hero end -->
    <div class="container mx-auto px-5 md:px-10 lg:px-40 mb-20">
      <div class="md:flex -mx-4">
        <div class="md:w-1/4 px-4">
          <div class="bg-gray-300">
            <ApolloQuery :query="categoriesQuery" v-slot="{result: {loading, error, data}}">
              <div v-if="loading">Loading...</div>
              <div v-else-if="error">An error occurred</div>
              <div v-else-if="data">
                <ul class="category-list">
                  <li>
                    <router-link to="/books/add" class="link-margin">Create book</router-link>
                  </li>
                  <li>
                    <a href="#" class="link-margin" @click.prevent="selectCategory('all')">All</a>
                  </li>
                  <li>
                    <a href="#" @click.prevent="selectCategory('featured')">Featured</a>
                  </li>
                  <li
                    v-for="category of data.categories"
                    :key="category.id"
                    @click.prevent="selectCategory('', category.id)"
                  >
                    <a href="#">{{ category.name }}</a>
                  </li>
                </ul>
              </div>
              <div v-else>No result :(</div>
            </ApolloQuery>
          </div>
        </div>
        <div class="md:w-3/4 px-4 md:flex md:flex-wrap -mx-4">
          <div class="lg:w-1/4 md:w-1/3 px-4 mb-5" v-for="book of books" :key="book.id">
            <BookListing :book="book" />
          </div>
        </div>
        <!-- books list end -->
      </div>
    </div>
  </div>
</template>

<script>
import categoryQuery from "@/graphql/queries/category.gql";
import booksQuery from "@/graphql/queries/books.gql";
import categoriesQuery from "@/graphql/queries/categories.gql";
import booksFeaturedQuery from "@/graphql/queries/books-featured.gql";
import BookListing from "@/components/BookListing.vue";

export default {
  name: "Home",
  components: {
    BookListing
  },
  data() {
    return {
      categoryQuery,
      categoriesQuery,
      booksQuery,
      booksFeaturedQuery,
      allCategory: true,
      featuredCategory: false,
      selectedCategory: null,
      books: null
    };
  },
  methods: {
    selectCategory(category, categoryId = null) {
      if (category === "all") {
        this.allCategory = true;
        this.featuredCategory = false;
      } else if (category === "featured") {
        this.featuredCategory = true;
        this.allCategory = false;
      } else {
        this.allCategory = false;
        this.featuredCategory = false;
        this.selectedCategory = categoryId;
      }
    }
  },
  apollo: {
    books: {
      query() {
        if (this.allCategory) {
          return this.booksQuery;
        } else if (this.featuredCategory) {
          return this.booksFeaturedQuery;
        } else {
          return this.categoryQuery;
        }
      },
      variables() {
        if (this.featuredCategory && !this.allCategory) {
          return { featured: true };
        } else if (!this.allCategory) {
          return { id: this.selectedCategory };
        }
      },
      update: data => data.books || data.booksByFeatured || data.category.books
    }
  }
};
</script>

<style scoped>
.link-margin {
  padding-right: 24px;
}
.category-list li {
  margin-bottom: 10px;
}
.category-list > li:hover {
  color: #6b46c1;
}
</style>
