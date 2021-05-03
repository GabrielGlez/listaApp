import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import { Formik } from 'formik';

//iconos
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

//importar css botones y texto
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyleFormArea,
  LeftIcon,
  StyledTextInput,
  RightIcon,
  StyledInputLabel,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent
} from './../components/styles';
import { View } from 'react-native';

//colores
const { brand, darkLight, primary } = Colors;

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require('./../assets/img/img1.png')} />
        <PageTitle>Lista App</PageTitle>
        <SubTitle>Iniciar Sesion</SubTitle>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyleFormArea>
              <MyTextInput
                label="Correo"
                icon="mail"
                placeholder="example@example.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />

              <MyTextInput
                label="Contraseña"
                icon="lock"
                placeholder="* * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Iniciar Sesion</ButtonText>
              </StyledButton>
              <Line />
              <StyledButton google={true} onPress={handleSubmit}>
                  <Fontisto name="google" color={primary} size={25}/>
                <ButtonText google={true}>Iniciar Sesion Con Google</ButtonText>
              </StyledButton>
              <ExtraView>
                  <ExtraText>¿Aun no tiene una cuenta? </ExtraText>
                  <TextLink>
                      <TextLinkContent>Crear Cuenta</TextLinkContent>
                  </TextLink>
              </ExtraView>
            </StyleFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
