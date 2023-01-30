const express = require("express");
const crypto = require("node:crypto");

const app = express();

app.use(express.json());

const customers = [];

// Criação de um cliente

app.post("/accounts", (req, res) => {
  const { name, cpf } = req.body;

  const existentCustomer = customers.some((customer) => customer.cpf === cpf);

  if (existentCustomer) {
    return res.status(400).json({ ERRO: "Usuário já existente" });
  }

  const id = crypto.randomUUID();

  customers.push({
    name,
    cpf,
    id,
    statement: [],
  });

  return res.status(201).send();
});

app.get("/accounts", (req, res) => {
  res.status(200).send(customers);
});

// listar um extrato de um cliente

app.get("/statement/:cpf", (req, res) => {
  const { cpf } = req.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res
      .status(400)
      .json({ ERRO: "O cliente informado não possui uma conta" });
  }
  return res.json(customer.statement);
});

app.listen(3333);
