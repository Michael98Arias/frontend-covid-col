export interface UserLogin {
  username: string;
  password: string;
}

// DataGov
export interface DataGov {
  fecha_reporte_web: Date;
  id_de_caso: string;
  fecha_de_notificaci_n: Date;
  departamento: string;
  departamento_nom: DepartamentoNom;
  ciudad_municipio: string;
  ciudad_municipio_nom: string;
  edad: string;
  unidad_medida: string;
  sexo: Sexo;
  fuente_tipo_contagio: FuenteTipoContagio;
  ubicacion: Ubicacion;
  estado: Estado;
  recuperado: Recuperado;
  fecha_inicio_sintomas?: Date;
  fecha_diagnostico: Date;
  fecha_recuperado?: Date;
  tipo_recuperacion?: TipoRecuperacion;
  per_etn_: string;
  fecha_muerte?: Date;
  nom_grupo_?: string;
}

export enum DepartamentoNom {
  Antioquia = 'ANTIOQUIA',
  Arauca = 'ARAUCA',
  Atlantico = 'ATLANTICO',
  Barranquilla = 'BARRANQUILLA',
  Bogota = 'BOGOTA',
  Bolivar = 'BOLIVAR',
  Boyaca = 'BOYACA',
  Caldas = 'CALDAS',
  Caqueta = 'CAQUETA',
  Cartagena = 'CARTAGENA',
  Casanare = 'CASANARE',
  Cauca = 'CAUCA',
  Cesar = 'CESAR',
  Cordoba = 'CORDOBA',
  Cundinamarca = 'CUNDINAMARCA',
  Guajira = 'GUAJIRA',
  Huila = 'HUILA',
  Magdalena = 'MAGDALENA',
  Meta = 'META',
  Nariño = 'NARIÑO',
  NorteSantander = 'NORTE SANTANDER',
  Quindio = 'QUINDIO',
  Risaralda = 'RISARALDA',
  Santander = 'SANTANDER',
  StaMartaDE = 'STA MARTA D.E.',
  Sucre = 'SUCRE',
  Tolima = 'TOLIMA',
  Valle = 'VALLE',
}

export enum Estado {
  Fallecido = 'Fallecido',
  Leve = 'Leve',
  NA = 'N/A',
}

export enum FuenteTipoContagio {
  Comunitaria = 'Comunitaria',
  Relacionado = 'Relacionado',
}

export enum Recuperado {
  Fallecido = 'Fallecido',
  NA = 'N/A',
  Recuperado = 'Recuperado',
}

export enum Sexo {
  F = 'F',
  M = 'M',
}

export enum TipoRecuperacion {
  Pcr = 'PCR',
  Tiempo = 'Tiempo',
}

export enum Ubicacion {
  Casa = 'Casa',
  Fallecido = 'Fallecido',
  NA = 'N/A',
}

// DataCountry
export interface DataCountry {
  type: string;
  crs: CRS;
  features: Feature[];
}

export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface CRSProperties {
  name: string;
}

export interface Feature {
  type: FeatureType;
  properties: FeatureProperties;
  geometry: Geometry;
}

export interface Geometry {
  type: GeometryType;
  coordinates: Array<Array<Array<number[] | number>>>;
}

export enum GeometryType {
  MultiPolygon = 'MultiPolygon',
  Polygon = 'Polygon',
}

export interface FeatureProperties {
  DPTO: string;
  NOMBRE_DPT: string;
  AREA: number;
  PERIMETER: number;
  HECTARES: number;
}

export enum FeatureType {
  Feature = 'Feature',
}
