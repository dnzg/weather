import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

type FormValues = {
  city: string;
};

const Input = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.city.length > 0) {
      //   complete(data);
    }
  };

  const watchCity = watch("city");

  useEffect(() => {
    if (watchCity) {
      axios
        .post("/api/weather", watchCity)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [watchCity]);

  return (
    <FormContainer>
      <CityInput>
        <input
          type="text"
          placeholder="City Name"
          maxLength={200}
          autoComplete="off"
          {...register("city", { required: true })}
        />
      </CityInput>
    </FormContainer>
  );
};

const FormContainer = styled.form``;
const CityInput = styled.div`
  input[type="text"] {
    width: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
      rgb(0 0 0 / 0%) 0px 0px 0px 0px;
    padding: 1.25rem 1.25rem 1.25rem 3.75rem;
    font-size: 1.25em;
    border-radius: 0.25rem;

    &:focus {
      box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(233, 133, 64, 0.25) 0px 0px 0px 4px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
        rgba(0, 0, 0, 0) 0px 0px 0px 0px;
    }
  }
`;

export default Input;
