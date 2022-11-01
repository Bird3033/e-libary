export enum ValidateMessage {
  MaxLength = '$property ຕ້ອງສັ້ນກວ່າ ຫຼືເທົ່າກັບ $constraint1 ຕົວອັກສອນ',
  MinLength = '$property ຈະຕ້ອງຍາວກວ່າ ຫຼືເທົ່າກັບ $constraint1 ຕົວອັກສອນ',
  IsAlreadyExist = '$property ມີຢູ່ແລ້ວ',
  IsNotEmpty = '$property ບໍ່ຄວນຫວ່າງເປົ່າ',
  Match = '$property ບໍ່ກົງກັນ',
  IsEnum = '$property ຕ້ອງເປັນຄ່າ enum ທີ່ຖືກຕ້ອງ',
  IsArray = '$property ຕ້ອງເປັນ array',
  ArrayUnique = 'ອົງປະກອບ $property ທັງໝົດຕ້ອງເປັນເອກະລັກ',
  IsString = '$property ຕ້ອງເປັນສະຕຣິງ',
  EachStringInArray = 'ແຕ່ລະຄ່າໃນ $property ຕ້ອງເປັນສະຕຣິງ',
  IsInTable = '$property ບໍ່ມີໃນລະບົບ',
  IsInt = '$property ຕ້ອງເປັນຈໍານວນເຕັມ',
}
