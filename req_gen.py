import subprocess

def create_requirements_file(output_file="requirements.txt"):
    try:
        # Получаем список установленных пакетов
        result = subprocess.run(
            ["pip", "freeze"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        # Проверяем на наличие ошибок
        if result.returncode != 0:
            print(f"Ошибка при выполнении pip freeze: {result.stderr}")
            return
        
        # Записываем результат в файл
        with open(output_file, "w") as f:
            f.write(result.stdout)
        
        print(f"Файл {output_file} успешно создан.")
    except Exception as e:
        print(f"Произошла ошибка: {e}")

if __name__ == "__main__":
    create_requirements_file()
