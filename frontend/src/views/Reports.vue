<template>
  <div class="container">
    <h1 class="title">REPORTERIA</h1>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>DESCRIPCION</th>
          <th>MONTO ($)</th>
          <th>FECHA</th>
          <th>CLIENTE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in contracts" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.mount }}</td>
          <td>{{ item.date }}</td>

          <td>
            <div v-for="(i, index) in clients" :key="index">
              <span v-if="i._id === item.client">{{ i.name }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h1 class="title">Montos Filtrados</h1>
    <form @submit.prevent="listFechas()">
      <div class="mt-5 columns">
        <div class="column is-half">
          <label for="fechaInicial" class="label">Fecha Inicial</label>
          <input
            class="input"
            type="input"
            name="fechaInicial"
            id="fechaInicial"
            placeholder="2021-01-01"
            v-model="fecha.fechaInicial"
          />
        </div>
        <div class="column is-half">
          <label for="fechaFinal" class="label">Fecha Final</label>
          <input
            class="input"
            type="input"
            name="fechaFinal"
            id="fechaFinal"
            placeholder="2021-01-01"
            v-model="fecha.fechaFinal"
          />
        </div>
      </div>
      <button class="button" type="submit">Send</button>
    </form>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>CLIENTE</th>
          <th>MONTO ($)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in contracts" :key="index">
          <td>
            <div v-for="(i, index) in clients" :key="index">
              <span v-if="i._id === item.client">{{ i.name }}</span>
            </div>
          </td>

          <td>{{ item.mount }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      clients: [],
      client: {
        name: "",
      },
      contracts: [],
      contract: {
        description: "",
        mount: 0,
        date: "",
        client: "",
      },

      fechas: [],
      fecha: {
        fechaInicial: "",
        fechaFinal: "",
      },
    };
  },
  
  created() {
    this.listContracts();
    this.listClients();
    //this.listFechas();
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    listContracts() {
      this.axios
        .get("/contract")
        .then((res) => {
          this.contracts = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    listClients() {
      this.axios
        .get("/client")
        .then((res) => {
          this.clients = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    listFechas() {
      this.axios
        .get("/dcontract", this.fecha)
        .then((res) => {
          this.fechas.push(res.data);
          console.log(res.data);
          this.fechas = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>

<style>
</style>