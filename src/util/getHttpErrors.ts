import { AxiosError } from "axios";

export type WarningTuple = ["" | "danger" | "success" | "warning", string];

const getHttpErrors = (error: any, messageDefault: string): WarningTuple => {
    let warning: WarningTuple = ["danger", messageDefault];

    if (error?.name !== "Error")
        return warning;

    let axiosError: AxiosError = error;

    if (axiosError.response?.status === 401) {
        warning[0] = "danger";
        warning[1] = "You are not authorized to make this request.";
    }
    else if (axiosError.response !== undefined && axiosError.response.status !== 500) {
        warning[1] = axiosError.response.data.message;
    }

    return warning;
}

export default getHttpErrors;