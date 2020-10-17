
<template>
  <div class="event-link">
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <BaseIcon />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Previous</router-link
      >
    </template>
    |
    <template v-if="page < totalAvailablePage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="prev"
        >Next</router-link
      >
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
import store from '../store/index';

const getPageEvents = (to, next) => {
  const currentPage = parseInt(to.query.page) || 1;
  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      to.params.page = currentPage;
      next();
    });
};

export default {
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  computed: {
    // page() {
    //   return; //
    // },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage;
    },
    totalAvailablePage() {
      return Math.ceil(store.state.event.totalPageCount / 3);
    },
    ...mapState(['event', 'user'])
  },
  components: {
    EventCard
  }

  // created() {
  //   this.$store.dispatch('event/fetchEvents', {
  //     perPage: 3,
  //     page: this.page
  //   });
  // }
};
</script>

<style>
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
