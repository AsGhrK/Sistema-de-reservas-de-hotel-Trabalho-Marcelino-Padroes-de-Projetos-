# Padrões usados no sistema de reservas de hotel

## Factory Method
**Onde:** `src/quartos/CriadorQuarto.ts` (creator e subclasses), `src/quartos/Quarto.ts` e `src/quartos/QuartosConcretos.ts` (produtos). Quem usa é o `HotelUnico.cadastrarQuarto()`.

**Problema:** o hotel tem quartos simples, duplo e luxo. Se o `HotelUnico` decidisse com um `if` qual quarto criar, toda vez que surgisse um tipo novo eu teria que mexer nele.

**Por quê:** o `CriadorQuarto` é abstrato e tem o método `criarQuarto()`. Cada subclasse (`CriadorQuartoSimples`, `CriadorQuartoDuplo`, `CriadorQuartoLuxo`) decide qual quarto concreto criar. O hotel só conhece o creator abstrato e a interface `Quarto`. Para um tipo novo eu crio 2 classes (o quarto e o creator) e não altero o hotel.

## Singleton
**Onde:** `src/hotel/HotelUnico.ts`.

**Problema:** o hotel é um só e guarda os quartos e as reservas. Se cada parte do sistema criasse o seu próprio hotel, cada um teria dados diferentes.

**Por quê:** o construtor é privado e o método estático `obterInstancia()` cria o hotel na primeira chamada e devolve sempre o mesmo depois. No `index.ts` dá para ver que `hotel === HotelUnico.obterInstancia()` é `true`. Os parâmetros (nome e endereço) só valem na primeira chamada.

## Abstract Factory
**Onde:** `src/tarifas/FabricaPlano.ts` (a fábrica e as duas famílias) e `src/tarifas/Politicas.ts` (os produtos). Quem usa é o `ReservaBuilder.plano()`.

**Problema:** cada reserva segue um plano tarifário com duas peças que precisam combinar: a política de preço e a política de cancelamento. Se elas fossem escolhidas separadas, daria para misturar o preço promocional com o cancelamento flexível.

**Por quê:** a interface `FabricaPlano` tem `criarPoliticaPreco()` e `criarPoliticaCancelamento()`. `FabricaPlanoFlexivel` e `FabricaPlanoPromocional` só criam peças do próprio plano, então a família sempre sai combinando. A reserva só conhece a interface, e criar um plano novo não muda quem usa.

## Builder
**Onde:** `src/reservas/ReservaBuilder.ts`, que monta a `Reserva` de `src/reservas/Reserva.ts`.

**Problema:** a reserva tem partes obrigatórias (cliente, quarto, período e plano) e partes opcionais (café da manhã, estacionamento e observações). Um construtor com tudo isso teria vários valores vazios e ninguém saberia o que cada posição significa.

**Por quê:** cada parte tem seu método (`cliente()`, `quarto()`, `cafeDaManha()`...), que devolve `this` para encadear. O `build()` confere o que é obrigatório e só coloca na reserva o que foi configurado. O builder também recebe a `FabricaPlano`, então ele usa o Abstract Factory.

## Prototype
**Onde:** o método `clonar()` em `src/quartos/QuartosConcretos.ts` (declarado em `src/quartos/Quarto.ts`). Quem usa é o `HotelUnico.cadastrarCopia()`.

**Problema:** muitos quartos são parecidos com outro que já existe (mesmo tipo e mesmas comodidades), só muda o número. Criar do zero e repetir as comodidades toda vez dá trabalho e pode dar erro.

**Por quê:** o `clonar()` cria um quarto novo copiando a lista de comodidades com `[...this.comodidades]`. Assim a lista da cópia é outra, e adicionar uma comodidade na cópia não muda o modelo. Sem isso os dois quartos dividiriam a mesma lista.

## Como os padrões se conectam
O `HotelUnico` (Singleton) cria os quartos pelo Factory Method e também faz cópias deles com o Prototype. Na reserva, o Builder recebe a fábrica do plano (Abstract Factory) e entrega a reserva pronta para o hotel guardar. São cinco padrões no mesmo fluxo, e não cinco exercícios separados.
