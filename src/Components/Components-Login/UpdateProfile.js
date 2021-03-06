import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom";
import { i18n } from '../../translate/i18n';

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`${i18n.t('login.senhasDiferentes')}`)
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError(`${i18n.t('login.senha')}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>

        <Card>
          <Card.Body>
            <div style={{ "text-align": "center" }}> <img src="/logo.png" alt="" width="150" height="150" /> </div>
            <h2 className="text-center mb-4">{i18n.t('login.atualizarPerfil')}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  ref={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>{i18n.t('login.senha')}</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  placeholder={i18n.t('login.senhaEmBranco')}
                />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>{i18n.t('login.confirmaSenha')}</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder={i18n.t('login.senhaEmBranco')}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
              {i18n.t('buttons.atualizar')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/">{i18n.t('login.cancelar')}</Link>
        </div>
      </div>
    </Container>
  )
}
