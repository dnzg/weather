import axios from "axios";

export default function getPicture(req: string) {
  return axios
    .get(
      "https://wepik.com/api/image/serve?url=https%3A%2F%2Ffreepik.com%2Fxhr%2Fsearch%3Fselection%3D1%26dates%3Dany%26format%3Dsearch%26type%3Dphoto%26premium%3D0%26from%3Deditor%26author%3D23%26sort%3Dpopular%26page%3D1%26query%3D" +
        req +
        "%26color%3D%26orientation%3D"
    )
    .then((result) => {
      const randNum =
        Math.floor(
          Math.random() *
            (Math.floor(result.data.data.resources.boost.length) -
              Math.ceil(0) +
              1)
        ) + Math.ceil(0);
      return result.data.data.resources.boost[randNum]
        ? result.data.data.resources.boost[randNum].thumbnails.large
        : "";
    });
}
