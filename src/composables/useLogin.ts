import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/data-store';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import LoginService from '../services/login.service';
import { UserLogin, DataGov, DataCountry } from '../interfaces/login.interface';
import { UserRole } from 'src/enums/enums/role.enum';
import { isDataCountry, isDataGov } from 'src/utils/typeGuards';

export function useLogin() {
  const router = useRouter();
  const authStore = useAuthStore();
  const $q = useQuasar();
  const { t } = useI18n();

  const tab = ref<'login'>('login');
  const showPassword = ref(false);

  const formLogin = reactive<UserLogin>({
    username: '',
    password: '',
  });

  const loginDataGov = ref<DataGov | null>(null);
  const loginDataCountry = ref<DataCountry | null>(null);
  const error = ref<string | null>(null);

  const isFormValidLogin = computed(() => {
    return !!formLogin.username && !!formLogin.password;
  });

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  /**
   *  Obtener los datos de login desde ambas APIs
   */
  async function fetchLoginData() {
    error.value = null;
    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      const [govResponse, countryResponse] = await Promise.all([
        LoginService.getLoginGov(),
        LoginService.getLoginCountry(),
      ]);
      if (isDataGov(govResponse)) {
        loginDataGov.value = govResponse;
      } else {
        error.value = t('globalMessages.invalidGovData');
      }
      if (isDataCountry(countryResponse.features)) {
        loginDataCountry.value = countryResponse.features;
      } else {
        error.value = t('globalMessages.invalidCountryData');
      }
    } catch (err) {
      error.value = t('globalMessages.errorFetchingData');
    } finally {
      $q.loading.hide();
    }
  }

  /**
   * Maneja el inicio de sesión del usuario
   */
  async function login() {
    if (!isFormValidLogin.value) {
      $q.notify({
        type: 'negative',
        message: t('globalMessages.invalidLogin'),
      });
      return;
    }
    console.log('LOGIN');
    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      const isValid = authStore.validateUser(
        formLogin.username,
        formLogin.password
      );

      if (!isValid) {
        throw new Error('Credenciales incorrectas');
      }
      fetchLoginData();
      authStore.authenticate(true, UserRole.STANDARD_USER);
      router.push('/Dashboard');

      $q.notify({
        type: 'positive',
        message: t('globalMessages.successLogin'),
      });
    } catch (err) {
      $q.notify({ type: 'negative', message: t('globalMessages.errorLogin') });
    } finally {
      $q.loading.hide();
    }
  }

  return {
    tab,
    showPassword,
    formLogin,
    isFormValidLogin,
    login,
    loginDataGov,
    loginDataCountry,
    error,
    togglePasswordVisibility,
  };
}
