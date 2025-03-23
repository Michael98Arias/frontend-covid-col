<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">503</div>

      <div class="text-h2" style="opacity: 0.4">
        {{ t('error.withoutPermission') }}
      </div>

      <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/Login" :label="t('error.labelButton')"
        no-caps />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'ErrorWithoutPermission' });

const { t } = useI18n();
</script>
