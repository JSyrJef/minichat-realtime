import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setRegister] = useState(false);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  //Registrarse
  const register = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("Usuario registrado:", userCredential.user);
    } catch (error) {
      console.error("Error al registrar:", error.message);
    }
  };

  //Login
  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      console.log("Usuario autenticado:", userCredential.user);
      navigate('/minichat-realtime/chat')
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };


  return (
    <div className="w-96 p-6 bg-custombgCard border border-white rounded-lg shadow dark:bg-custombgCard dark:border-gray-700">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-violet-600">{isRegister ? "MiniChat RealTime | Register" : "MiniChat RealTime | Login"}</h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={isRegister ? register : login} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-violet-600">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-violet-600">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >{isRegister ? "Register" : "Login"}</button>
          </div>

        </form>

        <p className="mt-10 text-center text-sm text-violet-300">
          <button onClick={() => setRegister(!isRegister)}
            className="">
            {isRegister ? "¿Already have an account? Sign in" : "¿Don't have an account? Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
};
