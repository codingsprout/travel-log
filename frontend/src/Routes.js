const API_URL = 'http://localhost:2112'

export async function logEntry() {
    const res = await fetch(`${API_URL}/gabsip/logs`)
    return res.json()
}