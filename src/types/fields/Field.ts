import type { Component } from "vue";

import type { ValidatorError } from "../validators/ValidatorError";

export interface Field {
    key: string;
    value: string;
    isValid: boolean;
    type?: string;
    fieldClass?: string;
    componentClass?: string;
    placeholder?: string;
    component: Component;
    errors: ValidatorError[];
  }