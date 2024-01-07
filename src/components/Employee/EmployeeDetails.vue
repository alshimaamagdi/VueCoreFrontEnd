<!-- EmployeeForm.vue -->

<template>
    <div class="container mt-3 col-xl-7">
        <form enctype="multipart/form-data" @submit.prevent="submitForm" class="border p-4 rounded" id="myForm" @click="touchFields">
            <h3 class="mb-3 text-center bg-light">
                {{ editMode ? 'Update Employee Information' : 'Add New Employee' }}</h3>
            <!-- Input 1: Name -->
            <input name="Id" hidden v-model="this.$route.params.id">
            <div class="mb-3">
                <label for="FullName" class="form-label">Full Name:</label>
                <input type="text" id="Name" name="Name" class="form-control form-control-lg" v-model="formData.Name"
                    @change="v$.formData.Name.$touch()"
                    :class="{ 'is-invalid': v$.formData.Name?.$pending || v$.formData.Name?.$error }" />
                <div v-if="v$.formData.Name?.$error" class="invalid-feedback">
                    {{ v$.formData.Name?.$pending ? 'Validating...'
                        : 'Full Name is required.' }}
                </div>
            </div>

            <!-- Input 2: Email -->
            <div class="mb-3">
                <label class="form-label" for="form3ExampleEmail">Email</label>

                <input v-model="formData.Email" name="Email" id="Email" class="form-control form-control-lg"
                    :class="{ 'is-invalid': v$.formData.Email?.$pending || v$.formData.Email?.$error }" />
                <div v-if="v$.formData.Email?.$pending" class="invalid-feedback">
                    Validating...
                </div>
                <div v-else-if="v$.formData.Email?.$error" class="invalid-feedback">
                    {{ v$.formData.Email?.$pending ? 'Validating...'
                        : 'Email is required and must be valid.' }}
                </div>
            </div>

            <!-- Input 3: phoneNumber -->
            <div class="mb-3">
                <label for="phoneNumber" class="form-label">Phone Number:</label>
                <input type="text" id="phoneNumber" name="phoneNumber"  class="form-control form-control-lg" v-model="formData.phoneNumber"
                    @change="v$.formData.phoneNumber.$touch()"
                    :class="{ 'is-invalid': v$.formData.phoneNumber?.$pending || v$.formData.phoneNumber?.$error }" />
                <div v-if="v$.formData.phoneNumber?.$error" class="invalid-feedback">
                    {{ v$.formData.phoneNumber?.$pending ? 'Validating...'
                        : 'phone Number is required.' }}
                </div>
            </div>

            <!-- Input 4: Date of Birth -->
            <div class="mb-3">
                <label for="AcademicLevel" class="form-label">Select an Academic Level:</label>
                <select class="form-control" name="AcademicLevel" id="AcademicLevel"  v-model="formData.AcademicLevel" @blur="$v.formData.AcademicLevel.$touch()"
                    :class="{ 'is-invalid': v$.formData.AcademicLevel?.$pending || v$.formData.AcademicLevel?.$error }">
                    <option value="" disabled>Select an option</option>
                    <option value="0">Under Graduate</option>
                    <option value="1">Graduated</option>
                </select>
                <div v-if="v$.formData.AcademicLevel?.$error" class="invalid-feedback">
                    {{ v$.formData.AcademicLevel?.$pending ? 'Validating...'
                        : 'Academic Level is required.' }}
                </div>
            </div>
            <!-- Input 5: Upload Photo -->
            <div class="mb-3">
                <label for="photo" class="form-label"></label>
                <img v-if="editMode"  :src="apiUrlImage + formData.ImageFile" alt="User Photo" style="width: 45px; height: 45px"
                                    class="rounded-circle" />
                                    
                <input type="file"  name="ImageFile" class="form-control" id="ImageFile" @change="handleFileUpload" accept="image/*">
            </div>
            <button type="submit" class="btn btn-lg btn-primary mx-auto d-block w-100 mt-2" :disabled="hasErrors">{{
                editMode ? 'Update' : 'Save'
            }}</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';
import config from '@/config';
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const { regex } = helpers;
const headers = {
    'Content-Type': 'multipart/form-data', // You can adjust the content type based on your API requirements
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include any authorization token if needed
    // Add other headers as needed
};
export default {
    setup() {
        return { v$: useVuelidate(), apiUrlImage: config.apiUrlImage, $toast: useToast() }
    },
    data() {
        return {
            employeeId: this.$route.params.id,
            formData: {
                Id: this.$route.params.id,
                Name: '',
                Email: '',
                phoneNumber: '',
                AcademicLevel: '',
                image: null, // Placeholder for the uploaded photo
            },
            editMode: false,
        };
    },
    validations: {
        // Apply validators to form fields
        formData: {
            Name: { required },
            Email: { required, email },
            phoneNumber: {
                required, isPhoneNumber: regex(/^[0]{1}[0-9]{10}$/),
            },
            AcademicLevel: { required }

        },
    },
    //Disable Submit
    computed: {
        hasErrors() {
            return this.v$?.$pending || this.v$?.formData?.$error;
        },
    },
    created() {
        if (parseInt(this.employeeId) > 0) {
            this.editMode = true;
            this.fetchEmployeeData();
        }
    },
    methods: {
        touchFields() {
            // Trigger $touch method on all form fields
            this.v$.$touch();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            formData.image = file;
            // Trigger Vuelidate validation for the file field
            console.log(file, "file")
        },
        async fetchEmployeeData() {
            try {
                const response = await axios.get(`${config.apiUrl}Employee/GetEmployeeById?id=${this.employeeId}`, { headers });
                const responseData = response.data;
                console.log(response.data)
                // Map data from sourceObject to targetObject
                const stringValue = '' + responseData.academicLevelValue;

                this.formData = {
                    Name: responseData.name,
                    Email: responseData.email,
                    phoneNumber: responseData.phoneNumber,
                    AcademicLevel: stringValue,
                    ImageFile: responseData.image, // Placeholder for the uploaded photo
                }
            } catch (error) {
                console.log('Error fetching employee data:', error);
            }
        },
        async submitForm() {
            try {
                // Assuming you have a form element with the ID 'myForm'
                const formElement = document.getElementById('myForm');
                const formData = new FormData(formElement);
                this.formData.image=this.formData.ImageFile;
                const apiUrl = this.editMode ? `${config.apiUrl}Employee/EditEmployee` : `${config.apiUrl}Employee/AddEmployee`;
                const method = this.editMode ? 'put' : 'post';
                this.formData.Id = parseInt(this.$route.params.id)
                const response = await axios[method](apiUrl, formData, { headers });
                this.$toast.success(this.editMode ? 'Updated Employee successfully' : 'Added Employee successfully');
                this.$router.push('/EmployeeList');

                console.log(`Employee ${this.editMode ? 'updated' : 'added'} successfully:`, response.data);

                // Reset form or handle other actions as needed
                this.resetForm();
            } catch (error) {
                if (error.response.status == 403)
                    this.$toast.warning('You dont have permission.');
                else
                    this.$toast.error(`Error ${this.editMode ? 'updating' : 'adding'} employee`);
            }
        },
        resetForm() {
            this.employeeData = {
                Name: '',
                Email: '',
                phoneNumber: '',
                AcademicLevel: '',
                image: null,
            };
        },
    },
};
</script>
  