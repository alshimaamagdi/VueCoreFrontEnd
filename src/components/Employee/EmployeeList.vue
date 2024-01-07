<!-- ApiTable.vue -->

<template>
    <div class="AppBig">
        <div class="d-flex justify-content-between mb-3">
            <router-link :to="{ name: 'EmployeeDetails', params: { id: 0 } }">
                <button class="btn btn-outline-dark">Add New Employee</button>
            </router-link>
            <nav aria-label="Page navigation">

            </nav>
        </div>

        <table class="table align-middle mb-0 bg-white">
            <table class="table align-middle mb-0 bg-white">
                <thead class="bg-light">
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Academic Level</th>
                        <th>createdBy</th>
                        <th>modifiedBy</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    <tr v-for="(employee, index) in employees" :key="index">
                        <td>
                            <div class="d-flex align-items-center">
                                <img :src="apiUrlImage + employee.image" alt="User Photo" style="width: 45px; height: 45px"
                                    class="rounded-circle" />
                                <div class="ms-3">
                                    <p class="fw-bold mb-1">{{ employee.name }}</p>
                                </div>
                            </div>
                        </td>
                        <td>{{ employee.phoneNumber }}</td>
                        <td>{{ employee.email }}</td>
                        <td>{{ employee.academicLevel }}</td>
                        <td>{{ employee.createdBy }}</td>
                        <td>{{ employee.modifiedBy }}</td>
                        <td>
                            <router-link :to="{ name: 'EmployeeDetails', params: { id: employee.id } }">
                                <button type="button" class="btn btn-warning m-1 btn-rounded btn-sm fw-bold"
                                    data-mdb-ripple-color="dark">
                                    Edit
                                </button>
                            </router-link>
                            <button type="button" class="btn btn-danger btn-rounded btn-sm fw-bold"
                                @click="deleteUser(employee.id, index)">Delete
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                    <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Previous</button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
                    <button class="page-link" @click="changePage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
                    <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                </li>
            </ul>
        </table>
    </div>
</template>
  
<script>
import axios from 'axios';
import config from '@/config';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
export default {
    setup() {
        return {
            $toast: useToast(), apiUrlImage: config.apiUrlImage, token: localStorage.getItem('token')
        };
    },
    data() {
        return {
            employees: [],
            itemsPerPage: 20, // Adjust as needed
            currentPage: 0,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.employees.length / this.itemsPerPage);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.employees.slice(startIndex, endIndex);
        },
    },
    created() {

        // Check if the token is not present
        if (!this.token) {
            this.$toast.warning('You dont have permission. Please log in.');
            this.$router.push('/Login');
        } else {
            this.fetchData();
        }
    },
    methods: {
        async fetchData() {
            try {

                // Use the API to fetch data with page and size parameters
                const response = await axios.get(`${config.apiUrl}Employee/LoadAllEmployees`, {
                    headers: {
                        Authorization: `Bearer ${this.token}`, // Add the token to the Authorization header
                    },
                    params: {
                        pageNumber: this.currentPage,
                        pageSize: this.itemsPerPage,
                    },
                });

                // Handle the API response
                this.employees = response.data;
                console.log('API response:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        changePage(page) {
            this.currentPage = page;
            this.fetchData(); // Fetch data for the new page
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchData(); // Fetch data for the new page
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.fetchData(); // Fetch data for the new page
            }
        },
        async deleteUser(userId, index) {
            try {

                // Use the API to delete the user
                const response = await axios({
                    method: 'delete',
                    url: `${config.apiUrl}Employee/DeleteEmployee`,
                    headers: {
                        Authorization: `Bearer ${this.token}`, // Add the token to the Authorization header
                    },
                    data: [userId] // Send the user ID in the request body as a list

                })

                // Remove the deleted user from the items array
                this.employees.splice(index, 1);
                this.$toast.success('User deleted successfully.');

            } catch (error) {
                if (error.response.status == 403)
                    this.$toast.warning('You dont have permission.');
                else
                    this.$toast.error('Error deleting user.');
            }
        },
    },


};
</script>
  
<style scoped>
/* Add some styling for your table if needed */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px auto;
}

.AppBig {
    width: 90%;
    border-collapse: collapse;
    margin: 20px auto;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.pagination {
    float: right;

}
</style>
  