<template>
    <form
        class="u-login-form"
        @submit.prevent="login"
    >
        <div class="field">
            <CInput
                v-model="form.email.value"
                class="input"
                name="Email"
                placeholder="Work email"
            />
            <div v-if="!form.email.errors.required">
                <p
                    v-if="form.email.errors.email"
                    class="error"
                >
                    That's not a valid email
                </p>
            </div>
        </div>
        <div class="field">
            <CInput
                v-model="form.password.value"
                class="input"
                name="Password"
                type="password"
                placeholder="Password"
            />
            <div v-if="!form.password.errors.required">
                <p
                    v-if="form.password.errors.minLength"
                    class="error"
                >
                    Password length can't be less then 8. Now it is
                    {{ form.password.value.length }}.
                </p>
            </div>
        </div>
        <CButton
            :is-loading="loading"
            :is-disabled="!form.valid || loading"
            label="Login"
            class="button"
            @click="login"
        />
    </form>
</template>

<script setup lang="ts">
interface ILoginParams {
    email: string;
    password: string;
}

import { computed } from 'vue';

import CInput from '@/components/common/c-input';
import CButton from '@/components/common/c-button';

import { useForm } from '@/use/form';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useValidators } from '@/use/validators';

const {
    email,
    required,
    minLength
} = useValidators();
const router = useRouter();
const authStore = useAuthStore();
const form = useForm({
    email: {
        value: '',
        validators: {
            required,
            email,
        },
    },
    password: {
        value: '',
        validators: {
            required,
            minLength: minLength(8),
        },
    },
});

const loading = computed(() => authStore.loading);

async function login() {
    if (!form.valid) return;

    const params: ILoginParams = {
        email: form.email.value,
        password: form.password.value
    };

    await authStore.login(params);

    if (authStore.isLoggedIn) {
        router.push('main/projects');
    }
}
</script>

<style lang="scss" src="./u-login-form.scss"/>
