export const average = (data) => {
  let sum = 0;
  let length = data.length;
  for(const i in data){
    sum = sum + data[i];
  }
  return (sum/length)
}