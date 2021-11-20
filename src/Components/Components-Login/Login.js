import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login(props) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, getDataUser } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("");
      setLoading(true);
      localStorage.setItem('emailUser', emailRef.current.value);
      await login(emailRef.current.value, passwordRef.current.value);
      const data = await getDataUser();
      console.log('DATA USER =>', data);
      localStorage.setItem('typeUser', data.typeUser);
      history.push({ pathname: "/", state: data.typeUser });
    } catch {
      setError("Failed to log in")
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
            <div style={{ "text-align": "center" }}> <img src="/logo.png" alt="" width="150" height="150" /> </div>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Esqueceu a senha?</Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}
