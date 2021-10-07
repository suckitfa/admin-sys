<template>
  <div>
    <el-card class="box-card" title="新增">
      <div slot="header" class="clearfix">
        <span>{{ form.id ? "编辑" : "新建" }}</span>
      </div>
      <!-- model 绑定表单对象 -->
      <el-form :model="form" :rules="formRules" ref="form">
        <el-form-item label="日期" :label-width="formLabelWidth" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" type="tel"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { checkPhoneValidator } from "../../../utils/validator";
import tableData from "./data";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      form: {},
      formRules: {
        date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字", trigger: "blur" },
        ],
        phone: [
          { required: true, validator: checkPhoneValidator, trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    '$route'() {
      this.updateFormItem();
    },
  },
  created() {
    this.updateFormItem();
  },
  methods: {
    // 后去路由信息，填充
    updateFormItem() {
      const id = this.$route.params.id;
      // 从数据源中查找对应的数据
      const formItem = tableData.find((item) => item.id === id);
      if(formItem) {
        this.form = {...formItem}
      } else {
        this.form = {};
      }
    },
    // 新增
    updateTableItem(item={}) {
      if(item.id !== undefined) {
        let itemIndex = tableData.findIndex(x=>x.id === item.id)
        if(itemIndex > -1) {
          tableData.splice(itemIndex,1,{...item})
        }
      } else {
        tableData.push({...item,id:tableData.length+1})
      }
    },
    submitForm() {
      this.$refs['form'].validate((valid)=>{
        if(valid) {
          this.updateTableItem(this.form);
          this.$router.push({name:'ProductList'})
        } else {
          return false;
        }
      })
    }
  },
};
</script>