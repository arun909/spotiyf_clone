import React from "react";
import styled from "styled-components";
import { BsFillVolumeUpFill } from "react-icons/bs";

export default function Volume() {
  return (
    <Container>
      <BsFillVolumeUpFill />
      <input type="range" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  svg {
    color: white;
    margin-right: 0.5rem;
  }
  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;
  }
`;