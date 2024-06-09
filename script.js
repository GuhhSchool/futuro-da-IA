const mainBoxElement = document.querySelector('.div--main');
const mainBoxAnimElement = document.querySelector('.div--anim-background');
const titleHistoryElement = document.querySelector('.h1--title');
const textHistoryElement = document.querySelector('.p--text');
const buttonBoxElement = document.querySelector('.div--buttons');
const resultBoxElement = document.querySelector('.div--result');
const resultTextElement = document.querySelector('.p--result-text');
const divInputElement = document.querySelector('.div--input');
const inputElement = document.querySelector('.input--name');
const restartButtonElement = document.querySelector('.img--restart');

const contents = [
    {
        order: 0,
        history: "Ao chegar em casa, você se depara com uma pessoa que diz ser capaz de resolver todas as suas dúvidas de matemática. Qual a sua reação?",
        alternatives: [
            {
                content: 'Hmm... achei interessante.',
                response: 'Desde o começo, G{nome} se interessou pela parceria com a IA.',
            },
            {
                content: 'Tenho certeza que é golpe.',
                response: 'No começo, G{nome} achou que era golpe e ficou com medo de conversar com a IA.',
            },
        ],
    },
    {
        order: 1,
        history: "No dia seguinte, no colégio, você decide contar para a sua turma sobre o que viu no dia anterior. Então, a professora de matemática resolve passar novas atividades de casa para a turma resolver, com brinde para quem acertar tudo. O que você faz?",
        alternatives: [
            {
                content: 'Converso com essa pessoa misteriosa para que me ajude a encontrar informações relevantes para a lição e explique de forma que eu entenda facilmente.',
                response: 'Um tempo depois, quis arriscar e ver o que ela tinha a oferecer, já que precisava de ajuda em suas atividades escolares.',
                subcategory: 2,
            },
            {
                content: 'Resolvo a lição com base em conversas com colegas, pesquisas na internet e conhecimentos próprios sobre o tema.',
                response: 'Um tempo depois, optou por não usar as novidades dela pois acreditava que se sairia bem na atividades escolares que tinha, usando apenas as próprias fontes de conhecimento.',
                subcategory: 1,
            },
        ],
    },
    {
        order: 2,
        history: "Você traz o trabalho no dia seguinte e acerta 90% das questões. Porém, tem um colega que acertou 100% delas usando a ajuda dessa pessoa misteriosa que também apareceu na casa dele. O que você pensa?",
        subcategory: 1,
        alternatives: [
            {
                content: 'Defendo a ideia de que a ajuda dessa pessoa misteriosa pode criar novas oportunidades e até melhorar habilidades humanas.',
                response: 'Por conta dessa decisão, G{nome} não conseguiu a melhor nota da turma apesar do grande esforço... Então percebeu que a IA ajudaria em situações como essa, onde daria mais oportunidades e ajuda para que as pessoas possam adquirir mais habilidades humanas.',
            },
            {
                content: 'Me preocupo com as pessoas que perderão seus méritos por conta de pessoas como a "misteriosa" e defendo a importância de valorizar quem trabalha duro.',
                response: 'Por conta dessa decisão, G{nome} não conseguiu a melhor nota da turma apesar do grande esforço, tirando a conclusão de que inteligências artificiais apenas prejudicariam pessoas que se esforçam e trabalham duro.',
            },
        ],
    },
    {
        order: 2,
        history: "No dia seguinte, ao entregar as lições, seu amigo estudioso errou apenas uma questão. Se aproximando de você, a professora diz que você acertou todas! Então, ela decide fazer perguntas sobre as lições das quais você consegue responder facilmente mesmo você tendo aprendido rapidamente no dia anterior. O que você pensa?",
        subcategory: 2,
        alternatives: [
            {
                content: 'Defendo a ideia de que a ajuda dessa pessoa misteriosa pode criar novas oportunidades e até melhorar habilidades humanas.',
                response: 'Com a ajuda da IA, G{nome} conseguiu se destacar e tirou a maior nota da turma! Então concluiu que usar IA para adquirir conhecimento e ter ajuda será uma das formas de melhorar o mundo.',
            },
            {
                content: 'Me preocupo com as pessoas que perderão seus méritos mesmo tendo se esforçado (como o meu colega), e defendo a importância de valorizar quem trabalha duro.',
                response: 'Com a ajuda da IA, G{nome} conseguiu se destacar e tirou a maior nota da turma! Porém, em um gesto de solidariedade pelos colegas que não tiraram a mesma nota, viu que a ferramenta pode prejudicar pessoas e acabar com trabalhos que considera dignos para humanos.',
            },
        ],
    },
    {
        order: 3,
        history: "Ao chegar em casa, você pergunta o nome dessa pessoa misteriosa e ela diz se chamar “Inteligência Artificial”. Logo de cara você se assusta, mas percebe que a IA faz contas de matemática corretamente e explicadas para você. Então você decide:",
        alternatives: [
            {
                content: 'Começar a usar mais essa ferramenta para auxiliar quando você precisar.',
                response: 'Um tempo passou e, quando G{nome} descobriu do que a IA realmente é capaz, se surpreendeu tanto que resolveu começar a usá-la frequentemente até os dias atuais, onde ela ajuda diariamente em tarefas cotidianas e profissionais.',
            },
            {
                content: 'Expulsar a IA de casa. Pois pode ser muito perigosa se começarem a usar ela com más intenções.',
                response: 'Um tempo passou e, quando G{nome} descobriu do que a IA realmente é capaz, se assustou tanto que nunca mais quis vê-la em sua frente, preferindo ler livros e adquirir conhecimentos através de estudos.',
            },
        ],
    },
];

let currentIndex = 0;
let username = '';
let currentHistory = 'Biografia de: <span class="color-yellow">G{nome}</span><br>Ano: <span class="color-yellow">2049</span><br>';


class showHistory {
    #indexHistory
    #currHistoryObj
    #subcategory

    constructor(index, subcategory) {
        this.#indexHistory = index;
        this.#subcategory = subcategory;
        this.#currHistoryObj = this.getHistory();
        this.setHistory();
    }

    getHistory() {
        const newContents = contents.filter(f => f.order === this.#indexHistory);
        if (newContents.length === 1) return newContents[0];
        else return newContents.find(f => f.subcategory === this.#subcategory);
    }

    getContentLength() {
        return new Set(contents.map(m => m.order)).size;
    }
    
    setHistory() {
        if (this.getContentLength() <= this.#indexHistory) return this.#showResult();
        this.#setTitle();
        this.#setQuestions();
        beforeHeight();
    }

    #setTitle() {
        textHistoryElement.animate({ color: '#0B0D20'}, { duration: 0, fill: 'forwards' });
        textHistoryElement.textContent = this.#currHistoryObj.history;
        console.log(this.#indexHistory);
        setTimeout(() => {
            textHistoryElement.animate({ color: '#D7F9FF'}, { duration: 250, fill: 'forwards' });
            textHistoryElement.style.color = '#D7F9FF';
            textHistoryElement.style.opacity = 1;
            if (this.#indexHistory === 3) titleHistoryElement.innerHTML = 'Você decide o futuro da <span class="color-yellow">Inteligência Artificial</span>';
        }, 500);
    }

    #setQuestions() {
        for (const alternative of this.#currHistoryObj.alternatives) {
            const alternativeButton = document.createElement('button');
            alternativeButton.textContent = alternative.content;
            alternativeButton.onclick = () => this.#onclick(alternative);
            buttonBoxElement.appendChild(alternativeButton); 
        }
    }

    #onclick(clickInfo) {
        buttonBoxElement.textContent = "";
        currentHistory += `<br>${clickInfo.response}<br>`;
        if (clickInfo.subcategory) new showHistory(++currentIndex, clickInfo.subcategory);
        else new showHistory(++currentIndex);
    }

    #showResult() {
        textHistoryElement.innerHTML = currentHistory.replaceAll('G{nome}', username);
        beforeHeight();
        buttonBoxElement.textContent = "";
        restartButtonElement.style.display = "flex";
        document.documentElement.style.setProperty('--color-border', '#ffef08');
    }
}

function beforeHeight() {
    mainBoxAnimElement.style.height = mainBoxElement.clientHeight + 'px';
}

function start() {
    textHistoryElement.innerHTML = 'Olá! <br><br>Antes de começarmos nosso jogo, qual nome de usuário você gostaria de usar?';
    beforeHeight();
}

start();

inputElement.addEventListener("keypress", function(event) {
    if (event.key !== 'Enter') return;

    verifyName();
});

function verifyName() {
    const temporaryName = inputElement.value;
    
    var letters = /^[A-Za-z çÇáÁíÍãÃóÓéÉêÊâÂúÚüÜ]+$/;
    if (temporaryName.length) {
        if (temporaryName.length <= 2) return alert('Ops! Seu nome precisa ter pelo menos 3 caracteres.');
        if (!temporaryName.match(letters)) return alert('Ops! Seu nome não pode conter caracteres especiais (exceto espaços)');
        username = temporaryName.trim().split(/ +/g).map(m => m.replace(m[0], m[0].toUpperCase())).join(' ');
    }
    else username = 'S/n';

    preview();
}

function preview() {
    divInputElement.style.opacity = 0;
    textHistoryElement.style.opacity = 0;

    setTimeout(() => {
        divInputElement.style.display = 'none';
        textHistoryElement.textContent = 'Vamos começar';
        beforeHeight();
        textHistoryElement.style.opacity = 1;
    }, 1000);

    setTimeout(() => textHistoryElement.style.opacity = 0, 2000);
    setTimeout(() => {
        new showHistory(currentIndex);
    }, 3000);
} 