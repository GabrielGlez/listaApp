import React from 'react';
import { StatusBar } from 'expo-status-bar';

import{
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle
} from './../components/styles';

const Login = () =>{
    return(
        <StyledContainer>
            <StatusBar style="dark"/>
            <InnerContainer>
                <PageLogo source={require('./../assets/img/img1.png')}/>
                <PageTitle>Lista App Login</PageTitle>
            </InnerContainer>
        </StyledContainer>
    )
}