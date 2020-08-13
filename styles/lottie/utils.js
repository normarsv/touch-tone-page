export const changeLottieColors = (lottieChange, colorChange) => {
  let lottie = JSON.parse(JSON.stringify(lottieChange.default));
  if (lottie !== undefined) {
    if (lottie.layers !== undefined) {
      let layers = lottie.layers;
      for (let l = 0; l < layers.length; l++) {
        let curretnLayer = layers[l];
        if (curretnLayer.shapes !== undefined) {
          let shapes = curretnLayer.shapes;
          for (let s = 0; s < shapes.length; s++) {
            let currentShape = shapes[s];
            if (currentShape.it !== undefined) {
              let it = currentShape.it;
              for (let i = 0; i < it.length; i++) {
                let currentIt = it[i];
                if (currentIt.ty === "fl" || currentIt.ty === "st") {
                  let color = currentIt.c.k;
                  color[0] = toUnitVector(colorChange.r);
                  color[1] = toUnitVector(colorChange.g);
                  color[2] = toUnitVector(colorChange.b);
                  color[3] = colorChange.a;
                }
              }
            }
          }
        }
      }
    }
  }
  return lottie;
};

const toUnitVector = n => {
  return Math.round((n / 255) * 1000) / 1000;
};

const fromUnitVector = n => {
  return Math.round(n * 255);
};
