<template>
<div class="container">
    <h2 class="text-center">My To Do List</h2>
    <div class="d-flex">
        <input v-model="task" type="text" placeholder="Enter Task" class="form-control">
        <button @click="submitTask" class="btn btn-warning rounded-0">Submit</button>
    </div>

    <table class="table table-bordered mt-5">
        <thead class="thead-light">
            <tr>
                <th scope="col">Task</th>
                <th scope="col">Status</th>
                <th scope="col">#</th>
                <th scope="col">#</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task,id) in tasks" :key="id">
                <th scope="row">{{task.name}}</th>
                <td style="width=120px;"><span @click="changeStatus(task.id)" class="pointer">{{task.status}}</span></td>
                <td>
                    <div @click="editTask(task.id)"><span class="fa fa-pen text-center"></span></div>
                </td>
                <td>
                    <div @click="deleteTask(task.id)"><span class="fa fa-trash text-center"></span></div>
                </td>
            </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import {
    db
} from '../firebase/firebaseInit'
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            task: '',
            taskEdit: null,
            availableStatuses: ['to-do', 'in-progress', 'completed'],

            tasks: []
        }
    },
    methods: {
        async submitTask() {
            console.log(this.tasks);
            if (this.task === '') return;

            if (this.taskEdit === null) {
                await db.collection('tasks').add({
                    name: this.task,
                    status: this.availableStatuses[0]
                });
            } else {
                db.collection('tasks').doc(this.taskEdit).update({
                    name: this.task
                })
            }
            this.task = '';
            this.taskEdit = null;
        },
        deleteTask(index) {
            console.log(index);
            db.collection('tasks').doc(index).delete();
        },
        editTask(index) {
            console.log(this.tasks.find(food => food.id === index));
            this.task = this.tasks.find(food => food.id === index).name;
            this.taskEdit = index;

        },
        changeStatus(index) {
            let newIndex = this.availableStatuses.indexOf(this.tasks.find(food => food.id === index).status);
            if (++newIndex > 2) {
                newIndex = 0;
            }
            this.tasks.find(food => food.id === index).status = this.availableStatuses[newIndex];
            db.collection('tasks').doc(index).update({
                status: this.availableStatuses[newIndex]
            });
        }
    },
    firestore: {
        tasks: db.collection('tasks')
    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
}
</style>
