import requests

WAZUH_API = "https://localhost:55000"
WAZUH_USER = "wazuh"
WAZUH_PASS = "wazuh"

def push_to_wazuh(alert: dict):
    """
    Simulated Wazuh event push
    """
    print("[WAZUH] Alert sent:")
    print(alert)
