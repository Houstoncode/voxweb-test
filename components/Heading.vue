<template>
  <v-col cols="12">
    <span class="text-h6 font-weight-medium">{{ caption }}</span>
  </v-col>
</template>

<script>
export default {
  props: {
    caption: {
      required: true,
      type: String,
    },
  },
}
</script>
