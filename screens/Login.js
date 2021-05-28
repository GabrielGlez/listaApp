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
  TextLinkContent,
} from './../components/styles';
import { View, ActivityIndicator } from 'react-native';

//colores
const { brand, darkLight, primary } = Colors;

//keyboard avoid view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

//Api client
import axios from 'axios';

import Google from 'expo-google-app-auth';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  
  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'https://fast-castle-23744.herokuapp.com/user/signin';

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const {message, status, data} = result;

        if(status !== 'SUCCESS'){
          handleMessage(message, status)
        } else {
          navigation.navigate('Welcome', {...data[0]});
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        setSubmitting(false);
        handleMessage("Un error ha ocurrido revise su conexion a internet e intente de nuevo!");
      });
  }

  const handleMessage = (message, type = 'FAILED') => {
      setMessage(message);
      setMessageType(type);
  }

  const handleGoogleSignin = () => {
    setGoogleSubmitting(true);
    const config = {iosClientId: `407487759005-ootj5hick3klgfo0edl72pdd43mgpjbs.apps.googleusercontent.com`, 
    androidClientId: `407487759005-uiqfsv4qiqq24b086cke7c3l2cdcfji3.apps.googleusercontent.com`,
    scopes: ['profile', 'email'],
  };

  Google.logInAsync(config)
  .then((result) => {
    const { type, user } = result;
    if (type == 'success') {
      const { email, name, photoUrl } = user;
      handleMessage('Google signin successful', 'SUCCESS');
      setTimeout(() => navigation.navigate('Welcome', {email, name, photoUrl}))
    } else {
      handleMessage('Google Signin fue cancelado');
    }
    setGoogleSubmitting(false);
  })
  .catch((error) => {
    handleMessage('Ha ocurrido un error revisa la red e intente de nuevo');
    console.log(error);
    setGoogleSubmitting(false);
  });
};

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../assets/img/img1.png')} />
          <PageTitle>Lista App</PageTitle>
          <SubTitle>Iniciar Sesion</SubTitle>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, {setSubmitting}) => {
              if (values.email == '' || values.password == '' ){
                handleMessage('Porfavor llena todos los campos');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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
                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting &&<StyledButton onPress={handleSubmit}>
                  <ButtonText>Iniciar Sesion</ButtonText>
                </StyledButton>}

                {isSubmitting &&<StyledButton disabled = "true" >
                  <ActivityIndicator size="large" color={primary} />
                </StyledButton>}
                <Line />
               {/* {!googleSubmitting && (
                  <StyledButton onPress={handleGoogleSignin} google={true}>
                    <Fontisto name="google" size={25} color={primary} />
                    <ButtonText google={true}>Iniciar sesion con Google</ButtonText>
                  </StyledButton>
                )}
                {googleSubmitting && (
                  <StyledButton disabled={true} google={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )} */}
                <ExtraView>
                  <ExtraText>¿Aun no tiene una cuenta? </ExtraText>
                  <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>Crear Cuenta</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyleFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
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
