import subprocess
import platform
import sys

def create_requirements_file(output_file="requirements.txt"):
    try:
        # Определяем команду для pip в зависимости от ОС
        pip_command = "pip" if platform.system() != "Windows" else "pip3"

        # Получаем список установленных пакетов
        result = subprocess.run(
            [pip_command, "freeze"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Проверяем на наличие ошибок
        if result.returncode != 0:
            print(f"Ошибка при выполнении {pip_command} freeze: {result.stderr}")
            return
        
        # Записываем результат в файл
        with open(output_file, "w") as f:
            f.write(result.stdout)
        
        print(f"Файл {output_file} успешно создан.")
    except Exception as e:
        print(f"Произошла ошибка: {e}")

if __name__ == "__main__":
    create_requirements_file()
