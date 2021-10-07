<template>
<el-row
:gutter="20"
style="margin-top:200px;"
>
<el-col
    :span="12"
    :offset="6"
>
    <div class="grid-content bg-purple">
        <el-card class="box-card">
            <!-- model绑定表单对象，rules绑定表单规则，ref用来校验规则 -->
            <el-form
                :model="form"
                :rules="formRules"
                ref="form"
            >
                <el-form-item
                    label="用户名"
                    prop="username"
                >
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item 
                    label="密码"
                    prop="password"
                >
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登入</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</el-col>
</el-row>
</template>
<script>
import {setGlobalData} from '../utils/globalData'
export default {
    data() {
        return {
            form:{}, // 用于表单绑定内容
            formRules:{
                username:[
                    {required:true,message:"请输入用户名",triger:'change'},
                    {min:2,max:10,message:"长度在2-10",trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'change'}
                ]
            }
        }
    },
    methods:{
        onSubmit(){
            // 校验表单
            this.$refs['form'].validate(valid=>{
                // 校验通过
                if(valid){
                    this.$message({
                        message:"登入成功!",
                        type:'success'
                    })
                    // 设置登入状态
                    setGlobalData('username',this.form.username)
                    // 跳转
                    this.$router.push({name:"Home"})
                } else {
                    this.$message({
                        message:"用户名或密码错误!",
                        type:'error'
                    })
                    // 校验失败
                    return false
                }
            })
        }
    }
}
</script>