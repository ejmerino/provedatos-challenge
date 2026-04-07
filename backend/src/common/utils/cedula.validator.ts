export function validarCedula(cedula: string): boolean {
  if (cedula.length !== 10) return false;
  const region = parseInt(cedula.substring(0, 2));
  if (region < 1 || region > 24) return false;

  const ultimoDigito = parseInt(cedula.substring(9, 10));
  const pares = parseInt(cedula[1]) + parseInt(cedula[3]) + parseInt(cedula[5]) + parseInt(cedula[7]);
  let impares = 0;

  for (let i = 0; i < 9; i += 2) {
    let res = parseInt(cedula[i]) * 2;
    if (res > 9) res -= 9;
    impares += res;
  }

  const sumaTotal = pares + impares;
  const digitoValidador = sumaTotal % 10 ? 10 - (sumaTotal % 10) : 0;
  return digitoValidador === ultimoDigito;
}