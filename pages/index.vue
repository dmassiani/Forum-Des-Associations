<template>
  <div class="">
    <Container class="md:rounded-3xl p-6 md:p-20 bg-blue-50">
      <h1 class="text-3xl md:text-6xl font-extrabold text-blue-900">Quelle association sportive près de chez vous ?</h1>
      <p class="mt-4 text-blue-900">Forum des assocations en ligne vous aide à trouver le club sportif le plus proche de chez vous pour tous les sports, Football, Baseball, Basketball, Handball et tellement d'autres.</p>
      <Search class="mt-12"/>
    </Container>

    <Container class="mt-12 px-6 md:px-0">
      <div class="flex items-center grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div class="">
          <h2 class="text-2xl md:text-5xl font-extrabold text-blue-900">Reprendre le sport est facile</h2>
          <p class="mt-4 text-blue-900">Commencer par trouver le bon club près de chez vous. Essayez-vous à plusieurs sports. Trouvez le club qui est fait pour vous.</p>
        </div>
        <div class="">
          <!-- <img src="/illustrations/basketball.svg" alt=""> -->
        </div>
      </div>
    </Container>

    <Container class="mt-12 px-6 md:px-0">
      <div class="flex items-center grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        <div class="">
          <!-- <img src="/illustrations/basketball.svg" alt=""> -->
        </div>
        <div class="">
          <h2 class="text-2xl md:text-5xl font-extrabold text-blue-900">Découvrez de nouveaux sports</h2>
          <p class="mt-4 text-blue-900">Rechaussez vos crampons, remplissez votre gourde et c'est parti. Un tas de gens formidable vous attendent.</p>
        </div>
      </div>
    </Container>

    <div class="bg-pink-50 md:text-center py-12 mt-20 px-6 md:px-0">
      <Container>
        <div class="flex items-center grid grid-cols-1">
          <div class="">
            <h2 class="text-2xl md:text-5xl font-extrabold text-pink-900">Trouver un club est devenue tellement facile</h2>
            <p class="mt-4 text-pink-900">Votre enfant a peut-être besoin de se dépenser différement. Est-il plus adroit avec ses pieds ou avec ses mains ?</p>
            <p class="mt-4 text-pink-900">Aidez-le à trouver le sport le plus adéquate. Son sport.</p>
          </div>
        </div>
      </Container>
    </div>

  </div>
</template>

<script>
import Search from '~/components/Search'

export default {
  mounted() {
    this.$nuxt.$emit('stopLoopPlease')
  }
}
</script>

<style>

</style>
