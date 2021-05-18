import * as tf from "@tensorflow/tfjs";
import tensorAsBase64 from "tensor-as-base64";
const button = document.getElementById("upscale");
const img = new Image();
const img2 = new Image();
img.crossOrigin = "anonymous";
img.src = "./baboon-original.png";

img.onload = async () => {
  button.removeAttribute("disabled");
};
document.getElementById("app").appendChild(img);

document.getElementById("app").appendChild(img2);

button.onclick = async () => {
  const model = await tf.loadLayersModel("./rdn-tfjs/model.json");
  const tensor = tf.browser.fromPixels(img).expandDims(0);
  let t1 = Date.now();
  const prediction = model.predict(tensor).squeeze();
  let t2 = Date.now();
  console.log(t2 - t1);
  img2.src = await tensorAsBase64(prediction);
};
