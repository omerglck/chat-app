import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Messages from "../components/Messages";

const Chat = ({ room, setRoom }) => {
  // güncelleyeceğimiz collection'nın referansını alma
  const messagesCol = collection(db, "messages");

  const [messages, setMessages] = useState([]);

  // mesajı veritabanına ekler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    // addDoc yeni döküman ekler (autId)
    // addDoc iki parametre ister
    // 1. ekleme yapacağımız collectionun referansı,
    // 2. data
    await addDoc(messagesCol, {
      text,
      room,
      user: {
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
        id: auth.currentUser.uid,
      },
      // server'ın zamanı oluşturmasını sağlar
      createdAt: serverTimestamp(),
    });
  };

  useEffect(() => {
    // filtreleme ayarlarını tanımlama
    const queryOptions = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // collectionda herhangi bir değişiklik olduğu zaman
    // bütün dökümanlara erişme
    // onSnapshot collection her değiştiğinde
    // bir fonksiyon çalıştırır fonksiyona güncel dökümanları parametre olarak gönderir
    onSnapshot(queryOptions, (snapshot) => {
      let tempMessages = [];
      // dökümanları dönüp içerisindeki
      // data metodu verilerine erişip + dökümanın idsini ekleyip yeni diziye aktarma
      snapshot.docs.forEach((doc) =>
        tempMessages.push({ id: doc.id, ...doc.data() })
      );
      setMessages(tempMessages);
    });
  }, []);
  return (
    <div className="chat">
      <header>
        <p className="user">{auth?.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {messages?.map((msg) => (
          <Messages key={msg.id} msg={msg} />
        ))}
      </main>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="mesajınızı yazın" />
        <button>Gönder</button>
      </form>
    </div>
  );
};

export default Chat;
