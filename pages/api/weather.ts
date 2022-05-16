// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
const API_KEY = process.env.API_KEY;
type Data = {
  error?: string;
  data?: object;
  cityName?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise(() => {
    if (req.body.city) {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${req.body.city}&limit=5&appid=${API_KEY}`
        )
        .then((coordinates) => {
          if (coordinates.data[0]) {
            getWeather(
              res,
              coordinates.data[0].lat,
              coordinates.data[0].lon,
              `${coordinates.data[0].name}, ${coordinates.data[0].country}`
            );
          } else {
            res.status(404).send({});
          }
        })
        .catch((error) => {
          res.status(404).send({ error });
          res.end();
        });
      return;
    } else if (req.body.lat && req.body.lon) {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${req.body.lat}&lon=${req.body.lon}&limit=5&appid=${API_KEY}`
        )
        .then((coordinates) => {
          if (coordinates.data[0]) {
            getWeather(
              res,
              coordinates.data[0].lat,
              coordinates.data[0].lon,
              `${coordinates.data[0].name}, ${coordinates.data[0].country}`
            );
          } else {
            res.status(404).send({});
          }
        });
      return;
    } else {
      res.status(404).send({});
      return;
    }
  });
}

function getWeather(
  res: NextApiResponse,
  lat: number,
  lon: number,
  cityName: string
) {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`
    )
    .then((result) => {
      res.status(200).json({
        data: result.data,
        cityName,
      });
      res.end();
    })
    .catch((err) => {
      res.status(404).send({ err });
      res.end();
    });
}
