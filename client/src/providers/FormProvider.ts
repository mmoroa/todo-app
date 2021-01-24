export interface FormError {
    message: string;
    path: any;
}

export interface FormState {
    values?: any;
    setLoading: Function;
    setError: Function;
    setSuccess: Function;
}
