import { useEffect, useState } from 'react';

const lerCarrinho = () => {
    try {
        return JSON.parse(localStorage.getItem('carrinho')) ?? [];
    } catch {
        return [];

    }
};

export function useCarrinho() {
    const [itens, setItens] = useState(lerCarrinho());

    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(itens));
    }, [itens]);

    function adicionarItem(novoItem) {
        setItens((itensAtuais) => {
            const existe = itensAtuais.find(
                (item) =>
                    (item.chave || item.id) === (novoItem.chave || novoItem.id)
            );

            if (!existe) {
                return [
                    ...itensAtuais,
                    {
                        ...novoItem,
                        quantidade: 1,
                    },
                ];
            }

            return itensAtuais.map((item) =>
                (item.chave || item.id) === (novoItem.chave || novoItem.id)
                    ? {
                        ...item,
                        quantidade: item.quantidade + 1,
                    }
                    : item
            );
        });
    }

    function removerItem(identificador) {
        setItens((itensAtuais) =>
            itensAtuais.filter(
                (item) =>
                    (item.chave || item.id) !== identificador
            )
        );
    }

    function diminuirQuantidade(identificador) {
        setItens((itensAtuais) =>
            itensAtuais
                .map((item) =>
                    (item.chave || item.id) === identificador
                        ? {
                            ...item,
                            quantidade: item.quantidade - 1,
                        }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }
    return {
        itens,
        setItens,
        adicionarItem,
        removerItem,
        diminuirQuantidade
    };
}

