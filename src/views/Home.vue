<template>
    <el-button size="large" type="primary" style="float: left" @click="dataAdd()">Add</el-button>
    <el-table v-if="dialogVisible" :data="filterTableData" style="width: 100%">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column label="Content" prop="content" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="default" placeholder="Type to search" ></el-input>
            </template>
            <template #default="scope">
                <el-button size="default" type="primary" :plain="true" @click="handleEdit(scope.row)">Edit</el-button>
                <el-button size="default" type="danger" :plain="true" @click="handleDelete(scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" v-model:current-page="currentPage"  @current-change="currentChange" />
    <addVue :isShow="isShow" :info="info" @close="close" @save="save"> </addVue>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
import addVue from '../components/add.vue'
import Exception from '../class/Exception'
import { getexception, updateexception, delexception } from '../utils/request'
import { ElMessage ,ElMessageBox} from 'element-plus'

interface ExceptionData {
    content: string
}
const currentPage = ref(1)
const pageSize = ref(10)
const tableData = ref([])
const total = ref(0)
const loaddata = () => {
    const data = {
        page: currentPage.value,
        size: pageSize.value
    }
    getexception(data).then((res) => {
        console.log(res.data.message)
        tableData.value = res.data.message.data
        total.value = res.data.message.total
    })
}

onMounted(() => {
    loaddata()
})


const currentChange = (val: number) => {
    currentPage.value = val
    loaddata()
}
const dialogVisible = ref(true)
const search = ref('')
const isShow = ref(false)
const filterTableData = computed(() =>
    tableData.value.filter(
        (data:any) =>
            !search.value ||
            data.content.toLowerCase().includes(search.value.toLowerCase())
    )
)

// const info = ref<Exception>(new Exception())
const info = ref()

const handleEdit = (row: ExceptionData) => {
    isShow.value = true
    info.value = row                                                                            
}

const handleDelete = (row: ExceptionData) => {
    ElMessageBox.confirm(
    '确认是否删除?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
        delexception(row).then((res) => {
            if (res.status === 200) {
                ElMessage({
                message: '删除成功',
                type: 'success',
                })
            } else {
                ElMessage({
                message: '删除失败',
                type: 'error',
                })
            }
        })
        location.reload()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const dataAdd = () => {
    isShow.value = true
}

const close = () => {
    isShow.value = false
    // info.value = new Exception()
}
const save = (data: any) => {
    isShow.value = false
    console.log(data)
    info.value = new Exception()
    info.value = data
    updateexception(data).then((res) => {
        if (res.status === 200) {
            ElMessage({
            message: '保存成功',
            type: 'success',
            })
        } else {
            ElMessage({
            message: '保存失败',
            type: 'error',
            })
        }
    })
    location.reload()
}
</script>

<style>
</style>