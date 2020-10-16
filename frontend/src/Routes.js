const API_URL = 'http://localhost:2112' //localhost only for testing

export async function logEntry() {
    const res = await fetch(`${API_URL}/gabsip/logs`)
    return res.json()
}

export async function createJournalEntry(entry) {
    const res = await fetch(`${API_URL}/gabsip/logs`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(entry)
    })
    return res.json()
}