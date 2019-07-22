import styled from 'styled-components';
import { borderRadius, colorUsage, fontFamily, fontSize, getSpacing } from 'stylesheet';
import { Link } from 'react-router-dom';

export const DefaultTable = styled.table`
  display: block;
  width: 100%;
  overflow-x: auto;
  td, th{
    padding: ${getSpacing(2)};
    vertical-align: top;
    border-top: 1px solid #dee2e6;
  }
  .striped tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }`;

export const Message = styled.div`
  boreder: 1px solid gray;
  background-color: lightgray;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  color: #fff;
  background-color: ${props => props.disabled ? 'light' : ''}blue;
  border-color: #007bff;

  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
  border-radius: 0.25rem;

  padding: ${getSpacing(1)} ${getSpacing(2)};
  font-size: 1rem;
  border-radius: 0.25rem;
  `

export const ButtonLink = styled(Link)<{ disabled?: boolean }>`
  color: #fff;
  background-color: ${props => props.disabled ? 'light' : ''}blue;
  border-color: #007bff;

  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  line-height: 1.5;
  border-radius: 0.25rem;

  padding: ${getSpacing(1)} ${getSpacing(2)};
  font-size: 1rem;
  border-radius: 0.25rem;
`;
