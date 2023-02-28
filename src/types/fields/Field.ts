import type { Component, Ref } from "vue";

import type { ValidatorError } from "../validators/ValidatorError";

export interface Field {
    key: string;
    value: Ref<string>;
    valid: Ref<boolean>;
    type?: string;
    fieldClass?: string;
    componentClass?: string;
    placeholder?: string;
    component: Component;
    errors: Ref<ValidatorError[]>;
  }
