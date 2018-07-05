export const ValueToFormik = (value: any, name: string):any => {
    const ev = new Event('input');
    return {...ev, target:{value, name }}
}
