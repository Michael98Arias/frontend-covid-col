import { DataGov, DataCountry } from '../interfaces/login.interface';

export function isDataGov(dataGov: unknown): dataGov is DataGov {
  if (!dataGov) {
    return false;
  }

  if (Array.isArray(dataGov)) {
    dataGov = dataGov[0];
  }

  if (typeof dataGov !== 'object' || dataGov === null) {
    return false;
  }

  const hasFecha = Object.hasOwn(dataGov, 'fecha_reporte_web');
  const hasCaso = Object.hasOwn(dataGov, 'id_de_caso');

  return hasFecha && hasCaso;
}

export function isDataCountry(
  dataCountry: unknown
): dataCountry is DataCountry {
  if (!dataCountry) {
    return false;
  }

  if (Array.isArray(dataCountry)) {
    dataCountry = dataCountry[0];
  }

  if (typeof dataCountry !== 'object' || dataCountry === null) {
    return false;
  }

  const hasGeometry = Object.hasOwn(dataCountry, 'geometry');
  const hasProperties = Object.hasOwn(dataCountry, 'properties');

  return hasGeometry && hasProperties;
}
