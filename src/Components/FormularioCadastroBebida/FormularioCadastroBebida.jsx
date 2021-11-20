/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";

const FormularioCadastroBebida = (props) => {

  //Variáveis de captura de dados
  const camposIniciais = {
    nomeBebida: '',
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
        ...props.dadosBebidas[props.idAtual]
      })
    }
  }, [props.idAtual, props.dadosBebidas]);

  const inputChange = e => {
    let { name, value } = e.target

    setValues({
      ...values,
      [name]: value
    });
  }

  const manipuladorFormEnvio = e => {
    e.preventDefault();
    if(values.nomeBebida === '' || values.preco === '') {
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
      <input required className="form-control" placeholder="Nome do Bebida" name="nomeBebida" value={values.nomeBebida} onChange={inputChange}/>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-duotone fa-dollar-sign"></i>
            </div>
          </div>
          <input required className="form-control" placeholder="Preço do Bebida" name="preco" value={values.preco} onChange={inputChange}/>
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value={ props.idAtual === '' ? 'Salvar' : 'Atualizar' } className="btn btn-primary btn-block" />
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
        <Toast.Body><h6>Insira as informações da bebida!</h6></Toast.Body>
      </Toast>
    </form>
  )
}

export default FormularioCadastroBebida;
