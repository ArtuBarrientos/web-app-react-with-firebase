import React,{useState, useEffect} from 'react';
import 'firebase/auth';
import styled from 'styled-components';
import { useFirebaseApp } from 'reactfire';

export default function Auth() {

 
const Container = styled.div`
  text-align: center;
  background-color: gray;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
`
const Logo = styled.img`
  height: 20vmin;
`
const Input = styled.input`
  border-radius: 1rem;
  border: 3px solid black;
  width: 20rem;
  height: 2rem;
  margin: 1rem;
  padding: 5px;
`
const Button = styled.button`
  border-radius: 5px;
  border: 3px solid white;
  width:5rem;
  height:2rem;
  background-color: black;
  color: white;
  cursor: pointer;
`
const ButtonG = styled.button`
  border-radius: 5px;
  border: 3px solid white;
  width:10rem;
  height:2.5rem;
  background-color: #D50F25;
  color: white;
  cursor: pointer;
`
const Cover = styled.img`
  width:50vw;
  height:100vh;
`
const Col = styled.div`
  display:flex;
  flex-direction: column;
  width:50vw;
  justify-content: center;
  align-items: center;
`
  const firebase = useFirebaseApp();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleAuth = async () => {
      await firebase.auth().createUserWithEmailAndPassword(user, email)
       .then(result => console.log('ha iniciado sesión'))
       .catch(error => alert(`Error ${error.code}: ${error.message}`)
      );
    }

  const handleAuthGoogle = async () => {
    await firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => alert(`Error ${error.code}: ${error.message}`)
    );
  }

  const handleLogout = async () =>{
    await firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} has cerrado sesión`))
    .catch(error => alert(`Error ${error.code}: ${error.message}`)
    );
  }

  
  useEffect(()=>{
    if(user === true)
    firebase.auth().onAuthStateChanged(user =>{
      setUser({user})
    })
  },[firebase, user])

  function renderLoginButton (){
    //si el usuario está logeado;
       if(user){
         return(
          <div>
            <ButtonG onClick={handleLogout}>Cerrar sesión</ButtonG> 
            <p>Logeado</p>
          </div>
        );
       }else{
          return(
            <div>
              <ButtonG onClick={handleAuthGoogle}>Inicia sesión con Google</ButtonG> 
              <p>No Logeado</p>
            </div>
          )
       }
  }
    return(
        <Container>
                <Col> 
                  <Logo src={"https://image.flaticon.com/icons/png/512/16/16480.png"} alt="logo" />
                    <p>
                      Authentication With Firebase
                    </p>
                    <label>Ingresa tu Correo</label>
                    <Input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                    />
                    <label>Ingresa tu Contraseña</label>
                    <Input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event)=>setPassword(event.target.value)}
                    />
                    <div>
                      <Button onClick={handleAuth}>Registrate</Button>   
                      <h3>ó</h3>   
                      <div>
                        {renderLoginButton()}
                      </div>   
                    </div>                      
                </Col>
                <Col>
                   <Cover src={"https://www.xda-developers.com/files/2017/10/Google-Firebase-Feature-Image-Red.png"} alt="cover"/>
                </Col>
      </Container>
    )
}