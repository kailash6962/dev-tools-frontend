export function objectToSelectOptions(data,key,value){
  const result = data.map(row => ({
    key: row[key],
    value: row[value]
  }));
  return result;
}
export function sumColumn(arr, columnName) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i][columnName] || 0; // Assuming missing values are treated as 0
  }
  return Math.round(sum);
}