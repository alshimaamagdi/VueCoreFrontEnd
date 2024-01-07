<template>
    <section class="h-100 bg-dark">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card card-registration my-4">
                        <div class="row g-0">
                            <div class="col-xl-6 d-none d-xl-block">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                    alt="Sample photo" class="img-fluid"
                                    style="border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;" />
                            </div>

                            <div class="col-xl-6">
                                <div class="card-body p-md-5 text-black">
                                    <h3 class="mb-5 text-uppercase">registration form</h3>
                                    <form @submit.prevent="registerUser" @click="touchFields">
                                        <!-- First Name -->
                                        <div class="form-outline mb-4">
                                            <input type="text" id="FirstName" class="form-control form-control-lg"
                                                v-model="formData.FirstName"
                                                :class="{ 'is-invalid': v$.formData.FirstName?.$pending || v$.formData.FirstName?.$error }" />
                                            <label class="form-label" for="FirstName">First Name</label>
                                            <div v-if="v$.formData.FirstName?.$error" class="invalid-feedback">
                                                {{ v$.formData.FirstName?.$pending ? 'Validating...'
                                                    : 'First Name is required.' }}
                                            </div>
                                        </div>

                                        <!-- Last Name -->
                                        <div class="form-outline mb-4">
                                            <input type="text" id="LastName" class="form-control form-control-lg"
                                                v-model="formData.LastName"
                                                :class="{ 'is-invalid': v$.formData.LastName?.$pending || v$.formData.LastName?.$error }" />
                                            <label class="form-label" for="LastName">Last Name</label>
                                            <div v-if="v$.formData.LastName?.$error" class="invalid-feedback">
                                                {{ v$.formData.LastName?.$pending ? 'Validating...'
                                                    : 'Last Name is required.' }}
                                            </div>
                                        </div>
                                        <!-- User Name -->
                                        <div class="form-outline mb-4">
                                            <input type="text" id="Username" class="form-control form-control-lg"
                                                v-model="formData.Username"
                                                :class="{ 'is-invalid': v$.formData.Username?.$pending || v$.formData.Username?.$error }" />
                                            <label class="form-label" for="Username">User Name </label>
                                            <div v-if="v$.formData.Username?.$error" class="invalid-feedback">
                                                {{ v$.formData.Username?.$pending ? 'Validating...'
                                                    : 'User Name isrequired.' }}
                                            </div>
                                        </div>
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


                                        <div class="form-outline mb-4">
                                            <input type="password" id="form3ExampleConfirmPassword"
                                                class="form-control form-control-lg" v-model="formData.ConfirmPassword"
                                                :class="{ 'is-invalid': v$.formData.$pending || v$.formData.ConfirmPassword?.$error }" />
                                            <label class="form-label" for="form3ExampleConfirmPassword">Confirm
                                                Password</label>
                                            <div v-if="v$.formData.ConfirmPassword?.$error" class="invalid-feedback">
                                                {{ v$.formData.ConfirmPassword?.$pending ? 'Validating...'
                                                    : 'Confirm Password must match the Password.' }}
                                            </div>
                                        </div>



                                        <div class="d-flex justify-content-end pt-3">
                                            <button type="submit" class="btn btn-warning btn-lg ms-2"
                                                :disabled="hasErrors">Register</button>
                                        </div>
                                        <p class="text-center text-muted mt-5 mb-0">Have already an account?
                                            <router-link to="/Login">
                                                <u>Login here</u></router-link>
                                        </p>
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


  
<script>
import axios from 'axios';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength, sameAs } from '@vuelidate/validators'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import config from '@/config';

export default {
    setup() {
        return { v$: useVuelidate(), $toast: useToast() }
    },
    name: 'Registration',
    data() {
        return {
            formData: {
                FirstName: '',
                LastName: '',
                Username: '',
                Email: '',
                Password: '',
                ConfirmPassword: '',
            },
            isEmailValid: true,
            emailError: '',
        };
    },
    validations: {
        // Apply validators to form fields
        formData: {
            FirstName: { required },
            LastName: { required },
            Username: { required },
            Email: { required, email },
            Password: { required, minLength: minLength(6), maxLength: maxLength(20) },
            ConfirmPassword: {
                sameAsPassword(value) {
                    return value === this.formData.Password;
                },
            }

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
        'formData.Email': 'validateEmail',
    },

    methods: {
        validateEmail() {
            console.log(this.v$.formData, "this.$vsdd")
            this.isEmailValid = this.v$.formData.Email.$pending !== true && this.v$.formData.Email;
        },
        touchFields() {
            // Trigger $touch method on all form fields
            this.v$.$touch();
        },
        async registerUser() {
            try {

                //this.showToastsuccessed()
                // Proceed with registration
                console.log('Form is valid. Proceeding with registration.');
                // Make an HTTP request to your API for user registration
                const response = await axios({
                    method: 'post',
                    url: `${config.apiUrl}Auth/Register`,
                    data: {
                        // Include your request payload
                        FirstName: this.formData.FirstName,
                        LastName: this.formData.LastName,
                        Username: this.formData.Username,
                        Email: this.formData.Email,
                        Password: this.formData.Password,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        // Add any other headers if needed
                    }
                });

                // // Assuming the server responds with a token upon successful registration
                // const token = response.data.Token;//

                // // Store the token in localStorage
                // localStorage.setItem('token', token);

                // Redirect or perform other actions after successful registration
                if (response.status == 200)
                    this.$toast.success('User registered successfully.');
                // For a real-world scenario, you might want to redirect the user to another page

            } catch (error) {
                if (error.response.status == 400)
                    this.$toast.error(error.response.data);

                else
                    this.$toast.error('Registration failed:');
            }
        },


    },
};
</script>
  

<style scoped>
.card-registration .select-input.form-control[readonly]:not([disabled]) {
    font-size: 1rem;
    line-height: 2.15;
    padding-left: .75em;
    padding-right: .75em;
}

.card-registration .select-arrow {
    top: 13px;
}
</style>

