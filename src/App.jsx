import { useState } from "react";
import "./App.css";

import { categorias, produtos } from "./data/produtos";
import { ProdutoCard } from "./components/ProdutoCard";

function App() {

  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");

  const produtosVisiveis = produtos.filter((produto) =>
    categoriaAtiva === "todos"
      ? true
      : produto.categoria === categoriaAtiva
  );

  return (
    <main className="App">
      <header className="cabecalho">
        <p className="marca">JF DEV • Cardápio</p>

        <h1>Sorveteria Doce Mel</h1>

        <p>Ecolha seus favoritos e peça pelo whatsapp</p>

      </header>

      <section className="categorias">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            onClick={() => setCategoriaAtiva(categoria.id)}
          >
            {categoria.nome}
          </button>
        ))}
      </section>

      <section className="produtos">
        {produtosVisiveis.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAdicionar={(produtoSelecionado) =>
              console.log("Adicionar:", produtoSelecionado)
            }
          />
        ))}
      </section>

    </main>
  );
}

export default App;