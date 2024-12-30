import os

def is_env_configured():
    required_keys = ["BOT_TOKEN", "ADMIN_ID", "DATABASE_URL"]
    if not os.path.exists(".env"):
        return False

    with open(".env") as env_file:
        content = env_file.read()

    for key in required_keys:
        if f"{key}=" not in content or content.split(f"{key}=")[1].strip() == "":
            return False
    return True

def create_empty_env():
    if not os.path.exists(".env"):
        with open(".env", "w") as env_file:
            env_file.write("SECRET_KEY=\n")
            env_file.write("BOT_TOKEN=\n")
            env_file.write("ADMIN_ID=\n")
            env_file.write("DATABASE_URL=\n")
        print("Пустой .env файл создан.")
