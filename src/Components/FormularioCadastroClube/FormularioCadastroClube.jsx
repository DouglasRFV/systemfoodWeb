/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

const FormularioCadastroClube = (props) => {

  //Variáveis de captura de dados
  const camposIniciais = {
    nomeCliente: '',
    cpfCliente: '',
    telefoneCliente: ''
  };

  let [values, setValues] = useState(camposIniciais);

  useEffect(() => {
    if (props.idAtual === '') {
      setValues({
        ...camposIniciais
      })
    } else {
      setValues({
        ...props.dadosClintes[props.idAtual]
      })
    }
  }, [props.idAtual, props.dadosClintes]);

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
            <i className="fas fa-solid fa-user"></i>
          </div>
        </div>
        <input className="form-control" placeholder="Nome" name="nomeCliente" value={values.nomeCliente} onChange={inputChange} />
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-duotone fa-id-card"></i>
            </div>
          </div>
          <input className="form-control cpf-mask" placeholder="CPF" name="cpfCliente" value={values.cpfCliente} onChange={inputChange} />
        </div>
      </div>

      <div className="row">
        <div className="form-group input-group col-md-12">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-regular fa-phone"></i>
            </div>
          </div>
          <input id="telefone" className="form-control" placeholder="Telefone" name="telefoneCliente" value={values.telefoneCliente} onChange={inputChange} />
        </div>
      </div>

      <div className="form-group">
        <input type="submit" value={props.idAtual === '' ? 'Salvar' : 'Atualizar'} className="btn btn-primary btn-block" />
      </div>
    </form>
  )
}

export default FormularioCadastroClube;
