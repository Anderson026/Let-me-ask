// importando o componente link do react router dom
import { Link, useHistory } from "react-router-dom";
// importando o form event do react
import { FormEvent,useState } from "react";
// importando a imagem
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

// importdando o css
import "../styles/auth.scss";
// importando o componente button
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";

export function NewRoom(){
  const { user } = useAuth();
  // hook de navegação
  const history = useHistory();
  // utilizando o use state para salvar o dado do input
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    // verifica se o input tem algum testo
    if (newRoom.trim() === "") {
      return;
    }
    // cria a categoria de rooms no banco de dados
    const roomRef = database.ref("rooms");
    // adiciona uma nova sala na referência de rooms
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });
    // navegando para ir para a room criada
    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return(
    <div id="page-auth">
      <aside>
        {/* maneira como o react importa as imagens */}
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao -vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className="main-content">
        <img src={logoImg} alt="Letmeask" />
        <h2>Criar uma nova sala</h2>
        <form onSubmit={handleCreateRoom}>
          <input 
            type="text" 
            placeholder="Nome da sala"
            onChange={event => setNewRoom(event.target.value)}
            value={newRoom}
          />
          <Button type="submit">
            Criar sala
          </Button>
        </form>
        <p>Quer entrar em uma sala existente? <Link to="/"> Clique aqui</Link></p>
      </main>
    </div>
  )
}

