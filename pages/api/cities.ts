// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const API_KEY = process.env.ACCUWEATGER_API_KEY;
// type Data = {
//   temperature: number;
//   humidity: number;
//   pressure: number;
// };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  axios
    .get(
      `http://dataservice.accuweather.com/locations/v1/cities/search?q=${req.body.city}&apikey=${API_KEY}`
    )
    .then((result) => {
      res.status(200).send({ cities: result.data.slice(0, 5) });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
}
