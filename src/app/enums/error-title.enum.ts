export enum ErrorTitle {
  InvalidFormat = 'Неподдерживаемый формат файла',
  SomethingWentWrong = 'Что-то пошло не так',
  ConnectionTimeout = 'Превышено время ожидания',
  EntityToLarge = 'Размер запроса превышает лимит, объявленный сервером',
  InternalServerError = 'Внутренняя ошибка сервера',
  ServerUnavailable = 'Сервер недоступен'
}
