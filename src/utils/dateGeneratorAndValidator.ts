export interface FormatDate {
  Date: Date;
  Time: Date;
}

export class GeneratorFormatDate {
  private formatDate: FormatDate = {
    Date: new Date(),
    Time: new Date(),
  };
  constructor(newDate: Date, Time: Date) {
    this.formatDate.Date = newDate;
    this.formatDate.Time = Time;
  }

  execute() {
    console.log(this.formatDate);
    const formatDate = this.formatDate.Date.toISOString().split('T')[0];
    const formatTime = this.formatDate.Time.toISOString().split('T')[1];
    const DateTime = new Date(`${formatDate} ${formatTime}`);
    return DateTime;
  }
}

export function validateDate(initDate: Date, finishDate: Date) {
  if (
    initDate.getTime() == finishDate.getTime() ||
    initDate.getTime() >= finishDate.getTime()
  ) {
    alert('Data de fim deve ser maior ou diferente do que a de início ');
    return false;
  }

  return true;
}
