import math from 'mathjs'

export const calcAspectRatio = (width: number, height: number) => {
      const div = math.gcd(width, height);
      return { width: width / div, height: height / div };
}