<template>
    <el-dialog v-model="dialogVisible" :title="info?.content ? '修改忽略的异常' : '新增忽略的异常'" @close="$emit('close')" draggable>
        <el-form>
            <el-form-item label="异常内容">
                <el-input v-model="form.content" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save()">提交</el-button>
                <el-button @click="close()">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import Exception from '../class/Exception'

const props = defineProps({
    isShow: Boolean,
    info: Exception
})
console.log(props.info)
const dialogVisible = computed(() => props.isShow)
// const form: Ref<Exception> = ref<Exception>({
//     content: ''
// })
const form = ref({
    content: ''
})

const emits = defineEmits(['close', 'save'])
const close = () => {
    emits("close")
}

const save = () => {
    emits("save")
}
watch(() => props.info, (newInfo) => {
    if (newInfo) {
        form.value = {
            content: newInfo.content
        }
    }
})
</script>