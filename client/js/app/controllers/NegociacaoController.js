class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._listaNegociacoes = new ListaNegociacoes();

        this._negociacoesView = new NegociacoesView($("#negociacoesView"));
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($("#mensagemView"));
        this._mensagemView.update(this._mensagem);
    }

    adiciona(event) {
        event.preventDefault();
        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociação adicionada com sucesso";
        this._mensagemView.update(this._mensagem);

        this._limpaFormulario();
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = "Negociações apagadas com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    importaNegociacoes() {
        let service = new NegociacaoService();

        //Promise.all([
            //service.obterNegociacoesDaSemana(),
            //service.obterNegociacoesDaSemanaAnterior(),
            //service.obterNegociacoesDaSemanaRetrasada()
            //service.obterNegociacoesSemana4()
        //])
        //passando uma função como parâmetro que recebe 2 parâmetros
        service.obterNegociacoesSemana3()
        .then(negociacoes => {

            //arrayFlat - todas as listas
            //primeiro parametro a concatenação das listas, segundo lista vazia
            negociacoes.reduce((arrayFlat, array) => arrayFlat.concat(array), [])

            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
            this._negociacoesView.update(this._listaNegociacoes);

            this._mensagem.texto = "Negociações importadas com sucesso!";
            this._mensagemView.update(this._mensagem);
        })
        .catch(
            erro => {
                this._mensagem.texto = erro;
                this._mensagemView.update(this._mensagem);
            }
        )
    }

    //com callback cb
    importaNegociacoes2() {
        let service = new NegociacaoService();
        //passando uma função como parâmetro que recebe 2 parâmetros
        service.obterNegociacoesSemana2((erro, negociacoes) => {
            //tem algo em erro
            if(erro){
                this._mensagem.texto = erro;
                this._mensagemView.update(this._mensagem);
                return;
            }else{
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                this._negociacoesView.update(this._listaNegociacoes);

                this._mensagem.texto = "Negociações importadas com sucesso!";
                this._mensagemView.update(this._mensagem);
            }
        });
    }

    importaNegociacoes3(){
        let service = new NegociacaoService();

        negociacao.obterNegociacoesSemana4().then(negociacoes =>
            negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = "Negociações do período importadas";
                this._negociacoesView.update(this._listaNegociacoes);
                this._mensagemView.update(this._mensagem);
            })
        )
        .catch(erro => {
            this._mensagem.texto = erro;
            this._mensagemView.update(this._mensagem);
            return;
        });
    }
}
