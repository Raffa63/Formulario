class Contato {
    constructor(){
        this.contatos = localStorage.getItem('tbContatos') === null
                        ? []
                        : JSON.parse(localStorage.getItem('tbContatos'))
    }
    salva(contato){
        if(document.getElementById('email').getAttribute('disabled')==='disabled'){
            this.apaga(contato.email)
        }
        this.contatos.push(contato) //adiciona um novo elemento ao array
        alert('Enviado com Sucesso!')
        localStorage.setItem('tbContatos', JSON.stringify(this.contatos))
    }

    edita(contato){
        document.getElementById('nome').value = contato.nome
        document.getElementById('telefone').value = contato.telefone
        document.getElementById('email').value = contato.email
        document.getElementById('email').setAttribute('disabled','disabled')
        document.getElementById('cidade').value = contato.cidade
        document.getElementById('marca').value = contato.marca
        document.getElementById('produto').value = contato.produto
    }

    apaga(email){
        let index = this.contatos.findIndex(contato => contato.email == email)
        this.contatos.splice(index, 1) //splice remove o item do índice no array
        localStorage.setItem('tbContatos',JSON.stringify(this.contatos))
        contato.atualiza()
    }

    lista(){
        const listagem = this.contatos.map((contato) => (
            `<tr>  
                <td>${contato.nome}</td>
                <td>${contato.telefone}</td>
                <td>${contato.email}</td>
                <td>${contato.cidade}</td>
                <td>${contato.marca}</td>
                <td>${contato.produto}</td>
                <td>
                    <button id='apagar' onClick='contato.apaga(${contato.codigo})'>
                    🗑️ Apagar </button>
                    <button id='editar' onClick='contato.edita(${JSON.stringify(contato)})'>
                    🗒️ Editar </button> 
                </td>
             </tr>
            `
        ))
        return(`<table border='1' class='paleBlueRows'>
        <caption>Relação de contatos</caption>
        <thead>    
            <th>Nome</th>
            <th>Telefone</th>         
            <th>Email</th>
            <th>Cidade</th>      
            <th>Marca</th>
            <th>Produto</th>
            <th class="opcoes">Opções</th>
        </thead>
        <tbody>${listagem}</tbody>
        </table>    
        `)
    }
    atualiza(){
        document.getElementById('listagem').innerHTML = contato.lista()
    }
}
//instanciamos um novo objeto
const contato = new Contato()
//tratamos o botão salvar
document.getElementById('salvar').onclick = function(){
    const registro = {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        cidade: document.getElementById('cidade').value,
        marca: document.getElementById('marca').value,
        produto: document.getElementById('produto').value,
    }
    contato.salva(registro)
}
//tratamos a listagem
window.onload = function() {
    contato.atualiza()
}
