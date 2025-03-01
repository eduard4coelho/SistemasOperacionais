// Sistemas Operacionais
//      Jéfter Lucas Lima da Silva
//      Maria Eduarda Coelho da Silva

// Considere um sistema operacional que implementa o escalonamento de processos. O funcionamento esperado é que esse ambiente tenha N (número previamente informado pelo usuário) processos que podem chegar em tempos distintos para execução, e tempos de processamento diferentes(Parametrizaveis). O algoritmo pode gerar tempos randomicos para facilitar a simunação das execuções. Para cada processo, deve ser informado:
// Tempo de chegada
// Tempo de retorno
// Medias de tempos de chegada e retorno
// Tempo de ociosidade do processador, caso ocorra
// Para o sistema como um todo deve se informar o tempo de troca de processos do sistema.

// Algoritmos:

// FIFO
// SJF
// RR
// Prioridade
// LOT(Loteria) - Não tivemos tempo de implementar

// Função para gerar tempos de execução, tempos de chegada e prioridades aleatórios
function gerarProcessosAleatorios(numProcessos) {
    const processos = {};

    for (let i = 1; i <= numProcessos; i++) {
        const idProcesso = `P${i}`;
        processos[idProcesso] = {
            tempoServico: Math.floor(Math.random() * 20) + 1, // Tempo de execução entre 1 e 20
            tempoChegada: Math.floor(Math.random() * 10) * i, // Tempo de chegada incremental e aleatório
            prioridade: Math.floor(Math.random() * numProcessos) + 1     // Prioridade entre 1 e numProcessos (1 é a mais alta)
        };
    }

    return processos;
}

function fifo(processos, tempoTrocaContexto) {
    console.log("FIFO - First In First Out");
    const listaProcessos = Object.entries(processos).sort((a, b) => a[1].tempoChegada - b[1].tempoChegada);

    let tempoEsperaTotal = 0;
    let tempoProcessamentoTotal = 0;
    let tempoAtual = 0;

    let stringCalculoSomaEspera = "";
    let stringCalculoSomaProcessamento = "";

    listaProcessos.forEach(([processo, { tempoServico }]) => {
        stringCalculoSomaEspera += tempoAtual + " + ";
        console.log(`${processo}:\n  TE: ${tempoAtual}`);

        tempoEsperaTotal += tempoAtual;
        tempoProcessamentoTotal += tempoAtual + tempoServico;
        tempoAtual += tempoServico;

        stringCalculoSomaProcessamento += tempoAtual + " + ";
        console.log(`  TP: ${tempoAtual}\n`);

        // Adiciona o tempo de troca de contexto após o processamento de cada processo
        if (processo !== listaProcessos[listaProcessos.length - 1][0]) { // Verifica se não é o último processo
            tempoAtual += tempoTrocaContexto;
        }
    });

    stringCalculoSomaEspera = stringCalculoSomaEspera.slice(0, -3);
    stringCalculoSomaProcessamento = stringCalculoSomaProcessamento.slice(0, -3);

    const tempoMedioEspera = tempoEsperaTotal / listaProcessos.length;
    const tempoMedioProcessamento = tempoProcessamentoTotal / listaProcessos.length;

    console.log(`Tempo médio de espera        [TME]: (${stringCalculoSomaEspera})/${listaProcessos.length} = ${tempoEsperaTotal}/${listaProcessos.length} = ${tempoMedioEspera} u.t`);
    console.log(`Tempo médio de processamento [TMP]: (${stringCalculoSomaProcessamento})/${listaProcessos.length} = ${tempoProcessamentoTotal}/${listaProcessos.length} = ${tempoMedioProcessamento} u.t`);

    return false;
}

function sjf(processos, tempoTrocaContexto) {
    console.log("SJF - Shortest Job First");

    // Ordena os processos pelo tempo de serviço, e em caso de empate, pelo tempo de chegada
    const listaProcessos = Object.entries(processos).sort((a, b) => {
        if (a[1].tempoServico === b[1].tempoServico) {
            return a[1].tempoChegada - b[1].tempoChegada;
        }
        return a[1].tempoServico - b[1].tempoServico;
    });

    // console.log("listaProcessos: ", listaProcessos);

    let stringOrdenacaoProcessos = "";
    listaProcessos.forEach(processo => {
        stringOrdenacaoProcessos += `${processo[0]} `;
    });

    console.log(`Ordem de execução: ${stringOrdenacaoProcessos}\n`);

    let tempoEsperaTotal = 0;
    let tempoProcessamentoTotal = 0;
    let tempoAtual = 0;

    let stringCalculoSomaEspera = "";
    let stringCalculoSomaProcessamento = "";

    listaProcessos.forEach(([processo, { tempoServico }]) => {
        stringCalculoSomaEspera += tempoAtual + " + ";
        console.log(`${processo}:\n  TE: ${tempoAtual}`);

        tempoEsperaTotal += tempoAtual;
        tempoProcessamentoTotal += tempoAtual + tempoServico;
        tempoAtual += tempoServico;

        stringCalculoSomaProcessamento += tempoAtual + " + ";
        console.log(`  TP: ${tempoAtual}\n`);

        // Adiciona o tempo de troca de contexto após o processamento de cada processo
        if (processo !== listaProcessos[listaProcessos.length - 1][0]) { // Verifica se não é o último processo
            tempoAtual += tempoTrocaContexto;
        }
    });

    stringCalculoSomaEspera = stringCalculoSomaEspera.slice(0, -3);
    stringCalculoSomaProcessamento = stringCalculoSomaProcessamento.slice(0, -3);

    const tempoMedioEspera = tempoEsperaTotal / listaProcessos.length;
    const tempoMedioProcessamento = tempoProcessamentoTotal / listaProcessos.length;

    console.log(`Tempo médio de espera        [TME]: (${stringCalculoSomaEspera})/${listaProcessos.length} = ${tempoEsperaTotal}/${listaProcessos.length} = ${tempoMedioEspera} u.t`);
    console.log(`Tempo médio de processamento [TMP]: (${stringCalculoSomaProcessamento})/${listaProcessos.length} = ${tempoProcessamentoTotal}/${listaProcessos.length} = ${tempoMedioProcessamento} u.t`);

    return false;
}

function prioridade(processos, tempoTrocaContexto) {
    console.log("Prioridade - (número de prioridade menor implica prioridade maior)");

    const listaProcessos = Object.entries(processos).sort((a, b) => a[1].prioridade - b[1].prioridade);

    let stringOrdenacaoProcessos = "";
    listaProcessos.forEach(processo => {
        stringOrdenacaoProcessos += `${processo[0]} `;
    });

    console.log(`Ordem de execução (por prioridade): ${stringOrdenacaoProcessos}\n`);

    let tempoEsperaTotal = 0;
    let tempoProcessamentoTotal = 0;
    let tempoAtual = 0;

    let stringCalculoSomaEspera = "";
    let stringCalculoSomaProcessamento = "";

    listaProcessos.forEach(([processo, { tempoServico }]) => {
        stringCalculoSomaEspera += tempoAtual + " + ";
        console.log(`${processo}:\n  TE: ${tempoAtual}`);

        tempoEsperaTotal += tempoAtual;
        tempoProcessamentoTotal += tempoAtual + tempoServico;
        tempoAtual += tempoServico;

        stringCalculoSomaProcessamento += tempoAtual + " + ";
        console.log(`  TP: ${tempoAtual}\n`);

        // Adiciona o tempo de troca de contexto após o processamento de cada processo
        if (processo !== listaProcessos[listaProcessos.length - 1][0]) { // Verifica se não é o último processo
            tempoAtual += tempoTrocaContexto;
        }
    });

    stringCalculoSomaEspera = stringCalculoSomaEspera.slice(0, -3);
    stringCalculoSomaProcessamento = stringCalculoSomaProcessamento.slice(0, -3);

    const tempoMedioEspera = tempoEsperaTotal / listaProcessos.length;
    const tempoMedioProcessamento = tempoProcessamentoTotal / listaProcessos.length;

    console.log(`Tempo médio de espera        [TME]: (${stringCalculoSomaEspera})/${listaProcessos.length} = ${tempoEsperaTotal}/${listaProcessos.length} = ${tempoMedioEspera} u.t`);
    console.log(`Tempo médio de processamento [TMP]: (${stringCalculoSomaProcessamento})/${listaProcessos.length} = ${tempoProcessamentoTotal}/${listaProcessos.length} = ${tempoMedioProcessamento} u.t`);

    return false;
}

function roundRobin(processos, tempoTrocaContexto, quantum) {
    console.log("RR - Round Robin");

    const listaProcessos = Object.entries(processos).sort((a, b) => a[1].tempoChegada - b[1].tempoChegada);
    const filaProcessos = [...listaProcessos];  // Fila de processos em ordem de chegada

    let tempoAtual = 0;
    let tempoEsperaTotal = 0;
    let tempoProcessamentoTotal = 0;
    let stringCalculoSomaEspera = "";
    let stringCalculoSomaProcessamento = "";

    const temposRestantes = {};  // Para armazenar o tempo de execução restante de cada processo
    const temposFinalTE = {}; // Para armazenar o tempo de espera final (TE) de cada processo
    const temposFinalTP = {}; // Para armazenar o tempo de processamento final (TP) de cada processo
    listaProcessos.forEach(([processo, { tempoServico }]) => {
        temposRestantes[processo] = tempoServico;
    });

    console.log(`Ordem de execução (Round Robin com quantum = ${quantum}):`);
    while (filaProcessos.length > 0) {
        const [processo, { tempoChegada }] = filaProcessos.shift();

        const tempoServicoRestante = temposRestantes[processo];

        // Verifica quantos processos ainda têm tempo restante
        const processosComTempoRestante = Object.values(temposRestantes).filter(tempo => tempo > 0).length;

        // Se este for o último processo com tempo restante, ele recebe o tempo total necessário para terminar
        const tempoExecucao = (processosComTempoRestante === 1) ? tempoServicoRestante : Math.min(tempoServicoRestante, quantum);

        console.log(`${processo}:\n  TE: ${tempoAtual}`);
        tempoEsperaTotal += tempoAtual;

        // Armazena o TE - final do processo
        temposFinalTE[processo] = tempoAtual;  // Tempo de espera é o tempo total menos o tempo de chegada

        tempoAtual += tempoExecucao;
        temposRestantes[processo] -= tempoExecucao;

        tempoProcessamentoTotal += tempoAtual;
        console.log(`  TP: ${tempoAtual}\n`);

        // Armazena o TP - final do processo
        temposFinalTP[processo] = tempoAtual;  // Tempo de processamento final é o tempo atual após a execução

        if (temposRestantes[processo] > 0) {
            // O processo ainda tem tempo restante, então volta para a fila
            filaProcessos.push([processo, { tempoChegada }]);
            tempoAtual += tempoTrocaContexto;
        } else if (processosComTempoRestante > 1) {
            // Adiciona o tempo de troca de contexto apenas se houver mais de um processo com tempo restante
            tempoAtual += tempoTrocaContexto;
        }
    }

    Object.values(temposFinalTE).forEach(tempo => {
        stringCalculoSomaEspera += tempo + " + ";
    });

    Object.values(temposFinalTP).forEach(tempo => {
        stringCalculoSomaProcessamento += tempo + " + ";
    });

    stringCalculoSomaEspera = stringCalculoSomaEspera.slice(0, -3);
    stringCalculoSomaProcessamento = stringCalculoSomaProcessamento.slice(0, -3);

    const somaTE = Object.values(temposFinalTE).reduce((acc, curr) => acc + curr, 0);
    const somaTP = Object.values(temposFinalTP).reduce((acc, curr) => acc + curr, 0);

    // console.log("temposFinalTE: ", temposFinalTE);
    // console.log("temposFinalTP: ", temposFinalTP);

    const mediaTempoEspera = somaTE / listaProcessos.length;
    const mediaTempoProcessamento = somaTP / listaProcessos.length;

    // DEBUG
    // console.log("tempoEsperaTotal: ", mediaTempoEspera)
    // console.log("mediaTempoProcessamento: ", mediaTempoProcessamento)
    // console.log("mediaTempoEspera: ", mediaTempoEspera);
    // console.log("mediaTempoProcessamento: ", mediaTempoProcessamento);

    console.log(`Tempo médio de espera        [TME]: (${stringCalculoSomaEspera})/${listaProcessos.length} = ${somaTE}/${listaProcessos.length} = ${mediaTempoEspera} u.t`);
    console.log(`Tempo médio de processamento [TMP]: (${stringCalculoSomaProcessamento})/${listaProcessos.length} = ${somaTP}/${listaProcessos.length} = ${mediaTempoProcessamento} u.t`);

    return {
        tempoEsperaTotal,
        tempoProcessamentoTotal,
        mediaTempoEspera,
        mediaTempoProcessamento,
        stringCalculoSomaEspera,
        stringCalculoSomaProcessamento
    };
}

// Tests
// const processos = {
//   "P1": { "tempoServico": 8, "tempoChegada": 0, "prioridade": 3 },
//   "P2": { "tempoServico": 12, "tempoChegada": 2, "prioridade": 4},
//   "P3": { "tempoServico": 20, "tempoChegada": 9, "prioridade": 1},
//   "P4": { "tempoServico": 6, "tempoChegada": 11, "prioridade": 2},
//   "P5": { "tempoServico": 14, "tempoChegada": 12, "prioridade": 5}
// };

const processos = gerarProcessosAleatorios(5);
console.log("PROCESSOS: ", processos, "\n"); // DBUG

const quantum = 3;  // Tempo máximo de execução para cada processo em uma rodada
const tempoTrocaContexto = 2;
fifo(processos, tempoTrocaContexto);
// sjf(processos, tempoTrocaContexto);
// prioridade(processos, tempoTrocaContexto);
// roundRobin(processos, tempoTrocaContexto, quantum);