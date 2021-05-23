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
import { Modal } from 'react-native';



const data = [
  { id: 1, username: "Gerardo Abril", gmail: "gerardoabril11@gmail.com" },
  { id: 2, username: "David Gonzalez", gmail: "gabGonzalez@gmail.com" },
  { id: 3, username: "Alejandra Madrigal", gmail: "mcornidez@gmail.com" },

];

class Group extends React {
  state = {
    data: data,
    form:{
      id:'',
      username:'',
      gmail:''
    },
    modalinsertar:false,
  }

  mostrarModalInsertar=()=>{
    this.setState({modalinsertar:true});
  }

  cerrarModalInsertar=()=>{
    this.setState({modalinsertar:false});
  }

  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista=this.state.data;
    //agrega valor nuevo a la lista
    lista.push(valorNuevo);
    //actualiza lista
    this.setState({data:lista, modalinsertar:false})
  }
  render() {
    return (
      <StyledContainer>
        <InnerContainer>

          <ButtonText Colors="success" onclick={()=>this.mostrarModalInsertar()}>Agregar estudiante</ButtonText>
          <div>

          </div>
          <table>
            <th>Id</th>
            <th>Username</th>
            <th>Gmail</th>

            {this.state.data.map((elemento) => (
              <tr>
                <td>{elemnto.id}</td>
                <td>{elemento.username}</td>
                <td>{elemento.gmail}</td>
                <td><ButtonText Colors="primary">asistencia</ButtonText></td>{"  "}
                <td><ButtonText Colors="danger">falta</ButtonText></td>{"  "}
                <td><ButtonText Colors="primary">retraso</ButtonText></td>

              </tr>
            ))}

          </table>

        </InnerContainer>
        <Modal isOpen={this.state.modalinsertar}>
          <modalHeader>
            <div>
              <h3>Insertar registro</h3>
            </div>
          </modalHeader>
          <modalBody>
            <formGroup>
              <label>Id:</label>
              <input type="text"></input>
            </formGroup>
            <formGroup>
              <label>Username:</label>
              <input type="text" id="usernametxt" value={this.state.data.length + 1}></input>
            </formGroup>
            <formGroup>
              <label>Gmail:</label>
              <input type="text" id="gmailtxt"></input>
            </formGroup>
          </modalBody>
          <modalFooter>
            <button Colors="primary" onclick={()=>this.insertar()}>insertar</button>
            <button Colors="danger" onclick={()=>this.cerrarModalInsertar()}>cancelar</button>

          </modalFooter>

        </Modal>
      </StyledContainer>


    )
  }
}

export default Group;

