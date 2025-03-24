import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/data-store';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import LoginService from '../services/login.service';
import {
  UserLogin,
  DataGov,
  DataCountry,
  DepartmentWithCovid,
  Feature,
} from '../interfaces/login.interface';
import { UserRole } from 'src/enums/enums/role.enum';
import { isDataCountry, isDataGov } from 'src/utils/typeGuards';
import { normalizeDepartment } from 'src/utils/helpers';

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
  const mergedData = ref<DepartmentWithCovid[]>([]);
  const isDataLoaded = ref(false);
  const isFormValidLogin = computed(() => {
    return !!formLogin.username && !!formLogin.password;
  });

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  /**
   * Obtener los datos de login y realizar el merge
   */
  async function fetchAndMergeLoginData() {
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
        loginDataCountry.value = countryResponse;
      } else {
        error.value = t('globalMessages.invalidCountryData');
      }
      mergeDataWithCovid();
      isDataLoaded.value = true;
    } catch (err) {
      error.value = t('globalMessages.errorFetchingData');
      isDataLoaded.value = true;
    } finally {
      $q.loading.hide();
    }
  }

  /**
   * Combina los datos de los departamentos con los datos de COVID
   */
  function mergeDataWithCovid() {
    if (!loginDataGov.value || !loginDataCountry.value) {
      return;
    }

    const govData = Array.isArray(loginDataGov.value)
      ? loginDataGov.value
      : [loginDataGov.value];

    if (!Array.isArray(loginDataCountry.value.features)) {
      return;
    }
    mergedData.value = loginDataCountry.value.features.map(
      (department: Feature) => {
        const { DPTO, NOMBRE_DPT } = department.properties;
        const normalizedDept = normalizeDepartment(DPTO, NOMBRE_DPT);

        const matchingCovid = govData.find((covid: DataGov) => {
          const normalizedCovidDept = normalizeDepartment(
            covid.departamento,
            covid.departamento_nom
          );
          return (
            normalizedDept.normalizedCode ===
              normalizedCovidDept.normalizedCode &&
            normalizedDept.normalizedName === normalizedCovidDept.normalizedName
          );
        });

        return {
          ...department,
          covidData: matchingCovid || null,
        };
      }
    );
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
    $q.loading.show({ message: t('globalMessages.wait') });

    try {
      const isValid = authStore.validateUser(
        formLogin.username,
        formLogin.password
      );

      if (!isValid) {
        throw new Error('Credenciales incorrectas');
      }
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

  onMounted(() => {

    if (!isDataLoaded.value) {
      fetchAndMergeLoginData();
    }
  });

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
    mergedData,
    isDataLoaded,
  };
}
