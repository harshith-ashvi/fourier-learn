function dft(x) {
  const X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }
    re = re / N; // average
    im = im / N;

    const freq = k;
    const amp = sqrt(re * re + im * im);
    const phase = atan2(im, re);

    X[k] = { re, im, freq, amp, phase };
  }

  return X;
}
