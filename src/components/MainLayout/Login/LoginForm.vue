<template>
    <q-card>
        <q-card-section>
            <q-form @submit.prevent="login">
                <!-- 🔹 Ahora usa `formLogin.username` -->
                <q-input v-model="formLogin.username" filled :label="t('layout.mainLayout.loginPage.form.username')"
                    :placeholder="t('layout.mainLayout.loginPage.form.usernamePlaceholder')" />

                <!-- 🔹 Ahora usa `formLogin.password` -->
                <q-input v-model="formLogin.password" filled :type="showPassword ? 'text' : 'password'"
                    :label="t('layout.mainLayout.loginPage.form.password')"
                    :placeholder="t('layout.mainLayout.loginPage.form.passwordPlaceholder')">
                    <template v-slot:append>
                        <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                            @click="togglePasswordVisibility" />
                    </template>
                </q-input>

                <!-- 🔹 Mensaje de error si falla el login -->
                <q-banner v-if="error" class="bg-red text-white q-mt-md">
                    {{ error }}
                </q-banner>
            </q-form>
        </q-card-section>

        <q-card-actions align="center">
            <q-btn color="secondary" :label="t('layout.mainLayout.loginPage.buttons.login')"
                :disable="!isFormValidLogin" @click="login" />
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import { useLogin } from 'src/composables/useLogin';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { formLogin, showPassword, togglePasswordVisibility, login, isFormValidLogin, error } = useLogin();
</script>