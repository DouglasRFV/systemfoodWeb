/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { i18n } from '../../translate/i18n';


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
      setValues({
        ...props.dadosClientes[props.idAtual]
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
          <input required className="form-control" placeholder={i18n.t('formTitles.documento')} name="cpfCliente" value={values.cpfCliente} onChange={inputChange} />
        </div>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-regular fa-phone"></i>
            </div>
          </div>
          <input id="telefone" className="form-control" placeholder={i18n.t('formTitles.telefone')} name="telefoneCliente" value={values.telefoneCliente} onChange={inputChange} />
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value={props.idAtual === '' ? 'Salvar' : 'Atualizar'} className="btn btn-primary btn-block" />
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
        <Toast.Body><h6>Insira as informações corretamente!</h6></Toast.Body>
      </Toast>
    </form>
  )
}

export default FormularioCadastroClube;
