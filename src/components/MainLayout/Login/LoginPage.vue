<template>
  <q-page class="fullscreen-page">
    <q-card class="centered-card">
      <q-card-section>
        <q-tabs v-model="tab" class="text-teal">
          <q-tab name="login" icon="login" :label="t('layout.mainLayout.loginPage.titles.main')" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab">
          <q-tab-panel name="login">
            <LoginForm /><q-banner v-if="error" class="bg-red text-white q-mt-md">
              {{ error }}
            </q-banner>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useLogin } from '../../../composables/useLogin';
import { useI18n } from 'vue-i18n';
import LoginForm from './LoginForm.vue';

const { t } = useI18n();
const { tab, error } = useLogin();
</script>
