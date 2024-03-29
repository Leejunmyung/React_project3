import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, value, is_submit } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      {label && <Text margin="0px">{label}</Text>}
      {is_submit ? <ElInput type={type} placeholder={placeholder} onChange={_onChange} value={value} />
       : <ElInput type={type} placeholder={placeholder} onChange={_onChange} />}
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요",
  type: "text",
  value: "",
  is_submit: false,
  _onchange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid black;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid black;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
