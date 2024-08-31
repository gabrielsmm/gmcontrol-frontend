import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly ISO_DELIMITER = '-';
  readonly BR_DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = [];
      if (value.includes('-')) {
        date = value.split(this.ISO_DELIMITER);
      } else {
        date = value.split(this.BR_DELIMITER);
        date.reverse();
      }
      return {
        year: parseInt(date[0], 10),  // Ano vem primeiro
        month: parseInt(date[1], 10), // Mês vem em segundo
        day: parseInt(date[2], 10)    // Dia vem em terceiro
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ?
      `${date.day.toString().padStart(2, '0')}${this.BR_DELIMITER}${date.month.toString().padStart(2, '0')}${this.BR_DELIMITER}${date.year}`
      : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly BR_DELIMITER = '/';
  readonly ISO_DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = [];
      if (value.includes('-')) {
        date = value.split(this.ISO_DELIMITER);
      } else {
        date = value.split(this.BR_DELIMITER);
        date.reverse();
      }
      return {
        year: parseInt(date[0], 10),  // Ano vem primeiro
        month: parseInt(date[1], 10), // Mês vem em segundo
        day: parseInt(date[2], 10)    // Dia vem em terceiro
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ?
      `${date.day.toString().padStart(2, '0')}${this.BR_DELIMITER}${date.month.toString().padStart(2, '0')}${this.BR_DELIMITER}${date.year}`
      : null;
  }
}

/**
 * Converte uma string de data no formato dd/MM/yyyy [HH:mm:ss] ou no formato ISO yyyy-MM-ddTHH:mm:ss ou yyyy-MM-dd para um objeto Date
 * @param dateString A string de data no formato dd/MM/yyyy [HH:mm:ss], ISO yyyy-MM-ddTHH:mm:ss ou yyyy-MM-dd
 * @returns Um objeto Date
 */
export function parseToDate(dateString: string): Date {
  // Verifica se o formato é ISO (yyyy-MM-ddTHH:mm:ss ou yyyy-MM-dd)
  const isoRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/;

  if (isoRegex.test(dateString)) {
    return new Date(dateString);
  }

  // Se o formato não for ISO, assume-se que é no formato brasileiro (dd/MM/yyyy [HH:mm:ss])
  // Separar data e hora (se houver)
  const [datePart, timePart] = dateString.split(' ');

  // Separar componentes de data
  const [day, month, year] = datePart.split('/').map(Number);

  // Formatar data para o formato yyyy-MM-dd
  const isoDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  // Se houver parte de tempo, formatar para HH:mm:ss; caso contrário, assumir meia-noite
  const time = timePart ? timePart : '00:00:00';
  const [hours, minutes, seconds] = time.split(':').map(Number);

  return new Date(`${isoDate}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
}
