# File Manager


## Важно:
  - Пути:
    - если в пути у вас папка или файл содержит пробел, оборачивайте путь в кавычки.
    - для текущей директории ./
    - если вы пишете /путь/путь будет работать абсолютный путь и он будет браться от корневой директории.
  - Для архивирования используйте **compress (a) (b)**
   - **a** - путь до файла для сжатия. Например: README.md
   - **b** - путь каталога, в который поместится файл(сжатый). По умолчанию заархивирует в текущую директорию, в которой вы находитесь. Например: ./
  - Для разархивирования используйте **decompress (a) (b)**
   - **a** - путь до архивного файла(только с расширением .br). Например: README.md.br
   - **b** - путь каталога, в который поместится файл(разархивированный). По умолчанию разархивирует в текущую директорию, в которой вы находитесь. Например: ./