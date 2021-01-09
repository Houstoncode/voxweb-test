<template>
  <v-app>
    <v-app-bar
      height="64px"
      max-height="64px"
      class="d-flex d-md-none"
      elevation="0"
      color="white"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center pl-5 ml-4">
        <logo :width="80" :height="20" :color="'#BD0D22'" />
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      mobile-breakpoint="md"
      floating
    >
      <v-layout class="drawer-header d-none d-md-flex">
        <logo v-if="!miniVariant" :width="80" :height="20" :color="'#BD0D22'" />
        <v-icon v-else class="logo-mini" size="20" color="#BD0D22"
          >$logo</v-icon
        >
        <v-btn
          class="drawer-action"
          absolute
          fab
          icon
          elevation="2"
          color="#6FBC9A"
          @click="miniVariant = !miniVariant"
        >
          <v-icon size="24"
            >mdi-chevron-left {{ miniVariant ? 'mdi-rotate-180' : '' }}</v-icon
          >
        </v-btn>
      </v-layout>
      <v-list class="drawer" flat>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          class="drawer__list-item"
          :to="item.to"
          router
          exact
          :ripple="false"
          :class="{ 'mini-variant': miniVariant }"
          exact-active-class="item-active"
        >
          <v-list-item-action>
            <v-icon size="20">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="main" :class="{ 'mini-variant': miniVariant }">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from '../components/Logo.vue'
export default {
  components: { Logo },
  middleware: ['auth'],
  data() {
    return {
      isMobile: false,
      drawer: false,
      items: [
        {
          icon: '$work',
          title: 'Мой профиль',
          to: '/',
        },
        {
          icon: '$product',
          title: 'Список задач',
          to: '/tasks',
        },
        {
          icon: '$question',
          title: 'Статистика',
          to: '/stats',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return

    window.removeEventListener('resize', this.onResize, { passive: true })
  },

  mounted() {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })
  },

  methods: {
    onResize() {
      if (!this.isMobile && window.innerWidth < 960) {
        this.drawer = false
      }

      this.isMobile = window.innerWidth < 960

      if (!this.isMobile) {
        this.drawer = true
      }
    },
  },
}
</script>

<style lang="scss">
.main {
  background-color: #eff1f9;
  padding: 40px 48px !important;
  max-width: calc(100% - 256px) !important;
  margin: 0;

  &.mini-variant {
    max-width: calc(100% - 56px) !important;
  }

  .container--fluid {
    padding: 0;
  }

  @media (max-width: 960px) {
    max-width: 100% !important;
    padding: 24px 16px !important;
  }
}

.v-application--wrap {
  flex-direction: row !important;

  @media (max-width: 960px) {
    flex-direction: column !important;
  }
}

.theme--light.v-application {
  background-color: #eff1f9;
}

.drawer-header {
  display: flex;
  padding: 24px 0 24px 0;
  align-content: center;
}

.drawer-action {
  right: -20px;
  transform: translateY(-25%);
  height: 40px !important;
  width: 40px !important;
  background-color: #fff;
  cursor: pointer;
}

.v-navigation-drawer__content {
  overflow: visible !important;
  min-width: 256px;
  padding-left: 56px;
}

.v-navigation-drawer {
  overflow: visible !important;

  @media (max-width: 960px) {
    position: absolute;
    z-index: 1;
    top: 64px !important;
    width: 100% !important;
    height: calc(100% - 64px) !important;

    &__content {
      padding: 0 16px;
    }
  }

  &--mini-variant {
    .v-navigation-drawer__content {
      min-width: 56px;
      padding-left: 0 !important;

      .drawer-header {
        justify-content: center;
      }
    }
  }
}

.drawer {
  padding: 0 !important;
  &__list-item {
    padding: 0 !important;
    .v-list-item__action {
      margin-right: 8px !important;
    }

    &.mini-variant {
      padding: 0 16px !important;
    }
  }

  @media (max-width: 960px) {
    a {
      padding: 0 16px !important;
    }
  }
}

.v-list-item__title {
  font-weight: 500 !important;
}

.item-active {
  .v-list-item__action {
    color: #bd0d22 !important;
  }
  .v-list-item__content {
    color: #303136;
  }
}
</style>
