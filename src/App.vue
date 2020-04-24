<template>
  <div id="app" class="font-sans">
    <div id="nav" class="bg-purple-500">
      <div class="container px-40 mx-auto flex items-center justify-between py-10 text-white">
        <div>
          <a href="/"><img src="./assets/logo.svg" alt="logo"></a>
        </div>
        <div>
          <router-link to="/" class="hover:text-gray-400">Home</router-link> |
          <router-link to="/about" class="hover:text-gray-400">About</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>