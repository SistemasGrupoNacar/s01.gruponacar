<template>
  <div class="container">
    <p class="_title">Listado de Insumos</p>
    <p class="_subtitle text-muted">
      Listado de insumos para la cosecha en el sistema.
    </p>
    <el-main v-loading="cargando">
      <div class="min-h-50">
        <el-table :data="tableData" style="width: 100%" max-height="400">
          <el-table-column fixed prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="state" label="State" />
          <el-table-column prop="city" label="City" />
          <el-table-column prop="address" label="Address" />
          <el-table-column prop="zip" label="Zip" width="120" />
          <el-table-column fixed="right" label="Operations" width="150">
            <template #default="scope">
              <el-button
                type=""
                v-on:click="eliminarInsumo(scope.row)"
                v-if="scope.row.zip == '10001'"
                ><el-icon><Remove /> </el-icon> </el-button
              ><el-button type="" v-on:click="eliminarInsumo(scope.row)" v-else
                ><el-icon><Check /> </el-icon>
              </el-button>
              <el-button type="primary" v-on:click="eliminarInsumo(scope.row)"
                ><el-icon><Delete /> </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </div>
</template>
<script>
import { Remove, Delete, Check } from "@element-plus/icons-vue";
export default {
  components: {
    Remove,
    Delete,
    Check,
  },
  data() {
    return {
      cargando: false,
      tableData: [
        {
          date: "2016-05-03",
          name: "John Brown",
          state: "New York",
          city: "New York",
          address: "New York No. 1 Lake Park",
          zip: "10001",
        },
        {
          date: "2016-05-02",
          name: "Jim Green",
          state: "London",
          city: "London",
          address: "London No. 1 Lake Park",
          zip: "10002",
        },
        {
          date: "2016-05-04",
          name: "Joe Black",
          state: "Sydney",
          city: "Sydney",
          address: "Sydney No. 1 Lake Park",
          zip: "10004",
        },
        {
          date: "2016-05-01",
          name: "Jon Snow",
          state: "Ottawa",
          city: "Ottawa",
          address: "Ottawa No. 2 Lake Park",
          zip: "10007",
        },
        {
          date: "2016-05-03",
          name: "John Brown",
          state: "New York",
          city: "New York",
          address: "New York No. 1 Lake Park",
          zip: "10001",
        },
        {
          date: "2016-05-02",
          name: "Jim Green",
          state: "London",
          city: "London",
          address: "London No. 1 Lake Park",
          zip: "10002",
        },
        {
          date: "2016-05-04",
          name: "Joe Black",
          state: "Sydney",
          city: "Sydney",
          address: "Sydney No. 1 Lake Park",
          zip: "10004",
        },
        {
          date: "2016-05-01",
          name: "Jon Snow",
          state: "Ottawa",
          city: "Ottawa",
          address: "Ottawa No. 2 Lake Park",
          zip: "10007",
        },
      ],
    };
  },
  methods: {
    eliminarInsumo(data) {
      this.tableData.splice(data.$index, 1);
      console.log(data.address);
    },
  },
};
</script>
<style lang=""></style>
