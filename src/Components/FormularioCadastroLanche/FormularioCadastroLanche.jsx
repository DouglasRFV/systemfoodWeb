/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import { i18n } from '../../translate/i18n';

const FormularioCadastroLanche = (props) => {

  //Variáveis de captura de dados
  const camposIniciais = {
    nomeLanche: '',
    preco: ''
  };

  
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  let [ values, setValues ] = useState(camposIniciais);

  useEffect(() => {
    if(props.idAtual === '') {
      setValues({
        ...camposIniciais
      })
    } else {
      setValues({
        ...props.dadosLanches[props.idAtual]
      })
    }
  }, [props.idAtual, props.dadosLanches]);

  const inputChange = e => {
    let { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    });
  }

  const manipuladorFormEnvio = e => {
    e.preventDefault();
    if(values.nomeLanche === '' || values.preco === '') {
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
            <i className="fas fa-solid fa-burger"></i>
          </div>
        </div>
      <input required className="form-control" placeholder={i18n.t('formTitles.nomeLanche')} name="nomeLanche" value={values.nomeLanche} onChange={inputChange}/>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-duotone fa-dollar-sign"></i>
            </div>
          </div>
          <input required className="form-control" placeholder={i18n.t('formTitles.precoLanche')} value={values.preco} onChange={inputChange}/>
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
        <Toast.Body><h6>Insira as informações do lanche!</h6></Toast.Body>
      </Toast>
    </form>
  )
}

export default FormularioCadastroLanche;
