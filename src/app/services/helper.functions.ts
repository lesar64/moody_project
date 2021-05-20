export const scanMovingAverage = (N: number) => {
  return (acc, curr) => {
    if (!curr && curr !== 0) { return acc; }
  
    acc.push(curr);
  
    if (acc.length > N) {
      acc.shift();
    }
  
    return acc;
  }  
}

export const mapMean = (arr) => {
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
}

export const mapIndividualScore = (detection) => {
  return detection?.aggregated?.positive - detection?.aggregated?.negative;
}
