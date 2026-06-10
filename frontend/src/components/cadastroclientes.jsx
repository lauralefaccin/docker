
import { useState } from "react";

function App() {
  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const [cliente, setCliente] = useState({
    nome: "",
    email: "",
    cpf: "",
  });

  const [editando, setEditando] = useState(null);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const cadastrar = () => {
    const existe = clientes.find(
      (c) => c.cpf === cliente.cpf
    );

    if (existe) {
      setMensagem(" Cliente já cadastrado");
      return;
    }

    setClientes([...clientes, cliente]);
    setMensagem(" Cliente cadastrado com sucesso");

    setCliente({
      nome: "",
      email: "",
      cpf: "",
    });
  };

  const remover = (cpf) => {
    setClientes(
      clientes.filter((c) => c.cpf !== cpf)
    );

    setMensagem("🗑 Cliente removido");
  };

  const editar = (clienteSelecionado) => {
    setCliente(clienteSelecionado);
    setEditando(clienteSelecionado.cpf);
  };

  const atualizar = () => {
    setClientes(
      clientes.map((c) =>
        c.cpf === editando ? cliente : c
      )
    );

    setMensagem("✏ Cliente atualizado");

    setEditando(null);

    setCliente({
      nome: "",
      email: "",
      cpf: "",
    });
  };

  return (
    <div className="container">
      <h1>Cadastro de Clientes</h1>

      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={cliente.nome}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={cliente.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="cpf"
        placeholder="CPF"
        value={cliente.cpf}
        onChange={handleChange}
      />

      {editando ? (
        <button onClick={atualizar}>
          Atualizar
        </button>
      ) : (
        <button onClick={cadastrar}>
          Cadastrar
        </button>
      )}

      <p>{mensagem}</p>

      <h2>Clientes Cadastrados</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map((c) => (
            <tr key={c.cpf}>
              <td>{c.nome}</td>
              <td>{c.email}</td>
              <td>{c.cpf}</td>
              <td>
                <button
                  onClick={() => editar(c)}
                >
                  Editar
                </button>

                <button
                  onClick={() => remover(c.cpf)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;