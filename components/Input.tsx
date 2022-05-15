import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "utils/useDebounce";

type FormValues = {
  cityName: string;
};

type SelectedSearchType = {
  name: string;
  lat: number;
  lon: number;
};

const Input = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const watchCity = watch("cityName");
  const debouncedSearchTerm = useDebounce(watchCity, 1000);
  const [sentCity, setSentCity] = useState("");
  const [resultsArray, setResultsArray] = useState([]);
  const [selectedSearch, setSearch] = useState<
    SelectedSearchType | undefined
  >();
  const [wasSearchSet, setSearchSet] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.cityName.length > 0) {
      //   complete(data);
    }
  };

  useEffect(() => {
    if (wasSearchSet && sentCity !== debouncedSearchTerm) {
      setSearchSet(false);
      console.log("test");
    }
  }, [debouncedSearchTerm, sentCity, wasSearchSet, watchCity]);

  useEffect(() => {
    if (
      debouncedSearchTerm &&
      !wasSearchSet &&
      sentCity !== debouncedSearchTerm
    ) {
      console.log(debouncedSearchTerm);
      setSentCity(debouncedSearchTerm);
      axios
        .post("/api/cities", { city: debouncedSearchTerm })
        .then((result) => {
          console.log(result.data.cities);
          setResultsArray(result.data.cities);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [debouncedSearchTerm, wasSearchSet]);

  useEffect(() => {
    if (selectedSearch && selectedSearch.lat && selectedSearch.lon) {
      console.log(selectedSearch);
    }
  }, [selectedSearch]);

  const selectSearch = (name: string, lat: number, lon: number) => {
    setValue("cityName", name);
    setSearchSet(true);
    setSearch({ name, lat, lon });
    setResultsArray([]);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CityInput wasSearchSet={wasSearchSet}>
        <input
          type="text"
          placeholder="City Name"
          maxLength={200}
          autoComplete="off"
          {...register("cityName", { required: true })}
        />
        <svg className="icon" viewBox="0 0 349.661 349.661">
          <g>
            <path d="M174.831,0C102.056,0,42.849,59.207,42.849,131.981c0,30.083,21.156,74.658,62.881,132.485   c30.46,42.215,61.363,76.607,61.671,76.95l7.429,8.245l7.429-8.245c0.309-0.342,31.211-34.734,61.671-76.95   c41.725-57.828,62.881-102.402,62.881-132.485C306.812,59.207,247.605,0,174.831,0z M174.83,319.617   c-37.058-42.692-111.98-139.048-111.98-187.636C62.849,70.235,113.084,20,174.831,20s111.981,50.235,111.981,111.981   C286.812,180.54,211.888,276.915,174.83,319.617z" />
            <circle cx="174.831" cy="131.982" r="49.696" />
          </g>
        </svg>
      </CityInput>
      {resultsArray.length > 0 && !wasSearchSet && (
        <Results>
          {resultsArray.map(
            (
              city: {
                EnglishName: string;
                Country: { EnglishName: string };
              },
              idx
            ) => (
              <div
                className="result"
                key={idx}
                onClick={() =>
                  selectSearch(
                    `${city.EnglishName}, ${city.Country.EnglishName}`,
                    0,
                    0
                  )
                }
              >
                {city.EnglishName}, {city.Country.EnglishName}
              </div>
            )
          )}
        </Results>
      )}
    </FormContainer>
  );
};

interface CityInputType {
  wasSearchSet: boolean;
}

const FormContainer = styled.form`
  position: relative;
`;
const CityInput = styled.div<CityInputType>`
  position: relative;

  input[type="text"]:focus + .icon g {
    fill: #f97f29;
  }

  input[type="text"] {
    width: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px;
    padding: 1.25rem 1.25rem 1.25rem 3.25rem;
    font-size: 1em;
    border-radius: 0.25rem;
    cursor: text;

    &::placeholder {
      color: rgba(0, 0, 0, 0.35);
    }

    &:focus {
      box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(233, 133, 64, 0.25) 0px 0px 0px 4px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    }
  }

  .icon {
    z-index: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    content: "";
    display: block;
    height: 1.25em;
    width: 1.25em;
    margin: 1.175rem;

    g {
      fill: ${(props) =>
        props.wasSearchSet ? "#f97f29" : "rgba(0, 0, 0, 0.35)"};
    }
  }
`;
const Results = styled.div`
  position: absolute;
  width: 100%;
  margin: -0.1rem 0 0;
  z-index: 4;

  .result {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px;
    width: 100%;
    padding: 1rem;

    &:first-child {
      border-radius: 0.25rem 0.25rem 0 0;
    }

    &:last-child {
      border-radius: 0 0 0.25rem 0.25rem;
    }

    &:hover {
      background: rgba(255, 255, 255, 1);
      color: #f97f29;
      cursor: pointer;
    }
  }
`;

export default Input;
