declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
interface InputProps {
    value: any;
    validate(value: any): void;
    handleChange(event: any): void;
}