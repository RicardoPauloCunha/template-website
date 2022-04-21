export const format = (value: string | number, pattern: string) => {
    let i = 0;
    let v = value.toString();
    return pattern.replace(/#/g, _ => v[i++]);
}

export const formatCep = (value: string) => {
    return format(value, "#####-###");
}

export const formatCnpj = (value: string) => {
    return format(value, "##.###.###/####-##");
}

export const formatCpf = (value: string) => {
    return format(value, "###.###.###-##");
}

export const formatTelephone = (value: string) => {
    return format(value, "(##) ####-####");
}

export const formatCellphone = (value: string) => {
    return format(value, "(##) #####-####");
}

export const normalize = (value?: string) => {
    if (value === undefined)
        return "";
    else
        return value.replace(/[^0-9]/g, '');
}

export const formatQuantity = (value?: number) => {
    if (value === undefined || value === null)
        return "";
    else
        return value.toLocaleString('pt-BR');
}

export const hasValueString = (value?: string | null) => {
    if (value === "" || value === undefined || value === null)
        return false;
    else
        return true;
}

export const hasValueNumber = (value?: any) => {
    if (value === "" || value === undefined || value === null || value === 0)
        return false;
    else
        return true;
}