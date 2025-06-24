class Complex {
  constructor(a, b) {
    this.re = a;
    this.im = b;
  }

  add(c) {
    this.re += c.re;
    this.im += c.im;
  }

  multiply(c) {
    const re = this.re * c.re - this.im * c.im;
    const im = this.re * c.im + this.im * c.re;
    return new Complex(re, im);
  }
}

function dft(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let sum = new Complex(0, 0);
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      const c = new Complex(cos(phi), -sin(phi));
      sum.add(x[n].multiply(c));
    }
    sum.re = sum.re / N; // average
    sum.im = sum.im / N;

    const freq = k;
    const amp = sqrt(sum.re * sum.re + sum.im * sum.im);
    const phase = atan2(sum.im, sum.re);

    X[k] = { re: sum.re, im: sum.im, freq, amp, phase };
  }

  return X;
}
