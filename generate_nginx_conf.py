from backend.config import port, APP_PROFILE, DOMAIN_NAME
import pathlib
import sys

root = pathlib.Path(__file__).parent.resolve()

if len(sys.argv) > 1:
    mode = sys.argv[1]
else:
    mode = APP_PROFILE

with open(f"{mode}.template.conf", "r", encoding='utf-8') as f:
    template = f.read()

with open(f"{DOMAIN_NAME}.conf", "w", encoding='utf-8') as f:
    f.write(template
            .replace("{api_port}", str(port))
            .replace("{domain_name}", DOMAIN_NAME)
            .replace("{hub_port}", str(8000))
            .replace("{root_dir}", str(root))
            )

print("Success!")
