<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
      >
      </BaseSelect>
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required">category is required</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        type="text"
        name="title"
        label="Title"
        class="field"
        v-model="event.title"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required">title is required</p>
      </template>

      <BaseInput
        type="text"
        name="description"
        label="description"
        class="field"
        v-model="event.description"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required">description is required</p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        type="text"
        name="location"
        label="location"
        class="field"
        v-model="event.location"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required">location is required</p>
      </template>

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required">date is required</p>
      </template>

      <div class="field">
        <BaseSelect
          label="Choose a time"
          :options="times"
          v-model="event.time"
          @blur="$v.event.time.$touch()"
        />
        <template v-if="$v.event.time.$error">
          <p v-if="!$v.event.time.required">time is required</p>
        </template>
      </div>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <BaseButton
        type="submit"
        buttonClass="button -fill-gradient"
        :disabled="$v.$anyError"
      >
        Submit :)
      </BaseButton>
      <p v-if="$v.$anyError">hay errores</p>
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import nprogress from 'nprogress';
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00');
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject() // event is createFreshEventObject
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      date: { required },
      location: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      nprogress.start();
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            // path: '/event',
            params: { id: this.event.id }
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          nprogress.done();
        });
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      };
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
