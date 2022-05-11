// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const API_KEY = process.env.API_KEY;
type Data = {
  temperature: number;
  humidity: number;
  pressure: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  axios
    .get(
      `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`
    )
    .then((coordinates) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.data[0].lat}&lon=${coordinates.data[0].lon}&appid=${API_KEY}`
        )
        .then((result) => {
          res
            .status(200)
            .json({
              temperature: result.data.list[0].main.temp,
              humidity: result.data.list[0].main.humidity,
              pressure: result.data.list[0].main.pressure,
            });
        });
    });
}
