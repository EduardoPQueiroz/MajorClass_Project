function buscarInstrumentos() {
        let selectInstrumentos = document.getElementById("selectInstrumento")
        fetch(`/instrumentos/buscarInstrumentos`).then(response => {
            if (response.ok) {
                response.json().then(resultado => {
                    for (i = 0; i < resultado.length; i++) {
                        let opt = document.createElement('option')
                        opt.innerHTML = resultado[i].nome
                        opt.value = resultado[i].idInstrumento
                        selectInstrumentos.appendChild(opt)
                    }
                })
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados: ${error.message}`);
            });
    }

    function buscarAlunos(){
        let selectAlunos = document.getElementById('selectAluno')

        fetch(`/alunos/getAlunos/${sessionStorage.ID_USUARIO}`).then(response =>{
            if(response.ok){
                response.json().then(resposta =>{
                    for(i=0; i<resposta.length; i++){
                        let opt = document.createElement('option')
                        opt.innerHTML = resposta[i].nome
                        opt.value = resposta[i].idAluno
                        selectAlunos.appendChild(opt)
                    }
                })
            }
        })
    }