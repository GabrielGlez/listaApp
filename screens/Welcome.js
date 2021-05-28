import React from 'react';
import { StatusBar } from 'expo-status-bar';


//importar componentes personalizados
import {
  InnerContainer,
  PageTitle,
  SubTitle,
  StyleFormArea,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar
} from './../components/styles';

const Welcome = ({navigation, route}) => {
  const {name, email, photourl,matricula} = route.params;
  const AvatarImg = photourl ? {uri: photourl} : require('./../assets/img/img1.jpg');
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../assets/img/img2.png') }/>
        <WelcomeContainer>
          <PageTitle welcome={true}>Bienvenido</PageTitle>
          <SubTitle welcome={true}>{name}</SubTitle>
          <SubTitle welcome={true}>{email}</SubTitle>
          <StyleFormArea>
            <Avatar resizeMode="cover" source={AvatarImg} />
            <StyledButton onPress={() => {navigation.navigate('Group',matricula)}}>
              <ButtonText>Ver Grupos</ButtonText>
            </StyledButton>
            <Line />
            <StyledButton onPress={() => {navigation.navigate('Login')}}>
              <ButtonText>Cerrar Sesion</ButtonText>
            </StyledButton>
          </StyleFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};


export default Welcome;
