import Router from 'next/router'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Big = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fcfcfc;
`

const Container = styled.div`
  /* height: 30vh; */
  width: 21vw;
  border-radius: 5px;
  border: 1px solid #f5f5f5;
  padding: 20px;
  background-color: white;
  box-shadow: 0 10px 10px -5px #efefef;
`

const TextContainer = styled.div`
  /* height: 30vh; */
  width: 40vw;
  font-size: 50px;
  border-radius: 3px;
  font-family: Lato, sans-serif;
  padding: 20px;
  text-align: center;
  font-weight: 500;
  color: #616161;
  margin-bottom: 30px;
`

const Input = styled.input`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  box-shadow: none;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  font-family: Lato, sans-serif;
  &:focus {
    outline: none;
  }
`

// const Button = styled.button`
//   padding: 5px;
//   margin-bottom: 10px;
// `

const Button = styled.button`
  transform: translateY(-10px);
  font-size: 1.1rem;
  padding: 10px 15px;
  background: #2977f5;
  cursor: pointer;
  margin-top: 20px;
  color: #fff;
  border: none;
  box-shadow: 0px 5px 0px 0px #194791;
  transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease,
    border-color 200ms ease;
  &:active {
    outline: none;
    transform: translateY(5px);
    box-shadow: none;
  }
  &:focus,
  &:hover {
    outline: none;
    background-color: #2264ce;
  }
`

function Login() {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = async values => {
    console.log(values)
    const resp = await fetch('/api/auth/login', {
      cors: 'no-cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const res = await resp.json()

    console.log(res)

    if (res.passwordsMatch) {
      Router.push('/')
    }
  }

  return (
    <Big>
      <TextContainer>COVID-19 Tracker Dashboard</TextContainer>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Username"
            name="username"
            type="text"
            ref={register({ required: 'Required' })}
          />
          {errors.username}
          <Input
            placeholder="Password"
            name="password"
            type="password"
            ref={register({ required: 'Required' })}
          />
          {errors.password}
          <Button type="submit">Submit</Button>
        </form>
      </Container>
    </Big>
  )
}

export default Login
