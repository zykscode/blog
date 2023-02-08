const esca = {
  '&': '&',
  '<': '<',
  '>': '>',
  "'": ''',
  '"': '"',
  };
  const pe = (m: string) => esca[m];
  
  export const escape = (es: string): string => es.replace(/[&<>'"]/g, pe);