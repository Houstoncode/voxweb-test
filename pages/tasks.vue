<template>
  <v-row align="center">
    <heading caption="Список задач" />
    <v-col cols="12">
      <v-card elevation="0">
        <v-card-text>
          <tasks />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Tasks from '~/components/tasks/Tasks'

export default {
  components: { Tasks },
}
</script>
