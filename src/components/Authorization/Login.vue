

<template>
    <section class="h-100 bg-dark">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card card-registration my-4">
                        <div class="row g-0">
                            <div class="col-xl-7 d-none d-xl-block">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                    alt="Sample photo" class="img-fluid"
                                    style="border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;" />

                            </div>

                            <div class="col-xl-5">
                                <div class="card-body p-md-5 text-black">
                                    <h3 class="mb-5 text-uppercase">Login form</h3>



                                    <div class="form-outline mb-4">
                                        <input type="text" id="form3Example9" class="form-control form-control-lg" />
                                        <label class="form-label" for="form3Example9">Email | UserName</label>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <input type="text" id="form3Example90" class="form-control form-control-lg" />
                                        <label class="form-label" for="form3Example90">Password</label>
                                    </div>

                                    <div class="d-flex justify-content-end pt-3">
                                        <button type="button" class="btn btn-warning btn-lg ms-2">Login</button>
                                    </div>
                                    <p class="text-center text-muted mt-5 mb-0">Don't Have an account? <router-link
                                            to="/Registiration">
                                            <u>Register here</u></router-link></p>
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
<script>

export default {
  name: 'Login',
  // Other component options...
};
</script>
