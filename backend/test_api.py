"""
Simple test script to verify API endpoints are working.
Run this after starting the server to test basic functionality.
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test health check endpoint"""
    print("Testing health check...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_search_knowledge():
    """Test knowledge base search"""
    print("Testing knowledge base search...")
    response = requests.get(f"{BASE_URL}/api/knowledge/search?q=vpn")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Found {data['total']} articles")
    if data['results']:
        print(f"First result: {data['results'][0]['title']}")
    print()

def test_create_ticket():
    """Test ticket creation"""
    print("Testing ticket creation...")
    ticket_data = {
        "user_name": "Test User",
        "email": "test@example.com",
        "category": "network",
        "problem": "Cannot connect to VPN"
    }
    response = requests.post(f"{BASE_URL}/api/tickets", json=ticket_data)
    print(f"Status: {response.status_code}")
    if response.status_code == 201:
        ticket = response.json()
        print(f"Created ticket #{ticket['id']}")
        return ticket['id']
    print()
    return None

def test_get_ticket(ticket_id):
    """Test getting ticket by ID"""
    print(f"Testing get ticket #{ticket_id}...")
    response = requests.get(f"{BASE_URL}/api/tickets/{ticket_id}")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        ticket = response.json()
        print(f"Ticket: {ticket['user_name']} - {ticket['problem']}")
    print()

def test_admin_stats():
    """Test admin statistics"""
    print("Testing admin stats...")
    response = requests.get(
        f"{BASE_URL}/api/admin/stats",
        params={"username": "admin", "password": "hackathon2024"}
    )
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        print(f"Stats: {response.json()}")
    print()

if __name__ == "__main__":
    print("=" * 50)
    print("Testing Lumora AI API")
    print("=" * 50)
    print()

    try:
        test_health_check()
        test_search_knowledge()
        ticket_id = test_create_ticket()
        if ticket_id:
            test_get_ticket(ticket_id)
        test_admin_stats()

        print("=" * 50)
        print("All tests completed!")
        print("=" * 50)

    except requests.exceptions.ConnectionError:
        print("ERROR: Could not connect to the API server.")
        print("Make sure the server is running on http://localhost:8000")
    except Exception as e:
        print(f"ERROR: {e}")
