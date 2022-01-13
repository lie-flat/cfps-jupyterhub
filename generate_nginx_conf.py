from backend.config import port

DOMAIN_NAME = "hub.kxxt.tech"

with open("site.template.conf", "r", encoding='utf-8') as f:
    template = f.read()

with open(f"{DOMAIN_NAME}.conf", "w", encoding='utf-8') as f:
    f.write(template
            .replace("{api_port}", str(port))
            .replace("{domain_name}", DOMAIN_NAME)
            .replace("{hub_port}", str(8000)))

print("Success!")
