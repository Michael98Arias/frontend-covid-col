<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated style="background-color: #f1f2ec; height: 77px;">
        <q-toolbar>
          <q-toolbar-title class="text-blue-10" style="font-family: 'Roboto Slab', serif;"></q-toolbar-title>
          <q-space></q-space>
          <div class="q-mr-lg">
            <q-btn flat color="blue-14" icon="person" to="/Login" />
            <q-btn class="q-ml-xl" flat color="blue-14" icon="translate" style="float:left;">
              <q-menu auto-close>
                <q-list style="min-width: 100px">
                  <q-item clickable v-for="lang in dataHomePage.languages" :key="lang.code"
                    @click="changeLanguage(lang.code)">
                    <q-item-section>{{ lang.name }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
      <q-separator></q-separator>
      <div>
        footer
      </div>
    </q-layout>

  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

defineOptions({
  name: 'MainLayout'
});
const dataHomePage = reactive({
  languages: [
    { code: 'en-US', name: 'English' },
    { code: 'es', name: 'Spanish' },
  ],
  showMenu: false
})
const t = useI18n();
const changeLanguage = (langCode: string) => {
  t.locale.value = langCode;
  dataHomePage.showMenu = false;
};

</script>
