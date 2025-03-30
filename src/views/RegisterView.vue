<template>
    <v-container>
        <h1>Register</h1>
        <v-form ref="form" v-model="valid">
            <v-text-field v-model="login" label="Login" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
            <v-text-field v-model="hero" label="Hero Name" required></v-text-field>
            <vue-recaptcha ref="recaptcha" :sitekey="captchaSiteKey" @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"></vue-recaptcha>
            <v-btn :disabled="!valid || !captchaToken" @click="submit">Register</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { captchaSiteKey } from "@/commons/config";
import { VueRecaptcha } from "vue-recaptcha";
export default {
    name: "RegisterView",
    components: { VueRecaptcha },
    data() {
        return {
            login: "",
            password: "",
            hero: "",
            captchaToken: null,
            valid: false,
            errorMessage: "",
            captchaSiteKey: captchaSiteKey,
        };
    },
    methods: {
        ...mapActions("auth", ["registerUser"]),
        onCaptchaVerified(token) {
            this.captchaToken = token;
        },
        onCaptchaExpired() {
            this.captchaToken = null;
        },
        async submit() {
            const result = await this.registerUser({
                login: this.login,
                password: this.password,
                hero: this.hero,
                captchaToken: this.captchaToken,
            });
            if (result.error === 0) {
                this.$router.push("/login");
            } else {
                console.log(result.data);
            }
        },
    },
};
</script>
