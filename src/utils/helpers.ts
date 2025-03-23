function normalizeString(str: string): string {
  const accents = /[áéíóúÁÉÍÓÚüÜ]/g;
  const specialChars = /[^a-zA-Z0-9]/g;
  const replacements: { [key: string]: string } = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U',
    ü: 'u',
    Ü: 'U',
  };

  str = str
    .normalize('NFD')
    .replace(accents, (match) => replacements[match] || match)
    .toUpperCase();
  str = str.replace(specialChars, '');

  return str;
}

export function normalizeDepartment(
  departmentCode: string,
  departmentName: string
): { normalizedCode: string; normalizedName: string } {
  departmentCode = departmentCode.startsWith('0')
    ? departmentCode.slice(1)
    : departmentCode;

  return {
    normalizedCode: normalizeString(departmentCode),
    normalizedName: normalizeString(departmentName),
  };
}
