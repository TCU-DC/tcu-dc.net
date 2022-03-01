<template>
  <nav>
    <NuxtLink to="/">
      <h1><img id="logo" src="~assets/svg/logo.svg" alt="東京都市大学デジタルコンテンツ研究会"></h1>
    </NuxtLink>
    <ul>
      <li>
        <NuxtLink :to="'/' + contents.nav.link1.id">
          {{ contents.nav.link1.title }}<br>
          <span class="sub">{{ contents.nav.link1.id }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="'/' + contents.nav.link2.id">
          {{ contents.nav.link2.title }}<br>
          <span class="sub">{{ contents.nav.link2.id }}</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="'/' + contents.nav.link3.id">
          {{ contents.nav.link3.title }}<br>
          <span class="sub">{{ contents.nav.link3.id }}</span>
        </NuxtLink>
      </li>
    </ul>
    <NuxtLink :to="'/' + contents.nav.joinus.id" class="button">
      {{ contents.nav.joinus.title }}
    </NuxtLink>
  </nav>
</template>
<script>
export default {
  props: ['contents']
}
</script>
