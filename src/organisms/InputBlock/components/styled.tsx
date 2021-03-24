import styled from 'styled-components';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { TextBase, TitleBase } from '../../../atoms';

export const Outer = styled.div`
display: inline-block;
position: relative;
margin-top: 32px;
padding: 12px 12px 12px 0;
background-color: ${(props) => props.theme.palette.secondary};
box-shadow: ${(props) => props.theme.shadow.standart};

@media screen and (min-width: 60em) {
  margin-top: 64px;
  left: -32px;
}

@media screen and (min-width: 75em) {
  left: -64px;
}

@media screen and (min-width: 100em) {
  left: -128px;
}
`;

export const Inner = styled.div`
padding-left: 12px;

@media screen and (min-width: 60em) {
  padding-left: 32px;
}

@media screen and (min-width: 75em) {
  padding-left: 64px;
}

@media screen and (min-width: 100em) {
  padding-left: 128px;
}
`;

export const Title = styled(TitleBase)`
color: ${(props) => props.theme.palette.main};
padding: 0;
`;

export const Description = styled(TextBase)`
color: ${(props) => props.theme.palette.main};
font-weight: 400;
padding-bottom: 12px;
`;

export const Wrapper = styled.div`
display: inline-flex;
position: relative;
align-items: center;
background-color: ${(props) => props.theme.palette.main};
height: 100%;
margin-bottom: 16px;

.container {
  position: relative;
  }
`;

export const PostitveIcon = styled(InsertEmoticonIcon)`&& { font-size: 50px }`;
export const NeutralIcon = styled(SentimentSatisfiedIcon)`&& { font-size: 50px }`;
export const NegativeIcon = styled(SentimentVeryDissatisfiedIcon)`&& { font-size: 50px }`;
