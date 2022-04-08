import { useRef, useState } from "react";
import { Vibration } from "react-native";

enum Operadores {
    sumar, restar, multiplicar, dividir
}
export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const limpiar = () => {
        Vibration.vibrate(10);
        setNumero('0');
        setNumeroAnterior('0');
    }
    const armarNumero = (numeroTexto: string) => {
        Vibration.vibrate(10);
        if (numero.includes('.') && numeroTexto === '.') return;

        if (numero.startsWith('0') || numero.startsWith('-0')) {

            if (numeroTexto === '.') {
                
                setNumero(numero + numeroTexto);

            } else if (numeroTexto === '0' && numero.includes('.')) {
               
                setNumero(numero + numeroTexto);

            } else if (numeroTexto !== '0' && !numero.includes('.')) {
               
                setNumero(numeroTexto);

            } else if (numeroTexto === '0' && !numero.includes('.')) { 
                setNumero(numero);
            } else {
                setNumero(numero + numeroTexto);
            }

        }
        else {
           
            setNumero(numero + numeroTexto);

        }

    }

    const positivoNegativo = () => {
        Vibration.vibrate(10);
        if (numero.includes('-')) {
            setNumero(numero.replace('-', ''));
        }
        else {
            
            setNumero('-' + numero);
        }
    }

    const btnDelete = () => {
        Vibration.vibrate(10);
        let negativo = ''
        let numeroTemp = numero;
        if (numero.includes('-')) {
            negativo = '-';
            numeroTemp = numero.substring(1);
        }
        if (numeroTemp.length > 1) {
            setNumero(negativo + numeroTemp.slice(0, -1));
        }
        else {
            setNumero('0');
        }
    }

    const cambiarNumPorAnterior = () => {
        if (numero.endsWith('.')) {
            setNumeroAnterior(numero.slice(0, -1));
        } else {
            setNumeroAnterior(numero);
        }
        setNumero('0');
    }

    const btnDividir = () => {
        Vibration.vibrate(10);
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }
    const btnSumar = () => {
        Vibration.vibrate(10);
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }
    const btnRestar = () => {
        Vibration.vibrate(10);
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }
    const btnMultiplicar = () => {
        Vibration.vibrate(10);
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }

    const calcular = () => {
        Vibration.vibrate(10);
        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );

        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(String(num1 + num2));
                break;
            case Operadores.restar:
                setNumero(String(num2 - num1));
                break;
            case Operadores.multiplicar:
                
                setNumero(String(num1 * num2));
                break;
            case Operadores.dividir:
                setNumero(String(num2 / num1));
                break;
        }
        setNumeroAnterior('0');
    }

    return {

        numero,
        numeroAnterior,
        limpiar,
        armarNumero,
        positivoNegativo,
        btnDelete,
        btnDividir,
        btnSumar,
        btnRestar,
        btnMultiplicar,
        calcular
    }
}
