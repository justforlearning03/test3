export function isNumeric(value: any){
  return /^-?\d+$/.test(value);
}
export function hasNumber(myString: string){
  return /\d/.test(myString);

};
