import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import Chat from "./pages/Chat";
import "./style.scss";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

function App() {
  // kullanıcı yetkili mi state'ini tutuyoruz
  // state'in ilk değeri local'deki token'a göre belirlenir
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));

  // kullanıcının girdiği odanın state'i
  const [room, setRoom] = useState(null);
  // form gönderildiğinde odayı belirler
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  };

  // yetkisi yoksa > giriş
  if (!isAuth) {
    return <AuthPage setIsAuth={setIsAuth} />;
  }
  // yetkisi var ise > chat
  return (
    <div className="container">
      {room ? (
        // odayı belirlediyse > sohbet
        <Chat room={room} setRoom={setRoom} />
      ) : (
        <form onSubmit={handleSubmit} className="room-page">
          <h1>Chat Odası</h1>
          <p>Hangi odaya gireceksiniz ? </p>
          <input type="text" placeholder="örn:haftaiçi" />
          <button id="login" type="submit">
            Odaya Gir
          </button>
          <button
            onClick={() => {
              signOut(auth)
                .then(() => {
                  // localden tokeni kaldırma
                  localStorage.removeItem("token");
                  // yetkili stateini false çek
                  setIsAuth(false);
                })
                .catch((err) => console.log(err));
            }}
            id="logout"
            type="button"
          >
            Çıkış Yap
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
