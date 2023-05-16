<template>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column label="Content" prop="content" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" style="width: 500px" size="default" placeholder="Type to search" />
                <el-button size="default" type="primary" @click="dataAdd()">Add</el-button>
                <el-button size="default" type="danger" @click="dataDelete()">Delete</el-button>
            </template>
            <template #default="scope">
                <el-button size="default" type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentChange" />
    <addVue :isShow="isShow" :info="info" @close="close" @save="save"> </addVue>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import addVue from '../components/add.vue'
import Exception from '../class/Exception'
import axios from 'axios'
interface ExceptionData {
    content: string
}
const total = ref(100)
const search = ref('')
const isShow = ref(false)
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.content.toLowerCase().includes(search.value.toLowerCase())
    )
)

const info = ref<Exception>(new Exception())
const handleEdit = (index: number, row: ExceptionData) => {
    console.log(index, row, isShow.value)
    isShow.value = true
    info.value = row
    console.log(info)
}
const handleDelete = (index: number, row: ExceptionData) => {
    console.log(index, row)
}
const dataAdd = () => {
    isShow.value = true
    console.log('add')
}

const dataDelete = () => {
    console.log('delete')
}

const currentChange = (val: number) => {
    console.log(val)
}

const close = () => {
    isShow.value = false
    // info.value = new Exception()
}
const save = () => {
    isShow.value = false
    // info.value = new Exception()
}

const tableData: ExceptionData[] = [
    {
        content: '异常01'
    },
    {
        content: '异常02'
    },
    {
        content: '异常03'
    },
    {
        content: '异常04'
    },
]
</script>

<style></style>