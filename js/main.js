'use strict' //modo rigoroso do javascript

const limparFormulario =()=>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco)=>{
    document.getElementById('endereco').value = endereco.logradouro;
    // document.getElementById('numero').value = endereco.numero
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

const isNumber = (numero)=>/^[0-9]+$/.test(numero);
const cepValido = (cep) => cep.length ===8 && isNumber(cep);

const pesquisarCep = async()=>{
    limparFormulario();
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if(cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else{
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
    // fetch(url).then(response => response.json()).then(console.log);     //fetch vc da uma url, e retorna uma 'promessa'
}
document.getElementById('cep')
        .addEventListener('focusout',pesquisarCep);

 