// criando uma tipagem para poder utilizar o props(só para typescript)
// type ButtonProps = {
//   children?: string;
// }
// importando o button html atibutes do react para utilizar as funcionalidades de botôes no componente
import { ButtonHTMLAttributes } from "react";
// importando o estilo do button
import "../styles/button.scss";
// definindo o tipo de button props para utilizá-lo como parâmetro no componente
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

// criando e exportando o componente button
export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button 
    className={`button ${isOutlined ? "outlined" : ""}`} 
    {...props} 
    />
  );
}

//https://youtu.be/xl1cZUI1HrU?t=613