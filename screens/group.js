import React from 'react';
import { StatusBar } from 'expo-status-bar';


//importar componentes personalizados
import {
  StyledContainer,
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
  
  const matricula = route.params;
  console.log(matricula);
  return (
    <>
      <StatusBar style="light" />
      <StyledContainer>
      <InnerContainer>
          <PageTitle welcome={true}>Tus Grupos</PageTitle>
          
          <StyleFormArea>
            
            <StyledButton icon="add" >
              <ButtonText>Crear Grupo nuevo</ButtonText>
            </StyledButton>
            
          </StyleFormArea>
          
          <StyleFormArea>
           

          </StyleFormArea>
      </InnerContainer>
      <StyledButton onPress={() => {navigation.navigate('Welcome'),route}}>
              <ButtonText>Pagina Home</ButtonText>
            </StyledButton>
      </StyledContainer>
    </>
  );
};


export default Welcome;
