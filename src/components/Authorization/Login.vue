

<template>
    <section class="h-100 bg-dark">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card card-Login my-4">
                        <div class="row g-0">
                            <div class="col-xl-7 d-none d-xl-block">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                    alt="Sample photo" class="img-fluid"
                                    style="border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;" />

                            </div>

                            <div class="col-xl-5">
                                <div class="card-body p-md-5 text-black">
                                    <h3 class="mb-5 text-uppercase">Login form</h3>

                                    <form @submit.prevent="LoginUser" @click="touchFields">

                                        <!-- Email -->

                                        <div class="form-outline mb-4">
                                            <input v-model="formData.Email" id="form3ExampleEmail"
                                                class="form-control form-control-lg"
                                                :class="{ 'is-invalid': v$.formData.Email?.$pending || v$.formData.Email?.$error }" />
                                            <label class="form-label" for="form3ExampleEmail">Email</label>
                                            <div v-if="v$.formData.Email?.$pending" class="invalid-feedback">
                                                Validating...
                                            </div>
                                            <div v-else-if="v$.formData.Email?.$error" class="invalid-feedback">
                                                {{ v$.formData.Email?.$pending ? 'Validating...'
                                                    : 'Email is required and must be valid.' }}
                                            </div>
                                        </div>

                                        <!-- Password -->
                                        <div class="form-outline mb-4">
                                            <input type="password" id="form3ExamplePassword"
                                                class="form-control form-control-lg" v-model="formData.Password"
                                                :class="{ 'is-invalid': v$.formData.Password?.$pending || v$.formData.Password?.$error }" />
                                            <label class="form-label" for="form3ExamplePassword">Password</label>
                                            <div v-if="v$.formData.Password?.$pending" class="invalid-feedback">
                                                Validating...
                                            </div>
                                            <div v-else-if="v$.formData.Password?.$error" class="invalid-feedback">
                                                Password is required and must have at least 6 characters.
                                            </div>
                                        </div>


                                        <div class="d-flex justify-content-end pt-3">
                                            <button type="submit" class="btn btn-warning btn-lg ms-2"
                                                :disabled="hasErrors">Login</button>
                                        </div>
                                        <p class="text-center text-muted mt-5 mb-0">Don't Have an account? <router-link
                                                to="/">
                                                <u>Register here</u></router-link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style scoped>
.card-Login .select-input.form-control[readonly]:not([disabled]) {
    font-size: 1rem;
    line-height: 2.15;
    padding-left: .75em;
    padding-right: .75em;
}

.card-Login .select-arrow {
    top: 13px;
}
</style>
<script>
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import config from '@/config';
export default {
    name: 'Login',
    setup() {
        return { v$: useVuelidate(), $toast: useToast() }
    },
    data() {
        return {
            formData: {
                Email: '',
                Password: '',
            },

        };
    },
    validations: {
        // Apply validators to form fields
        formData: {
            Email: { required, email },
            Password: { required },

        },
    },
    //Disable Submit
    computed: {
        hasErrors() {
            console.log(this.$v, "this.$v")
            return this.v$?.$pending || this.v$?.formData?.$error;
        },
    },
    watch: {
        'formData.Username': 'Username',
    },

    methods: {

        touchFields() {
            // Trigger $touch method on all form fields
            this.v$.$touch();
        },
        async LoginUser() {
            try {

                // Make an HTTP request to your API for user Login
                const response = await axios({
                    method: 'post',
                    url: `${config.apiUrl}Auth/Login`,
                    data: {
                        // Include your request payload
                        Email: this.formData.Email,
                        Password: this.formData.Password,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        // Add any other headers if needed
                    }
                });

                // // Assuming the server responds with a token upon successful Login
                const token = response.data.token;//

                // // Store the token in localStorage
                localStorage.setItem('token', token);

                // Redirect or perform other actions after successful Login
                if (response.status == 200) {
                    this.$toast.success('User Login successfully.');
                    if (response.data.isAuthenticated)
                        this.$router.push('/EmployeeList')
                }

            } catch (error) {
                if (error.response.status == 400)
                    this.$toast.error(error.response.data);

                else
                    this.$toast.error('Login failed:');
            }
        },


    },
};
</script>
