<template>
  <div>
    <template>
      <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="analysis($event, false)">分析</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="analysis($event, true)">更新并分析</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="stockList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="60">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120" sortable>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
          </el-table-column>
          <el-table-column prop="age" label="年龄" width="100" sortable>
          </el-table-column>
          <el-table-column prop="birth" label="生日" width="120" sortable>
          </el-table-column>
          <el-table-column prop="addr" label="地址" min-width="180" sortable>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="editForm.sex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="textarea" v-model="editForm.addr"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
          <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="addForm.sex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="textarea" v-model="addForm.addr"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
          </div>
        </el-dialog>
      </section>
</template>

  </div>
</template>


<script>
import sz from '@/assets/data/sz-stock.json'
import sh from '@/assets/data/sh-stock.json'

import service from '@/components/js/common/service'
import ma250 from '@/components/js/analysis/ma250'

import grid from '@/components/widget/grid'

let stock = [];
let data = sz.concat(sh);
for (let i = 0; i < data.length; i++) {
  let e = data[i];
  e.code = e.exchange + e.code;
}

function getData(prefix) {
  stock.length = 0;
  let reg = new RegExp("^" + prefix);
  for (let i = 0; i < data.length; i++) {
    let e = data[i];
    if (e.code.match(reg)) {
      //vuejs数据双向绑定监控不了新增属性和引用的改变
      //data[i].nearly = "";
      //data[i].max = "";
      //data[i].min = "";
      stock.push(e);
    }
  }
  //    stock.length = 1;
}

export default {
  name: 'stockList',
  data() {
    return {
      stock
    }
  },
  created() {
    getData(this.$route.query.prefix);
  },
  methods: {
    analysis: function(event, update) {
      $(event.target).button('loading');
      let count = 0;
      for (let i = 0; i < stock.length; i++) {
        service.getLocalStock(stock[i].code, update).done(function(data) {
          let ar = ma250.execute(data, 250);
          if (ar.length > 0) {
            stock[i].max = ar.slice(-1)[0].maxProfit;
            stock[i].min = ar.slice(-1)[0].maxLosses;
            stock[i].nearly = ar.slice(-1)[0].buy;
          }
          //按最近买点倒序
          count++;
          if (count === stock.length) {
            $(event.target).button('reset');
            //array.sort会引发数据重新绑定
            stock.sort(function(o1, o2) {
              let a = o1.nearly || 0, b = o2.nearly || 0;
              return new Date(b).getTime() - new Date(a).getTime();
            });
          }
        });
      }
    }
  },
  watch: {
    $route(to, from) {
      getData(this.$route.query.prefix)
    }
  },
  components: {
    grid
  }
}

</script>

<style scoped>
#stockList {
  margin-top: 10px;
}

button {
  margin-right: 20px;
}
</style>
