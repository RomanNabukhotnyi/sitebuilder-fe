import type { Component } from "vue";

import type { ValidatorError } from "../validators/ValidatorError";

export interface PreparedField {
    key: string;
    value: string;
    valid: boolean;
    type?: string;
    fieldClass?: string;
    componentClass?: string;
    placeholder?: string;
    component: Component;
    errors: ValidatorError[];
  }