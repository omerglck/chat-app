import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../firebase/config";
const AuthPage = ({ setIsAuth }) => {
  // giriş fonksiyonu
  const hanldeClick = () => {
    signInWithPopup(auth, provider)
      // oturumun açık olduğunu bildiren token'i local'de saklama
      .then((res) => {
        localStorage.setItem("token", res.user.refreshToken);
        // yetkiyi true'ya çek
        setIsAuth(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Odası</h1>
        <p>Devam etmek için giriş yapınız</p>
        <button onClick={hanldeClick}>
          <img src="/g.png" alt="" />
          <span>Google ile gir</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
