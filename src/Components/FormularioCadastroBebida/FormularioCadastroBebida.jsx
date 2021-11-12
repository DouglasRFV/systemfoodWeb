/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const FormularioCadastroBebida = (props) => {

  //Variáveis de captura de dados
  const camposIniciais = {
    nomeBebida: '',
    preco: ''
  };

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
    props.addEdit(values);
  }

  return (
    <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-solid fa-burger"></i>
          </div>
        </div>
      <input  className="form-control" placeholder="Nome do Bebida" name="nomeBebida" value={values.nomeBebida} onChange={inputChange}/>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-duotone fa-dollar-sign"></i>
            </div>
          </div>
          <input  className="form-control" placeholder="Preço do Bebida" name="preco" value={values.preco} onChange={inputChange}/>
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value={ props.idAtual === '' ? 'Salvar' : 'Atualizar' } className="btn btn-primary btn-block" />
      </div>
    </form>
  )
}

export default FormularioCadastroBebida;
