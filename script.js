class Quarto {
    constructor(numero, tipo, precoDiario) {
        this.numero = numero;
        this.tipo = tipo;
        this.precoDiario = precoDiario;
        this.reservado = false;
    }

    verificarDisponibilidade() {
        return !this.reservado;
    }
}

class Hospede {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

class Reserva {
    constructor(quarto, hospede, dataInicio, dataFim) {
        this.quarto = quarto;
        this.hospede = hospede;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.custoTotal = this.calculaCustoTotal();
    }

    calculaCustoTotal() {
        const diferencaDias = (this.dataFim - this.dataInicio) / (1000 * 60 * 60 * 24);
        return diferencaDias * this.quarto.precoDiario;
    }
}

class Hotel {
    constructor() {
        this.quartos = [];
        this.reservas = [];
    }

    adicionarQuarto(quarto) {
        this.quartos.push(quarto);
    }

    exibirQuartosDisponiveis() {
        console.log("Quartos disponíveis:");
        this.quartos.forEach(quarto => {
            if (!quarto.reservado) {
                console.log(`Número: ${quarto.numero}, Tipo: ${quarto.tipo}, Preço da Diária: ${quarto.precoDiario}`);
            }
        });
    }

    reservarQuarto(quarto, hospede, dataInicio, dataFim) {
        if (quarto.verificarDisponibilidade()) {
            quarto.reservado = true;
            const reserva = new Reserva(quarto, hospede, dataInicio, dataFim);
            this.reservas.push(reserva);
            return reserva;
        } else {
            return null;
        }
    }
}

// Criar uma instância do hotel
const meuHotel = new Hotel();

// Adicionar quartos ao hotel
meuHotel.adicionarQuarto(new Quarto(101, 'Standard', 100));
meuHotel.adicionarQuarto(new Quarto(102, 'Luxo', 200));
meuHotel.adicionarQuarto(new Quarto(103, 'Suíte', 300));

// Exibir quartos disponíveis
meuHotel.exibirQuartosDisponiveis();

// Criar uma instância de hóspede
const hospede1 = new Hospede('Raphael', 'raphael12@gmail.com');

// Reservar um quarto
const reserva1 = meuHotel.reservarQuarto(meuHotel.quartos[0], hospede1, new Date('2024-03-01'), new Date('2024-03-05'));

if (reserva1) {
    console.log(`Reserva realizada com sucesso! Custo Total: ${reserva1.custoTotal}`);
}

// Tentar reservar um quarto ocupado
const reserva2 = meuHotel.reservarQuarto(meuHotel.quartos[0], hospede1, new Date('2024-03-02'), new Date('2024-03-06'));

if (reserva2) {
    console.log(`Reserva realizada com sucesso! Custo Total: ${reserva2.custoTotal}`);
} else {
    console.log("Não foi possível realizar a reserva.");
}

// Exibir quartos disponíveis após as reservas
console.log("\nQuartos disponíveis após as reservas:");
meuHotel.exibirQuartosDisponiveis();