# Padrões usados no sistema de reservas de hotel

## Factory Method
Onde src/quartos/CriadorQuarto.ts o creator src/quartos/Quarto.ts e src/quartos/QuartosConcretos.ts os quartos Quem usa é o cadastrarQuarto do HotelUnico

Problema o hotel tem quarto simples duplo e luxo Se o HotelUnico escolhesse o tipo com um if toda vez que aparecesse um quarto novo eu ia ter que mexer nele

Por quê o CriadorQuarto é abstrato e tem o método criarQuarto Cada subclasse CriadorQuartoSimples CriadorQuartoDuplo e CriadorQuartoLuxo escolhe qual quarto criar O hotel só conhece o creator abstrato e a interface Quarto então ele não sabe qual quarto vai ser criado Se eu quiser um quarto novo crio o quarto e o creator dele e não mexo no hotel

## Singleton
Onde src/hotel/HotelUnico.ts

Problema o hotel é um só e guarda os quartos e as reservas Se cada parte do código criasse o seu hotel cada um ia ter dados diferentes

Por quê o construtor é privado então ninguém consegue dar new HotelUnico de fora O obterInstancia cria o hotel na primeira vez e depois devolve sempre o mesmo No index.ts eu testei isso com hotel === HotelUnico.obterInstancia e deu true O nome e o endereço só valem na primeira chamada

## Abstract Factory
Onde src/tarifas/FabricaPlano.ts as fábricas e src/tarifas/Politicas.ts as políticas Quem usa é o plano do ReservaBuilder

Problema cada reserva tem um plano com duas coisas que precisam combinar a política de preço e a política de cancelamento Se eu escolhesse cada uma separada dava para juntar o preço da promoção com o cancelamento flexível

Por quê a interface FabricaPlano cria as duas coisas criarPoliticaPreco e criarPoliticaCancelamento A FabricaPlanoFlexivel e a FabricaPlanoPromocional só criam as do próprio plano então nunca mistura A reserva só conhece a interface e se eu criar um plano novo não preciso mexer nela

## Builder
Onde src/reservas/ReservaBuilder.ts que monta a Reserva de src/reservas/Reserva.ts

Problema a reserva tem o que é obrigatório cliente quarto período e plano e o que é opcional café da manhã estacionamento e observações Se fosse tudo no construtor ia ficar uma lista enorme de parâmetros e ninguém ia saber o que é cada um

Por quê cada parte tem o seu método cliente quarto cafeDaManha e todos devolvem this por isso dá para encadear O build confere se o que é obrigatório foi passado e só coloca na reserva o opcional que eu chamei O plano que o builder recebe é a Abstract Factory então os dois padrões trabalham juntos

## Prototype
Onde o método clonar em src/quartos/QuartosConcretos.ts ele está declarado em src/quartos/Quarto.ts Quem usa é o cadastrarCopia do HotelUnico

Problema muitos quartos são iguais a outro que já existe só muda o número Criar do zero e colocar as comodidades de novo toda vez dá trabalho

Por quê o clonar cria um quarto novo copiando a lista de comodidades com [...this.comodidades] Assim a lista da cópia é outra e se eu colocar uma comodidade na cópia o quarto original não muda Sem isso os dois quartos iam usar a mesma lista

## Como os padrões se juntam
O HotelUnico Singleton cria os quartos pelo Factory Method e também copia quartos com o Prototype Na reserva o Builder recebe o plano da Abstract Factory e entrega a reserva pronta para o hotel guardar Os cinco padrões trabalham no mesmo sistema
