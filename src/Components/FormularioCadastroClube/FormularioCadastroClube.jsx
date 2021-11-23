/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { i18n } from '../../translate/i18n';
import InputMask from 'react-input-mask';

const FormularioCadastroClube = (props) => {

  //Variáveis de captura de dados
  const camposIniciais = {
    nomeCliente: '',
    cpfCliente: '',
    telefoneCliente: ''
  };

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  let [values, setValues] = useState(camposIniciais);

  useEffect(() => {
    if (props.idAtual === '') {
      setValues({
        ...camposIniciais
      })
    } else {
      props.dadosClientes[props.idAtual].cpfCliente = 
      `${props.dadosClientes[props.idAtual].cpfCliente.substring(0, 3) + ".***.***-" + props.dadosClientes[props.idAtual].cpfCliente.substring(12, props.dadosClientes[props.idAtual].cpfCliente.length)}`;
      setValues({
        ...props.dadosClientes[props.idAtual],
      })
    }
  }, [props.idAtual, props.dadosClientes]);

  const inputChange = e => {
    let { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    });
  }

  const manipuladorFormEnvio = e => {
    console.log('chenges', e.target.value);
    e.preventDefault();
    if(values.nomeCliente === '' || values.cpfCliente === '') {
      setShowA(true);
    } else {
      props.addEdit(values);
    }
  }

  return (
    <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-solid fa-user"></i>
          </div>
        </div>
        <input required className="form-control" placeholder={i18n.t('formTitles.nomeCliente')} name="nomeCliente" value={values.nomeCliente} onChange={inputChange} />
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-duotone fa-id-card"></i>
            </div>
          </div>
          <InputMask 
            placeholder={i18n.t('formTitles.documento')} 
            mask="999.999.999-99" 
            maskChar="*"
            name="cpfCliente" 
            value={values.cpfCliente} 
            onChange={inputChange}
            style = {{ width: "92%" }}
            type="text"
          >
            { ( inputProps ) => <input required className="form-control" { ... inputProps } type = " text " /> }
          </InputMask>
        </div>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-regular fa-phone"></i>
            </div>
          </div>
          <InputMask 
            placeholder={i18n.t('formTitles.telefone')} 
            mask="(99)99999-9999" 
            maskChar=" "
            name="telefoneCliente" 
            value={values.telefoneCliente} 
            onChange={inputChange}
            style = {{ width: "92%" }}
          >
            { ( inputProps ) => <input required className="form-control" { ... inputProps } type = " tel "  /> }
          </InputMask>
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value={ props.idAtual === '' ? i18n.t('buttons.salvar') : i18n.t('buttons.atualizar') } className="btn btn-primary btn-block" />
      </div>

      <Toast show={showA} delay={3000} autohide onClose={toggleShowA} style={{ position: "absolute", "min-width": "300px", bottom: "1rem", right: "1rem" }}>
        <Toast.Header>
          <img
            src="/logo.png"
            className="rounded me-2"
            alt=""
            width="40" height="40"
          />
          <strong className="me-auto">SystemFood</strong>
        </Toast.Header>
        <Toast.Body><h6>{i18n.t('messages.infoCorreta')}</h6></Toast.Body>
      </Toast>
    </form>
  )
}

export default FormularioCadastroClube;
