import { formatarMoeda } from "../utils/moeda";

export function ProdutoCard({ produto, onAdicionar }) {
  return (
    <article className="produto-card">
      <img src={produto.imagem} alt={produto.nome} />

      <div className="produto-conteudo">
        <h3>{produto.nome}</h3>

        <p>{produto.descricao}</p>

        <strong>{formatarMoeda(produto.preco)}</strong>

        <button
          type="button"
          disabled={!produto.disponivel}
          onClick={() => onAdicionar(produto)}
        >
          {produto.disponivel ? "Adicionar" : "Indisponível"}
        </button>
      </div>
    </article>
  );
}