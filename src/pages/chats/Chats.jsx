import { useEffect, useState } from "react"
import { auth, db } from "../../firebase/config";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const Chats = () => {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  {/*Traer el usuario que ya se logueo
  para obtener el usuario actual que ha iniciado sesión
  en este caso su correo
  */}
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));

      // Escuchar cambios en Firestore (para mensajes en tiempo real)
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesArray = [];
        querySnapshot.forEach((doc) => {
          messagesArray.push({ id: doc.id, ...doc.data() });
        });
        console.log("Mensajes recuperados:", messagesArray); // Verifica los mensajes recuperados
        setMessages(messagesArray);
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Enviar un mensaje a Firestore
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      try {
        await addDoc(collection(db, 'messages'), {
          user: user.email,
          message: message,
          timestamp: new Date(),
        });
        setMessage(''); // Limpiar el input de mensaje
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  // Función para cerrar sesión
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <div className="max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex m-4">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-violet-600">Kodigo Chat | Realtime</h1>
        <button onClick={handleLogout} className="mb-2 bg-violet-600">Logout</button>
      </div>
      <div className="chat-box p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong className="text-violet-600">{msg.user || 'usuario desconocido'}: </strong> <span> {msg.message || 'mensaje vacio'}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="max-w-md mx-auto">
        <label htmlFor="" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Send</label>
        <div className="relative">
          <input
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="bg-violet-600 text-white absolute end-2.5 bottom-1">Send</button>
        </div>
      </form>
    </div>
  )
}
