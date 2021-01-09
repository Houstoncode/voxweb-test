<template>
  <v-col cols="11" sm="12" class="tasks__item">
    <v-row>
      <v-col cols="6" sm="9" md="9" lg="9" xl="9">
        <span class="tasks__item-title">{{ item.title }}</span>
      </v-col>
      <v-col cols="6" sm="3" md="3" lg="3" xl="3">
        <v-checkbox
          v-model="item.completed"
          on-icon="$checkboxChecked"
          off-icon="$checkbox"
          :ripple="false"
          ><template v-slot:label>
            <span :class="{ 'tasks__item-success': item.completed }"
              >Выполнено</span
            >
          </template></v-checkbox
        >
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.tasks {
  .tasks__item {
    padding: 0 !important;
    padding-top: 12px !important;
    border-bottom: #eff1f9 solid 1px;

    &-title {
      color: #bababa;
    }

    &-success {
      color: #51cb3d;
    }

    &-text {
      overflow: hidden;
      width: 300px;
      font-weight: 500;
      color: #303136;
      word-break: break-all;
    }

    &-action {
      .v-input--selection-controls {
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
