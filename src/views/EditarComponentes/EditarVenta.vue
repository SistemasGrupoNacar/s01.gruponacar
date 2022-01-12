<template>
  <div class="container py-3">
    <p class="_bold _text-big my-0">Venta: {{ venta._id }}</p>
    <p class="_text-small my-0 _light" v-if="venta.date">
      Fecha: {{ venta.date.slice(0, 10) }}
    </p>
    <p class="_text-big _bold">
      TOTAL: $ <span class="_light">{{ venta.total || 0 }}</span>
    </p>

    <el-button class="my-2" type="primary" v-on:click="cancelarVenta()"
      >Cancelar Venta
    </el-button>
    <hr />
    <el-main v-loading="cargando" class="w-100">
      <div class="row my-1">
        <div class="col-12 col-lg-4 px-lg-2">
          <p class="_bold">Seleccion de producto</p>
          <span class="text-muted">Producto: </span>
          <el-select
            v-model="productoSeleccionado.product"
            class="m-2 w-100"
            placeholder="Seleccione producto"
            size="large"
          >
            <el-option
              v-for="item in productos"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
          <span class="text-muted">Producci&oacute;n: </span>
          <el-select
            v-model="productoSeleccionado.production"
            class="m-2 w-100"
            placeholder="Seleccione producción"
            size="large"
          >
            <el-option
              v-for="item in producciones"
              :key="item._id"
              :label="item._id"
              :value="item._id"
            >
            </el-option>
          </el-select>
          <span class="text-muted">Cantidad: </span>
          <el-input-number
            v-model="productoSeleccionado.quantity"
            :min="1"
            :step="1"
            class="w-100 my-2"
            @change="calcularTotal()"
          />
          <span class="text-muted">Sub-total: </span>
          <el-input-number
            v-model="productoSeleccionado.sub_total"
            :min="0.01"
            :step="0.01"
            class="w-100 my-2"
            @change="calcularTotal()"
          ></el-input-number>
          <span class="text-muted">Total: </span>
          <el-input-number
            v-model="productoSeleccionado.total"
            class="w-100 my-2"
            disabled
          ></el-input-number>

          <el-button
            class="my-2 w-100"
            type=""
            v-on:click="agregarDetalleVenta(productoSeleccionado)"
            >Agregar Producto
          </el-button>
        </div>
        <div class="col-12 col-lg-8 px-lg-2">
          <p class="_bold">Detalle de Venta</p>
          <el-table :data="detalleVenta" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="180" />
            <el-table-column
              prop="name"
              label="Nombre de Producto"
              width="180"
            />
            <el-table-column prop="quantity" label="Cantidad" width="120" />
            <el-table-column
              prop="sub_total"
              label="Precio Unitario"
              width="120"
            />
            <el-table-column
              prop="total"
              label="Sub-Total"
              width="120"
            /><el-table-column fixed="right" label="Acción" width="120">
              <template #default="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.prevent="eliminarDetalleVenta(scope.row)"
                >
                  Quitar
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {};
</script>
<style lang=""></style>
