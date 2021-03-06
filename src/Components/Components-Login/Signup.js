import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container, Row, Col, Toast } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext";
import { i18n } from '../../translate/i18n';

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef()
  const passwordConfirmRef = useRef();
  const adminRef = useRef();
  const userRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("As senhas não coincidem")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, adminRef.current.checked ? adminRef.current.value : userRef.current.value);
      emailRef.current.value = '';
      passwordRef.current.value = '';
      passwordConfirmRef.current.value = '';
      adminRef.current.checked = false;
      userRef.current.checked = false;
      setShowA(true);
    } catch {
      setError("Falha ao criar conta")
    }

    setLoading(false)
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>

        <Card>
          <Card.Body>
            <div style={{ "text-align": "center" }} > <img src="/logo.png" alt="" width="80" height="80" /> </div>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>{i18n.t('login.senha')}</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>{i18n.t('login.confirmaSenha')}</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Form.Group className="mt-3" controlId="formBasicCheckbox">
                <Form.Label>{i18n.t('login.tipoUsuario')}</Form.Label>
                <Container>
                  <Row>
                    <Col> <input type="radio" value="admin" name="typeRef" ref={adminRef} /> {i18n.t('login.admin')}</Col>
                    <Col> <input type="radio" value="user" name="typeRef" ref={userRef} /> {i18n.t('login.usuario')}</Col>
                  </Row>
                </Container>
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                {i18n.t('buttons.cadastrar')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Toast show={showA} delay={4000} autohide onClose={toggleShowA} style={{ position: "absolute", "min-width": "300px", bottom: "1rem", right: "1rem" }}>
        <Toast.Header>
          <img
            src="/logo.png"
            className="rounded me-2"
            alt=""
            width="40" height="40"
          />
          <strong className="me-auto">SystemFood</strong>
        </Toast.Header>
        <Toast.Body><h6>Usuário cadastrado com sucesso!</h6></Toast.Body>
      </Toast>
    </Container>

  )
}
