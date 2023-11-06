import './Login.css';
const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://niche-index.herokuapp.com/login';

const Login = () => (
    <div>
    <div className="info">
        <h1 style={{textAlign: "left", color: "var(--green)"}}>niche: <span style={{fontSize: "40px", color: "white"}}>(nēsh) <i>adj.</i></span></h1>
        <h3 style={{textAlign: "left", paddingBottom: "10px"}}>(of products, services or interests) appealing to only a small section of the population <i> -  Oxford Advanced Learner's Dictionary</i></h3>
        <h2 className="loginMessage">Sign in to see how <span style={{color: "var(--green)"}}>niche</span> your music taste is...</h2>
        <button className='loginButton'>
            <a className="App-link" href={LOGIN_URI}>
                    Log in to Spotify
            </a>
        </button>
    </div>  
    <div style={{position: 'absolute', bottom: "1px", fontSize: "1vw", textAlign: "center", width: "100%"}}>
    By Wyatt O'Connell
    </div> 
    </div>
    
  );
  
export default Login;