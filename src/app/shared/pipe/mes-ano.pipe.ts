import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mesAno'
})
export class MesAnoPipe implements PipeTransform {

  transform(value: any, tipo: String = 'sigla', apenasMes: boolean = false, textConcat?: '', explodir: boolean = false): any {
    if (value === null || value.length < 6) {
      return null;
    }
    let mes: string;
    let ano: string;
    if (explodir) {
      const periodo = value.split('/');
      mes = periodo[0];
      ano = periodo[1];
    } else {
      mes = String(value).substr(4, 6);
      ano = String(value).substr(0, 4);
    }
    let retorno = null;
    if (tipo === 'sigla') {
      retorno = this.getSiglaMes(mes);
    } else {
      retorno = this.getNomeMes(mes);
    }
    if (apenasMes) {
      return retorno;
    }
    if (typeof textConcat !== 'undefined') {
      return retorno + `${textConcat}` + ano;
    }
    return retorno + ' ' + ano;
  }

  private getSiglaMes(mes) {
    let sigla = '';
    switch (mes) {
      case '02':
        sigla = 'Fev';
        break;
      case '03':
        sigla = 'Mar';
        break;
      case '04':
        sigla = 'Abr';
        break;
      case '05':
        sigla = 'Mai';
        break;
      case '06':
        sigla = 'Jun';
        break;
      case '07':
        sigla = 'Jul';
        break;
      case '08':
        sigla = 'Ago';
        break;
      case '09':
        sigla = 'Set';
        break;
      case '10':
        sigla = 'Out';
        break;
      case '11':
        sigla = 'Nov';
        break;
      case '12':
        sigla = 'Dez';
        break;
      default:
        sigla = 'Jan';
    }
    return sigla;
  }

  private getNomeMes(mes) {
    let nome = '';
    switch (mes) {
      case '02':
        nome = 'Fevereiro';
        break;
      case '03':
        nome = 'Março';
        break;
      case '04':
        nome = 'Abril';
        break;
      case '05':
        nome = 'Maio';
        break;
      case '06':
        nome = 'Junho';
        break;
      case '07':
        nome = 'Julho';
        break;
      case '08':
        nome = 'Agosto';
        break;
      case '09':
        nome = 'Setembro';
        break;
      case '10':
        nome = 'Outubro';
        break;
      case '11':
        nome = 'Novembro';
        break;
      case '12':
        nome = 'Dezembro';
        break;
      default:
        nome = 'Janeiro';
    }
    return nome;
  }

}
