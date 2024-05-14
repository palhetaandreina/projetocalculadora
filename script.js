const tagBotoes = document.querySelectorAll('.teclas > button.digito');

const tagOperadores = document.querySelectorAll('.teclas > button.operador');

const tagResultado = document.getElementById('resultado');
const tagTextoCalculo = document.getElementById('texto-calculo');

let valorImpresso = '';
let primeiroValor;
let segundoValor;
let operador;

const operadoresMap = new Map([
  ['÷', '/'],
  ['×', '*'],
  ['+', '+'],
  ['-', '-'],
]);

function atualizaResultado(resultado = '') {
  tagResultado.innerHTML = resultado;
}

function atualizaTextoCalculo(valorImpresso = '') {
  tagTextoCalculo.innerHTML = valorImpresso;
}

function geraValor(digito) {
  if (digito == ',' && valorImpresso.includes(',')) {
    return;
  }

  valorImpresso += digito;
  atualizaTextoCalculo(valorImpresso);
}

function calcular(a, b, operador) {
  switch (operador) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '/':
      if (b !== 0) {
        return a / b;
      } else {
        return 'Error: Divisão por zero!';
      }
    case '*':
      return a * b;

    default:
      return 'Error: Operador inválido!';
  }
}

function limpaResultado() {
  valorImpresso = '';
  primeiroValor = '';
  segundoValor = '';
  operador = '';

  atualizaResultado();
  atualizaTextoCalculo();
}

function apagaUltimo() {
  const tamanho = valorImpresso.length;

  if (tamanho < 1) {
    return;
  }

  valorImpresso = valorImpresso.slice(0, tamanho - 1);
  atualizaTextoCalculo(valorImpresso);
}

function calculaPorcantagem() {}

function setOperador(_operador) {
  operador = operadoresMap.get(_operador) || _operador;
  primeiroValor = parseFloat(valorImpresso.replace(',', '.'));
  valorImpresso = '';
  atualizaTextoCalculo();
}

for (const item of tagBotoes) {
  item.addEventListener('click', function (e) {
    const tag = e.target;
    const digito = tag.innerHTML;
    geraValor(digito);
  });
}

for (const item of tagOperadores) {
  item.addEventListener('click', function (e) {
    const tag = e.target;
    const digito = tag.innerHTML;
    setOperador(digito);
  });
}

function realizaCalculo() {
  segundoValor = parseFloat(valorImpresso.replace(',', '.'));

  let resultadoCalculo = Number(
    calcular(primeiroValor, segundoValor, operador)
  );

  tagResultado.innerHTML = resultadoCalculo.toFixed(2).replace('.', ',');
}
