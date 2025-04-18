// Texts in the Spanish language.

export default {
  error: {
    notFound: 'Ups. Nada aquí...',
    withoutPermission: 'Lo siento, no tienes permisos.',
    labelButton: 'Ir al inicio',
  },
  globalMessages: {
    wait: 'Por favor, espere un momento...',
    successfulChange: '¡Cambio con éxito!',
    successfulCreate: '¡Creado con éxito!',
    errorApi: 'Ocurrió algo inesperado intenta de nuevo.',
    errorNotFound: 'Usuario no encontrado.',
    errorDisabled: 'Usuario deshabilitado.',
    confirm: '¿Está seguro?',
    delete: 'Se eliminara: ',
    enable: 'Se habilitará: ',
    invalidGovData: 'Datos del gobierno inválidos.',
    invalidCountryData: 'Datos del país inválidos.',
    errorFetchingData: 'Error al obtener los datos.',
    invalidLogin: 'Credenciales de inicio de sesión inválidas.',
    successLogin: 'Inicio de sesión exitoso.',
    errorLogin: 'Error al iniciar sesión.',
  },
  layout: {
    mainLayout: {
      loginPage: {
        titles: {
          main: 'Iniciar sesión',
          govData: 'Datos del Gobierno',
          countryData: 'Datos del País',
        },
        form: {
          username: 'Usuario',
          password: 'Contraseña',
          usernamePlaceholder: 'Ingrese su usuario',
          passwordPlaceholder: 'Ingrese su contraseña',
        },
        buttons: {
          login: 'Iniciar Sesión',
          register: 'Crear Cuenta',
          forgotPassword: '¿Olvidaste tu contraseña?',
          loadData: 'Cargar Datos',
          showPassword: 'Mostrar Contraseña',
          hidePassword: 'Ocultar Contraseña',
        },
        messages: {
          invalidLogin: 'Credenciales incorrectas',
          wait: 'Por favor espera...',
          successLogin: 'Inicio de sesión exitoso',
          errorLogin: 'Error en el inicio de sesión',
        },
      },
      dashboard: {
        departmentInfo: {
          title: 'Información del Departamento',
          departmentLabel: 'Departamento:',
          closeButton: 'Cerrar',
        },
        covidTable: {
          key: 'Clave',
          value: 'Valor',
        },
      },
    },
  },
};
