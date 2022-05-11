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
      <input
        type="text"
        placeholder="City Name"
        maxLength={200}
        {...register("city", { required: true })}
      />
    </FormContainer>
  );
};

const FormContainer = styled.form``;

export default Input;
