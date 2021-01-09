<template>
  <v-row class="tasks" justify="center">
    <v-col cols="11" sm="12" class="tasks__item">
      <v-row>
        <v-col cols="6" sm="9" md="9" lg="9" xl="9">
          <span class="tasks__item-title">Задача</span>
        </v-col>
        <v-col cols="6" sm="3" md="3" lg="3" xl="3">
          <span class="tasks__item-title">Статус</span>
        </v-col>
      </v-row>
    </v-col>
    <task-item v-for="task in tasks" :key="task.id" :item="task" />
  </v-row>
</template>

<script>
import TaskItem from './TaskItem.vue'
export default {
  components: { TaskItem },
  data() {
    return {
      tasks: [
        { title: 'Текст задачи', completed: true },
        {
          title:
            'laboriosam mollitia et enim quasi adipisci quia provident illum',
          completed: false,
        },
      ],
    }
  },
  mounted() {
    this.$requestService
      .getByLink('https://jsonplaceholder.typicode.com/todos/')
      .then(({ data }) => {
        const randomCountTasks = Math.floor(Math.random() * 30) + 3
        this.tasks = data.slice(0, randomCountTasks)
      })
  },
}
</script>
