
// importando o useHistory para usá-lo em links de navegação
import { useHistory } from "react-router-dom";

// importando a imagem
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
// importdando o css
import "../styles/auth.scss";
// importando o componente button
import { Button } from "../components/Button";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
// importando o TestContext


// criando a page home como componente
export function Home() {
  // definindo o hook de navegação
  const history = useHistory();
  const { user,signInWithGoogle } = useAuth();
  // cria um estado para guardar o id da sala que o usuário quer usar
  const [roomCode, setRoomCode] = useState("");
  // criando a função para navegar para a página desejada
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
      history.push("/rooms/new");

  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    // verifica se a sala existe
    if (roomCode.trim() === "") {
      return;
    }
    // consulta a sala pelo seu id
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }
    // mostar uma mensagem quando a sala já foi encerrada
    if (roomRef.val().endedAt) {
      alert("Room already closed.");
      return;
    }

    // redireciona para a sala pelo id
    history.push(`/rooms/${roomCode}`);
  }
 
  return (
    <div id="page-auth">
      <aside>
        {/* maneira como o react importa as imagens */}
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao -vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className="main-content">
        <img src={logoImg} alt="Letmeask" />
        <button onClick={handleCreateRoom} className="create-room">
          <img src={googleIconImg} alt="Logo do Google" />
          Crie sua sala com o Google
        </button>
        <div className="separator">ou entre em uma sala</div>
        <form onSubmit={handleJoinRoom}>
          <input 
            type="text" 
            placeholder="Digite o código da sala"
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}
          />
          <Button type="submit">
            Entrar na sala
          </Button>
        </form>
      </main>
    </div>
  );
}